// Fix cargo capacity for all existing ships with Cargo Hold components
require('dotenv').config();
const pool = require('./src/config/database');

async function fixCargoCapacity() {
  const client = await pool.connect();
  
  try {
    console.log('🔧 Fixing cargo capacity for all ships...\n');

    await client.query('BEGIN');
    
    // Get all ships with their Cargo Hold count
    const result = await client.query(`
      SELECT 
        s.id,
        s.name,
        s.cargo_capacity as current_capacity,
        COUNT(sc.id) as cargo_hold_count
      FROM ships s
      LEFT JOIN ship_components sc ON s.id = sc.ship_id
      LEFT JOIN component_templates ct ON sc.component_template_id = ct.id AND ct.name = 'Cargo Hold'
      GROUP BY s.id, s.name, s.cargo_capacity
      ORDER BY s.id
    `);
    
    console.log(`📊 Found ${result.rows.length} ships\n`);
    
    for (const ship of result.rows) {
      const cargoHoldCount = parseInt(ship.cargo_hold_count);
      const correctCapacity = cargoHoldCount * 10; // Each Cargo Hold = 10 capacity
      
      if (ship.current_capacity !== correctCapacity) {
        await client.query(
          'UPDATE ships SET cargo_capacity = $1 WHERE id = $2',
          [correctCapacity, ship.id]
        );
        
        console.log(`✅ ${ship.name}:`);
        console.log(`   - Cargo Holds: ${cargoHoldCount}`);
        console.log(`   - Old capacity: ${ship.current_capacity || 0}`);
        console.log(`   - New capacity: ${correctCapacity}\n`);
      } else {
        console.log(`✓ ${ship.name}: Already correct (${correctCapacity})\n`);
      }
    }
    
    await client.query('COMMIT');
    
    console.log('=====================================');
    console.log('✅ All ships updated!');
    
    process.exit(0);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Fix failed:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

fixCargoCapacity();
