// Ship Purchase & Captain Management Routes
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// ============================================
// CAPTAIN MANAGEMENT
// ============================================

// PUT set/remove captain for ship
router.put('/:shipId/captain', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { shipId } = req.params;
    const { character_id, is_captain } = req.body;
    
    await client.query('BEGIN');
    
    // Check if requester is admin or current captain
    const shipResult = await client.query(`
      SELECT s.*, 
        (SELECT character_id FROM ship_crew_assignments 
         WHERE ship_id = s.id AND is_captain = true LIMIT 1) as current_captain_id
      FROM ships s
      WHERE s.id = $1
    `, [shipId]);
    
    if (shipResult.rows.length === 0) {
      throw new Error('Ship not found');
    }
    
    const ship = shipResult.rows[0];
    
    // Check if user has permission (DM or current captain)
    if (!req.user.isAdmin && ship.current_captain_id !== req.user.characterId) {
      throw new Error('Only the DM or current captain can change captain assignments');
    }
    
    if (is_captain) {
      // Remove captain status from all crew on this ship
      await client.query(
        'UPDATE ship_crew_assignments SET is_captain = false WHERE ship_id = $1',
        [shipId]
      );
      
      // Set new captain
      const result = await client.query(`
        UPDATE ship_crew_assignments 
        SET is_captain = true, crew_role = 'Captain'
        WHERE ship_id = $1 AND character_id = $2
        RETURNING *
      `, [shipId, character_id]);
      
      if (result.rows.length === 0) {
        throw new Error('Character not found in crew');
      }
    } else {
      // Remove captain status
      await client.query(`
        UPDATE ship_crew_assignments 
        SET is_captain = false
        WHERE ship_id = $1 AND character_id = $2
      `, [shipId, character_id]);
    }
    
    await client.query('COMMIT');
    
    res.json({ message: 'Captain status updated successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error updating captain:', error);
    res.status(500).json({ error: error.message || 'Failed to update captain' });
  } finally {
    client.release();
  }
});

// GET check if user is captain of ship
router.get('/:shipId/is-captain', authenticateToken, async (req, res) => {
  try {
    const { shipId } = req.params;
    
    const result = await pool.query(`
      SELECT EXISTS(
        SELECT 1 FROM ship_crew_assignments 
        WHERE ship_id = $1 
          AND character_id = $2 
          AND is_captain = true
      ) as is_captain
    `, [shipId, req.user.characterId]);
    
    res.json({ isCaptain: result.rows[0].is_captain });
  } catch (error) {
    console.error('Error checking captain status:', error);
    res.status(500).json({ error: 'Failed to check captain status' });
  }
});

// ============================================
// CREDIT POOLING
// ============================================

// GET ship credit pool
router.get('/:shipId/credit-pool', authenticateToken, async (req, res) => {
  try {
    const { shipId } = req.params;
    
    const poolResult = await pool.query(`
      SELECT * FROM ship_credit_pool WHERE ship_id = $1
    `, [shipId]);
    
    const contributionsResult = await pool.query(`
      SELECT scc.*, c.name as character_name
      FROM ship_credit_contributions scc
      JOIN characters c ON scc.character_id = c.id
      WHERE scc.ship_id = $1
      ORDER BY scc.contributed_at DESC
    `, [shipId]);
    
    res.json({
      pool: poolResult.rows[0] || { pooled_credits: 0 },
      contributions: contributionsResult.rows
    });
  } catch (error) {
    console.error('Error fetching credit pool:', error);
    res.status(500).json({ error: 'Failed to fetch credit pool' });
  }
});

