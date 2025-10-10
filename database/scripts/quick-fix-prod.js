#!/usr/bin/env node
/**
 * Production Quick Fix Script
 * 
 * Diagnoses and fixes common production deployment issues
 * Specifically targets:
 * - Missing gear_database columns and data
 * - Missing ship-related tables
 * - Missing inventory columns
 * 
 * Usage:
 *   node quick-fix-prod.js                # Show what needs fixing
 *   node quick-fix-prod.js --fix          # Actually fix issues
 *   node quick-fix-prod.js --test-only    # Test without changes
 */

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'darkspace',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD
});

// Colors
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Check if a column exists
async function columnExists(table, column) {
  const result = await pool.query(`
    SELECT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_name = $1 AND column_name = $2
    )
  `, [table, column]);
  return result.rows[0].exists;
}

// Check if a table exists
async function tableExists(table) {
  const result = await pool.query(`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_name = $1
    )
  `, [table]);
  return result.rows[0].exists;
}

// Get row count
async function getRowCount(table) {
  try {
    const result = await pool.query(`SELECT COUNT(*) FROM ${table}`);
    return parseInt(result.rows[0].count);
  } catch (error) {
    return -1;
  }
}

// Test database connection and basic operations
async function runTests() {
  const tests = {
    connection: { status: 'pending', message: '' },
    fetchWeapons: { status: 'pending', message: '' },
    createCustomItem: { status: 'pending', message: '' },
    createShip: { status: 'pending', message: '' }
  };

  // Test 1: Connection
  try {
    await pool.query('SELECT 1');
    tests.connection = { status: 'pass', message: 'Database connection OK' };
  } catch (error) {
    tests.connection = { status: 'fail', message: error.message };
    return tests; // Can't continue without connection
  }

  // Test 2: Fetch weapons
  try {
    const result = await pool.query('SELECT * FROM gear_database WHERE category = $1', ['weapon']);
    if (result.rows.length > 0) {
      tests.fetchWeapons = { status: 'pass', message: `Found ${result.rows.length} weapons` };
    } else {
      tests.fetchWeapons = { status: 'warn', message: 'No weapons found in database' };
    }
  } catch (error) {
    tests.fetchWeapons = { status: 'fail', message: error.message };
  }

  // Test 3: Create custom item (test if is_custom column exists)
  try {
    const hasColumn = await columnExists('gear_database', 'is_custom');
    if (hasColumn) {
      tests.createCustomItem = { status: 'pass', message: 'is_custom column exists' };
    } else {
      tests.createCustomItem = { status: 'fail', message: 'Missing is_custom column' };
    }
  } catch (error) {
    tests.createCustomItem = { status: 'fail', message: error.message };
  }

  // Test 4: Create ship (test if required columns exist)
  try {
    const hasTable = await tableExists('ships');
    if (!hasTable) {
      tests.createShip = { status: 'fail', message: 'ships table does not exist' };
    } else {
      const hasSystemSlots = await columnExists('ships', 'system_slots_max');
      const hasFeatureSlots = await columnExists('ships', 'feature_slots_max');
      
      if (hasSystemSlots && hasFeatureSlots) {
        tests.createShip = { status: 'pass', message: 'Ship columns OK' };
      } else {
        tests.createShip = { status: 'fail', message: 'Missing ship columns (system_slots_max, feature_slots_max)' };
      }
    }
  } catch (error) {
    tests.createShip = { status: 'fail', message: error.message };
  }

  return tests;
}

// Diagnose issues
async function diagnose() {
  const issues = [];

  // Check gear_database
  const hasGearTable = await tableExists('gear_database');
  if (!hasGearTable) {
    issues.push({
      severity: 'critical',
      area: 'gear_database',
      problem: 'Table does not exist',
      fix: 'Run init.sql'
    });
  } else {
    // Check columns
    const criticalColumns = ['subcategory', 'is_custom', 'allows_dex_modifier', 'base_ac'];
    for (const col of criticalColumns) {
      const exists = await columnExists('gear_database', col);
      if (!exists) {
        issues.push({
          severity: 'critical',
          area: 'gear_database',
          problem: `Missing column: ${col}`,
          fix: 'Run migration 001_populate_gear_database.sql'
        });
      }
    }

    // Check data
    const gearCount = await getRowCount('gear_database');
    if (gearCount === 0) {
      issues.push({
        severity: 'critical',
        area: 'gear_database',
        problem: 'No data in table',
        fix: 'Run migration 001_populate_gear_database.sql'
      });
    }
  }

  // Check inventory
  const hasInventory = await tableExists('inventory');
  if (hasInventory) {
    const hasEquippedSlot = await columnExists('inventory', 'equipped_slot');
    if (!hasEquippedSlot) {
      issues.push({
        severity: 'warning',
        area: 'inventory',
        problem: 'Missing equipped_slot column',
        fix: 'Run migration 003_equipment_system.sql'
      });
    }
  }

  // Check ships
  const hasShips = await tableExists('ships');
  if (!hasShips) {
    issues.push({
      severity: 'critical',
      area: 'ships',
      problem: 'Table does not exist',
      fix: 'Run init.sql'
    });
  } else {
    const shipColumns = ['system_slots_max', 'feature_slots_max', 'owner_type', 'owner_id'];
    for (const col of shipColumns) {
      const exists = await columnExists('ships', col);
      if (!exists) {
        issues.push({
          severity: 'critical',
          area: 'ships',
          problem: `Missing column: ${col}`,
          fix: 'Run migration 001_ships_system.sql'
        });
      }
    }
  }

  // Check ship-related tables
  const shipTables = [
    'component_templates',
    'ship_components',
    'weapon_templates',
    'ship_weapons_arrays',
    'ship_weapons',
    'armor_templates',
    'ship_armor',
    'enhancement_templates',
    'ship_enhancements'
  ];

  for (const table of shipTables) {
    const exists = await tableExists(table);
    if (!exists) {
      issues.push({
        severity: 'critical',
        area: 'ships',
        problem: `Missing table: ${table}`,
        fix: 'Run migration 001_ships_system.sql and subsequent ship migrations'
      });
      break; // Don't spam - they all come from same migration
    }
  }

  // Check ship_inventory
  const hasShipInventory = await tableExists('ship_inventory');
  if (!hasShipInventory) {
    issues.push({
      severity: 'warning',
      area: 'ships',
      problem: 'Missing ship_inventory table',
      fix: 'Run migration 010_add_ship_inventory.sql'
    });
  }

  return issues;
}

