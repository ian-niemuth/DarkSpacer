-- Migration 003: Add Equipment System
-- Adds equipped_slot tracking and armor DEX modifier rules

-- Add equipped_slot column to inventory
ALTER TABLE inventory 
ADD COLUMN IF NOT EXISTS equipped_slot VARCHAR(50),
ADD COLUMN IF NOT EXISTS equipped BOOLEAN DEFAULT false;

-- Add allows_dex_modifier to gear_database
ALTER TABLE gear_database
ADD COLUMN IF NOT EXISTS allows_dex_modifier BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS ac_bonus INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS hands_required INTEGER DEFAULT 1;

-- Update existing armor items with correct rules
-- Light Armor: 11+DEX (allows DEX)
UPDATE gear_database 
SET allows_dex_modifier = true, ac_bonus = 11, hands_required = 1
WHERE category = 'armor' AND subcategory = 'light';

-- Medium Armor: 13+DEX (allows DEX)
UPDATE gear_database 
SET allows_dex_modifier = true, ac_bonus = 13, hands_required = 1
WHERE category = 'armor' AND subcategory = 'medium';

-- Heavy Armor: 15 (NO DEX)
UPDATE gear_database 
SET allows_dex_modifier = false, ac_bonus = 15, hands_required = 1
WHERE category = 'armor' AND subcategory = 'heavy';

-- Energy Armor: 15 (NO DEX) 
UPDATE gear_database 
SET allows_dex_modifier = false, ac_bonus = 15, hands_required = 1
WHERE category = 'armor' AND subcategory = 'energy';

-- Helmets: +1 AC bonus
UPDATE gear_database 
SET ac_bonus = 1
WHERE name IN ('Helmet', 'Combat Helmet');

-- Shields: +2 AC bonus (uses secondary slot)
UPDATE gear_database 
SET ac_bonus = 2, hands_required = 1
WHERE name LIKE '%Shield%';

-- 2-Handed Weapons
UPDATE gear_database 
SET hands_required = 2
WHERE properties LIKE '%2H%' OR properties LIKE '%two-handed%';

-- 1-Handed Weapons (default)
UPDATE gear_database 
SET hands_required = 1
WHERE category = 'weapon' AND hands_required IS NULL;

-- Create index for faster equipped item queries
CREATE INDEX IF NOT EXISTS idx_inventory_equipped ON inventory(character_id, equipped_slot) WHERE equipped = true;

-- Add comments
COMMENT ON COLUMN inventory.equipped_slot IS 'Which slot this item is equipped in: primary_weapon, secondary_weapon, body_armor, helmet, shield';
COMMENT ON COLUMN gear_database.allows_dex_modifier IS 'Whether this armor allows DEX modifier to AC (light/medium = true, heavy = false)';
COMMENT ON COLUMN gear_database.ac_bonus IS 'Base AC for armor (11/13/15) or bonus AC for helmets/shields (+1/+2)';
COMMENT ON COLUMN gear_database.hands_required IS 'Number of hands required (1 or 2)';
