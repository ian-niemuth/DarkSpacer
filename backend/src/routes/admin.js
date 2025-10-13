// backend/src/routes/admin.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const { calculateArchetypeInventoryBonus } = require('../utils/archetypeAbilities');

// ============================================
// AC CALCULATION HELPER
// ============================================

/**
 * Calculate character's AC based on equipped items
 */
async function calculateAC(characterId) {
  // Get character's DEX modifier
  const charResult = await pool.query(
    'SELECT dexterity FROM characters WHERE id = $1',
    [characterId]
  );
  const dex = charResult.rows[0]?.dexterity || 10;
  const dexMod = Math.floor((dex - 10) / 2);

  // Get equipped armor items
  const equipped = await pool.query(`
    SELECT
      i.equipped_slot,
      g.name,
      g.category,
      g.subcategory,
      g.base_ac,
      g.ac_bonus,
      g.allows_dex_modifier
    FROM inventory i
    JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
    WHERE i.character_id = $1
    AND i.equipped_slot IN ('body_armor', 'helmet', 'shield')
  `, [characterId]);

  let finalAC = 10; // Base AC
  let allowsDex = true; // Default: allow DEX modifier
  let acBreakdown = ['Base: 10'];

  for (const item of equipped.rows) {
    if (item.equipped_slot === 'body_armor') {
      // Body armor sets base AC
      if (item.base_ac) {
        finalAC = item.base_ac;
        allowsDex = item.allows_dex_modifier;
        acBreakdown = [`${item.name}: ${item.base_ac}`];
      }
    } else if (item.equipped_slot === 'helmet' || item.equipped_slot === 'shield') {
      // Helmet and shield add bonuses
      if (item.ac_bonus) {
        finalAC += item.ac_bonus;
        acBreakdown.push(`${item.name}: +${item.ac_bonus}`);
      }
    }
  }

  // Add DEX modifier if allowed
  if (allowsDex && dexMod !== 0) {
    finalAC += dexMod;
    acBreakdown.push(`DEX: ${dexMod >= 0 ? '+' : ''}${dexMod}`);
  }

  return {
    ac: finalAC,
    breakdown: acBreakdown.join(', ')
  };
}

router.use(authenticateToken);
router.use(isAdmin);

// Helper function: Calculate current inventory slots used for a character
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
function getMaxSlots(strength, constitution, archetype) {
  const baseSlots = strength;
  const archetypeBonus = calculateArchetypeInventoryBonus(archetype, strength, constitution);
  return Math.max(10, baseSlots + archetypeBonus);
}