// POST contribute credits to ship pool
router.post('/:shipId/credit-pool/contribute', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { shipId } = req.params;
    const { amount, note } = req.body;
    
    if (amount <= 0) {
      throw new Error('Contribution amount must be positive');
    }
    
    await client.query('BEGIN');
    
    // Check if character has enough credits
    const characterResult = await client.query(
      'SELECT credits FROM characters WHERE id = $1',
      [req.user.characterId]
    );
    
    if (characterResult.rows.length === 0) {
      throw new Error('Character not found');
    }
    
    const character = characterResult.rows[0];
    
    if (character.credits < amount) {
      throw new Error('Insufficient credits');
    }
    
    // Deduct credits from character
    await client.query(
      'UPDATE characters SET credits = credits - $1 WHERE id = $2',
      [amount, req.user.characterId]
    );
    
    // Add to ship credit pool
    await client.query(`
      INSERT INTO ship_credit_pool (ship_id, pooled_credits)
      VALUES ($1, $2)
      ON CONFLICT (ship_id) 
      DO UPDATE SET pooled_credits = ship_credit_pool.pooled_credits + $2,
                    updated_at = CURRENT_TIMESTAMP
    `, [shipId, amount]);
    
    // Record contribution
    await client.query(`
      INSERT INTO ship_credit_contributions (ship_id, character_id, amount, note)
      VALUES ($1, $2, $3, $4)
    `, [shipId, req.user.characterId, amount, note]);
    
    await client.query('COMMIT');
    
    res.json({ message: 'Credits contributed successfully', amount });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error contributing credits:', error);
    res.status(500).json({ error: error.message || 'Failed to contribute credits' });
  } finally {
    client.release();
  }
});

// ============================================
// PURCHASE REQUESTS
// ============================================

