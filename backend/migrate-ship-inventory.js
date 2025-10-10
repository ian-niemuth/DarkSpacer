// Run ship inventory migration
require('dotenv').config();
const pool = require('./src/config/database');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 Running ship inventory migration...\n');

    const migrationPath = path.join(__dirname, '../database/migrations/010_add_ship_inventory.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('🔄 Executing migration...\n');
    
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');

    console.log('✅ Ship inventory migration completed successfully!');
    console.log('\n📊 Table created:');
    console.log('   - ship_inventory');
    console.log('\n📝 Features:');
    console.log('   - Cargo storage for ships');
    console.log('   - Weight-based capacity tracking');
    console.log('   - Automatic item stacking');
    console.log('   - Load/unload from character inventory');
    console.log('\n=====================================');
    console.log('✅ Ship cargo system ready!');
    
    process.exit(0);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();
