-- Migration 005: Fix Duplicate Rations
-- Consolidates duplicate ration items into single correct version
-- Issue: DarkSpace rulebook uses two names for the same item:
--   - "Rations (3-pack)" in Spacer's Kit section
--   - "Ration Pack (3 days)" in Gear section
-- Solution: Standardize on "Ration Pack (3 days)"

-- STEP 1: Delete the duplicate "Rations (3-pack)" from gear_database
DELETE FROM gear_database 
WHERE LOWER(name) = 'rations (3-pack)';

-- Ensure the correct "Ration Pack (3 days)" exists with proper settings
UPDATE gear_database 
SET 
  category = 'consumable',
  subcategory = NULL,
  weight = 1,
  cost = 5,
  description = 'Packaged food and water for three days. One pack = 1 gear slot',
  properties = 'Consumable'
WHERE LOWER(name) = 'ration pack (3 days)';

-- STEP 3: Update any characters that have the old "Rations (3-pack)"
-- Rename them to "Ration Pack (3 days)" in player inventories
UPDATE inventory 
SET 
  item_name = 'Ration Pack (3 days)',
  item_type = 'consumable',
  weight = 1
WHERE LOWER(item_name) = 'rations (3-pack)';

-- STEP 4: Add comment
COMMENT ON TABLE gear_database IS 'Cleaned up duplicate rations - using "Ration Pack (3 days)" as standard';
