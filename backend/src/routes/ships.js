// Ship Management Routes
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// ============================================
// HELPER FUNCTIONS
// ============================================

// Calculate ship's total maintenance cost
async function calculateMaintenanceCost(shipId) {
  const result = await pool.query(`
    SELECT 
      COALESCE(SUM(CASE WHEN sc.maintenance_enabled THEN ct.maintenance_cost ELSE 0 END), 0) as component_maintenance,
      COALESCE(SUM(CASE WHEN swa.maintenance_enabled THEN swa.base_maintenance_cost ELSE 0 END), 0) as array_maintenance,
      COALESCE(SUM(CASE WHEN swa.maintenance_enabled THEN wt.cost * 0.1 ELSE 0 END), 0) as weapon_maintenance
    FROM ships s
    LEFT JOIN ship_components sc ON s.id = sc.ship_id
    LEFT JOIN component_templates ct ON sc.component_template_id = ct.id
    LEFT JOIN ship_weapons_arrays swa ON s.id = swa.ship_id
    LEFT JOIN ship_weapons sw ON swa.id = sw.weapons_array_id
    LEFT JOIN weapon_templates wt ON sw.weapon_template_id = wt.id
    WHERE s.id = $1
  `, [shipId]);
  
  const total = 
    parseFloat(result.rows[0].component_maintenance) +
    parseFloat(result.rows[0].array_maintenance) +
    parseFloat(result.rows[0].weapon_maintenance);
  
  return Math.round(total);
}

// Calculate cargo capacity from Cargo Hold components
async function updateCargoCapacity(shipId, client = null) {
  const db = client || pool;
  
  // Count Cargo Hold components
  const result = await db.query(`
    SELECT COUNT(*) as cargo_hold_count
    FROM ship_components sc
    JOIN component_templates ct ON sc.component_template_id = ct.id
    WHERE sc.ship_id = $1 AND ct.name = 'Cargo Hold'
  `, [shipId]);
  
  const cargoHoldCount = parseInt(result.rows[0].cargo_hold_count);
  const baseCapacity = 0; // Ships start with 0 capacity
  const cargoCapacity = baseCapacity + (cargoHoldCount * 10); // Each Cargo Hold adds 10
  
  // Update ship's cargo capacity
  await db.query(
    'UPDATE ships SET cargo_capacity = $1 WHERE id = $2',
    [cargoCapacity, shipId]
  );
  
  return cargoCapacity;
}

// Calculate used slots
async function updateSlotUsage(shipId, client = null) {
  const db = client || pool;
  
  // Calculate system slots
  const systemSlots = await db.query(`
    SELECT 
      COALESCE(SUM(ct.slots_required * (CASE WHEN sc.is_advanced THEN 2 ELSE 1 END)), 0) as component_slots,
      COALESCE(SUM(at.system_slots_required), 0) as armor_slots,
      COALESCE(SUM(et.slots_required), 0) as enhancement_slots,
      COALESCE(COUNT(swa.id), 0) as weapons_arrays
    FROM ships s
    LEFT JOIN ship_components sc ON s.id = sc.ship_id
    LEFT JOIN component_templates ct ON sc.component_template_id = ct.id AND ct.component_type = 'system'
    LEFT JOIN ship_armor sa ON s.id = sa.ship_id
    LEFT JOIN armor_templates at ON sa.armor_template_id = at.id AND at.uses_system_slot = true
    LEFT JOIN ship_enhancements se ON s.id = se.ship_id
    LEFT JOIN enhancement_templates et ON se.enhancement_template_id = et.id AND et.enhancement_type = 'system'
    LEFT JOIN ship_weapons_arrays swa ON s.id = swa.ship_id
    WHERE s.id = $1
  `, [shipId]);
  
  const systemSlotsUsed = 
    parseInt(systemSlots.rows[0].component_slots) +
    parseInt(systemSlots.rows[0].armor_slots) +
    parseInt(systemSlots.rows[0].enhancement_slots) +
    parseInt(systemSlots.rows[0].weapons_arrays);
  
  // Calculate feature slots
  const featureSlots = await db.query(`
    SELECT 
      COALESCE(SUM(ct.slots_required * (CASE WHEN sc.is_advanced THEN 2 ELSE 1 END)), 0) as component_slots,
      COALESCE(SUM(et.slots_required), 0) as enhancement_slots
    FROM ships s
    LEFT JOIN ship_components sc ON s.id = sc.ship_id
    LEFT JOIN component_templates ct ON sc.component_template_id = ct.id AND ct.component_type = 'feature'
    LEFT JOIN ship_enhancements se ON s.id = se.ship_id
    LEFT JOIN enhancement_templates et ON se.enhancement_template_id = et.id AND et.enhancement_type = 'feature'
    WHERE s.id = $1
  `, [shipId]);
  
  const featureSlotsUsed = 
    parseInt(featureSlots.rows[0].component_slots) +
    parseInt(featureSlots.rows[0].enhancement_slots);
  
  // Update ship
  await db.query(`
    UPDATE ships 
    SET system_slots_used = $1, feature_slots_used = $2, updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
  `, [systemSlotsUsed, featureSlotsUsed, shipId]);
  
  return { systemSlotsUsed, featureSlotsUsed };
}

