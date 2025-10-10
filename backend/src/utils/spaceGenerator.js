/**
 * DARKSPACE PROCEDURAL SPACE GENERATOR
 * Deterministic generation using seeded randomness
 */

const seedrandom = require('seedrandom');

/**
 * Seeded random number generator
 */
class SeededRNG {
  constructor(seed) {
    this.rng = seedrandom(seed);
  }

  // Random integer between min and max (inclusive)
  int(min, max) {
    return Math.floor(this.rng() * (max - min + 1)) + min;
  }

  // Random float between min and max
  float(min, max) {
    return this.rng() * (max - min) + min;
  }

  // Random element from array
  choice(array) {
    return array[this.int(0, array.length - 1)];
  }

  // Weighted random choice
  weightedChoice(choices) {
    const totalWeight = choices.reduce((sum, c) => sum + c.weight, 0);
    let random = this.float(0, totalWeight);
    
    for (const choice of choices) {
      random -= choice.weight;
      if (random <= 0) return choice.value;
    }
    return choices[choices.length - 1].value;
  }

  // Roll dice (e.g., "2d6", "1d10")
  dice(notation) {
    const [count, sides] = notation.split('d').map(Number);
    let total = 0;
    for (let i = 0; i < count; i++) {
      total += this.int(1, sides);
    }
    return total;
  }

  // Probability check (0-100)
  chance(percentage) {
    return this.int(1, 100) <= percentage;
  }
}

/**
 * Generate a seed hash for a specific location
 */
function generateSeedHash(baseSeed, ...coordinates) {
  return `${baseSeed}-${coordinates.join('-')}`;
}

/**
 * NAME GENERATORS
 */
const NAME_PREFIXES = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Theta', 'Nova', 'Proxima', 'Prima', 'Ultima', 'Nexus', 'Vega', 'Rigel', 'Sirius', 'Polaris', 'Altair', 'Deneb', 'Antares'];
const NAME_ROOTS = ['dor', 'kai', 'mor', 'ven', 'tar', 'sol', 'lux', 'nyx', 'zar', 'kos', 'rax', 'tev', 'gal', 'vor', 'xan', 'qor', 'zel', 'nar'];
const NAME_SUFFIXES = ['ion', 'us', 'is', 'os', 'prime', 'major', 'minor', 'station', 'terminus', 'haven', 'reach', 'core', 'edge', 'expanse'];

function generateName(rng, type = 'system') {
  switch(type) {
    case 'galaxy':
      return `${rng.choice(NAME_PREFIXES)} ${rng.choice(NAME_ROOTS).toUpperCase()} Galaxy`;
    case 'region':
      return `${rng.choice(NAME_PREFIXES)} ${rng.choice(NAME_SUFFIXES).charAt(0).toUpperCase() + rng.choice(NAME_SUFFIXES).slice(1)} Region`;
    case 'sector':
      return `Sector ${rng.choice(NAME_PREFIXES)}-${rng.int(1, 99)}`;
    case 'system':
      return `${rng.choice(NAME_PREFIXES)} ${rng.choice(NAME_ROOTS).charAt(0).toUpperCase() + rng.choice(NAME_ROOTS).slice(1)}`;
    case 'planet':
      const planetPrefix = rng.choice(NAME_PREFIXES);
      const planetSuffix = rng.choice(NAME_SUFFIXES);
      return `${planetPrefix} ${planetSuffix.charAt(0).toUpperCase() + planetSuffix.slice(1)}`;
    default:
      return `${rng.choice(NAME_PREFIXES)}-${rng.int(100, 999)}`;
  }
}

/**
 * GALAXY GENERATOR
 */
function generateGalaxy(campaignSeed, x, y, z = 0) {
  const seed = generateSeedHash(campaignSeed, 'galaxy', x, y, z);
  const rng = new SeededRNG(seed);

  const types = [
    { value: 'Spiral', weight: 60 },
    { value: 'Elliptical', weight: 20 },
    { value: 'Irregular', weight: 15 },
    { value: 'Dwarf', weight: 5 }
  ];

  return {
    name: generateName(rng, 'galaxy'),
    galaxy_code: `G${String(Math.abs(x * 100 + y)).padStart(3, '0')}`,
    x_coord: x,
    y_coord: y,
    z_coord: z,
    galaxy_type: rng.weightedChoice(types),
    danger_tier: rng.int(1, 5),
    seed_hash: seed,
    description: `A ${rng.weightedChoice(types).toLowerCase()} galaxy in the cosmic void.`
  };
}

/**
 * REGION GENERATOR
 */
function generateRegion(galaxySeed, galaxyId, x, y) {
  const seed = generateSeedHash(galaxySeed, 'region', x, y);
  const rng = new SeededRNG(seed);

  const factions = ['Neutral', 'Empire', 'Rebellion', 'Corporate', 'Independent', 'Pirate Territory', 'Uncharted'];
  
  return {
    galaxy_id: galaxyId,
    name: generateName(rng, 'region'),
    region_code: `R${String(x * 100 + y).padStart(3, '0')}`,
    x_coord: x,
    y_coord: y,
    danger_tier: rng.int(1, 5),
    faction_control: rng.choice(factions),
    seed_hash: seed,
    description: `A region controlled by ${rng.choice(factions)}.`
  };
}

