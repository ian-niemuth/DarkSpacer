// Additional routes for custom item management in gear_database
// These routes should be added to inventory.js

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
        COUNT(i.id) as usage_count,
        ARRAY_AGG(DISTINCT c.name) FILTER (WHERE c.name IS NOT NULL) as used_by_characters
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
