// Run salvage system migration
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('./src/config/database');

async function runMigration() {
  console.log('🔧 Running salvage system migration...\n');

  try {
    // Read the migration file
    const migrationPath = path.join(__dirname, '..', 'database', 'migrations', '013_add_salvage_system.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    // Execute the migration
    await pool.query(sql);

    console.log('✅ Salvage system migration completed successfully!\n');
    console.log('📊 Created:');
    console.log('  - salvage_items table');
    console.log('  - Populated with all salvage tiers (0-3, 4-6, 7-9, 10+)');
    console.log('  - Total items added across all tiers\n');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
