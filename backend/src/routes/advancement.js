// backend/src/routes/advancement.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const { rollHitPoints, getRandomTalent } = require('../config/talentTables');
const { calculateArchetypeACBonus } = require('../utils/archetypeAbilities');

router.use(authenticateToken);

// Get XP requirements for next level
function getXPRequired(currentLevel) {
  return currentLevel * 10;
}

// Check if level grants talent
function grantsTalent(level) {
  // Talents at levels 1, 3, 5, 7, 9
  return level % 2 === 1 && level <= 9;
}

// ✅ GM: Award XP to character(s)
router.post('/award-xp', isAdmin, async (req, res) => {
  try {
    const { characterIds, xpAmount, reason } = req.body;
    
    if (!Array.isArray(characterIds) || characterIds.length === 0) {
      return res.status(400).json({ error: 'Must provide character IDs' });
    }
    
    if (!xpAmount || xpAmount <= 0) {
      return res.status(400).json({ error: 'XP amount must be positive' });
    }
    
    const results = [];
    
    for (const charId of characterIds) {
      // Get current character data
      const charResult = await pool.query(
        'SELECT id, name, level, xp FROM characters WHERE id = $1',
        [charId]
      );
      
      if (charResult.rows.length === 0) {
        continue;
      }
      
      const character = charResult.rows[0];
      const newXP = character.xp + xpAmount;
      const xpRequired = getXPRequired(character.level);
      
      // Update XP
      await pool.query(
        'UPDATE characters SET xp = $1 WHERE id = $2',
        [newXP, charId]
      );
      
      // Log XP award
      await pool.query(
        `INSERT INTO xp_log (character_id, amount, reason, awarded_by)
         VALUES ($1, $2, $3, $4)`,
        [charId, xpAmount, reason || 'XP Award', req.user.userId]
      );
      
      // Emit socket event to notify character's socket room
      const io = req.app.get('io');
      io.to(`character_${charId}`).emit('character_updated', {
        characterId: charId,
        xp: newXP,
        canLevelUp: newXP >= xpRequired && character.level < 10,
        message: `You gained ${xpAmount} XP! ${reason || ''}`
      });

      results.push({
        characterId: charId,
        characterName: character.name,
        oldXP: character.xp,
        newXP: newXP,
        xpRequired: xpRequired,
        canLevelUp: newXP >= xpRequired
      });
    }

    // Notify admin panel to refresh
    const io = req.app.get('io');
    io.emit('admin_refresh');

    res.json({
      message: `Awarded ${xpAmount} XP to ${characterIds.length} character(s)`,
      results
    });
    
  } catch (error) {
    console.error('Error awarding XP:', error);
    res.status(500).json({ error: 'Failed to award XP' });
  }
});

// ✅ Check if character can level up
router.get('/can-level-up/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    
    const result = await pool.query(
      'SELECT level, xp FROM characters WHERE id = $1 AND user_id = $2',
      [characterId, req.user.userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }
    
    const character = result.rows[0];
    const xpRequired = getXPRequired(character.level);
    const canLevelUp = character.xp >= xpRequired && character.level < 10;
    
    res.json({
      canLevelUp,
      currentLevel: character.level,
      currentXP: character.xp,
      xpRequired,
      nextLevel: character.level + 1
    });
    
  } catch (error) {
    console.error('Error checking level up:', error);
    res.status(500).json({ error: 'Failed to check level up status' });
  }
});

