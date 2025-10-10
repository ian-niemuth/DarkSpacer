// Simple migration to add enlightenment_uses column
const { Client } = require('pg');

async function migrate() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'admin',
    database: 'darkspace_campaign',
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');
    
    console.log('🔧 Adding enlightenment_uses column...');
    
    await client.query(`
      ALTER TABLE characters 
      ADD COLUMN IF NOT EXISTS enlightenment_uses INTEGER DEFAULT 1
    `);
    
    console.log('✅ Column enlightenment_uses added successfully!');
    console.log('🎉 Migration complete!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}

migrate()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
