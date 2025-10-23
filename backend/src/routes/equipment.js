// backend/src/routes/equipment.js
// Equipment system - Equip/Unequip items with validation

const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Calculate character's AC based on equipped items
 */
async function calculateAC(characterId) {
  // Get character's DEX modifier
  const charResult = await pool.query(
    'SELECT dexterity FROM characters WHERE id = $1',
    [characterId]
  );
  const dex = charResult.rows[0]?.dexterity || 10;
  const dexMod = Math.floor((dex - 10) / 2);

  // Get equipped armor items
  const equipped = await pool.query(`
    SELECT 
      i.equipped_slot,
      g.name,
      g.category,
      g.subcategory,
      g.base_ac,
      g.ac_bonus,
      g.allows_dex_modifier
    FROM inventory i
    JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
    WHERE i.character_id = $1 
    AND i.equipped_slot IN ('body_armor', 'helmet', 'shield')
  `, [characterId]);

  let finalAC = 10; // Base AC
  let allowsDex = true; // Default: allow DEX modifier
  let acBreakdown = ['Base: 10'];

  for (const item of equipped.rows) {
    if (item.equipped_slot === 'body_armor') {
      // Body armor sets base AC
      if (item.base_ac) {
        finalAC = item.base_ac;
        allowsDex = item.allows_dex_modifier;
        acBreakdown = [`${item.name}: ${item.base_ac}`];
      }
    } else if (item.equipped_slot === 'helmet' || item.equipped_slot === 'shield') {
      // Helmet and shield add bonuses
      if (item.ac_bonus) {
        finalAC += item.ac_bonus;
        acBreakdown.push(`${item.name}: +${item.ac_bonus}`);
      }
    }
  }

  // Add DEX modifier if allowed
  if (allowsDex && dexMod !== 0) {
    finalAC += dexMod;
    acBreakdown.push(`DEX: ${dexMod >= 0 ? '+' : ''}${dexMod}`);
  }

  return {
    ac: finalAC,
    breakdown: acBreakdown.join(', ')
  };
}

/**
 * Get currently equipped items by slot
 */
async function getEquippedItems(characterId) {
  const result = await pool.query(`
    SELECT 
      i.id,
      i.item_name,
      i.equipped_slot,
      g.category,
      g.properties
    FROM inventory i
    LEFT JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
    WHERE i.character_id = $1 
    AND i.equipped_slot IS NOT NULL
  `, [characterId]);

  const equipped = {
    primary_weapon: null,
    secondary_weapon: null,
    body_armor: null,
    helmet: null,
    shield: null
  };

  result.rows.forEach(item => {
    equipped[item.equipped_slot] = item;
  });

  return equipped;
}

/**
 * Validate if an item can be equipped in a specific slot
 */
async function validateEquip(characterId, itemId, targetSlot) {
  // Get item details
  const itemResult = await pool.query(`
    SELECT 
      i.*,
      g.category,
      g.subcategory,
      g.properties
    FROM inventory i
    JOIN gear_database g ON LOWER(i.item_name) = LOWER(g.name)
    WHERE i.id = $1 AND i.character_id = $2
  `, [itemId, characterId]);

  if (itemResult.rows.length === 0) {
    return { valid: false, error: 'Item not found' };
  }

  const item = itemResult.rows[0];
  const properties = item.properties || '';
  const is2H = properties.includes('2H');
  const is1H = properties.includes('1H');
  const isWeapon = item.category === 'weapon';
  const isArmor = item.category === 'armor';
  const isShield = item.subcategory === 'shield';

  // Get currently equipped items
  const equipped = await getEquippedItems(characterId);

  // Validation logic
  if (isWeapon && !isShield) {
    // Regular weapon (not shield)
    if (!['primary_weapon', 'secondary_weapon'].includes(targetSlot)) {
      return { valid: false, error: 'Weapons must go in primary or secondary slot' };
    }

    if (is2H) {
      // 2H weapon needs BOTH weapon slots empty
      if (equipped.primary_weapon || equipped.secondary_weapon) {
        return { valid: false, error: '2H weapon requires both weapon slots to be empty' };
      }
    } else {
      // 1H weapon needs target slot empty
      if (equipped[targetSlot]) {
        return { valid: false, error: `${targetSlot} is already occupied` };
      }

      // Check if there's a shield equipped (shields block secondary weapon slot)
      if (targetSlot === 'secondary_weapon' && equipped.shield) {
        return { valid: false, error: 'Cannot equip secondary weapon while shield is equipped' };
      }

      // Also check if the OTHER weapon slot has a 2H weapon
      const otherSlot = targetSlot === 'primary_weapon' ? 'secondary_weapon' : 'primary_weapon';
      if (equipped[otherSlot]) {
        const otherWeaponIs2H = (equipped[otherSlot].properties || '').includes('2H');
        if (otherWeaponIs2H) {
          return { valid: false, error: 'Cannot equip weapon - other hand is occupied by 2H weapon' };
        }
      }
    }
  } else if (isShield) {
    // Shield takes shield slot + one weapon slot
    if (targetSlot !== 'shield') {
      return { valid: false, error: 'Shields must go in shield slot' };
    }

    // Check if we have room (need 1 weapon slot free)
    const primaryIs2H = equipped.primary_weapon && 
                       (equipped.primary_weapon.properties || '').includes('2H');
    const secondaryIs2H = equipped.secondary_weapon && 
                         (equipped.secondary_weapon.properties || '').includes('2H');

    if (primaryIs2H || secondaryIs2H) {
      return { valid: false, error: 'Cannot equip shield with 2H weapon' };
    }

    if (equipped.primary_weapon && equipped.secondary_weapon) {
      return { valid: false, error: 'Cannot equip shield while dual-wielding' };
    }

    if (equipped.shield) {
      return { valid: false, error: 'Shield slot already occupied' };
    }
  } else if (isArmor) {
    // Armor/Helmet
    const validSlots = {
      'body': 'body_armor',
      'accessory': 'helmet',
      'shield': 'shield'
    };

    const expectedSlot = validSlots[item.subcategory];
    if (targetSlot !== expectedSlot) {
      return { valid: false, error: `${item.subcategory} must go in ${expectedSlot} slot` };
    }

    if (equipped[targetSlot]) {
      return { valid: false, error: `${targetSlot} is already occupied` };
    }
  } else {
    return { valid: false, error: 'This item cannot be equipped' };
  }

  return { valid: true, item, is2H };
}