// ✅ Perform level up
router.post('/level-up/:characterId', async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const { characterId } = req.params;
    
    // Get character data
    const charResult = await client.query(
      `SELECT id, name, archetype, level, xp, hp_max, ac, constitution, 
              strength, dexterity, intelligence, wisdom, charisma, talents
       FROM characters 
       WHERE id = $1 AND user_id = $2`,
      [characterId, req.user.userId]
    );
    
    if (charResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Character not found' });
    }
    
    const character = charResult.rows[0];
    const xpRequired = getXPRequired(character.level);
    
    // Verify can level up
    if (character.xp < xpRequired) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        error: `Not enough XP. Need ${xpRequired}, have ${character.xp}` 
      });
    }
    
    if (character.level >= 10) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Already at max level (10)' });
    }
    
    const newLevel = character.level + 1;
    
    // 1. Roll HP increase
    // Rules: "Roll your class's hit points die and add it to your maximum HP."
    // CON modifier only applies at character creation (level 1), not at level up
    const hpRoll = rollHitPoints(character.archetype);
    const hpIncrease = Math.max(1, hpRoll.roll);
    const newMaxHP = character.hp_max + hpIncrease;
    
    // 2. Roll talent if applicable
    let newTalent = null;
    
    if (grantsTalent(newLevel)) {
      newTalent = getRandomTalent(character.archetype);
    }
    
    // 3. Recalculate AC if Wise archetype (Insightful Defense)
    let newAC = character.ac;
    if (character.archetype === 'Wise') {
      const dexMod = Math.floor((character.dexterity - 10) / 2);
      const baseAC = 10 + dexMod;
      const wiseBonusNew = Math.max(1, Math.floor(newLevel / 2));
      newAC = baseAC + wiseBonusNew;
    }
    
    // 4. Update character (XP reset, HP increase, AC update)
    await client.query(
      `UPDATE characters 
       SET level = $1, xp = 0, hp_max = $2, hp_current = hp_current + $3, 
           ac = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5`,
      [newLevel, newMaxHP, hpIncrease, newAC, characterId]
    );
    
    // 5. Log the level up
    await client.query(
      `INSERT INTO level_up_log (character_id, old_level, new_level, hp_roll, hp_increase, talent_gained)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        characterId, 
        character.level, 
        newLevel, 
        JSON.stringify(hpRoll), 
        hpIncrease,
        newTalent ? JSON.stringify(newTalent) : null
      ]
    );
    
    await client.query('COMMIT');
    
    res.json({
      message: `${character.name} leveled up to ${newLevel}!`,
      levelUp: {
        oldLevel: character.level,
        newLevel: newLevel,
        hpRoll: hpRoll,
        hpIncrease: hpIncrease,
        newMaxHP: newMaxHP,
        newAC: newAC,
        talent: newTalent,
        xpReset: true
      }
    });
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error leveling up:', error);
    res.status(500).json({ error: 'Failed to level up character' });
  } finally {
    client.release();
  }
});

// ✅ Complete level up with talent choices
router.post('/complete-level-up/:characterId', async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const { characterId } = req.params;
    const { talent, levelUpData } = req.body;
    
    // Get current character data
    const charResult = await client.query(
      'SELECT id, name, archetype, level, talents, triad_powers, enlightenment_uses, strength, dexterity, constitution, intelligence, wisdom, charisma FROM characters WHERE id = $1 AND user_id = $2',
      [characterId, req.user.userId]
    );
    
    if (charResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Character not found' });
    }
    
    const character = charResult.rows[0];
    
    // If no talent (even level), just return success
    if (!talent) {
      await client.query('COMMIT');
      return res.json({
        message: 'Level up completed successfully',
        statUpdates: {},
        triadPowers: JSON.parse(character.triad_powers || '[]')
      });
    }
    
    // Parse existing talents
    let updatedTalents = character.talents || [];
    if (typeof updatedTalents === 'string') {
      updatedTalents = JSON.parse(updatedTalents);
    }
    if (!Array.isArray(updatedTalents)) {
      updatedTalents = [];
    }
    
    // Apply stat bonuses and other effects from talent choice
    let statUpdates = {};
    let enlightenmentIncrease = 0;
    
    // Handle Stat Increase talents
    if (talent.name === 'Stat Increase' && talent.choice) {
      const stat = talent.choice.toUpperCase();
      const statMap = {
        'INT': 'intelligence',
        'WIS': 'wisdom',
        'CON': 'constitution',
        'STR': 'strength',
        'DEX': 'dexterity',
        'CHA': 'charisma'
      };
      
      if (statMap[stat]) {
        const fullStatName = statMap[stat];
        statUpdates[fullStatName] = character[fullStatName] + 2;
      }
    }
    
    // Handle Enlightenment or Triad choice (Wise archetype)
    let updatedTriadPowers = character.triad_powers || '[]';
    if (typeof updatedTriadPowers === 'string') {
      updatedTriadPowers = JSON.parse(updatedTriadPowers);
    }
    if (!Array.isArray(updatedTriadPowers)) {
      updatedTriadPowers = [];
    }
    
    if (talent.name === 'Enlightenment or Triad') {
      if (talent.choice === 'Gain +1 Enlightenment use') {
        // Increase enlightenment uses by 1
        enlightenmentIncrease = 1;
      } else if (talent.choice === 'Gain Triad Power' && talent.triadPower) {
        // Add new Triad power
        if (!updatedTriadPowers.includes(talent.triadPower)) {
          updatedTriadPowers.push(talent.triadPower);
        }
      }
    }
    
    // Handle other stackable talents that give uses per day
    if (talent.name === 'Enhanced Enlightenment') {
      enlightenmentIncrease = 1;
    }
    
    // Build the talent object to add to talents array
    const talentToAdd = {
      name: talent.name,
      description: talent.description,
      choice: talent.choice || null,
      customInput: talent.customInput || null,
      triadPower: talent.triadPower || null,
      statBonus: talent.statBonus || 0,
      usesPerDay: talent.usesPerDay || 0,
      stackable: talent.stackable || false,
      rollResult: talent.roll,
      gainedAtLevel: levelUpData.newLevel
    };
    
    updatedTalents.push(talentToAdd);
    
    // Build update query dynamically
    let updates = [];
    let values = [];
    let paramIndex = 1;
    
    // Always update talents
    updates.push(`talents = $${paramIndex}`);
    values.push(JSON.stringify(updatedTalents));
    paramIndex++;
    
    // Update triad_powers if changed
    updates.push(`triad_powers = $${paramIndex}`);
    values.push(JSON.stringify(updatedTriadPowers));
    paramIndex++;
    
    // Update enlightenment_uses if changed
    if (enlightenmentIncrease > 0) {
      const currentUses = parseInt(character.enlightenment_uses) || 1;
      updates.push(`enlightenment_uses = $${paramIndex}`);
      values.push(currentUses + enlightenmentIncrease);
      paramIndex++;
    }
    
    // Add stat updates
    for (const [stat, value] of Object.entries(statUpdates)) {
      updates.push(`${stat} = $${paramIndex}`);
      values.push(value);
      paramIndex++;
    }
    
    updates.push('updated_at = CURRENT_TIMESTAMP');
    
    const updateQuery = `UPDATE characters SET ${updates.join(', ')} WHERE id = $${paramIndex}`;
    values.push(characterId);
    
    // Execute update
    await client.query(updateQuery, values);
    
    await client.query('COMMIT');
    
    res.json({
      message: 'Level up completed successfully',
      statUpdates: statUpdates,
      triadPowers: updatedTriadPowers,
      enlightenmentUses: enlightenmentIncrease > 0 ? (parseInt(character.enlightenment_uses) || 1) + enlightenmentIncrease : undefined
    });
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error completing level up:', error);
    res.status(500).json({ error: 'Failed to complete level up' });
  } finally {
    client.release();
  }
});

// ✅ Get XP log for character
router.get('/xp-log/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    
    const result = await pool.query(
      `SELECT xl.*, u.username as awarded_by_name
       FROM xp_log xl
       LEFT JOIN users u ON xl.awarded_by = u.id
       WHERE xl.character_id = $1
       ORDER BY xl.created_at DESC
       LIMIT 50`,
      [characterId]
    );
    
    res.json(result.rows);
    
  } catch (error) {
    console.error('Error fetching XP log:', error);
    res.status(500).json({ error: 'Failed to fetch XP log' });
  }
});

// ✅ Get level up history
router.get('/level-history/:characterId', async (req, res) => {
  try {
    const { characterId} = req.params;
    
    const result = await pool.query(
      `SELECT * FROM level_up_log
       WHERE character_id = $1
       ORDER BY created_at DESC`,
      [characterId]
    );
    
    res.json(result.rows);
    
  } catch (error) {
    console.error('Error fetching level history:', error);
    res.status(500).json({ error: 'Failed to fetch level history' });
  }
});

module.exports = router;
