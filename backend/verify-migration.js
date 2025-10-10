// Verification script - checks if migration was successful
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function verify() {
  console.log('🔍 Verifying migration results...\n');
  
  try {
    // Check if columns exist
    console.log('1️⃣  Checking if columns exist...');
    const columnsResult = await pool.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'gear_database'
      AND column_name IN ('weapon_type', 'weapon_weight_class', 'armor_type', 'hands_required', 'allows_dex_modifier', 'ac_bonus')
      ORDER BY column_name
    `);
    
    const expectedColumns = ['ac_bonus', 'allows_dex_modifier', 'armor_type', 'hands_required', 'weapon_type', 'weapon_weight_class'];
    const foundColumns = columnsResult.rows.map(r => r.column_name);
    
    if (foundColumns.length === 6) {
      console.log('   ✅ All 6 columns exist!');
      columnsResult.rows.forEach(col => {
        console.log(`      - ${col.column_name} (${col.data_type})`);
      });
    } else {
      console.log('   ❌ Missing columns!');
      const missing = expectedColumns.filter(c => !foundColumns.includes(c));
      console.log('      Missing:', missing.join(', '));
      throw new Error('Migration incomplete - missing columns');
    }
    
    console.log();
    
    // Check weapon classifications
    console.log('2️⃣  Checking weapon classifications...');
    const weaponStats = await pool.query(`
      SELECT 
        weapon_type,
        weapon_weight_class,
        COUNT(*) as count
      FROM gear_database
      WHERE category = 'weapon'
      GROUP BY weapon_type, weapon_weight_class
      ORDER BY weapon_type, weapon_weight_class
    `);
    
    if (weaponStats.rows.length > 0) {
      console.log('   ✅ Weapons classified:');
      weaponStats.rows.forEach(stat => {
        console.log(`      - ${stat.weapon_type || 'unset'} / ${stat.weapon_weight_class || 'standard'}: ${stat.count} weapons`);
      });
    } else {
      console.log('   ⚠️  No weapons found (this might be okay if you have no weapons yet)');
    }
    
    console.log();
    
    // Check armor classifications  
    console.log('3️⃣  Checking armor classifications...');
    const armorStats = await pool.query(`
      SELECT 
        armor_type,
        ac_bonus,
        allows_dex_modifier,
        COUNT(*) as count
      FROM gear_database
      WHERE category = 'armor'
      GROUP BY armor_type, ac_bonus, allows_dex_modifier
      ORDER BY armor_type
    `);
    
    if (armorStats.rows.length > 0) {
      console.log('   ✅ Armor classified:');
      armorStats.rows.forEach(stat => {
        console.log(`      - ${stat.armor_type}: AC ${stat.ac_bonus}, DEX ${stat.allows_dex_modifier ? 'allowed' : 'blocked'} (${stat.count} items)`);
      });
    } else {
      console.log('   ⚠️  No armor found (this might be okay if you have no armor yet)');
    }
    
    console.log();
    
    // Check two-handed weapons
    console.log('4️⃣  Checking two-handed weapons...');
    const twoHandedResult = await pool.query(`
      SELECT COUNT(*) as count
      FROM gear_database
      WHERE hands_required = 2
    `);
    
    const twoHandedCount = parseInt(twoHandedResult.rows[0].count);
    console.log(`   ✅ Found ${twoHandedCount} two-handed weapons`);
    
    console.log();
    
    // Sample some items
    console.log('5️⃣  Sample items with new fields...');
    const samples = await pool.query(`
      SELECT name, category, subcategory, weapon_type, weapon_weight_class, armor_type, hands_required, ac_bonus
      FROM gear_database
      WHERE weapon_type IS NOT NULL OR armor_type IS NOT NULL
      LIMIT 5
    `);
    
    if (samples.rows.length > 0) {
      console.log('   ✅ Sample items:');
      samples.rows.forEach(item => {
        console.log(`      - ${item.name} (${item.category})`);
        if (item.weapon_type) {
          console.log(`        → ${item.weapon_type} weapon, ${item.weapon_weight_class || 'standard'} weight, ${item.hands_required}H`);
        }
        if (item.armor_type) {
          console.log(`        → ${item.armor_type} armor, AC +${item.ac_bonus}`);
        }
      });
    }
    
    console.log();
    console.log('✅ Migration verification PASSED!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   - Columns: ✅ All ${columnsResult.rows.length}/6 present`);
    console.log(`   - Weapons: ${weaponStats.rows.reduce((sum, r) => sum + parseInt(r.count), 0)} total`);
    console.log(`   - Armor: ${armorStats.rows.reduce((sum, r) => sum + parseInt(r.count), 0)} total`);
    console.log(`   - 2H Weapons: ${twoHandedCount}`);
    console.log('');
    console.log('🎉 You\'re ready to go!');
    
  } catch (error) {
    console.error('\n❌ Verification FAILED:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run verification
verify()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
