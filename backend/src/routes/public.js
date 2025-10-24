// backend/src/routes/public.js
// Public routes that don't require authentication (but may require access keys)
const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// HUD Access Key (fallback to a default if not set in .env)
const HUD_ACCESS_KEY = process.env.HUD_ACCESS_KEY || 'darkspace-hud-2024';

// GET all characters for HUD display (requires access key)
router.get('/hud-characters', async (req, res) => {
  try {
    const { key } = req.query;

    // Validate access key
    if (!key || key !== HUD_ACCESS_KEY) {
      return res.status(403).json({
        error: 'Invalid or missing access key'
      });
    }

    // Fetch all characters with their player usernames and equipped gear
    const charactersResult = await pool.query(`
      SELECT
        c.*,
        u.username as player_username
      FROM characters c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.name
    `);

    const characters = charactersResult.rows;

    // For each character, fetch their equipped gear and inventory stats
    for (let character of characters) {
      // Get equipped gear (including energy cell timer info)
      const equippedGear = await pool.query(`
        SELECT
          i.id,
          i.item_name,
          i.equipped_slot,
          i.loaded_energy_cell_id,
          i.loaded_ammo_id,
          i.energy_cell_loaded_at,
          i.energy_cell_expires_at,
          COALESCE(g.damage, i.damage) as damage,
          COALESCE(g.range, i.range) as range,
          COALESCE(g.properties, i.properties) as properties
        FROM inventory i
        LEFT JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
        WHERE i.character_id = $1 AND i.equipped = true
        ORDER BY i.equipped_slot
      `, [character.id]);

      character.equipped_gear = equippedGear.rows;

      // Get inventory slot usage
      const inventoryStats = await pool.query(`
        SELECT
          COALESCE(SUM(COALESCE(g.weight, i.weight, 1) * i.quantity), 0) as slots_used
        FROM inventory i
        LEFT JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
        WHERE i.character_id = $1
      `, [character.id]);

      character.slots_used = parseInt(inventoryStats.rows[0]?.slots_used) || 0;

      // Calculate max slots (10 + CON modifier, min 10)
      const conMod = Math.floor((character.constitution - 10) / 2);
      character.slots_max = Math.max(10, 10 + conMod);
    }

    res.json(characters);
  } catch (error) {
    console.error('Error fetching HUD characters:', error);
    res.status(500).json({ error: 'Failed to fetch characters' });
  }
});

// GET the HUD access key (admin only - for displaying in UI)
router.get('/hud-key', (req, res) => {
  res.json({ key: HUD_ACCESS_KEY });
});

// GET slot assignments for a specific layout (requires access key)
router.get('/slot-assignments', async (req, res) => {
  try {
    const { key, layout } = req.query;

    // Validate access key
    if (!key || key !== HUD_ACCESS_KEY) {
      return res.status(403).json({
        error: 'Invalid or missing access key'
      });
    }

    // Validate layout parameter
    if (!layout || !['large-top', 'large-bottom', 'small-top', 'small-bottom'].includes(layout)) {
      return res.status(400).json({
        error: 'Invalid layout parameter. Must be "large-top", "large-bottom", "small-top", or "small-bottom"'
      });
    }

    // Fetch slot assignments for this layout
    const assignmentsResult = await pool.query(`
      SELECT
        csa.slot_number,
        c.id,
        c.name,
        c.level,
        c.archetype,
        c.background,
        c.hp_current,
        c.hp_max,
        c.ac,
        sca.crew_role
      FROM character_slot_assignments csa
      JOIN characters c ON csa.character_id = c.id
      LEFT JOIN ship_crew_assignments sca ON c.id = sca.character_id
      WHERE csa.layout_type = $1
      ORDER BY csa.slot_number
    `, [layout]);

    res.json(assignmentsResult.rows);
  } catch (error) {
    console.error('Error fetching slot assignments:', error);
    res.status(500).json({ error: 'Failed to fetch slot assignments' });
  }
});

module.exports = router;