// ============================================
// CATALOG ROUTES
// ============================================

// GET all gear from catalog (for gear catalog view)
router.get('/all', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM gear_database
      ORDER BY category, name
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching gear catalog:', error);
    res.status(500).json({ error: 'Failed to fetch gear catalog' });
  }
});

// ============================================
// EQUIPMENT ROUTES
// ============================================

// POST - Equip an item
router.post('/equip/:characterId/:itemId', authenticateToken, async (req, res) => {
  const { characterId, itemId } = req.params;
  const { slot } = req.body; // Target slot: primary_weapon, secondary_weapon, body_armor, helmet, shield

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

    // Validate the equip action
    const validation = await validateEquip(characterId, itemId, slot);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const { item, is2H } = validation;

    // Equip the item
    if (is2H) {
      // 2H weapon takes both weapon slots
      await pool.query(
        'UPDATE inventory SET equipped_slot = $1 WHERE id = $2',
        ['primary_weapon', itemId]
      );
      
      // Mark that it also uses secondary (we'll handle this in display logic)
    } else {
      await pool.query(
        'UPDATE inventory SET equipped_slot = $1 WHERE id = $2',
        [slot, itemId]
      );
    }

    // Calculate new AC
    const acData = await calculateAC(characterId);

    // Update character's AC in database
    await pool.query(
      'UPDATE characters SET ac = $1 WHERE id = $2',
      [acData.ac, characterId]
    );

    // Emit socket event
    const io = req.app.get('io');
    io.to(`character_${characterId}`).emit('equipment_changed', {
      message: `Equipped ${item.item_name}`,
      ac: acData.ac
    });
    io.emit('admin_refresh'); // Notify admin panel

    res.json({
      message: 'Item equipped successfully',
      equipped_slot: is2H ? 'primary_weapon (2H)' : slot,
      ac: acData.ac,
      ac_breakdown: acData.breakdown
    });

  } catch (error) {
    console.error('Error equipping item:', error);
    res.status(500).json({ error: 'Failed to equip item' });
  }
});

// POST - Unequip an item
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

    // Get item details
    const itemResult = await pool.query(
      'SELECT * FROM inventory WHERE id = $1 AND character_id = $2 AND equipped_slot IS NOT NULL',
      [itemId, characterId]
    );

    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: 'Item not equipped' });
    }

    const item = itemResult.rows[0];

    // Unequip the item
    await pool.query(
      'UPDATE inventory SET equipped_slot = NULL WHERE id = $1',
      [itemId]
    );

    // Calculate new AC
    const acData = await calculateAC(characterId);

    // Update character's AC
    await pool.query(
      'UPDATE characters SET ac = $1 WHERE id = $2',
      [acData.ac, characterId]
    );

    // Emit socket event
    const io = req.app.get('io');
    io.to(`character_${characterId}`).emit('equipment_changed', {
      message: `Unequipped ${item.item_name}`,
      ac: acData.ac
    });
    io.emit('admin_refresh'); // Notify admin panel

    res.json({
      message: 'Item unequipped successfully',
      ac: acData.ac,
      ac_breakdown: acData.breakdown
    });

  } catch (error) {
    console.error('Error unequipping item:', error);
    res.status(500).json({ error: 'Failed to unequip item' });
  }
});

// GET - Get equipped items and AC breakdown
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

    const equipped = await getEquippedItems(characterId);
    const acData = await calculateAC(characterId);

    res.json({
      equipped,
      ac: acData.ac,
      ac_breakdown: acData.breakdown
    });

  } catch (error) {
    console.error('Error fetching equipped items:', error);
    res.status(500).json({ error: 'Failed to fetch equipped items' });
  }
});

module.exports = router;
