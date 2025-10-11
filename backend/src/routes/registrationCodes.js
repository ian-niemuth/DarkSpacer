// backend/src/routes/registrationCodes.js
// Admin routes for managing registration codes

const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, isSuperAdmin } = require('../middleware/auth');
const crypto = require('crypto');

// GET all registration codes (super admin only)
router.get('/', authenticateToken, isSuperAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        rc.id,
        rc.code,
        rc.is_used,
        rc.grants_admin,
        rc.created_at,
        rc.used_at,
        rc.note,
        u.username as used_by_username,
        admin.username as created_by_username
      FROM registration_codes rc
      LEFT JOIN users u ON rc.used_by_user_id = u.id
      LEFT JOIN users admin ON rc.created_by_admin_id = admin.id
      ORDER BY rc.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching registration codes:', error);
    res.status(500).json({ error: 'Failed to fetch registration codes' });
  }
});

// POST generate new registration code (super admin only)
router.post('/generate', authenticateToken, isSuperAdmin, async (req, res) => {
  const { note, count = 1, customCode, grantsAdmin = false } = req.body;
  const adminId = req.user.userId;

  // If custom code is provided, only generate one
  if (customCode) {
    const trimmedCode = customCode.trim().toUpperCase();

    // Validate custom code format (alphanumeric, hyphens, underscores, 3-50 chars)
    if (!/^[A-Z0-9_-]{3,50}$/.test(trimmedCode)) {
      return res.status(400).json({
        error: 'Custom code must be 3-50 characters and contain only letters, numbers, hyphens, or underscores'
      });
    }

    try {
      // Check if code already exists
      const existingCode = await pool.query(
        'SELECT id FROM registration_codes WHERE code = $1',
        [trimmedCode]
      );

      if (existingCode.rows.length > 0) {
        return res.status(400).json({ error: 'This code already exists' });
      }

      const result = await pool.query(
        `INSERT INTO registration_codes (code, created_by_admin_id, note, grants_admin)
         VALUES ($1, $2, $3, $4)
         RETURNING id, code, created_at, grants_admin`,
        [trimmedCode, adminId, note || null, grantsAdmin]
      );

      return res.json({
        message: 'Registration code created successfully',
        codes: [result.rows[0]]
      });
    } catch (error) {
      console.error('Error creating custom registration code:', error);
      return res.status(500).json({ error: 'Failed to create registration code' });
    }
  }

  // Generate random codes
  if (count < 1 || count > 100) {
    return res.status(400).json({ error: 'Count must be between 1 and 100' });
  }

  try {
    const codes = [];

    for (let i = 0; i < count; i++) {
      // Generate a random 12-character code
      const code = crypto.randomBytes(6).toString('hex').toUpperCase();

      const result = await pool.query(
        `INSERT INTO registration_codes (code, created_by_admin_id, note, grants_admin)
         VALUES ($1, $2, $3, $4)
         RETURNING id, code, created_at, grants_admin`,
        [code, adminId, note || null, grantsAdmin]
      );

      codes.push(result.rows[0]);
    }

    res.json({
      message: `Generated ${count} registration code(s)`,
      codes
    });
  } catch (error) {
    console.error('Error generating registration code:', error);
    res.status(500).json({ error: 'Failed to generate registration code' });
  }
});

// DELETE a registration code (super admin only)
router.delete('/:id', authenticateToken, isSuperAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM registration_codes WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Registration code not found' });
    }

    res.json({ message: 'Registration code deleted successfully' });
  } catch (error) {
    console.error('Error deleting registration code:', error);
    res.status(500).json({ error: 'Failed to delete registration code' });
  }
});

module.exports = router;
