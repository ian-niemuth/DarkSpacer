-- Migration: Enhance character notes system
-- Adds tags, pinned status, and archived functionality

-- Add new columns to character_notes table
ALTER TABLE character_notes
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS pinned BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT FALSE;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_character_notes_pinned ON character_notes(pinned) WHERE pinned = TRUE;
CREATE INDEX IF NOT EXISTS idx_character_notes_archived ON character_notes(archived);
CREATE INDEX IF NOT EXISTS idx_character_notes_tags ON character_notes USING GIN(tags);

-- Add full-text search support
ALTER TABLE character_notes
ADD COLUMN IF NOT EXISTS content_tsv tsvector;

-- Create trigger to automatically update tsvector
CREATE OR REPLACE FUNCTION character_notes_content_trigger() RETURNS trigger AS $$
begin
  new.content_tsv :=
    setweight(to_tsvector('english', coalesce(new.content,'')), 'A');
  return new;
end
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tsvectorupdate ON character_notes;
CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
ON character_notes FOR EACH ROW EXECUTE FUNCTION character_notes_content_trigger();

-- Create GIN index for full-text search
CREATE INDEX IF NOT EXISTS idx_character_notes_content_search ON character_notes USING GIN(content_tsv);

-- Update existing rows to populate tsvector
UPDATE character_notes SET content_tsv = to_tsvector('english', coalesce(content, ''));
