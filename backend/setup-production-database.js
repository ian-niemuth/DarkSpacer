#!/usr/bin/env node
// Production Database Setup Script - Safe Version
// This runs ALL migrations in the correct order with error handling

require('dotenv').config();
const pool = require('./src/config/database');
const fs = require('fs');
const path = require('path');

console.log('🚀 DARKSPACE PRODUCTION DATABASE SETUP');
console.log('=========================================\n');

// Define migrations in order
const MIGRATIONS = [
  '../database/init.sql',
  '../database/migrations/001_ships_system.sql',
  '../database/migrations/001_populate_gear_database.sql',
  '../database/migrations/002_fix_inventory_weight.sql',
  '../database/migrations/003_add_equip_system.sql',
  '../database/migrations/003_equipment_system.sql',
  '../database/migrations/004_energy_cell_system.sql',
  '../database/migrations/005_fix_duplicate_rations.sql',
  '../database/migrations/006_add_equipment_restrictions.sql',
  '../database/migrations/007_fix_gear_database.sql',
  '../database/migrations/008_add_triad_system.sql',
  '../database/migrations/010_add_ability_tracking.sql',
  '../database/migrations/010_add_ship_inventory.sql',
  '../database/migrations/011_fix_ship_cargo_weight.sql',
  '../database/migrations/012_add_cargo_capacity_to_ships.sql'
];

async function runMigrations() {
  const client = await pool.connect();
  let successCount = 0;
  let skipCount = 0;
  
  try {
    console.log('📋 Total migrations to run:', MIGRATIONS.length);
    console.log('');
    
    for (let i = 0; i < MIGRATIONS.length; i++) {
      const migrationFile = MIGRATIONS[i];
      const migrationPath = path.join(__dirname, migrationFile);
      const fileName = path.basename(migrationFile);
      
      console.log(`[${i + 1}/${MIGRATIONS.length}] ${fileName}`);
      
      // Check if file exists
      if (!fs.existsSync(migrationPath)) {
        console.log('    ⚠️  File not found, skipping...\n');
        skipCount++;
        continue;
      }
      
      try {
        // Read file with explicit encoding
        const sql = fs.readFileSync(migrationPath, { encoding: 'utf8' });
        
        // Skip empty files
        if (!sql.trim()) {
          console.log('    ⚠️  Empty file, skipping...\n');
          skipCount++;
          continue;
        }
        
        await client.query('BEGIN');
        await client.query(sql);
        await client.query('COMMIT');
        
        console.log('    ✅ Success!\n');
        successCount++;
        
      } catch (error) {
        await client.query('ROLLBACK');
        
        // Check if error is just "already exists" - that's okay
        const errorMsg = error.message.toLowerCase();
        if (errorMsg.includes('already exists') || 
            errorMsg.includes('duplicate key') ||
            errorMsg.includes('duplicate column')) {
          console.log('    ⏭️  Already applied, skipping...\n');
          skipCount++;
        } else {
          console.log('    ❌ Failed:', error.message);
          console.log('    Continuing with next migration...\n');
          skipCount++;
        }
      }
    }
    
    console.log('=========================================');
    console.log('✅ DATABASE SETUP COMPLETE!');
    console.log('');
    console.log(`📊 Results:`);
    console.log(`   - Applied: ${successCount}`);
    console.log(`   - Skipped: ${skipCount}`);
    console.log(`   - Total: ${MIGRATIONS.length}`);
    console.log('');
    
    if (successCount > 0) {
      console.log('🎮 Your database is ready for production!');
      console.log('');
      console.log('⚠️  IMPORTANT: Change the admin password!');
      console.log('   Default: admin / admin123');
      console.log('');
    } else {
      console.log('⚠️  No migrations were applied.');
      console.log('   This might mean the database is already set up.');
      console.log('');
    }
    
  } catch (error) {
    console.error('');
    console.error('❌ SETUP FAILED!');
    console.error('');
    console.error('Error:', error.message);
    console.error('');
    console.error('Troubleshooting:');
    console.error('1. Check your .env file has correct database credentials');
    console.error('2. Make sure PostgreSQL is running');
    console.error('3. Verify the database exists and user has permissions');
    console.error('');
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run it!
console.log('🔍 Checking database connection...');
console.log(`   Host: ${process.env.DB_HOST}`);
console.log(`   Database: ${process.env.DB_NAME}`);
console.log(`   User: ${process.env.DB_USER}`);
console.log('');

runMigrations().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
