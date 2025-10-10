// Add cargo_capacity column to ships table
require('dotenv').config();
const pool = require('./src/config/database');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const client = await pool.connect();
  
  try {
    console.log('🔧 Adding cargo_capacity column to ships table...\n');

    const migrationPath = path.join(__dirname, '../database/migrations/012_add_cargo_capacity_to_ships.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('🔄 Executing migration...\n');
    
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');

    console.log('✅ Cargo capacity column added to ships table!');
    console.log('\n📊 Changes:');
    console.log('   - Added cargo_capacity INTEGER DEFAULT 10');
    console.log('   - All existing ships set to 10 capacity');
    console.log('\n=====================================');
    console.log('✅ Migration complete!');
    
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
