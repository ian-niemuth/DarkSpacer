#!/usr/bin/env node
/**
 * Database Structure Verification Script
 * 
 * Checks if production database has all required tables and columns
 * Compares against expected schema and reports differences
 * 
 * Usage:
 *   node verify-database.js
 *   node verify-database.js --detailed  # Shows all columns, not just missing
 */

const { Pool } = require('pg');
require('dotenv').config();

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'darkspace',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD
});

// Expected database schema
const EXPECTED_SCHEMA = {
  users: [
    'id', 'username', 'password_hash', 'email', 'is_admin', 'created_at'
  ],
  characters: [
    'id', 'user_id', 'name', 'strength', 'dexterity', 'constitution', 
    'intelligence', 'wisdom', 'charisma', 'species', 'archetype', 'background',
    'motivation', 'ship_role', 'hp_current', 'hp_max', 'ac', 'level', 'xp',
    'reputation', 'bounty', 'luck', 'credits', 'notes', 'created_at', 'updated_at'
  ],
  ships: [
    'id', 'name', 'ship_class', 'owner_type', 'owner_id',
    'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma',
    'hp_current', 'hp_max', 'ac', 'level', 'movement',
    'system_slots_used', 'system_slots_max', 'feature_slots_used', 'feature_slots_max',
    'cargo_capacity', 'purchase_price', 'is_active', 'description', 'notes',
    'created_at', 'updated_at'
  ],
  ship_crew_assignments: [
    'id', 'ship_id', 'character_id', 'crew_role', 'joined_at'
  ],
  inventory: [
    'id', 'character_id', 'item_name', 'item_type', 'quantity', 'description',
    'weight', 'damage', 'range', 'properties', 'equipped', 'equipped_slot', 'created_at'
  ],
  ship_inventory: [
    'id', 'ship_id', 'item_name', 'item_type', 'quantity', 'description',
    'weight', 'damage', 'range', 'properties', 'created_at'
  ],
  gear_database: [
    'id', 'name', 'category', 'subcategory', 'cost', 'weight', 'description',
    'damage', 'range', 'properties', 'ac_bonus', 'is_custom', 
    'allows_dex_modifier', 'base_ac', 'created_at'
  ],
  space_sectors: [
    'id', 'name', 'x_coordinate', 'y_coordinate', 'sector_type', 
    'danger_level', 'discovered', 'description', 'created_at'
  ],
  activity_log: [
    'id', 'character_id', 'action_type', 'description', 'amount',
    'admin_user_id', 'created_at'
  ],
  component_templates: [
    'id', 'name', 'component_type', 'description', 'cost', 'slots_required',
    'can_be_advanced', 'maintenance_cost', 'benefit', 'created_at'
  ],
  ship_components: [
    'id', 'ship_id', 'component_template_id', 'is_advanced',
    'maintenance_enabled', 'maintenance_paid', 'installed_at'
  ],
  weapon_templates: [
    'id', 'name', 'damage', 'range', 'properties', 'cost', 
    'requires_ammo', 'description', 'created_at'
  ],
  ship_weapons_arrays: [
    'id', 'ship_id', 'array_name', 'max_weapons', 'base_maintenance_cost',
    'maintenance_enabled', 'maintenance_paid', 'created_at'
  ],
  ship_weapons: [
    'id', 'weapons_array_id', 'weapon_template_id', 'array_position',
    'requires_ammo', 'ammo_loaded', 'is_damaged', 'installed_at'
  ],
  armor_templates: [
    'id', 'name', 'category', 'ac_formula', 'ac_bonus', 'cost',
    'uses_system_slot', 'properties', 'dex_modifier_effect', 
    'description', 'created_at'
  ],
  ship_armor: [
    'id', 'ship_id', 'armor_template_id', 'installed_at'
  ],
  enhancement_templates: [
    'id', 'name', 'enhancement_type', 'slots_required', 'cost',
    'benefit', 'description', 'created_at'
  ],
  ship_enhancements: [
    'id', 'ship_id', 'enhancement_template_id', 'installed_at'
  ]
};

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function checkTable(tableName, expectedColumns) {
  try {
    // Check if table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = $1
      )
    `, [tableName]);

    if (!tableCheck.rows[0].exists) {
      return { exists: false, missing: expectedColumns };
    }

    // Get actual columns
    const columnsResult = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = $1
      ORDER BY ordinal_position
    `, [tableName]);

    const actualColumns = columnsResult.rows.map(row => row.column_name);
    const missingColumns = expectedColumns.filter(col => !actualColumns.includes(col));
    const extraColumns = actualColumns.filter(col => !expectedColumns.includes(col));

    return {
      exists: true,
      actualColumns,
      missingColumns,
      extraColumns
    };
  } catch (error) {
    log(`Error checking table ${tableName}: ${error.message}`, 'red');
    return { exists: false, error: error.message };
  }
}

