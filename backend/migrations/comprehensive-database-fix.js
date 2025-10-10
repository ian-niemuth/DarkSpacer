// COMPREHENSIVE DATABASE FIX - Adds all missing columns
// This migration fixes multiple tables with missing columns that cause 500 errors

const path = require('path');
const fs = require('fs');

// Try multiple possible .env locations
const possiblePaths = [
  path.join(__dirname, '.env'),           // Same directory as script
  path.join(__dirname, '..', '.env'),     // Backend directory
  path.join(__dirname, '..', '..', '.env') // Parent of backend
];

let envPath = null;
for (const tryPath of possiblePaths) {
  console.log('Checking:', tryPath);
  if (fs.existsSync(tryPath)) {
    envPath = tryPath;
    console.log('Found .env at:', envPath);
    break;
  }
}

if (!envPath) {
  console.error('[ERROR] Cannot find .env file!');
  console.error('Tried the following locations:');
  possiblePaths.forEach(p => console.error('  -', p));
  process.exit(1);
}

require('dotenv').config({ path: envPath });

const { Pool } = require('pg');

console.log('\nEnvironment check:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'MISSING');
console.log('DB_NAME:', process.env.DB_NAME);

if (!process.env.DB_PASSWORD) {
  console.error('\n[ERROR] DB_PASSWORD is not set in .env file!');
  process.exit(1);
}

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'darkspace_campaign',
});

