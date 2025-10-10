// Quick API Test for Ship System
const axios = require('axios');

const API_URL = 'http://localhost:3001/api/ships';

console.log('🧪 Testing DarkSpace Ship API\n');
console.log('=====================================\n');

async function runTests() {
  try {
    // Test 1: Get all component templates
    console.log('1️⃣  Testing GET /api/ships/templates/components');
    const components = await axios.get(`${API_URL}/templates/components`);
    console.log(`   ✅ Found ${components.data.length} component templates\n`);
    
    // Test 2: Get all weapon templates
    console.log('2️⃣  Testing GET /api/ships/templates/weapons');
    const weapons = await axios.get(`${API_URL}/templates/weapons`);
    console.log(`   ✅ Found ${weapons.data.length} weapon templates\n`);
    
    // Test 3: Get all armor templates
    console.log('3️⃣  Testing GET /api/ships/templates/armor');
    const armor = await axios.get(`${API_URL}/templates/armor`);
    console.log(`   ✅ Found ${armor.data.length} armor templates\n`);
    
    // Test 4: Get all enhancement templates
    console.log('4️⃣  Testing GET /api/ships/templates/enhancements');
    const enhancements = await axios.get(`${API_URL}/templates/enhancements`);
    console.log(`   ✅ Found ${enhancements.data.length} enhancement templates\n`);
    
    // Test 5: Get all ships
    console.log('5️⃣  Testing GET /api/ships');
    const ships = await axios.get(API_URL);
    console.log(`   ✅ Found ${ships.data.length} existing ships\n`);
    
    // Test 6: Create a test ship
    console.log('6️⃣  Testing POST /api/ships (Create Ship)');
    const newShip = await axios.post(API_URL, {
      name: 'API Test Ship',
      ship_class: 'Freighter',
      owner_type: 'party',
      hp_max: 12,
      system_slots_max: 7,
      feature_slots_max: 9,
      strength: 12,
      dexterity: 8,
      description: 'Test ship created by API test script'
    });
    console.log(`   ✅ Created ship: ${newShip.data.name} (ID: ${newShip.data.id})\n`);
    
    const testShipId = newShip.data.id;
    
    // Test 7: Get ship details
    console.log('7️⃣  Testing GET /api/ships/:id');
    const shipDetails = await axios.get(`${API_URL}/${testShipId}`);
    console.log(`   ✅ Retrieved ship details for "${shipDetails.data.name}"\n`);
    
    // Test 8: Install component
    console.log('8️⃣  Testing POST /api/ships/:id/components');
    const ftlDrive = components.data.find(c => c.name === 'FTL Drive');
    if (ftlDrive) {
      const component = await axios.post(`${API_URL}/${testShipId}/components`, {
        component_template_id: ftlDrive.id,
        is_advanced: false
      });
      console.log(`   ✅ Installed FTL Drive on ship\n`);
    }
    
    // Test 9: Create weapons array
    console.log('9️⃣  Testing POST /api/ships/:id/weapons-arrays');
    const weaponsArray = await axios.post(`${API_URL}/${testShipId}/weapons-arrays`, {
      array_name: 'Test Cannons',
      max_weapons: 4,
      is_firelinked: false
    });
    console.log(`   ✅ Created weapons array: ${weaponsArray.data.array_name}\n`);
    
    // Test 10: Add weapon to array
    console.log('🔟 Testing POST /api/ships/:id/weapons-arrays/:arrayId/weapons');
    const laserCannon = weapons.data.find(w => w.name === 'Laser Cannon');
    if (laserCannon) {
      await axios.post(
        `${API_URL}/${testShipId}/weapons-arrays/${weaponsArray.data.id}/weapons`,
        {
          weapon_template_id: laserCannon.id,
          array_position: 1
        }
      );
      console.log(`   ✅ Added Laser Cannon to weapons array\n`);
    }
    
    // Test 11: Install armor
    console.log('1️⃣1️⃣  Testing POST /api/ships/:id/armor');
    const lightArmor = armor.data.find(a => a.name === 'Armor Plating, Light');
    if (lightArmor) {
      await axios.post(`${API_URL}/${testShipId}/armor`, {
        armor_template_id: lightArmor.id
      });
      console.log(`   ✅ Installed Light Armor Plating\n`);
    }
    
    // Test 12: Get crew roles
    console.log('1️⃣2️⃣  Testing GET /api/ships/crew-roles');
    const crewRoles = await axios.get(`${API_URL}/crew-roles`);
    console.log(`   ✅ Found ${crewRoles.data.length} crew roles\n`);
    
    // Test 13: Get final ship details
    console.log('1️⃣3️⃣  Testing GET /api/ships/:id (Final State)');
    const finalShip = await axios.get(`${API_URL}/${testShipId}`);
    console.log(`   ✅ Final ship state retrieved\n`);
    console.log('   📊 Ship Summary:');
    console.log(`      - Components: ${finalShip.data.components.length}`);
    console.log(`      - Weapons Arrays: ${finalShip.data.weapons_arrays.length}`);
    console.log(`      - Armor: ${finalShip.data.armor ? 'Installed' : 'None'}`);
    console.log(`      - System Slots: ${finalShip.data.system_slots_used}/${finalShip.data.system_slots_max}`);
    console.log(`      - Feature Slots: ${finalShip.data.feature_slots_used}/${finalShip.data.feature_slots_max}`);
    console.log(`      - Total Maintenance: ${finalShip.data.total_maintenance_cost}cr\n`);
    
    // Test 14: Delete test ship
    console.log('1️⃣4️⃣  Testing DELETE /api/ships/:id (Cleanup)');
    await axios.delete(`${API_URL}/${testShipId}`);
    console.log(`   ✅ Test ship deleted\n`);
    
    console.log('=====================================');
    console.log('✅ ALL TESTS PASSED!');
    console.log('=====================================\n');
    console.log('🎉 Ship API is fully functional!\n');
    
  } catch (error) {
    console.error('\n❌ TEST FAILED:');
    console.error('Error:', error.response?.data || error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

// Check if server is running
console.log('🔍 Checking if server is running...\n');
axios.get('http://localhost:3001/api/health')
  .then(() => {
    console.log('✅ Server is running!\n');
    console.log('Starting tests...\n');
    runTests();
  })
  .catch(() => {
    console.error('❌ Server is not running!');
    console.error('\nPlease start the server first:');
    console.error('  cd backend');
    console.error('  npm run dev\n');
    process.exit(1);
  });
