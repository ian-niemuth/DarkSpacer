-- Migration: Add Triad System for Wise Archetype
-- This adds support for The Triad powers (Body, Mind, Soul)

ALTER TABLE characters 
ADD COLUMN IF NOT EXISTS triad_powers TEXT DEFAULT '[]';

-- Add comment for documentation
COMMENT ON COLUMN characters.triad_powers IS 'JSON array storing Triad powers: ["Body", "Mind", "Soul"]';

-- Update existing Wise characters to have empty Triad array if NULL
UPDATE characters 
SET triad_powers = '[]' 
WHERE triad_powers IS NULL;
