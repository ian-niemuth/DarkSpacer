// Debug ship system - check database state
require('dotenv').config();
const pool = require('./src/config/database');

async function debugShipSystem() {
  try {
    console.log('🔍 DEBUGGING SHIP SYSTEM\n');
    console.log('='.repeat(50));
    
    // Check users
    console.log('\n1️⃣  USERS:');
    const users = await pool.query('SELECT id, username, is_admin FROM users ORDER BY id');
    console.table(users.rows);
    
    // Check characters
    console.log('\n2️⃣  CHARACTERS:');
    const characters = await pool.query('SELECT id, name, user_id, archetype FROM characters ORDER BY id');
    if (characters.rows.length === 0) {
      console.log('❌ NO CHARACTERS FOUND');
    } else {
      console.table(characters.rows);
    }
    
    // Check ships
    console.log('\n3️⃣  SHIPS:');
    const ships = await pool.query(`
      SELECT 
        s.id, 
        s.name, 
        s.owner_type, 
        s.owner_id,
        CASE 
          WHEN s.owner_type = 'character' THEN c.name
          ELSE 'Party Ship'
        END as owner_name
      FROM ships s
      LEFT JOIN characters c ON s.owner_type = 'character' AND s.owner_id = c.id
      ORDER BY s.id
    `);
    if (ships.rows.length === 0) {
      console.log('❌ NO SHIPS FOUND');
    } else {
      console.table(ships.rows);
    }
    
    // Check ship components
    console.log('\n4️⃣  SHIP COMPONENTS:');
    const components = await pool.query(`
      SELECT 
        sc.id,
        sc.ship_id,
        s.name as ship_name,
        ct.name as component_name,
        sc.is_installed
      FROM ship_components sc
      JOIN ships s ON sc.ship_id = s.id
      JOIN component_templates ct ON sc.component_template_id = ct.id
      ORDER BY sc.ship_id, sc.id
    `);
    if (components.rows.length === 0) {
      console.log('⚠️  No components installed on any ships');
    } else {
      console.table(components.rows);
    }
    
    // Check ship crew assignments
    console.log('\n5️⃣  CREW ASSIGNMENTS:');
    const crew = await pool.query(`
      SELECT 
        sca.id,
        sca.ship_id,
        s.name as ship_name,
        sca.character_id,
        c.name as character_name,
        sca.crew_role
      FROM ship_crew_assignments sca
      JOIN ships s ON sca.ship_id = s.id
      JOIN characters c ON sca.character_id = c.id
      ORDER BY sca.ship_id
    `);
    if (crew.rows.length === 0) {
      console.log('⚠️  No crew assignments');
    } else {
      console.table(crew.rows);
    }
    
    // Test: What ships would admin see?
    console.log('\n6️⃣  ADMIN ACCESS TEST:');
    const adminUser = await pool.query('SELECT id FROM users WHERE is_admin = true LIMIT 1');
    if (adminUser.rows.length === 0) {
      console.log('❌ NO ADMIN USER FOUND');
    } else {
      const adminId = adminUser.rows[0].id;
      console.log(`Testing access for admin user ID: ${adminId}`);
      
      // Get admin's characters
      const adminChars = await pool.query('SELECT id FROM characters WHERE user_id = $1', [adminId]);
      const charIds = adminChars.rows.map(r => r.id);
      
      if (charIds.length === 0) {
        console.log('❌ ADMIN HAS NO CHARACTERS');
        console.log('   This means /api/ships/player will return empty array');
      } else {
        console.log(`✓ Admin has ${charIds.length} character(s): ${charIds.join(', ')}`);
        
        // What ships can admin access?
        const accessibleShips = await pool.query(`
          SELECT DISTINCT s.id, s.name, s.owner_type
          FROM ships s
          LEFT JOIN ship_crew_assignments sca ON s.id = sca.ship_id
          WHERE 
            (s.owner_type = 'character' AND s.owner_id = ANY($1))
            OR s.owner_type = 'party'
            OR sca.character_id = ANY($1)
        `, [charIds]);
        
        if (accessibleShips.rows.length === 0) {
          console.log('❌ ADMIN HAS NO ACCESSIBLE SHIPS');
        } else {
          console.log(`✓ Admin can access ${accessibleShips.rows.length} ship(s):`);
          console.table(accessibleShips.rows);
        }
      }
    }
    
    // Recommendations
    console.log('\n7️⃣  RECOMMENDATIONS:');
    console.log('='.repeat(50));
    
    if (characters.rows.length === 0) {
      console.log('🔧 Create a character for admin:');
      console.log('   - Login to the website');
      console.log('   - Click "Create Character"');
      console.log('   - Or run: INSERT INTO characters (user_id, name, ...) VALUES (1, \'Test Character\', ...)');
    }
    
    if (ships.rows.length === 0) {
      console.log('🔧 Create a test ship:');
      console.log('   - Go to Admin Panel → Ships');
      console.log('   - Create a party ship');
      console.log('   - Or run the SQL below:');
      console.log(`
      INSERT INTO ships (name, ship_class, owner_type, hp_current, hp_max, ac, level, 
        strength, dexterity, constitution, intelligence, wisdom, charisma,
        system_slots_max, feature_slots_max)
      VALUES ('Test Ship', 'Corvette', 'party', 10, 10, 12, 1, 
        10, 10, 10, 10, 10, 10, 10, 10);
      `);
    }
    
    await pool.end();
    
  } catch (error) {
    console.error('❌ Error during debug:', error);
    await pool.end();
    process.exit(1);
  }
}

debugShipSystem();
