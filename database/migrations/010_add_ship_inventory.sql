-- Migration: Add ship inventory system
-- Allows ships to carry cargo items

-- Create ship_inventory table (similar to character inventory)
CREATE TABLE IF NOT EXISTS ship_inventory (
    id SERIAL PRIMARY KEY,
    ship_id INTEGER REFERENCES ships(id) ON DELETE CASCADE,
    item_name VARCHAR(100) NOT NULL,
    item_type VARCHAR(50),
    quantity INTEGER DEFAULT 1,
    description TEXT,
    weight INTEGER DEFAULT 0,
    damage VARCHAR(20),
    range VARCHAR(20),
    properties TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure we don't duplicate items on same ship
    UNIQUE(ship_id, item_name)
);

-- Create index for faster queries
CREATE INDEX idx_ship_inventory_ship ON ship_inventory(ship_id);

-- Add activity log for cargo transfers
-- (activity_log already exists, just documenting usage)
-- action_type will be: 'cargo_loaded', 'cargo_unloaded'
