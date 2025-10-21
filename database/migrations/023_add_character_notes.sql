-- Migration: Add character notes system
-- Allows players to create private journal entries for their characters

CREATE TABLE IF NOT EXISTS character_notes (
    id SERIAL PRIMARY KEY,
    character_id INTEGER NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add index for faster lookups by character
CREATE INDEX idx_character_notes_character_id ON character_notes(character_id);

-- Add index for sorting by creation date
CREATE INDEX idx_character_notes_created_at ON character_notes(created_at DESC);
