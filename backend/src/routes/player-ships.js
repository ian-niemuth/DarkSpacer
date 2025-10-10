// Player Ship Routes
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// GET ships accessible to a player
router.get('/my-ships', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get user's characters
    const charactersResult = await pool.query(
      'SELECT id FROM characters WHERE user_id = $1',
      [userId]
    );
    
    const characterIds = charactersResult.rows.map(c => c.id);
    
    if (characterIds.length === 0) {
      return res.json([]);
    }
    
    // Get all accessible ships
    const shipsResult = await pool.query(`
      SELECT DISTINCT ON (s.id)
        s.*,
        CASE 
          WHEN s.owner_type = 'character' THEN c.name
          ELSE 'Party Ship'
        END as owner_name,
        sca.crew_role,
        sca.is_primary_role,
        sca.is_captain,
        CASE 
          WHEN s.owner_type = 'character' AND s.owner_id = ANY($1) THEN true
          WHEN sca.is_captain = true THEN true
          ELSE false
        END as can_purchase
      FROM ships s
      LEFT JOIN characters c ON s.owner_type = 'character' AND s.owner_id = c.id
      LEFT JOIN ship_crew_assignments sca ON s.id = sca.ship_id AND sca.character_id = ANY($1)
      WHERE 
        s.owner_type = 'party' OR                          -- Party ships
        s.owner_id = ANY($1) OR                            -- Ships they own
        sca.character_id = ANY($1)                         -- Ships they're crew on
      ORDER BY s.id, s.created_at DESC
    `, [characterIds]);
    
    res.json(shipsResult.rows);
  } catch (error) {
    console.error('Error fetching player ships:', error);
    res.status(500).json({ error: 'Failed to fetch ships' });
  }
});

// GET single ship details for player
router.get('/my-ships/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    
    console.log(`[Player Ships] User ${userId} requesting ship ${id}`);
    
    // Get user's characters
    const charactersResult = await pool.query(
      'SELECT id FROM characters WHERE user_id = $1',
      [userId]
    );
    
    const characterIds = charactersResult.rows.map(c => c.id);
    console.log(`[Player Ships] User has characters:`, characterIds);
    
    if (characterIds.length === 0) {
      console.log(`[Player Ships] User ${userId} has no characters`);
      return res.status(403).json({ error: 'No characters found' });
    }
    
    // Check access to this ship
    const accessCheck = await pool.query(`
      SELECT s.id
      FROM ships s
      LEFT JOIN ship_crew_assignments sca ON s.id = sca.ship_id AND sca.character_id = ANY($1)
      WHERE s.id = $2 AND (
        s.owner_type = 'party' OR
        s.owner_id = ANY($1) OR
        sca.character_id = ANY($1)
      )
    `, [characterIds, id]);
    
    console.log(`[Player Ships] Access check result:`, accessCheck.rows);
    
    if (accessCheck.rows.length === 0) {
      console.log(`[Player Ships] Access denied for user ${userId} to ship ${id}`);
      return res.status(403).json({ error: 'You do not have access to this ship' });
    }
    
    // Get full ship details (reuse existing endpoint logic)
    const shipResult = await pool.query('SELECT * FROM ships WHERE id = $1', [id]);
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
            'cost', wt.cost,
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
      SELECT sa.*, at.name, at.category, at.ac_formula, at.ac_bonus, at.properties, at.dex_modifier_effect, at.cost
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
      SELECT sca.*, c.name as character_name, c.archetype, c.user_id
      FROM ship_crew_assignments sca
      JOIN characters c ON sca.character_id = c.id
      WHERE sca.ship_id = $1
      ORDER BY sca.crew_role
    `, [id]);
    
    // Calculate maintenance
    const maintenanceResult = await pool.query(`
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
    `, [id]);
    
    const maintenanceCost = Math.round(
      parseFloat(maintenanceResult.rows[0].component_maintenance) +
      parseFloat(maintenanceResult.rows[0].array_maintenance) +
      parseFloat(maintenanceResult.rows[0].weapon_maintenance)
    );
    
    // Check if user is captain or owner
    const isCaptain = crewResult.rows.some(c => 
      characterIds.includes(c.character_id) && c.is_captain === true
    );
    const isOwner = characterIds.includes(ship.owner_id);
    const canPurchase = isCaptain || isOwner;
    
    // Get user's crew assignment
    const userCrewAssignment = crewResult.rows.find(c => characterIds.includes(c.character_id));
    
    console.log(`[Player Ships] Captain check:`, {
      isCaptain,
      isOwner,
      canPurchase,
      userCrewAssignment: userCrewAssignment?.crew_role,
      crewWithCaptainFlag: crewResult.rows.map(c => ({ name: c.character_name, is_captain: c.is_captain }))
    });
    
    res.json({
      ...ship,
      components: componentsResult.rows,
      weapons_arrays: arraysResult.rows,
      armor: armorResult.rows[0] || null,
      enhancements: enhancementsResult.rows,
      crew: crewResult.rows,
      total_maintenance_cost: maintenanceCost,
      can_purchase: canPurchase,
      is_captain: isCaptain,
      user_role: userCrewAssignment?.crew_role || (isOwner ? 'Owner' : null)
    });
  } catch (error) {
    console.error('Error fetching ship details:', error);
    res.status(500).json({ error: 'Failed to fetch ship details' });
  }
});

module.exports = router;
