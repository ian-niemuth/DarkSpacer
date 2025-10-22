-- Character Slot Assignments for Streaming HUD
-- This table stores which character appears in which slot for each HUD layout

CREATE TABLE IF NOT EXISTS character_slot_assignments (
  id SERIAL PRIMARY KEY,
  layout_type VARCHAR(50) NOT NULL,  -- 'large-top', 'large-bottom', 'small-top', 'small-bottom'
  slot_number INTEGER NOT NULL CHECK (slot_number BETWEEN 1 AND 3),
  character_id INTEGER REFERENCES characters(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(layout_type, slot_number)
);

-- Create index for faster lookups by layout
CREATE INDEX idx_slot_assignments_layout ON character_slot_assignments(layout_type);

-- Add comment
COMMENT ON TABLE character_slot_assignments IS 'Stores character assignments to HUD slots for OBS streaming';
