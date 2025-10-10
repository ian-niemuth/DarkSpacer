// Fix ship_inventory weight column to support decimals
require('dotenv').config();
const pool = require('./src/config/database');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const client = await pool.connect();
  
  try {
    console.log('🔧 Fixing ship_inventory weight column...\n');

    const migrationPath = path.join(__dirname, '../database/migrations/011_fix_ship_cargo_weight.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('🔄 Executing migration...\n');
    
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');

    console.log('✅ Ship inventory weight column fixed!');
    console.log('\n📊 Changes:');
    console.log('   - weight: INTEGER → NUMERIC(10,2)');
    console.log('   - Now supports decimal weights like 0.5 for Energy Cells');
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