// GET all purchase requests for ship
router.get('/:shipId/purchases', authenticateToken, async (req, res) => {
  try {
    const { shipId } = req.params;
    
    const result = await pool.query(`
      SELECT sp.*,
        c1.name as requested_by_name,
        c2.name as reviewed_by_name
      FROM ship_purchases sp
      LEFT JOIN characters c1 ON sp.requested_by = c1.id
      LEFT JOIN characters c2 ON sp.reviewed_by = c2.id
      WHERE sp.ship_id = $1
      ORDER BY sp.created_at DESC
    `, [shipId]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
});

// POST create purchase request
router.post('/:shipId/purchases', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { shipId } = req.params;
    const { purchase_type, item_id, item_name, cost, notes } = req.body;
    
    await client.query('BEGIN');
    
    // Check if character is crew member
    const crewCheck = await client.query(
      'SELECT * FROM ship_crew_assignments WHERE ship_id = $1 AND character_id = $2',
      [shipId, req.user.characterId]
    );
    
    if (crewCheck.rows.length === 0 && !req.user.isAdmin) {
      throw new Error('Only crew members can request purchases');
    }
    
    // Check if ship has enough credits (pool + character owner credits)
    const shipResult = await client.query(`
      SELECT s.*, 
        COALESCE(scp.pooled_credits, 0) as pooled_credits,
        c.credits as owner_credits
      FROM ships s
      LEFT JOIN ship_credit_pool scp ON s.id = scp.ship_id
      LEFT JOIN characters c ON s.owner_type = 'character' AND s.owner_id = c.id
      WHERE s.id = $1
    `, [shipId]);
    
    const ship = shipResult.rows[0];
    const availableCredits = ship.pooled_credits + (ship.owner_credits || 0);
    
    if (availableCredits < cost) {
      throw new Error(`Insufficient credits. Available: ${availableCredits}, Required: ${cost}`);
    }
    
    // Create purchase request
    const result = await client.query(`
      INSERT INTO ship_purchases 
        (ship_id, purchase_type, item_id, item_name, cost, requested_by, notes, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
      RETURNING *
    `, [shipId, purchase_type, item_id, item_name, cost, req.user.characterId, notes]);
    
    await client.query('COMMIT');
    
    res.json(result.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating purchase request:', error);
    res.status(500).json({ error: error.message || 'Failed to create purchase request' });
  } finally {
    client.release();
  }
});

// PUT approve/reject purchase (Captain only)
router.put('/:shipId/purchases/:purchaseId', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { shipId, purchaseId } = req.params;
    const { status, notes } = req.body; // 'approved' or 'rejected'
    
    if (!['approved', 'rejected'].includes(status)) {
      throw new Error('Invalid status. Must be "approved" or "rejected"');
    }
    
    await client.query('BEGIN');
    
    // Check if user is captain or admin
    const captainCheck = await client.query(`
      SELECT is_captain FROM ship_crew_assignments 
      WHERE ship_id = $1 AND character_id = $2
    `, [shipId, req.user.characterId]);
    
    const isCaptain = captainCheck.rows[0]?.is_captain || false;
    
    if (!isCaptain && !req.user.isAdmin) {
      throw new Error('Only the captain or DM can approve/reject purchases');
    }
    
    // Get purchase details
    const purchaseResult = await client.query(
      'SELECT * FROM ship_purchases WHERE id = $1 AND ship_id = $2',
      [purchaseId, shipId]
    );
    
    if (purchaseResult.rows.length === 0) {
      throw new Error('Purchase not found');
    }
    
    const purchase = purchaseResult.rows[0];
    
    if (purchase.status !== 'pending') {
      throw new Error('Purchase has already been reviewed');
    }
    
    // Update purchase status
    await client.query(`
      UPDATE ship_purchases 
      SET status = $1, 
          reviewed_by = $2, 
          reviewed_at = CURRENT_TIMESTAMP,
          notes = COALESCE($3, notes)
      WHERE id = $4
    `, [status, req.user.characterId, notes, purchaseId]);
    
    if (status === 'approved') {
      // Deduct cost from ship credit pool (or owner if character-owned ship)
      const shipResult = await client.query(
        'SELECT owner_type, owner_id FROM ships WHERE id = $1',
        [shipId]
      );
      const ship = shipResult.rows[0];
      
      // Try to deduct from pool first
      const poolResult = await client.query(
        'SELECT pooled_credits FROM ship_credit_pool WHERE ship_id = $1',
        [shipId]
      );
      
      let remainingCost = purchase.cost;
      
      if (poolResult.rows.length > 0 && poolResult.rows[0].pooled_credits > 0) {
        const poolCredits = poolResult.rows[0].pooled_credits;
        const deductFromPool = Math.min(poolCredits, remainingCost);
        
        await client.query(
          'UPDATE ship_credit_pool SET pooled_credits = pooled_credits - $1 WHERE ship_id = $2',
          [deductFromPool, shipId]
        );
        
        remainingCost -= deductFromPool;
      }
      
      // If remaining cost and ship is character-owned, deduct from owner
      if (remainingCost > 0 && ship.owner_type === 'character' && ship.owner_id) {
        await client.query(
          'UPDATE characters SET credits = credits - $1 WHERE id = $2',
          [remainingCost, ship.owner_id]
        );
      }
      
      // Install the purchased item based on type
      if (purchase.purchase_type === 'component') {
        await client.query(`
          INSERT INTO ship_components (ship_id, component_template_id, is_advanced)
          VALUES ($1, $2, false)
        `, [shipId, purchase.item_id]);
      } else if (purchase.purchase_type === 'armor') {
        // Remove old armor if exists
        await client.query('DELETE FROM ship_armor WHERE ship_id = $1', [shipId]);
        // Install new armor
        await client.query(`
          INSERT INTO ship_armor (ship_id, armor_template_id)
          VALUES ($1, $2)
        `, [shipId, purchase.item_id]);
      } else if (purchase.purchase_type === 'weapon') {
        // Weapons need to be added to an array - will be handled by admin
        // Just mark as purchased for now
      } else if (purchase.purchase_type === 'upgrade') {
        // Handle stat upgrades (HP, AC, Slots)
        // Will be handled by specific upgrade endpoints
      }
    }
    
    await client.query('COMMIT');
    
    res.json({ message: `Purchase ${status} successfully` });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error reviewing purchase:', error);
    res.status(500).json({ error: error.message || 'Failed to review purchase' });
  } finally {
    client.release();
  }
});

module.exports = router;
