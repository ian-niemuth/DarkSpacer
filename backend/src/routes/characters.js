// backend/src/routes/characters.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { addSpacersKit, rollCitizenStartingGear } = require('../utils/starterKit');
const { 
  calculateArchetypeHPBonus, 
  calculateArchetypeACBonus 
} = require('../utils/archetypeAbilities');

// Function to calculate initial AC for a new character
function calculateInitialAC(dexterity, archetype, level = 1) {
  const dexMod = Math.floor((dexterity - 10) / 2);
  let baseAC = 10;
  
  // Add DEX modifier (positive or negative) to base AC
  baseAC += dexMod;
  
  // Add archetype AC bonus (e.g., Wise Insightful Defense)
  const archetypeBonus = calculateArchetypeACBonus(archetype, level);
  baseAC += archetypeBonus;
  
  return baseAC;
}

// Function to calculate initial HP for a new character
function calculateInitialHP(hpRoll, constitution, archetype, level = 1) {
  const conMod = Math.floor((constitution - 10) / 2);
  
  // BUG FIX #2: Base HP from roll + CON modifier (only if positive)
  // hpRoll should be the MAX die value at character creation
  let totalHP = Math.max(1, hpRoll + Math.max(0, conMod));
  
  // Add archetype HP bonus (e.g., Tough +2)
  const archetypeBonus = calculateArchetypeHPBonus(archetype, level);
  totalHP += archetypeBonus;
  
  return totalHP;
}

router.use(authenticateToken);

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM characters WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).json({ error: 'Failed to fetch characters' });
  }
});

