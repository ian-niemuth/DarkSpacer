// Comms/Datapad Routes
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if a character has a powered communicator
 * @param {number} characterId - Character ID to check
 * @returns {Object} { powered: boolean, reason: string }
 */
async function checkCommunicatorPower(characterId) {
  try {
    // Check if character has a Communicator item
    const commResult = await pool.query(`
      SELECT
        i.*,
        cell.id as cell_id,
        cell.item_name as cell_name
      FROM inventory i
      LEFT JOIN inventory cell ON i.loaded_energy_cell_id = cell.id
      WHERE i.character_id = $1
        AND LOWER(i.item_name) = 'communicator'
    `, [characterId]);

    if (commResult.rows.length === 0) {
      return { powered: false, reason: 'NO_COMMUNICATOR' };
    }

    const communicator = commResult.rows[0];

    // Check if it has an energy cell loaded
    if (!communicator.loaded_energy_cell_id) {
      return { powered: false, reason: 'NO_POWER' };
    }

    return { powered: true, reason: null };
  } catch (error) {
    console.error('Error checking communicator power:', error);
    return { powered: false, reason: 'ERROR' };
  }
}

// ============================================
// GET communicator power status
// ============================================
router.get('/power-status/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;

    // Verify character belongs to user (unless admin)
    if (!req.user.isAdmin) {
      const charCheck = await pool.query(
        'SELECT id FROM characters WHERE id = $1 AND user_id = $2',
        [characterId, req.user.userId]
      );
      if (charCheck.rows.length === 0) {
        return res.status(403).json({ error: 'Access denied' });
      }
    }

    const powerStatus = await checkCommunicatorPower(characterId);
    res.json(powerStatus);
  } catch (error) {
    console.error('Error checking power status:', error);
    res.status(500).json({ error: 'Failed to check power status' });
  }
});

