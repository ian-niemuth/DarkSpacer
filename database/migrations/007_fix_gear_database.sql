-- Migration: Replace gear database with official DarkSpace items
-- This replaces generic placeholders with the actual items from the rulebook

-- ============================================
-- STEP 1: Clear existing gear (except custom items)
-- ============================================

DELETE FROM gear_database WHERE is_custom = FALSE OR is_custom IS NULL;

-- ============================================
-- STEP 2: MELEE WEAPONS (from rulebook)
-- ============================================

-- BLUNT WEAPONS
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description, weapon_type, weapon_weight_class, hands_required) VALUES
('Blunt, Light', 'weapon', 'Blunt, Light', 1, 1, '1d4', 'C/N', 'Th', 'Light blunt weapon - club, baton, etc.', 'melee', 'light', 1),
('Blunt', 'weapon', 'Blunt', 3, 1, '1d6/1d8', 'C', 'V', 'Standard blunt weapon - mace, hammer, etc.', 'melee', null, 1),
('Blunt, Heavy', 'weapon', 'Blunt, Heavy', 5, 2, '1d8', 'C', '2H', 'Heavy blunt weapon - sledgehammer, maul, etc.', 'melee', 'heavy', 2);

-- FORCE WEAPONS (Powered blunt)
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description, weapon_type, weapon_weight_class, hands_required) VALUES
('Force, Light', 'weapon', 'Force, Light', 5, 1, '1d6', 'C/N', 'EC, Th', 'Light force weapon - powered baton', 'melee', 'light', 1),
('Force', 'weapon', 'Force', 10, 1, '1d8/1d10', 'C', 'EC, V', 'Standard force weapon - force hammer', 'melee', null, 1),
('Force, Heavy', 'weapon', 'Force, Heavy', 15, 2, '1d10', 'C', 'EC, 2H', 'Heavy force weapon - force maul', 'melee', 'heavy', 2);

-- EDGED WEAPONS
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description, weapon_type, weapon_weight_class, hands_required) VALUES
('Edged, Light', 'weapon', 'Edged, Light', 1, 1, '1d4', 'C/N', 'Th', 'Light blade - knife, dagger, combat blade', 'melee', 'light', 1),
('Edged', 'weapon', 'Edged', 3, 1, '1d6/1d8', 'C', 'V', 'Standard blade - sword, axe, machete', 'melee', null, 1),
('Edged, Heavy', 'weapon', 'Edged, Heavy', 5, 2, '1d8', 'C', '2H', 'Heavy blade - greatsword, great axe', 'melee', 'heavy', 2);

-- VIBRO WEAPONS (Powered edged)
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description, weapon_type, weapon_weight_class, hands_required) VALUES
('Vibro, Light', 'weapon', 'Vibro, Light', 5, 1, '1d6', 'C/N', 'EC, Th', 'Light vibro weapon - vibro-knife', 'melee', 'light', 1),
('Vibro', 'weapon', 'Vibro', 10, 1, '1d8/1d10', 'C', 'EC, V', 'Standard vibro weapon - vibro-sword', 'melee', null, 1),
('Vibro, Heavy', 'weapon', 'Vibro, Heavy', 15, 2, '1d10', 'C', 'EC, 2H', 'Heavy vibro weapon - vibro-greatsword', 'melee', 'heavy', 2);

-- BEAM SABER (Special)
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description, weapon_type, weapon_weight_class, hands_required) VALUES
('Beam Saber', 'weapon', 'Beam Saber', 999, 1, '1d12', 'C', 'EC, AP, Light', 'Rare energy blade weapon', 'melee', null, 1);

-- ============================================
-- STEP 3: RANGED WEAPONS - PROJECTILE (from rulebook)
-- ============================================

-- PISTOLS (Projectile)
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description, weapon_type, weapon_weight_class, hands_required) VALUES
('Pistol, Light', 'weapon', 'Pistol, Light', 5, 1, '1d4', 'N', 'Am', 'Light pistol - holdout, derringer', 'ranged', 'light', 1),
('Pistol', 'weapon', 'Pistol', 10, 1, '1d6', 'N', 'Am', 'Standard pistol - reliable sidearm', 'ranged', null, 1),
('Pistol, Heavy', 'weapon', 'Pistol, Heavy', 15, 1, '1d8', 'N', 'Am', 'Heavy pistol - magnum, hand cannon', 'ranged', 'heavy', 1);