async function checkDataPopulation() {
  const results = {};

  try {
    // Check gear_database population
    const gearCount = await pool.query('SELECT COUNT(*) FROM gear_database');
    const customItemsCount = await pool.query('SELECT COUNT(*) FROM gear_database WHERE is_custom = true');
    results.gear_database = {
      total: parseInt(gearCount.rows[0].count),
      custom: parseInt(customItemsCount.rows[0].count),
      official: parseInt(gearCount.rows[0].count) - parseInt(customItemsCount.rows[0].count)
    };

    // Check component_templates
    const componentsCount = await pool.query('SELECT COUNT(*) FROM component_templates');
    results.component_templates = parseInt(componentsCount.rows[0].count);

    // Check weapon_templates
    const weaponsCount = await pool.query('SELECT COUNT(*) FROM weapon_templates');
    results.weapon_templates = parseInt(weaponsCount.rows[0].count);

    // Check armor_templates
    const armorCount = await pool.query('SELECT COUNT(*) FROM armor_templates');
    results.armor_templates = parseInt(armorCount.rows[0].count);

    // Check enhancement_templates
    const enhancementsCount = await pool.query('SELECT COUNT(*) FROM enhancement_templates');
    results.enhancement_templates = parseInt(enhancementsCount.rows[0].count);

  } catch (error) {
    // Tables might not exist yet
    results.error = error.message;
  }

  return results;
}

async function main() {
  const detailedMode = process.argv.includes('--detailed');

  log('\n' + '='.repeat(70), 'cyan');
  log('  DARKSPACE DATABASE VERIFICATION', 'cyan');
  log('='.repeat(70) + '\n', 'cyan');

  log(`Database: ${process.env.DB_NAME || 'darkspace'}@${process.env.DB_HOST || 'localhost'}`, 'blue');
  log('');

  // Check all tables
  const issues = [];
  const warnings = [];

  for (const [tableName, expectedColumns] of Object.entries(EXPECTED_SCHEMA)) {
    const result = await checkTable(tableName, expectedColumns);

    if (!result.exists) {
      log(`✗ ${tableName}`, 'red');
      log(`  Table does not exist`, 'red');
      issues.push(`Missing table: ${tableName}`);
    } else if (result.missingColumns.length > 0) {
      log(`⚠ ${tableName}`, 'yellow');
      log(`  Missing columns: ${result.missingColumns.join(', ')}`, 'yellow');
      issues.push(`${tableName}: missing ${result.missingColumns.length} columns`);
    } else {
      log(`✓ ${tableName}`, 'green');
    }

    if (result.exists && detailedMode) {
      log(`  Columns: ${result.actualColumns.join(', ')}`, 'blue');
    }

    if (result.extraColumns && result.extraColumns.length > 0 && detailedMode) {
      log(`  Extra columns: ${result.extraColumns.join(', ')}`, 'magenta');
      warnings.push(`${tableName}: ${result.extraColumns.length} extra columns`);
    }

    if (result.error) {
      log(`  Error: ${result.error}`, 'red');
    }
  }

  // Check data population
  log('\n' + '-'.repeat(70), 'cyan');
  log('DATA POPULATION CHECK', 'cyan');
  log('-'.repeat(70) + '\n', 'cyan');

  const dataResults = await checkDataPopulation();

  if (dataResults.error) {
    log(`⚠ Could not check data: ${dataResults.error}`, 'yellow');
  } else {
    log(`gear_database: ${dataResults.gear_database.total} items (${dataResults.gear_database.official} official, ${dataResults.gear_database.custom} custom)`, 
        dataResults.gear_database.total > 0 ? 'green' : 'yellow');
    log(`component_templates: ${dataResults.component_templates} items`, 
        dataResults.component_templates > 0 ? 'green' : 'yellow');
    log(`weapon_templates: ${dataResults.weapon_templates} items`, 
        dataResults.weapon_templates > 0 ? 'green' : 'yellow');
    log(`armor_templates: ${dataResults.armor_templates} items`, 
        dataResults.armor_templates > 0 ? 'green' : 'yellow');
    log(`enhancement_templates: ${dataResults.enhancement_templates} items`, 
        dataResults.enhancement_templates > 0 ? 'green' : 'yellow');

    if (dataResults.gear_database.total === 0) {
      issues.push('gear_database is empty - run migration 001');
    }
    if (dataResults.component_templates === 0) {
      issues.push('component_templates is empty - run ship system migrations');
    }
  }

  // Summary
  log('\n' + '='.repeat(70), 'cyan');
  log('SUMMARY', 'cyan');
  log('='.repeat(70) + '\n', 'cyan');

  if (issues.length === 0 && warnings.length === 0) {
    log('✓ All checks passed! Database is properly configured.', 'green');
  } else {
    if (issues.length > 0) {
      log(`Found ${issues.length} issue(s):`, 'red');
      issues.forEach(issue => log(`  • ${issue}`, 'red'));
    }

    if (warnings.length > 0) {
      log(`\n${warnings.length} warning(s):`, 'yellow');
      warnings.forEach(warning => log(`  • ${warning}`, 'yellow'));
    }

    log('\nRecommendation:', 'cyan');
    log('  Run: node migrate-database.js', 'cyan');
  }

  log('');

  await pool.end();
}

main().catch(error => {
  log(`\nFatal error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