async function main() {
  const args = process.argv.slice(2);
  const shouldFix = args.includes('--fix');
  const testOnly = args.includes('--test-only');

  log('\n' + '='.repeat(70), 'cyan');
  log('  DARKSPACE PRODUCTION QUICK FIX', 'cyan');
  log('='.repeat(70) + '\n', 'cyan');

  log(`Database: ${process.env.DB_NAME}@${process.env.DB_HOST}`, 'blue');
  log('');

  if (testOnly) {
    log('Mode: TEST ONLY', 'yellow');
    log('Running functionality tests...\n', 'cyan');

    const tests = await runTests();

    for (const [name, result] of Object.entries(tests)) {
      const symbol = result.status === 'pass' ? '✓' : result.status === 'warn' ? '⚠' : '✗';
      const color = result.status === 'pass' ? 'green' : result.status === 'warn' ? 'yellow' : 'red';
      log(`${symbol} ${name}: ${result.message}`, color);
    }

    log('');
    await pool.end();
    return;
  }

  log('Diagnosing database issues...\n', 'cyan');

  const issues = await diagnose();

  if (issues.length === 0) {
    log('✓ No issues found! Database looks good.', 'green');
    log('');
    
    // Run tests anyway to confirm
    log('Running functionality tests...\n', 'cyan');
    const tests = await runTests();
    
    for (const [name, result] of Object.entries(tests)) {
      const symbol = result.status === 'pass' ? '✓' : result.status === 'warn' ? '⚠' : '✗';
      const color = result.status === 'pass' ? 'green' : result.status === 'warn' ? 'yellow' : 'red';
      log(`${symbol} ${name}: ${result.message}`, color);
    }
    
    await pool.end();
    return;
  }

  // Display issues
  log('-'.repeat(70), 'red');
  log('FOUND ISSUES:', 'red');
  log('-'.repeat(70) + '\n', 'red');

  const critical = issues.filter(i => i.severity === 'critical');
  const warnings = issues.filter(i => i.severity === 'warning');

  if (critical.length > 0) {
    log(`Critical Issues (${critical.length}):`, 'red');
    critical.forEach((issue, idx) => {
      log(`\n${idx + 1}. ${issue.area}: ${issue.problem}`, 'red');
      log(`   Fix: ${issue.fix}`, 'yellow');
    });
    log('');
  }

  if (warnings.length > 0) {
    log(`Warnings (${warnings.length}):`, 'yellow');
    warnings.forEach((issue, idx) => {
      log(`\n${idx + 1}. ${issue.area}: ${issue.problem}`, 'yellow');
      log(`   Fix: ${issue.fix}`, 'cyan');
    });
    log('');
  }

  // Recommendations
  log('-'.repeat(70), 'cyan');
  log('RECOMMENDATIONS:', 'cyan');
  log('-'.repeat(70) + '\n', 'cyan');

  if (shouldFix) {
    log('⚠  --fix flag detected, but this script cannot auto-fix structural issues', 'yellow');
    log('   Structural changes require running migration scripts', 'yellow');
    log('');
  }

  log('To fix these issues:', 'cyan');
  log('  1. Backup your database first!', 'red');
  log('     pg_dump darkspace > backup_$(date +%Y%m%d).sql', 'yellow');
  log('');
  log('  2. Run the migration script:', 'cyan');
  log('     node migrate-database.js', 'yellow');
  log('');
  log('  3. Verify the fix:', 'cyan');
  log('     node quick-fix-prod.js --test-only', 'yellow');
  log('');

  // Group fixes by migration file
  const migrationMap = {};
  issues.forEach(issue => {
    const migration = issue.fix.match(/migration ([0-9]+[a-z_]*\.sql)/)?.[1] || issue.fix;
    if (!migrationMap[migration]) {
      migrationMap[migration] = [];
    }
    migrationMap[migration].push(issue);
  });

  log('Required migrations:', 'cyan');
  Object.keys(migrationMap).forEach(migration => {
    log(`  • ${migration}`, 'yellow');
  });

  log('');

  await pool.end();
}

main().catch(error => {
  log(`\nFatal error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