router.get('/characters', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, u.username as player_username
       FROM characters c
       JOIN users u ON c.user_id = u.id
       ORDER BY u.username, c.name`
    );

    // For each character, get their equipped gear, powered gear status, and inventory slots
    const charactersWithGear = await Promise.all(
      result.rows.map(async (char) => {
        const equippedResult = await pool.query(
          `SELECT i.id, item_name, equipped_slot, damage, range, properties,
                  loaded_energy_cell_id, loaded_ammo_id
           FROM inventory i
           WHERE character_id = $1 AND equipped = true
           ORDER BY
             CASE equipped_slot
               WHEN 'primary_weapon' THEN 1
               WHEN 'secondary_weapon' THEN 2
               WHEN 'body_armor' THEN 3
               ELSE 4
             END`,
          [char.id]
        );

        // Get all powered gear (EC items) - both equipped and unequipped
        const poweredGearResult = await pool.query(
          `SELECT i.id, i.item_name, i.equipped, i.equipped_slot, i.loaded_energy_cell_id,
                  g.properties
           FROM inventory i
           LEFT JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
           WHERE i.character_id = $1
             AND g.properties LIKE '%EC%'
             AND LOWER(i.item_name) NOT LIKE '%energy cell%'
           ORDER BY i.equipped DESC, i.item_name`,
          [char.id]
        );

        // Get all ammo weapons (Am items) - both equipped and unequipped
        const ammoWeaponsResult = await pool.query(
          `SELECT i.id, i.item_name, i.equipped, i.equipped_slot, i.loaded_ammo_id,
                  g.properties
           FROM inventory i
           LEFT JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
           WHERE i.character_id = $1
             AND g.properties LIKE '%Am%'
             AND LOWER(i.item_name) NOT LIKE '%ammo%'
           ORDER BY i.equipped DESC, i.item_name`,
          [char.id]
        );

        // Calculate inventory slots
        const slots_used = await calculateSlotsUsed(char.id);
        const slots_max = getMaxSlots(char.strength, char.constitution, char.archetype);

        return {
          ...char,
          equipped_gear: equippedResult.rows,
          powered_gear: poweredGearResult.rows,
          ammo_weapons: ammoWeaponsResult.rows,
          slots_used,
          slots_max
        };
      })
    );

    res.json(charactersWithGear);
  } catch (error) {
    console.error('Error fetching all characters:', error);
    res.status(500).json({ error: 'Failed to fetch characters' });
  }
});

router.post('/characters/:id/credits', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, reason } = req.body;
    
    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }
    
    const result = await pool.query(
      'UPDATE characters SET credits = credits + $1 WHERE id = $2 RETURNING *',
      [amount, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }
    
    await pool.query(
      `INSERT INTO activity_log (character_id, action_type, description, amount, admin_user_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, 'credits_changed', reason || 'Credits adjusted by DM', amount, req.user.userId]
    );
    
    const character = result.rows[0];

    const io = req.app.get('io');
    io.to(`character_${id}`).emit('character_updated', {
      characterId: id,
      credits: character.credits,
      message: amount > 0
        ? `You received ${amount} credits! ${reason || ''}`
        : `You lost ${Math.abs(amount)} credits. ${reason || ''}`
    });
    io.emit('admin_refresh'); // Notify admin panel
    
    res.json({
      message: 'Credits updated',
      character
    });
  } catch (error) {
    console.error('Error updating credits:', error);
    res.status(500).json({ error: 'Failed to update credits' });
  }
});

