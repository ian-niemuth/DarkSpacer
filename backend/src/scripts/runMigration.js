// backend/src/scripts/runMigration.js
// Script to run database migrations

require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function runMigration(migrationFile) {
  const migrationPath = path.join(__dirname, '../../../database/migrations', migrationFile);
  
  console.log(`\n🚀 Running migration: ${migrationFile}`);
  console.log(`📁 Path: ${migrationPath}\n`);
  
  try {
    // Read migration file
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    // Execute migration
    await pool.query(sql);
    
    console.log('✅ Migration completed successfully!\n');
    
    // Verify results
    const result = await pool.query(`
      SELECT category, subcategory, COUNT(*) as item_count 
      FROM gear_database 
      WHERE is_custom = FALSE
      GROUP BY category, subcategory 
      ORDER BY category, subcategory
    `);
    
    console.log('📊 Gear Database Summary:');
    console.log('─────────────────────────────────');
    result.rows.forEach(row => {
      console.log(`${row.category.padEnd(15)} ${(row.subcategory || 'N/A').padEnd(20)} ${row.item_count} items`);
    });
    console.log('─────────────────────────────────');
    
    const totalResult = await pool.query('SELECT COUNT(*) as total FROM gear_database WHERE is_custom = FALSE');
    console.log(`Total: ${totalResult.rows[0].total} official items\n`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Get migration file from command line argument
const migrationFile = process.argv[2] || '001_populate_gear_database.sql';

runMigration(migrationFile)
  .then(() => {
    console.log('✨ All done!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
