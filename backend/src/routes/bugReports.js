// backend/src/routes/bugReports.js
// Bug report system - Allow users to submit bug reports and admins to manage them

const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// POST - Submit a bug report (authenticated users)
router.post('/', authenticateToken, async (req, res) => {
  const { description } = req.body;
  const userId = req.user.userId;

  if (!description || description.trim().length === 0) {
    return res.status(400).json({ error: 'Description is required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO bug_reports (user_id, description)
       VALUES ($1, $2)
       RETURNING id, created_at`,
      [userId, description.trim()]
    );

    res.json({
      message: 'Bug report submitted successfully',
      reportId: result.rows[0].id,
      createdAt: result.rows[0].created_at
    });
  } catch (error) {
    console.error('Error submitting bug report:', error);
    res.status(500).json({ error: 'Failed to submit bug report' });
  }
});

// GET - Get all bug reports (admin only)
router.get('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        br.id,
        br.description,
        br.created_at,
        br.resolved,
        u.username,
        u.id as user_id
      FROM bug_reports br
      JOIN users u ON br.user_id = u.id
      ORDER BY br.resolved ASC, br.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching bug reports:', error);
    res.status(500).json({ error: 'Failed to fetch bug reports' });
  }
});

// DELETE - Delete a bug report (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM bug_reports WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bug report not found' });
    }

    res.json({ message: 'Bug report deleted successfully' });
  } catch (error) {
    console.error('Error deleting bug report:', error);
    res.status(500).json({ error: 'Failed to delete bug report' });
  }
});

// PUT - Mark bug report as resolved (admin only)
router.put('/:id/resolve', authenticateToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { resolved } = req.body;

  try {
    const result = await pool.query(
      'UPDATE bug_reports SET resolved = $1 WHERE id = $2 RETURNING id',
      [resolved, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bug report not found' });
    }

    res.json({ message: 'Bug report updated successfully' });
  } catch (error) {
    console.error('Error updating bug report:', error);
    res.status(500).json({ error: 'Failed to update bug report' });
  }
});

module.exports = router;