router.post('/characters/:id/damage', async (req, res) => {
  try {
    const { id } = req.params;
    const { damage, source } = req.body;
    
    if (!damage) {
      return res.status(400).json({ error: 'Damage amount is required' });
    }
    
    const result = await pool.query(
      `UPDATE characters 
       SET hp_current = GREATEST(0, hp_current - $1)
       WHERE id = $2 
       RETURNING *`,
      [damage, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }
    
    const character = result.rows[0];
    
    await pool.query(
      `INSERT INTO activity_log (character_id, action_type, description, amount, admin_user_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, 'damage_taken', source || 'Damage from combat', damage, req.user.userId]
    );
    
    const io = req.app.get('io');
    io.to(`character_${id}`).emit('character_updated', {
      characterId: id,
      hp_current: character.hp_current,
      message: `You took ${damage} damage! ${character.hp_current <= 0 ? 'You are down!' : ''}`
    });
    io.emit('admin_refresh'); // Notify admin panel
    
    res.json({
      message: 'Damage applied',
      character
    });
  } catch (error) {
    console.error('Error applying damage:', error);
    res.status(500).json({ error: 'Failed to apply damage' });
  }
});

router.post('/characters/:id/heal', async (req, res) => {
  try {
    const { id } = req.params;
    const { healing } = req.body;
    
    if (!healing) {
      return res.status(400).json({ error: 'Healing amount is required' });
    }
    
    const result = await pool.query(
      `UPDATE characters 
       SET hp_current = LEAST(hp_max, hp_current + $1)
       WHERE id = $2 
       RETURNING *`,
      [healing, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }
    
    const character = result.rows[0];
    
    await pool.query(
      `INSERT INTO activity_log (character_id, action_type, description, amount, admin_user_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, 'healing_received', 'Healing from DM', healing, req.user.userId]
    );
    
    const io = req.app.get('io');
    io.to(`character_${id}`).emit('character_updated', {
      characterId: id,
      hp_current: character.hp_current,
      message: `You were healed for ${healing} HP!`
    });
    io.emit('admin_refresh'); // Notify admin panel
    
    res.json({
      message: 'Healing applied',
      character
    });
  } catch (error) {
    console.error('Error applying healing:', error);
    res.status(500).json({ error: 'Failed to apply healing' });
  }
});

router.post('/characters/:id/give-item', async (req, res) => {
  try {
    const { id } = req.params;
    const { item_name, item_type, quantity, description, weight } = req.body;
    
    if (!item_name) {
      return res.status(400).json({ error: 'Item name is required' });
    }
    
    const result = await pool.query(
      `INSERT INTO inventory (character_id, item_name, item_type, quantity, description, weight)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, item_name, item_type, quantity || 1, description, weight || 0]
    );
    
    await pool.query(
      `INSERT INTO activity_log (character_id, action_type, description, admin_user_id)
       VALUES ($1, $2, $3, $4)`,
      [id, 'item_received', `Received ${item_name} from DM`, req.user.userId]
    );
    
    const io = req.app.get('io');
    io.to(`character_${id}`).emit('item_received', {
      characterId: id,
      item: result.rows[0],
      message: `You received: ${item_name}!`
    });
    io.emit('admin_refresh'); // Notify admin panel
    
    res.json({
      message: 'Item given to character',
      item: result.rows[0]
    });
  } catch (error) {
    console.error('Error giving item:', error);
    res.status(500).json({ error: 'Failed to give item' });
  }
});

router.post('/reset-daily-abilities', async (req, res) => {
  try {
    // This is a global action that affects all characters
    // In DarkSpace/Shadowdark, daily abilities reset after a rest (typically at the start of a session)
    
    // Reset all abilities in database using the stored procedure
    await pool.query('SELECT reset_all_abilities()');
    
    // Log the activity
    await pool.query(
      `INSERT INTO activity_log (action_type, description, admin_user_id)
       VALUES ($1, $2, $3)`,
      ['daily_abilities_reset', 'DM reset all daily abilities for all characters', req.user.userId]
    );
    
    // Send real-time notification to all connected clients
    const io = req.app.get('io');
    io.emit('daily_abilities_reset', {
      message: 'Daily abilities have been reset by the DM. Ready for a new session!'
    });
    
    res.json({
      message: 'Daily abilities reset for all characters',
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error resetting daily abilities:', error);
    res.status(500).json({ error: 'Failed to reset daily abilities' });
  }
});

router.get('/gear-database', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM gear_database ORDER BY category, name'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching gear database:', error);
    res.status(500).json({ error: 'Failed to fetch gear database' });
  }
});

router.get('/activity-log', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT al.*, c.name as character_name, u.username as admin_username
       FROM activity_log al
       JOIN characters c ON al.character_id = c.id
       LEFT JOIN users u ON al.admin_user_id = u.id
       ORDER BY al.created_at DESC
       LIMIT 100`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching activity log:', error);
    res.status(500).json({ error: 'Failed to fetch activity log' });
  }
});

router.post('/characters/:id/xp', async (req, res) => {
  try {
    const { id } = req.params;
    const { xp, reason } = req.body;
    
    if (!xp) {
      return res.status(400).json({ error: 'XP amount is required' });
    }
    
    const result = await pool.query(
      'UPDATE characters SET xp = xp + $1 WHERE id = $2 RETURNING *',
      [xp, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }
    
    await pool.query(
      `INSERT INTO activity_log (character_id, action_type, description, amount, admin_user_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, 'xp_gained', reason || 'XP awarded by DM', xp, req.user.userId]
    );
    
    const character = result.rows[0];
    
    const io = req.app.get('io');
    io.to(`character_${id}`).emit('character_updated', {
      characterId: id,
      xp: character.xp,
      message: `You gained ${xp} XP! ${reason || ''}`
    });
    io.emit('admin_refresh'); // Notify admin panel
    
    res.json({
      message: 'XP awarded',
      character
    });
  } catch (error) {
    console.error('Error awarding XP:', error);
    res.status(500).json({ error: 'Failed to award XP' });
  }
});

// ============================================
// ADMIN SHIP MANAGEMENT (bypasses ownership checks)
// ============================================

// GET all ships (admin can see everything)
router.get('/ships', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.*,
        CASE 
          WHEN s.owner_type = 'character' THEN c.name
          ELSE 'Party Ship'
        END as owner_name
      FROM ships s
      LEFT JOIN characters c ON s.owner_type = 'character' AND s.owner_id = c.id
      ORDER BY s.created_at DESC
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching ships:', error);
    res.status(500).json({ error: 'Failed to fetch ships' });
  }
});

// GET single ship with full details (admin can see any ship)
router.get('/ships/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const shipResult = await pool.query('SELECT * FROM ships WHERE id = $1', [id]);
    if (shipResult.rows.length === 0) {
      return res.status(404).json({ error: 'Ship not found' });
    }
    
    const ship = shipResult.rows[0];
    
    // Get components
    const componentsResult = await pool.query(`
      SELECT sc.*, ct.name, ct.component_type, ct.description, ct.maintenance_cost
      FROM ship_components sc
      JOIN component_templates ct ON sc.component_template_id = ct.id
      WHERE sc.ship_id = $1
      ORDER BY ct.component_type, ct.name
    `, [id]);
    
    // Get weapons arrays
    const arraysResult = await pool.query(`
      SELECT swa.*, 
        json_agg(
          json_build_object(
            'id', sw.id,
            'name', wt.name,
            'damage', wt.damage,
            'range', wt.range,
            'properties', wt.properties
          ) ORDER BY sw.array_position
        ) FILTER (WHERE sw.id IS NOT NULL) as weapons
      FROM ship_weapons_arrays swa
      LEFT JOIN ship_weapons sw ON swa.id = sw.weapons_array_id
      LEFT JOIN weapon_templates wt ON sw.weapon_template_id = wt.id
      WHERE swa.ship_id = $1
      GROUP BY swa.id
    `, [id]);
    
    // Get armor
    const armorResult = await pool.query(`
      SELECT sa.*, at.name, at.category, at.ac_bonus
      FROM ship_armor sa
      JOIN armor_templates at ON sa.armor_template_id = at.id
      WHERE sa.ship_id = $1
    `, [id]);
    
    // Get crew
    const crewResult = await pool.query(`
      SELECT sca.*, c.name as character_name, c.archetype
      FROM ship_crew_assignments sca
      JOIN characters c ON sca.character_id = c.id
      WHERE sca.ship_id = $1
    `, [id]);
    
    res.json({
      ...ship,
      components: componentsResult.rows,
      weapons_arrays: arraysResult.rows,
      armor: armorResult.rows[0] || null,
      crew: crewResult.rows
    });
  } catch (error) {
    console.error('Error fetching ship:', error);
    res.status(500).json({ error: 'Failed to fetch ship' });
  }
});

// POST create new ship (admin)
router.post('/ships', async (req, res) => {
  try {
    const {
      name,
      ship_class,
      owner_type = 'party',
      owner_id = null,
      strength = 10,
      dexterity = 10,
      constitution = 10,
      intelligence = 10,
      wisdom = 10,
      charisma = 10,
      hp_max = 10,
      level = 1,
      movement = 'near',
      system_slots_max = 10,
      feature_slots_max = 10,
      purchase_price = 0,
      description = '',
      notes = ''
    } = req.body;
    
    const result = await pool.query(`
      INSERT INTO ships (
        name, ship_class, owner_type, owner_id,
        strength, dexterity, constitution, intelligence, wisdom, charisma,
        hp_current, hp_max, level, movement,
        system_slots_used, system_slots_max, feature_slots_used, feature_slots_max, purchase_price,
        description, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $11, $12, $13, 0, $14, 0, $15, $16, $17, $18)
      RETURNING *
    `, [
      name, ship_class, owner_type, owner_id,
      strength, dexterity, constitution, intelligence, wisdom, charisma,
      hp_max, level, movement,
      system_slots_max, feature_slots_max, purchase_price,
      description, notes
    ]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating ship:', error);
    res.status(500).json({ error: 'Failed to create ship' });
  }
});

// PUT update ship (admin)
router.put('/ships/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const allowedFields = [
      'name', 'ship_class', 'owner_type', 'owner_id',
      'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma',
      'ac', 'hp_current', 'hp_max', 'level', 'movement',
      'system_slots_max', 'feature_slots_max', 'purchase_price',
      'is_active', 'description', 'notes'
    ];
    
    const setClauses = [];
    const values = [];
    let paramCount = 1;
    
    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        setClauses.push(`${key} = ${paramCount}`);
        values.push(updates[key]);
        paramCount++;
      }
    });
    
    if (setClauses.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    
    setClauses.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);
    
    const query = `
      UPDATE ships 
      SET ${setClauses.join(', ')}
      WHERE id = ${paramCount}
      RETURNING *
    `;
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ship not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating ship:', error);
    res.status(500).json({ error: 'Failed to update ship' });
  }
});

// DELETE ship (admin)
router.delete('/ships/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM ships WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ship not found' });
    }
    
    res.json({ message: 'Ship deleted successfully' });
  } catch (error) {
    console.error('Error deleting ship:', error);
    res.status(500).json({ error: 'Failed to delete ship' });
  }
});

// DELETE energy cell from equipped gear (expend cell)
router.delete('/characters/:characterId/energy-cell/:itemId', async (req, res) => {
  try {
    const { characterId, itemId } = req.params;

    // Get the item with loaded cell
    const itemResult = await pool.query(
      'SELECT * FROM inventory WHERE id = $1 AND character_id = $2',
      [itemId, characterId]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const item = itemResult.rows[0];

    if (!item.loaded_energy_cell_id) {
      return res.status(400).json({ error: 'No energy cell loaded in this item' });
    }

    const cellId = item.loaded_energy_cell_id;
    const wasArmor = item.equipped_slot && ['body_armor', 'helmet', 'shield'].includes(item.equipped_slot);

    // IMPORTANT: Clear the loaded_energy_cell_id reference AND unequip the item (before deleting)
    await pool.query(
      'UPDATE inventory SET loaded_energy_cell_id = NULL, equipped = false, equipped_slot = NULL WHERE id = $1',
      [itemId]
    );

    // Now delete the energy cell from inventory
    await pool.query('DELETE FROM inventory WHERE id = $1', [cellId]);

    // If armor was unequipped, recalculate AC
    let newAC = null;
    if (wasArmor) {
      const acData = await calculateAC(characterId);
      await pool.query('UPDATE characters SET ac = $1 WHERE id = $2', [acData.ac, characterId]);
      newAC = acData.ac;
    }

    // Log activity
    await pool.query(
      `INSERT INTO activity_log (character_id, action_type, description, admin_user_id)
       VALUES ($1, 'energy_cell_expended', $2, $3)`,
      [characterId, `Energy cell expended from ${item.item_name}`, req.user.userId]
    );

    // Emit socket events
    const io = req.app.get('io');
    const updateData = {
      message: `Energy cell expended from ${item.item_name}`
    };
    if (newAC !== null) {
      updateData.ac = newAC;
    }
    io.to(`character_${characterId}`).emit('character_updated', updateData);
    io.to(`character_${characterId}`).emit('inventory_updated', {
      message: `Energy cell expended from ${item.item_name}`
    });
    io.emit('admin_refresh'); // Notify admin panel

    res.json({
      message: 'Energy cell expended successfully',
      itemName: item.item_name,
      ...(newAC !== null && { newAC })
    });
  } catch (error) {
    console.error('Error expending energy cell:', error);
    res.status(500).json({ error: 'Failed to expend energy cell' });
  }
});

// DELETE ammo clip from equipped gear (expend ammo)
router.delete('/characters/:characterId/ammo/:itemId', async (req, res) => {
  try {
    const { characterId, itemId } = req.params;

    // Get the item with loaded ammo
    const itemResult = await pool.query(
      'SELECT * FROM inventory WHERE id = $1 AND character_id = $2',
      [itemId, characterId]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const item = itemResult.rows[0];

    if (!item.loaded_ammo_id) {
      return res.status(400).json({ error: 'No ammo clip loaded in this weapon' });
    }

    const ammoId = item.loaded_ammo_id;
    const wasArmor = item.equipped_slot && ['body_armor', 'helmet', 'shield'].includes(item.equipped_slot);

    // IMPORTANT: Clear the loaded_ammo_id reference AND unequip the item (before deleting)
    await pool.query(
      'UPDATE inventory SET loaded_ammo_id = NULL, equipped = false, equipped_slot = NULL WHERE id = $1',
      [itemId]
    );

    // Now delete the ammo clip from inventory
    await pool.query('DELETE FROM inventory WHERE id = $1', [ammoId]);

    // If armor was unequipped, recalculate AC
    let newAC = null;
    if (wasArmor) {
      const acData = await calculateAC(characterId);
      await pool.query('UPDATE characters SET ac = $1 WHERE id = $2', [acData.ac, characterId]);
      newAC = acData.ac;
    }

    // Log activity
    await pool.query(
      `INSERT INTO activity_log (character_id, action_type, description, admin_user_id)
       VALUES ($1, 'ammo_expended', $2, $3)`,
      [characterId, `Ammo clip expended from ${item.item_name}`, req.user.userId]
    );

    // Emit socket events
    const io = req.app.get('io');
    const updateData = {
      message: `Ammo clip expended from ${item.item_name}`
    };
    if (newAC !== null) {
      updateData.ac = newAC;
    }
    io.to(`character_${characterId}`).emit('character_updated', updateData);
    io.to(`character_${characterId}`).emit('inventory_updated', {
      message: `Ammo clip expended from ${item.item_name}`
    });
    io.emit('admin_refresh'); // Notify admin panel

    res.json({
      message: 'Ammo clip expended successfully',
      itemName: item.item_name,
      ...(newAC !== null && { newAC })
    });
  } catch (error) {
    console.error('Error expending ammo clip:', error);
    res.status(500).json({ error: 'Failed to expend ammo clip' });
  }
});

// DELETE character (admin) - with ownership checks
router.delete('/characters/:id', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { id } = req.params;
    
    await client.query('BEGIN');
    
    // Check if character exists
    const charResult = await client.query(
      'SELECT * FROM characters WHERE id = $1',
      [id]
    );
    
    if (charResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Character not found' });
    }
    
    const character = charResult.rows[0];
    
    // Check if character owns any ships
    const shipsResult = await client.query(
      `SELECT id, name FROM ships 
       WHERE owner_type = 'character' AND owner_id = $1`,
      [id]
    );
    
    if (shipsResult.rows.length > 0) {
      await client.query('ROLLBACK');
      const shipNames = shipsResult.rows.map(s => s.name).join(', ');
      return res.status(400).json({ 
        error: 'Cannot delete character',
        message: `${character.name} owns ${shipsResult.rows.length} ship(s): ${shipNames}. Transfer or delete ships first.`
      });
    }
    
    // Delete activity logs (not cascade)
    await client.query(
      'DELETE FROM activity_log WHERE character_id = $1',
      [id]
    );
    
    // Delete character (will cascade delete inventory and ship crew assignments)
    await client.query(
      'DELETE FROM characters WHERE id = $1',
      [id]
    );
    
    await client.query('COMMIT');
    
    // Send real-time notification
    const io = req.app.get('io');
    io.emit('character_deleted', {
      characterId: id,
      message: `${character.name} has been deleted`
    });
    
    res.json({ 
      message: 'Character deleted successfully',
      characterName: character.name
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error deleting character:', error);
    res.status(500).json({ error: 'Failed to delete character' });
  } finally {
    client.release();
  }
});

module.exports = router;