-- RIFLES (Projectile)
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description, weapon_type, weapon_weight_class, hands_required) VALUES
('Rifle, Light', 'weapon', 'Rifle, Light', 20, 2, '1d4', 'F', 'Am, 2H', 'Light rifle - carbine, SMG', 'ranged', 'light', 2),
('Rifle', 'weapon', 'Rifle', 25, 2, '1d6', 'F', 'Am, 2H', 'Standard rifle - assault rifle', 'ranged', null, 2),
('Rifle, Heavy', 'weapon', 'Rifle, Heavy', 50, 2, '1d8', 'F', 'Am, 2H, R', 'Heavy rifle - sniper rifle', 'ranged', 'heavy', 2);

-- GRENADE (Projectile)
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description, weapon_type, weapon_weight_class, hands_required) VALUES
('Grenade', 'weapon', 'Grenade', 75, 0.5, '1d10', 'N', 'Th, Bl', 'Explosive grenade - 2 per slot', 'ranged', 'light', 1);

-- ============================================
-- STEP 4: RANGED WEAPONS - ENERGY/BLASTER (from rulebook)
-- ============================================

-- BLASTER PISTOLS
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description, weapon_type, weapon_weight_class, hands_required) VALUES
('Blaster Pistol, Light', 'weapon', 'Blaster Pistol, Light', 10, 1, '1d6', 'N', 'EC', 'Light energy pistol', 'ranged', 'light', 1),
('Blaster Pistol', 'weapon', 'Blaster Pistol', 20, 1, '1d8', 'N', 'EC', 'Standard plasma pistol', 'ranged', null, 1),
('Blaster Pistol, Heavy', 'weapon', 'Blaster Pistol, Heavy', 50, 1, '1d10', 'N', 'EC, R', 'Heavy plasma pistol', 'ranged', 'heavy', 1);

-- BLASTER RIFLES
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description, weapon_type, weapon_weight_class, hands_required) VALUES
('Blaster Rifle, Light', 'weapon', 'Blaster Rifle, Light', 25, 2, '1d6', 'F', 'EC, 2H', 'Light energy rifle', 'ranged', 'light', 2),
('Blaster Rifle', 'weapon', 'Blaster Rifle', 50, 2, '1d8', 'F', 'EC, 2H', 'Standard plasma rifle', 'ranged', null, 2),
('Blaster Rifle, Heavy', 'weapon', 'Blaster Rifle, Heavy', 75, 2, '1d10', 'F', 'EC, AP, 2H, R', 'Heavy plasma cannon', 'ranged', 'heavy', 2);

-- BLASTER GRENADE
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description, weapon_type, weapon_weight_class, hands_required) VALUES
('Blaster Grenade', 'weapon', 'Blaster Grenade', 100, 0.5, '1d12', 'N', 'Th, AP, Bl', 'Energy grenade - 2 per slot', 'ranged', 'light', 1);

-- ============================================
-- STEP 5: ARMOR (from rulebook)
-- ============================================

INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description, ac_bonus, armor_type, allows_dex_modifier) VALUES
-- Body Armor
('Light Armor', 'armor', 'Light Armor', 25, 1, NULL, NULL, 'Ph', 'Provides 11+DEX AC. Light padding or reinforced clothing.', 11, 'light', TRUE),
('Medium Armor', 'armor', 'Medium Armor', 50, 2, NULL, NULL, 'Ph, Disadvantage on stealth & swim', 'Provides 13+DEX AC. Composite plates or tactical vest.', 13, 'medium', TRUE),
('Heavy Armor', 'armor', 'Heavy Armor', 75, 3, NULL, NULL, 'Ph, Disadvantage on stealth, No swim', 'Provides 15 AC. Full combat armor plating.', 15, 'heavy', FALSE),
('Energy Armor', 'armor', 'Energy Armor', 100, 1, NULL, NULL, 'EC, EN', 'Provides 15 AC. Personal energy shielding.', 15, 'energy', FALSE),

-- Accessories
('Helmet', 'armor', 'Helmet', 10, 1, NULL, NULL, 'Ph, Disadvantage on perception', 'Provides +1 AC. Protective headgear.', 1, 'helmet', TRUE),

-- Shields
('Ballistic Shield', 'armor', 'Ballistic Shield', 20, 1, NULL, NULL, '1H, Ph', 'Provides +2 AC. Physical riot shield.', 2, 'shield', TRUE),
('Energy Shield', 'armor', 'Energy Shield', 30, 0, NULL, NULL, '1H, EC, EN', 'Provides +2 AC. Personal energy barrier.', 2, 'shield', TRUE),

