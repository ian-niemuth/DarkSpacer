-- Migration: Add super admin role
-- Allows distinction between regular admins (DMs) and super admins (owner)

ALTER TABLE users ADD COLUMN IF NOT EXISTS is_super_admin BOOLEAN DEFAULT FALSE;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_users_is_super_admin ON users(is_super_admin);

-- Make the first admin a super admin (adjust the ID if needed)
-- You'll need to manually set this for your account after running the migration
-- Example: UPDATE users SET is_super_admin = TRUE WHERE id = 1;
