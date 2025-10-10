#!/usr/bin/env node
// Run migration script - adds archetype restriction columns to gear_database
const { exec } = require('child_process');
const path = require('path');

const migrationFile = path.join(__dirname, 'migrations', 'add-archetype-restriction-columns.js');

console.log('🚀 Running migration to add archetype restriction columns...\n');

exec(`node "${migrationFile}"`, (error, stdout, stderr) => {
  if (stdout) console.log(stdout);
  if (stderr) console.error(stderr);
  
  if (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } else {
    console.log('\n✅ Migration completed successfully!');
    process.exit(0);
  }
});
