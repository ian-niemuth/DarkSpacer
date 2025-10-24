-- Migration 026: Consumable Energy Cell Timer System
-- Adds timer tracking for energy cells that are consumed over time (EC(c) property)

-- Add timer columns to inventory for tracking consumable energy cells
ALTER TABLE inventory
ADD COLUMN IF NOT EXISTS energy_cell_loaded_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS energy_cell_expires_at TIMESTAMP;

-- Add indexes for performance (finding expiring/expired cells)
CREATE INDEX IF NOT EXISTS idx_inventory_energy_expires ON inventory(energy_cell_expires_at)
WHERE energy_cell_expires_at IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_inventory_energy_loaded ON inventory(energy_cell_loaded_at)
WHERE energy_cell_loaded_at IS NOT NULL;

-- Add comments
COMMENT ON COLUMN inventory.energy_cell_loaded_at IS 'Timestamp when a consumable energy cell (EC(c)) was loaded into this item';
COMMENT ON COLUMN inventory.energy_cell_expires_at IS 'Timestamp when the consumable energy cell will expire and be deleted (typically loaded_at + 1 hour)';

-- Update Glowrod and Rebreather to have EC(c) property
UPDATE gear_database
SET properties = CASE
    WHEN properties IS NULL OR properties = '' THEN 'EC(c)'
    ELSE properties || ', EC(c)'
END
WHERE LOWER(name) = 'glowrod';

UPDATE gear_database
SET properties = CASE
    WHEN properties IS NULL OR properties = '' THEN 'EC(c)'
    ELSE properties || ', EC(c)'
END
WHERE LOWER(name) = 'rebreather';
