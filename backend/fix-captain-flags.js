// Fix Captain Flags
require('dotenv').config();
const pool = require('./src/config/database');

async function fixCaptainFlags() {
  const client = await pool.connect();
  
  try {
    console.log('🔧 Fixing captain flags...\n');
    
    // Check current state
    const checkResult = await client.query(`
      SELECT s.name as ship_name, c.name as character_name, sca.crew_role, sca.is_captain
      FROM ship_crew_assignments sca
      JOIN ships s ON sca.ship_id = s.id
      JOIN characters c ON sca.character_id = c.id
      WHERE sca.crew_role = 'Captain'
    `);
    
    console.log('Current Captains:');
    checkResult.rows.forEach(row => {
      console.log(`  ${row.character_name} on ${row.ship_name} - is_captain: ${row.is_captain}`);
    });
    
    // Fix any captains that don't have is_captain = true
    const fixResult = await client.query(`
      UPDATE ship_crew_assignments
      SET is_captain = true
      WHERE crew_role = 'Captain' AND (is_captain IS NULL OR is_captain = false)
      RETURNING *
    `);
    
    if (fixResult.rowCount > 0) {
      console.log(`\n✅ Fixed ${fixResult.rowCount} captain assignment(s)`);
    } else {
      console.log('\n✅ All captain flags already correct!');
    }
    
    // Show final state
    console.log('\nFinal state:');
    const finalCheck = await client.query(`
      SELECT s.name as ship_name, c.name as character_name, sca.crew_role, sca.is_captain
      FROM ship_crew_assignments sca
      JOIN ships s ON sca.ship_id = s.id
      JOIN characters c ON sca.character_id = c.id
      ORDER BY s.name, sca.crew_role
    `);
    
    finalCheck.rows.forEach(row => {
      console.log(`  ${row.character_name} on ${row.ship_name} - ${row.crew_role} (captain: ${row.is_captain})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

fixCaptainFlags()
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Failed:', error);
    process.exit(1);
  });
