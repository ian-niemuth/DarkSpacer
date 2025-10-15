-- ============================================
-- ENHANCE DISCOVERY SYSTEM
-- Migration 021
-- ============================================
-- Adds fog of war, progressive discovery, and sensor range features
-- to the ship_discoveries table

-- ============================================
-- 1. Add discovery detail columns to ship_discoveries
-- ============================================
ALTER TABLE ship_discoveries
  ADD COLUMN IF NOT EXISTS discovery_method VARCHAR(50) DEFAULT 'sensor_scan',
  ADD COLUMN IF NOT EXISTS detail_level INTEGER DEFAULT 2,
  ADD COLUMN IF NOT EXISTS sensor_range DECIMAL(12, 2);

-- discovery_method: 'sensor_scan', 'visual', 'jump', 'chart_purchase', 'shared'
-- detail_level:
--   0 = undiscovered (not in table)
--   1 = in sensor range (scanned, basic info)
--   2 = fully discovered (visited or charted)
-- sensor_range: Range of sensors when discovery was made (for audit/tracking)

COMMENT ON COLUMN ship_discoveries.discovery_method IS 'How the object was discovered: sensor_scan, visual, jump, chart_purchase, shared';
COMMENT ON COLUMN ship_discoveries.detail_level IS 'Level of detail: 1=scanned (basic), 2=fully discovered';
COMMENT ON COLUMN ship_discoveries.sensor_range IS 'Sensor range when discovered (for tracking)';

-- ============================================
-- 2. Add indexes for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_ship_discoveries_detail_level ON ship_discoveries(detail_level);
CREATE INDEX IF NOT EXISTS idx_ship_discoveries_method ON ship_discoveries(discovery_method);

-- ============================================
-- 3. Create view for easy discovery queries
-- ============================================
CREATE OR REPLACE VIEW ship_discovery_summary AS
SELECT
  s.id as ship_id,
  s.name as ship_name,
  COUNT(DISTINCT CASE WHEN sd.discovery_type = 'region' THEN sd.discovery_id END) as regions_discovered,
  COUNT(DISTINCT CASE WHEN sd.discovery_type = 'sector' THEN sd.discovery_id END) as sectors_discovered,
  COUNT(DISTINCT CASE WHEN sd.discovery_type = 'system' THEN sd.discovery_id END) as systems_discovered,
  COUNT(DISTINCT CASE WHEN sd.discovery_type = 'star' THEN sd.discovery_id END) as stars_discovered,
  COUNT(DISTINCT CASE WHEN sd.discovery_type = 'planet' THEN sd.discovery_id END) as planets_discovered,
  COUNT(DISTINCT sd.id) as total_discoveries
FROM ships s
LEFT JOIN ship_discoveries sd ON s.id = sd.ship_id
GROUP BY s.id, s.name;

-- ============================================
-- 4. Helper function: Get sensor range for a ship
-- ============================================
CREATE OR REPLACE FUNCTION get_ship_sensor_range(p_ship_id INTEGER)
RETURNS DECIMAL(12, 2) AS $$
DECLARE
  v_sensor_range DECIMAL(12, 2);