/**
 * SECTOR GENERATOR
 */
function generateSector(regionSeed, regionId, x, y) {
  const seed = generateSeedHash(regionSeed, 'sector', x, y);
  const rng = new SeededRNG(seed);

  const factions = ['Neutral', 'Empire', 'Rebellion', 'Corporate', 'Independent', 'Pirate Territory'];
  
  return {
    region_id: regionId,
    name: generateName(rng, 'sector'),
    sector_code: `S${String(x * 100 + y).padStart(3, '0')}`,
    x_coord: x,
    y_coord: y,
    danger_tier: rng.int(1, 5),
    trade_hub: rng.chance(15), // 15% chance of trade hub
    faction_control: rng.choice(factions),
    seed_hash: seed,
    description: `A sector in the galactic frontier.`
  };
}

/**
 * SYSTEM GENERATOR
 */
function generateSystem(sectorSeed, sectorId, x, y) {
  const seed = generateSeedHash(sectorSeed, 'system', x, y);
  const rng = new SeededRNG(seed);

  const starTypes = ['Red Dwarf', 'Yellow Dwarf', 'White Star', 'Blue Giant', 'Red Giant', 'Binary System'];
  const starCount = rng.weightedChoice([
    { value: 1, weight: 70 },
    { value: 2, weight: 25 },
    { value: 3, weight: 5 }
  ]);

  const stars = [];
  for (let i = 0; i < starCount; i++) {
    stars.push(rng.choice(starTypes));
  }

  const factions = ['Neutral', 'Empire', 'Rebellion', 'Corporate', 'Independent', 'Uncharted'];

  return {
    sector_id: sectorId,
    name: generateName(rng, 'system'),
    system_code: `SYS${String(x * 100 + y).padStart(3, '0')}`,
    x_coord: x,
    y_coord: y,
    star_count: starCount,
    star_types: JSON.stringify(stars),
    danger_tier: rng.int(1, 5),
    has_habitable_zone: rng.chance(60), // 60% have habitable zones
    dominant_faction: rng.choice(factions),
    seed_hash: seed,
    description: `A ${starCount}-star system in the depths of space.`
  };
}

/**
 * CELESTIAL BODY GENERATOR
 */
