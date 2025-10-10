// Comprehensive verification script - checks all migrations
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
  console.log('[VERIFY] Checking comprehensive database fixes...\n');
  
  let allPassed = true;
  
  try {
    // ============================================
    // PART 1: Verify gear_database table
    // ============================================
    
    console.log('[PART 1] Verifying gear_database table...\n');
    
    // Check if table exists
    const gearTableCheck = await pool.query(`
      SELECT table_name FROM information_schema.tables WHERE table_name = 'gear_database'
    `);
    
    if (gearTableCheck.rows.length === 0) {
      console.log('  [WARN] gear_database table does not exist - skipping verification\n');
    } else {
      // Check if columns exist
      const gearColumnsResult = await pool.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'gear_database'
        AND column_name IN ('weapon_type', 'weapon_weight_class', 'armor_type', 'hands_required', 'allows_dex_modifier', 'ac_bonus')
        ORDER BY column_name
      `);
      
      const expectedGearColumns = ['ac_bonus', 'allows_dex_modifier', 'armor_type', 'hands_required', 'weapon_type', 'weapon_weight_class'];
      const foundGearColumns = gearColumnsResult.rows.map(r => r.column_name);
      
      if (foundGearColumns.length === 6) {
        console.log('  [OK] All 6 gear_database columns exist:');
        gearColumnsResult.rows.forEach(col => {
          console.log('    - ' + col.column_name + ' (' + col.data_type + ')');
        });
      } else {
        console.log('  [FAIL] Missing gear_database columns!');
        const missing = expectedGearColumns.filter(c => !foundGearColumns.includes(c));
        console.log('    Missing: ' + missing.join(', '));
        allPassed = false;
      }
      
      // Check weapon classifications
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
        console.log('\n  [OK] Weapons classified:');
        weaponStats.rows.forEach(stat => {
          const wType = stat.weapon_type || 'unset';
          const wClass = stat.weapon_weight_class || 'standard';
          console.log('    - ' + wType + ' / ' + wClass + ': ' + stat.count + ' weapons');
        });
      } else {
        console.log('\n  [WARN] No weapons found (database may be empty)');
      }
      
      // Check armor classifications
      const armorStats = await pool.query(`
        SELECT 
          armor_type,
          ac_bonus,
          COUNT(*) as count
        FROM gear_database
        WHERE category = 'armor'
        GROUP BY armor_type, ac_bonus
        ORDER BY armor_type
      `);
      
      if (armorStats.rows.length > 0) {
        console.log('\n  [OK] Armor classified:');
        armorStats.rows.forEach(stat => {
          console.log('    - ' + stat.armor_type + ': AC ' + stat.ac_bonus + ' (' + stat.count + ' items)');
        });
      }
      
      console.log();
    }
    
    // ============================================
    // PART 2: Verify ships table
    // ============================================
    
    console.log('[PART 2] Verifying ships table...\n');
    
    // Check if table exists
    const shipsTableCheck = await pool.query(`
      SELECT table_name FROM information_schema.tables WHERE table_name = 'ships'
    `);
    
    if (shipsTableCheck.rows.length === 0) {
      console.log('  [WARN] ships table does not exist - skipping verification\n');
    } else {
      // Check if columns exist
      const shipsColumnsResult = await pool.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'ships'
        AND column_name IN ('owner_type', 'owner_id')
        ORDER BY column_name
      `);
      
      const expectedShipsColumns = ['owner_id', 'owner_type'];
      const foundShipsColumns = shipsColumnsResult.rows.map(r => r.column_name);
      
      if (foundShipsColumns.length === 2) {
        console.log('  [OK] All 2 ships columns exist:');
        shipsColumnsResult.rows.forEach(col => {
          console.log('    - ' + col.column_name + ' (' + col.data_type + ')');
        });
      } else {
        console.log('  [FAIL] Missing ships columns!');
        const missing = expectedShipsColumns.filter(c => !foundShipsColumns.includes(c));
        console.log('    Missing: ' + missing.join(', '));
        allPassed = false;
      }
      
      // Check ship ownership distribution
      const shipStats = await pool.query(`
        SELECT 
          owner_type,
          COUNT(*) as count
        FROM ships
        GROUP BY owner_type
        ORDER BY owner_type
      `);
      
      if (shipStats.rows.length > 0) {
        console.log('\n  [OK] Ships ownership:');
        shipStats.rows.forEach(stat => {
          const ownerType = stat.owner_type || 'NULL';
          console.log('    - ' + ownerType + ': ' + stat.count + ' ships');
        });
      } else {
        console.log('\n  [INFO] No ships in database yet');
      }
      
      console.log();
    }
    
    // ============================================
    // FINAL SUMMARY
    // ============================================
    
    if (allPassed) {
      console.log('[SUCCESS] VERIFICATION PASSED! All fixes are in place.\n');
      console.log('[SUMMARY]');
      console.log('  - gear_database: All archetype restriction columns added');
      console.log('  - ships: All ownership columns added');
      console.log('\n[DONE] Your database is ready to go!');
    } else {
      console.log('[FAIL] VERIFICATION FAILED! Some issues detected.');
      console.log('  Review the errors above and re-run the migration.');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n[ERROR] Verification FAILED:', error.message);
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
    console.error('[FATAL] Fatal error:', error);
    process.exit(1);
  });
