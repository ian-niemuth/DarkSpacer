#!/usr/bin/env node
/**
 * Database Comparison Script
 * 
 * Compares local database with production database
 * Shows differences in structure and data counts
 * 
 * Usage:
 *   node compare-databases.js
 * 
 * Configuration:
 *   Set up .env.production with production database credentials
 *   Local database uses .env credentials
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Load production env if exists
const prodEnvPath = path.join(__dirname, '..', '..', 'backend', '.env.production');
let prodEnv = {};
if (fs.existsSync(prodEnvPath)) {
  const content = fs.readFileSync(prodEnvPath, 'utf8');
  content.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      prodEnv[match[1].trim()] = match[2].trim();
    }
  });
}

// Local database
const localPool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'darkspace',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD
});

// Production database
const prodPool = new Pool({
  host: prodEnv.DB_HOST || process.env.PROD_DB_HOST,
  port: prodEnv.DB_PORT || process.env.PROD_DB_PORT || 5432,
  database: prodEnv.DB_NAME || process.env.PROD_DB_NAME,
  user: prodEnv.DB_USER || process.env.PROD_DB_USER,
  password: prodEnv.DB_PASSWORD || process.env.PROD_DB_PASSWORD
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

// Get all tables and their columns
async function getDatabaseStructure(pool) {
  const tablesResult = await pool.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `);

  const structure = {};

  for (const table of tablesResult.rows) {
    const tableName = table.table_name;
    
    const columnsResult = await pool.query(`
      SELECT 
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = $1
      ORDER BY ordinal_position
    `, [tableName]);

    structure[tableName] = columnsResult.rows;
  }

  return structure;
}

// Get row counts for all tables
async function getTableCounts(pool, tables) {
  const counts = {};

  for (const table of tables) {
    try {
      const result = await pool.query(`SELECT COUNT(*) FROM ${table}`);
      counts[table] = parseInt(result.rows[0].count);
    } catch (error) {
      counts[table] = -1; // Error
    }
  }

  return counts;
}

function compareStructures(local, prod) {
  const localTables = Object.keys(local).sort();
  const prodTables = Object.keys(prod).sort();

  const missingInProd = localTables.filter(t => !prodTables.includes(t));
  const missingInLocal = prodTables.filter(t => !localTables.includes(t));
  const common = localTables.filter(t => prodTables.includes(t));

  const columnDiffs = {};

  for (const table of common) {
    const localCols = local[table].map(c => c.column_name);
    const prodCols = prod[table].map(c => c.column_name);

    const missingInProdCols = localCols.filter(c => !prodCols.includes(c));
    const missingInLocalCols = prodCols.filter(c => !localCols.includes(c));

    if (missingInProdCols.length > 0 || missingInLocalCols.length > 0) {
      columnDiffs[table] = {
        missingInProd: missingInProdCols,
        missingInLocal: missingInLocalCols
      };
    }
  }

  return {
    missingInProd,
    missingInLocal,
    columnDiffs
  };
}

async function main() {
  log('\n' + '='.repeat(70), 'cyan');
  log('  DATABASE COMPARISON: LOCAL vs PRODUCTION', 'cyan');
  log('='.repeat(70) + '\n', 'cyan');

  log(`Local:      ${process.env.DB_NAME}@${process.env.DB_HOST}`, 'blue');
  log(`Production: ${prodEnv.DB_NAME || 'NOT CONFIGURED'}@${prodEnv.DB_HOST || 'NOT CONFIGURED'}`, 'blue');
  log('');

  if (!prodEnv.DB_HOST) {
    log('ERROR: Production database not configured!', 'red');
    log('Create backend/.env.production with production database credentials', 'yellow');
    log('');
    await localPool.end();
    await prodPool.end();
    process.exit(1);
  }

  // Test connections
  try {
    await localPool.query('SELECT 1');
    log('✓ Local database connected', 'green');
  } catch (error) {
    log(`✗ Local database connection failed: ${error.message}`, 'red');
    process.exit(1);
  }

  try {
    await prodPool.query('SELECT 1');
    log('✓ Production database connected', 'green');
  } catch (error) {
    log(`✗ Production database connection failed: ${error.message}`, 'red');
    await localPool.end();
    process.exit(1);
  }

  log('');

  // Get structures
  log('Analyzing database structures...', 'cyan');
  const localStructure = await getDatabaseStructure(localPool);
  const prodStructure = await getDatabaseStructure(prodPool);

  // Compare
  const diff = compareStructures(localStructure, prodStructure);

  // Display differences
  log('\n' + '-'.repeat(70), 'cyan');
  log('STRUCTURAL DIFFERENCES', 'cyan');
  log('-'.repeat(70) + '\n', 'cyan');

  if (diff.missingInProd.length > 0) {
    log('Tables missing in PRODUCTION:', 'red');
    diff.missingInProd.forEach(t => log(`  • ${t}`, 'red'));
    log('');
  }

  if (diff.missingInLocal.length > 0) {
    log('Tables missing in LOCAL:', 'yellow');
    diff.missingInLocal.forEach(t => log(`  • ${t}`, 'yellow'));
    log('');
  }

  if (Object.keys(diff.columnDiffs).length > 0) {
    log('Column differences:', 'yellow');
    for (const [table, cols] of Object.entries(diff.columnDiffs)) {
      log(`\n  ${table}:`, 'cyan');
      if (cols.missingInProd.length > 0) {
        log(`    Missing in PROD: ${cols.missingInProd.join(', ')}`, 'red');
      }
      if (cols.missingInLocal.length > 0) {
        log(`    Missing in LOCAL: ${cols.missingInLocal.join(', ')}`, 'yellow');
      }
    }
    log('');
  }

  if (diff.missingInProd.length === 0 && 
      diff.missingInLocal.length === 0 && 
      Object.keys(diff.columnDiffs).length === 0) {
    log('✓ Structures match!', 'green');
    log('');
  }

  // Compare row counts
  log('-'.repeat(70), 'cyan');
  log('DATA COUNTS', 'cyan');
  log('-'.repeat(70) + '\n', 'cyan');

  const commonTables = Object.keys(localStructure)
    .filter(t => Object.keys(prodStructure).includes(t))
    .sort();

  const localCounts = await getTableCounts(localPool, commonTables);
  const prodCounts = await getTableCounts(prodPool, commonTables);

  for (const table of commonTables) {
    const local = localCounts[table];
    const prod = prodCounts[table];
    const diff = local - prod;

    let color = 'green';
    let symbol = '=';
    
    if (diff > 0) {
      color = 'yellow';
      symbol = '>';
    } else if (diff < 0) {
      color = 'red';
      symbol = '<';
    }

    log(`  ${table.padEnd(30)} Local: ${String(local).padStart(6)} ${symbol} Prod: ${String(prod).padStart(6)} (${diff >= 0 ? '+' : ''}${diff})`, color);
  }

  // Summary
  log('\n' + '='.repeat(70), 'cyan');
  log('SUMMARY', 'cyan');
  log('='.repeat(70) + '\n', 'cyan');

  const issueCount = diff.missingInProd.length + Object.keys(diff.columnDiffs).length;

  if (issueCount > 0) {
    log(`Found ${issueCount} structural difference(s)`, 'red');
    log('\nRecommendation:', 'cyan');
    log('  1. Backup production database', 'yellow');
    log('  2. Run: node migrate-database.js  (in production environment)', 'cyan');
  } else {
    log('✓ Databases match structurally', 'green');
    log('\nData differences may still exist - review counts above', 'yellow');
  }

  log('');

  await localPool.end();
  await prodPool.end();
}

main().catch(error => {
  log(`\nFatal error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
