// Migration to add enlightenment_uses column for Wise archetype
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { Pool } = require('pg');

console.log('Environment check:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'MISSING');
console.log('DB_NAME:', process.env.DB_NAME);

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: String(process.env.DB_PASSWORD || 'admin'),
  database: process.env.DB_NAME || 'darkspace_campaign',
});

async function migrate() {
  const client = await pool.connect();
  
  try {
    console.log('🔧 Starting migration: Add enlightenment_uses column...');
    
    await client.query('BEGIN');
    
    // Check if column already exists
    const checkColumn = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'characters' 
      AND column_name = 'enlightenment_uses'
    `);
    
    if (checkColumn.rows.length === 0) {
      console.log('   Adding enlightenment_uses column...');
      
      // Add enlightenment_uses column (default 1 for Wise characters who choose Enlightenment at creation)
      await client.query(`
        ALTER TABLE characters 
        ADD COLUMN enlightenment_uses INTEGER DEFAULT 1
      `);
      
      console.log('✅ Column enlightenment_uses added successfully');
    } else {
      console.log('ℹ️  Column enlightenment_uses already exists, skipping');
    }
    
    await client.query('COMMIT');
    console.log('✅ Migration completed successfully!');
    
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
migrate()
  .then(() => {
    console.log('🎉 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Migration error:', error);
    process.exit(1);
  });