function generateCelestialBody(systemSeed, systemId, orbitalPosition, parentBodyId = null) {
  const seed = generateSeedHash(systemSeed, 'body', orbitalPosition, parentBodyId || 0);
  const rng = new SeededRNG(seed);

  const isMoon = parentBodyId !== null;
  const bodyTypes = isMoon 
    ? ['Moon', 'Moon', 'Moon', 'Asteroid'] 
    : ['Planet', 'Planet', 'Planet', 'Gas Giant', 'Asteroid', 'Station'];

  const bodyType = rng.choice(bodyTypes);
  
  // Generate properties based on priority: Civ > Bio > Env > Res > Phy
  
  // === CIVILIZATION (Priority 1) ===
  const hasCivilization = bodyType === 'Planet' ? rng.chance(40) : 
                          bodyType === 'Moon' ? rng.chance(10) : 
                          bodyType === 'Station' ? true : false;
  
  const population = hasCivilization ? rng.int(1000, 10000000000) : 0;
  const techLevel = hasCivilization ? rng.int(1, 10) : 0;
  const hasSpaceport = hasCivilization && rng.chance(50);
  const settlementCount = hasCivilization ? rng.int(1, 100) : 0;

  const factions = ['Neutral', 'Empire', 'Rebellion', 'Corporate', 'Independent', 'Native'];
  const governments = ['Democracy', 'Autocracy', 'Corporate', 'Anarchy', 'Theocracy', 'Monarchy', 'Tribal'];

  // === BIOLOGY (Priority 2) ===
  const habitability = bodyType === 'Planet' ? rng.int(0, 10) : 
                       bodyType === 'Moon' ? rng.int(0, 5) : 0;
  
  const hasLife = habitability > 3 ? rng.chance(70) : rng.chance(10);
  const ecosystems = ['Barren', 'Sparse', 'Moderate', 'Lush', 'Exotic', 'Crystalline'];
  
  // === ENVIRONMENT (Priority 3) ===
  const atmospheres = ['None', 'Thin', 'Breathable', 'Thick', 'Toxic', 'Corrosive'];
  const atmosphereType = rng.choice(atmospheres);
  const temps = ['Freezing', 'Cold', 'Temperate', 'Hot', 'Inferno'];
  const tempAvg = rng.int(-100, 100);

  // === RESOURCES (Priority 4) ===
  const mineralRichness = rng.int(0, 10);
  const hasFuel = rng.chance(30);
  const hasRareElements = mineralRichness > 7 ? rng.chance(50) : rng.chance(10);
  const salvageOps = rng.int(0, 10);

  // === PHYSICAL (Priority 5) ===
  const sizes = ['Tiny', 'Small', 'Medium', 'Large', 'Huge'];
  const sizeClass = rng.choice(sizes);
  const diameter = rng.int(1000, 50000);
  const gravity = rng.float(0.1, 2.5);
  const moonCount = bodyType === 'Planet' ? rng.int(0, 5) : 0;

  // Overall danger (weighted by environment and biology)
  const envDanger = ['Toxic', 'Corrosive'].includes(atmosphereType) ? 5 : 0;
  const tempDanger = ['Freezing', 'Inferno'].includes(rng.choice(temps)) ? 3 : 0;
  const lifeDanger = hasLife ? rng.int(0, 5) : 0;
  const overallDanger = Math.min(10, envDanger + tempDanger + lifeDanger + rng.int(0, 2));

  return {
    system_id: systemId,
    parent_body_id: parentBodyId,
    name: generateName(rng, 'planet'),
    body_code: `${isMoon ? 'M' : 'P'}${String(orbitalPosition).padStart(2, '0')}`,
    body_type: bodyType,
    orbital_position: orbitalPosition,
    x_coord: rng.float(-1000, 1000),
    y_coord: rng.float(-1000, 1000),
    
    // Civilization
    population,
    tech_level: techLevel,
    faction_control: hasCivilization ? rng.choice(factions) : null,
    settlement_count: settlementCount,
    has_spaceport: hasSpaceport,
    spaceport_class: hasSpaceport ? rng.choice(['Small', 'Medium', 'Large', 'Major Hub']) : null,
    government_type: hasCivilization ? rng.choice(governments) : null,
    
    // Biology
    habitability_rating: habitability,
    has_life: hasLife,
    ecosystem_type: hasLife ? rng.choice(ecosystems) : 'Barren',
    flora_danger: hasLife ? rng.int(0, 10) : 0,
    fauna_danger: hasLife ? rng.int(0, 10) : 0,
    indigenous_sapient_life: hasLife && hasCivilization ? rng.chance(20) : false,
    
    // Environment
    atmosphere_type: atmosphereType,
    temperature_avg: tempAvg,
    temperature_range: rng.choice(temps),
    weather_severity: rng.int(0, 10),
    radiation_level: rng.int(0, 10),
    has_water: atmosphereType === 'Breathable' ? rng.chance(80) : rng.chance(20),
    
    // Resources
    mineral_richness: mineralRichness,
    fuel_deposits: hasFuel,
    rare_elements: hasRareElements,
    salvage_opportunities: salvageOps,
    trade_goods: hasCivilization ? JSON.stringify(['Minerals', 'Food', 'Technology']) : JSON.stringify([]),
    
    // Physical
    size_class: sizeClass,
    diameter_km: diameter,
    gravity: gravity,
    moon_count: moonCount,
    has_rings: bodyType === 'Gas Giant' ? rng.chance(60) : rng.chance(5),
    
    // Danger
    overall_danger: overallDanger,
    
    seed_hash: seed,
    notes: `A ${bodyType.toLowerCase()} in orbit ${orbitalPosition}.`
  };
}

/**
 * SPACE HAZARD GENERATOR
 */
function generateSpaceHazard(locationSeed, locationType, locationId, x, y) {
  const seed = generateSeedHash(locationSeed, 'hazard', x, y);
  const rng = new SeededRNG(seed);

  const hazardTypes = [
    { value: 'Asteroid Field', weight: 35 },
    { value: 'Nebula', weight: 25 },
    { value: 'Radiation Field', weight: 20 },
    { value: 'Black Hole', weight: 5 },
    { value: 'Wormhole', weight: 10 },
    { value: 'Temporal Anomaly', weight: 5 }
  ];

  const hazardType = rng.weightedChoice(hazardTypes);
  const intensity = rng.int(1, 3); // Mild, Moderate, Severe

  const locationColumn = {
    'galaxy': 'galaxy_id',
    'region': 'region_id',
    'sector': 'sector_id',
    'system': 'system_id'
  }[locationType];

  return {
    [locationColumn]: locationId,
    name: `${hazardType} ${rng.int(100, 999)}`,
    hazard_type: hazardType,
    x_coord: x,
    y_coord: y,
    radius: rng.float(10, 500),
    intensity: intensity,
    is_navigable: hazardType !== 'Black Hole',
    properties: JSON.stringify({ intensity: intensity }),
    seed_hash: seed,
    description: `A ${hazardType.toLowerCase()} of ${['mild', 'moderate', 'severe'][intensity - 1]} intensity.`
  };
}

module.exports = {
  SeededRNG,
  generateSeedHash,
  generateName,
  generateGalaxy,
  generateRegion,
  generateSector,
  generateSystem,
  generateCelestialBody,
  generateSpaceHazard
};