// ============================================
// SHIP CRUD OPERATIONS
// ============================================

// Apply authentication to all routes
router.use(authenticateToken);

// GET all ships
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        s.*,
        CASE
          WHEN s.owner_type = 'character' THEN c.name
          WHEN s.owner_type = 'npc' AND s.owner_name IS NOT NULL THEN s.owner_name
          WHEN s.owner_type = 'npc' THEN 'Unknown'
          ELSE 'Party Ship'
        END as owner_display_name
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

// GET player's ships (ships they own or are crew on)
// IMPORTANT: This must come BEFORE /:id route
router.get('/player', async (req, res) => {
  try {
    const userId = req.user.userId; // FIXED: use userId not id
    
    // Get all characters owned by this user
    const charactersResult = await pool.query(
      'SELECT id FROM characters WHERE user_id = $1',
      [userId]
    );
    
    const characterIds = charactersResult.rows.map(row => row.id);
    
    if (characterIds.length === 0) {
      return res.json([]);
    }
    
    // Get ships owned by player's characters OR ships where player's character is crew
    // NOTE: NPC ships are excluded from player view (only visible to DM)
    const result = await pool.query(`
      SELECT DISTINCT s.*,
        CASE
          WHEN s.owner_type = 'character' THEN c.name
          ELSE 'Party Ship'
        END as owner_display_name
      FROM ships s
      LEFT JOIN characters c ON s.owner_type = 'character' AND s.owner_id = c.id
      LEFT JOIN ship_crew_assignments sca ON s.id = sca.ship_id
      WHERE
        (s.owner_type = 'character' AND s.owner_id = ANY($1))
        OR s.owner_type = 'party'
        OR sca.character_id = ANY($1)
      ORDER BY s.created_at DESC
    `, [characterIds]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching player ships:', error);
    res.status(500).json({ error: 'Failed to fetch player ships' });
  }
});

// GET single ship with full details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get ship base data
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
    
    // Get weapons arrays with weapons
    const arraysResult = await pool.query(`
      SELECT swa.*, 
        json_agg(
          json_build_object(
            'id', sw.id,
            'name', wt.name,
            'damage', wt.damage,
            'range', wt.range,
            'properties', wt.properties,
            'requires_ammo', sw.requires_ammo,
            'ammo_loaded', sw.ammo_loaded,
            'is_damaged', sw.is_damaged,
            'position', sw.array_position
          ) ORDER BY sw.array_position
        ) FILTER (WHERE sw.id IS NOT NULL) as weapons
      FROM ship_weapons_arrays swa
      LEFT JOIN ship_weapons sw ON swa.id = sw.weapons_array_id
      LEFT JOIN weapon_templates wt ON sw.weapon_template_id = wt.id
      WHERE swa.ship_id = $1
      GROUP BY swa.id
      ORDER BY swa.created_at
    `, [id]);
    
    // Get armor
    const armorResult = await pool.query(`
      SELECT sa.*, at.name, at.category, at.ac_formula, at.ac_bonus, at.properties, at.dex_modifier_effect
      FROM ship_armor sa
      JOIN armor_templates at ON sa.armor_template_id = at.id
      WHERE sa.ship_id = $1
    `, [id]);
    
    // Get enhancements
    const enhancementsResult = await pool.query(`
      SELECT se.*, et.name, et.benefit, et.description, et.enhancement_type
      FROM ship_enhancements se
      JOIN enhancement_templates et ON se.enhancement_template_id = et.id
      WHERE se.ship_id = $1
    `, [id]);
    
    // Get crew
    const crewResult = await pool.query(`
      SELECT sca.*, c.name as character_name, c.archetype
      FROM ship_crew_assignments sca
      JOIN characters c ON sca.character_id = c.id
      WHERE sca.ship_id = $1
      ORDER BY sca.crew_role
    `, [id]);
    
    // Calculate maintenance
    const maintenanceCost = await calculateMaintenanceCost(id);
    
    res.json({
      ...ship,
      components: componentsResult.rows,
      weapons_arrays: arraysResult.rows,
      armor: armorResult.rows[0] || null,
      enhancements: enhancementsResult.rows,
      crew: crewResult.rows,
      total_maintenance_cost: maintenanceCost
    });
  } catch (error) {
    console.error('Error fetching ship details:', error);
    res.status(500).json({ error: 'Failed to fetch ship details' });
  }
});

