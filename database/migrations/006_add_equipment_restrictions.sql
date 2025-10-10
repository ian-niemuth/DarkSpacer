-- Migration: Add Equipment Restriction Columns
-- Purpose: Add weapon_type, weapon_weight_class, and armor_type to gear_database

-- Add new columns to gear_database
ALTER TABLE gear_database 
ADD COLUMN IF NOT EXISTS weapon_type VARCHAR(20), -- 'melee', 'ranged', or NULL
ADD COLUMN IF NOT EXISTS weapon_weight_class VARCHAR(20), -- 'light', 'heavy', or NULL (standard weapons are neither)
ADD COLUMN IF NOT EXISTS armor_type VARCHAR(20), -- 'light', 'medium', 'heavy', 'energy', 'shield', or NULL
ADD COLUMN IF NOT EXISTS subcategory VARCHAR(100), -- More detailed category info
ADD COLUMN IF NOT EXISTS hands_required INTEGER DEFAULT 1, -- 1 or 2
ADD COLUMN IF NOT EXISTS allows_dex_modifier BOOLEAN DEFAULT TRUE, -- For armor AC calculations
ADD COLUMN IF NOT EXISTS is_custom BOOLEAN DEFAULT FALSE; -- Track custom items

-- Add new columns to inventory table for equipment tracking
ALTER TABLE inventory
ADD COLUMN IF NOT EXISTS equipped_slot VARCHAR(50), -- 'primary_weapon', 'secondary_weapon', 'body_armor', 'helmet', 'shield'
ADD COLUMN IF NOT EXISTS loaded_energy_cell_id INTEGER REFERENCES inventory(id), -- For EC gear
ADD COLUMN IF NOT EXISTS in_use_by_item_id INTEGER REFERENCES inventory(id); -- For energy cells loaded in gear

-- ============================================
-- UPDATE MELEE WEAPONS
-- ============================================

-- LIGHT MELEE WEAPONS
UPDATE gear_database SET 
    weapon_type = 'melee',
    weapon_weight_class = 'light',
    subcategory = 'Blunt, Light',
    hands_required = 1
WHERE name IN (
    'Club', 'Truncheon', 'Baton', 'Sap'
) OR (category = 'weapon' AND subcategory LIKE '%Blunt, Light%');

UPDATE gear_database SET 
    weapon_type = 'melee',
    weapon_weight_class = 'light',
    subcategory = 'Force, Light',
    hands_required = 1
WHERE name IN (
    'Force Baton', 'Stun Baton'
) OR (category = 'weapon' AND subcategory LIKE '%Force, Light%');

UPDATE gear_database SET 
    weapon_type = 'melee',
    weapon_weight_class = 'light',
    subcategory = 'Edged, Light',
    hands_required = 1
WHERE name IN (
    'Combat Blade', 'Dagger', 'Knife', 'Combat Knife'
) OR (category = 'weapon' AND subcategory LIKE '%Edged, Light%');

UPDATE gear_database SET 
    weapon_type = 'melee',
    weapon_weight_class = 'light',
    subcategory = 'Vibro, Light',
    hands_required = 1
WHERE name IN (
    'Vibro-Knife', 'Vibro-Dagger'
) OR (category = 'weapon' AND subcategory LIKE '%Vibro, Light%');

-- STANDARD MELEE WEAPONS (no weight class - can be used by Strong archetype)
UPDATE gear_database SET 
    weapon_type = 'melee',
    weapon_weight_class = NULL,
    subcategory = 'Blunt',
    hands_required = 1
WHERE name IN (
    'Mace', 'Warhammer', 'Hammer'
) OR (category = 'weapon' AND subcategory = 'Blunt' AND subcategory NOT LIKE '%Light%' AND subcategory NOT LIKE '%Heavy%');

UPDATE gear_database SET 
    weapon_type = 'melee',
    weapon_weight_class = NULL,
    subcategory = 'Force',
    hands_required = 1
WHERE name IN (
    'Force Hammer', 'Force Mace'
) OR (category = 'weapon' AND subcategory = 'Force' AND subcategory NOT LIKE '%Light%' AND subcategory NOT LIKE '%Heavy%');

