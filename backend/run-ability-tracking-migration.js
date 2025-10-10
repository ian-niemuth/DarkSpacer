// Script to run the ability tracking migration
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'darkspace_campaign',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres'
});

async function runMigration() {
  console.log('🚀 Running Ability Tracking Migration...\n');
  
  try {
    // Read migration file
    const migrationPath = path.join(__dirname, '..', 'database', 'migrations', '010_add_ability_tracking.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('📄 Migration file loaded');
    console.log('🔧 Executing migration...\n');
    
    // Execute migration
    await pool.query(migrationSQL);
    
    console.log('✅ Migration completed successfully!\n');
    
    // Verify table creation
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'ability_uses'
      );
    `);
    
    if (tableCheck.rows[0].exists) {
      console.log('✅ Table "ability_uses" created successfully');
      
      // Check if talents column exists
      const columnCheck = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_name = 'characters' AND column_name = 'talents'
        );
      `);
      
      if (columnCheck.rows[0].exists) {
        console.log('✅ Column "talents" added to characters table');
      }
      
      console.log('\n📊 Summary:');
      console.log('   - ability_uses table created');
      console.log('   - talents column added to characters (if not exists)');
      console.log('   - Database functions created for reset functionality');
      console.log('   - Indexes created for performance');
      
      console.log('\n🎯 Next Steps:');
      console.log('   1. Restart the backend server');
      console.log('   2. Open a character sheet in the frontend');
      console.log('   3. Click on ability checkboxes to test');
      console.log('   4. Use DM panel "Reset Daily Abilities" to test reset');
    } else {
      console.log('❌ Table creation may have failed');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runMigration();
