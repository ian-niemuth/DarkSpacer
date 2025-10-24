// backend/src/utils/energyCellCleanup.js
// Background job for managing consumable energy cell timers (EC(c) property)

const pool = require('../config/database');

/**
 * Initialize the energy cell cleanup job
 * Runs every 30 seconds to check for:
 * - Warnings at 10min, 5min, 1min remaining
 * - Expired cells to delete
 */
function initEnergyCellCleanupJob(io) {
  console.log('[Energy Cell Cleanup] Starting background job...');

  // Track which warnings have already been sent to avoid duplicates
  const sentWarnings = new Set(); // Format: "itemId:warningLevel"

  const checkEnergyCells = async () => {
    try {
      // Find all items with consumable energy cells loaded (have timer fields set)
      const result = await pool.query(`
        SELECT
          i.id as item_id,
          i.character_id,
          i.item_name,
          i.energy_cell_loaded_at,
          i.energy_cell_expires_at,
          i.loaded_energy_cell_id,
          EXTRACT(EPOCH FROM (i.energy_cell_expires_at - NOW())) as seconds_remaining,
          c.name as character_name
        FROM inventory i
        JOIN characters c ON i.character_id = c.id
        WHERE i.energy_cell_expires_at IS NOT NULL
          AND i.loaded_energy_cell_id IS NOT NULL
        ORDER BY i.energy_cell_expires_at ASC
      `);

      const now = new Date();

      for (const item of result.rows) {
        const secondsRemaining = parseFloat(item.seconds_remaining);
        const itemId = item.item_id;
        const characterId = item.character_id;

        // Check if expired (0 or negative seconds remaining)
        if (secondsRemaining <= 0) {
          console.log(`[Energy Cell Cleanup] Cell expired in ${item.item_name} (Character: ${item.character_name})`);

          // IMPORTANT: Clear the foreign key reference FIRST, then delete the cell
          // Step 1: Unequip the item and clear timer fields + loaded_energy_cell_id
          await pool.query(`
            UPDATE inventory
            SET loaded_energy_cell_id = NULL,
                energy_cell_loaded_at = NULL,
                energy_cell_expires_at = NULL,
                equipped = false,
                equipped_slot = NULL
            WHERE id = $1
          `, [itemId]);

          // Step 2: Now it's safe to delete the energy cell from inventory
          if (item.loaded_energy_cell_id) {
            await pool.query('DELETE FROM inventory WHERE id = $1', [item.loaded_energy_cell_id]);
          }

          // Log activity
          await pool.query(`
            INSERT INTO activity_log (character_id, action_type, description)
            VALUES ($1, 'energy_cell_expired', $2)
          `, [characterId, `Energy cell expired in ${item.item_name} - cell deleted and item unequipped`]);

          // Emit socket events
          io.to(`character_${characterId}`).emit('energy_cell_expired', {
            itemId,
            itemName: item.item_name,
            message: `⚠️ Energy cell expired in ${item.item_name}! Cell deleted and item unequipped.`
          });
          io.emit('admin_refresh');

          // Remove from warning tracking
          sentWarnings.delete(`${itemId}:10`);
          sentWarnings.delete(`${itemId}:5`);
          sentWarnings.delete(`${itemId}:1`);

          continue;
        }

        // Check for warnings
        const minutesRemaining = Math.floor(secondsRemaining / 60);

        // 10 minute warning
        if (minutesRemaining <= 10 && minutesRemaining > 5) {
          const warningKey = `${itemId}:10`;
          if (!sentWarnings.has(warningKey)) {
            console.log(`[Energy Cell Cleanup] 10min warning for ${item.item_name} (Character: ${item.character_name})`);

            io.to(`character_${characterId}`).emit('energy_cell_warning', {
              itemId,
              itemName: item.item_name,
              minutesRemaining: 10,
              message: `⚠️ Energy cell in ${item.item_name} expires in 10 minutes!`,
              expiresAt: item.energy_cell_expires_at
            });

            sentWarnings.add(warningKey);
          }
        }

        // 5 minute warning
        if (minutesRemaining <= 5 && minutesRemaining > 1) {
          const warningKey = `${itemId}:5`;
          if (!sentWarnings.has(warningKey)) {
            console.log(`[Energy Cell Cleanup] 5min warning for ${item.item_name} (Character: ${item.character_name})`);

            io.to(`character_${characterId}`).emit('energy_cell_warning', {
              itemId,
              itemName: item.item_name,
              minutesRemaining: 5,
              message: `⚠️ Energy cell in ${item.item_name} expires in 5 minutes!`,
              expiresAt: item.energy_cell_expires_at
            });

            sentWarnings.add(warningKey);
          }
        }

        // 1 minute warning
        if (minutesRemaining <= 1 && secondsRemaining > 0) {
          const warningKey = `${itemId}:1`;
          if (!sentWarnings.has(warningKey)) {
            console.log(`[Energy Cell Cleanup] 1min warning for ${item.item_name} (Character: ${item.character_name})`);

            io.to(`character_${characterId}`).emit('energy_cell_warning', {
              itemId,
              itemName: item.item_name,
              minutesRemaining: 1,
              message: `⚠️ Energy cell in ${item.item_name} expires in 1 minute!`,
              expiresAt: item.energy_cell_expires_at
            });

            sentWarnings.add(warningKey);
          }
        }
      }

    } catch (error) {
      console.error('[Energy Cell Cleanup] Error in cleanup job:', error);
    }
  };

  // Run immediately on startup
  checkEnergyCells();

  // Then run every 30 seconds
  const intervalId = setInterval(checkEnergyCells, 30000);

  console.log('[Energy Cell Cleanup] Job initialized - checking every 30 seconds');

  // Return cleanup function (in case we need to stop the job)
  return () => {
    clearInterval(intervalId);
    console.log('[Energy Cell Cleanup] Job stopped');
  };
}

module.exports = { initEnergyCellCleanupJob };
