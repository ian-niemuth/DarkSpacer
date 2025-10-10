// Ship Upgrade Routes
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Apply authentication to all routes
router.use(authenticateToken);

// ============================================
// STAT UPGRADES
// ============================================

// POST upgrade ship stat
router.post('/:id/upgrade-stat', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { id } = req.params;
    const { stat, increase } = req.body; // stat: 'strength', 'dexterity', etc. increase: number of +1s
    
    await client.query('BEGIN');
    
    // Get ship with owner
    const shipResult = await client.query(`
      SELECT s.*, c.credits as owner_credits, c.id as owner_character_id
      FROM ships s
      LEFT JOIN characters c ON s.owner_type = 'character' AND s.owner_id = c.id
      WHERE s.id = $1
    `, [id]);
    
    if (shipResult.rows.length === 0) {
      throw new Error('Ship not found');
    }
    
    const ship = shipResult.rows[0];
    
    // Validate stat name
    const validStats = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    if (!validStats.includes(stat)) {
      throw new Error('Invalid stat name');
    }
    
    // Calculate cost (1000cr per +1) - for DM reference
    const totalCost = increase * 1000;
    
    // Check new stat value won't exceed 18
    const currentValue = ship[stat];
    const newValue = currentValue + increase;
    
    if (newValue > 18) {
      throw new Error(`Cannot increase ${stat} above 18. Current: ${currentValue}, Requested: ${newValue}`);
    }
    
    // Update ship stat
    await client.query(`
      UPDATE ships 
      SET ${stat} = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
    `, [newValue, id]);
    
    // NOTE: DM must manually deduct credits from owner
    
    await client.query('COMMIT');
    
    res.json({ 
      message: `Successfully upgraded ${stat} from ${currentValue} to ${newValue}`,
      cost: totalCost,
      new_value: newValue
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error upgrading stat:', error);
    res.status(500).json({ error: error.message || 'Failed to upgrade stat' });
  } finally {
    client.release();
  }
});

// ============================================
// SLOT PURCHASES
// ============================================

// POST purchase additional slot
router.post('/:id/purchase-slot', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { id } = req.params;
    const { slot_type } = req.body; // 'system' or 'feature'
    
    await client.query('BEGIN');
    
    // Get ship with owner
    const shipResult = await client.query(`
      SELECT s.*, c.credits as owner_credits, c.id as owner_character_id
      FROM ships s
      LEFT JOIN characters c ON s.owner_type = 'character' AND s.owner_id = c.id
      WHERE s.id = $1
    `, [id]);
    
    if (shipResult.rows.length === 0) {
      throw new Error('Ship not found');
    }
    
    const ship = shipResult.rows[0];
    
    // Validate slot type
    if (slot_type !== 'system' && slot_type !== 'feature') {
      throw new Error('Invalid slot type. Must be "system" or "feature"');
    }
    
    // Cost is 1000cr per slot - for DM reference
    const cost = 1000;
    
    // Check if slot limit reached (max 10)
    const maxColumn = `${slot_type}_slots_max`;
    const currentMax = ship[maxColumn];
    
    if (currentMax >= 10) {
      throw new Error(`Cannot exceed 10 ${slot_type} slots. Current: ${currentMax}`);
    }
    
    // Purchase slot
    await client.query(`
      UPDATE ships 
      SET ${maxColumn} = ${maxColumn} + 1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
    `, [id]);
    
    // NOTE: DM must manually deduct credits from owner
    
    await client.query('COMMIT');
    
    res.json({ 
      message: `Successfully purchased 1 ${slot_type} slot`,
      cost: cost,
      new_max: currentMax + 1
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error purchasing slot:', error);
    res.status(500).json({ error: error.message || 'Failed to purchase slot' });
  } finally {
    client.release();
  }
});

// GET upgrade costs and availability
router.get('/:id/upgrade-info', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get ship with owner
    const shipResult = await pool.query(`
      SELECT s.*, c.credits as owner_credits, c.name as owner_name
      FROM ships s
      LEFT JOIN characters c ON s.owner_type = 'character' AND s.owner_id = c.id
      WHERE s.id = $1
    `, [id]);
    
    if (shipResult.rows.length === 0) {
      return res.status(404).json({ error: 'Ship not found' });
    }
    
    const ship = shipResult.rows[0];
    
    const upgradeInfo = {
      stats: {
        strength: { current: ship.strength, max: 18, cost_per_point: 1000 },
        dexterity: { current: ship.dexterity, max: 18, cost_per_point: 1000 },
        constitution: { current: ship.constitution, max: 18, cost_per_point: 1000 },
        intelligence: { current: ship.intelligence, max: 18, cost_per_point: 1000 },
        wisdom: { current: ship.wisdom, max: 18, cost_per_point: 1000 },
        charisma: { current: ship.charisma, max: 18, cost_per_point: 1000 }
      },
      slots: {
        system: { 
          current_max: ship.system_slots_max,
          max_allowed: 10,
          cost: 1000
        },
        feature: {
          current_max: ship.feature_slots_max,
          max_allowed: 10,
          cost: 1000
        }
      },
      owner: {
        type: ship.owner_type,
        name: ship.owner_name || 'Party',
        credits: ship.owner_credits || 0
      }
    };
    
    res.json(upgradeInfo);
  } catch (error) {
    console.error('Error getting upgrade info:', error);
    res.status(500).json({ error: 'Failed to get upgrade info' });
  }
});

module.exports = router;
