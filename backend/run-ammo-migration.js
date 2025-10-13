// Run the ammo loading migration
// Run with: node run-ammo-migration.js

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const pool = require('./src/config/database');

async function runMigration() {
  try {
    console.log('\n🔄 Running migration: 019_add_ammo_loading.sql');

    const sql = fs.readFileSync(
      path.join(__dirname, '../database/migrations/019_add_ammo_loading.sql'),
      'utf8'
    );

    await pool.query(sql);

    console.log('✅ Migration complete: Ammo loading system installed!');
    console.log('\n📋 Summary:');
    console.log('   - Added loaded_ammo_id column to inventory table');
    console.log('   - Added index for performance');
    console.log('   - Updated ammo clips to have proper item_type');
    console.log('\n🎯 Next: The ammo loading system is ready to use!');

  } catch (error) {
    console.error('❌ Migration failed!');
    console.error(error.message);

    if (error.message.includes('already exists')) {
      console.log('\n💡 This migration may have already been run.');
      console.log('   Check your database to verify.');
    }

    process.exit(1);
  }

  process.exit(0);
}

runMigration();
