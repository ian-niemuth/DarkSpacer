// backend/src/routes/inventory.js
// Enhanced inventory management with slot validation

const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const { calculateArchetypeInventoryBonus } = require('../utils/archetypeAbilities');

// ============================================
// HELPER FUNCTIONS
// ============================================

// Calculate total inventory slots used by a character
async function calculateSlotsUsed(characterId) {
  const result = await pool.query(`
    SELECT
      i.item_name,
      i.quantity,
      COALESCE(g.weight, i.weight, 1) as item_weight,
      g.properties
    FROM inventory i
    LEFT JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
    WHERE i.character_id = $1
      AND (i.in_use_by_item_id IS NULL OR i.in_use_by_item_id = 0)
  `, [characterId]);

  let totalSlots = 0;
  let hasBackpack = false;

  for (const item of result.rows) {
    const weight = parseFloat(item.item_weight);
    const quantity = item.quantity;
    const properties = item.properties || '';

    // Check for FREE items
    if (weight === 0) {
      // FREE items like CredStick, or first Backpack
      if (item.item_name.toLowerCase().includes('backpack')) {
        if (!hasBackpack) {
          hasBackpack = true;
          continue; // First backpack is free
        }
      } else {
        continue; // Other FREE items
      }
    }

    // Check for "2 per slot" items (weight = 0.5)
    if (weight === 0.5) {
      totalSlots += Math.ceil(quantity / 2);
    } else {
      totalSlots += weight * quantity;
    }
  }

  return totalSlots;
}

// Get character's STR score + archetype bonus (max slots)
async function getMaxSlots(characterId) {
  const result = await pool.query(
    'SELECT strength, constitution, archetype FROM characters WHERE id = $1',
    [characterId]
  );
  
  if (result.rows.length === 0) return 10;
  
  const { strength, constitution, archetype } = result.rows[0];
  const baseSlots = strength;
  const archetypeBonus = calculateArchetypeInventoryBonus(archetype, strength, constitution);
  
  // BUG FIX #4: Minimum 10 gear slots, regardless of STR or penalties
  return Math.max(10, baseSlots + archetypeBonus);
}

// Check if a character's archetype can use a specific item
async function canArchetypeUseItem(characterId, item) {
  // Get character's archetype
  const charResult = await pool.query(
    'SELECT archetype FROM characters WHERE id = $1',
    [characterId]
  );

  if (charResult.rows.length === 0) {
    return { canUse: false, reason: 'Character not found' };
  }

  const archetype = charResult.rows[0].archetype;
  if (!archetype) {
    return { canUse: false, reason: 'Character has no archetype assigned' };
  }

  const weaponType = item.weapon_type;
  const weaponWeightClass = item.weapon_weight_class;
  const armorType = item.armor_type;

  // Shields can be used by anyone
  if (armorType === 'shield') {
    return { canUse: true };
  }

  // Define archetype restrictions
  const archetypeRules = {
    'Strong': {
      weapons: { melee: ['light', null, 'heavy'] }, // All melee
      armor: ['light', 'medium', 'heavy', 'energy', 'helmet']
    },
    'Quick': {
      weapons: { 
        melee: ['light'], 
        ranged: ['light'] 
      },
      armor: ['light', 'helmet']
    },
    'Tough': {
      weapons: { 
        melee: ['heavy'], 
        ranged: ['heavy'] 
      },
      armor: ['light', 'medium', 'heavy', 'energy', 'helmet']
    },
    'Clever': {
      weapons: { ranged: ['light'] },
      armor: [] // No armor
    },
    'Wise': {
      weapons: { melee: ['light'] },
      armor: [] // No armor
    },
    'Charming': {
      weapons: { 
        ranged: ['light', null, 'heavy'] // All pistols/blasters (any weight)
      },
      armor: ['light', 'helmet']
    }
  };

  const rules = archetypeRules[archetype];
  if (!rules) {
    return { canUse: false, reason: `Unknown archetype: ${archetype}` };
  }

  // Check weapon restrictions
  if (weaponType) {
    const allowedWeapons = rules.weapons;
    
    // Special case for Charming - only pistols/blasters (check subcategory)
    if (archetype === 'Charming') {
      const subcategory = item.subcategory || '';
      const isPistolOrBlaster = subcategory.toLowerCase().includes('pistol') || 
                                subcategory.toLowerCase().includes('blaster');
      
      if (!isPistolOrBlaster) {
        return { 
          canUse: false, 
          reason: `${archetype} characters can only use Pistols and Blasters` 
        };
      }
      // If it is a pistol/blaster, allow any weight
      return { canUse: true };
    }

    // For other archetypes, check weapon type and weight class
    if (weaponType === 'melee' && allowedWeapons.melee) {
      if (!allowedWeapons.melee.includes(weaponWeightClass)) {
        const allowed = allowedWeapons.melee.filter(w => w !== null).join(', ') || 'standard';
        return { 
          canUse: false, 
          reason: `${archetype} characters can only use ${allowed} melee weapons` 
        };
      }
    } else if (weaponType === 'ranged' && allowedWeapons.ranged) {
      if (!allowedWeapons.ranged.includes(weaponWeightClass)) {
        const allowed = allowedWeapons.ranged.filter(w => w !== null).join(', ') || 'standard';
        return { 
          canUse: false, 
          reason: `${archetype} characters can only use ${allowed} ranged weapons` 
        };
      }
    } else {
      return { 
        canUse: false, 
        reason: `${archetype} characters cannot use ${weaponType} weapons` 
      };
    }
  }

  // Check armor restrictions (excluding shields)
  if (armorType && armorType !== 'shield') {
    const allowedArmor = rules.armor;
    
    if (!allowedArmor.includes(armorType)) {
      if (allowedArmor.length === 0) {
        return { 
          canUse: false, 
          reason: `${archetype} characters cannot wear armor` 
        };
      }
      return { 
        canUse: false, 
        reason: `${archetype} characters can only wear ${allowedArmor.join(', ')} armor` 
      };
    }
  }

  return { canUse: true };
}

// ============================================
// ADMIN ROUTES - Give/Remove Items
// ============================================

// GET all gear from database (for admin browsing)
router.get('/gear-database', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { category, search } = req.query;
    
    let query = 'SELECT * FROM gear_database WHERE 1=1';
    const params = [];
    
    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }
    
    if (search) {
      params.push(`%${search}%`);
      query += ` AND (name ILIKE $${params.length} OR description ILIKE $${params.length})`;
    }
    
    query += ' ORDER BY category, subcategory, name';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching gear database:', error);
    res.status(500).json({ error: 'Failed to fetch gear database' });
  }
});