async function migrate() {
  const client = await pool.connect();
  
  try {
    console.log('\n[MIGRATION] Starting comprehensive database migration...\n');
    
    await client.query('BEGIN');
    
    // ============================================
    // PART 1: Fix gear_database table
    // ============================================
    
    console.log('[PART 1] Fixing gear_database table...\n');
    
    const gearColumns = [
      {
        name: 'weapon_type',
        definition: 'VARCHAR(20)',
        description: 'Weapon type: melee or ranged'
      },
      {
        name: 'weapon_weight_class',
        definition: 'VARCHAR(20)',
        description: 'Weapon weight class: light, null (standard), or heavy'
      },
      {
        name: 'armor_type',
        definition: 'VARCHAR(20)',
        description: 'Armor type: light, medium, heavy, energy, helmet, or shield'
      },
      {
        name: 'hands_required',
        definition: 'INTEGER DEFAULT 1',
        description: 'Number of hands required to use item (1 or 2)'
      },
      {
        name: 'allows_dex_modifier',
        definition: 'BOOLEAN DEFAULT true',
        description: 'Whether armor allows DEX modifier to AC'
      },
      {
        name: 'ac_bonus',
        definition: 'INTEGER',
        description: 'AC bonus provided by armor/helmet/shield'
      }
    ];
    
    // Check if gear_database table exists
    const gearTableCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'gear_database'
    `);
    
    if (gearTableCheck.rows.length > 0) {
      console.log('  [OK] gear_database table exists');
      
      // Add each column if it doesn't exist
      for (const column of gearColumns) {
        const checkColumn = await client.query(`
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_name = 'gear_database' 
          AND column_name = $1
        `, [column.name]);
        
        if (checkColumn.rows.length === 0) {
          console.log('  [ADD] Adding ' + column.name + ' column (' + column.description + ')...');
          
          await client.query(`
            ALTER TABLE gear_database 
            ADD COLUMN ${column.name} ${column.definition}
          `);
          
          console.log('  [OK] Column ' + column.name + ' added');
        } else {
          console.log('  [SKIP] Column ' + column.name + ' already exists');
        }
      }
      
      // Update existing items with appropriate values
      console.log('\n  [UPDATE] Updating existing gear with default values...');
      
      // Set default values for weapons
      await client.query(`
        UPDATE gear_database 
        SET 
          weapon_type = CASE 
            WHEN subcategory ILIKE '%pistol%' OR subcategory ILIKE '%blaster%' OR subcategory ILIKE '%rifle%' THEN 'ranged'
            WHEN subcategory ILIKE '%sword%' OR subcategory ILIKE '%blade%' OR subcategory ILIKE '%staff%' OR subcategory ILIKE '%hammer%' THEN 'melee'
            ELSE weapon_type
          END,
          weapon_weight_class = CASE 
            WHEN subcategory ILIKE '%light%' OR name ILIKE '%light%' THEN 'light'
            WHEN subcategory ILIKE '%heavy%' OR name ILIKE '%heavy%' THEN 'heavy'
            ELSE NULL
          END,
          hands_required = CASE
            WHEN properties ILIKE '%2H%' OR properties ILIKE '%two%hand%' THEN 2
            ELSE 1
          END
        WHERE category = 'weapon' 
        AND (weapon_type IS NULL OR weapon_weight_class IS NULL)
      `);
      
      // Set default values for armor
      await client.query(`
        UPDATE gear_database 
        SET 
          armor_type = CASE 
            WHEN subcategory ILIKE '%light%' OR name ILIKE '%light%' THEN 'light'
            WHEN subcategory ILIKE '%medium%' THEN 'medium'
            WHEN subcategory ILIKE '%heavy%' THEN 'heavy'
            WHEN subcategory ILIKE '%energy%' THEN 'energy'
            WHEN subcategory ILIKE '%helmet%' OR name ILIKE '%helmet%' THEN 'helmet'
            WHEN subcategory ILIKE '%shield%' OR name ILIKE '%shield%' THEN 'shield'
            ELSE 'light'
          END,
          allows_dex_modifier = CASE 
            WHEN subcategory ILIKE '%heavy%' OR subcategory ILIKE '%energy%' THEN false
            ELSE true
          END,
          ac_bonus = CASE 
            WHEN subcategory ILIKE '%helmet%' OR name ILIKE '%helmet%' THEN 1
            WHEN subcategory ILIKE '%shield%' OR name ILIKE '%shield%' THEN 2
            WHEN subcategory ILIKE '%light%' OR name ILIKE '%light%' THEN 11
            WHEN subcategory ILIKE '%medium%' THEN 13
            WHEN subcategory ILIKE '%heavy%' OR subcategory ILIKE '%energy%' THEN 15
            ELSE 11
          END
        WHERE category = 'armor' 
        AND (armor_type IS NULL OR ac_bonus IS NULL)
      `);
      
      console.log('  [OK] Existing gear updated\n');
    } else {
      console.log('  [WARN] gear_database table does not exist - skipping gear fixes\n');
    }
    
    // ============================================
    // PART 2: Fix ships table
    // ============================================
    
    console.log('[PART 2] Fixing ships table...\n');
    
    const shipColumns = [
      {
        name: 'owner_type',
        definition: "VARCHAR(20) DEFAULT 'party'",
        description: 'Owner type: character or party'
      },
      {
        name: 'owner_id',
        definition: 'INTEGER',
        description: 'Character ID if owned by character (FK to characters table)'
      }
    ];
    
    // Check if ships table exists
    const shipsTableCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'ships'
    `);
    
    if (shipsTableCheck.rows.length > 0) {
      console.log('  [OK] ships table exists');
      
      // Add each column if it doesn't exist
      for (const column of shipColumns) {
        const checkColumn = await client.query(`
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_name = 'ships' 
          AND column_name = $1
        `, [column.name]);
        
        if (checkColumn.rows.length === 0) {
          console.log('  [ADD] Adding ' + column.name + ' column (' + column.description + ')...');
          
          await client.query(`
            ALTER TABLE ships 
            ADD COLUMN ${column.name} ${column.definition}
          `);
          
          console.log('  [OK] Column ' + column.name + ' added');
        } else {
          console.log('  [SKIP] Column ' + column.name + ' already exists');
        }
      }
      
      // Set default values for existing ships
      console.log('\n  [UPDATE] Updating existing ships with default values...');
      await client.query(`
        UPDATE ships 
        SET owner_type = 'party'
        WHERE owner_type IS NULL
      `);
      console.log('  [OK] Existing ships updated\n');
      
    } else {
      console.log('  [WARN] ships table does not exist - skipping ships fixes\n');
    }
    
    // ============================================
    // COMMIT & SUMMARY
    // ============================================
    
    await client.query('COMMIT');
    console.log('[SUCCESS] Migration completed successfully!\n');
    
    // Show summary
    console.log('[SUMMARY]\n');
    
    if (gearTableCheck.rows.length > 0) {
      const gearSummary = await client.query(`
        SELECT 
          COUNT(*) FILTER (WHERE weapon_type IS NOT NULL) as weapons_with_type,
          COUNT(*) FILTER (WHERE armor_type IS NOT NULL) as armor_with_type,
          COUNT(*) FILTER (WHERE hands_required = 2) as two_handed_weapons
        FROM gear_database
      `);
      
      console.log('GEAR DATABASE:');
      console.log('  - Weapons with type: ' + gearSummary.rows[0].weapons_with_type);
      console.log('  - Armor with type: ' + gearSummary.rows[0].armor_with_type);
      console.log('  - Two-handed weapons: ' + gearSummary.rows[0].two_handed_weapons);
    }
    
    if (shipsTableCheck.rows.length > 0) {
      const shipsSummary = await client.query(`
        SELECT 
          COUNT(*) as total_ships,
          COUNT(*) FILTER (WHERE owner_type = 'character') as character_owned,
          COUNT(*) FILTER (WHERE owner_type = 'party') as party_owned
        FROM ships
      `);
      
      console.log('\nSHIPS:');
      console.log('  - Total ships: ' + shipsSummary.rows[0].total_ships);
      console.log('  - Character-owned: ' + shipsSummary.rows[0].character_owned);
      console.log('  - Party-owned: ' + shipsSummary.rows[0].party_owned);
    }
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('[ERROR] Migration failed:', error);
    console.error('Full error:', error.message);
    console.error('Stack:', error.stack);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run migration
migrate()
  .then(() => {
    console.log('\n[DONE] All done! Your database is now up to date.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n[FATAL] Migration error:', error.message);
    process.exit(1);
  });
