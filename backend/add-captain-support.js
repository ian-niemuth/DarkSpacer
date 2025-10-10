// Migration: Add Captain Support to Ships
require('dotenv').config();
const pool = require('./src/config/database');

async function addCaptainSupport() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 Starting Captain Support Migration...\n');
    
    await client.query('BEGIN');
    
    // 1. Add is_captain column to ship_crew_assignments
    console.log('1. Adding is_captain column to ship_crew_assignments...');
    await client.query(`
      ALTER TABLE ship_crew_assignments 
      ADD COLUMN IF NOT EXISTS is_captain BOOLEAN DEFAULT false
    `);
    console.log('   ✅ Added is_captain column\n');
    
    // 2. Create ship_purchases table for purchase tracking
    console.log('2. Creating ship_purchases table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS ship_purchases (
        id SERIAL PRIMARY KEY,
        ship_id INTEGER REFERENCES ships(id) ON DELETE CASCADE,
        purchase_type VARCHAR(50) NOT NULL, -- 'upgrade', 'component', 'weapon', 'armor'
        item_id INTEGER, -- ID of the template being purchased
        item_name VARCHAR(255) NOT NULL,
        cost INTEGER NOT NULL,
        status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
        requested_by INTEGER REFERENCES characters(id) ON DELETE SET NULL,
        requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        reviewed_by INTEGER REFERENCES characters(id) ON DELETE SET NULL,
        reviewed_at TIMESTAMP,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('   ✅ Created ship_purchases table\n');
    
    // 3. Create ship_credit_pool table for pooled credits
    console.log('3. Creating ship_credit_pool table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS ship_credit_pool (
        id SERIAL PRIMARY KEY,
        ship_id INTEGER UNIQUE REFERENCES ships(id) ON DELETE CASCADE,
        pooled_credits INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('   ✅ Created ship_credit_pool table\n');
    
    // 4. Create ship_credit_contributions table to track who contributed
    console.log('4. Creating ship_credit_contributions table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS ship_credit_contributions (
        id SERIAL PRIMARY KEY,
        ship_id INTEGER REFERENCES ships(id) ON DELETE CASCADE,
        character_id INTEGER REFERENCES characters(id) ON DELETE CASCADE,
        amount INTEGER NOT NULL,
        contributed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        note TEXT
      )
    `);
    console.log('   ✅ Created ship_credit_contributions table\n');
    
    // 5. Initialize credit pools for existing ships
    console.log('5. Initializing credit pools for existing ships...');
    await client.query(`
      INSERT INTO ship_credit_pool (ship_id, pooled_credits)
      SELECT id, 0 FROM ships
      ON CONFLICT (ship_id) DO NOTHING
    `);
    console.log('   ✅ Initialized credit pools\n');
    
    // 6. Set existing "Captain" crew roles as is_captain = true
    console.log('6. Setting existing Captain crew members as captains...');
    const captainUpdate = await client.query(`
      UPDATE ship_crew_assignments 
      SET is_captain = true 
      WHERE crew_role = 'Captain'
    `);
    console.log(`   ✅ Updated ${captainUpdate.rowCount} captain assignments\n`);
    
    await client.query('COMMIT');
    
    console.log('✅ Captain Support Migration Complete!\n');
    console.log('Summary:');
    console.log('- Added is_captain flag to crew assignments');
    console.log('- Created ship purchase tracking system');
    console.log('- Created credit pooling system');
    console.log('- Initialized existing ships with credit pools');
    console.log(`- Marked ${captainUpdate.rowCount} existing captains`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run migration
addCaptainSupport()
  .then(() => {
    console.log('\n🎉 Migration completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Migration failed:', error);
    process.exit(1);
  });
