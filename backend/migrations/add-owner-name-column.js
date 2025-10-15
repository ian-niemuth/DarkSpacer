#!/usr/bin/env node
// Migration: Add owner_name column to ships table for NPC/Enemy ship ownership

const pool = require('../src/config/database');
require('dotenv').config();

async function migrate() {
  const client = await pool.connect();

  try {
    console.log('🚀 Starting migration: add owner_name to ships table...\n');

    await client.query('BEGIN');

    // Check if column already exists
    const checkColumn = await client.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'ships' AND column_name = 'owner_name'
    `);

    if (checkColumn.rows.length > 0) {
      console.log('ℹ️  Column owner_name already exists, skipping...');
      await client.query('ROLLBACK');
      return;
    }

    // Add owner_name column
    await client.query(`
      ALTER TABLE ships
      ADD COLUMN owner_name VARCHAR(255)
    `);

    console.log('✅ Added owner_name column to ships table');

    // Add comment
    await client.query(`
      COMMENT ON COLUMN ships.owner_name IS 'Custom owner name for NPC ships. Null for character-owned and party ships (where owner is derived from character name or "Party Ship")'
    `);

    console.log('✅ Added column comment');

    await client.query('COMMIT');
    console.log('\n✅ Migration completed successfully!');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
