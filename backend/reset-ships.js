// Reset and Re-run Ship System Migration (PostgreSQL)
require('dotenv').config();
const pool = require('./src/config/database');
const fs = require('fs');
const path = require('path');

const MIGRATIONS_DIR = path.join(__dirname, '..', 'database', 'migrations');

console.log('🔄 DarkSpace Ship System - RESET & REBUILD');
console.log('=====================================\n');

async function resetAndMigrate() {
  const client = await pool.connect();
  
  try {
    console.log('⚠️  DROPPING existing ship tables...\n');
    
    await client.query('BEGIN');
    
    // Drop all ship-related tables in reverse order (due to foreign keys)
    const dropQueries = [
      'DROP TABLE IF EXISTS ship_ammo_magazines CASCADE',
      'DROP TABLE IF EXISTS ship_crew_assignments CASCADE',
      'DROP TABLE IF EXISTS ship_enhancements CASCADE',
      'DROP TABLE IF EXISTS ship_armor CASCADE',
      'DROP TABLE IF EXISTS ship_weapons CASCADE',
      'DROP TABLE IF EXISTS ship_weapons_arrays CASCADE',
      'DROP TABLE IF EXISTS ship_components CASCADE',
      'DROP TABLE IF EXISTS enhancement_templates CASCADE',
      'DROP TABLE IF EXISTS armor_templates CASCADE',
      'DROP TABLE IF EXISTS weapon_templates CASCADE',
      'DROP TABLE IF EXISTS component_templates CASCADE',
      'DROP TABLE IF EXISTS ships CASCADE'
    ];
    
    for (const query of dropQueries) {
      console.log(`   ${query}`);
      await client.query(query);
    }
    
    await client.query('COMMIT');
    
    console.log('\n✅ Old tables dropped successfully!\n');
    console.log('📄 Reading fresh migration...\n');
    
    // Now run the fresh migration
    const migrationFile = path.join(MIGRATIONS_DIR, '001_ships_system.sql');
    const sql = fs.readFileSync(migrationFile, 'utf8');
    
    console.log('🔄 Creating new tables...\n');
    
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
    console.error('❌ Reset/Migration failed:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

resetAndMigrate();
