-- Migration: Fix AC for ALL existing characters
-- Purpose: Recalculate AC for all characters to properly include negative DEX modifiers

-- Update AC for all characters
-- Formula: 10 (base) + DEX modifier (positive or negative) + Insightful Defense (for Wise only)
UPDATE characters
SET ac = (
  10 + 
  FLOOR((dexterity - 10) / 2.0) +  -- DEX modifier (can be negative)
  CASE 
    WHEN archetype = 'Wise' THEN GREATEST(1, FLOOR(level / 2.0))  -- Insightful Defense (min 1)
    ELSE 0
  END
);

-- Note: This sets base unarmored AC. Characters with equipped armor will have 
-- their AC properly recalculated when they next equip/unequip gear.

-- Log the update
DO $
DECLARE
  updated_count INTEGER;
  wise_count INTEGER;
BEGIN
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  
  SELECT COUNT(*) INTO wise_count FROM characters WHERE archetype = 'Wise';
  
  RAISE NOTICE 'Updated AC for % total character(s)', updated_count;
  RAISE NOTICE '  - % Wise character(s) with Insightful Defense', wise_count;
  RAISE NOTICE '  - % other archetype character(s)', updated_count - wise_count;
END $;
