-- Migration: Add bug reports system
-- Allows users to submit bug reports and admins to manage them

CREATE TABLE IF NOT EXISTS bug_reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved BOOLEAN DEFAULT FALSE
);

-- Add index for faster queries
CREATE INDEX idx_bug_reports_resolved ON bug_reports(resolved);
CREATE INDEX idx_bug_reports_created_at ON bug_reports(created_at DESC);
