-- Migration: Fix AC for existing Wise characters
-- Purpose: Recalculate AC for all Wise archetype characters to include Insightful Defense

-- Update AC for all Wise characters
-- Formula: 10 (base) + DEX modifier (positive or negative) + Insightful Defense (max(1, floor(level/2)))
UPDATE characters
SET ac = (
  10 + 
  FLOOR((dexterity - 10) / 2.0) +  -- DEX modifier (can be negative)
  GREATEST(1, FLOOR(level / 2.0))   -- Insightful Defense (min 1)
)
WHERE archetype = 'Wise';

-- Log the update
DO $$
DECLARE
  updated_count INTEGER;
BEGIN
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE 'Updated AC for % Wise character(s)', updated_count;
END $$;
