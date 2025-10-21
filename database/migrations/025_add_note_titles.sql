-- Migration: Add titles to character notes
-- Adds optional title field for better note organization

ALTER TABLE character_notes
ADD COLUMN IF NOT EXISTS title VARCHAR(200);

-- Add index for title search
CREATE INDEX IF NOT EXISTS idx_character_notes_title ON character_notes(title);

-- Update the full-text search to include titles
DROP TRIGGER IF EXISTS tsvectorupdate ON character_notes;

CREATE OR REPLACE FUNCTION character_notes_content_trigger() RETURNS trigger AS $$
begin
  new.content_tsv :=
    setweight(to_tsvector('english', coalesce(new.title,'')), 'A') ||
    setweight(to_tsvector('english', coalesce(new.content,'')), 'B');
  return new;
end
$$ LANGUAGE plpgsql;

CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
ON character_notes FOR EACH ROW EXECUTE FUNCTION character_notes_content_trigger();

-- Update existing rows to populate tsvector with new title logic
UPDATE character_notes SET content_tsv =
  setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(content, '')), 'B');
