-- Migration 003: Add equipment system columns
-- Adds equipped_slot tracking and AC calculation support

-- ============================================
-- STEP 1: Add equipped_slot to inventory
-- ============================================

ALTER TABLE inventory 
ADD COLUMN IF NOT EXISTS equipped_slot VARCHAR(50);

-- Valid values: 'primary_weapon', 'secondary_weapon', 'body_armor', 'helmet', 'shield', NULL (unequipped)

-- ============================================
-- STEP 2: Add armor properties to gear_database
-- ============================================

-- Flag to indicate if armor allows DEX modifier to AC
ALTER TABLE gear_database 
ADD COLUMN IF NOT EXISTS allows_dex_modifier BOOLEAN DEFAULT TRUE;

-- Base AC value for armor (replaces ac_bonus for clarity)
-- Light Armor = 11, Medium = 13, Heavy = 15, Energy = 15
ALTER TABLE gear_database 
ADD COLUMN IF NOT EXISTS base_ac INTEGER DEFAULT NULL;

-- ============================================
-- STEP 3: Update armor items with correct flags
-- ============================================

-- Light Armor: AC 11 + DEX
UPDATE gear_database 
SET allows_dex_modifier = TRUE, base_ac = 11
WHERE name = 'Light Armor';

-- Medium Armor: AC 13 + DEX
UPDATE gear_database 
SET allows_dex_modifier = TRUE, base_ac = 13
WHERE name = 'Medium Armor';

-- Heavy Armor: AC 15 (no DEX)
UPDATE gear_database 
SET allows_dex_modifier = FALSE, base_ac = 15
WHERE name = 'Heavy Armor';

-- Energy Armor: AC 15 (no DEX) 
UPDATE gear_database 
SET allows_dex_modifier = FALSE, base_ac = 15
WHERE name = 'Energy Armor';

-- Helmet, Shields have ac_bonus, not base_ac (they add to existing AC)
-- No changes needed for these

-- ============================================
-- STEP 4: Add index for equipped items
-- ============================================

CREATE INDEX IF NOT EXISTS idx_inventory_equipped 
ON inventory(character_id, equipped_slot) 
WHERE equipped_slot IS NOT NULL;

-- ============================================
-- Verification
-- ============================================

-- Check armor properties
SELECT name, category, base_ac, allows_dex_modifier, ac_bonus 
FROM gear_database 
WHERE category = 'armor' 
ORDER BY subcategory, name;

-- Should show:
-- Light Armor: base_ac=11, allows_dex=TRUE
-- Medium Armor: base_ac=13, allows_dex=TRUE
-- Heavy Armor: base_ac=15, allows_dex=FALSE
-- Energy Armor: base_ac=15, allows_dex=FALSE
-- Helmet: ac_bonus=1
-- Shields: ac_bonus=2
