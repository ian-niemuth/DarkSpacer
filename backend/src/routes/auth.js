// backend/src/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const { authLimiter, sanitizeInput, isValidUsername, isValidPassword } = require('../middleware/security');

router.post('/register', async (req, res) => {
  const client = await pool.connect();

  try {
    let { username, password, email, registrationCode } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    if (!registrationCode) {
      return res.status(400).json({ error: 'Registration code required' });
    }

    // Sanitize inputs
    username = sanitizeInput(username);
    if (email) email = sanitizeInput(email);
    registrationCode = sanitizeInput(registrationCode).toUpperCase();

    // Validate username format
    if (!isValidUsername(username)) {
      return res.status(400).json({
        error: 'Username must be 3-20 characters and contain only letters, numbers, hyphens, or underscores'
      });
    }

    // Validate password strength
    if (!isValidPassword(password)) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long'
      });
    }

    await client.query('BEGIN');

    // Validate registration code
    const codeResult = await client.query(
      'SELECT id, is_used, grants_admin FROM registration_codes WHERE code = $1',
      [registrationCode]
    );

    if (codeResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Invalid registration code' });
    }

    if (codeResult.rows[0].is_used) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Registration code has already been used' });
    }

    const codeId = codeResult.rows[0].id;
    const grantsAdmin = codeResult.rows[0].grants_admin;

    const existingUser = await client.query(
      'SELECT id FROM users WHERE username = $1',
      [username]
    );

    if (existingUser.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Username already exists' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const result = await client.query(
      'INSERT INTO users (username, password_hash, email, is_admin) VALUES ($1, $2, $3, $4) RETURNING id, username, email, is_admin',
      [username, passwordHash, email, grantsAdmin]
    );

    const newUser = result.rows[0];

    // Mark registration code as used
    await client.query(
      'UPDATE registration_codes SET is_used = TRUE, used_by_user_id = $1, used_at = NOW() WHERE id = $2',
      [newUser.id, codeId]
    );

    await client.query('COMMIT');

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  } finally {
    client.release();
  }
});

router.post('/login', authLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    
    const result = await pool.query(
      'SELECT id, username, password_hash, is_admin, is_super_admin FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        isAdmin: user.is_admin,
        isSuperAdmin: user.is_super_admin
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        isAdmin: user.is_admin,
        isSuperAdmin: user.is_super_admin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;