// POST - Give item to character (with validation)
router.post('/give-item/:characterId', authenticateToken, isAdmin, async (req, res) => {
  const { characterId } = req.params;
  const { itemName, quantity = 1 } = req.body;

  try {
    // Get item details from database
    const gearResult = await pool.query(
      'SELECT * FROM gear_database WHERE LOWER(name) = LOWER($1)',
      [itemName]
    );

    if (gearResult.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found in gear database' });
    }

    const item = gearResult.rows[0];
    const itemWeight = parseFloat(item.weight);

    // Calculate slots this item will take
    let slotsNeeded = 0;
    if (itemWeight === 0) {
      // FREE items (except backpack after first)
      if (item.name.toLowerCase().includes('backpack')) {
        const backpackCount = await pool.query(
          `SELECT COUNT(*) FROM inventory 
           WHERE character_id = $1 AND item_name ILIKE '%backpack%'`,
          [characterId]
        );
        if (parseInt(backpackCount.rows[0].count) > 0) {
          slotsNeeded = 1; // Additional backpacks count
        }
      }
    } else if (itemWeight === 0.5) {
      // 2 per slot items
      slotsNeeded = Math.ceil(quantity / 2);
    } else {
      slotsNeeded = itemWeight * quantity;
    }

    // Check if character has space
    const currentSlots = await calculateSlotsUsed(characterId);
    const maxSlots = await getMaxSlots(characterId);
    const availableSlots = maxSlots - currentSlots;

    if (slotsNeeded > availableSlots) {
      return res.status(400).json({ 
        error: `Not enough inventory space. Need ${slotsNeeded} slots, but only ${availableSlots} available (${currentSlots}/${maxSlots} used)` 
      });
    }

    // Check if character already has this item (for stacking)
    const existingItem = await pool.query(
      'SELECT * FROM inventory WHERE character_id = $1 AND LOWER(item_name) = LOWER($2)',
      [characterId, itemName]
    );

    if (existingItem.rows.length > 0) {
      // Update quantity
      await pool.query(
        'UPDATE inventory SET quantity = quantity + $1 WHERE id = $2',
        [quantity, existingItem.rows[0].id]
      );
    } else {
      // Insert new item
      await pool.query(`
        INSERT INTO inventory (character_id, item_name, item_type, description, weight, quantity, damage, range, properties)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        characterId,
        item.name,
        item.category,
        item.description,
        item.weight,
        quantity,
        item.damage,
        item.range,
        item.properties
      ]);
    }

    // Log activity
    await pool.query(`
      INSERT INTO activity_log (character_id, action_type, description)
      VALUES ($1, 'item_given', $2)
    `, [characterId, `Received ${quantity}× ${itemName}`]);

    // Emit socket event
    const io = req.app.get('io');
    io.to(`character_${characterId}`).emit('item_received', {
      message: `You received ${quantity}× ${itemName}!`,
      item: itemName,
      quantity
    });
    io.emit('admin_refresh'); // Notify admin panel

    const newSlots = await calculateSlotsUsed(characterId);
    res.json({ 
      message: 'Item given successfully',
      slotsUsed: newSlots,
      maxSlots: maxSlots
    });

  } catch (error) {
    console.error('Error giving item:', error);
    res.status(500).json({ error: 'Failed to give item' });
  }
});

// DELETE - Remove item from character
router.delete('/remove-item/:characterId/:itemId', authenticateToken, isAdmin, async (req, res) => {
  const { characterId, itemId } = req.params;
  const { quantity } = req.body; // Optional: remove specific quantity

  try {
    const itemResult = await pool.query(
      'SELECT * FROM inventory WHERE id = $1 AND character_id = $2',
      [itemId, characterId]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found in character inventory' });
    }

    const item = itemResult.rows[0];
    
    // Check if it's an energy cell that's currently loaded in gear
    if (item.item_name.toLowerCase().includes('energy cell') && item.in_use_by_item_id) {
      const gearResult = await pool.query(
        'SELECT item_name FROM inventory WHERE id = $1',
        [item.in_use_by_item_id]
      );
      
      if (gearResult.rows.length > 0) {
        return res.status(400).json({ 
          error: `This energy cell is loaded in ${gearResult.rows[0].item_name}. Unload it first.` 
        });
      }
    }
    
    if (quantity && quantity < item.quantity) {
      // Remove partial quantity
      await pool.query(
        'UPDATE inventory SET quantity = quantity - $1 WHERE id = $2',
        [quantity, itemId]
      );
      
      await pool.query(`
        INSERT INTO activity_log (character_id, action_type, description)
        VALUES ($1, 'item_removed', $2)
      `, [characterId, `Lost ${quantity}× ${item.item_name}`]);
      
    } else {
      // Remove entire item
      await pool.query('DELETE FROM inventory WHERE id = $1', [itemId]);
      
      await pool.query(`
        INSERT INTO activity_log (character_id, action_type, description)
        VALUES ($1, 'item_removed', $2)
      `, [characterId, `Lost ${item.item_name}`]);
    }

    // Emit socket event
    const io = req.app.get('io');
    io.to(`character_${characterId}`).emit('item_removed', {
      message: `Item removed: ${item.item_name}`,
      item: item.item_name
    });
    io.emit('admin_refresh'); // Notify admin panel

    const newSlots = await calculateSlotsUsed(characterId);
    const maxSlots = await getMaxSlots(characterId);
    
    res.json({ 
      message: 'Item removed successfully',
      slotsUsed: newSlots,
      maxSlots: maxSlots
    });

  } catch (error) {
    console.error('Error removing item:', error);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

// POST - Add custom item to gear database
router.post('/custom-item', authenticateToken, isAdmin, async (req, res) => {
  const { 
    name, 
    category, 
    subcategory, 
    cost, 
    weight, 
    damage, 
    range, 
    properties, 
    description,
    // Archetype restriction fields
    weapon_type,
    weapon_weight_class,
    armor_type,
    hands_required,
    allows_dex_modifier
  } = req.body;

  // DEBUG: Log what we're receiving
  console.log('Creating custom item with data:', {
    name, category, subcategory, cost, weight, damage, range, properties, description,
    weapon_type, weapon_weight_class, armor_type, hands_required, allows_dex_modifier
  });

  try {
    // Validation: weapons must have weapon_type and weapon_weight_class
    if (category === 'weapon') {
      if (!weapon_type) {
        return res.status(400).json({ error: 'Weapons must have a weapon_type (melee or ranged)' });
      }
      if (weapon_weight_class === undefined) {
        return res.status(400).json({ error: 'Weapons must have a weight_class (light, standard/null, or heavy)' });
      }
    }

    // Validation: armor must have armor_type
    if (category === 'armor') {
      if (!armor_type) {
        return res.status(400).json({ error: 'Armor must have an armor_type (light, medium, heavy, energy, helmet, or shield)' });
      }
    }

    // Set default AC bonus for armor based on type
    let acBonus = null;
    if (armor_type) {
      switch (armor_type) {
        case 'light': acBonus = 11; break;
        case 'medium': acBonus = 13; break;
        case 'heavy': acBonus = 15; break;
        case 'energy': acBonus = 15; break;
        case 'helmet': acBonus = 1; break;
        case 'shield': acBonus = 2; break;
      }
    }

    const result = await pool.query(`
      INSERT INTO gear_database (
        name, category, subcategory, cost, weight, damage, range, properties, description, is_custom,
        weapon_type, weapon_weight_class, armor_type, hands_required, allows_dex_modifier, ac_bonus
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true, $10, $11, $12, $13, $14, $15)
      RETURNING *
    `, [
      name, category, subcategory, cost, weight, damage, range, properties, description,
      weapon_type, weapon_weight_class, armor_type, hands_required, allows_dex_modifier, acBonus
    ]);

    res.json({ 
      message: 'Custom item added successfully',
      item: result.rows[0]
    });

  } catch (error) {
    console.error('Error adding custom item:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to add custom item', 
      details: error.message 
    });
  }
});

// ============================================
// CUSTOM ITEM MANAGEMENT
// ============================================

// DELETE - Remove custom item from gear database
router.delete('/custom-item/:itemId', authenticateToken, isAdmin, async (req, res) => {
  const { itemId } = req.params;

  try {
    // Check if item exists
    const itemResult = await pool.query(
      'SELECT * FROM gear_database WHERE id = $1',
      [itemId]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found in gear database' });
    }

    const item = itemResult.rows[0];

    // Only allow deletion of custom items
    if (!item.is_custom) {
      return res.status(403).json({ error: 'Cannot delete non-custom items. Only custom items can be deleted.' });
    }

    // Check if any characters have this item in their inventory
    const inventoryCheck = await pool.query(
      'SELECT COUNT(*) as count, ARRAY_AGG(DISTINCT c.name) as character_names FROM inventory i JOIN characters c ON i.character_id = c.id WHERE LOWER(i.item_name) = LOWER($1)',
      [item.name]
    );

    const itemCount = parseInt(inventoryCheck.rows[0].count);

    if (itemCount > 0) {
      const characters = inventoryCheck.rows[0].character_names.join(', ');
      return res.status(400).json({ 
        error: `Cannot delete "${item.name}". ${itemCount} character(s) have it in inventory: ${characters}. Remove it from all inventories first.` 
      });
    }

    // Delete the item
    await pool.query('DELETE FROM gear_database WHERE id = $1', [itemId]);

    res.json({ 
      message: `Custom item "${item.name}" deleted successfully`,
      itemName: item.name
    });

  } catch (error) {
    console.error('Error deleting custom item:', error);
    res.status(500).json({ error: 'Failed to delete custom item' });
  }
});

// GET - Get all custom items
router.get('/custom-items', authenticateToken, isAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        g.*,
        COUNT(DISTINCT i.id) as usage_count,
        ARRAY_REMOVE(ARRAY_AGG(DISTINCT c.name), NULL) as used_by_characters
      FROM gear_database g
      LEFT JOIN inventory i ON LOWER(i.item_name) = LOWER(g.name)
      LEFT JOIN characters c ON i.character_id = c.id
      WHERE g.is_custom = true
      GROUP BY g.id
      ORDER BY g.category, g.name
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching custom items:', error);
    res.status(500).json({ error: 'Failed to fetch custom items' });
  }
});

// ============================================
// PLAYER ROUTES - View Inventory
// ============================================

// GET character's current inventory with slot info and equipment eligibility
router.get('/:characterId', authenticateToken, async (req, res) => {
  const { characterId } = req.params;

  try {
    // Verify ownership
    const charResult = await pool.query(
      'SELECT user_id, archetype FROM characters WHERE id = $1',
      [characterId]
    );

    if (charResult.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    if (charResult.rows[0].user_id !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Get inventory with calculated weights and archetype info
    const inventory = await pool.query(`
      SELECT 
        i.*,
        COALESCE(g.weight, 1) as actual_weight,
        g.properties as full_properties,
        g.weapon_type,
        g.weapon_weight_class,
        g.armor_type,
        g.subcategory,
        g.hands_required
      FROM inventory i
      LEFT JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
      WHERE i.character_id = $1
      ORDER BY i.item_type, i.item_name
    `, [characterId]);

    // Add canEquip flag to each item
    const enrichedInventory = await Promise.all(
      inventory.rows.map(async (item) => {
        const eligibility = await canArchetypeUseItem(characterId, item);
        return {
          ...item,
          canEquip: eligibility.canUse,
          equipRestriction: eligibility.reason || null
        };
      })
    );

    const slotsUsed = await calculateSlotsUsed(characterId);
    const maxSlots = await getMaxSlots(characterId);

    res.json({
      inventory: enrichedInventory,
      archetype: charResult.rows[0].archetype,
      slotsUsed,
      maxSlots,
      percentFull: Math.round((slotsUsed / maxSlots) * 100)
    });

  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// ============================================
// EQUIPMENT SYSTEM
// ============================================

// Calculate character's AC from equipped gear
async function calculateAC(characterId) {
  try {
    // Get character's DEX modifier, archetype, and level
    const charResult = await pool.query(
      'SELECT dexterity, archetype, level FROM characters WHERE id = $1',
      [characterId]
    );
    const dexMod = Math.floor((charResult.rows[0].dexterity - 10) / 2);
    const archetype = charResult.rows[0].archetype;
    const level = charResult.rows[0].level || 1;

    // Get all equipped armor/helmet/shield
    const equippedResult = await pool.query(`
      SELECT 
        i.item_name,
        i.equipped_slot,
        COALESCE(g.ac_bonus, 0) as ac_bonus,
        COALESCE(g.allows_dex_modifier, true) as allows_dex_modifier,
        g.subcategory
      FROM inventory i
      LEFT JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
      WHERE i.character_id = $1 
        AND i.equipped = true
        AND i.equipped_slot IN ('body_armor', 'helmet', 'shield')
    `, [characterId]);

    let baseAC = 10; // Default unarmored AC
    let allowsDex = true;
    let bonusAC = 0;
    const breakdown = [];

    for (const item of equippedResult.rows) {
      if (item.equipped_slot === 'body_armor') {
        // Body armor sets base AC
        baseAC = item.ac_bonus;
        allowsDex = item.allows_dex_modifier;
        breakdown.push(`${item.item_name} (${baseAC})`);
      } else {
        // Helmet and shield add to AC
        bonusAC += item.ac_bonus;
        breakdown.push(`${item.item_name} (+${item.ac_bonus})`);
      }
    }

    // Add DEX modifier if allowed (can be positive or negative)
    let finalAC = baseAC + bonusAC;
    if (allowsDex) {
      finalAC += dexMod;
      if (dexMod !== 0) {
        breakdown.push(`DEX (${dexMod >= 0 ? '+' : ''}${dexMod})`);
      }
    }

    // Add Insightful Defense for Wise archetype
    if (archetype === 'Wise') {
      const insightfulDefense = Math.max(1, Math.floor(level / 2));
      finalAC += insightfulDefense;
      breakdown.push(`Insightful Defense (+${insightfulDefense})`);
    }

    return {
      ac: finalAC,
      breakdown: breakdown.join(', '),
      baseAC,
      bonusAC,
      dexMod: allowsDex ? dexMod : 0
    };
  } catch (error) {
    console.error('Error calculating AC:', error);
    return { ac: 10, breakdown: 'Base AC', baseAC: 10, bonusAC: 0, dexMod: 0 };
  }
}

// Validate equipment rules before equipping
async function validateEquipment(characterId, itemId, targetSlot) {
  try {
    // Get item details with archetype restriction info
    const itemResult = await pool.query(`
      SELECT 
        i.*,
        COALESCE(g.hands_required, 1) as hands_required,
        g.category,
        g.subcategory,
        g.weapon_type,
        g.weapon_weight_class,
        g.armor_type
      FROM inventory i
      LEFT JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
      WHERE i.id = $1 AND i.character_id = $2
    `, [itemId, characterId]);

    if (itemResult.rows.length === 0) {
      return { valid: false, error: 'Item not found' };
    }

    const item = itemResult.rows[0];
    const handsRequired = parseInt(item.hands_required);
    const properties = item.properties || '';

    // Check archetype restrictions
    const archetypeCheck = await canArchetypeUseItem(characterId, item);
    if (!archetypeCheck.canUse) {
      return { 
        valid: false, 
        error: `⚠️ ${archetypeCheck.reason}` 
      };
    }

    // Check if EC gear has energy cell loaded
    if (properties.includes('EC') && !item.loaded_energy_cell_id) {
      return { 
        valid: false, 
        error: 'This item requires an energy cell. Load a cell before equipping.' 
      };
    }

    // Check if slot is already occupied
    const occupiedResult = await pool.query(
      'SELECT * FROM inventory WHERE character_id = $1 AND equipped_slot = $2 AND equipped = true',
      [characterId, targetSlot]
    );

    if (occupiedResult.rows.length > 0) {
      return { 
        valid: false, 
        error: `${targetSlot.replace('_', ' ')} slot already occupied by ${occupiedResult.rows[0].item_name}. Unequip it first.` 
      };
    }

    // If equipping 2H weapon, check if secondary slot OR shield is occupied
    if (handsRequired === 2 && targetSlot === 'primary_weapon') {
      const secondaryOccupied = await pool.query(
        'SELECT * FROM inventory WHERE character_id = $1 AND (equipped_slot = \'secondary_weapon\' OR equipped_slot = \'shield\') AND equipped = true',
        [characterId]
      );
      
      if (secondaryOccupied.rows.length > 0) {
        return {
          valid: false,
          error: `Cannot equip 2H weapon. ${secondaryOccupied.rows[0].item_name} is occupying your off-hand. Unequip it first.`
        };
      }
    }

    // If equipping to secondary slot OR shield slot, check if primary has 2H weapon
    if (targetSlot === 'secondary_weapon' || targetSlot === 'shield') {
      const primaryResult = await pool.query(`
        SELECT 
          i.item_name,
          COALESCE(g.hands_required, 1) as hands_required
        FROM inventory i
        LEFT JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
        WHERE i.character_id = $1 
          AND i.equipped_slot = 'primary_weapon' 
          AND i.equipped = true
      `, [characterId]);

      if (primaryResult.rows.length > 0 && parseInt(primaryResult.rows[0].hands_required) === 2) {
        return {
          valid: false,
          error: `Cannot equip to off-hand. ${primaryResult.rows[0].item_name} is a 2H weapon requiring both hands. Unequip it first.`
        };
      }
    }

    return { valid: true };
  } catch (error) {
    console.error('Error validating equipment:', error);
    return { valid: false, error: 'Validation failed' };
  }
}

// POST - Equip item to a slot
router.post('/equip/:characterId/:itemId', authenticateToken, async (req, res) => {
  const { characterId, itemId } = req.params;
  const { slot } = req.body; // Expected: primary_weapon, secondary_weapon, body_armor, helmet, shield

  try {
    // Verify ownership
    const charResult = await pool.query(
      'SELECT user_id FROM characters WHERE id = $1',
      [characterId]
    );

    if (charResult.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    if (charResult.rows[0].user_id !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Validate equipment rules
    const validation = await validateEquipment(characterId, itemId, slot);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Equip the item
    await pool.query(
      'UPDATE inventory SET equipped = true, equipped_slot = $1 WHERE id = $2',
      [slot, itemId]
    );

    // Recalculate AC if armor/helmet/shield
    const acResult = await calculateAC(characterId);
    await pool.query(
      'UPDATE characters SET ac = $1 WHERE id = $2',
      [acResult.ac, characterId]
    );

    // Log activity
    const itemResult = await pool.query('SELECT item_name FROM inventory WHERE id = $1', [itemId]);
    await pool.query(`
      INSERT INTO activity_log (character_id, action_type, description)
      VALUES ($1, 'item_equipped', $2)
    `, [characterId, `Equipped ${itemResult.rows[0].item_name} to ${slot}`]);

    // Emit socket event
    const io = req.app.get('io');
    io.to(`character_${characterId}`).emit('character_updated', {
      message: `Equipped ${itemResult.rows[0].item_name}!`
    });
    io.emit('admin_refresh'); // Notify admin panel

    res.json({
      message: 'Item equipped successfully',
      ac: acResult.ac,
      acBreakdown: acResult.breakdown
    });

  } catch (error) {
    console.error('Error equipping item:', error);
    res.status(500).json({ error: 'Failed to equip item' });
  }
});

// POST - Unequip item
router.post('/unequip/:characterId/:itemId', authenticateToken, async (req, res) => {
  const { characterId, itemId } = req.params;

  try {
    // Verify ownership
    const charResult = await pool.query(
      'SELECT user_id FROM characters WHERE id = $1',
      [characterId]
    );

    if (charResult.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    if (charResult.rows[0].user_id !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Unequip the item
    await pool.query(
      'UPDATE inventory SET equipped = false, equipped_slot = NULL WHERE id = $1',
      [itemId]
    );

    // Recalculate AC
    const acResult = await calculateAC(characterId);
    await pool.query(
      'UPDATE characters SET ac = $1 WHERE id = $2',
      [acResult.ac, characterId]
    );

    // Log activity
    const itemResult = await pool.query('SELECT item_name FROM inventory WHERE id = $1', [itemId]);
    await pool.query(`
      INSERT INTO activity_log (character_id, action_type, description)
      VALUES ($1, 'item_unequipped', $2)
    `, [characterId, `Unequipped ${itemResult.rows[0].item_name}`]);

    // Emit socket event
    const io = req.app.get('io');
    io.to(`character_${characterId}`).emit('character_updated', {
      message: `Unequipped ${itemResult.rows[0].item_name}`
    });
    io.emit('admin_refresh'); // Notify admin panel

    res.json({
      message: 'Item unequipped successfully',
      ac: acResult.ac,
      acBreakdown: acResult.breakdown
    });

  } catch (error) {
    console.error('Error unequipping item:', error);
    res.status(500).json({ error: 'Failed to unequip item' });
  }
});

// GET - Check if specific item can be equipped by character
router.get('/can-equip/:characterId/:itemId', authenticateToken, async (req, res) => {
  const { characterId, itemId } = req.params;

  try {
    // Verify ownership
    const charResult = await pool.query(
      'SELECT user_id, archetype FROM characters WHERE id = $1',
      [characterId]
    );

    if (charResult.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    if (charResult.rows[0].user_id !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Get item with archetype restriction info
    const itemResult = await pool.query(`
      SELECT 
        i.*,
        g.weapon_type,
        g.weapon_weight_class,
        g.armor_type,
        g.subcategory,
        g.hands_required
      FROM inventory i
      LEFT JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
      WHERE i.id = $1 AND i.character_id = $2
    `, [itemId, characterId]);

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const item = itemResult.rows[0];
    const eligibility = await canArchetypeUseItem(characterId, item);

    res.json({
      canEquip: eligibility.canUse,
      reason: eligibility.reason || null,
      archetype: charResult.rows[0].archetype,
      item: {
        id: item.id,
        name: item.item_name,
        weapon_type: item.weapon_type,
        weapon_weight_class: item.weapon_weight_class,
        armor_type: item.armor_type,
        subcategory: item.subcategory
      }
    });

  } catch (error) {
    console.error('Error checking equipment eligibility:', error);
    res.status(500).json({ error: 'Failed to check eligibility' });
  }
});

// GET - Get equipped items and AC info
router.get('/equipped/:characterId', authenticateToken, async (req, res) => {
  const { characterId } = req.params;

  try {
    // Verify ownership
    const charResult = await pool.query(
      'SELECT user_id FROM characters WHERE id = $1',
      [characterId]
    );

    if (charResult.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    if (charResult.rows[0].user_id !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Get all equipped items
    const equipped = await pool.query(`
      SELECT 
        i.*,
        g.damage,
        g.range,
        g.properties,
        g.ac_bonus,
        g.hands_required
      FROM inventory i
      LEFT JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
      WHERE i.character_id = $1 AND i.equipped = true
      ORDER BY 
        CASE i.equipped_slot
          WHEN 'primary_weapon' THEN 1
          WHEN 'secondary_weapon' THEN 2
          WHEN 'body_armor' THEN 3
          WHEN 'helmet' THEN 4
          WHEN 'shield' THEN 5
          ELSE 6
        END
    `, [characterId]);

    const acResult = await calculateAC(characterId);

    res.json({
      equipped: equipped.rows,
      ac: acResult.ac,
      acBreakdown: acResult.breakdown
    });

  } catch (error) {
    console.error('Error fetching equipped items:', error);
    res.status(500).json({ error: 'Failed to fetch equipped items' });
  }
});

// ============================================
// ENERGY CELL SYSTEM
// ============================================

// GET - Get available (unloaded) energy cells for a character
router.get('/energy-cells/available/:characterId', authenticateToken, async (req, res) => {
  const { characterId } = req.params;

  try {
    // Verify ownership
    const charResult = await pool.query(
      'SELECT user_id FROM characters WHERE id = $1',
      [characterId]
    );

    if (charResult.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    if (charResult.rows[0].user_id !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Get all energy cells that are NOT currently loaded in gear
    const cells = await pool.query(`
      SELECT * FROM inventory
      WHERE character_id = $1
        AND LOWER(item_name) LIKE '%energy cell%'
        AND (in_use_by_item_id IS NULL OR in_use_by_item_id = 0)
        AND quantity > 0
      ORDER BY id
    `, [characterId]);

    res.json(cells.rows);

  } catch (error) {
    console.error('Error fetching available energy cells:', error);
    res.status(500).json({ error: 'Failed to fetch energy cells' });
  }
});

// POST - Load energy cell into EC gear
router.post('/load-cell/:characterId/:itemId', authenticateToken, async (req, res) => {
  const { characterId, itemId } = req.params;
  const { energyCellId } = req.body;

  try {
    // Verify ownership
    const charResult = await pool.query(
      'SELECT user_id FROM characters WHERE id = $1',
      [characterId]
    );

    if (charResult.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    if (charResult.rows[0].user_id !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Verify the item belongs to character and has EC property
    const itemResult = await pool.query(`
      SELECT i.*, g.properties
      FROM inventory i
      LEFT JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
      WHERE i.id = $1 AND i.character_id = $2
    `, [itemId, characterId]);

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const item = itemResult.rows[0];
    const properties = item.properties || '';

    // Prevent loading energy cells into energy cells
    if (item.item_name.toLowerCase().includes('energy cell')) {
      return res.status(400).json({ error: 'Cannot load energy cells into other energy cells' });
    }

    if (!properties.includes('EC')) {
      return res.status(400).json({ error: 'This item does not require an energy cell' });
    }

    // Check if item already has a cell loaded
    if (item.loaded_energy_cell_id) {
      return res.status(400).json({ error: 'This item already has an energy cell loaded. Unload it first.' });
    }

    // Verify the energy cell exists and is available
    const cellResult = await pool.query(
      'SELECT * FROM inventory WHERE id = $1 AND character_id = $2 AND LOWER(item_name) LIKE \'%energy cell%\'',
      [energyCellId, characterId]
    );

    if (cellResult.rows.length === 0) {
      return res.status(404).json({ error: 'Energy cell not found' });
    }

    const cell = cellResult.rows[0];

    if (cell.in_use_by_item_id && cell.in_use_by_item_id !== 0) {
      return res.status(400).json({ error: 'This energy cell is already loaded in another item' });
    }

    // Handle stacked energy cells: split off one cell for loading
    let actualCellId = energyCellId;
    
    if (cell.quantity > 1) {
      // Reduce the quantity of the original stack
      await pool.query(
        'UPDATE inventory SET quantity = quantity - 1 WHERE id = $1',
        [energyCellId]
      );
      
      // Create a new inventory row for the single cell being loaded
      const newCellResult = await pool.query(`
        INSERT INTO inventory (
          character_id, item_name, item_type, description, 
          weight, quantity, damage, range, properties, in_use_by_item_id
        )
        VALUES ($1, $2, $3, $4, $5, 1, $6, $7, $8, $9)
        RETURNING id
      `, [
        characterId,
        cell.item_name,
        cell.item_type,
        cell.description,
        cell.weight,
        cell.damage,
        cell.range,
        cell.properties,
        itemId
      ]);
      
      actualCellId = newCellResult.rows[0].id;
    } else {
      // Single cell, just mark it as in use
      await pool.query(
        'UPDATE inventory SET in_use_by_item_id = $1 WHERE id = $2',
        [itemId, energyCellId]
      );
    }

    // Load the cell into the item
    await pool.query(
      'UPDATE inventory SET loaded_energy_cell_id = $1 WHERE id = $2',
      [actualCellId, itemId]
    );

    // Log activity
    await pool.query(`
      INSERT INTO activity_log (character_id, action_type, description)
      VALUES ($1, 'energy_cell_loaded', $2)
    `, [characterId, `Loaded energy cell into ${item.item_name}`]);

    // Emit socket event
    const io = req.app.get('io');
    io.to(`character_${characterId}`).emit('character_updated', {
      message: `Energy cell loaded into ${item.item_name}!`
    });
    io.emit('admin_refresh'); // Notify admin panel

    res.json({ message: 'Energy cell loaded successfully' });

  } catch (error) {
    console.error('Error loading energy cell:', error);
    res.status(500).json({ error: 'Failed to load energy cell' });
  }
});

// POST - Unload energy cell from EC gear
router.post('/unload-cell/:characterId/:itemId', authenticateToken, async (req, res) => {
  const { characterId, itemId } = req.params;

  try {
    // Verify ownership
    const charResult = await pool.query(
      'SELECT user_id FROM characters WHERE id = $1',
      [characterId]
    );

    if (charResult.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    if (charResult.rows[0].user_id !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Get the item with loaded cell
    const itemResult = await pool.query(
      'SELECT * FROM inventory WHERE id = $1 AND character_id = $2',
      [itemId, characterId]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const item = itemResult.rows[0];

    if (!item.loaded_energy_cell_id) {
      return res.status(400).json({ error: 'No energy cell loaded in this item' });
    }

    const cellId = item.loaded_energy_cell_id;

    // Get the energy cell details
    const cellResult = await pool.query(
      'SELECT * FROM inventory WHERE id = $1',
      [cellId]
    );

    if (cellResult.rows.length === 0) {
      return res.status(404).json({ error: 'Loaded energy cell not found' });
    }

    const cell = cellResult.rows[0];

    // Unload the cell from the item
    await pool.query(
      'UPDATE inventory SET loaded_energy_cell_id = NULL WHERE id = $1',
      [itemId]
    );

    // Try to merge this cell back into an existing stack
    const existingStackResult = await pool.query(`
      SELECT id, quantity FROM inventory 
      WHERE character_id = $1 
        AND LOWER(item_name) = LOWER($2)
        AND (in_use_by_item_id IS NULL OR in_use_by_item_id = 0)
        AND id != $3
      LIMIT 1
    `, [characterId, cell.item_name, cellId]);

    if (existingStackResult.rows.length > 0) {
      // Merge back into existing stack
      await pool.query(
        'UPDATE inventory SET quantity = quantity + 1 WHERE id = $1',
        [existingStackResult.rows[0].id]
      );
      
      // Delete the single cell
      await pool.query('DELETE FROM inventory WHERE id = $1', [cellId]);
    } else {
      // No stack to merge into, just mark this cell as available
      await pool.query(
        'UPDATE inventory SET in_use_by_item_id = NULL WHERE id = $1',
        [cellId]
      );
    }

    // Log activity
    await pool.query(`
      INSERT INTO activity_log (character_id, action_type, description)
      VALUES ($1, 'energy_cell_unloaded', $2)
    `, [characterId, `Unloaded energy cell from ${item.item_name}`]);

    // Emit socket event
    const io = req.app.get('io');
    io.to(`character_${characterId}`).emit('character_updated', {
      message: `Energy cell unloaded from ${item.item_name}`
    });
    io.emit('admin_refresh'); // Notify admin panel

    res.json({ message: 'Energy cell unloaded successfully' });

  } catch (error) {
    console.error('Error unloading energy cell:', error);
    res.status(500).json({ error: 'Failed to unload energy cell' });
  }
});

// GET - Get powered gear status (items that need EC and their cell status)
router.get('/powered-gear/:characterId', authenticateToken, async (req, res) => {
  const { characterId } = req.params;

  try {
    // Verify ownership
    const charResult = await pool.query(
      'SELECT user_id FROM characters WHERE id = $1',
      [characterId]
    );

    if (charResult.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    if (charResult.rows[0].user_id !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Get all EC gear with their loaded cell status (but NOT energy cells themselves)
    const poweredGear = await pool.query(`
      SELECT 
        i.*,
        g.properties,
        cell.item_name as loaded_cell_name
      FROM inventory i
      LEFT JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
      LEFT JOIN inventory cell ON i.loaded_energy_cell_id = cell.id
      WHERE i.character_id = $1
        AND g.properties LIKE '%EC%'
        AND LOWER(i.item_name) NOT LIKE '%energy cell%'
      ORDER BY 
        CASE i.item_type
          WHEN 'weapon' THEN 1
          WHEN 'armor' THEN 2
          WHEN 'gear' THEN 3
          ELSE 4
        END,
        i.item_name
    `, [characterId]);

    res.json(poweredGear.rows);

  } catch (error) {
    console.error('Error fetching powered gear:', error);
    res.status(500).json({ error: 'Failed to fetch powered gear' });
  }
});

// ============================================
// PLAYER-TO-PLAYER TRADING
// ============================================

// POST - Gift item to another character
router.post('/gift-item/:characterId/:itemId', authenticateToken, async (req, res) => {
  const { characterId, itemId } = req.params;
  const { recipientId, quantity } = req.body;

  try {
    // Validation
    if (!recipientId) {
      return res.status(400).json({ error: 'Recipient is required' });
    }

    if (characterId === recipientId) {
      return res.status(400).json({ error: 'Cannot gift items to yourself' });
    }

    // Verify ownership of sender character (admins can gift from any character)
    let senderQuery;
    let senderParams;

    if (req.user.isAdmin) {
      // Admins can gift from any character
      senderQuery = 'SELECT * FROM characters WHERE id = $1';
      senderParams = [characterId];
    } else {
      // Regular users can only gift from their own characters
      senderQuery = 'SELECT * FROM characters WHERE id = $1 AND user_id = $2';
      senderParams = [characterId, req.user.userId];
    }

    const senderCheck = await pool.query(senderQuery, senderParams);

    if (senderCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found or not owned by you' });
    }

    const sender = senderCheck.rows[0];

    // Get the item
    const itemResult = await pool.query(
      'SELECT * FROM inventory WHERE id = $1 AND character_id = $2',
      [itemId, characterId]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found in your inventory' });
    }

    const item = itemResult.rows[0];

    // Check if item is equipped
    if (item.equipped) {
      return res.status(400).json({ error: 'Cannot gift equipped items. Unequip it first.' });
    }

    // Check if energy cell is loaded in gear
    if (item.item_name.toLowerCase().includes('energy cell') && item.in_use_by_item_id) {
      return res.status(400).json({ 
        error: 'This energy cell is currently loaded in gear. Unload it first.' 
      });
    }

    // Check if item has loaded energy cell
    if (item.loaded_energy_cell_id) {
      return res.status(400).json({ 
        error: 'This item has a loaded energy cell. Unload it before gifting.' 
      });
    }

    // Get recipient character
    const recipientResult = await pool.query(
      'SELECT * FROM characters WHERE id = $1',
      [recipientId]
    );

    if (recipientResult.rows.length === 0) {
      return res.status(404).json({ error: 'Recipient character not found' });
    }

    const recipient = recipientResult.rows[0];

    // Determine quantity to transfer
    const transferQty = quantity && quantity < item.quantity ? quantity : item.quantity;

    if (transferQty <= 0 || transferQty > item.quantity) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    // Get item weight for inventory space check
    const gearResult = await pool.query(
      'SELECT weight FROM gear_database WHERE LOWER(name) = LOWER($1)',
      [item.item_name]
    );

    const itemWeight = gearResult.rows.length > 0 ? parseFloat(gearResult.rows[0].weight) : 1;

    // Calculate slots needed
    let slotsNeeded = 0;
    if (itemWeight === 0) {
      // FREE items (except backpack after first)
      if (item.item_name.toLowerCase().includes('backpack')) {
        const backpackCount = await pool.query(
          `SELECT COUNT(*) FROM inventory 
           WHERE character_id = $1 AND item_name ILIKE '%backpack%'`,
          [recipientId]
        );
        if (parseInt(backpackCount.rows[0].count) > 0) {
          slotsNeeded = 1;
        }
      }
    } else if (itemWeight === 0.5) {
      slotsNeeded = Math.ceil(transferQty / 2);
    } else {
      slotsNeeded = itemWeight * transferQty;
    }

    // Check recipient's inventory space
    const currentSlots = await calculateSlotsUsed(recipientId);
    const maxSlots = await getMaxSlots(recipientId);
    const availableSlots = maxSlots - currentSlots;

    if (slotsNeeded > availableSlots) {
      return res.status(400).json({ 
        error: `Recipient doesn't have enough inventory space. Needs ${slotsNeeded} slots, but only ${availableSlots} available.` 
      });
    }

    // Perform transfer
    await pool.query('BEGIN');

    try {
      // Check if recipient already has this item (for stacking)
      const existingItem = await pool.query(
        'SELECT * FROM inventory WHERE character_id = $1 AND LOWER(item_name) = LOWER($2)',
        [recipientId, item.item_name]
      );

      if (existingItem.rows.length > 0) {
        // Stack with existing item
        await pool.query(
          'UPDATE inventory SET quantity = quantity + $1 WHERE id = $2',
          [transferQty, existingItem.rows[0].id]
        );
      } else {
        // Create new item for recipient
        await pool.query(`
          INSERT INTO inventory (
            character_id, item_name, item_type, description, weight, quantity,
            damage, range, properties
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [
          recipientId,
          item.item_name,
          item.item_type,
          item.description,
          item.weight,
          transferQty,
          item.damage,
          item.range,
          item.properties
        ]);
      }

      // Remove from sender
      if (transferQty < item.quantity) {
        // Partial transfer
        await pool.query(
          'UPDATE inventory SET quantity = quantity - $1 WHERE id = $2',
          [transferQty, itemId]
        );
      } else {
        // Full transfer
        await pool.query('DELETE FROM inventory WHERE id = $1', [itemId]);
      }

      // Log activity
      await pool.query(
        `INSERT INTO activity_log (character_id, action_type, description)
         VALUES ($1, 'item_gifted', $2)`,
        [characterId, `Gifted ${transferQty}× ${item.item_name} to ${recipient.name}`]
      );

      await pool.query(
        `INSERT INTO activity_log (character_id, action_type, description)
         VALUES ($1, 'item_received', $2)`,
        [recipientId, `Received ${transferQty}× ${item.item_name} from ${sender.name}`]
      );

      await pool.query('COMMIT');

      // Emit socket events
      const io = req.app.get('io');
      io.to(`character_${characterId}`).emit('inventory_updated', {
        message: `Gifted ${transferQty}× ${item.item_name} to ${recipient.name}`
      });
      io.to(`character_${recipientId}`).emit('inventory_updated', {
        message: `Received ${transferQty}× ${item.item_name} from ${sender.name}`
      });
      io.emit('admin_refresh'); // Notify admin panel

      res.json({
        message: `Successfully gifted ${transferQty}× ${item.item_name} to ${recipient.name}`
      });

    } catch (error) {
      await pool.query('ROLLBACK');
      throw error;
    }

  } catch (error) {
    console.error('Error gifting item:', error);
    res.status(500).json({ error: 'Failed to gift item' });
  }
});

// DELETE - Discard item (player action)
router.delete('/discard/:characterId/:itemId', authenticateToken, async (req, res) => {
  const { characterId, itemId } = req.params;
  const { quantity } = req.body;

  try {
    // Verify ownership
    const charCheck = await pool.query(
      'SELECT * FROM characters WHERE id = $1 AND user_id = $2',
      [characterId, req.user.userId]
    );

    if (charCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found or not owned by you' });
    }

    // Get the item
    const itemResult = await pool.query(
      'SELECT * FROM inventory WHERE id = $1 AND character_id = $2',
      [itemId, characterId]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found in your inventory' });
    }

    const item = itemResult.rows[0];

    // Check if item is equipped
    if (item.equipped) {
      return res.status(400).json({ error: 'Cannot discard equipped items. Unequip it first.' });
    }

    // Check if energy cell is loaded in gear
    if (item.item_name.toLowerCase().includes('energy cell') && item.in_use_by_item_id) {
      return res.status(400).json({ 
        error: 'This energy cell is currently loaded in gear. Unload it first.' 
      });
    }

    // Check if item has loaded energy cell
    if (item.loaded_energy_cell_id) {
      return res.status(400).json({ 
        error: 'This item has a loaded energy cell. Unload it before discarding.' 
      });
    }

    const discardQty = quantity && quantity < item.quantity ? quantity : item.quantity;

    if (discardQty <= 0 || discardQty > item.quantity) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    // Perform discard
    if (discardQty < item.quantity) {
      // Partial discard
      await pool.query(
        'UPDATE inventory SET quantity = quantity - $1 WHERE id = $2',
        [discardQty, itemId]
      );
      
      await pool.query(
        `INSERT INTO activity_log (character_id, action_type, description)
         VALUES ($1, 'item_discarded', $2)`,
        [characterId, `Discarded ${discardQty}× ${item.item_name} (${item.quantity - discardQty} remaining)`]
      );
    } else {
      // Full discard
      await pool.query('DELETE FROM inventory WHERE id = $1', [itemId]);
      
      await pool.query(
        `INSERT INTO activity_log (character_id, action_type, description)
         VALUES ($1, 'item_discarded', $2)`,
        [characterId, `Discarded ${item.item_name}`]
      );
    }

    // Emit socket event
    const io = req.app.get('io');
    io.to(`character_${characterId}`).emit('inventory_updated', {
      message: `Discarded ${discardQty}× ${item.item_name}`
    });
    io.emit('admin_refresh'); // Notify admin panel

    res.json({
      message: `Successfully discarded ${discardQty}× ${item.item_name}`,
      remainingQuantity: discardQty < item.quantity ? item.quantity - discardQty : 0
    });

  } catch (error) {
    console.error('Error discarding item:', error);
    res.status(500).json({ error: 'Failed to discard item' });
  }
});

// ============================================
// CONSUMABLE SYSTEM
// ============================================

// POST - Use consumable (player action)
router.post('/use-consumable/:characterId/:itemId', authenticateToken, async (req, res) => {
  const { characterId, itemId } = req.params;

  try {
    // Verify ownership
    const charResult = await pool.query(
      'SELECT user_id FROM characters WHERE id = $1',
      [characterId]
    );

    if (charResult.rows.length === 0) {
      return res.status(404).json({ error: 'Character not found' });
    }

    if (charResult.rows[0].user_id !== req.user.userId && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Get the consumable item
    const itemResult = await pool.query(
      'SELECT * FROM inventory WHERE id = $1 AND character_id = $2',
      [itemId, characterId]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const item = itemResult.rows[0];

    // Verify it's a consumable
    if (item.item_type !== 'consumable') {
      return res.status(400).json({ error: 'This item is not consumable' });
    }

    // Check if it's an energy cell that's currently in use
    if (item.item_name.toLowerCase().includes('energy cell') && item.in_use_by_item_id) {
      return res.status(400).json({ 
        error: 'This energy cell is currently loaded in gear. Unload it first.' 
      });
    }

    const newQuantity = item.quantity - 1;

    if (newQuantity <= 0) {
      // Remove the item entirely
      await pool.query('DELETE FROM inventory WHERE id = $1', [itemId]);
      
      await pool.query(`
        INSERT INTO activity_log (character_id, action_type, description)
        VALUES ($1, 'consumable_used', $2)
      `, [characterId, `Used last ${item.item_name}`]);

    } else {
      // Decrement quantity
      await pool.query(
        'UPDATE inventory SET quantity = $1 WHERE id = $2',
        [newQuantity, itemId]
      );

      await pool.query(`
        INSERT INTO activity_log (character_id, action_type, description)
        VALUES ($1, 'consumable_used', $2)
      `, [characterId, `Used 1× ${item.item_name} (${newQuantity} remaining)`]);
    }

    // Emit socket event
    const io = req.app.get('io');
    io.to(`character_${characterId}`).emit('character_updated', {
      message: `Used ${item.item_name}${newQuantity > 0 ? ` (${newQuantity} remaining)` : ''}`
    });

    res.json({ 
      message: 'Consumable used successfully',
      remainingQuantity: newQuantity
    });

  } catch (error) {
    console.error('Error using consumable:', error);
    res.status(500).json({ error: 'Failed to use consumable' });
  }
});

module.exports = router;