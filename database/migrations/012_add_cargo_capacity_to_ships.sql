-- Add cargo_capacity column to ships table
ALTER TABLE ships ADD COLUMN IF NOT EXISTS cargo_capacity INTEGER DEFAULT 10;

-- Update any existing ships to have the default capacity
UPDATE ships SET cargo_capacity = 10 WHERE cargo_capacity IS NULL;