// POST create new ship
router.post('/', async (req, res) => {
  try {
    const {
      name,
      ship_class,
      owner_type = 'party',
      owner_id = null,
      owner_name = null,
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
        name, ship_class, owner_type, owner_id, owner_name,
        strength, dexterity, constitution, intelligence, wisdom, charisma,
        hp_current, hp_max, level, movement,
        system_slots_used, system_slots_max, feature_slots_used, feature_slots_max, purchase_price,
        description, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $12, $13, $14, 0, $15, 0, $16, $17, $18, $19)
      RETURNING *
    `, [
      name, ship_class, owner_type, owner_id, owner_name,
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

// PUT update ship
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const allowedFields = [
      'name', 'ship_class', 'owner_type', 'owner_id', 'owner_name',
      'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma',
      'ac', 'hp_current', 'hp_max', 'level', 'movement',
      'system_slots_max', 'feature_slots_max', 'cargo_capacity', 'purchase_price',
      'is_active', 'description', 'notes'
    ];

    const setClauses = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updates).forEach(key => {
      if (allowedFields.includes(key)) {
        setClauses.push(`${key} = $${paramCount}`);
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
      WHERE id = $${paramCount}
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

// PATCH adjust ship HP (for combat)
router.patch('/:id/hp', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (typeof amount !== 'number') {
      return res.status(400).json({ error: 'Amount must be a number' });
    }

    // Get current ship data
    const shipResult = await pool.query('SELECT hp_current, hp_max FROM ships WHERE id = $1', [id]);

    if (shipResult.rows.length === 0) {
      return res.status(404).json({ error: 'Ship not found' });
    }

    const ship = shipResult.rows[0];
    const newHP = Math.max(0, Math.min(ship.hp_current + amount, ship.hp_max));

    // Update HP
    const result = await pool.query(
      'UPDATE ships SET hp_current = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [newHP, id]
    );

    // Emit socket event
    const io = req.app.get('io');
    io.to(`ship_${id}`).emit('ship_updated', {
      message: `Ship HP adjusted by ${amount}`,
      shipId: id
    });

    res.json({
      message: `HP adjusted by ${amount}`,
      hp_current: newHP,
      hp_max: ship.hp_max
    });
  } catch (error) {
    console.error('Error adjusting ship HP:', error);
    res.status(500).json({ error: 'Failed to adjust HP' });
  }
});

// DELETE ship
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM ships WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ship not found' });
    }
    
    res.json({ message: 'Ship deleted successfully', ship: result.rows[0] });
  } catch (error) {
    console.error('Error deleting ship:', error);
    res.status(500).json({ error: 'Failed to delete ship' });
  }
});

// ============================================
// COMPONENT MANAGEMENT
// ============================================

// GET all available component templates
router.get('/templates/components', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM component_templates 
      ORDER BY component_type, name
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching component templates:', error);
    res.status(500).json({ error: 'Failed to fetch component templates' });
  }
});

// POST install component on ship
router.post('/:id/components', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { id } = req.params;
    const { component_template_id, is_advanced = false } = req.body;
    
    await client.query('BEGIN');
    
    // Get component template
    const templateResult = await client.query(
      'SELECT * FROM component_templates WHERE id = $1',
      [component_template_id]
    );
    
    if (templateResult.rows.length === 0) {
      throw new Error('Component template not found');
    }
    
    const template = templateResult.rows[0];
    
    // Check if can be advanced
    if (is_advanced && !template.can_be_advanced) {
      throw new Error('This component cannot be advanced');
    }
    
    // Get ship
    const shipResult = await client.query('SELECT * FROM ships WHERE id = $1', [id]);
    if (shipResult.rows.length === 0) {
      throw new Error('Ship not found');
    }
    
    const ship = shipResult.rows[0];
    const slotsRequired = template.slots_required * (is_advanced ? 2 : 1);
    
    // Check slot availability
    if (template.component_type === 'system') {
      if (ship.system_slots_used + slotsRequired > ship.system_slots_max) {
        throw new Error('Insufficient system slots');
      }
    } else {
      if (ship.feature_slots_used + slotsRequired > ship.feature_slots_max) {
        throw new Error('Insufficient feature slots');
      }
    }
    
    // Install component
    const installResult = await client.query(`
      INSERT INTO ship_components (ship_id, component_template_id, is_advanced)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [id, component_template_id, is_advanced]);
    
    // Update slot usage
    await updateSlotUsage(id, client);
    
    // Update cargo capacity if it's a Cargo Hold
    if (template.name === 'Cargo Hold') {
      await updateCargoCapacity(id, client);
    }
    
    await client.query('COMMIT');
    
    res.json(installResult.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error installing component:', error);
    res.status(500).json({ error: error.message || 'Failed to install component' });
  } finally {
    client.release();
  }
});

