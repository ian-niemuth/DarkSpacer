/**
 * Run Space Exploration Database Migration
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('./src/config/database');

async function runMigration() {
  try {
    console.log('🚀 Running Space Exploration Migration...');
    
    // Read the SQL file
    const sqlPath = path.join(__dirname, '..', 'database', 'migrations', '002_space_exploration.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Execute the SQL
    await pool.query(sql);
    
    console.log('✅ Space Exploration tables created successfully!');
    console.log('📦 Created tables:');
    console.log('  - campaigns');
    console.log('  - galaxies');
    console.log('  - regions');
    console.log('  - sectors');
    console.log('  - systems');
    console.log('  - celestial_bodies');
    console.log('  - space_hazards');
    console.log('  - ship_discoveries');
    
    // Check if default campaign exists
    const campaignCheck = await pool.query('SELECT * FROM campaigns WHERE seed = $1', ['darkspace-2025']);
    
    if (campaignCheck.rows.length === 0) {
      console.log('📝 Creating default campaign...');
      const campaignResult = await pool.query(
        `INSERT INTO campaigns (name, seed, notes) 
         VALUES ($1, $2, $3) 
         RETURNING *`,
        ['Default Campaign', 'darkspace-2025', 'The primary DarkSpace campaign']
      );
      console.log(`✅ Created campaign: ${campaignResult.rows[0].name} (ID: ${campaignResult.rows[0].id})`);
    } else {
      console.log(`✅ Default campaign already exists (ID: ${campaignCheck.rows[0].id})`);
    }
    
    console.log('\n🎉 Migration completed successfully!');
    console.log('\n💡 Next steps:');
    console.log('  1. Start the backend server: npm start');
    console.log('  2. Call POST /api/space/init-starter-sector to generate starting location');
    console.log('  3. Explore the galaxy! 🌌');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

runMigration();
