// Generate multiple systems in starter sector for testing
require('dotenv').config();
const pool = require('./src/config/database');
const { generateSystem, generateCelestialBody } = require('./src/utils/spaceGenerator');

async function generateMultipleSystems() {
  try {
    console.log('Generating systems in starter sector...');
    
    // Get starter sector
    const campaignResult = await pool.query(
      'SELECT starting_sector_id, seed FROM campaigns WHERE id = 1'
    );
    
    if (campaignResult.rows.length === 0) {
      console.error('No campaign found! Run the space migration first.');
      process.exit(1);
    }
    
    const { starting_sector_id, seed: campaignSeed } = campaignResult.rows[0];
    
    if (!starting_sector_id) {
      console.error('Campaign not initialized! Visit the space map first to initialize.');
      process.exit(1);
    }
    
    // Get sector seed
    const sectorResult = await pool.query(
      'SELECT seed_hash FROM sectors WHERE id = $1',
      [starting_sector_id]
    );
    
    const sectorSeed = sectorResult.rows[0].seed_hash;
    
    // Generate systems at various coordinates
    const coordinates = [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 }
    ];
    
    let generated = 0;
    
    for (const coord of coordinates) {
      // Check if system already exists
      const existing = await pool.query(
        'SELECT id FROM systems WHERE sector_id = $1 AND x_coord = $2 AND y_coord = $3',
        [starting_sector_id, coord.x, coord.y]
      );
      
      if (existing.rows.length > 0) {
        console.log(`System at (${coord.x}, ${coord.y}) already exists, skipping...`);
        continue;
      }
      
      // Generate system
      const systemData = generateSystem(sectorSeed, starting_sector_id, coord.x, coord.y);
      
      const systemResult = await pool.query(
        `INSERT INTO systems (sector_id, name, system_code, x_coord, y_coord, star_count, star_types, danger_tier, has_habitable_zone, dominant_faction, seed_hash, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         RETURNING *`,
        [
          systemData.sector_id, systemData.name, systemData.system_code,
          systemData.x_coord, systemData.y_coord, systemData.star_count,
          systemData.star_types, systemData.danger_tier, systemData.has_habitable_zone,
          systemData.dominant_faction, systemData.seed_hash, systemData.description
        ]
      );
      
      const system = systemResult.rows[0];
      console.log(`✓ Generated ${system.name} (${system.system_code}) at (${coord.x}, ${coord.y})`);
      
      // Generate 2-8 celestial bodies
      const bodyCount = Math.floor(Math.random() * 7) + 2;
      
      for (let i = 1; i <= bodyCount; i++) {
        const bodyData = generateCelestialBody(systemData.seed_hash, system.id, i);
        
        await pool.query(
          `INSERT INTO celestial_bodies (
            system_id, parent_body_id, name, body_code, body_type, orbital_position, x_coord, y_coord,
            population, tech_level, faction_control, settlement_count, has_spaceport, spaceport_class, government_type,
            habitability_rating, has_life, ecosystem_type, flora_danger, fauna_danger, indigenous_sapient_life,
            atmosphere_type, temperature_avg, temperature_range, weather_severity, radiation_level, has_water,
            mineral_richness, fuel_deposits, rare_elements, salvage_opportunities, trade_goods,
            size_class, diameter_km, gravity, moon_count, has_rings, overall_danger, seed_hash, notes
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
            $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40
          )`,
          [
            bodyData.system_id, bodyData.parent_body_id, bodyData.name, bodyData.body_code, bodyData.body_type,
            bodyData.orbital_position, bodyData.x_coord, bodyData.y_coord, bodyData.population, bodyData.tech_level,
            bodyData.faction_control, bodyData.settlement_count, bodyData.has_spaceport, bodyData.spaceport_class,
            bodyData.government_type, bodyData.habitability_rating, bodyData.has_life, bodyData.ecosystem_type,
            bodyData.flora_danger, bodyData.fauna_danger, bodyData.indigenous_sapient_life, bodyData.atmosphere_type,
            bodyData.temperature_avg, bodyData.temperature_range, bodyData.weather_severity, bodyData.radiation_level,
            bodyData.has_water, bodyData.mineral_richness, bodyData.fuel_deposits, bodyData.rare_elements,
            bodyData.salvage_opportunities, bodyData.trade_goods, bodyData.size_class, bodyData.diameter_km,
            bodyData.gravity, bodyData.moon_count, bodyData.has_rings, bodyData.overall_danger, bodyData.seed_hash,
            bodyData.notes
          ]
        );
      }
      
      console.log(`  └─ Generated ${bodyCount} celestial bodies`);
      generated++;
    }
    
    console.log(`\n✅ Done! Generated ${generated} new systems.`);
    console.log('Refresh the space map to see them!');
    
    await pool.end();
    process.exit(0);
    
  } catch (error) {
    console.error('Error generating systems:', error);
    await pool.end();
    process.exit(1);
  }
}

generateMultipleSystems();
