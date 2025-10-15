-- Add owner_name column to ships table for NPC/Enemy ship ownership
-- This allows DMs to specify custom owner names for NPC ships

ALTER TABLE ships
ADD COLUMN owner_name VARCHAR(255);

-- Add comment to explain the column usage
COMMENT ON COLUMN ships.owner_name IS 'Custom owner name for NPC ships. Null for character-owned and party ships (where owner is derived from character name or "Party Ship")';
