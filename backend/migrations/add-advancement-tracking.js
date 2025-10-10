// backend/migrations/add-advancement-tracking.js
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function migrateAdvancementTables() {
  const client = await pool.connect();
  
  try {
    console.log('🎲 Starting advancement tracking migration...');
    
    await client.query('BEGIN');
    
    // Create XP log table
    await client.query(`
      CREATE TABLE IF NOT EXISTS xp_log (
        id SERIAL PRIMARY KEY,
        character_id INTEGER REFERENCES characters(id) ON DELETE CASCADE,
        amount INTEGER NOT NULL,
        reason TEXT,
        awarded_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Created xp_log table');
    
    // Create level up log table
    await client.query(`
      CREATE TABLE IF NOT EXISTS level_up_log (
        id SERIAL PRIMARY KEY,
        character_id INTEGER REFERENCES characters(id) ON DELETE CASCADE,
        old_level INTEGER NOT NULL,
        new_level INTEGER NOT NULL,
        hp_roll JSONB,
        hp_increase INTEGER NOT NULL,
        talent_gained JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Created level_up_log table');
    
    // Add indexes for performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_xp_log_character 
      ON xp_log(character_id)
    `);
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_level_log_character 
      ON level_up_log(character_id)
    `);
    console.log('✅ Created indexes');
    
    await client.query('COMMIT');
    console.log('🎉 Advancement tracking migration complete!');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

migrateAdvancementTables()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Migration error:', error);
    process.exit(1);
  });
