// Ship Weapons Management Routes
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Apply authentication to all routes
router.use(authenticateToken);

// ============================================
// WEAPON TEMPLATES
// ============================================

// GET all weapon templates
router.get('/templates/weapons', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM weapon_templates 
      ORDER BY category, cost
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching weapon templates:', error);
    res.status(500).json({ error: 'Failed to fetch weapon templates' });
  }
});

// ============================================
// WEAPONS ARRAYS
// ============================================

// POST create new weapons array on ship
router.post('/:id/weapons-arrays', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { id } = req.params;
    const { 
      array_name = 'Weapons Array',
      max_weapons = 4,
      is_firelinked = false
    } = req.body;
    
    await client.query('BEGIN');
    
    // Check ship exists
    const shipResult = await client.query('SELECT * FROM ships WHERE id = $1', [id]);
    if (shipResult.rows.length === 0) {
      throw new Error('Ship not found');
    }
    
    const ship = shipResult.rows[0];
    
    // Check system slot availability (weapons array takes 1 system slot)
    if (ship.system_slots_used >= ship.system_slots_max) {
      throw new Error('Insufficient system slots');
    }
    
    // Create weapons array
    const result = await client.query(`
      INSERT INTO ship_weapons_arrays (ship_id, array_name, max_weapons, is_firelinked, firelink_cost_paid)
      VALUES ($1, $2, $3, $4, $4)
      RETURNING *
    `, [id, array_name, max_weapons, is_firelinked]);
    
    // Update slot usage
    await client.query(`
      UPDATE ships 
      SET system_slots_used = system_slots_used + 1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
    `, [id]);
    
    await client.query('COMMIT');
    
    res.json(result.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating weapons array:', error);
    res.status(500).json({ error: error.message || 'Failed to create weapons array' });
  } finally {
    client.release();
  }
});

// DELETE weapons array
router.delete('/:shipId/weapons-arrays/:arrayId', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { shipId, arrayId } = req.params;
    
    await client.query('BEGIN');
    
    // Delete array (cascade will delete weapons)
    const result = await client.query(
      'DELETE FROM ship_weapons_arrays WHERE id = $1 AND ship_id = $2 RETURNING *',
      [arrayId, shipId]
    );
    
    if (result.rows.length === 0) {
      throw new Error('Weapons array not found');
    }
    
    // Update slot usage
    await client.query(`
      UPDATE ships 
      SET system_slots_used = system_slots_used - 1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
    `, [shipId]);
    
    await client.query('COMMIT');
    
    res.json({ message: 'Weapons array removed successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error removing weapons array:', error);
    res.status(500).json({ error: error.message || 'Failed to remove weapons array' });
  } finally {
    client.release();
  }
});

