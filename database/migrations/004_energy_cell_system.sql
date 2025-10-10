-- Migration 004: Energy Cell Loading System + Item Management
-- Adds energy cell loading and consumable usage tracking

-- Add energy cell loading columns to inventory
ALTER TABLE inventory 
ADD COLUMN IF NOT EXISTS loaded_energy_cell_id INTEGER REFERENCES inventory(id),
ADD COLUMN IF NOT EXISTS in_use_by_item_id INTEGER REFERENCES inventory(id);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_inventory_energy_cell_loaded ON inventory(loaded_energy_cell_id) WHERE loaded_energy_cell_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_inventory_in_use ON inventory(in_use_by_item_id) WHERE in_use_by_item_id IS NOT NULL;

-- Add comments
COMMENT ON COLUMN inventory.loaded_energy_cell_id IS 'ID of the energy cell loaded into this EC gear (if applicable)';
COMMENT ON COLUMN inventory.in_use_by_item_id IS 'ID of the gear this energy cell is loaded into (for energy cells only)';

-- Ensure energy cells have proper item_type
UPDATE inventory 
SET item_type = 'consumable'
WHERE LOWER(item_name) LIKE '%energy cell%' AND item_type IS NULL;

UPDATE gear_database
SET category = 'consumable'
WHERE LOWER(name) LIKE '%energy cell%' AND category IS NULL;
