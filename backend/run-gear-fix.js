// Run ONLY the gear database fix migration
// Run with: node run-gear-fix.js

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const pool = require('./src/config/database');

async function runMigration() {
  try {
    console.log('\n🔄 Running migration: 007_fix_gear_database.sql');
    console.log('   This will replace all gear with official DarkSpace items...\n');
    
    const sql = fs.readFileSync(
      path.join(__dirname, '../database/migrations/007_fix_gear_database.sql'),
      'utf8'
    );
    
    await pool.query(sql);
    
    console.log('✅ Migration complete: Gear database fixed!');
    console.log('\n📋 Summary:');
    console.log('   ✓ Removed generic placeholder items');
    console.log('   ✓ Added official DarkSpace melee weapons (13 types)');
    console.log('   ✓ Added official DarkSpace ranged weapons (16 types)');
    console.log('   ✓ Added official DarkSpace armor (8 types)');
    console.log('   ✓ Added official DarkSpace gear & equipment');
    console.log('\n🎯 All items now match the rulebook exactly!');
    console.log('   Next: Restart your backend server');
    
    // Show counts
    const weaponCount = await pool.query(`
      SELECT weapon_type, weapon_weight_class, COUNT(*) as count
      FROM gear_database 
      WHERE weapon_type IS NOT NULL
      GROUP BY weapon_type, weapon_weight_class
      ORDER BY weapon_type, weapon_weight_class
    `);
    
    console.log('\n📊 Weapon Breakdown:');
    weaponCount.rows.forEach(row => {
      const weightClass = row.weapon_weight_class || 'standard';
      console.log(`   - ${row.weapon_type} (${weightClass}): ${row.count} items`);
    });
    
    const armorCount = await pool.query(`
      SELECT armor_type, COUNT(*) as count
      FROM gear_database 
      WHERE armor_type IS NOT NULL
      GROUP BY armor_type
      ORDER BY armor_type
    `);
    
    console.log('\n🛡️  Armor Breakdown:');
    armorCount.rows.forEach(row => {
      console.log(`   - ${row.armor_type}: ${row.count} items`);
    });
    
  } catch (error) {
    console.error('❌ Migration failed!');
    console.error(error.message);
    
    if (error.message.includes('does not exist')) {
      console.log('\n💡 It looks like the equipment restrictions migration hasn\'t run yet.');
      console.log('   Run: node run-single-migration.js first');
    }
    
    process.exit(1);
  }
  
  process.exit(0);
}

runMigration();