BEGIN
  -- Check if ship has Sensor Array component enabled
  SELECT
    CASE
      WHEN LOWER(ct.name) = 'sensor array' THEN 100.0
      WHEN LOWER(ct.name) = 'advanced sensor array' THEN 300.0
      WHEN LOWER(ct.name) = 'advanced sensors' THEN 300.0
      WHEN LOWER(ct.name) = 'deep space scanner' THEN 500.0
      ELSE 0.0
    END INTO v_sensor_range
  FROM ship_components sc
  JOIN component_templates ct ON sc.component_template_id = ct.id
  WHERE sc.ship_id = p_ship_id
    AND LOWER(ct.name) LIKE '%sensor%'
    AND sc.maintenance_enabled = true
  ORDER BY
    CASE
      WHEN LOWER(ct.name) = 'deep space scanner' THEN 1
      WHEN LOWER(ct.name) = 'advanced sensor array' THEN 2
      WHEN LOWER(ct.name) = 'advanced sensors' THEN 2
      WHEN LOWER(ct.name) = 'sensor array' THEN 3
      ELSE 4
    END
  LIMIT 1;

  -- Default to 10 ly if no sensor components found (built-in ship sensors)
  RETURN COALESCE(v_sensor_range, 10.0);
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 5. Helper function: Check if ship has advanced memory bank
-- ============================================
CREATE OR REPLACE FUNCTION has_advanced_memory_bank(p_ship_id INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
  v_has_advanced BOOLEAN;
BEGIN
  SELECT EXISTS(
    SELECT 1
    FROM ship_components sc
    JOIN component_templates ct ON sc.component_template_id = ct.id
    WHERE sc.ship_id = p_ship_id
      AND LOWER(ct.name) LIKE '%advanced memory bank%'
      AND sc.maintenance_enabled = true
  ) INTO v_has_advanced;

  RETURN COALESCE(v_has_advanced, false);
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 6. Helper function: Auto-discover objects in sensor range
-- ============================================
CREATE OR REPLACE FUNCTION auto_discover_in_range(
  p_ship_id INTEGER,
  p_ship_x DECIMAL(12, 6),
  p_ship_y DECIMAL(12, 6),
  p_ship_z DECIMAL(12, 6)
)
RETURNS TABLE(
  discovery_type VARCHAR(50),
  discovery_id VARCHAR(255),
  object_name VARCHAR(255),
  distance DECIMAL(12, 2)
) AS $$
DECLARE
  v_sensor_range DECIMAL(12, 2);
  v_has_advanced BOOLEAN;
BEGIN
  -- Get ship's sensor range
  v_sensor_range := get_ship_sensor_range(p_ship_id);

  -- Check if ship has advanced memory bank (which reveals everything)
  v_has_advanced := has_advanced_memory_bank(p_ship_id);

  -- If advanced memory bank, don't need to discover anything (already see everything)
  IF v_has_advanced THEN
    RETURN;
  END IF;

  -- If no sensors, can't discover anything
  IF v_sensor_range = 0 THEN
    RETURN;
  END IF;

  -- Discover regions in range
  RETURN QUERY
  INSERT INTO ship_discoveries (ship_id, discovery_type, discovery_id, discovery_method, detail_level, sensor_range)
  SELECT DISTINCT
    p_ship_id,
    'region',
    gr.id,
    'sensor_scan',
    1, -- Basic detail level for auto-discovery
    v_sensor_range
  FROM galaxy_regions gr
  WHERE SQRT(
    POWER(gr.x - p_ship_x, 2) +
    POWER(gr.y - p_ship_y, 2) +
    POWER(gr.z - p_ship_z, 2)
  ) <= v_sensor_range
  ON CONFLICT (ship_id, discovery_type, discovery_id) DO NOTHING
  RETURNING 'region', discovery_id, NULL::VARCHAR(255), v_sensor_range;

  -- Discover sectors in range
  RETURN QUERY
  INSERT INTO ship_discoveries (ship_id, discovery_type, discovery_id, discovery_method, detail_level, sensor_range)
  SELECT DISTINCT
    p_ship_id,
    'sector',
    gs.id,
    'sensor_scan',
    1,
    v_sensor_range
  FROM galaxy_sectors gs
  WHERE SQRT(
    POWER(gs.x - p_ship_x, 2) +
    POWER(gs.y - p_ship_y, 2) +
    POWER(gs.z - p_ship_z, 2)
  ) <= v_sensor_range
  ON CONFLICT (ship_id, discovery_type, discovery_id) DO NOTHING
  RETURNING 'sector', discovery_id, NULL::VARCHAR(255), v_sensor_range;

  -- Discover systems in range
  RETURN QUERY
  INSERT INTO ship_discoveries (ship_id, discovery_type, discovery_id, discovery_method, detail_level, sensor_range)
  SELECT DISTINCT
    p_ship_id,
    'system',
    gsy.id,
    'sensor_scan',
    1,
    v_sensor_range
  FROM galaxy_systems gsy
  WHERE SQRT(
    POWER(gsy.x - p_ship_x, 2) +
    POWER(gsy.y - p_ship_y, 2) +
    POWER(gsy.z - p_ship_z, 2)
  ) <= v_sensor_range
  ON CONFLICT (ship_id, discovery_type, discovery_id) DO NOTHING
  RETURNING 'system', discovery_id, NULL::VARCHAR(255), v_sensor_range;

  -- Discover stars in range
  RETURN QUERY
  INSERT INTO ship_discoveries (ship_id, discovery_type, discovery_id, discovery_method, detail_level, sensor_range)
  SELECT DISTINCT
    p_ship_id,
    'star',
    gst.id,
    'sensor_scan',
    1,
    v_sensor_range
  FROM galaxy_stars gst
  WHERE SQRT(
    POWER(gst.x - p_ship_x, 2) +
    POWER(gst.y - p_ship_y, 2) +
    POWER(gst.z - p_ship_z, 2)
  ) <= v_sensor_range
  ON CONFLICT (ship_id, discovery_type, discovery_id) DO NOTHING
  RETURNING 'star', discovery_id, NULL::VARCHAR(255), v_sensor_range;

END;
$$ LANGUAGE plpgsql;

-- ============================================
-- NOTES:
-- ============================================
-- 1. Discovery system is now ready for fog of war implementation
-- 2. Ships with Advanced Memory Bank bypass all discovery checks
-- 3. Sensor range determines auto-discovery radius
-- 4. Detail levels: 0 (undiscovered) -> 1 (scanned) -> 2 (fully explored)
-- 5. Use auto_discover_in_range() function when ship moves or scans
