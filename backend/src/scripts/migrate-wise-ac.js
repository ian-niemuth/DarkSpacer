// Run migration to fix Wise character AC
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function runMigration() {
  try {
    const migrationPath = path.join(__dirname, '../database/migrations/008_fix_wise_character_ac.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Running migration: Fix Wise character AC...');
    await pool.query(sql);
    console.log('✅ Migration completed successfully!');
    
    // Show the updated characters
    const result = await pool.query(`
      SELECT id, name, archetype, level, dexterity, ac 
      FROM characters 
      WHERE archetype = 'Wise'
      ORDER BY id
    `);
    
    if (result.rows.length > 0) {
      console.log('\nUpdated Wise characters:');
      result.rows.forEach(char => {
        const dexMod = Math.floor((char.dexterity - 10) / 2);
        const insightful = Math.max(1, Math.floor(char.level / 2));
        console.log(`  - ${char.name} (Level ${char.level}): AC ${char.ac} (10 base + ${dexMod} DEX + ${insightful} Insightful Defense)`);
      });
    } else {
      console.log('\nNo Wise characters found in database.');
    }
    
  } catch (error) {
    console.error('❌ Error running migration:', error);
  } finally {
    await pool.end();
  }
}

runMigration();