UPDATE gear_database SET 
    weapon_type = 'melee',
    weapon_weight_class = NULL,
    subcategory = 'Edged',
    hands_required = 1
WHERE name IN (
    'Sword', 'Longsword', 'Axe', 'Machete'
) OR (category = 'weapon' AND subcategory = 'Edged' AND subcategory NOT LIKE '%Light%' AND subcategory NOT LIKE '%Heavy%');

UPDATE gear_database SET 
    weapon_type = 'melee',
    weapon_weight_class = NULL,
    subcategory = 'Vibro',
    hands_required = 1
WHERE name IN (
    'Vibro-Sword', 'Vibro-Axe'
) OR (category = 'weapon' AND subcategory = 'Vibro' AND subcategory NOT LIKE '%Light%' AND subcategory NOT LIKE '%Heavy%');

-- HEAVY MELEE WEAPONS
UPDATE gear_database SET 
    weapon_type = 'melee',
    weapon_weight_class = 'heavy',
    subcategory = 'Blunt, Heavy',
    hands_required = 2
WHERE name IN (
    'Sledgehammer', 'Great Mace', 'Maul'
) OR (category = 'weapon' AND subcategory LIKE '%Blunt, Heavy%');

UPDATE gear_database SET 
    weapon_type = 'melee',
    weapon_weight_class = 'heavy',
    subcategory = 'Force, Heavy',
    hands_required = 2
WHERE name IN (
    'Force Maul', 'Heavy Force Hammer'
) OR (category = 'weapon' AND subcategory LIKE '%Force, Heavy%');

UPDATE gear_database SET 
    weapon_type = 'melee',
    weapon_weight_class = 'heavy',
    subcategory = 'Edged, Heavy',
    hands_required = 2
WHERE name IN (
    'Greatsword', 'Great Axe', 'Claymore'
) OR (category = 'weapon' AND subcategory LIKE '%Edged, Heavy%');

UPDATE gear_database SET 
    weapon_type = 'melee',
    weapon_weight_class = 'heavy',
    subcategory = 'Vibro, Heavy',
    hands_required = 2
WHERE name IN (
    'Vibro-Greatsword', 'Vibro-Great Axe'
) OR (category = 'weapon' AND subcategory LIKE '%Vibro, Heavy%');

UPDATE gear_database SET 
    weapon_type = 'melee',
    weapon_weight_class = NULL,
    subcategory = 'Beam Saber',
    hands_required = 1
WHERE name LIKE '%Beam Saber%' OR name LIKE '%Lightsaber%';

-- ============================================
-- UPDATE RANGED WEAPONS - PROJECTILE
-- ============================================

-- LIGHT RANGED WEAPONS (Pistols)
UPDATE gear_database SET 
    weapon_type = 'ranged',
    weapon_weight_class = 'light',
    subcategory = 'Pistol, Light',
    hands_required = 1
WHERE name IN (
    'Light Pistol', 'Holdout Pistol', 'Derringer'
) OR (category = 'weapon' AND subcategory LIKE '%Pistol, Light%');

UPDATE gear_database SET 
    weapon_type = 'ranged',
    weapon_weight_class = NULL,
    subcategory = 'Pistol',
    hands_required = 1
WHERE name IN (
    'Pistol', 'Handgun', 'Sidearm', 'Slug Pistol'
) OR (category = 'weapon' AND subcategory = 'Pistol' AND subcategory NOT LIKE '%Light%' AND subcategory NOT LIKE '%Heavy%');

UPDATE gear_database SET 
    weapon_type = 'ranged',
    weapon_weight_class = 'heavy',
    subcategory = 'Pistol, Heavy',
    hands_required = 1
WHERE name IN (
    'Heavy Pistol', 'Magnum', 'Hand Cannon'
) OR (category = 'weapon' AND subcategory LIKE '%Pistol, Heavy%');

-- RANGED RIFLES
UPDATE gear_database SET 
    weapon_type = 'ranged',
    weapon_weight_class = 'light',
    subcategory = 'Rifle, Light',
    hands_required = 2
