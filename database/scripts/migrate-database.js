#!/usr/bin/env node
/**
 * Database Migration Script
 * 
 * Runs all migrations in order to bring database up to date
 * Tracks which migrations have been run
 * 
 * Usage:
 *   node migrate-database.js                  # Run all pending migrations
 *   node migrate-database.js --dry-run        # Show what would be done
 *   node migrate-database.js --force          # Re-run all migrations
 *   node migrate-database.js --migration 001  # Run specific migration
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'darkspace',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD
});

// Colors for terminal output
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

// Create migrations tracking table
async function createMigrationsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id SERIAL PRIMARY KEY,
      migration_name VARCHAR(255) UNIQUE NOT NULL,
      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

// Get list of completed migrations
async function getCompletedMigrations() {
  try {
    const result = await pool.query(
      'SELECT migration_name FROM schema_migrations ORDER BY migration_name'
    );
    return result.rows.map(row => row.migration_name);
  } catch (error) {
    return [];
  }
}

// Mark migration as completed
async function markMigrationComplete(migrationName) {
  await pool.query(
    'INSERT INTO schema_migrations (migration_name) VALUES ($1) ON CONFLICT DO NOTHING',
    [migrationName]
  );
}

// Get all migration files
function getMigrationFiles() {
  const migrationsDir = path.join(__dirname, '..', 'migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  return files.map(file => ({
    name: file,
    path: path.join(migrationsDir, file),
    content: fs.readFileSync(path.join(migrationsDir, file), 'utf8')
  }));
}

// Run a migration
async function runMigration(migration, dryRun = false) {
  log(`\nRunning: ${migration.name}`, 'cyan');

  if (dryRun) {
    log('  [DRY RUN] Would execute SQL', 'yellow');
    return true;
  }

  try {
    // Execute the SQL
    await pool.query(migration.content);
    
    // Mark as complete
    await markMigrationComplete(migration.name);
    
    log(`  ✓ Success`, 'green');
    return true;
  } catch (error) {
    log(`  ✗ Failed: ${error.message}`, 'red');
    
    // Show relevant error details
    if (error.position) {
      const lines = migration.content.split('\n');
      const errorLine = parseInt(error.position) / migration.content.length * lines.length;
      log(`  Near line ${Math.floor(errorLine)}`, 'red');
    }
    
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const force = args.includes('--force');
  const specificMigration = args.find(arg => arg.startsWith('--migration='));
  const migrationFilter = specificMigration ? specificMigration.split('=')[1] : null;

  log('\n' + '='.repeat(70), 'cyan');
  log('  DARKSPACE DATABASE MIGRATION', 'cyan');
  log('='.repeat(70) + '\n', 'cyan');

  log(`Database: ${process.env.DB_NAME || 'darkspace'}@${process.env.DB_HOST || 'localhost'}`, 'blue');
  
  if (dryRun) {
    log('Mode: DRY RUN (no changes will be made)', 'yellow');
  }
  if (force) {
    log('Mode: FORCE (will re-run all migrations)', 'yellow');
  }
  if (migrationFilter) {
    log(`Filter: Only running migrations matching "${migrationFilter}"`, 'yellow');
  }
  
  log('');

  // Create migrations tracking table
  await createMigrationsTable();

  // Get completed migrations
  const completed = force ? [] : await getCompletedMigrations();
  
  if (completed.length > 0 && !force) {
    log(`Already completed: ${completed.length} migrations`, 'green');
  }

  // Get all migration files
  const migrations = getMigrationFiles();
  
  // Filter migrations
  let toRun = migrations.filter(m => !completed.includes(m.name));
  
  if (migrationFilter) {
    toRun = toRun.filter(m => m.name.includes(migrationFilter));
  }

  if (toRun.length === 0) {
    log('No pending migrations to run.', 'green');
    await pool.end();
    return;
  }

  log(`Found ${toRun.length} migration(s) to run:\n`, 'cyan');
  toRun.forEach(m => log(`  • ${m.name}`, 'blue'));
  log('');

  // Run migrations
  let successCount = 0;
  let failCount = 0;

  for (const migration of toRun) {
    const success = await runMigration(migration, dryRun);
    if (success) {
      successCount++;
    } else {
      failCount++;
      // Stop on first failure
      log('\nStopping due to migration failure.', 'red');
      log('Fix the error and run again.', 'yellow');
      break;
    }
  }

  // Summary
  log('\n' + '='.repeat(70), 'cyan');
  log('SUMMARY', 'cyan');
  log('='.repeat(70) + '\n', 'cyan');

  if (dryRun) {
    log(`Would run ${toRun.length} migrations`, 'yellow');
  } else {
    log(`Successful: ${successCount}`, 'green');
    if (failCount > 0) {
      log(`Failed: ${failCount}`, 'red');
    }
  }

  log('');

  await pool.end();

  if (failCount > 0) {
    process.exit(1);
  }
}

main().catch(error => {
  log(`\nFatal error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
