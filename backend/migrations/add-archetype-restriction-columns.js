// Migration to add archetype restriction columns to gear_database table
// These columns enable archetype-based equipment restrictions

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { Pool } = require('pg');

console.log('Environment check:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'MISSING');
console.log('DB_NAME:', process.env.DB_NAME);

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: String(process.env.DB_PASSWORD || 'admin'),
  database: process.env.DB_NAME || 'darkspace_campaign',
});

async function migrate() {
  const client = await pool.connect();
  
  try {
    console.log('🔧 Starting migration: Add archetype restriction columns to gear_database...');
    
    await client.query('BEGIN');
    
    // Array of columns to add with their definitions
    const columns = [
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
    
    // Add each column if it doesn't exist
    for (const column of columns) {
      const checkColumn = await client.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'gear_database' 
        AND column_name = $1
      `, [column.name]);
      
      if (checkColumn.rows.length === 0) {
        console.log(`   Adding ${column.name} column (${column.description})...`);
        
        await client.query(`
          ALTER TABLE gear_database 
          ADD COLUMN ${column.name} ${column.definition}
        `);
        
        console.log(`✅ Column ${column.name} added successfully`);
      } else {
        console.log(`ℹ️  Column ${column.name} already exists, skipping`);
      }
    }
    
    // Update existing items with appropriate values based on category
    console.log('📝 Updating existing items with default archetype restriction values...');
    
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
          ELSE NULL  -- NULL means standard weight
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
          ELSE 'light'  -- Default to light if unclear
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
          ELSE 11  -- Default light armor AC
        END
      WHERE category = 'armor' 
      AND (armor_type IS NULL OR ac_bonus IS NULL)
    `);
    
    console.log('✅ Existing items updated with default values');
    
    await client.query('COMMIT');
    console.log('✅ Migration completed successfully!');
    
    // Show summary of what was added
    const summary = await client.query(`
      SELECT 
        COUNT(*) FILTER (WHERE weapon_type IS NOT NULL) as weapons_with_type,
        COUNT(*) FILTER (WHERE armor_type IS NOT NULL) as armor_with_type,
        COUNT(*) FILTER (WHERE hands_required = 2) as two_handed_weapons
      FROM gear_database
    `);
    
    console.log('\n📊 Summary:');
    console.log(`   - Weapons with type set: ${summary.rows[0].weapons_with_type}`);
    console.log(`   - Armor with type set: ${summary.rows[0].armor_with_type}`);
    console.log(`   - Two-handed weapons: ${summary.rows[0].two_handed_weapons}`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run migration
migrate()
  .then(() => {
    console.log('🎉 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Migration error:', error);
    process.exit(1);
  });