WHERE name IN (
    'Light Rifle', 'Carbine', 'SMG'
) OR (category = 'weapon' AND subcategory LIKE '%Rifle, Light%');

UPDATE gear_database SET 
    weapon_type = 'ranged',
    weapon_weight_class = NULL,
    subcategory = 'Rifle',
    hands_required = 2
WHERE name IN (
    'Rifle', 'Assault Rifle', 'Slug Rifle'
) OR (category = 'weapon' AND subcategory = 'Rifle' AND subcategory NOT LIKE '%Light%' AND subcategory NOT LIKE '%Heavy%');

UPDATE gear_database SET 
    weapon_type = 'ranged',
    weapon_weight_class = 'heavy',
    subcategory = 'Rifle, Heavy',
    hands_required = 2
WHERE name IN (
    'Heavy Rifle', 'Sniper Rifle', 'Anti-Material Rifle'
) OR (category = 'weapon' AND subcategory LIKE '%Rifle, Heavy%');

-- ============================================
-- UPDATE RANGED WEAPONS - ENERGY (BLASTERS)
-- ============================================

-- LIGHT BLASTER PISTOLS
UPDATE gear_database SET 
    weapon_type = 'ranged',
    weapon_weight_class = 'light',
    subcategory = 'Blaster Pistol, Light',
    hands_required = 1
WHERE name IN (
    'Light Blaster Pistol', 'Holdout Blaster'
) OR (category = 'weapon' AND subcategory LIKE '%Blaster Pistol, Light%');

UPDATE gear_database SET 
    weapon_type = 'ranged',
    weapon_weight_class = NULL,
    subcategory = 'Blaster Pistol',
    hands_required = 1
WHERE name IN (
    'Blaster Pistol', 'Plasma Pistol', 'Energy Pistol'
) OR (category = 'weapon' AND subcategory = 'Blaster Pistol' AND subcategory NOT LIKE '%Light%' AND subcategory NOT LIKE '%Heavy%');

UPDATE gear_database SET 
    weapon_type = 'ranged',
    weapon_weight_class = 'heavy',
    subcategory = 'Blaster Pistol, Heavy',
    hands_required = 1
WHERE name IN (
    'Heavy Blaster Pistol', 'Plasma Cannon Pistol'
) OR (category = 'weapon' AND subcategory LIKE '%Blaster Pistol, Heavy%');

-- BLASTER RIFLES
UPDATE gear_database SET 
    weapon_type = 'ranged',
    weapon_weight_class = 'light',
    subcategory = 'Blaster Rifle, Light',
    hands_required = 2
WHERE name IN (
    'Light Blaster Rifle', 'Blaster Carbine'
) OR (category = 'weapon' AND subcategory LIKE '%Blaster Rifle, Light%');

UPDATE gear_database SET 
    weapon_type = 'ranged',
    weapon_weight_class = NULL,
    subcategory = 'Blaster Rifle',
    hands_required = 2
WHERE name IN (
    'Blaster Rifle', 'Plasma Rifle', 'Energy Rifle'
) OR (category = 'weapon' AND subcategory = 'Blaster Rifle' AND subcategory NOT LIKE '%Light%' AND subcategory NOT LIKE '%Heavy%');

UPDATE gear_database SET 
    weapon_type = 'ranged',
    weapon_weight_class = 'heavy',
    subcategory = 'Blaster Rifle, Heavy',
    hands_required = 2
WHERE name IN (
    'Heavy Blaster Rifle', 'Plasma Cannon'
) OR (category = 'weapon' AND subcategory LIKE '%Blaster Rifle, Heavy%');

-- GRENADES (Thrown weapons - considered Light Ranged)
UPDATE gear_database SET 
    weapon_type = 'ranged',
    weapon_weight_class = 'light',
    subcategory = 'Grenade',
    hands_required = 1
WHERE name LIKE '%Grenade%' OR name LIKE '%Explosive%';

-- ============================================
-- UPDATE ARMOR
-- ============================================