// GET all characters (party members) - for gifting/trading
router.get('/party', async (req, res) => {
  try {
    // Get all characters (excluding the requester's own characters if desired)
    // For now, just return all characters as "party members"
    const result = await pool.query(
      'SELECT id, name, user_id FROM characters ORDER BY name'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching party:', error);
    res.status(500).json({ error: 'Failed to fetch party' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user owns this character OR is an admin
    const result = await pool.query(
      'SELECT * FROM characters WHERE id = $1 AND (user_id = $2 OR $3 = true)',
      [id, req.user.userId, req.user.isAdmin]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }
    
    // Get inventory with fresh data from gear_database (same pattern as inventory route)
    const inventory = await pool.query(`
      SELECT
        i.id,
        i.character_id,
        i.item_name,
        i.quantity,
        i.equipped,
        i.equipped_slot,
        i.loaded_energy_cell_id,
        i.loaded_ammo_id,
        i.in_use_by_item_id,
        COALESCE(g.category, i.item_type) as item_type,
        COALESCE(g.description, i.description) as description,
        COALESCE(g.weight, i.weight, 1) as weight,
        COALESCE(g.damage, i.damage) as damage,
        COALESCE(g.range, i.range) as range,
        COALESCE(g.properties, i.properties) as properties,
        g.cost
      FROM inventory i
      LEFT JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
      WHERE i.character_id = $1
      ORDER BY COALESCE(g.category, i.item_type), i.item_name
    `, [id]);
    
    const shipData = await pool.query(
      `SELECT s.*, sc.role as crew_role 
       FROM ships s 
       JOIN ship_crew sc ON s.id = sc.ship_id 
       WHERE sc.character_id = $1`,
      [id]
    );
    
    res.json({
      ...result.rows[0],
      inventory: inventory.rows,
      ship: shipData.rows[0] || null
    });
  } catch (error) {
    console.error('Error fetching character:', error);
    res.status(500).json({ error: 'Failed to fetch character' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  console.log('DELETE route hit for character ID:', id);

  try {
    // Delete activity log entries first (foreign key constraint)
    await pool.query('DELETE FROM activity_log WHERE character_id = $1', [id]);

    // Now delete the character
    const result = await pool.query('DELETE FROM characters WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    console.log('Character deleted successfully:', id);
    res.json({ message: 'Character deleted successfully' });

  } catch (error) {
    console.error('DELETE ERROR:', error);
    res.status(500).json({ error: 'Failed to delete character', details: error.message });
  }
});

router.post('/', async (req, res) => {
  const {
    name, species, archetype, background, motivation, ship_role,
    level, xp, hp_current, hp_max, ac,
    strength, dexterity, constitution, intelligence, wisdom, charisma,
    credits, reputation, bounty, luck, talents, notes,
    triad_powers, enlightenment_uses
  } = req.body;

  try {
    // Calculate correct initial values using archetype abilities
    const calculatedAC = calculateInitialAC(dexterity, archetype, level || 1);
    const calculatedHP = calculateInitialHP(hp_max, constitution, archetype, level || 1);
    
    const result = await pool.query(
      `INSERT INTO characters (
        user_id, name, species, archetype, background, motivation, ship_role,
        level, xp, hp_current, hp_max, ac,
        strength, dexterity, constitution, intelligence, wisdom, charisma,
        credits, reputation, bounty, luck, talents, notes, triad_powers
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
      RETURNING *`,
      [
        req.user.userId, name, species, archetype, background, motivation, ship_role,
        level, xp, calculatedHP, calculatedHP, calculatedAC, // Use calculated values
        strength, dexterity, constitution, intelligence, wisdom, charisma,
        credits, reputation, bounty, luck, 
        talents ? JSON.stringify(talents) : null,
        notes,
        triad_powers || '[]'
      ]
    );

    const newCharacter = result.rows[0];

    // ✅ ADD SPACER'S KIT TO NEW CHARACTER
    try {
      await addSpacersKit(newCharacter.id);
      console.log(`Spacer's Kit added to new character: ${newCharacter.name}`);
    } catch (kitError) {
      console.error('Error adding Spacer\'s Kit:', kitError);
      // Continue even if kit fails - DM can add items manually
    }
    
    // ✅ ROLL FOR CITIZEN STARTING GEAR (if The Survivor motivation)
    if (motivation === 'The Survivor') {
      try {
        const gearResult = await rollCitizenStartingGear(newCharacter.id);
        console.log(`Citizen Starting Gear rolled: d12=${gearResult.roll} - ${gearResult.quantity}× ${gearResult.itemName}`);
      } catch (gearError) {
        console.error('Error rolling Citizen Starting Gear:', gearError);
        // Continue even if gear roll fails
      }
    }

    res.status(201).json(newCharacter);
  } catch (error) {
    console.error('Error creating character:', error);
    res.status(500).json({ error: 'Failed to create character' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // BUG FIX #3: Prevent negative credits
    if (updates.credits !== undefined && updates.credits < 0) {
      return res.status(400).json({ error: 'Credits cannot be negative' });
    }
    
    const allowedFields = [
      'name', 'species', 'archetype', 'background', 'motivation', 'ship_role',
      'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma',
      'hp_current', 'hp_max', 'ac', 'level', 'xp',
      'reputation', 'bounty', 'luck', 'credits', 'notes', 'triad_powers'
    ];
    
    const setFields = [];
    const values = [];
    let paramCount = 1;

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        setFields.push(`${field} = $${paramCount}`);
        values.push(updates[field]);
        paramCount++;
      }
    }

    if (setFields.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    setFields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id, req.user.userId);

    const query = `
      UPDATE characters
      SET ${setFields.join(', ')}
      WHERE id = $${paramCount} AND user_id = $${paramCount + 1}
      RETURNING *
    `;
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }
    
    res.json({
      message: 'Character updated successfully',
      character: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating character:', error);
    res.status(500).json({ error: 'Failed to update character' });
  }
});

// PATCH - Update character HP specifically
router.patch('/:id/hp', async (req, res) => {
  try {
    const { id } = req.params;
    const { hp_current } = req.body;

    if (hp_current === undefined) {
      return res.status(400).json({ error: 'hp_current is required' });
    }

    // Get character to check max HP
    const charResult = await pool.query(
      'SELECT hp_max FROM characters WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );

    if (charResult.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    const { hp_max } = charResult.rows[0];

    // Validate HP bounds
    if (hp_current < 0) {
      return res.status(400).json({ error: 'HP cannot be below 0' });
    }
    if (hp_current > hp_max) {
      return res.status(400).json({ error: `HP cannot exceed maximum of ${hp_max}` });
    }

    // Update HP
    const result = await pool.query(
      `UPDATE characters 
       SET hp_current = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 AND user_id = $3
       RETURNING *`,
      [hp_current, id, req.user.userId]
    );

    // Emit socket event (without message to avoid annoying notifications on every HP change)
    const io = req.app.get('io');
    if (io) {
      io.to(`character_${id}`).emit('character_updated', {
        character: result.rows[0],
        silent: true // Don't show notification for HP updates
      });
      io.emit('admin_refresh'); // Notify admin panel
    }

    res.json({
      message: 'HP updated successfully',
      character: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating HP:', error);
    res.status(500).json({ error: 'Failed to update HP' });
  }
});

router.post('/:id/inventory', async (req, res) => {
  try {
    const { id } = req.params;
    const { item_name, item_type, quantity, description, weight } = req.body;
    
    const charCheck = await pool.query(
      'SELECT id FROM characters WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );
    
    if (charCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }
    
    const result = await pool.query(
      `INSERT INTO inventory (character_id, item_name, item_type, quantity, description, weight)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, item_name, item_type, quantity || 1, description, weight || 0]
    );
    
    res.status(201).json({
      message: 'Item added to inventory',
      item: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

router.delete('/:id/inventory/:itemId', async (req, res) => {
  try {
    const { id, itemId } = req.params;
    
    const charCheck = await pool.query(
      'SELECT id FROM characters WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );
    
    if (charCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }
    
    await pool.query(
      'DELETE FROM inventory WHERE id = $1 AND character_id = $2',
      [itemId, id]
    );
    
    res.json({ message: 'Item removed from inventory' });
  } catch (error) {
    console.error('Error removing item:', error);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

// POST - Transfer credits to another character
router.post('/:id/transfer-credits', async (req, res) => {
  const { id } = req.params;
  const { recipientId, amount, note } = req.body;

  try {
    // Validation
    if (!recipientId || !amount) {
      return res.status(400).json({ error: 'Recipient and amount are required' });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: 'Amount must be positive' });
    }

    if (id === recipientId) {
      return res.status(400).json({ error: 'Cannot transfer credits to yourself' });
    }

    // Get sender character (must own it)
    const senderResult = await pool.query(
      'SELECT * FROM characters WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );

    if (senderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found or not owned by you' });
    }

    const sender = senderResult.rows[0];

    // Check if sender has enough credits
    if (sender.credits < amount) {
      return res.status(400).json({ 
        error: `Insufficient credits. You have ${sender.credits}cr, but tried to transfer ${amount}cr` 
      });
    }

    // Get recipient character (must exist and be in same campaign - we'll check by checking if it exists)
    const recipientResult = await pool.query(
      'SELECT * FROM characters WHERE id = $1',
      [recipientId]
    );

    if (recipientResult.rows.length === 0) {
      return res.status(404).json({ error: 'Recipient character not found' });
    }

    const recipient = recipientResult.rows[0];

    // Perform transfer
    await pool.query('BEGIN');

    try {
      // Deduct from sender
      await pool.query(
        'UPDATE characters SET credits = credits - $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [amount, id]
      );

      // Add to recipient
      await pool.query(
        'UPDATE characters SET credits = credits + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [amount, recipientId]
      );

      // Log activity for sender
      await pool.query(
        `INSERT INTO activity_log (character_id, action_type, description, amount)
         VALUES ($1, 'credits_transferred', $2, $3)`,
        [id, `Transferred ${amount}cr to ${recipient.name}${note ? ': ' + note : ''}`, -amount]
      );

      // Log activity for recipient
      await pool.query(
        `INSERT INTO activity_log (character_id, action_type, description, amount)
         VALUES ($1, 'credits_received', $2, $3)`,
        [recipientId, `Received ${amount}cr from ${sender.name}${note ? ': ' + note : ''}`, amount]
      );

      await pool.query('COMMIT');

      // Emit socket events
      const io = req.app.get('io');
      io.to(`character_${id}`).emit('credits_updated', {
        message: `Transferred ${amount}cr to ${recipient.name}`,
        newBalance: sender.credits - amount
      });
      io.to(`character_${recipientId}`).emit('credits_updated', {
        message: `Received ${amount}cr from ${sender.name}`,
        newBalance: recipient.credits + amount
      });

      res.json({
        message: `Successfully transferred ${amount}cr to ${recipient.name}`,
        senderNewBalance: sender.credits - amount,
        recipientNewBalance: recipient.credits + amount
      });

    } catch (error) {
      await pool.query('ROLLBACK');
      throw error;
    }

  } catch (error) {
    console.error('Error transferring credits:', error);
    res.status(500).json({ error: 'Failed to transfer credits' });
  }
});

// ==================== CHARACTER NOTES ROUTES ====================

// GET - Get all notes for a character (private to character owner only)
router.get('/:characterId/notes', async (req, res) => {
  try {
    const { characterId } = req.params;

    // Verify user owns this character (notes are private, not visible to admin)
    const charCheck = await pool.query(
      'SELECT id FROM characters WHERE id = $1 AND user_id = $2',
      [characterId, req.user.userId]
    );

    if (charCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    // Get all notes for this character, newest first
    const result = await pool.query(
      `SELECT id, character_id, content, created_at, updated_at
       FROM character_notes
       WHERE character_id = $1
       ORDER BY created_at DESC`,
      [characterId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// POST - Create a new note
router.post('/:characterId/notes', async (req, res) => {
  try {
    const { characterId } = req.params;
    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Note content is required' });
    }

    // Verify user owns this character
    const charCheck = await pool.query(
      'SELECT id FROM characters WHERE id = $1 AND user_id = $2',
      [characterId, req.user.userId]
    );

    if (charCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    // Create the note
    const result = await pool.query(
      `INSERT INTO character_notes (character_id, content)
       VALUES ($1, $2)
       RETURNING id, character_id, content, created_at, updated_at`,
      [characterId, content.trim()]
    );

    // Emit socket event for real-time updates
    const io = req.app.get('io');
    if (io) {
      io.to(`character_${characterId}`).emit('notes_updated', {
        action: 'created',
        note: result.rows[0]
      });
    }

    res.status(201).json({
      message: 'Note created successfully',
      note: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// PUT - Update an existing note
router.put('/:characterId/notes/:noteId', async (req, res) => {
  try {
    const { characterId, noteId } = req.params;
    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Note content is required' });
    }

    // Verify user owns this character
    const charCheck = await pool.query(
      'SELECT id FROM characters WHERE id = $1 AND user_id = $2',
      [characterId, req.user.userId]
    );

    if (charCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    // Update the note
    const result = await pool.query(
      `UPDATE character_notes
       SET content = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2 AND character_id = $3
       RETURNING id, character_id, content, created_at, updated_at`,
      [content.trim(), noteId, characterId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Emit socket event for real-time updates
    const io = req.app.get('io');
    if (io) {
      io.to(`character_${characterId}`).emit('notes_updated', {
        action: 'updated',
        note: result.rows[0]
      });
    }

    res.json({
      message: 'Note updated successfully',
      note: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// DELETE - Delete a note
router.delete('/:characterId/notes/:noteId', async (req, res) => {
  try {
    const { characterId, noteId } = req.params;

    // Verify user owns this character
    const charCheck = await pool.query(
      'SELECT id FROM characters WHERE id = $1 AND user_id = $2',
      [characterId, req.user.userId]
    );

    if (charCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    // Delete the note
    const result = await pool.query(
      'DELETE FROM character_notes WHERE id = $1 AND character_id = $2 RETURNING id',
      [noteId, characterId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Emit socket event for real-time updates
    const io = req.app.get('io');
    if (io) {
      io.to(`character_${characterId}`).emit('notes_updated', {
        action: 'deleted',
        noteId: noteId
      });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

module.exports = router;