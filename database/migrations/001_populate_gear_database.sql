-- Migration 001: Fix gear_database schema and populate with all DarkSpace items
-- FIXED VERSION 2: Adds ac_bonus column before using it

-- ============================================
-- STEP 1: Drop dependent views
-- ============================================

-- Drop any views that depend on gear_database.weight
DROP VIEW IF EXISTS gear_catalog CASCADE;

-- ============================================
-- STEP 2: Update Schema
-- ============================================

-- Change weight from INTEGER to NUMERIC to support 0.5 weights (2 per slot items)
ALTER TABLE gear_database 
ALTER COLUMN weight TYPE NUMERIC(4,2);

-- Add subcategory column for better organization
ALTER TABLE gear_database 
ADD COLUMN IF NOT EXISTS subcategory VARCHAR(50);

-- Add is_custom flag to distinguish DM-created items from official gear
ALTER TABLE gear_database 
ADD COLUMN IF NOT EXISTS is_custom BOOLEAN DEFAULT FALSE;

-- Add ac_bonus column for armor items (if it doesn't exist already)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name='gear_database' AND column_name='ac_bonus'
    ) THEN
        ALTER TABLE gear_database ADD COLUMN ac_bonus INTEGER DEFAULT 0;
    END IF;
END $$;

-- ============================================
-- STEP 3: Clear Sample Data
-- ============================================

-- Remove the sample items from init.sql
DELETE FROM gear_database WHERE name IN (
    'Plasma Pistol', 'Slug Rifle', 'Combat Blade', 
    'Enviro-Suit', 'Medkit', 'Scanner', 'CredChit (100cr)'
);

-- ============================================
-- STEP 4: Populate WEAPONS
-- ============================================

-- Light Melee Weapons (1d4, Close, 1 slot)
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description) VALUES
('Light Blunt Weapon', 'weapon', 'light_melee', 10, 1, '1d4', 'close', 'Ph', 'Club, baton, or similar blunt instrument'),
('Light Edged Weapon', 'weapon', 'light_melee', 10, 1, '1d4', 'close', 'Ph', 'Knife, dagger, or short blade');

-- Medium Melee Weapons (1d6, Close, 1 slot)
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description) VALUES
('Medium Blunt Weapon', 'weapon', 'medium_melee', 25, 1, '1d6', 'close', 'Ph', 'Mace, hammer, or weighted weapon'),
('Medium Edged Weapon', 'weapon', 'medium_melee', 25, 1, '1d6', 'close', 'Ph', 'Sword, machete, or long blade');

-- Heavy Melee Weapons (1d8, Close, 2H, 2 slots)
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description) VALUES
('Heavy Blunt Weapon', 'weapon', 'heavy_melee', 50, 2, '1d8', 'close', '2H, Ph', 'Sledgehammer, war hammer, or heavy club'),
('Heavy Edged Weapon', 'weapon', 'heavy_melee', 50, 2, '1d8', 'close', '2H, Ph', 'Greatsword, battle axe, or large blade');

-- Light Projectile Weapons (1d4, Near, Am, 1 slot)
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description) VALUES
('Light Projectile Pistol', 'weapon', 'light_ranged', 50, 1, '1d4', 'near', 'Am, Ph', 'Small caliber pistol or hand cannon'),
('Light Projectile Rifle', 'weapon', 'light_ranged', 75, 1, '1d4', 'far', 'Am, Ph', 'Small caliber rifle or carbine');

-- Medium Projectile Weapons (1d6, varies range, Am, 1 slot)
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description) VALUES
('Medium Projectile Pistol', 'weapon', 'medium_ranged', 100, 1, '1d6', 'near', 'Am, Ph', 'Standard sidearm, reliable and common'),
('Medium Projectile Rifle', 'weapon', 'medium_ranged', 150, 1, '1d6', 'far', 'Am, Ph', 'Standard rifle, versatile and accurate');

-- Heavy Projectile Weapons (1d8, Far, 2H, Am, 2 slots)
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description) VALUES
('Heavy Projectile Rifle', 'weapon', 'heavy_ranged', 250, 2, '1d8', 'far', '2H, Am, Ph', 'High-powered rifle, devastating at range'),
('Heavy Projectile Cannon', 'weapon', 'heavy_ranged', 350, 2, '1d8', 'far', '2H, Am, Ph', 'Shoulder-mounted weapon system');

-- Light Energy Weapons (1d4, varies range, EC, 1 slot)
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description) VALUES
('Light Energy Pistol', 'weapon', 'light_energy', 100, 1, '1d4', 'near', 'EC, EN', 'Compact energy sidearm'),
('Light Energy Rifle', 'weapon', 'light_energy', 150, 1, '1d4', 'far', 'EC, EN', 'Lightweight energy carbine');

-- Medium Energy Weapons (1d6, varies range, EC, 1 slot)
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description) VALUES
('Medium Energy Pistol', 'weapon', 'medium_energy', 200, 1, '1d6', 'near', 'EC, EN', 'Standard plasma pistol'),
('Medium Energy Rifle', 'weapon', 'medium_energy', 300, 1, '1d6', 'far', 'EC, EN', 'Standard energy rifle');

-- Heavy Energy Weapons (1d8, Far, 2H, EC, 2 slots)
INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description) VALUES
('Heavy Energy Rifle', 'weapon', 'heavy_energy', 500, 2, '1d8', 'far', '2H, EC, EN', 'High-output energy weapon'),
('Heavy Energy Cannon', 'weapon', 'heavy_energy', 700, 2, '1d8', 'far', '2H, EC, EN', 'Devastating energy weapon system');

-- ============================================
-- STEP 5: Populate ARMOR
-- ============================================

INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description, ac_bonus) VALUES
-- Body Armor
('Light Armor', 'armor', 'body', 25, 1, NULL, NULL, 'Ph', 'Provides 11+DEX AC. Light padding or reinforced clothing.', 1),
('Medium Armor', 'armor', 'body', 50, 2, NULL, NULL, 'Ph, Disadvantage on stealth & swim', 'Provides 13+DEX AC. Composite plates or tactical vest.', 3),
('Heavy Armor', 'armor', 'body', 75, 3, NULL, NULL, 'Ph, Disadvantage on stealth, No swim', 'Provides 15 AC. Full combat armor plating.', 5),
('Energy Armor', 'armor', 'body', 100, 1, NULL, NULL, 'EC, EN', 'Provides 15 AC. Personal energy shielding.', 5),

-- Accessories
('Helmet', 'armor', 'accessory', 10, 1, NULL, NULL, 'Ph, Disadvantage on perception', 'Provides +1 AC. Protective headgear.', 1),
('Ballistic Shield', 'armor', 'shield', 20, 1, NULL, NULL, '1H, Ph', 'Provides +2 AC. Physical riot shield.', 2),
('Energy Shield', 'armor', 'shield', 30, 0, NULL, NULL, '1H, EC, EN', 'Provides +2 AC. Personal energy barrier.', 2),

-- Exosuit Upgrade
('Exosuit Conversion', 'armor', 'upgrade', 50, 1, NULL, NULL, 'Life Support, Radiation Resistance', 'Upgrade any armor to function as an exosuit with environmental protection.', 0);

-- ============================================
-- STEP 6: Populate GEAR
-- ============================================

INSERT INTO gear_database (name, category, subcategory, cost, weight, damage, range, properties, description) VALUES
-- Consumables (2 per slot items use weight 0.5)
('Ammo Clip', 'gear', 'ammunition', 3, 0.5, NULL, NULL, 'Am', 'Ammunition for projectile weapons. 2 clips per gear slot.'),
('Energy Cell', 'gear', 'power', 5, 0.5, NULL, NULL, 'EC', 'Plasma-based energy storage. 2 cells per gear slot.'),
('StimPak', 'gear', 'medical', 10, 0.5, NULL, NULL, NULL, 'One-time use. Stabilize and heal 1d2 HP. 2 paks per slot.'),
('Rations (3-pack)', 'gear', 'consumable', 5, 1, NULL, NULL, NULL, 'Food and water for three days.'),

-- FREE items (weight 0)
('Backpack', 'gear', 'container', 3, 0, NULL, NULL, NULL, 'Holds your gear. First one is FREE to carry, additional ones take 1 slot.'),
('CredStick', 'gear', 'currency', 3, 0, NULL, NULL, NULL, 'Metallic pen-sized cylinder. Tracks your legal currency account. FREE to carry.'),

-- Standard Equipment (1 slot)
('Cable, Synthetic', 'gear', 'utility', 10, 1, NULL, NULL, NULL, '60 ft long synthetic fibers, 1,000 lb tensile strength.'),
('Cable, Polymer', 'gear', 'utility', 20, 1, NULL, NULL, NULL, '60 ft long space-age polymer, 2,000 lb tensile strength.'),
('Grapple', 'gear', 'utility', 2, 1, NULL, NULL, NULL, 'Hook and clip for latching onto objects.'),
('Multitool', 'gear', 'utility', 10, 1, NULL, NULL, NULL, 'Compact toolbox with common tools. Grants advantage on stabilizing androids.'),
('Medkit', 'gear', 'medical', 20, 1, NULL, NULL, NULL, 'Basic medical supplies. Grants advantage on stabilizing organic lifeforms.'),
('Security Kit', 'gear', 'utility', 35, 1, NULL, NULL, NULL, 'Necessary tools for bypassing security controls.'),

-- Electronic Equipment (1 slot, EC powered)
('Communicator', 'gear', 'electronics', 20, 1, NULL, NULL, 'EC', 'Planet-wide communication device with configurable channels.'),
('Datapad', 'gear', 'electronics', 50, 1, NULL, NULL, 'EC', 'Personal computation device for accessing datanets and files.'),
('Glowrod', 'gear', 'electronics', 10, 1, NULL, NULL, 'EC', 'Sheds light up to NEAR distance. 1 EC lasts one hour.'),
('Rebreather', 'gear', 'electronics', 20, 1, NULL, NULL, 'EC', 'Self-contained breathing device. Lasts one hour per EC.'),
('Scanner, Handheld', 'gear', 'electronics', 50, 1, NULL, NULL, 'EC', 'Multipurpose diagnostic tool for life signs, environmental data, and energy signatures.'),
('Vision Enhancer, Basic', 'gear', 'electronics', 30, 1, NULL, NULL, NULL, 'Standard binoculars for distance viewing.'),
('Vision Enhancer, Advanced', 'gear', 'electronics', 50, 1, NULL, NULL, 'EC', 'Computer-assisted vision in non-visible spectrum.');

-- ============================================
-- STEP 7: Recreate any dropped views (optional)
-- ============================================

-- If gear_catalog view was useful, recreate it here
-- Example (adjust columns as needed):
-- CREATE VIEW gear_catalog AS
-- SELECT id, name, category, subcategory, cost, weight, description
-- FROM gear_database
-- WHERE is_custom = FALSE
-- ORDER BY category, subcategory, name;

-- ============================================
-- Verification Query
-- ============================================

-- Run this to verify all items were added:
-- SELECT category, subcategory, COUNT(*) as item_count 
-- FROM gear_database 
-- GROUP BY category, subcategory 
-- ORDER BY category, subcategory;
