-- DarkSpacer Database Schema

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    strength INTEGER DEFAULT 10,
    dexterity INTEGER DEFAULT 10,
    constitution INTEGER DEFAULT 10,
    intelligence INTEGER DEFAULT 10,
    wisdom INTEGER DEFAULT 10,
    charisma INTEGER DEFAULT 10,
    species VARCHAR(50),
    archetype VARCHAR(50),
    background VARCHAR(50),
    motivation VARCHAR(100),
    ship_role VARCHAR(50),
    hp_current INTEGER DEFAULT 1,
    hp_max INTEGER DEFAULT 1,
    ac INTEGER DEFAULT 10,
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    reputation INTEGER DEFAULT 0,
    bounty INTEGER DEFAULT 0,
    luck INTEGER DEFAULT 0,
    credits INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ships (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    ship_class VARCHAR(50),
    hull_current INTEGER DEFAULT 10,
    hull_max INTEGER DEFAULT 10,
    armor_class INTEGER DEFAULT 10,
    speed INTEGER DEFAULT 5,
    crew_capacity INTEGER DEFAULT 4,
    cargo_capacity INTEGER DEFAULT 10,
    fuel INTEGER DEFAULT 100,
    fuel_max INTEGER DEFAULT 100,
    owner_character_id INTEGER REFERENCES characters(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ship_crew (
    id SERIAL PRIMARY KEY,
    ship_id INTEGER REFERENCES ships(id) ON DELETE CASCADE,
    character_id INTEGER REFERENCES characters(id) ON DELETE CASCADE,
    role VARCHAR(50),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(ship_id, character_id)
);

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    character_id INTEGER REFERENCES characters(id) ON DELETE CASCADE,
    item_name VARCHAR(100) NOT NULL,
    item_type VARCHAR(50),
    quantity INTEGER DEFAULT 1,
    description TEXT,
    weight INTEGER DEFAULT 0,
    damage VARCHAR(20),
    range VARCHAR(20),
    properties TEXT,
    equipped BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gear_database (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50),
    cost INTEGER,
    weight INTEGER DEFAULT 0,
    description TEXT,
    damage VARCHAR(20),
    range VARCHAR(20),
    properties TEXT,
    ac_bonus INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE space_sectors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    x_coordinate INTEGER,
    y_coordinate INTEGER,
    sector_type VARCHAR(50),
    danger_level INTEGER DEFAULT 1,
    discovered BOOLEAN DEFAULT FALSE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activity_log (
    id SERIAL PRIMARY KEY,
    character_id INTEGER REFERENCES characters(id),
    action_type VARCHAR(50),
    description TEXT,
    amount INTEGER,
    admin_user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_characters_user ON characters(user_id);
CREATE INDEX idx_inventory_character ON inventory(character_id);
CREATE INDEX idx_ship_crew_ship ON ship_crew(ship_id);
CREATE INDEX idx_ship_crew_character ON ship_crew(character_id);
CREATE INDEX idx_activity_character ON activity_log(character_id);

INSERT INTO users (username, password_hash, is_admin) VALUES 
('admin', '$2b$10$YQJy5f7qH0GvPz3dXJ0.6uOYr4LxL0L0L0L0L0L0L0L0L0L0L0L0L0', TRUE);

INSERT INTO gear_database (name, category, cost, weight, damage, range, description) VALUES
('Plasma Pistol', 'weapon', 250, 1, '1d6', 'close', 'Standard energy sidearm'),
('Slug Rifle', 'weapon', 400, 2, '1d8', 'far', 'Kinetic long-range weapon'),
('Combat Blade', 'weapon', 50, 1, '1d4', 'close', 'Melee weapon'),
('Enviro-Suit', 'armor', 300, 1, NULL, NULL, 'Provides +1 AC and life support'),
('Medkit', 'equipment', 100, 1, NULL, NULL, 'Restores 2d6 HP'),
('Scanner', 'equipment', 200, 1, NULL, NULL, 'Detects life forms and materials'),
('CredChit (100cr)', 'currency', 100, 1, NULL, NULL, 'Physical currency chip');