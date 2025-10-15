-- ================================================
-- ADD NPC/ENEMY SHIP SUPPORT
-- ================================================
-- This migration adds support for NPC/Enemy ships that are controlled by the DM
-- and can be placed on the star map for players to encounter.
--
-- Ship owner_type now supports three values:
--   - 'party': Ships owned by the entire party
--   - 'character': Ships owned by individual player characters
--   - 'npc': Ships controlled by the DM (enemies, neutral NPCs, etc.)
--
-- NPC ships:
--   - Are not tied to any player character (owner_id is NULL)
--   - Can be placed on the star map
--   - Are visible to players when within sensor range
--   - Are fully managed by the DM through the admin panel
-- ================================================

-- Add comment to ships table to document owner_type values
COMMENT ON COLUMN ships.owner_type IS 'Ship ownership type: ''party'' (party ship), ''character'' (player-owned), or ''npc'' (DM-controlled enemy/NPC ship)';

-- Add comment to clarify owner_id usage
COMMENT ON COLUMN ships.owner_id IS 'Character ID if owner_type is ''character'', NULL for ''party'' and ''npc'' ships';
