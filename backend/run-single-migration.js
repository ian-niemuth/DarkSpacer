// Run ONLY the equipment restrictions migration
// Run with: node run-single-migration.js

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const pool = require('./src/config/database');

async function runMigration() {
  try {
    console.log('\n🔄 Running migration: 006_add_equipment_restrictions.sql');
    
    const sql = fs.readFileSync(
      path.join(__dirname, '../database/migrations/006_add_equipment_restrictions.sql'),
      'utf8'
    );
    
    await pool.query(sql);
    
    console.log('✅ Migration complete: Equipment restrictions system installed!');
    console.log('\n📋 Summary:');
    console.log('   - Added weapon_type, weapon_weight_class, armor_type columns');
    console.log('   - Added equipped_slot, loaded_energy_cell_id columns to inventory');
    console.log('   - Classified all existing gear by archetype restrictions');
    console.log('   - Added indexes for performance');
    console.log('\n🎯 Next: Restart your backend server!');
    
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
