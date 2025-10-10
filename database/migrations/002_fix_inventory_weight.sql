-- Migration 002: Fix inventory table and cleanup duplicates
-- Run this to fix the inventory.weight column and remove duplicates

-- ============================================
-- STEP 1: Fix inventory.weight column
-- ============================================

-- Change weight from INTEGER to NUMERIC in inventory table
ALTER TABLE inventory 
ALTER COLUMN weight TYPE NUMERIC(4,2);

-- ============================================
-- STEP 2: Remove duplicate items from gear_database
-- ============================================

-- Delete duplicates, keeping only the first occurrence of each item
DELETE FROM gear_database a
USING gear_database b
WHERE a.id > b.id 
AND a.name = b.name;

-- ============================================
-- STEP 3: Add unique constraint to prevent future duplicates
-- ============================================

-- This will prevent duplicate item names in the future
ALTER TABLE gear_database 
DROP CONSTRAINT IF EXISTS gear_database_name_key;

ALTER TABLE gear_database 
ADD CONSTRAINT gear_database_name_key UNIQUE (name);

-- ============================================
-- Verification
-- ============================================

-- Check for remaining duplicates (should return 0 rows)
SELECT name, COUNT(*) as count
FROM gear_database
GROUP BY name
HAVING COUNT(*) > 1;

-- Count total items (should be 46)
SELECT COUNT(*) as total_items FROM gear_database WHERE is_custom = FALSE;
