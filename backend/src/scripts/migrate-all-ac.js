// Run migration to fix AC for all characters
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function runMigration() {
  try {
    const migrationPath = path.join(__dirname, '../database/migrations/009_fix_all_character_ac.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('Running migration: Fix AC for all characters (including negative DEX)...');
    
    // Show before state
    const beforeResult = await pool.query(`
      SELECT id, name, archetype, level, dexterity, ac,
        FLOOR((dexterity - 10) / 2.0) as dex_mod,
        CASE WHEN archetype = 'Wise' THEN GREATEST(1, FLOOR(level / 2.0)) ELSE 0 END as insightful
      FROM characters 
      ORDER BY archetype, id
    `);
    
    console.log('\n📊 BEFORE Migration:');
    beforeResult.rows.forEach(char => {
      const expectedAC = 10 + char.dex_mod + char.insightful;
      const needsUpdate = char.ac !== expectedAC;
      console.log(`  ${needsUpdate ? '❌' : '✅'} ${char.name} (${char.archetype}, Lv${char.level}): AC ${char.ac} (expected: ${expectedAC} = 10${char.dex_mod >= 0 ? '+' : ''}${char.dex_mod}${char.insightful > 0 ? `+${char.insightful}` : ''})`);
    });
    
    // Run migration
    await pool.query(sql);
    
    // Show after state
    const afterResult = await pool.query(`
      SELECT id, name, archetype, level, dexterity, ac,
        FLOOR((dexterity - 10) / 2.0) as dex_mod,
        CASE WHEN archetype = 'Wise' THEN GREATEST(1, FLOOR(level / 2.0)) ELSE 0 END as insightful
      FROM characters 
      ORDER BY archetype, id
    `);
    
    console.log('\n✅ AFTER Migration:');
    afterResult.rows.forEach(char => {
      const breakdown = [`10 base`];
      if (char.dex_mod !== 0) breakdown.push(`${char.dex_mod >= 0 ? '+' : ''}${char.dex_mod} DEX`);
      if (char.insightful > 0) breakdown.push(`+${char.insightful} Insightful`);
      console.log(`  ✓ ${char.name} (${char.archetype}, Lv${char.level}): AC ${char.ac} (${breakdown.join(', ')})`);
    });
    
    console.log('\n✅ Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Error running migration:', error);
  } finally {
    await pool.end();
  }
}

runMigration();
