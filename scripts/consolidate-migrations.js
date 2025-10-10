#!/usr/bin/env node
/**
 * DARKSPACE MIGRATION CONSOLIDATION SYSTEM
 * 
 * This script:
 * 1. Creates a migration tracking table
 * 2. Scans all migration files across the project
 * 3. Generates a single, ordered migration runner
 * 4. Tracks what's been applied
 * 5. Can be run multiple times safely (idempotent)
 */

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// ANSI colors for output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  console.log('\n' + '='.repeat(70));
  log(message, 'bright');
  console.log('='.repeat(70) + '\n');
}

// Database configuration
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'darkspace'
};

// Migration file locations
const migrationPaths = {
  sqlMigrations: path.join(__dirname, 'database', 'migrations'),
  jsMigrations: path.join(__dirname, 'backend'),
  featureMigrations: path.join(__dirname, 'backend', 'migrations')
};

/**
 * Create migration tracking table
 */
async function createMigrationTable(client) {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id SERIAL PRIMARY KEY,
      migration_name VARCHAR(255) UNIQUE NOT NULL,
      migration_type VARCHAR(50) NOT NULL,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      checksum VARCHAR(64),
      execution_time_ms INTEGER
    );
    
    CREATE INDEX IF NOT EXISTS idx_migration_name ON schema_migrations(migration_name);
  `;
  
  await client.query(createTableSQL);
  log('✓ Migration tracking table ready', 'green');
}

/**
 * Check if migration has been applied
 */
async function isMigrationApplied(client, migrationName) {
  const result = await client.query(
    'SELECT * FROM schema_migrations WHERE migration_name = $1',
    [migrationName]
  );
  return result.rows.length > 0;
}

/**
 * Mark migration as applied
 */
async function markMigrationApplied(client, migrationName, migrationType, executionTime) {
  await client.query(
    `INSERT INTO schema_migrations (migration_name, migration_type, execution_time_ms) 
     VALUES ($1, $2, $3)
     ON CONFLICT (migration_name) DO NOTHING`,
    [migrationName, migrationType, executionTime]
  );
}

/**
 * Scan directory for migration files
 */
function scanMigrations(directory, extension, type) {
  if (!fs.existsSync(directory)) {
    return [];
  }
  
  return fs.readdirSync(directory)
    .filter(file => file.endsWith(extension))
    .map(file => ({
      name: file,
      path: path.join(directory, file),
      type: type,
      order: extractOrder(file)
    }))
    .sort((a, b) => a.order - b.order);
}

/**
 * Extract order number from filename (e.g., "001_" or "migrate-")
 */
function extractOrder(filename) {
  const match = filename.match(/^(\d+)_/);
  if (match) {
    return parseInt(match[1]);
  }
  
  // For non-numbered files, use hash of filename for consistent ordering
  let hash = 0;
  for (let i = 0; i < filename.length; i++) {
    hash = ((hash << 5) - hash) + filename.charCodeAt(i);
    hash = hash & hash;
  }
  return 1000 + Math.abs(hash % 1000);
}

/**
 * Execute SQL migration
 */
async function executeSQLMigration(client, migration) {
  const sql = fs.readFileSync(migration.path, 'utf8');
  await client.query(sql);
}

/**
 * Execute JavaScript migration
 */
async function executeJSMigration(client, migration) {
  // Temporarily set database config for the migration script
  const originalEnv = { ...process.env };
  process.env.DB_USER = dbConfig.user;
  process.env.DB_PASSWORD = dbConfig.password;
  process.env.DB_HOST = dbConfig.host;
  process.env.DB_PORT = dbConfig.port;
  process.env.DB_NAME = dbConfig.database;
  
  try {
    // Clear require cache to ensure fresh execution
    delete require.cache[require.resolve(migration.path)];
    
    const migrationModule = require(migration.path);
    
    if (typeof migrationModule === 'function') {
      await migrationModule(client);
    } else if (migrationModule.up && typeof migrationModule.up === 'function') {
      await migrationModule.up(client);
    } else {
      // Try to execute it as a standalone script
      const { execSync } = require('child_process');
      execSync(`node "${migration.path}"`, {
        env: process.env,
        stdio: 'inherit'
      });
    }
  } finally {
    // Restore original environment
    process.env = originalEnv;
  }
}

/**
 * Main migration runner
 */
async function runMigrations() {
  logHeader('🚀 DARKSPACE MIGRATION CONSOLIDATION');
  
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    log('✓ Connected to database', 'green');
    log(`  Database: ${dbConfig.database}@${dbConfig.host}`, 'cyan');
    
    // Create migration tracking table
    await createMigrationTable(client);
    
    // Collect all migrations
    logHeader('📁 Scanning for migrations');
    
    const allMigrations = [
      ...scanMigrations(migrationPaths.sqlMigrations, '.sql', 'SQL'),
      ...scanMigrations(migrationPaths.jsMigrations, '.js', 'JS-ROOT').filter(m => m.name.startsWith('migrate-')),
      ...scanMigrations(migrationPaths.featureMigrations, '.js', 'JS-FEATURE')
    ].sort((a, b) => a.order - b.order);
    
    log(`Found ${allMigrations.length} migration files:`, 'cyan');
    allMigrations.forEach((m, i) => {
      log(`  ${i + 1}. [${m.type}] ${m.name} (order: ${m.order})`, 'blue');
    });
    
    // Check and run migrations
    logHeader('⚙️  Processing migrations');
    
    let applied = 0;
    let skipped = 0;
    let failed = 0;
    
    for (const migration of allMigrations) {
      const migrationName = migration.name;
      
      // Check if already applied
      if (await isMigrationApplied(client, migrationName)) {
        log(`⊘ SKIP: ${migrationName} (already applied)`, 'yellow');
        skipped++;
        continue;
      }
      
      // Run migration
      const startTime = Date.now();
      try {
        log(`▶ RUNNING: ${migrationName}`, 'cyan');
        
        if (migration.type === 'SQL') {
          await executeSQLMigration(client, migration);
        } else {
          await executeJSMigration(client, migration);
        }
        
        const executionTime = Date.now() - startTime;
        await markMigrationApplied(client, migrationName, migration.type, executionTime);
        
        log(`✓ SUCCESS: ${migrationName} (${executionTime}ms)`, 'green');
        applied++;
        
      } catch (error) {
        const executionTime = Date.now() - startTime;
        log(`✗ FAILED: ${migrationName} (${executionTime}ms)`, 'red');
        log(`  Error: ${error.message}`, 'red');
        failed++;
        
        // Ask user if they want to continue
        if (process.stdin.isTTY) {
          const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
          });
          
          const answer = await new Promise(resolve => {
            readline.question('\nContinue with remaining migrations? (y/n): ', resolve);
          });
          readline.close();
          
          if (answer.toLowerCase() !== 'y') {
            log('\nStopping migration process', 'yellow');
            break;
          }
        }
      }
    }
    
    // Summary
    logHeader('📊 MIGRATION SUMMARY');
    log(`✓ Applied: ${applied}`, 'green');
    log(`⊘ Skipped: ${skipped}`, 'yellow');
    if (failed > 0) {
      log(`✗ Failed: ${failed}`, 'red');
    }
    log(`Total: ${allMigrations.length}`, 'cyan');
    
  } catch (error) {
    log('\n✗ FATAL ERROR:', 'red');
    log(error.stack, 'red');
    process.exit(1);
  } finally {
    await client.end();
  }
}

/**
 * Generate migration status report
 */
async function generateReport() {
  logHeader('📋 MIGRATION STATUS REPORT');
  
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    
    const result = await client.query(`
      SELECT 
        migration_name,
        migration_type,
        applied_at,
        execution_time_ms
      FROM schema_migrations
      ORDER BY applied_at DESC
    `);
    
    if (result.rows.length === 0) {
      log('No migrations have been applied yet', 'yellow');
    } else {
      log(`Total migrations applied: ${result.rows.length}\n`, 'cyan');
      
      result.rows.forEach((row, i) => {
        log(`${i + 1}. ${row.migration_name}`, 'bright');
        log(`   Type: ${row.migration_type}`, 'blue');
        log(`   Applied: ${row.applied_at.toISOString()}`, 'cyan');
        log(`   Duration: ${row.execution_time_ms}ms`, 'green');
        console.log();
      });
    }
    
  } catch (error) {
    log('Error generating report:', 'red');
    log(error.message, 'red');
  } finally {
    await client.end();
  }
}

// CLI handling
const command = process.argv[2] || 'run';

if (command === 'run') {
  runMigrations().catch(console.error);
} else if (command === 'report' || command === 'status') {
  generateReport().catch(console.error);
} else {
  console.log(`
Usage: node consolidate-migrations.js [command]

Commands:
  run       Run all pending migrations (default)
  report    Show migration status report
  status    Alias for report

Environment variables:
  DB_USER      Database user (default: postgres)
  DB_PASSWORD  Database password (default: postgres)
  DB_HOST      Database host (default: localhost)
  DB_PORT      Database port (default: 5432)
  DB_NAME      Database name (default: darkspace)
  `);
}
