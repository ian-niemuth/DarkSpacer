-- ============================================================================
-- CLEANUP SCRIPT: Reset User-Generated Data
-- ============================================================================
-- This script wipes all user-generated content while preserving:
-- - Database structure
-- - Ship catalog/templates (static game data)
-- - Gear catalog (static game data)
-- - Your super admin account (optional - comment out the WHERE clause to keep it)
--
-- WARNING: THIS IS DESTRUCTIVE AND CANNOT BE UNDONE!
-- ============================================================================

-- Note: Each block runs independently (no transaction wrapper)
-- This allows the script to continue even if a table doesn't exist

-- Delete all bug reports (if table exists)
DO $$ BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'bug_reports') THEN
    DELETE FROM bug_reports;
  END IF;
END $$;

-- Delete all comms messages and related data (if tables exist)
DO $$ BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'comms_message_archives') THEN
    DELETE FROM comms_message_archives;
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'comms_read_receipts') THEN
    DELETE FROM comms_read_receipts;
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'comms_messages') THEN
    DELETE FROM comms_messages;
  END IF;
END $$;

-- Delete all character inventory (items)
DO $$ BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'inventory') THEN
    DELETE FROM inventory;
  END IF;
END $$;

-- Delete all ship inventory (cargo)
DO $$ BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'ship_inventory') THEN
    DELETE FROM ship_inventory;
  END IF;
END $$;

-- Delete all character gear assignments
DO $$ BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'character_gear') THEN
    DELETE FROM character_gear;
  END IF;
END $$;

-- Delete all ship equipment
DO $$ BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'ship_weapons') THEN
    DELETE FROM ship_weapons;
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'ship_armor') THEN
    DELETE FROM ship_armor;
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'ship_enhancements') THEN
    DELETE FROM ship_enhancements;
  END IF;
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'ship_components') THEN
    DELETE FROM ship_components;
  END IF;
END $$;

-- Delete all ship crew assignments
DO $$ BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'ship_crew_assignments') THEN
    DELETE FROM ship_crew_assignments;
  END IF;
END $$;

-- Delete all player ships
DO $$ BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'ships') THEN
    DELETE FROM ships;
  END IF;
END $$;

-- Delete all characters
DO $$ BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'characters') THEN
    DELETE FROM characters;
  END IF;
END $$;

-- Delete all registration codes (or just used ones - see comments)
DO $$ BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'registration_codes') THEN
    DELETE FROM registration_codes;
    -- If you want to keep unused codes, use this instead:
    -- DELETE FROM registration_codes WHERE is_used = TRUE;
  END IF;
END $$;

-- Delete all users EXCEPT your super admin account
-- Replace 'yourusername' with your actual super admin username
DO $$ BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users') THEN
    DELETE FROM users WHERE username != 'yourusername';
    -- To delete ALL users including yourself, use:
    -- DELETE FROM users;
  END IF;
END $$;

-- Reset auto-increment sequences to start fresh (only if they exist)
-- (Optional - ensures IDs start from 1 again)
DO $$ BEGIN
  IF EXISTS (SELECT FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'users_id_seq') THEN
    ALTER SEQUENCE users_id_seq RESTART WITH 1;
  END IF;
  IF EXISTS (SELECT FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'characters_id_seq') THEN
    ALTER SEQUENCE characters_id_seq RESTART WITH 1;
  END IF;
  IF EXISTS (SELECT FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'ships_id_seq') THEN
    ALTER SEQUENCE ships_id_seq RESTART WITH 1;
  END IF;
  IF EXISTS (SELECT FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'bug_reports_id_seq') THEN
    ALTER SEQUENCE bug_reports_id_seq RESTART WITH 1;
  END IF;
  IF EXISTS (SELECT FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'registration_codes_id_seq') THEN
    ALTER SEQUENCE registration_codes_id_seq RESTART WITH 1;
  END IF;
  IF EXISTS (SELECT FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'inventory_id_seq') THEN
    ALTER SEQUENCE inventory_id_seq RESTART WITH 1;
  END IF;
  IF EXISTS (SELECT FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'comms_messages_id_seq') THEN
    ALTER SEQUENCE comms_messages_id_seq RESTART WITH 1;
  END IF;
END $$;

-- Note: We do NOT reset ship_templates_id_seq, gear_id_seq, or other template sequences
-- because those contain the game's catalog data

-- ============================================================================
-- CLEANUP COMPLETE!
-- ============================================================================
-- After running this script, you should have:
-- - Empty users table (except your admin account if you kept it)
-- - Empty characters, ships, messages, bug reports
-- - Empty or partially empty registration_codes (depending on your choice)
-- - Intact ship catalog and gear catalog
-- ============================================================================
