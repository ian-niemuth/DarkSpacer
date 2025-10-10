// Create test ships and assign to admin
require('dotenv').config();
const pool = require('./src/config/database');

async function setupTestShips() {
  try {
    console.log('🚀 Setting up test ships...\n');
    
    // Create a party ship (accessible to everyone)
    console.log('1️⃣  Creating party ship...');
    const partyShipResult = await pool.query(`
      INSERT INTO ships (
        name, ship_class, owner_type, 
        hp_current, hp_max, ac, level,
        strength, dexterity, constitution, intelligence, wisdom, charisma,
        system_slots_max, feature_slots_max, movement, description
      ) VALUES (
        'Falcon', 'Corvette', 'party',
        25, 25, 14, 1,
        12, 14, 10, 10, 10, 10,
        10, 10, 'near', 'A fast party ship for exploration'
      ) RETURNING *
    `);
    const partyShip = partyShipResult.rows[0];
    console.log(`✓ Created: ${partyShip.name} (ID: ${partyShip.id})`);
    
    // Add Memory Bank to party ship
    console.log('\n2️⃣  Adding Memory Bank...');
    const memoryBankTemplate = await pool.query(
      "SELECT id FROM component_templates WHERE name = 'Memory Bank' LIMIT 1"
    );
    
    if (memoryBankTemplate.rows.length > 0) {
      await pool.query(`
        INSERT INTO ship_components (ship_id, component_template_id, is_installed)
        VALUES ($1, $2, true)
      `, [partyShip.id, memoryBankTemplate.rows[0].id]);
      console.log('✓ Memory Bank installed');
    } else {
      console.log('⚠️  Memory Bank template not found (you can add it later)');
    }
    
    // Create a character for admin
    console.log('\n3️⃣  Creating character for admin user...');
    const adminCharResult = await pool.query(`
      INSERT INTO characters (
        user_id, name, species, archetype, background, motivation,
        level, xp, hp_current, hp_max, ac,
        strength, dexterity, constitution, intelligence, wisdom, charisma,
        credits, reputation, bounty, luck
      ) VALUES (
        1, 'Admin Test Character', 'Human', 'Quick', 'Pilot', 'The Survivor',
        1, 0, 16, 16, 12,
        10, 14, 12, 10, 10, 10,
        100, 0, 0, 0
      ) RETURNING *
    `);
    const adminChar = adminCharResult.rows[0];
    console.log(`✓ Created: ${adminChar.name} (ID: ${adminChar.id})`);
    
    // Assign admin character as crew on party ship
    console.log('\n4️⃣  Assigning to crew...');
    await pool.query(`
      INSERT INTO ship_crew_assignments (ship_id, character_id, crew_role, is_captain)
      VALUES ($1, $2, 'Pilot', true)
    `, [partyShip.id, adminChar.id]);
    console.log('✓ Assigned as Captain/Pilot');
    
    // Create a character-owned ship
    console.log('\n5️⃣  Creating character-owned ship...');
    const charShipResult = await pool.query(`
      INSERT INTO ships (
        name, ship_class, owner_type, owner_id,
        hp_current, hp_max, ac, level,
        strength, dexterity, constitution, intelligence, wisdom, charisma,
        system_slots_max, feature_slots_max, movement, description
      ) VALUES (
        'Personal Shuttle', 'Fighter', 'character', $1,
        15, 15, 13, 1,
        10, 12, 10, 10, 10, 10,
        5, 5, 'near', 'Personal transport vessel'
      ) RETURNING *
    `, [adminChar.id]);
    const charShip = charShipResult.rows[0];
    console.log(`✓ Created: ${charShip.name} (ID: ${charShip.id}) owned by ${adminChar.name}`);
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('✅ SETUP COMPLETE!\n');
    console.log('Created:');
    console.log(`  • Party Ship: "${partyShip.name}" (ID: ${partyShip.id})`);
    console.log(`  • Character: "${adminChar.name}" (ID: ${adminChar.id})`);
    console.log(`  • Personal Ship: "${charShip.name}" (ID: ${charShip.id})`);
    console.log('\n🎮 Now you can:');
    console.log('  1. Refresh your browser');
    console.log('  2. Click "🌌 Space Map" - should work now!');
    console.log('  3. Click "🚀 My Ships" - you\'ll see both ships');
    console.log('='.repeat(50) + '\n');
    
    await pool.end();
    
  } catch (error) {
    console.error('❌ Error:', error);
    await pool.end();
    process.exit(1);
  }
}

setupTestShips();
