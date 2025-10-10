// backend/src/routes/abilities.js
// Routes for managing daily ability usage tracking

const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Helper function to parse talents safely
const safeParseTalents = (talents) => {
  if (!talents) return [];
  if (Array.isArray(talents)) return talents;
  if (typeof talents === 'object') return [talents];
  if (typeof talents === 'string') {
    try {
      const parsed = JSON.parse(talents);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      console.error('Error parsing talents:', e);
      return [];
    }
  }
  return [];
};

// Archetype ability definitions with usesPerDay
const ARCHETYPE_ABILITIES = {
  'Clever': [
    { name: 'Keen Support', usesPerDay: 3 }
  ],
  'Tough': [
    { name: 'Unyielding', usesPerDay: 3 }
  ],
  'Wise': [
    { name: 'Enlightenment', usesPerDay: 3 }
  ]
};

router.use(authenticateToken);

// Initialize ability uses for a character
// This should be called when a character is created or when ability tracking is first enabled
router.post('/initialize/:characterId', async (req, res) => {
  const { characterId } = req.params;
  
  try {
    // Get character data
    const charResult = await pool.query(
      'SELECT archetype, talents FROM characters WHERE id = $1',
      [characterId]
    );
    
    if (charResult.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }
    
    const { archetype, talents } = charResult.rows[0];
    const parsedTalents = safeParseTalents(talents);
    
    // Get archetype abilities with daily uses
    const archetypeAbilities = ARCHETYPE_ABILITIES[archetype] || [];
    
    // Initialize archetype abilities
    for (let abilityIdx = 0; abilityIdx < archetypeAbilities.length; abilityIdx++) {
      const ability = archetypeAbilities[abilityIdx];
      if (ability.usesPerDay) {
        for (let useIdx = 0; useIdx < ability.usesPerDay; useIdx++) {
          await pool.query(
            `INSERT INTO ability_uses (character_id, ability_type, ability_index, use_index, is_used)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (character_id, ability_type, ability_index, use_index) 
             DO NOTHING`,
            [characterId, 'archetype', abilityIdx, useIdx, false]
          );
        }
      }
    }
    
    // Initialize talent abilities
    for (let talentIdx = 0; talentIdx < parsedTalents.length; talentIdx++) {
      const talent = parsedTalents[talentIdx];
      if (talent.usesPerDay) {
        for (let useIdx = 0; useIdx < talent.usesPerDay; useIdx++) {
          await pool.query(
            `INSERT INTO ability_uses (character_id, ability_type, ability_index, use_index, is_used)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (character_id, ability_type, ability_index, use_index) 
             DO NOTHING`,
            [characterId, 'talent', talentIdx, useIdx, false]
          );
        }
      }
    }
    
    res.json({ message: 'Ability uses initialized successfully' });
  } catch (error) {
    console.error('Error initializing ability uses:', error);
    res.status(500).json({ error: 'Failed to initialize ability uses' });
  }
});

// Get all ability uses for a character
router.get('/:characterId', async (req, res) => {
  const { characterId } = req.params;
  
  try {
    // Verify character access
    const charCheck = await pool.query(
      'SELECT id FROM characters WHERE id = $1 AND (user_id = $2 OR $3 = true)',
      [characterId, req.user.userId, req.user.isAdmin]
    );
    
    if (charCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }
    
    const result = await pool.query(
      `SELECT * FROM ability_uses 
       WHERE character_id = $1 
       ORDER BY ability_type, ability_index, use_index`,
      [characterId]
    );
    
    // If no ability uses exist, initialize them
    if (result.rows.length === 0) {
      // Auto-initialize
      await initializeAbilityUses(characterId);
      // Fetch again
      const retryResult = await pool.query(
        `SELECT * FROM ability_uses 
         WHERE character_id = $1 
         ORDER BY ability_type, ability_index, use_index`,
        [characterId]
      );
      return res.json(retryResult.rows);
    }
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching ability uses:', error);
    res.status(500).json({ error: 'Failed to fetch ability uses' });
  }
});

