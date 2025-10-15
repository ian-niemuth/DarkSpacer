-- ============================================
-- GALAXY / STAR MAP SYSTEM
-- Migration 020
-- ============================================
-- This migration creates tables for the galaxy star map system
-- Used by ships with Memory Bank component installed and online

-- ============================================
-- GALAXY REGIONS (Highest level container)
-- ============================================
CREATE TABLE IF NOT EXISTS galaxy_regions (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100), -- 'outer-rim', 'inner-core', 'outer-core', etc.
  x DECIMAL(12, 6) NOT NULL,
  y DECIMAL(12, 6) NOT NULL,
  z DECIMAL(12, 6) NOT NULL,
  radius DECIMAL(12, 2),
  controlled_by VARCHAR(255), -- Faction/empire name
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_galaxy_regions_coords ON galaxy_regions(x, y, z);

-- ============================================
-- GALAXY SECTORS (Contained within regions)
-- ============================================
CREATE TABLE IF NOT EXISTS galaxy_sectors (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  region_id VARCHAR(255) REFERENCES galaxy_regions(id) ON DELETE CASCADE,
  x DECIMAL(12, 6) NOT NULL,
  y DECIMAL(12, 6) NOT NULL,
  z DECIMAL(12, 6) NOT NULL,
  radius DECIMAL(12, 2),
  controlled_by VARCHAR(255),
  contested BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_galaxy_sectors_region ON galaxy_sectors(region_id);
CREATE INDEX IF NOT EXISTS idx_galaxy_sectors_coords ON galaxy_sectors(x, y, z);

-- ============================================
-- GALAXY SYSTEMS (Contained within sectors)
-- ============================================
CREATE TABLE IF NOT EXISTS galaxy_systems (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  sector_id VARCHAR(255) REFERENCES galaxy_sectors(id) ON DELETE CASCADE,
  x DECIMAL(12, 6) NOT NULL,
  y DECIMAL(12, 6) NOT NULL,
  z DECIMAL(12, 6) NOT NULL,
  system_type VARCHAR(100), -- binary, single, etc.
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_galaxy_systems_sector ON galaxy_systems(sector_id);
CREATE INDEX IF NOT EXISTS idx_galaxy_systems_coords ON galaxy_systems(x, y, z);

-- ============================================
-- GALAXY STARS (Contained within systems)
-- ============================================
CREATE TABLE IF NOT EXISTS galaxy_stars (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  system_id VARCHAR(255) REFERENCES galaxy_systems(id) ON DELETE CASCADE,
  x DECIMAL(12, 6) NOT NULL,
  y DECIMAL(12, 6) NOT NULL,
  z DECIMAL(12, 6) NOT NULL,
  spectral_type VARCHAR(10), -- O, B, A, F, G, K, M
  mass DECIMAL(12, 4), -- Solar masses
  age DECIMAL(12, 4), -- Billions of years
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_galaxy_stars_system ON galaxy_stars(system_id);
CREATE INDEX IF NOT EXISTS idx_galaxy_stars_coords ON galaxy_stars(x, y, z);

-- ============================================
-- GALAXY PLANETS (Orbiting stars)
-- ============================================
CREATE TABLE IF NOT EXISTS galaxy_planets (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  star_id VARCHAR(255) REFERENCES galaxy_stars(id) ON DELETE CASCADE,
  planet_type VARCHAR(100), -- terrestrial, gas-giant, ice-giant, etc.
  orbit DECIMAL(12, 4), -- AU from star
  habitability INT DEFAULT 0, -- 0-100
  temperature INT, -- Kelvin
  atmosphere VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_galaxy_planets_star ON galaxy_planets(star_id);
CREATE INDEX IF NOT EXISTS idx_galaxy_planets_habitability ON galaxy_planets(habitability);

-- ============================================
-- GALAXY HAZARDS (Dangerous zones in sectors)
-- ============================================
CREATE TABLE IF NOT EXISTS galaxy_hazards (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  sector_id VARCHAR(255) REFERENCES galaxy_sectors(id) ON DELETE CASCADE,
  hazard_type VARCHAR(100), -- asteroid-field, nebula, radiation, etc.
  x DECIMAL(12, 6) NOT NULL,
  y DECIMAL(12, 6) NOT NULL,
  z DECIMAL(12, 6) NOT NULL,
  radius DECIMAL(12, 2),
  severity VARCHAR(50), -- low, medium, high, extreme
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_galaxy_hazards_sector ON galaxy_hazards(sector_id);

-- ============================================
-- SHIP LOCATIONS (Current position of each ship)
-- ============================================
CREATE TABLE IF NOT EXISTS ship_locations (
  ship_id INTEGER PRIMARY KEY REFERENCES ships(id) ON DELETE CASCADE,
  x DECIMAL(12, 6) NOT NULL DEFAULT 0,
  y DECIMAL(12, 6) NOT NULL DEFAULT 0,
  z DECIMAL(12, 6) NOT NULL DEFAULT 0,
  current_region_id VARCHAR(255) REFERENCES galaxy_regions(id) ON DELETE SET NULL,
  current_sector_id VARCHAR(255) REFERENCES galaxy_sectors(id) ON DELETE SET NULL,
  current_system_id VARCHAR(255) REFERENCES galaxy_systems(id) ON DELETE SET NULL,
  last_updated TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ship_locations_coords ON ship_locations(x, y, z);
CREATE INDEX IF NOT EXISTS idx_ship_locations_region ON ship_locations(current_region_id);
CREATE INDEX IF NOT EXISTS idx_ship_locations_sector ON ship_locations(current_sector_id);
CREATE INDEX IF NOT EXISTS idx_ship_locations_system ON ship_locations(current_system_id);

-- ============================================
-- SHIP DISCOVERIES (Future use - fog of war)
-- ============================================
-- Tracks what each ship has discovered
-- Requires Memory Bank component to store discoveries
CREATE TABLE IF NOT EXISTS ship_discoveries (
  id SERIAL PRIMARY KEY,
  ship_id INTEGER REFERENCES ships(id) ON DELETE CASCADE,
  discovery_type VARCHAR(50) NOT NULL, -- 'region', 'sector', 'system', 'star', 'planet', 'hazard'
  discovery_id VARCHAR(255) NOT NULL, -- ID of the discovered object
  discovered_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(ship_id, discovery_type, discovery_id)
);

CREATE INDEX IF NOT EXISTS idx_ship_discoveries_ship ON ship_discoveries(ship_id);
CREATE INDEX IF NOT EXISTS idx_ship_discoveries_type ON ship_discoveries(discovery_type, discovery_id);

-- ============================================
-- NOTES:
-- ============================================
-- 1. Run the data import script after this migration to populate galaxy data
-- 2. Memory Bank component check is handled in backend API routes
-- 3. Ship locations are initialized to (0,0,0) by default
-- 4. Discovery system is prepared but not yet implemented
