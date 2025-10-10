// Migration Runner for DarkSpace Ship System (PostgreSQL)
require('dotenv').config();
const pool = require('./src/config/database');
const fs = require('fs');
const path = require('path');

const MIGRATIONS_DIR = path.join(__dirname, '..', 'database', 'migrations');

console.log('🚀 DarkSpace Ship System Migration');
console.log('=====================================\n');

async function runMigration() {
  const client = await pool.connect();
  
  try {
    const migrationFile = path.join(MIGRATIONS_DIR, '001_ships_system.sql');
    console.log(`📄 Reading migration: ${migrationFile}`);
    
    const sql = fs.readFileSync(migrationFile, 'utf8');
    
    console.log('🔄 Executing migration...\n');
    
    // Execute the entire migration in a transaction
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');
    
    console.log('✅ Migration completed successfully!\n');
    console.log('📊 Tables created:');
    console.log('   - ships');
    console.log('   - component_templates');
    console.log('   - weapon_templates');
    console.log('   - armor_templates');
    console.log('   - enhancement_templates');
    console.log('   - ship_components');
    console.log('   - ship_weapons_arrays');
    console.log('   - ship_weapons');
    console.log('   - ship_armor');
    console.log('   - ship_enhancements');
    console.log('   - ship_crew_assignments');
    console.log('   - ship_ammo_magazines');
    console.log('\n📝 Seed data inserted for:');
    console.log('   - Component templates (11 entries)');
    console.log('   - Weapon templates (10 entries)');
    console.log('   - Armor templates (4 entries)');
    console.log('   - Enhancement templates (4 entries)');
    console.log('\n=====================================');
    console.log('✅ Ship system ready!');
    
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
