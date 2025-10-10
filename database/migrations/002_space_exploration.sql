-- ================================================
-- DARKSPACE PROCEDURAL SPACE GENERATION SYSTEM
-- ================================================

-- ================================================
-- CAMPAIGNS (Root level - one per game)
-- ================================================
CREATE TABLE IF NOT EXISTS campaigns (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    seed VARCHAR(100) NOT NULL, -- Deterministic seed for generation
    starting_galaxy_id INTEGER,
    starting_region_id INTEGER,
    starting_sector_id INTEGER,
    starting_system_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

-- ================================================
-- GALAXIES
-- ================================================
CREATE TABLE IF NOT EXISTS galaxies (
    id SERIAL PRIMARY KEY,
    campaign_id INTEGER REFERENCES campaigns(id) ON DELETE CASCADE,
    
    -- Identity
    name VARCHAR(100) NOT NULL,
    galaxy_code VARCHAR(20) NOT NULL, -- G001, G002, etc.
    
    -- Coordinates (for multi-galaxy systems)
    x_coord INTEGER NOT NULL,
    y_coord INTEGER NOT NULL,
    z_coord INTEGER DEFAULT 0,
    
    -- Properties
    galaxy_type VARCHAR(50), -- Spiral, Elliptical, Irregular, Dwarf
    danger_tier INTEGER DEFAULT 1, -- 1-5 scale
    
    -- Generation metadata
    seed_hash VARCHAR(100), -- Deterministic hash for this galaxy
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    description TEXT,
    UNIQUE(campaign_id, galaxy_code)
);

-- ================================================
-- REGIONS (Collections of sectors)
-- ================================================
CREATE TABLE IF NOT EXISTS regions (
    id SERIAL PRIMARY KEY,
    galaxy_id INTEGER REFERENCES galaxies(id) ON DELETE CASCADE,
    
    -- Identity
    name VARCHAR(100) NOT NULL,
    region_code VARCHAR(20) NOT NULL, -- R001, R002, etc.
    
    -- Coordinates within galaxy
    x_coord INTEGER NOT NULL,
    y_coord INTEGER NOT NULL,
    
    -- Properties
    danger_tier INTEGER DEFAULT 1,
    faction_control VARCHAR(50), -- Neutral, Empire, Rebels, Corporate, etc.
    
    -- Generation metadata
    seed_hash VARCHAR(100),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    description TEXT,
    UNIQUE(galaxy_id, region_code)
);

-- ================================================
-- SECTORS (Collections of systems)
-- ================================================
CREATE TABLE IF NOT EXISTS sectors (
    id SERIAL PRIMARY KEY,
    region_id INTEGER REFERENCES regions(id) ON DELETE CASCADE,
    
    -- Identity
    name VARCHAR(100) NOT NULL,
    sector_code VARCHAR(20) NOT NULL, -- S001, S002, etc.
    
    -- Coordinates within region
    x_coord INTEGER NOT NULL,
    y_coord INTEGER NOT NULL,
    
    -- Properties
    danger_tier INTEGER DEFAULT 1,
    trade_hub BOOLEAN DEFAULT FALSE,
    faction_control VARCHAR(50),
    
    -- Generation metadata
    seed_hash VARCHAR(100),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    description TEXT,
    UNIQUE(region_id, sector_code)
);

-- ================================================
-- SYSTEMS (Collections of celestial bodies)
-- ================================================
CREATE TABLE IF NOT EXISTS systems (
    id SERIAL PRIMARY KEY,
    sector_id INTEGER REFERENCES sectors(id) ON DELETE CASCADE,
    
    -- Identity
    name VARCHAR(100) NOT NULL,
    system_code VARCHAR(20) NOT NULL, -- SYS001, SYS002, etc.
    
    -- Coordinates within sector
    x_coord INTEGER NOT NULL,
    y_coord INTEGER NOT NULL,
    
    -- Properties
    star_count INTEGER DEFAULT 1, -- 1-3 stars
    star_types JSONB, -- Array of star types: Red Giant, Blue Star, Yellow Dwarf, etc.
    danger_tier INTEGER DEFAULT 1,
    has_habitable_zone BOOLEAN DEFAULT TRUE,
    
    -- Civilization summary
    total_population BIGINT DEFAULT 0,
    highest_tech_level INTEGER DEFAULT 0, -- 0-10 scale
    dominant_faction VARCHAR(50),
    
    -- Generation metadata
    seed_hash VARCHAR(100),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    description TEXT,
    UNIQUE(sector_id, system_code)
);

-- ================================================
-- CELESTIAL BODIES (Planets, Moons, Stations, Asteroids)
-- ================================================
CREATE TABLE IF NOT EXISTS celestial_bodies (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems(id) ON DELETE CASCADE,
    parent_body_id INTEGER REFERENCES celestial_bodies(id) ON DELETE CASCADE, -- For moons
    
    -- Identity
    name VARCHAR(100) NOT NULL,
    body_code VARCHAR(20) NOT NULL,
    body_type VARCHAR(50) NOT NULL, -- Planet, Moon, Station, Asteroid, Gas Giant
    
    -- Orbital position
    orbital_position INTEGER, -- 1, 2, 3, etc from star
    x_coord DECIMAL(10,2),
    y_coord DECIMAL(10,2),
    
    -- === CIVILIZATION (Priority 1) ===
    population BIGINT DEFAULT 0,
    tech_level INTEGER DEFAULT 0, -- 0=Primitive, 5=Modern, 10=Advanced
    faction_control VARCHAR(50),
    settlement_count INTEGER DEFAULT 0,
    has_spaceport BOOLEAN DEFAULT FALSE,
    spaceport_class VARCHAR(20), -- Small, Medium, Large, Major Hub
    government_type VARCHAR(50), -- Democracy, Autocracy, Corporate, Anarchy, etc.
    
    -- === BIOLOGY (Priority 2) ===
    habitability_rating INTEGER DEFAULT 0, -- 0=Uninhabitable, 10=Perfect
    has_life BOOLEAN DEFAULT FALSE,
    ecosystem_type VARCHAR(50), -- Barren, Sparse, Moderate, Lush, Exotic
    flora_danger INTEGER DEFAULT 0, -- 0-10 scale
    fauna_danger INTEGER DEFAULT 0, -- 0-10 scale
    indigenous_sapient_life BOOLEAN DEFAULT FALSE,
    biological_notes TEXT,
    
    -- === ENVIRONMENT (Priority 3) ===
    atmosphere_type VARCHAR(50), -- None, Thin, Breathable, Toxic, Corrosive
    atmosphere_composition JSONB, -- Nitrogen, Oxygen, etc percentages
    temperature_avg INTEGER, -- In Celsius
    temperature_range VARCHAR(50), -- Freezing, Cold, Temperate, Hot, Inferno
    weather_severity INTEGER DEFAULT 0, -- 0-10 scale
    radiation_level INTEGER DEFAULT 0, -- 0=Safe, 5=Moderate, 10=Lethal
    has_water BOOLEAN DEFAULT FALSE,
    
    -- === RESOURCES (Priority 4) ===
    mineral_richness INTEGER DEFAULT 0, -- 0-10 scale
    fuel_deposits BOOLEAN DEFAULT FALSE,
    rare_elements BOOLEAN DEFAULT FALSE,
    salvage_opportunities INTEGER DEFAULT 0, -- 0-10 scale
    trade_goods JSONB, -- Array of available trade goods
    
    -- === PHYSICAL (Priority 5) ===
    size_class VARCHAR(20), -- Tiny, Small, Medium, Large, Huge
    diameter_km INTEGER,
    gravity DECIMAL(3,2) DEFAULT 1.0, -- Earth gravity = 1.0
    moon_count INTEGER DEFAULT 0,
    has_rings BOOLEAN DEFAULT FALSE,
    
    -- Danger assessment
    overall_danger INTEGER DEFAULT 1, -- 1-10 scale (calculated)
    
    -- Generation metadata
    seed_hash VARCHAR(100),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    notes TEXT,
    UNIQUE(system_id, body_code)
);

-- ================================================
-- SPACE HAZARDS (Dangerous areas in space)
-- ================================================
CREATE TABLE IF NOT EXISTS space_hazards (
    id SERIAL PRIMARY KEY,
    
    -- Location (one of these will be set)
    galaxy_id INTEGER REFERENCES galaxies(id) ON DELETE CASCADE,
    region_id INTEGER REFERENCES regions(id) ON DELETE CASCADE,
    sector_id INTEGER REFERENCES sectors(id) ON DELETE CASCADE,
    system_id INTEGER REFERENCES systems(id) ON DELETE CASCADE,
    
    -- Identity
    name VARCHAR(100) NOT NULL,
    hazard_type VARCHAR(50) NOT NULL, -- Asteroid Field, Nebula, Radiation Field, Black Hole, Wormhole, Temporal Anomaly
    
    -- Position
    x_coord DECIMAL(10,2),
    y_coord DECIMAL(10,2),
    radius DECIMAL(10,2), -- Area of effect
    
    -- Properties (varies by type)
    intensity INTEGER DEFAULT 1, -- 1=Mild, 2=Moderate, 3=Severe
    is_navigable BOOLEAN DEFAULT TRUE, -- Can FTL through it?
    properties JSONB, -- Type-specific data
    
    -- Generation metadata
    seed_hash VARCHAR(100),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    description TEXT
);

-- ================================================
-- SHIP DISCOVERIES (What each ship knows - requires Memory Bank)
-- ================================================
CREATE TABLE IF NOT EXISTS ship_discoveries (
    id SERIAL PRIMARY KEY,
    ship_id INTEGER REFERENCES ships(id) ON DELETE CASCADE,
    
    -- What was discovered (one of these will be set)
    galaxy_id INTEGER REFERENCES galaxies(id) ON DELETE CASCADE,
    region_id INTEGER REFERENCES regions(id) ON DELETE CASCADE,
    sector_id INTEGER REFERENCES sectors(id) ON DELETE CASCADE,
    system_id INTEGER REFERENCES systems(id) ON DELETE CASCADE,
    celestial_body_id INTEGER REFERENCES celestial_bodies(id) ON DELETE CASCADE,
    space_hazard_id INTEGER REFERENCES space_hazards(id) ON DELETE CASCADE,
    
    -- Discovery details
    discovered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    discovery_method VARCHAR(50), -- Sensor Scan, Visual, Star Chart, Astrogation Mishap, etc.
    
    -- Star chart quality (for memory banks)
    has_basic_data BOOLEAN DEFAULT TRUE, -- Name, type, coordinates
    has_detailed_scan BOOLEAN DEFAULT FALSE, -- Full properties revealed
    
    notes TEXT,
    
    -- Prevent duplicate discoveries
    UNIQUE(ship_id, galaxy_id),
    UNIQUE(ship_id, region_id),
    UNIQUE(ship_id, sector_id),
    UNIQUE(ship_id, system_id),
    UNIQUE(ship_id, celestial_body_id),
    UNIQUE(ship_id, space_hazard_id)
);

-- ================================================
-- INDEXES for performance
-- ================================================
CREATE INDEX IF NOT EXISTS idx_galaxies_campaign ON galaxies(campaign_id);
CREATE INDEX IF NOT EXISTS idx_galaxies_coords ON galaxies(x_coord, y_coord);

CREATE INDEX IF NOT EXISTS idx_regions_galaxy ON regions(galaxy_id);
CREATE INDEX IF NOT EXISTS idx_regions_coords ON regions(x_coord, y_coord);

CREATE INDEX IF NOT EXISTS idx_sectors_region ON sectors(region_id);
CREATE INDEX IF NOT EXISTS idx_sectors_coords ON sectors(x_coord, y_coord);

CREATE INDEX IF NOT EXISTS idx_systems_sector ON systems(sector_id);
CREATE INDEX IF NOT EXISTS idx_systems_coords ON systems(x_coord, y_coord);

CREATE INDEX IF NOT EXISTS idx_celestial_system ON celestial_bodies(system_id);
CREATE INDEX IF NOT EXISTS idx_celestial_parent ON celestial_bodies(parent_body_id);
CREATE INDEX IF NOT EXISTS idx_celestial_coords ON celestial_bodies(x_coord, y_coord);

CREATE INDEX IF NOT EXISTS idx_hazards_galaxy ON space_hazards(galaxy_id);
CREATE INDEX IF NOT EXISTS idx_hazards_region ON space_hazards(region_id);
CREATE INDEX IF NOT EXISTS idx_hazards_sector ON space_hazards(sector_id);
CREATE INDEX IF NOT EXISTS idx_hazards_system ON space_hazards(system_id);

CREATE INDEX IF NOT EXISTS idx_discoveries_ship ON ship_discoveries(ship_id);
CREATE INDEX IF NOT EXISTS idx_discoveries_galaxy ON ship_discoveries(galaxy_id);
CREATE INDEX IF NOT EXISTS idx_discoveries_region ON ship_discoveries(region_id);
CREATE INDEX IF NOT EXISTS idx_discoveries_sector ON ship_discoveries(sector_id);
CREATE INDEX IF NOT EXISTS idx_discoveries_system ON ship_discoveries(system_id);
CREATE INDEX IF NOT EXISTS idx_discoveries_celestial ON ship_discoveries(celestial_body_id);

-- ================================================
-- SEED DATA - Create default campaign with starting sector
-- ================================================
INSERT INTO campaigns (name, seed) VALUES 
('Default Campaign', 'darkspace-2025')
ON CONFLICT DO NOTHING;
