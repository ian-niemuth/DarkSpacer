-- Add grants_admin column to registration_codes table
-- This allows codes to automatically grant admin status to users who register with them

ALTER TABLE registration_codes ADD COLUMN IF NOT EXISTS grants_admin BOOLEAN DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_registration_codes_grants_admin ON registration_codes(grants_admin);

-- Add comment for clarity
COMMENT ON COLUMN registration_codes.grants_admin IS 'If true, users who register with this code will be granted admin status';
