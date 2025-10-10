-- Fix: Change weight from INTEGER to NUMERIC to support decimal weights
-- Energy Cells and other items can have fractional weights (0.5 = 2 per slot)

ALTER TABLE ship_inventory ALTER COLUMN weight TYPE NUMERIC(10,2);
