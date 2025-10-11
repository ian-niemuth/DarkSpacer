// Ship Cargo/Inventory Routes
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { calculateArchetypeInventoryBonus } = require('../utils/archetypeAbilities');

router.use(authenticateToken);

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if user's character is crew on this ship
 */
async function isCrewMember(shipId, userId) {
  const result = await pool.query(`
    SELECT sca.*
    FROM ship_crew_assignments sca
    JOIN characters c ON sca.character_id = c.id
    WHERE sca.ship_id = $1 AND c.user_id = $2
  `, [shipId, userId]);

  return result.rows.length > 0;
}

/**
 * Calculate current cargo weight/slots used
 */
async function calculateCargoUsed(shipId) {
  const result = await pool.query(`
    SELECT COALESCE(SUM(weight * quantity), 0) as total_weight
    FROM ship_inventory
    WHERE ship_id = $1
  `, [shipId]);

  // Use parseFloat for decimal weights, then round to 2 decimal places
  return Math.round(parseFloat(result.rows[0].total_weight) * 100) / 100;
}

/**
 * Calculate current inventory slots used for a character
 */
async function calculateSlotsUsed(characterId) {
  const result = await pool.query(`
    SELECT
      i.item_name,
      i.quantity,
      COALESCE(g.weight, i.weight, 1) as item_weight
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

    // Check for FREE items (weight = 0)
    if (weight === 0) {
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

/**
 * Get character's max inventory slots
 */
async function getMaxSlots(characterId) {
  const result = await pool.query(
    'SELECT strength, constitution, archetype FROM characters WHERE id = $1',
    [characterId]
  );

  if (result.rows.length === 0) return 10;

  const { strength, constitution, archetype } = result.rows[0];
  const baseSlots = strength;
  const archetypeBonus = calculateArchetypeInventoryBonus(archetype, strength, constitution);

  return Math.max(10, baseSlots + archetypeBonus);
}

// ============================================
// CARGO ROUTES
// ============================================

// GET ship inventory/cargo
router.get('/:shipId/cargo', async (req, res) => {
  try {
    const { shipId } = req.params;
    
    // Check if user is admin OR crew member
    if (!req.user.isAdmin) {
      const isCrew = await isCrewMember(shipId, req.user.userId);
      if (!isCrew) {
        return res.status(403).json({ error: 'Must be crew member to view ship cargo' });
      }
    }
    
    // Get ship details
    const shipResult = await pool.query(
      'SELECT * FROM ships WHERE id = $1',
      [shipId]
    );
    
    if (shipResult.rows.length === 0) {
      return res.status(404).json({ error: 'Ship not found' });
    }
    
    const ship = shipResult.rows[0];
    
    // Get cargo inventory
    const cargoResult = await pool.query(
      'SELECT * FROM ship_inventory WHERE ship_id = $1 ORDER BY item_name',
      [shipId]
    );
    
    // Calculate cargo used
    const cargoUsed = await calculateCargoUsed(shipId);
    
    res.json({
      ship: {
        id: ship.id,
        name: ship.name,
        cargo_capacity: ship.cargo_capacity,
        cargo_used: cargoUsed,
        cargo_available: ship.cargo_capacity - cargoUsed
      },
      cargo: cargoResult.rows
    });
  } catch (error) {
    console.error('Error fetching ship cargo:', error);
    res.status(500).json({ error: 'Failed to fetch ship cargo' });
  }
});

// POST transfer item from character to ship
router.post('/:shipId/cargo/load', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { shipId } = req.params;
    let { characterId, itemId, quantity } = req.body;
    
    // VALIDATION: Ensure all values are integers
    characterId = parseInt(characterId);
    itemId = parseInt(itemId);
    quantity = parseInt(quantity);
    
    if (isNaN(characterId) || isNaN(itemId) || isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid character ID, item ID, or quantity' });
    }
    
    await client.query('BEGIN');
    
    // Verify character belongs to user
    const charResult = await client.query(
      'SELECT * FROM characters WHERE id = $1 AND user_id = $2',
      [characterId, req.user.userId]
    );
    
    if (charResult.rows.length === 0) {
      throw new Error('Character not found or not owned by you');
    }
    
    // Check if character is crew member (or user is admin)
    if (!req.user.isAdmin) {
      const isCrew = await isCrewMember(shipId, req.user.userId);
      if (!isCrew) {
        throw new Error('Character must be crew member to load cargo');
      }
    }
    
    // Get item from character inventory
    const itemResult = await client.query(
      'SELECT * FROM inventory WHERE id = $1 AND character_id = $2',
      [itemId, characterId]
    );
    
    if (itemResult.rows.length === 0) {
      throw new Error('Item not found in character inventory');
    }
    
    const item = itemResult.rows[0];
    const transferQty = quantity || item.quantity;
    
    if (transferQty > item.quantity) {
      throw new Error('Cannot transfer more than you have');
    }
    
    // Get ship
    const shipResult = await client.query(
      'SELECT * FROM ships WHERE id = $1',
      [shipId]
    );
    
    if (shipResult.rows.length === 0) {
      throw new Error('Ship not found');
    }
    
    const ship = shipResult.rows[0];
    
    // Check cargo capacity
    const cargoUsed = await calculateCargoUsed(shipId);
    const itemWeight = parseFloat(item.weight) * transferQty; // Support decimal weights
    
    if (cargoUsed + itemWeight > ship.cargo_capacity) {
      throw new Error(`Not enough cargo space. Available: ${ship.cargo_capacity - cargoUsed}, needed: ${itemWeight}`);
    }
    
    // Check if item already exists in ship cargo
    const existingResult = await client.query(
      'SELECT * FROM ship_inventory WHERE ship_id = $1 AND item_name = $2',
      [shipId, item.item_name]
    );
    
    if (existingResult.rows.length > 0) {
      // Update existing stack
      await client.query(
        'UPDATE ship_inventory SET quantity = quantity + $1 WHERE ship_id = $2 AND item_name = $3',
        [transferQty, shipId, item.item_name]
      );
    } else {
      // Create new entry
      await client.query(`
        INSERT INTO ship_inventory (
          ship_id, item_name, item_type, quantity, description, 
          weight, damage, range, properties
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        shipId, item.item_name, item.item_type, transferQty,
        item.description, item.weight, item.damage, item.range, item.properties
      ]);
    }
    
    // Remove/reduce from character inventory
    if (transferQty >= item.quantity) {
      // Remove entirely
      await client.query(
        'DELETE FROM inventory WHERE id = $1',
        [itemId]
      );
    } else {
      // Reduce quantity
      await client.query(
        'UPDATE inventory SET quantity = quantity - $1 WHERE id = $2',
        [transferQty, itemId]
      );
    }
    
    // Log activity
    await client.query(`
      INSERT INTO activity_log (character_id, action_type, description)
      VALUES ($1, 'cargo_loaded', $2)
    `, [
      characterId,
      `Loaded ${transferQty}× ${item.item_name} onto ${ship.name}`
    ]);
    
    await client.query('COMMIT');

    // Emit socket event
    const io = req.app.get('io');
    io.to(`ship_${shipId}`).emit('ship_updated', {
      message: `Cargo updated: Loaded ${transferQty}× ${item.item_name}`,
      shipId: shipId
    });

    res.json({
      message: `Loaded ${transferQty}× ${item.item_name} onto ship`,
      cargoUsed: cargoUsed + itemWeight,
      cargoAvailable: ship.cargo_capacity - (cargoUsed + itemWeight)
    });
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error loading cargo:', error);
    res.status(400).json({ error: error.message || 'Failed to load cargo' });
  } finally {
    client.release();
  }
});