-- LIGHT ARMOR
UPDATE gear_database SET 
    armor_type = 'light',
    subcategory = 'Light Armor',
    ac_bonus = 11,
    allows_dex_modifier = TRUE
WHERE name IN (
    'Light Armor', 'Leather Armor', 'Padded Armor', 'Enviro-Suit'
) OR (category = 'armor' AND (name LIKE '%Light%' OR subcategory LIKE '%Light%'));

-- MEDIUM ARMOR
UPDATE gear_database SET 
    armor_type = 'medium',
    subcategory = 'Medium Armor',
    ac_bonus = 13,
    allows_dex_modifier = TRUE
WHERE name IN (
    'Medium Armor', 'Chainmail', 'Combat Armor', 'Tactical Vest'
) OR (category = 'armor' AND (name LIKE '%Medium%' OR subcategory LIKE '%Medium%'));

-- HEAVY ARMOR
UPDATE gear_database SET 
    armor_type = 'heavy',
    subcategory = 'Heavy Armor',
    ac_bonus = 15,
    allows_dex_modifier = FALSE
WHERE name IN (
    'Heavy Armor', 'Plate Mail', 'Power Armor', 'Exosuit'
) OR (category = 'armor' AND (name LIKE '%Heavy%' OR subcategory LIKE '%Heavy%' OR name LIKE '%Plate%'));

-- ENERGY ARMOR
UPDATE gear_database SET 
    armor_type = 'energy',
    subcategory = 'Energy Armor',
    ac_bonus = 15,
    allows_dex_modifier = FALSE
WHERE name IN (
    'Energy Armor', 'Shielded Armor', 'Plasma Armor'
) OR (category = 'armor' AND (name LIKE '%Energy Armor%' OR properties LIKE '%EN%'));

-- HELMETS
UPDATE gear_database SET 
    armor_type = 'helmet',
    subcategory = 'Helmet',
    ac_bonus = 1,
    allows_dex_modifier = TRUE
WHERE name LIKE '%Helmet%' OR name LIKE '%Headgear%';

-- SHIELDS
UPDATE gear_database SET 
    armor_type = 'shield',
    subcategory = 'Shield',
    ac_bonus = 2,
    hands_required = 1,
    allows_dex_modifier = TRUE
WHERE name LIKE '%Shield%';

-- Differentiate between Ballistic and Energy Shields
UPDATE gear_database SET 
    subcategory = 'Ballistic Shield'
WHERE name = 'Ballistic Shield' OR (name LIKE '%Shield%' AND properties NOT LIKE '%EC%');

UPDATE gear_database SET 
    subcategory = 'Energy Shield'
WHERE name = 'Energy Shield' OR (name LIKE '%Shield%' AND properties LIKE '%EC%');

-- ============================================
-- MARK NON-WEAPON, NON-ARMOR ITEMS AS NULL
-- ============================================

UPDATE gear_database SET 
    weapon_type = NULL,
    weapon_weight_class = NULL,
    armor_type = NULL
WHERE category NOT IN ('weapon', 'armor') 
   OR category IS NULL;

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_gear_weapon_type ON gear_database(weapon_type);
CREATE INDEX IF NOT EXISTS idx_gear_weapon_weight ON gear_database(weapon_weight_class);
CREATE INDEX IF NOT EXISTS idx_gear_armor_type ON gear_database(armor_type);
CREATE INDEX IF NOT EXISTS idx_gear_category ON gear_database(category);
CREATE INDEX IF NOT EXISTS idx_inventory_equipped ON inventory(equipped, equipped_slot);

-- ============================================
-- VERIFICATION QUERIES (Comment out in production)
-- ============================================

-- Check weapon classifications
-- SELECT name, category, subcategory, weapon_type, weapon_weight_class, hands_required 
-- FROM gear_database 
-- WHERE weapon_type IS NOT NULL
-- ORDER BY weapon_type, weapon_weight_class, subcategory;

-- Check armor classifications
-- SELECT name, category, subcategory, armor_type, ac_bonus, allows_dex_modifier
-- FROM gear_database 
-- WHERE armor_type IS NOT NULL
-- ORDER BY armor_type;
