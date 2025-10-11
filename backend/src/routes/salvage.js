// backend/src/routes/salvage.js
// Salvage system - Browse and give salvage items to characters

const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const { calculateArchetypeInventoryBonus } = require('../utils/archetypeAbilities');

// Helper function: Calculate current inventory slots used
async function calculateSlotsUsed(characterId) {
  const result = await pool.query(`
    SELECT
      i.item_name,
      i.quantity,
      COALESCE(g.weight, i.weight, 1) as item_weight
    FROM inventory i
    LEFT JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
    WHERE i.character_id = $1
      AND (i.in_use_by_item_id IS NULL OR i.in_use_by_item_id = 0)
  `, [characterId]);

  let totalSlots = 0;
  let hasBackpack = false;

  for (const item of result.rows) {
    const weight = parseFloat(item.item_weight);
    const quantity = item.quantity;

    // Check for FREE items (weight = 0)
    if (weight === 0) {
      if (item.item_name.toLowerCase().includes('backpack')) {
        if (!hasBackpack) {
          hasBackpack = true;
          continue; // First backpack is free
        }
      } else {
        continue; // Other FREE items
      }
    }

    // Check for "2 per slot" items (weight = 0.5)
    if (weight === 0.5) {
      totalSlots += Math.ceil(quantity / 2);
    } else {
      totalSlots += weight * quantity;
    }
  }

  return totalSlots;
}

// Helper function: Get character's max inventory slots
async function getMaxSlots(characterId) {
  const result = await pool.query(
    'SELECT strength, constitution, archetype FROM characters WHERE id = $1',
    [characterId]
  );

  if (result.rows.length === 0) return 10;

  const { strength, constitution, archetype } = result.rows[0];
  const baseSlots = strength;
  const archetypeBonus = calculateArchetypeInventoryBonus(archetype, strength, constitution);

  return Math.max(10, baseSlots + archetypeBonus);
}

// ============================================
// SALVAGE ROUTES
// ============================================

// GET all salvage items for a specific tier
router.get('/tier/:tier', authenticateToken, async (req, res) => {
  const { tier } = req.params;

  try {
    const result = await pool.query(`
      SELECT * FROM salvage_items
      WHERE tier = $1
      ORDER BY roll_min ASC
    `, [tier]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching salvage items:', error);
    res.status(500).json({ error: 'Failed to fetch salvage items' });
  }
});

// GET salvage item by tier and roll number
router.get('/roll/:tier/:rollNumber', authenticateToken, async (req, res) => {
  const { tier, rollNumber } = req.params;
  const roll = parseInt(rollNumber);

  if (isNaN(roll) || roll < 1 || roll > 100) {
    return res.status(400).json({ error: 'Roll number must be between 1 and 100' });
  }

  try {
    const result = await pool.query(`
      SELECT * FROM salvage_items
      WHERE tier = $1
      AND roll_min <= $2
      AND roll_max >= $2
    `, [tier, roll]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No salvage item found for this roll' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching salvage by roll:', error);
    res.status(500).json({ error: 'Failed to fetch salvage item' });
  }
});

// POST - Give salvage to a character (admin only)
router.post('/give', authenticateToken, isAdmin, async (req, res) => {
  const { characterId, salvageId, quantity = 1 } = req.body;

  console.log('Salvage give request:', { characterId, salvageId, quantity });

  if (!characterId || !salvageId) {
    console.error('Missing required fields:', { characterId, salvageId });
    return res.status(400).json({ error: 'Character ID and salvage ID are required' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Get salvage item details
    const salvageResult = await client.query(
      'SELECT * FROM salvage_items WHERE id = $1',
      [salvageId]
    );

    if (salvageResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Salvage item not found' });
    }

    const salvageItem = salvageResult.rows[0];

    // Check if character exists
    const charResult = await client.query(
      'SELECT name FROM characters WHERE id = $1',
      [characterId]
    );

    if (charResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Character not found' });
    }

    const characterName = charResult.rows[0].name;

    // Check inventory capacity (salvage weight is 1, each item takes 1 slot)
    const salvageWeight = 1; // Salvage items have standard weight
    const slotsNeeded = salvageWeight * quantity; // 1 slot per salvage item

    const currentSlots = await calculateSlotsUsed(characterId);
    const maxSlots = await getMaxSlots(characterId);
    const availableSlots = maxSlots - currentSlots;

    console.log('Inventory check:', {
      currentSlots,
      maxSlots,
      availableSlots,
      slotsNeeded,
      quantity,
      itemName: salvageItem.item_name
    });

    if (slotsNeeded > availableSlots) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        error: `Not enough inventory space. Character has ${currentSlots}/${maxSlots} slots used. Needs ${slotsNeeded} more slots.`
      });
    }

    // Check if character already has this item (to combine quantities)
    const existingItem = await client.query(
      'SELECT id, quantity FROM inventory WHERE character_id = $1 AND item_name = $2',
      [characterId, salvageItem.item_name]
    );

    if (existingItem.rows.length > 0) {
      // Update existing item quantity
      await client.query(
        'UPDATE inventory SET quantity = quantity + $1 WHERE id = $2',
        [quantity, existingItem.rows[0].id]
      );
    } else {
      // Add new item to inventory
      await client.query(`
        INSERT INTO inventory (character_id, item_name, item_type, quantity, description, weight)
        VALUES ($1, $2, $3, $4, $5, $6)
      `, [
        characterId,
        salvageItem.item_name,
        'salvage',
        quantity,
        `Salvage Tier ${salvageItem.tier} (${salvageItem.value}cr)`,
        1
      ]);
    }

    // Log the activity
    await client.query(`
      INSERT INTO activity_log (character_id, action_type, description, amount, admin_user_id)
      VALUES ($1, $2, $3, $4, $5)
    `, [
      characterId,
      'salvage_received',
      `Received salvage: ${salvageItem.item_name} (x${quantity})`,
      salvageItem.value * quantity,
      req.user.userId
    ]);

    await client.query('COMMIT');

    // Emit socket event
    const io = req.app.get('io');
    io.to(`character_${characterId}`).emit('inventory_updated', {
      message: `Received salvage: ${salvageItem.item_name}`,
      item: salvageItem.item_name,
      quantity
    });
    io.emit('admin_refresh');

    res.json({
      message: `Salvage given to ${characterName}`,
      item: salvageItem.item_name,
      quantity,
      value: salvageItem.value * quantity
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error giving salvage:', error);
    res.status(500).json({ error: 'Failed to give salvage' });
  } finally {
    client.release();
  }
});

// GET all salvage tiers (for dropdown/tab selection)
router.get('/tiers', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT tier
      FROM salvage_items
      ORDER BY tier
    `);

    res.json(result.rows.map(row => row.tier));
  } catch (error) {
    console.error('Error fetching salvage tiers:', error);
    res.status(500).json({ error: 'Failed to fetch salvage tiers' });
  }
});

module.exports = router;