// DELETE remove component from ship
router.delete('/:shipId/components/:componentId', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { shipId, componentId } = req.params;
    
    await client.query('BEGIN');
    
    // Get component details before deleting
    const componentCheck = await client.query(`
      SELECT sc.*, ct.name as component_name
      FROM ship_components sc
      JOIN component_templates ct ON sc.component_template_id = ct.id
      WHERE sc.id = $1 AND sc.ship_id = $2
    `, [componentId, shipId]);
    
    if (componentCheck.rows.length === 0) {
      throw new Error('Component not found');
    }
    
    const componentName = componentCheck.rows[0].component_name;
    
    const result = await client.query(
      'DELETE FROM ship_components WHERE id = $1 AND ship_id = $2 RETURNING *',
      [componentId, shipId]
    );
    
    if (result.rows.length === 0) {
      throw new Error('Component not found');
    }
    
    // Update slot usage
    await updateSlotUsage(shipId, client);
    
    // Update cargo capacity if it was a Cargo Hold
    if (componentName === 'Cargo Hold') {
      await updateCargoCapacity(shipId, client);
    }
    
    await client.query('COMMIT');
    
    res.json({ message: 'Component removed successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error removing component:', error);
    res.status(500).json({ error: error.message || 'Failed to remove component' });
  } finally {
    client.release();
  }
});

// PUT toggle component maintenance
router.put('/:shipId/components/:componentId/maintenance', async (req, res) => {
  try {
    const { shipId, componentId } = req.params;
    const { maintenance_enabled, maintenance_paid } = req.body;

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (typeof maintenance_enabled !== 'undefined') {
      updates.push(`maintenance_enabled = $${paramCount++}`);
      values.push(maintenance_enabled);
    }

    if (typeof maintenance_paid !== 'undefined') {
      updates.push(`maintenance_paid = $${paramCount++}`);
      values.push(maintenance_paid);
    }

    values.push(componentId, shipId);

    const result = await pool.query(`
      UPDATE ship_components
      SET ${updates.join(', ')}
      WHERE id = $${paramCount++} AND ship_id = $${paramCount}
      RETURNING *
    `, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Component not found' });
    }

    // Emit socket event to ship's own room
    const io = req.app.get('io');
    io.to(`ship_${shipId}`).emit('ship_updated', {
      message: 'Component maintenance status updated',
      shipId: shipId
    });

    // Also emit a global event for nearby ship updates (for sensor scans)
    io.emit('nearby_ship_updated', {
      shipId: shipId,
      message: 'Nearby ship updated'
    });

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating component maintenance:', error);
    res.status(500).json({ error: 'Failed to update component maintenance' });
  }
});

// PUT upgrade component to advanced
router.put('/:shipId/components/:componentId/upgrade', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { shipId, componentId } = req.params;
    
    await client.query('BEGIN');
    
    // Get component with template
    const componentResult = await client.query(`
      SELECT sc.*, ct.can_be_advanced, ct.component_type, ct.slots_required
      FROM ship_components sc
      JOIN component_templates ct ON sc.component_template_id = ct.id
      WHERE sc.id = $1 AND sc.ship_id = $2
    `, [componentId, shipId]);
    
    if (componentResult.rows.length === 0) {
      throw new Error('Component not found');
    }
    
    const component = componentResult.rows[0];
    
    if (!component.can_be_advanced) {
      throw new Error('This component cannot be advanced');
    }
    
    if (component.is_advanced) {
      throw new Error('Component is already advanced');
    }
    
    // Get ship
    const shipResult = await client.query('SELECT * FROM ships WHERE id = $1', [shipId]);
    const ship = shipResult.rows[0];
    
    // Check if there's room for the additional slot
    const additionalSlots = component.slots_required; // Advanced takes double, so needs +1 more
    
    if (component.component_type === 'system') {
      if (ship.system_slots_used + additionalSlots > ship.system_slots_max) {
        throw new Error('Insufficient system slots for upgrade');
      }
    } else {
      if (ship.feature_slots_used + additionalSlots > ship.feature_slots_max) {
        throw new Error('Insufficient feature slots for upgrade');
      }
    }
    
    // Upgrade to advanced
    await client.query(
      'UPDATE ship_components SET is_advanced = true WHERE id = $1',
      [componentId]
    );
    
    // Update slot usage
    await updateSlotUsage(shipId, client);
    
    await client.query('COMMIT');
    
    res.json({ message: 'Component upgraded to advanced successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error upgrading component:', error);
    res.status(500).json({ error: error.message || 'Failed to upgrade component' });
  } finally {
    client.release();
  }
});

module.exports = router;
