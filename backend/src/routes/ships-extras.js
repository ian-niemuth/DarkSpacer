// Ship Armor, Enhancements, and Crew Routes
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { calculateShipAC } = require('../utils/shipCalculations');

// Apply authentication to all routes
router.use(authenticateToken);

// ============================================
// ARMOR MANAGEMENT
// ============================================

// GET all armor templates
router.get('/templates/armor', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM armor_templates 
      ORDER BY cost
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching armor templates:', error);
    res.status(500).json({ error: 'Failed to fetch armor templates' });
  }
});

// POST install armor on ship
router.post('/:id/armor', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { id } = req.params;
    const { armor_template_id } = req.body;
    
    await client.query('BEGIN');
    
    // Check if ship already has armor
    const existingArmor = await client.query(
      'SELECT * FROM ship_armor WHERE ship_id = $1',
      [id]
    );
    
    if (existingArmor.rows.length > 0) {
      throw new Error('Ship already has armor installed. Remove existing armor first.');
    }
    
    // Get armor template
    const templateResult = await client.query(
      'SELECT * FROM armor_templates WHERE id = $1',
      [armor_template_id]
    );
    
    if (templateResult.rows.length === 0) {
      throw new Error('Armor template not found');
    }
    
    const template = templateResult.rows[0];
    
    // Check system slot availability if armor uses system slots
    if (template.uses_system_slot) {
      const shipResult = await client.query('SELECT * FROM ships WHERE id = $1', [id]);
      const ship = shipResult.rows[0];
      
      if (ship.system_slots_used + template.system_slots_required > ship.system_slots_max) {
        throw new Error('Insufficient system slots');
      }
    }
    
    // Install armor
    const result = await client.query(`
      INSERT INTO ship_armor (ship_id, armor_template_id)
      VALUES ($1, $2)
      RETURNING *
    `, [id, armor_template_id]);
    
    // Get ship data for AC calculation
    const shipData = await client.query('SELECT * FROM ships WHERE id = $1', [id]);
    const calculatedAC = calculateShipAC(shipData.rows[0], result.rows[0], template);
    
    // Update ship AC
    await client.query(
      'UPDATE ships SET ac = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [calculatedAC, id]
    );
    
    // Update slot usage if needed
    if (template.uses_system_slot) {
      await client.query(`
        UPDATE ships 
        SET system_slots_used = system_slots_used + $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `, [template.system_slots_required, id]);
    }
    
    await client.query('COMMIT');
    
    res.json(result.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error installing armor:', error);
    res.status(500).json({ error: error.message || 'Failed to install armor' });
  } finally {
    client.release();
  }
});

// DELETE remove armor from ship
router.delete('/:shipId/armor/:armorId', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { shipId, armorId } = req.params;
    
    await client.query('BEGIN');
    
    // Get armor with template
    const armorResult = await client.query(`
      SELECT sa.*, at.uses_system_slot, at.system_slots_required
      FROM ship_armor sa
      JOIN armor_templates at ON sa.armor_template_id = at.id
      WHERE sa.id = $1 AND sa.ship_id = $2
    `, [armorId, shipId]);
    
    if (armorResult.rows.length === 0) {
      throw new Error('Armor not found');
    }
    
    const armor = armorResult.rows[0];
    
    // Remove armor
    await client.query('DELETE FROM ship_armor WHERE id = $1', [armorId]);
    
    // Reset ship AC to base (10)
    await client.query(
      'UPDATE ships SET ac = 10, updated_at = CURRENT_TIMESTAMP WHERE id = $1',
      [shipId]
    );
    
    // Update slot usage if needed
    if (armor.uses_system_slot) {
      await client.query(`
        UPDATE ships 
        SET system_slots_used = system_slots_used - $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
      `, [armor.system_slots_required, shipId]);
    }
    
    await client.query('COMMIT');
    
    res.json({ message: 'Armor removed successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error removing armor:', error);
    res.status(500).json({ error: error.message || 'Failed to remove armor' });
  } finally {
    client.release();
  }
});

