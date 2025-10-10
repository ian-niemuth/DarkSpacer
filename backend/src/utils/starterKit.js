// backend/src/utils/starterKit.js
// Function to add Spacer's Kit to new characters

const pool = require('../config/database');

// Spacer's Kit contents (from DarkSpace rulebook, pg 32)
// Total cost: 40cr, Total slots: 5
const SPACERS_KIT = [
  { name: 'Backpack', quantity: 1 },           // FREE (first one)
  { name: 'Cable, Synthetic', quantity: 1 },  // 1 slot
  { name: 'CredStick', quantity: 1 },         // FREE
  { name: 'Energy Cell', quantity: 2 },       // 1 slot (2 per slot)
  { name: 'Glowrod', quantity: 1 },           // 1 slot
  { name: 'Grapple', quantity: 1 },           // 1 slot
  { name: 'Rations (3-pack)', quantity: 1 }   // 1 slot
];

// Citizen Starting Gear Table (d12) - for "The Survivor" motivation
const CITIZEN_STARTING_GEAR = [
  { roll: 1, name: 'Glowrod', quantity: 1 },
  { roll: 2, name: 'Edged, Light', quantity: 1 },
  { roll: 3, name: 'Medkit', quantity: 1 },
  { roll: 4, name: 'Pistol, Light', quantity: 1 },
  { roll: 5, name: 'Cable, Synthetic', quantity: 1 },
  { roll: 6, name: 'Energy Cell', quantity: 2 },
  { roll: 7, name: 'Multitool', quantity: 1 },
  { roll: 8, name: 'Communicator', quantity: 1 },
  { roll: 9, name: 'Rebreather', quantity: 1 },
  { roll: 10, name: 'Grapple', quantity: 1 },
  { roll: 11, name: 'Blunt, Light', quantity: 1 },
  { roll: 12, name: 'Rations (3-pack)', quantity: 1 }
];

/**
 * Add Spacer's Kit items to a new character's inventory
 * @param {number} characterId - The character's database ID
 * @returns {Promise<boolean>} - True if successful
 */
async function addSpacersKit(characterId) {
  try {
    console.log(`\n🎒 Adding Spacer's Kit to character ${characterId}...`);

    let itemsAdded = 0;
    let itemsFailed = 0;

    for (const kitItem of SPACERS_KIT) {
      // Get item details from gear database
      const gearResult = await pool.query(
        'SELECT * FROM gear_database WHERE LOWER(name) = LOWER($1)',
        [kitItem.name]
      );

      if (gearResult.rows.length === 0) {
        console.warn(`  ⚠️  ${kitItem.name} not found in gear database - skipping`);
        itemsFailed++;
        continue;
      }

      const item = gearResult.rows[0];

      // Insert item into character's inventory
      await pool.query(`
        INSERT INTO inventory (
          character_id, 
          item_name, 
          item_type, 
          description, 
          weight, 
          quantity, 
          damage, 
          range, 
          properties
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        characterId,
        item.name,
        item.category,
        item.description,
        item.weight,
        kitItem.quantity,
        item.damage,
        item.range,
        item.properties
      ]);

      console.log(`  ✅ Added ${kitItem.quantity}× ${kitItem.name}`);
      itemsAdded++;
    }

    // Log activity
    await pool.query(`
      INSERT INTO activity_log (character_id, action_type, description)
      VALUES ($1, $2, $3)
    `, [characterId, 'starter_kit', 'Received Spacer\'s Kit (starting gear)']);

    console.log(`\n📦 Spacer's Kit complete: ${itemsAdded} items added, ${itemsFailed} failed\n`);
    return true;

  } catch (error) {
    console.error('❌ Error adding Spacer\'s Kit:', error);
    throw error;
  }
}

/**
 * Roll on Citizen Starting Gear table and add item to character inventory
 * Used for "The Survivor" motivation
 * @param {number} characterId - The character's database ID
 * @returns {Promise<object>} - Object with roll result and item added
 */
async function rollCitizenStartingGear(characterId) {
  try {
    // Roll 1d12
    const roll = Math.floor(Math.random() * 12) + 1;
    const gearEntry = CITIZEN_STARTING_GEAR.find(g => g.roll === roll);
    
    console.log(`\n🎲 Rolling Citizen Starting Gear (d12): ${roll} - ${gearEntry.name}`);

    // Get item details from gear database
    const gearResult = await pool.query(
      'SELECT * FROM gear_database WHERE LOWER(name) = LOWER($1)',
      [gearEntry.name]
    );

    if (gearResult.rows.length === 0) {
      console.warn(`  ⚠️  ${gearEntry.name} not found in gear database - adding as generic item`);
      
      // Add as a generic item if not in database
      await pool.query(`
        INSERT INTO inventory (
          character_id, 
          item_name, 
          item_type, 
          quantity
        )
        VALUES ($1, $2, $3, $4)
      `, [characterId, gearEntry.name, 'equipment', gearEntry.quantity]);
      
      console.log(`  ✅ Added ${gearEntry.quantity}× ${gearEntry.name} (generic)`);
      
      return {
        roll,
        itemName: gearEntry.name,
        quantity: gearEntry.quantity
      };
    }

    const item = gearResult.rows[0];

    // Insert item into character's inventory
    await pool.query(`
      INSERT INTO inventory (
        character_id, 
        item_name, 
        item_type, 
        description, 
        weight, 
        quantity, 
        damage, 
        range, 
        properties
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `, [
      characterId,
      item.name,
      item.category,
      item.description,
      item.weight,
      gearEntry.quantity,
      item.damage,
      item.range,
      item.properties
    ]);

    console.log(`  ✅ Added ${gearEntry.quantity}× ${gearEntry.name}`);

    // Log activity
    await pool.query(`
      INSERT INTO activity_log (character_id, action_type, description)
      VALUES ($1, $2, $3)
    `, [
      characterId, 
      'citizen_gear', 
      `Rolled d12=${roll}: Received ${gearEntry.quantity}× ${gearEntry.name} (The Survivor motivation)`
    ]);

    return {
      roll,
      itemName: item.name,
      quantity: gearEntry.quantity,
      description: item.description
    };

  } catch (error) {
    console.error('❌ Error rolling Citizen Starting Gear:', error);
    throw error;
  }
}

module.exports = { addSpacersKit, rollCitizenStartingGear, SPACERS_KIT, CITIZEN_STARTING_GEAR };