-- Exosuit Upgrade
('Exosuit Conversion', 'armor', 'Exosuit Conversion', 50, 1, NULL, NULL, 'Life Support, Radiation Resistance', 'Adds rebreather and radiation resistance to any armor.', 0, null, TRUE);

-- ============================================
-- STEP 6: GEAR & EQUIPMENT
-- ============================================

INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description) VALUES
-- Consumables (0.5 weight = 2 per slot)
('Ammo Clip', 'consumable', 'Ammunition', 3, 0.5, NULL, NULL, 'Am', 'Ammunition magazine for projectile weapons. 2 clips per gear slot.'),
('Energy Cell', 'consumable', 'Power', 5, 0.5, NULL, NULL, 'EC', 'Plasma-based energy storage. 2 cells per gear slot.'),
('StimPak', 'consumable', 'Medical', 10, 0.5, NULL, NULL, NULL, 'One-time use. Stabilize and heal 1d2 HP. 2 paks per slot.'),
('Rations (3-pack)', 'consumable', 'Food', 5, 1, NULL, NULL, NULL, 'Food and water for three days.'),

-- FREE items (weight 0)
('Backpack', 'gear', 'Container', 3, 0, NULL, NULL, NULL, 'Holds your gear. First one is FREE to carry, additional ones take 1 slot.'),
('CredStick', 'gear', 'Currency', 3, 0, NULL, NULL, NULL, 'Tracks your legal currency account. FREE to carry.'),

-- Standard Equipment (1 slot each)
('Cable, Synthetic', 'gear', 'Utility', 10, 1, NULL, NULL, NULL, '60 ft synthetic fibers, 1,000 lb tensile strength.'),
('Cable, Polymer', 'gear', 'Utility', 20, 1, NULL, NULL, NULL, '60 ft polymer, 2,000 lb tensile strength.'),
('Grapple', 'gear', 'Utility', 2, 1, NULL, NULL, NULL, 'Hook and clip for latching onto objects.'),
('Multitool', 'gear', 'Utility', 10, 1, NULL, NULL, NULL, 'Compact toolbox. Grants advantage on stabilizing androids.'),
('Medkit', 'gear', 'Medical', 20, 1, NULL, NULL, NULL, 'Basic medical supplies. Grants advantage on stabilizing organics.'),
('Security Kit', 'gear', 'Utility', 35, 1, NULL, NULL, NULL, 'Tools for bypassing security controls.'),

-- Electronic Equipment (EC powered, 1 slot each)
('Communicator', 'gear', 'Electronics', 20, 1, NULL, NULL, 'EC', 'Planet-wide communication device.'),
('Datapad', 'gear', 'Electronics', 50, 1, NULL, NULL, 'EC', 'Personal computer for accessing datanets.'),
('Glowrod', 'gear', 'Electronics', 10, 1, NULL, NULL, 'EC', 'Sheds light up to NEAR distance. 1 EC = 1 hour.'),
('Rebreather', 'gear', 'Electronics', 20, 1, NULL, NULL, 'EC', 'Self-contained breathing. 1 EC = 1 hour.'),
('Scanner, Handheld', 'gear', 'Electronics', 50, 1, NULL, NULL, 'EC', 'Diagnostic tool for life signs, environment, and energy.'),
('Vision Enhancer, Basic', 'gear', 'Electronics', 30, 1, NULL, NULL, NULL, 'Standard binoculars for distance viewing.'),
('Vision Enhancer, Advanced', 'gear', 'Electronics', 50, 1, NULL, NULL, 'EC', 'Computer-assisted vision in non-visible spectrum.');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check weapon counts by type
SELECT 
  weapon_type,
  weapon_weight_class,
  COUNT(*) as count
FROM gear_database 
WHERE weapon_type IS NOT NULL
GROUP BY weapon_type, weapon_weight_class
ORDER BY weapon_type, weapon_weight_class;

-- Check armor
SELECT name, armor_type, ac_bonus, allows_dex_modifier
FROM gear_database 
WHERE armor_type IS NOT NULL
ORDER BY armor_type;

-- Show all items
SELECT 
  category,
  subcategory,
  name,
  cost,
  weight,
  damage,
  range,
  properties
FROM gear_database
ORDER BY category, subcategory, name;