// POST transfer item from ship to character
router.post('/:shipId/cargo/unload', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { shipId } = req.params;
    let { characterId, cargoItemId, quantity } = req.body;
    
    // VALIDATION: Ensure all values are integers
    characterId = parseInt(characterId);
    cargoItemId = parseInt(cargoItemId);
    if (quantity !== undefined) {
      quantity = parseInt(quantity);
      if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid quantity' });
      }
    }
    
    if (isNaN(characterId) || isNaN(cargoItemId)) {
      return res.status(400).json({ error: 'Invalid character ID or cargo item ID' });
    }
    
    await client.query('BEGIN');
    
    // Verify character belongs to user
    const charResult = await client.query(
      'SELECT * FROM characters WHERE id = $1 AND user_id = $2',
      [characterId, req.user.userId]
    );
    
    if (charResult.rows.length === 0) {
      throw new Error('Character not found or not owned by you');
    }
    
    // Check if character is crew member (or user is admin)
    if (!req.user.isAdmin) {
      const isCrew = await isCrewMember(shipId, req.user.userId);
      if (!isCrew) {
        throw new Error('Character must be crew member to unload cargo');
      }
    }
    
    // Get item from ship cargo
    const cargoResult = await client.query(
      'SELECT * FROM ship_inventory WHERE id = $1 AND ship_id = $2',
      [cargoItemId, shipId]
    );
    
    if (cargoResult.rows.length === 0) {
      throw new Error('Item not found in ship cargo');
    }
    
    const cargoItem = cargoResult.rows[0];
    const transferQty = quantity || cargoItem.quantity;

    if (transferQty > cargoItem.quantity) {
      throw new Error('Cannot unload more than available');
    }

    // Get ship
    const shipResult = await client.query(
      'SELECT * FROM ships WHERE id = $1',
      [shipId]
    );
    const ship = shipResult.rows[0];

    // Check character inventory capacity
    const itemWeight = parseFloat(cargoItem.weight) || 0;
    let slotsNeeded = 0;

    if (itemWeight === 0) {
      // FREE items
      slotsNeeded = 0;
    } else if (itemWeight === 0.5) {
      // "2 per slot" items
      slotsNeeded = Math.ceil(transferQty / 2);
    } else {
      // Standard items
      slotsNeeded = itemWeight * transferQty;
    }

    const currentSlots = await calculateSlotsUsed(characterId);
    const maxSlots = await getMaxSlots(characterId);
    const availableSlots = maxSlots - currentSlots;

    console.log('Cargo unload inventory check:', {
      characterId,
      itemName: cargoItem.item_name,
      transferQty,
      itemWeight,
      slotsNeeded,
      currentSlots,
      maxSlots,
      availableSlots
    });

    if (slotsNeeded > availableSlots) {
      throw new Error(
        `Not enough inventory space. Character has ${currentSlots}/${maxSlots} slots used. Needs ${slotsNeeded} more slots.`
      );
    }

    // Check if item already exists in character inventory
    const existingResult = await client.query(
      'SELECT * FROM inventory WHERE character_id = $1 AND item_name = $2',
      [characterId, cargoItem.item_name]
    );
    
    if (existingResult.rows.length > 0) {
      // Update existing stack
      await client.query(
        'UPDATE inventory SET quantity = quantity + $1 WHERE character_id = $2 AND item_name = $3',
        [transferQty, characterId, cargoItem.item_name]
      );
    } else {
      // Create new entry
      await client.query(`
        INSERT INTO inventory (
          character_id, item_name, item_type, quantity, description,
          weight, damage, range, properties
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        characterId, cargoItem.item_name, cargoItem.item_type, transferQty,
        cargoItem.description, cargoItem.weight, cargoItem.damage, 
        cargoItem.range, cargoItem.properties
      ]);
    }
    
    // Remove/reduce from ship cargo
    if (transferQty >= cargoItem.quantity) {
      // Remove entirely
      await client.query(
        'DELETE FROM ship_inventory WHERE id = $1',
        [cargoItemId]
      );
    } else {
      // Reduce quantity
      await client.query(
        'UPDATE ship_inventory SET quantity = quantity - $1 WHERE id = $2',
        [transferQty, cargoItemId]
      );
    }
    
    // Log activity
    await client.query(`
      INSERT INTO activity_log (character_id, action_type, description)
      VALUES ($1, 'cargo_unloaded', $2)
    `, [
      characterId,
      `Unloaded ${transferQty}× ${cargoItem.item_name} from ${ship.name}`
    ]);
    
    await client.query('COMMIT');

    const cargoUsed = await calculateCargoUsed(shipId);

    // Emit socket event
    const io = req.app.get('io');
    io.to(`ship_${shipId}`).emit('ship_updated', {
      message: `Cargo updated: Unloaded ${transferQty}× ${cargoItem.item_name}`,
      shipId: shipId
    });

    res.json({
      message: `Unloaded ${transferQty}× ${cargoItem.item_name} from ship`,
      cargoUsed: cargoUsed,
      cargoAvailable: ship.cargo_capacity - cargoUsed
    });
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error unloading cargo:', error);
    res.status(400).json({ error: error.message || 'Failed to unload cargo' });
  } finally {
    client.release();
  }
});

// ============================================
// ADMIN: ADD ITEM DIRECTLY TO CARGO
// ============================================
router.post('/:shipId/cargo/add-direct', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { shipId } = req.params;
    let { item_name, item_type, quantity, description, weight, damage, range, properties } = req.body;
    
    // Only admins can add items directly
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    // VALIDATION: Ensure numeric values are properly parsed
    quantity = parseInt(quantity);
    weight = parseFloat(weight) || 0; // Use parseFloat for decimal weights
    
    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }
    
    await client.query('BEGIN');
    
    // Get ship
    const shipResult = await client.query(
      'SELECT * FROM ships WHERE id = $1',
      [shipId]
    );
    
    if (shipResult.rows.length === 0) {
      throw new Error('Ship not found');
    }
    
    const ship = shipResult.rows[0];
    
    // Check cargo capacity
    const cargoUsed = await calculateCargoUsed(shipId);
    const itemWeight = (weight || 0) * quantity;
    
    if (cargoUsed + itemWeight > ship.cargo_capacity) {
      throw new Error(`Not enough cargo space. Available: ${ship.cargo_capacity - cargoUsed}, needed: ${itemWeight}`);
    }
    
    // Check if item already exists in ship cargo
    const existingResult = await client.query(
      'SELECT * FROM ship_inventory WHERE ship_id = $1 AND item_name = $2',
      [shipId, item_name]
    );
    
    if (existingResult.rows.length > 0) {
      // Update existing stack
      await client.query(
        'UPDATE ship_inventory SET quantity = quantity + $1 WHERE ship_id = $2 AND item_name = $3',
        [quantity, shipId, item_name]
      );
    } else {
      // Create new entry
      await client.query(`
        INSERT INTO ship_inventory (
          ship_id, item_name, item_type, quantity, description,
          weight, damage, range, properties
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        shipId, item_name, item_type, quantity, description,
        weight, damage, range, properties
      ]);
    }
    
    await client.query('COMMIT');

    // Emit socket event
    const io = req.app.get('io');
    io.to(`ship_${shipId}`).emit('ship_updated', {
      message: `Cargo updated: Added ${quantity}× ${item_name}`,
      shipId: shipId
    });

    res.json({
      message: `Added ${quantity}× ${item_name} to ship cargo`,
      cargoUsed: cargoUsed + itemWeight,
      cargoAvailable: ship.cargo_capacity - (cargoUsed + itemWeight)
    });
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error adding item directly:', error);
    res.status(400).json({ error: error.message || 'Failed to add item' });
  } finally {
    client.release();
  }
});

// ============================================
// ADMIN: REMOVE ITEM FROM CARGO
// ============================================
router.delete('/:shipId/cargo/:cargoItemId', async (req, res) => {
  try {
    const { shipId, cargoItemId } = req.params;
    
    // Only admins can remove items directly
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    
    const result = await pool.query(
      'DELETE FROM ship_inventory WHERE id = $1 AND ship_id = $2 RETURNING *',
      [cargoItemId, shipId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found in cargo' });
    }

    // Emit socket event
    const io = req.app.get('io');
    io.to(`ship_${shipId}`).emit('ship_updated', {
      message: `Cargo updated: Removed ${result.rows[0].item_name}`,
      shipId: shipId
    });

    res.json({
      message: `Removed ${result.rows[0].item_name} from cargo`,
      item: result.rows[0]
    });
  } catch (error) {
    console.error('Error removing item:', error);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

module.exports = router;