// PUT mark armor as damaged/repaired
router.put('/:shipId/armor/:armorId/damage', async (req, res) => {
  try {
    const { armorId } = req.params;
    const { is_damaged, energy_generator_damaged } = req.body;
    
    const updates = [];
    const values = [];
    let paramCount = 1;
    
    if (typeof is_damaged !== 'undefined') {
      updates.push(`is_damaged = $${paramCount++}`);
      values.push(is_damaged);
    }
    
    if (typeof energy_generator_damaged !== 'undefined') {
      updates.push(`energy_generator_damaged = $${paramCount++}`);
      values.push(energy_generator_damaged);
    }
    
    values.push(armorId);
    
    const result = await pool.query(`
      UPDATE ship_armor 
      SET ${updates.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Armor not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating armor damage:', error);
    res.status(500).json({ error: 'Failed to update armor damage' });
  }
});

// ============================================
// ENHANCEMENTS MANAGEMENT
// ============================================

// GET all enhancement templates
router.get('/templates/enhancements', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM enhancement_templates 
      ORDER BY enhancement_type, name
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching enhancement templates:', error);
    res.status(500).json({ error: 'Failed to fetch enhancement templates' });
  }
});

// POST install enhancement on ship
router.post('/:id/enhancements', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { id } = req.params;
    const { enhancement_template_id } = req.body;
    
    await client.query('BEGIN');
    
    // Get enhancement template
    const templateResult = await client.query(
      'SELECT * FROM enhancement_templates WHERE id = $1',
      [enhancement_template_id]
    );
    
    if (templateResult.rows.length === 0) {
      throw new Error('Enhancement template not found');
    }
    
    const template = templateResult.rows[0];
    
    // Get ship
    const shipResult = await client.query('SELECT * FROM ships WHERE id = $1', [id]);
    if (shipResult.rows.length === 0) {
      throw new Error('Ship not found');
    }
    
    const ship = shipResult.rows[0];
    
    // Check slot availability
    if (template.enhancement_type === 'system') {
      if (ship.system_slots_used + template.slots_required > ship.system_slots_max) {
        throw new Error('Insufficient system slots');
      }
    } else {
      if (ship.feature_slots_used + template.slots_required > ship.feature_slots_max) {
        throw new Error('Insufficient feature slots');
      }
    }
    
    // Install enhancement
    const result = await client.query(`
      INSERT INTO ship_enhancements (ship_id, enhancement_template_id)
      VALUES ($1, $2)
      RETURNING *
    `, [id, enhancement_template_id]);
    
    // Update slot usage
    const slotColumn = template.enhancement_type === 'system' ? 'system_slots_used' : 'feature_slots_used';
    await client.query(`
      UPDATE ships 
      SET ${slotColumn} = ${slotColumn} + $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
    `, [template.slots_required, id]);
    
    await client.query('COMMIT');
    
    res.json(result.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error installing enhancement:', error);
    res.status(500).json({ error: error.message || 'Failed to install enhancement' });
  } finally {
    client.release();
  }
});

// DELETE remove enhancement from ship
router.delete('/:shipId/enhancements/:enhancementId', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { shipId, enhancementId } = req.params;
    
    await client.query('BEGIN');
    
    // Get enhancement with template
    const enhancementResult = await client.query(`
      SELECT se.*, et.enhancement_type, et.slots_required
      FROM ship_enhancements se
      JOIN enhancement_templates et ON se.enhancement_template_id = et.id
      WHERE se.id = $1 AND se.ship_id = $2
    `, [enhancementId, shipId]);
    
    if (enhancementResult.rows.length === 0) {
      throw new Error('Enhancement not found');
    }
    
    const enhancement = enhancementResult.rows[0];
    
    // Remove enhancement
    await client.query('DELETE FROM ship_enhancements WHERE id = $1', [enhancementId]);
    
    // Update slot usage
    const slotColumn = enhancement.enhancement_type === 'system' ? 'system_slots_used' : 'feature_slots_used';
    await client.query(`
      UPDATE ships 
      SET ${slotColumn} = ${slotColumn} - $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
    `, [enhancement.slots_required, shipId]);
    
    await client.query('COMMIT');
    
    res.json({ message: 'Enhancement removed successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error removing enhancement:', error);
    res.status(500).json({ error: error.message || 'Failed to remove enhancement' });
  } finally {
    client.release();
  }
});

// PUT toggle enhancement active/inactive
router.put('/:shipId/enhancements/:enhancementId/toggle', async (req, res) => {
  try {
    const { enhancementId } = req.params;
    const { is_active } = req.body;
    
    const result = await pool.query(`
      UPDATE ship_enhancements 
      SET is_active = $1
      WHERE id = $2
      RETURNING *
    `, [is_active, enhancementId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Enhancement not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error toggling enhancement:', error);
    res.status(500).json({ error: 'Failed to toggle enhancement' });
  }
});

// ============================================
// CREW ASSIGNMENTS
// ============================================

// POST assign character to ship role
router.post('/:id/crew', async (req, res) => {
  try {
    const { id } = req.params;
    const { character_id, crew_role, is_primary_role = true, is_captain = false } = req.body;
    
    // Check if assignment already exists
    const existingResult = await pool.query(
      'SELECT * FROM ship_crew_assignments WHERE ship_id = $1 AND character_id = $2 AND crew_role = $3',
      [id, character_id, crew_role]
    );
    
    if (existingResult.rows.length > 0) {
      return res.status(400).json({ error: 'Character already assigned to this role on this ship' });
    }
    
    // If assigning as captain, remove captain from all other crew
    if (is_captain) {
      await pool.query(
        'UPDATE ship_crew_assignments SET is_captain = false WHERE ship_id = $1',
        [id]
      );
    }
    
    // Create assignment
    const result = await pool.query(`
      INSERT INTO ship_crew_assignments (ship_id, character_id, crew_role, is_primary_role, is_captain)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [id, character_id, crew_role, is_primary_role, is_captain]);
    
    // Update character's ship_role
    await pool.query(
      'UPDATE characters SET ship_role = $1 WHERE id = $2',
      [crew_role, character_id]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error assigning crew:', error);
    res.status(500).json({ error: 'Failed to assign crew' });
  }
});

// DELETE remove character from ship role
router.delete('/:shipId/crew/:assignmentId', async (req, res) => {
  try {
    const { assignmentId } = req.params;
    
    const result = await pool.query(
      'DELETE FROM ship_crew_assignments WHERE id = $1 RETURNING *',
      [assignmentId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Crew assignment not found' });
    }
    
    // Clear character's ship_role if this was their primary role
    if (result.rows[0].is_primary_role) {
      await pool.query(
        'UPDATE characters SET ship_role = NULL WHERE id = $1',
        [result.rows[0].character_id]
      );
    }
    
    res.json({ message: 'Crew assignment removed successfully' });
  } catch (error) {
    console.error('Error removing crew assignment:', error);
    res.status(500).json({ error: 'Failed to remove crew assignment' });
  }
});

// PUT update crew role
router.put('/:shipId/crew/:assignmentId', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { shipId, assignmentId } = req.params;
    const { crew_role, is_primary_role, is_captain } = req.body;
    
    await client.query('BEGIN');
    
    // If setting as captain, remove captain from all other crew
    if (is_captain === true) {
      await client.query(
        'UPDATE ship_crew_assignments SET is_captain = false WHERE ship_id = $1',
        [shipId]
      );
    }
    
    const updates = [];
    const values = [];
    let paramCount = 1;
    
    if (crew_role) {
      updates.push(`crew_role = ${paramCount++}`);
      values.push(crew_role);
    }
    
    if (typeof is_primary_role !== 'undefined') {
      updates.push(`is_primary_role = ${paramCount++}`);
      values.push(is_primary_role);
    }
    
    if (typeof is_captain !== 'undefined') {
      updates.push(`is_captain = ${paramCount++}`);
      values.push(is_captain);
    }
    
    if (updates.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    values.push(assignmentId);
    
    const result = await client.query(`
      UPDATE ship_crew_assignments 
      SET ${updates.join(', ')}
      WHERE id = ${paramCount}
      RETURNING *
    `, values);
    
    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Crew assignment not found' });
    }
    
    // Update character's ship_role if this is their primary role
    if (result.rows[0].is_primary_role && crew_role) {
      await client.query(
        'UPDATE characters SET ship_role = $1 WHERE id = $2',
        [crew_role, result.rows[0].character_id]
      );
    }
    
    await client.query('COMMIT');
    res.json(result.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error updating crew assignment:', error);
    res.status(500).json({ error: 'Failed to update crew assignment' });
  } finally {
    client.release();
  }
});

// GET available crew roles
router.get('/crew-roles', async (req, res) => {
  const roles = [
    'Captain',
    'Pilot',
    'Co-Pilot',
    'Gunner',
    'Astrogator',
    'Chaplain',
    'Cook',
    'Engineer',
    'Medic',
    'Quartermaster',
    'Salvage Engineer'
  ];
  
  res.json(roles);
});

module.exports = router;
