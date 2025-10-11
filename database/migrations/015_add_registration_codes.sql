-- Migration: Add registration codes system
-- Allows admin to generate registration codes to control who can sign up

CREATE TABLE IF NOT EXISTS registration_codes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    used_by_user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    used_at TIMESTAMP,
    created_by_admin_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    note TEXT
);

-- Add index for faster lookups
CREATE INDEX idx_registration_codes_code ON registration_codes(code);
CREATE INDEX idx_registration_codes_is_used ON registration_codes(is_used);