// ============================================
// GET messages for a character
// ============================================
router.get('/inbox/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const userId = req.user.userId;

    // Verify character belongs to user (unless admin)
    if (!req.user.isAdmin) {
      const charCheck = await pool.query(
        'SELECT id FROM characters WHERE id = $1 AND user_id = $2',
        [characterId, userId]
      );
      if (charCheck.rows.length === 0) {
        return res.status(403).json({ error: 'Access denied' });
      }
    }

    // Get character's ships for ship_crew messages
    const shipsResult = await pool.query(`
      SELECT DISTINCT ship_id
      FROM ship_crew_assignments
      WHERE character_id = $1
    `, [characterId]);
    const shipIds = shipsResult.rows.map(r => r.ship_id);

    // Get all ROOT messages for this character (not replies in threads)
    // Exclude archived messages
    // Show: messages TO this character AND messages FROM this character (their sent messages)
    const messages = await pool.query(`
      SELECT
        cm.*,
        CASE
          WHEN cm.recipient_type = 'character' AND cm.recipient_id = $1 THEN
            EXISTS(SELECT 1 FROM comms_read_receipts WHERE message_id = cm.id AND character_id = $1)
          WHEN cm.recipient_type IN ('ship_crew', 'party', 'all') THEN
            EXISTS(SELECT 1 FROM comms_read_receipts WHERE message_id = cm.id AND character_id = $1)
          ELSE false
        END as is_read_by_character,
        (SELECT COUNT(*) FROM comms_messages WHERE thread_id = cm.id) as reply_count,
        (
          SELECT message_body
          FROM comms_messages
          WHERE thread_id = cm.id OR id = cm.id
          ORDER BY created_at DESC
          LIMIT 1
        ) as latest_message_preview,
        (
          SELECT EXISTS(
            SELECT 1 FROM comms_messages reply
            WHERE reply.thread_id = cm.id
              AND NOT (reply.sender_type = 'character' AND reply.sender_id = $1)
              AND NOT EXISTS(
                SELECT 1 FROM comms_read_receipts
                WHERE message_id = reply.id AND character_id = $1
              )
          )
        ) as has_unread_replies,
        (
          SELECT EXISTS(
            SELECT 1 FROM comms_messages
            WHERE (id = cm.id OR thread_id = cm.id)
              AND sender_type = 'character'
              AND sender_id = $1
          )
        ) as character_participated
      FROM comms_messages cm
      WHERE
        cm.thread_id IS NULL AND (
          (cm.recipient_type = 'character' AND cm.recipient_id = $1) OR
          (cm.recipient_type = 'ship_crew' AND cm.recipient_id = ANY($2)) OR
          (cm.recipient_type = 'party') OR
          (cm.recipient_type = 'all') OR
          (cm.recipient_type = 'dm' AND cm.sender_type = 'character' AND cm.sender_id = $1) OR
          (cm.sender_type = 'character' AND cm.sender_id = $1)
        )
        AND NOT EXISTS (
          SELECT 1 FROM comms_message_archives
          WHERE message_id = cm.id AND character_id = $1
        )
      ORDER BY (
        SELECT created_at
        FROM comms_messages
        WHERE thread_id = cm.id OR id = cm.id
        ORDER BY created_at DESC
        LIMIT 1
      ) DESC
    `, [characterId, shipIds.length > 0 ? shipIds : [null]]);

    res.json(messages.rows);
  } catch (error) {
    console.error('Error fetching inbox:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// ============================================
// GET single message with thread (replies)
// ============================================
router.get('/message/:messageId', async (req, res) => {
  try {
    const { messageId } = req.params;

    // Get main message
    const mainMessage = await pool.query(
      'SELECT * FROM comms_messages WHERE id = $1',
      [messageId]
    );

    if (mainMessage.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Get thread (if this is a reply, get the root and all siblings)
    const threadId = mainMessage.rows[0].thread_id || messageId;

    const thread = await pool.query(`
      SELECT * FROM comms_messages
      WHERE id = $1 OR thread_id = $1
      ORDER BY created_at ASC
    `, [threadId]);

    res.json({
      message: mainMessage.rows[0],
      thread: thread.rows
    });
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ error: 'Failed to fetch message' });
  }
});

// ============================================
// POST send new message (DM or Player)
// ============================================
router.post('/send', async (req, res) => {
  try {
    const {
      sender_type,
      sender_name,
      sender_title,
      recipient_type,
      recipient_id,
      subject,
      message_body,
      priority,
      thread_id,
      metadata
    } = req.body;

    // Determine sender_id based on sender_type
    let sender_id = null;
    if (sender_type === 'character') {
      // Verify user owns this character
      const charCheck = await pool.query(
        'SELECT id FROM characters WHERE id = $1 AND user_id = $2',
        [req.body.sender_id, req.user.userId]
      );
      if (charCheck.rows.length === 0) {
        return res.status(403).json({ error: 'Cannot send as this character' });
      }
      sender_id = req.body.sender_id;

      // Check if sender has powered communicator
      const senderPower = await checkCommunicatorPower(sender_id);
      if (!senderPower.powered) {
        return res.status(403).json({
          error: 'COMMUNICATOR_OFFLINE',
          reason: senderPower.reason,
          message: senderPower.reason === 'NO_COMMUNICATOR'
            ? 'No communicator found in inventory'
            : 'Communicator has no power. Load an energy cell first.'
        });
      }
    }

    // DM can send as anyone (npc, system, etc.)
    if (!req.user.isAdmin && sender_type !== 'character') {
      return res.status(403).json({ error: 'Only DM can send as NPC/System' });
    }

    // Insert message
    const result = await pool.query(`
      INSERT INTO comms_messages (
        sender_type, sender_id, sender_name, sender_title,
        recipient_type, recipient_id,
        subject, message_body, priority, thread_id, metadata
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `, [
      sender_type, sender_id, sender_name, sender_title,
      recipient_type, recipient_id,
      subject, message_body, priority || 'normal', thread_id || null,
      metadata ? JSON.stringify(metadata) : null
    ]);

    const message = result.rows[0];

    // If this is a player message in a thread, clear DM's read receipt so it shows as unread again
    if (sender_type === 'character' && thread_id) {
      await pool.query(
        'DELETE FROM comms_read_receipts WHERE message_id = $1 AND character_id = 0',
        [thread_id]
      );
    }

    // Emit socket event for real-time delivery
    const io = req.app.get('io');

    if (recipient_type === 'character') {
      console.log(`[Comms] Emitting new_message to character_${recipient_id}`, message.id);
      io.to(`character_${recipient_id}`).emit('new_message', message);
    } else if (recipient_type === 'ship_crew') {
      console.log(`[Comms] Emitting new_message to ship_${recipient_id}`, message.id);
      io.to(`ship_${recipient_id}`).emit('new_message', message);
    } else if (recipient_type === 'party' || recipient_type === 'all') {
      console.log('[Comms] Emitting new_message to all', message.id);
      io.emit('new_message', message);
    } else if (recipient_type === 'dm') {
      console.log('[Comms] Emitting new_message for DM (player to NPC)', message.id);
      // Emit globally so DM gets notification, but players won't see the message in their inbox
      io.emit('new_message', message);
    }

    res.json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// ============================================
// POST mark message as read
// ============================================
router.post('/mark-read/:messageId', async (req, res) => {
  try {
    const { messageId } = req.params;
    const { characterId } = req.body;

    // Verify character belongs to user
    if (!req.user.isAdmin) {
      const charCheck = await pool.query(
        'SELECT id FROM characters WHERE id = $1 AND user_id = $2',
        [characterId, req.user.userId]
      );
      if (charCheck.rows.length === 0) {
        return res.status(403).json({ error: 'Access denied' });
      }
    }

    // Get the root thread ID
    const msgResult = await pool.query(
      'SELECT id, thread_id FROM comms_messages WHERE id = $1',
      [messageId]
    );

    if (msgResult.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const threadId = msgResult.rows[0].thread_id || msgResult.rows[0].id;

    // Mark ALL messages in the thread as read (root + all replies)
    await pool.query(`
      INSERT INTO comms_read_receipts (message_id, character_id)
      SELECT id, $2
      FROM comms_messages
      WHERE id = $1 OR thread_id = $1
      ON CONFLICT (message_id, character_id) DO NOTHING
    `, [threadId, characterId]);

    res.json({ message: 'Thread marked as read' });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({ error: 'Failed to mark as read' });
  }
});

// ============================================
// GET unread count for character
// ============================================
router.get('/unread-count/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;

    // Verify character belongs to user
    if (!req.user.isAdmin) {
      const charCheck = await pool.query(
        'SELECT id FROM characters WHERE id = $1 AND user_id = $2',
        [characterId, req.user.userId]
      );
      if (charCheck.rows.length === 0) {
        return res.status(403).json({ error: 'Access denied' });
      }
    }

    // Get character's ships
    const shipsResult = await pool.query(`
      SELECT DISTINCT ship_id
      FROM ship_crew_assignments
      WHERE character_id = $1
    `, [characterId]);
    const shipIds = shipsResult.rows.map(r => r.ship_id);

    // Count threads with unread activity:
    // 1. Root messages you haven't read (received but not opened)
    // 2. Threads where you participated that have unread replies
    const result = await pool.query(`
      SELECT COUNT(*) as unread_count
      FROM comms_messages cm
      WHERE
        cm.thread_id IS NULL
        AND NOT EXISTS (
          SELECT 1 FROM comms_message_archives
          WHERE message_id = cm.id AND character_id = $1
        )
        AND (
          -- Unread incoming messages (not from you)
          (
            (cm.recipient_type = 'character' AND cm.recipient_id = $1) OR
            (cm.recipient_type = 'ship_crew' AND cm.recipient_id = ANY($2)) OR
            (cm.recipient_type = 'party') OR
            (cm.recipient_type = 'all')
          )
          AND cm.recipient_type != 'dm'
          AND NOT (cm.sender_type = 'character' AND cm.sender_id = $1)
          AND NOT EXISTS (
            SELECT 1 FROM comms_read_receipts crr
            WHERE crr.message_id = cm.id AND crr.character_id = $1
          )
        )
        OR (
          -- Threads you participated in that have unread replies
          EXISTS(
            SELECT 1 FROM comms_messages
            WHERE (id = cm.id OR thread_id = cm.id)
              AND sender_type = 'character'
              AND sender_id = $1
          )
          AND EXISTS(
            SELECT 1 FROM comms_messages reply
            WHERE reply.thread_id = cm.id
              AND NOT (reply.sender_type = 'character' AND reply.sender_id = $1)
              AND NOT EXISTS(
                SELECT 1 FROM comms_read_receipts
                WHERE message_id = reply.id AND character_id = $1
              )
          )
        )
    `, [characterId, shipIds.length > 0 ? shipIds : [null]]);

    res.json({ unread_count: parseInt(result.rows[0].unread_count) });
  } catch (error) {
    console.error('Error getting unread count:', error);
    res.status(500).json({ error: 'Failed to get unread count' });
  }
});

// ============================================
// DM: GET all messages (admin only)
// ============================================
router.get('/admin/all', async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const messages = await pool.query(`
      SELECT
        cm.*,
        (SELECT COUNT(*) FROM comms_messages WHERE thread_id = cm.id) as reply_count,
        (SELECT COUNT(*) FROM comms_read_receipts WHERE message_id = cm.id) as read_count,
        (
          SELECT message_body
          FROM comms_messages
          WHERE thread_id = cm.id OR id = cm.id
          ORDER BY created_at DESC
          LIMIT 1
        ) as latest_message_preview,
        (
          SELECT sender_type
          FROM comms_messages
          WHERE thread_id = cm.id OR id = cm.id
          ORDER BY created_at DESC
          LIMIT 1
        ) as latest_message_sender_type,
        (
          SELECT created_at
          FROM comms_messages
          WHERE thread_id = cm.id OR id = cm.id
          ORDER BY created_at DESC
          LIMIT 1
        ) as latest_message_time,
        (
          SELECT EXISTS(
            SELECT 1 FROM comms_messages
            WHERE (id = cm.id OR thread_id = cm.id)
              AND sender_type = 'character'
          )
        ) as has_player_messages,
        EXISTS(
          SELECT 1 FROM comms_read_receipts
          WHERE message_id = cm.id AND character_id = 0
        ) as dm_has_viewed
      FROM comms_messages cm
      WHERE cm.thread_id IS NULL
      ORDER BY (
        SELECT created_at
        FROM comms_messages
        WHERE thread_id = cm.id OR id = cm.id
        ORDER BY created_at DESC
        LIMIT 1
      ) DESC
    `);

    res.json(messages.rows);
  } catch (error) {
    console.error('Error fetching all messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// ============================================
// DM: Mark thread as read (admin only)
// ============================================
router.post('/admin/mark-read/:messageId', async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { messageId } = req.params;

    // Get the root thread ID
    const msgResult = await pool.query(
      'SELECT id, thread_id FROM comms_messages WHERE id = $1',
      [messageId]
    );

    if (msgResult.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const threadId = msgResult.rows[0].thread_id || msgResult.rows[0].id;

    // Mark thread as viewed by DM (using character_id = 0 to represent DM)
    await pool.query(`
      INSERT INTO comms_read_receipts (message_id, character_id)
      SELECT id, 0
      FROM comms_messages
      WHERE id = $1 OR thread_id = $1
      ON CONFLICT (message_id, character_id) DO NOTHING
    `, [threadId]);

    res.json({ message: 'Thread marked as read by DM' });
  } catch (error) {
    console.error('Error marking thread as read:', error);
    res.status(500).json({ error: 'Failed to mark as read' });
  }
});

// ============================================
// DM: GET unread player messages count (admin only)
// ============================================
router.get('/admin/unread-count', async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // Count threads where:
    // 1. Latest message is from a player (awaiting DM response)
    // 2. DM hasn't viewed the thread since the last player message
    const result = await pool.query(`
      SELECT COUNT(*) as unread_count
      FROM comms_messages cm
      WHERE
        cm.thread_id IS NULL
        AND EXISTS(
          SELECT 1 FROM comms_messages latest
          WHERE (latest.id = cm.id OR latest.thread_id = cm.id)
            AND latest.sender_type = 'character'
            AND latest.created_at = (
              SELECT MAX(created_at)
              FROM comms_messages
              WHERE id = cm.id OR thread_id = cm.id
            )
        )
        AND NOT EXISTS(
          SELECT 1 FROM comms_read_receipts
          WHERE message_id = cm.id AND character_id = 0
        )
    `);

    res.json({ unread_count: parseInt(result.rows[0].unread_count) });
  } catch (error) {
    console.error('Error getting DM unread count:', error);
    res.status(500).json({ error: 'Failed to get unread count' });
  }
});

// ============================================
// POST archive message (player soft delete)
// ============================================
router.post('/archive/:messageId', async (req, res) => {
  try {
    const { messageId } = req.params;
    const { characterId } = req.body;

    // Verify character belongs to user
    if (!req.user.isAdmin) {
      const charCheck = await pool.query(
        'SELECT id FROM characters WHERE id = $1 AND user_id = $2',
        [characterId, req.user.userId]
      );
      if (charCheck.rows.length === 0) {
        return res.status(403).json({ error: 'Access denied' });
      }
    }

    // Archive the message (soft delete for this character)
    await pool.query(`
      INSERT INTO comms_message_archives (message_id, character_id)
      VALUES ($1, $2)
      ON CONFLICT (message_id, character_id) DO NOTHING
    `, [messageId, characterId]);

    res.json({ message: 'Message archived' });
  } catch (error) {
    console.error('Error archiving message:', error);
    res.status(500).json({ error: 'Failed to archive message' });
  }
});

// ============================================
// DELETE message (admin or sender only)
// ============================================
router.delete('/:messageId', async (req, res) => {
  try {
    const { messageId } = req.params;

    // Check if user can delete (admin or is sender)
    const message = await pool.query(
      'SELECT * FROM comms_messages WHERE id = $1',
      [messageId]
    );

    if (message.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }

    const msg = message.rows[0];

    if (!req.user.isAdmin) {
      if (msg.sender_type !== 'character' || msg.sender_id !== req.user.userId) {
        return res.status(403).json({ error: 'Cannot delete this message' });
      }
    }

    // Delete message (cascade will handle thread and receipts)
    await pool.query('DELETE FROM comms_messages WHERE id = $1', [messageId]);

    res.json({ message: 'Message deleted' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;
