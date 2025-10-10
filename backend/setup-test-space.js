// Initialize campaign and generate test systems
require('dotenv').config();
const pool = require('./src/config/database');
const { generateGalaxy, generateRegion, generateSector, generateSystem, generateCelestialBody } = require('./src/utils/spaceGenerator');

async function setupTestSystems() {
  try {
    console.log('🚀 Setting up test systems...\n');
    
    // Check if campaign exists
    let campaignResult = await pool.query('SELECT * FROM campaigns WHERE id = 1');
    
    if (campaignResult.rows.length === 0) {
      console.log('Creating default campaign...');
      await pool.query(
        `INSERT INTO campaigns (id, name, seed, notes) VALUES (1, 'Default Campaign', 'default-seed-001', 'Auto-generated campaign')`,
      );
      campaignResult = await pool.query('SELECT * FROM campaigns WHERE id = 1');
      console.log('✓ Campaign created\n');
    }
    
    const campaign = campaignResult.rows[0];
    const campaignSeed = campaign.seed;
    
    // Initialize starter sector if needed
    if (!campaign.starting_sector_id) {
      console.log('Initializing starter sector...');
      
      // Generate galaxy
      const galaxyData = generateGalaxy(campaignSeed, 0, 0, 0);
      const galaxyResult = await pool.query(
        `INSERT INTO galaxies (campaign_id, name, galaxy_code, x_coord, y_coord, z_coord, galaxy_type, danger_tier, seed_hash, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [1, galaxyData.name, galaxyData.galaxy_code, 0, 0, 0, galaxyData.galaxy_type, galaxyData.danger_tier, galaxyData.seed_hash, galaxyData.description]
      );
      const galaxy = galaxyResult.rows[0];
      console.log(`✓ Galaxy: ${galaxy.name}`);
      
      // Generate region
      const regionData = generateRegion(galaxy.seed_hash, galaxy.id, 0, 0);
      const regionResult = await pool.query(
        `INSERT INTO regions (galaxy_id, name, region_code, x_coord, y_coord, danger_tier, faction_control, seed_hash, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [regionData.galaxy_id, regionData.name, regionData.region_code, 0, 0, regionData.danger_tier, regionData.faction_control, regionData.seed_hash, regionData.description]
      );
      const region = regionResult.rows[0];
      console.log(`✓ Region: ${region.name}`);
      
      // Generate sector
      const sectorData = generateSector(region.seed_hash, region.id, 0, 0);
      const sectorResult = await pool.query(
        `INSERT INTO sectors (region_id, name, sector_code, x_coord, y_coord, danger_tier, trade_hub, faction_control, seed_hash, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [sectorData.region_id, sectorData.name, sectorData.sector_code, 0, 0, sectorData.danger_tier, sectorData.trade_hub, sectorData.faction_control, sectorData.seed_hash, sectorData.description]
      );
      const sector = sectorResult.rows[0];
      console.log(`✓ Sector: ${sector.name}`);
      
      // Generate starting system
      const systemData = generateSystem(sector.seed_hash, sector.id, 0, 0);
      const systemResult = await pool.query(
        `INSERT INTO systems (sector_id, name, system_code, x_coord, y_coord, star_count, star_types, danger_tier, has_habitable_zone, dominant_faction, seed_hash, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
        [systemData.sector_id, systemData.name, systemData.system_code, 0, 0, systemData.star_count, systemData.star_types, systemData.danger_tier, systemData.has_habitable_zone, systemData.dominant_faction, systemData.seed_hash, systemData.description]
      );
      const system = systemResult.rows[0];
      console.log(`✓ Starting System: ${system.name}`);
      
      // Generate bodies for starting system
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
      
      // Update campaign
      await pool.query(
        'UPDATE campaigns SET starting_galaxy_id = $1, starting_region_id = $2, starting_sector_id = $3, starting_system_id = $4 WHERE id = 1',
        [galaxy.id, region.id, sector.id, system.id]
      );
      
      console.log('✓ Starter sector initialized\n');
    }
    
    // Now generate additional systems
    console.log('Generating additional test systems...\n');
    
    const updatedCampaign = await pool.query('SELECT * FROM campaigns WHERE id = 1');
    const sectorId = updatedCampaign.rows[0].starting_sector_id;
    
    const sectorResult = await pool.query('SELECT seed_hash FROM sectors WHERE id = $1', [sectorId]);
    const sectorSeed = sectorResult.rows[0].seed_hash;
    
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
      const existing = await pool.query(
        'SELECT id FROM systems WHERE sector_id = $1 AND x_coord = $2 AND y_coord = $3',
        [sectorId, coord.x, coord.y]
      );
      
      if (existing.rows.length > 0) {
        console.log(`System at (${coord.x}, ${coord.y}) already exists, skipping...`);
        continue;
      }
      
      const systemData = generateSystem(sectorSeed, sectorId, coord.x, coord.y);
      const systemResult = await pool.query(
        `INSERT INTO systems (sector_id, name, system_code, x_coord, y_coord, star_count, star_types, danger_tier, has_habitable_zone, dominant_faction, seed_hash, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
        [systemData.sector_id, systemData.name, systemData.system_code, coord.x, coord.y, systemData.star_count, systemData.star_types, systemData.danger_tier, systemData.has_habitable_zone, systemData.dominant_faction, systemData.seed_hash, systemData.description]
      );
      
      const system = systemResult.rows[0];
      console.log(`✓ Generated ${system.name} (${system.system_code}) at (${coord.x}, ${coord.y})`);
      
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
    console.log('Refresh the space map to see them!\n');
    
    await pool.end();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    await pool.end();
    process.exit(1);
  }
}

setupTestSystems();
