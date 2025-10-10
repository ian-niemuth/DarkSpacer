-- ================================================
-- DARKSPACE SHIP SYSTEM - COMPLETE DATABASE SCHEMA (PostgreSQL)
-- ================================================

-- ================================================
-- CORE SHIP TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS ships (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    ship_class VARCHAR(50) NOT NULL, -- Fighter, Freighter, Capital
    
    -- Ownership
    owner_type VARCHAR(20), -- 'party' or 'character'
    owner_id INTEGER, -- character_id if owned by character, NULL if party
    
    -- Ship Stats (like character stats)
    strength INTEGER DEFAULT 10,
    dexterity INTEGER DEFAULT 10,
    constitution INTEGER DEFAULT 10,
    intelligence INTEGER DEFAULT 10,
    wisdom INTEGER DEFAULT 10,
    charisma INTEGER DEFAULT 10,
    
    -- Combat Stats
    ac INTEGER DEFAULT 10,
    hp_current INTEGER DEFAULT 10,
    hp_max INTEGER DEFAULT 10,
    level INTEGER DEFAULT 1,
    movement VARCHAR(50) DEFAULT 'near', -- near, far, double near, etc.
    
    -- Slots
    system_slots_used INTEGER DEFAULT 0,
    system_slots_max INTEGER DEFAULT 10,
    feature_slots_used INTEGER DEFAULT 0,
    feature_slots_max INTEGER DEFAULT 10,
    
    -- Economy
    purchase_price INTEGER DEFAULT 0,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Metadata
    description TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================
-- COMPONENT TEMPLATES (Library of all components)
-- ================================================
CREATE TABLE IF NOT EXISTS component_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    component_type VARCHAR(20) NOT NULL, -- 'system' or 'feature'
    
    -- Costs
    initial_cost INTEGER NOT NULL,
    maintenance_cost INTEGER NOT NULL,
    
    -- Slot usage
    slots_required INTEGER DEFAULT 1,
    
    -- Properties
    description TEXT,
    properties JSONB, -- JSON for special properties
    
    -- Special flags
    can_be_advanced BOOLEAN DEFAULT FALSE,
    can_have_multiple BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================
-- WEAPON TEMPLATES (Library of all weapons)
-- ================================================
CREATE TABLE IF NOT EXISTS weapon_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL, -- 'Projectile Cannon', 'Laser Cannon', etc.
    
    -- Cost
    cost INTEGER NOT NULL,
    
    -- Combat stats
    range VARCHAR(10) NOT NULL, -- 'N' (Near), 'F' (Far)
    damage VARCHAR(20) NOT NULL, -- '1d6', '1d10', 'Disabling'
    
    -- Properties (Am, AP, EG, Bl, D, Single Use)
    properties JSONB, -- JSON
    
    -- Special
    requires_ammo BOOLEAN DEFAULT FALSE,
    requires_energy_generator BOOLEAN DEFAULT FALSE,
    is_single_use BOOLEAN DEFAULT FALSE,
    
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================
-- ARMOR TEMPLATES (Library of all armor)
-- ================================================
CREATE TABLE IF NOT EXISTS armor_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL, -- 'Light', 'Medium', 'Heavy', 'Energy Shields'
    
    -- Cost
    cost INTEGER NOT NULL,
    
    -- AC calculation
    ac_base INTEGER, -- NULL if modifier-based
    ac_formula VARCHAR(50), -- '11 + DEX', '13 + DEX/2', '15'
    ac_bonus INTEGER, -- For energy shields (+2)
    
    -- Properties
    properties JSONB, -- Ph, En, EG, S(1)
    
    -- Slot usage
    uses_system_slot BOOLEAN DEFAULT FALSE,
    system_slots_required INTEGER DEFAULT 0,
    
    -- Effects on maneuverability
    dex_modifier_effect VARCHAR(50), -- 'normal', 'halved', 'none'
    
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================
-- ENHANCEMENT TEMPLATES (Library of ship upgrades)
-- ================================================
CREATE TABLE IF NOT EXISTS enhancement_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    enhancement_type VARCHAR(20) NOT NULL, -- 'system' or 'feature'
    
    -- Cost
    cost INTEGER,
    
    -- Slot usage
    slots_required INTEGER DEFAULT 1,
    
    -- Effects
    benefit TEXT,
    drawback TEXT,
    stat_bonus VARCHAR(50), -- e.g., '+2 CHA checks'
    
    -- Properties
    properties JSONB, -- JSON
    
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================
-- SHIP COMPONENTS (Installed components on ships)
-- ================================================
CREATE TABLE IF NOT EXISTS ship_components (
    id SERIAL PRIMARY KEY,
    ship_id INTEGER NOT NULL,
    component_template_id INTEGER NOT NULL,
    
    -- Installation
    is_installed BOOLEAN DEFAULT TRUE,
    is_advanced BOOLEAN DEFAULT FALSE, -- Advanced version
    
    -- Maintenance tracking
    maintenance_enabled BOOLEAN DEFAULT TRUE,
    maintenance_paid BOOLEAN DEFAULT TRUE,
    maintenance_due_date DATE,
    
    -- Status
    is_damaged BOOLEAN DEFAULT FALSE,
    is_offline BOOLEAN DEFAULT FALSE,
    
    -- Instance-specific data
    instance_notes TEXT,
    
    installed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (ship_id) REFERENCES ships(id) ON DELETE CASCADE,
    FOREIGN KEY (component_template_id) REFERENCES component_templates(id)
);

-- ================================================
-- SHIP WEAPONS ARRAYS
-- ================================================
CREATE TABLE IF NOT EXISTS ship_weapons_arrays (
    id SERIAL PRIMARY KEY,
    ship_id INTEGER NOT NULL,
    
    -- Array properties
    array_name VARCHAR(50) DEFAULT 'Weapons Array',
    max_weapons INTEGER DEFAULT 4,
    
    -- Fire-linking
    is_firelinked BOOLEAN DEFAULT FALSE,
    firelink_cost_paid BOOLEAN DEFAULT FALSE,
    
    -- Status
    is_damaged BOOLEAN DEFAULT FALSE,
    
    -- Maintenance
    maintenance_enabled BOOLEAN DEFAULT TRUE,
    maintenance_paid BOOLEAN DEFAULT TRUE,
    base_maintenance_cost INTEGER DEFAULT 50,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (ship_id) REFERENCES ships(id) ON DELETE CASCADE
);

-- ================================================
-- SHIP WEAPONS (Individual weapons in arrays)
-- ================================================
CREATE TABLE IF NOT EXISTS ship_weapons (
    id SERIAL PRIMARY KEY,
    weapons_array_id INTEGER NOT NULL,
    weapon_template_id INTEGER NOT NULL,
    
    -- Position in array
    array_position INTEGER DEFAULT 1, -- 1-4
    
    -- Status
    is_damaged BOOLEAN DEFAULT FALSE,
    
    -- Ammo tracking (for projectile weapons)
    requires_ammo BOOLEAN DEFAULT FALSE,
    ammo_loaded BOOLEAN DEFAULT FALSE,
    
    -- Energy generator (for laser weapons)
    requires_energy_generator BOOLEAN DEFAULT FALSE,
    energy_generator_damaged BOOLEAN DEFAULT FALSE,
    
    -- Single-use weapons
    is_single_use BOOLEAN DEFAULT FALSE,
    is_used BOOLEAN DEFAULT FALSE,
    
    installed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (weapons_array_id) REFERENCES ship_weapons_arrays(id) ON DELETE CASCADE,
    FOREIGN KEY (weapon_template_id) REFERENCES weapon_templates(id)
);

-- ================================================
-- SHIP ARMOR (Armor installed on ships)
-- ================================================
CREATE TABLE IF NOT EXISTS ship_armor (
    id SERIAL PRIMARY KEY,
    ship_id INTEGER NOT NULL,
    armor_template_id INTEGER NOT NULL,
    
    -- Status
    is_damaged BOOLEAN DEFAULT FALSE,
    
    -- For energy shields
    energy_generator_damaged BOOLEAN DEFAULT FALSE,
    
    installed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (ship_id) REFERENCES ships(id) ON DELETE CASCADE,
    FOREIGN KEY (armor_template_id) REFERENCES armor_templates(id),
    
    CONSTRAINT unique_ship_armor UNIQUE(ship_id)
);

-- ================================================
-- SHIP ENHANCEMENTS (Special upgrades on ships)
-- ================================================
CREATE TABLE IF NOT EXISTS ship_enhancements (
    id SERIAL PRIMARY KEY,
    ship_id INTEGER NOT NULL,
    enhancement_template_id INTEGER NOT NULL,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    installed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (ship_id) REFERENCES ships(id) ON DELETE CASCADE,
    FOREIGN KEY (enhancement_template_id) REFERENCES enhancement_templates(id)
);

-- ================================================
-- SHIP CREW ASSIGNMENTS (Character roles on ships)
-- ================================================
CREATE TABLE IF NOT EXISTS ship_crew_assignments (
    id SERIAL PRIMARY KEY,
    ship_id INTEGER NOT NULL,
    character_id INTEGER NOT NULL,
    
    -- Role
    crew_role VARCHAR(50) NOT NULL, -- Captain, Pilot, Gunner, Engineer, etc.
    is_primary_role BOOLEAN DEFAULT TRUE,
    
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (ship_id) REFERENCES ships(id) ON DELETE CASCADE,
    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
    
    CONSTRAINT unique_ship_character_role UNIQUE(ship_id, character_id, crew_role)
);

-- ================================================
-- SHIP AMMO MAGAZINES (Ammo equipped to weapons by crew)
-- ================================================
CREATE TABLE IF NOT EXISTS ship_ammo_magazines (
    id SERIAL PRIMARY KEY,
    ship_weapon_id INTEGER NOT NULL,
    
    -- Who loaded it
    loaded_by_character_id INTEGER,
    
    -- Status
    is_depleted BOOLEAN DEFAULT FALSE,
    rounds_remaining INTEGER,
    
    loaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (ship_weapon_id) REFERENCES ship_weapons(id) ON DELETE CASCADE,
    FOREIGN KEY (loaded_by_character_id) REFERENCES characters(id) ON DELETE SET NULL
);

-- ================================================
-- INDEXES for performance
-- ================================================
CREATE INDEX IF NOT EXISTS idx_ship_components_ship ON ship_components(ship_id);
CREATE INDEX IF NOT EXISTS idx_ship_weapons_arrays_ship ON ship_weapons_arrays(ship_id);
CREATE INDEX IF NOT EXISTS idx_ship_weapons_array ON ship_weapons(weapons_array_id);
CREATE INDEX IF NOT EXISTS idx_ship_armor_ship ON ship_armor(ship_id);
CREATE INDEX IF NOT EXISTS idx_ship_enhancements_ship ON ship_enhancements(ship_id);
CREATE INDEX IF NOT EXISTS idx_ship_crew_ship ON ship_crew_assignments(ship_id);
CREATE INDEX IF NOT EXISTS idx_ship_crew_character ON ship_crew_assignments(character_id);
CREATE INDEX IF NOT EXISTS idx_ship_ammo_weapon ON ship_ammo_magazines(ship_weapon_id);

-- ================================================
-- SEED DATA - Component Templates
-- ================================================
INSERT INTO component_templates (name, component_type, initial_cost, maintenance_cost, slots_required, description, can_be_advanced, can_have_multiple, properties) VALUES
('Cargo Hold', 'feature', 1000, 500, 1, 'This ship is capable of carrying 10 units of bulk cargo.', FALSE, TRUE, '{}'),
('Crew Quarters', 'feature', 250, 250, 1, 'Bunks required to take a Rest while on the ship. 250cr per bunk up to 4.', FALSE, FALSE, '{}'),
('Communications Array', 'system', 1000, 500, 1, 'This ship is able to communicate over long distances.', TRUE, TRUE, '{}'),
('FTL Drive', 'system', 4000, 2000, 1, 'This ship is capable of traveling at FTL speed.', TRUE, FALSE, '{}'),
('Galley', 'feature', 500, 100, 1, 'A fully stocked kitchen area. A successful DC 12 WIS check, crew don''t use a ration during Resting.', FALSE, FALSE, '{}'),
('Medical Bay', 'feature', 700, 300, 1, 'A fully stocked medical facility. Using it to perform medical tasks grants advantage. A successful DC 15 INT check, an ally regains 1d6 hp.', FALSE, FALSE, '{}'),
('Memory Bank', 'system', 1000, 500, 1, 'Computer to store data and comes with a set of star charts.', TRUE, TRUE, '{}'),
('Navigational Computer', 'system', 1000, 500, 1, 'Used to make astrogation calculations.', TRUE, FALSE, '{}'),
('Sensor Array', 'system', 1000, 500, 1, 'Required to detect the presence of ships and objects up to FAR range.', TRUE, TRUE, '{}'),
('Smuggling Compartment', 'feature', 300, 100, 1, 'A small cargo hold that is hidden. A successful DC 15 WIS check to find it.', FALSE, TRUE, '{}'),
('Sublight Drive', 'system', 2000, 1000, 1, 'This ship is capable of traveling at sublight speed.', TRUE, FALSE, '{}')
ON CONFLICT (name) DO NOTHING;

-- ================================================
-- SEED DATA - Weapon Templates
-- ================================================
INSERT INTO weapon_templates (name, category, cost, range, damage, properties, requires_ammo, requires_energy_generator, is_single_use) VALUES
('Projectile Cannon, Light', 'Projectile', 100, 'N', '1d4', '{"Am": true}', TRUE, FALSE, FALSE),
('Projectile Cannon', 'Projectile', 200, 'N', '1d6', '{"Am": true}', TRUE, FALSE, FALSE),
('Projectile Cannon, Heavy', 'Projectile', 300, 'N', '1d8', '{"Am": true, "AP": true}', TRUE, FALSE, FALSE),
('Laser Cannon, Light', 'Laser', 200, 'F', '1d6', '{"EG": true}', FALSE, TRUE, FALSE),
('Laser Cannon', 'Laser', 300, 'F', '1d8', '{"EG": true}', FALSE, TRUE, FALSE),
('Laser Cannon, Heavy', 'Laser', 400, 'F', '1d10', '{"EG": true, "AP": true}', FALSE, TRUE, FALSE),
('Ion Cannon', 'Ion', 500, 'F', 'Disabling', '{"EG": true, "D": "DC12"}', FALSE, TRUE, FALSE),
('Explosive Missile', 'Missile', 200, 'N', '1d10', '{"Single Use": true, "AP": true, "Bl": true}', FALSE, FALSE, TRUE),
('Energy Torpedo', 'Torpedo', 300, 'N', '1d12', '{"Single Use": true, "AP": true, "Bl": true}', FALSE, FALSE, TRUE),
('Ion Torpedo', 'Torpedo', 400, 'N', 'Disabling', '{"Single Use": true, "Bl": true, "D": "DC15"}', FALSE, FALSE, TRUE)
ON CONFLICT (name) DO NOTHING;

-- ================================================
-- SEED DATA - Armor Templates
-- ================================================
INSERT INTO armor_templates (name, category, cost, ac_base, ac_formula, ac_bonus, properties, uses_system_slot, system_slots_required, dex_modifier_effect, description) VALUES
('Armor Plating, Light', 'Light', 300, NULL, '11 + DEX', 0, '{"Ph": true}', FALSE, 0, 'normal', 'Light armor plating. AC = 11 + DEX modifier.'),
('Armor Plating', 'Medium', 400, NULL, '13 + DEX/2', 0, '{"Ph": true}', FALSE, 0, 'halved', 'Medium armor plating. AC = 13 + (DEX modifier / 2). DEX mod is halved for maneuver checks.'),
('Armor Plating, Heavy', 'Heavy', 500, 15, '15', 0, '{"Ph": true}', FALSE, 0, 'none', 'Heavy armor plating. AC = 15. Does not use ship DEX mod for maneuver checks.'),
('Energy Shields', 'Energy', 300, NULL, NULL, 2, '{"En": true, "EG": true}', TRUE, 1, 'normal', '+2 to AC against energy weapons. Requires energy generator.')
ON CONFLICT (name) DO NOTHING;

-- ================================================
-- SEED DATA - Enhancement Templates
-- ================================================
INSERT INTO enhancement_templates (name, enhancement_type, cost, slots_required, benefit, description, properties) VALUES
('Chameleon Coating', 'feature', 1000, 1, '+2 to the ship''s CHA checks', 'This ship enhancement allows the hull colors to be changed.', '{}'),
('Tractor Beam', 'system', 1500, 1, 'Pull objects within Near distance to the ship and into the ship''s cargo bay. If another ship or vehicle, contested STR checks.', 'This ship upgrade projects a beam of energy that can immobilize and retrieve objects.', '{}'),
('Variable Transponder', 'system', 1200, 1, 'Advantage on CHA checks to disguise the ship''s true nature.', 'This ship upgrade allows for multiple identification records to impersonate another ship.', '{}'),
('Radiation Shielding', 'feature', 800, 1, 'A ship and its crew only take half damage (rounded down) from Radiation Fields.', 'This ship upgrade shields the vessel and its occupants from radiation.', '{}')
ON CONFLICT (name) DO NOTHING;
