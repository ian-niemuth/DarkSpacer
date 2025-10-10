-- Migration 010: Add Daily Ability Tracking System
-- This enables players to track uses of daily abilities (e.g., 3/day powers)
-- and allows DM to reset them

-- Add talents column to characters if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name='characters' 
        AND column_name='talents'
    ) THEN
        ALTER TABLE characters ADD COLUMN talents JSONB;
    END IF;
END $$;

-- Create ability_uses table to track daily ability usage
CREATE TABLE IF NOT EXISTS ability_uses (
    id SERIAL PRIMARY KEY,
    character_id INTEGER REFERENCES characters(id) ON DELETE CASCADE,
    ability_type VARCHAR(20) NOT NULL, -- 'archetype' or 'talent'
    ability_index INTEGER NOT NULL, -- Which ability in the list (0, 1, 2...)
    use_index INTEGER NOT NULL, -- Which use of the ability (0, 1, 2 for 3/day)
    is_used BOOLEAN DEFAULT FALSE,
    last_reset TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(character_id, ability_type, ability_index, use_index)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_ability_uses_character ON ability_uses(character_id);
CREATE INDEX IF NOT EXISTS idx_ability_uses_lookup ON ability_uses(character_id, ability_type, ability_index);

-- Function to initialize ability uses for a character
CREATE OR REPLACE FUNCTION initialize_ability_uses(char_id INTEGER)
RETURNS void AS $$
BEGIN
    -- This function will be called from the backend
    -- We don't auto-initialize here because we need to know the character's archetype and talents
    -- The backend will handle this logic
    NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to reset all abilities for a character
CREATE OR REPLACE FUNCTION reset_character_abilities(char_id INTEGER)
RETURNS void AS $$
BEGIN
    UPDATE ability_uses 
    SET is_used = FALSE, 
        last_reset = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
    WHERE character_id = char_id;
END;
$$ LANGUAGE plpgsql;

-- Function to reset all abilities for all characters (DM power)
CREATE OR REPLACE FUNCTION reset_all_abilities()
RETURNS void AS $$
BEGIN
    UPDATE ability_uses 
    SET is_used = FALSE, 
        last_reset = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE ability_uses IS 'Tracks daily ability usage for character abilities and talents';
COMMENT ON COLUMN ability_uses.ability_type IS 'Either "archetype" for class abilities or "talent" for talents';
COMMENT ON COLUMN ability_uses.ability_index IS 'Index of the ability in the characters ability/talent list';
COMMENT ON COLUMN ability_uses.use_index IS 'Which use of the ability (0-2 for a 3/day ability)';
COMMENT ON COLUMN ability_uses.is_used IS 'Whether this use has been expended';
COMMENT ON COLUMN ability_uses.last_reset IS 'Last time this ability was reset (for rest tracking)';