// Helper function to initialize (extracted for reuse)
async function initializeAbilityUses(characterId) {
  const charResult = await pool.query(
    'SELECT archetype, talents FROM characters WHERE id = $1',
    [characterId]
  );
  
  if (charResult.rows.length === 0) {
    throw new Error('Character not found');
  }
  
  const { archetype, talents } = charResult.rows[0];
  const parsedTalents = safeParseTalents(talents);
  const archetypeAbilities = ARCHETYPE_ABILITIES[archetype] || [];
  
  // Initialize archetype abilities
  for (let abilityIdx = 0; abilityIdx < archetypeAbilities.length; abilityIdx++) {
    const ability = archetypeAbilities[abilityIdx];
    if (ability.usesPerDay) {
      for (let useIdx = 0; useIdx < ability.usesPerDay; useIdx++) {
        await pool.query(
          `INSERT INTO ability_uses (character_id, ability_type, ability_index, use_index, is_used)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (character_id, ability_type, ability_index, use_index) 
           DO NOTHING`,
          [characterId, 'archetype', abilityIdx, useIdx, false]
        );
      }
    }
  }
  
  // Initialize talent abilities
  for (let talentIdx = 0; talentIdx < parsedTalents.length; talentIdx++) {
    const talent = parsedTalents[talentIdx];
    if (talent.usesPerDay) {
      for (let useIdx = 0; useIdx < talent.usesPerDay; useIdx++) {
        await pool.query(
          `INSERT INTO ability_uses (character_id, ability_type, ability_index, use_index, is_used)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (character_id, ability_type, ability_index, use_index) 
           DO NOTHING`,
          [characterId, 'talent', talentIdx, useIdx, false]
        );
      }
    }
  }
}

// Mark a specific ability as used (ONE-WAY ONLY - players cannot uncheck)
// Only DMs can reset abilities through the reset endpoints
router.post('/:characterId/use', async (req, res) => {
  const { abilityType, abilityIndex, useIndex } = req.body;
  
  try {
    // Verify character access (must own character)
    const charCheck = await pool.query(
      'SELECT id FROM characters WHERE id = $1 AND user_id = $2',
      [req.params.characterId, req.user.userId]
    );
    
    if (charCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found or access denied' });
    }
    
    // Check if ability use exists
    const existingResult = await pool.query(
      `SELECT * FROM ability_uses 
       WHERE character_id = $1 AND ability_type = $2 AND ability_index = $3 AND use_index = $4`,
      [req.params.characterId, abilityType, abilityIndex, useIndex]
    );
    
    let result;
    
    if (existingResult.rows.length === 0) {
      // Create new entry marked as used
      result = await pool.query(
        `INSERT INTO ability_uses (character_id, ability_type, ability_index, use_index, is_used, updated_at)
         VALUES ($1, $2, $3, $4, true, CURRENT_TIMESTAMP)
         RETURNING *`,
        [req.params.characterId, abilityType, abilityIndex, useIndex]
      );
    } else {
      // Only allow marking as used (is_used = true), never unchecking
      // If already used, this is a no-op but returns current state
      result = await pool.query(
        `UPDATE ability_uses 
         SET is_used = true, updated_at = CURRENT_TIMESTAMP
         WHERE character_id = $1 AND ability_type = $2 AND ability_index = $3 AND use_index = $4
         RETURNING *`,
        [req.params.characterId, abilityType, abilityIndex, useIndex]
      );
    }
    
    res.json({
      message: 'Ability marked as used',
      abilityUse: result.rows[0]
    });
  } catch (error) {
    console.error('Error marking ability as used:', error);
    res.status(500).json({ error: 'Failed to mark ability as used' });
  }
});

// Reset all abilities for a specific character (ADMIN ONLY)
router.post('/:characterId/reset', async (req, res) => {
  const { characterId } = req.params;
  
  try {
    // Only admins can reset abilities
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    await pool.query('SELECT reset_character_abilities($1)', [characterId]);
    
    res.json({ message: 'Character abilities reset successfully' });
  } catch (error) {
    console.error('Error resetting character abilities:', error);
    res.status(500).json({ error: 'Failed to reset character abilities' });
  }
});

// Reset all abilities for ALL characters (ADMIN ONLY - DM function)
router.post('/reset-all', async (req, res) => {
  try {
    // Only admins can reset all abilities
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    await pool.query('SELECT reset_all_abilities()');
    
    res.json({ message: 'All character abilities reset successfully' });
  } catch (error) {
    console.error('Error resetting all abilities:', error);
    res.status(500).json({ error: 'Failed to reset all abilities' });
  }
});

module.exports = router;