// PUT toggle firelink on weapons array
router.put('/:shipId/weapons-arrays/:arrayId/firelink', async (req, res) => {
  try {
    const { shipId, arrayId } = req.params;
    const { is_firelinked } = req.body;
    
    const result = await pool.query(`
      UPDATE ship_weapons_arrays 
      SET is_firelinked = $1, firelink_cost_paid = $1
      WHERE id = $2 AND ship_id = $3
      RETURNING *
    `, [is_firelinked, arrayId, shipId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Weapons array not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating firelink:', error);
    res.status(500).json({ error: 'Failed to update firelink' });
  }
});

// PUT toggle weapons array maintenance
router.put('/:shipId/weapons-arrays/:arrayId/maintenance', async (req, res) => {
  try {
    const { shipId, arrayId } = req.params;
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

    values.push(arrayId, shipId);

    const result = await pool.query(`
      UPDATE ship_weapons_arrays
      SET ${updates.join(', ')}
      WHERE id = $${paramCount++} AND ship_id = $${paramCount}
      RETURNING *
    `, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Weapons array not found' });
    }

    // Emit socket event
    const io = req.app.get('io');
    io.to(`ship_${shipId}`).emit('ship_updated', {
      message: 'Weapons array maintenance status updated',
      shipId: shipId
    });

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating weapons array maintenance:', error);
    res.status(500).json({ error: 'Failed to update weapons array maintenance' });
  }
});

// ============================================
// INDIVIDUAL WEAPONS
// ============================================

// POST add weapon to array
router.post('/:shipId/weapons-arrays/:arrayId/weapons', async (req, res) => {
  try {
    const { shipId, arrayId } = req.params;
    const { weapon_template_id, array_position } = req.body;
    
    // Get weapon template
    const templateResult = await pool.query(
      'SELECT * FROM weapon_templates WHERE id = $1',
      [weapon_template_id]
    );
    
    if (templateResult.rows.length === 0) {
      return res.status(404).json({ error: 'Weapon template not found' });
    }
    
    const template = templateResult.rows[0];
    
    // Get weapons array
    const arrayResult = await pool.query(
      'SELECT * FROM ship_weapons_arrays WHERE id = $1 AND ship_id = $2',
      [arrayId, shipId]
    );
    
    if (arrayResult.rows.length === 0) {
      return res.status(404).json({ error: 'Weapons array not found' });
    }
    
    const array = arrayResult.rows[0];
    
    // Check if array is full
    const weaponCountResult = await pool.query(
      'SELECT COUNT(*) as count FROM ship_weapons WHERE weapons_array_id = $1',
      [arrayId]
    );
    
    if (parseInt(weaponCountResult.rows[0].count) >= array.max_weapons) {
      return res.status(400).json({ error: 'Weapons array is full' });
    }
    
    // Install weapon
    const result = await pool.query(`
      INSERT INTO ship_weapons (
        weapons_array_id, 
        weapon_template_id, 
        array_position,
        requires_ammo,
        requires_energy_generator,
        is_single_use
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [
      arrayId, 
      weapon_template_id, 
      array_position || 1,
      template.requires_ammo,
      template.requires_energy_generator,
      template.is_single_use
    ]);
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error adding weapon:', error);
    res.status(500).json({ error: 'Failed to add weapon' });
  }
});

// DELETE remove weapon from array
router.delete('/:shipId/weapons-arrays/:arrayId/weapons/:weaponId', async (req, res) => {
  try {
    const { weaponId } = req.params;
    
    const result = await pool.query(
      'DELETE FROM ship_weapons WHERE id = $1 RETURNING *',
      [weaponId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Weapon not found' });
    }
    
    res.json({ message: 'Weapon removed successfully' });
  } catch (error) {
    console.error('Error removing weapon:', error);
    res.status(500).json({ error: 'Failed to remove weapon' });
  }
});

// PUT load ammo into weapon
router.put('/:shipId/weapons/:weaponId/load-ammo', async (req, res) => {
  try {
    const { weaponId } = req.params;
    const { character_id, rounds_remaining } = req.body;
    
    // Get weapon
    const weaponResult = await pool.query(
      'SELECT * FROM ship_weapons WHERE id = $1',
      [weaponId]
    );
    
    if (weaponResult.rows.length === 0) {
      return res.status(404).json({ error: 'Weapon not found' });
    }
    
    const weapon = weaponResult.rows[0];
    
    if (!weapon.requires_ammo) {
      return res.status(400).json({ error: 'This weapon does not require ammo' });
    }
    
    // Update weapon
    await pool.query(
      'UPDATE ship_weapons SET ammo_loaded = true WHERE id = $1',
      [weaponId]
    );
    
    // Create ammo magazine record
    const magazineResult = await pool.query(`
      INSERT INTO ship_ammo_magazines (ship_weapon_id, loaded_by_character_id, rounds_remaining)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [weaponId, character_id, rounds_remaining || 100]);
    
    res.json({ message: 'Ammo loaded successfully', magazine: magazineResult.rows[0] });
  } catch (error) {
    console.error('Error loading ammo:', error);
    res.status(500).json({ error: 'Failed to load ammo' });
  }
});

// PUT unload ammo from weapon
router.put('/:shipId/weapons/:weaponId/unload-ammo', async (req, res) => {
  try {
    const { weaponId } = req.params;
    
    // Update weapon
    await pool.query(
      'UPDATE ship_weapons SET ammo_loaded = false WHERE id = $1',
      [weaponId]
    );
    
    // Remove magazine
    await pool.query(
      'DELETE FROM ship_ammo_magazines WHERE ship_weapon_id = $1',
      [weaponId]
    );
    
    res.json({ message: 'Ammo unloaded successfully' });
  } catch (error) {
    console.error('Error unloading ammo:', error);
    res.status(500).json({ error: 'Failed to unload ammo' });
  }
});

// PUT mark weapon as damaged/repaired
router.put('/:shipId/weapons/:weaponId/damage', async (req, res) => {
  try {
    const { weaponId } = req.params;
    const { is_damaged } = req.body;
    
    const result = await pool.query(
      'UPDATE ship_weapons SET is_damaged = $1 WHERE id = $2 RETURNING *',
      [is_damaged, weaponId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Weapon not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating weapon damage:', error);
    res.status(500).json({ error: 'Failed to update weapon damage' });
  }
});

// PUT mark single-use weapon as used
router.put('/:shipId/weapons/:weaponId/use', async (req, res) => {
  try {
    const { weaponId } = req.params;
    
    const result = await pool.query(
      'UPDATE ship_weapons SET is_used = true WHERE id = $1 AND is_single_use = true RETURNING *',
      [weaponId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Weapon not found or not single-use' });
    }
    
    res.json({ message: 'Weapon marked as used', weapon: result.rows[0] });
  } catch (error) {
    console.error('Error marking weapon as used:', error);
    res.status(500).json({ error: 'Failed to mark weapon as used' });
  }
});

module.exports = router;
