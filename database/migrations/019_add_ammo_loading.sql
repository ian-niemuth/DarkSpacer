-- ============================================================================
-- AMMO LOADING SYSTEM
-- ============================================================================
-- Adds ammo loading capability to weapons (similar to energy cell system)
-- Weapons with "Am" property can have Ammo Clips loaded into them
-- ============================================================================

-- Add loaded_ammo_id column to inventory
ALTER TABLE inventory
ADD COLUMN IF NOT EXISTS loaded_ammo_id INTEGER REFERENCES inventory(id);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_inventory_loaded_ammo ON inventory(loaded_ammo_id) WHERE loaded_ammo_id IS NOT NULL;

-- Add comment
COMMENT ON COLUMN inventory.loaded_ammo_id IS 'ID of the ammo clip loaded into this weapon (if applicable)';

-- Ensure Ammo Clips have proper item_type
UPDATE inventory
SET item_type = 'consumable'
WHERE LOWER(item_name) LIKE '%ammo%' AND item_type IS NULL;

UPDATE gear_database
SET category = 'consumable'
WHERE LOWER(name) LIKE '%ammo%' AND category NOT IN ('consumable');

-- ============================================================================
-- VERIFICATION
-- ============================================================================
SELECT 'Ammo loading system migration complete!' as status;

-- Show all weapons that can use ammo (have 'Am' property)
-- This includes pistols, rifles, and any custom weapons with 'Am' property
SELECT '--- Weapons that require ammo ---' as info;
SELECT id, name, category, subcategory, weapon_type, weapon_weight_class, properties, is_custom
FROM gear_database
WHERE properties LIKE '%Am%' AND category = 'weapon'
ORDER BY is_custom, subcategory, name;

-- Show available ammo clips
SELECT '--- Ammo Clips in gear database ---' as info;
SELECT id, name, category, cost, weight, description
FROM gear_database
WHERE LOWER(name) LIKE '%ammo%';
