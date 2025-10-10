/**
 * DARKSPACE SPACE EXPLORATION API
 * Routes for procedural space generation and exploration
 */

const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const {
  generateGalaxy,
  generateRegion,
  generateSector,
  generateSystem,
  generateCelestialBody,
  generateSpaceHazard
} = require('../utils/spaceGenerator');

// Apply authentication to all routes
router.use(authenticateToken);

/**
 * GET /api/space/campaigns
 * Get all campaigns
 */
router.get('/campaigns', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM campaigns ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

/**
 * POST /api/space/campaigns
 * Create a new campaign
 */
router.post('/campaigns', async (req, res) => {
  const { name, seed, notes } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO campaigns (name, seed, notes) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [name, seed || `campaign-${Date.now()}`, notes]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
});

/**
 * GET /api/space/galaxies/:campaignId
 * Get or generate galaxies for a campaign
 */
router.get('/galaxies/:campaignId', async (req, res) => {
  const { campaignId } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT * FROM galaxies WHERE campaign_id = $1',
      [campaignId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching galaxies:', error);
    res.status(500).json({ error: 'Failed to fetch galaxies' });
  }
});

/**
 * POST /api/space/galaxies/:campaignId/generate
 * Generate a galaxy at specific coordinates
 */
router.post('/galaxies/:campaignId/generate', async (req, res) => {
  const { campaignId } = req.params;
  const { x, y, z } = req.body;
  
  try {
    // Get campaign seed
    const campaignResult = await pool.query(
      'SELECT seed FROM campaigns WHERE id = $1',
      [campaignId]
    );
    
    if (campaignResult.rows.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    const campaignSeed = campaignResult.rows[0].seed;
    
    // Check if galaxy already exists
    const existingGalaxy = await pool.query(
      'SELECT * FROM galaxies WHERE campaign_id = $1 AND x_coord = $2 AND y_coord = $3 AND z_coord = $4',
      [campaignId, x, y, z || 0]
    );
    
    if (existingGalaxy.rows.length > 0) {
      return res.json(existingGalaxy.rows[0]);
    }
    
    // Generate new galaxy
    const galaxyData = generateGalaxy(campaignSeed, x, y, z || 0);
    
    const result = await pool.query(
      `INSERT INTO galaxies (campaign_id, name, galaxy_code, x_coord, y_coord, z_coord, galaxy_type, danger_tier, seed_hash, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [campaignId, galaxyData.name, galaxyData.galaxy_code, galaxyData.x_coord, galaxyData.y_coord, galaxyData.z_coord, galaxyData.galaxy_type, galaxyData.danger_tier, galaxyData.seed_hash, galaxyData.description]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error generating galaxy:', error);
    res.status(500).json({ error: 'Failed to generate galaxy' });
  }
});

/**
 * GET /api/space/regions/:galaxyId
 * Get regions in a galaxy
 */
router.get('/regions/:galaxyId', async (req, res) => {
  const { galaxyId } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT * FROM regions WHERE galaxy_id = $1',
      [galaxyId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching regions:', error);
    res.status(500).json({ error: 'Failed to fetch regions' });
  }
});

/**
 * POST /api/space/regions/:galaxyId/generate
 * Generate a region at specific coordinates
 */
router.post('/regions/:galaxyId/generate', async (req, res) => {
  const { galaxyId } = req.params;
  const { x, y } = req.body;
  
  try {
    // Get galaxy seed
    const galaxyResult = await pool.query(
      'SELECT seed_hash FROM galaxies WHERE id = $1',
      [galaxyId]
    );
    
    if (galaxyResult.rows.length === 0) {
      return res.status(404).json({ error: 'Galaxy not found' });
    }
    
    const galaxySeed = galaxyResult.rows[0].seed_hash;
    
    // Check if region already exists
    const existingRegion = await pool.query(
      'SELECT * FROM regions WHERE galaxy_id = $1 AND x_coord = $2 AND y_coord = $3',
      [galaxyId, x, y]
    );
    
    if (existingRegion.rows.length > 0) {
      return res.json(existingRegion.rows[0]);
    }
    
    // Generate new region
    const regionData = generateRegion(galaxySeed, galaxyId, x, y);
    
    const result = await pool.query(
      `INSERT INTO regions (galaxy_id, name, region_code, x_coord, y_coord, danger_tier, faction_control, seed_hash, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [regionData.galaxy_id, regionData.name, regionData.region_code, regionData.x_coord, regionData.y_coord, regionData.danger_tier, regionData.faction_control, regionData.seed_hash, regionData.description]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error generating region:', error);
    res.status(500).json({ error: 'Failed to generate region' });
  }
});

/**
 * GET /api/space/sectors/:regionId
 * Get sectors in a region
 */
router.get('/sectors/:regionId', async (req, res) => {
  const { regionId } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT * FROM sectors WHERE region_id = $1',
      [regionId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching sectors:', error);
    res.status(500).json({ error: 'Failed to fetch sectors' });
  }
});

/**
 * POST /api/space/sectors/:regionId/generate
 * Generate a sector at specific coordinates
 */
router.post('/sectors/:regionId/generate', async (req, res) => {
  const { regionId } = req.params;
  const { x, y } = req.body;
  
  try {
    // Get region seed
    const regionResult = await pool.query(
      'SELECT seed_hash FROM regions WHERE id = $1',
      [regionId]
    );
    
    if (regionResult.rows.length === 0) {
      return res.status(404).json({ error: 'Region not found' });
    }
    
    const regionSeed = regionResult.rows[0].seed_hash;
    
    // Check if sector already exists
    const existingSector = await pool.query(
      'SELECT * FROM sectors WHERE region_id = $1 AND x_coord = $2 AND y_coord = $3',
      [regionId, x, y]
    );
    
    if (existingSector.rows.length > 0) {
      return res.json(existingSector.rows[0]);
    }
    
    // Generate new sector
    const sectorData = generateSector(regionSeed, regionId, x, y);
    
    const result = await pool.query(
      `INSERT INTO sectors (region_id, name, sector_code, x_coord, y_coord, danger_tier, trade_hub, faction_control, seed_hash, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [sectorData.region_id, sectorData.name, sectorData.sector_code, sectorData.x_coord, sectorData.y_coord, sectorData.danger_tier, sectorData.trade_hub, sectorData.faction_control, sectorData.seed_hash, sectorData.description]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error generating sector:', error);
    res.status(500).json({ error: 'Failed to generate sector' });
  }
});

/**
 * GET /api/space/systems/:sectorId
 * Get systems in a sector
 */
router.get('/systems/:sectorId', async (req, res) => {
  const { sectorId } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT * FROM systems WHERE sector_id = $1',
      [sectorId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching systems:', error);
    res.status(500).json({ error: 'Failed to fetch systems' });
  }
});

/**
 * POST /api/space/systems/:sectorId/generate
 * Generate a system at specific coordinates
 */
router.post('/systems/:sectorId/generate', async (req, res) => {
  const { sectorId } = req.params;
  const { x, y } = req.body;
  
  try {
    // Get sector seed
    const sectorResult = await pool.query(
      'SELECT seed_hash FROM sectors WHERE id = $1',
      [sectorId]
    );
    
    if (sectorResult.rows.length === 0) {
      return res.status(404).json({ error: 'Sector not found' });
    }
    
    const sectorSeed = sectorResult.rows[0].seed_hash;
    
    // Check if system already exists
    const existingSystem = await pool.query(
      'SELECT * FROM systems WHERE sector_id = $1 AND x_coord = $2 AND y_coord = $3',
      [sectorId, x, y]
    );
    
    if (existingSystem.rows.length > 0) {
      return res.json(existingSystem.rows[0]);
    }
    
    // Generate new system
    const systemData = generateSystem(sectorSeed, sectorId, x, y);
    
    const result = await pool.query(
      `INSERT INTO systems (sector_id, name, system_code, x_coord, y_coord, star_count, star_types, danger_tier, has_habitable_zone, dominant_faction, seed_hash, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [systemData.sector_id, systemData.name, systemData.system_code, systemData.x_coord, systemData.y_coord, systemData.star_count, systemData.star_types, systemData.danger_tier, systemData.has_habitable_zone, systemData.dominant_faction, systemData.seed_hash, systemData.description]
    );
    
    // Generate 2-8 celestial bodies
    const bodyCount = Math.floor(Math.random() * 7) + 2;
    for (let i = 1; i <= bodyCount; i++) {
      const bodyData = generateCelestialBody(systemData.seed_hash, result.rows[0].id, i);
      
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
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error generating system:', error);
    res.status(500).json({ error: 'Failed to generate system' });
  }
});

/**
 * GET /api/space/celestial-bodies/:systemId
 * Get celestial bodies in a system
 */
router.get('/celestial-bodies/:systemId', async (req, res) => {
  const { systemId } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT * FROM celestial_bodies WHERE system_id = $1 ORDER BY orbital_position',
      [systemId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching celestial bodies:', error);
    res.status(500).json({ error: 'Failed to fetch celestial bodies' });
  }
});

/**
 * GET /api/space/celestial-body/:bodyId
 * Get detailed info about a celestial body
 */
router.get('/celestial-body/:bodyId', async (req, res) => {
  const { bodyId } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT * FROM celestial_bodies WHERE id = $1',
      [bodyId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Celestial body not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching celestial body:', error);
    res.status(500).json({ error: 'Failed to fetch celestial body' });
  }
});

/**
 * POST /api/space/discoveries
 * Record a discovery by a ship (requires Memory Bank)
 */
router.post('/discoveries', async (req, res) => {
  const { shipId, discoveryType, discoveryId, discoveryMethod, hasDetailedScan } = req.body;
  
  try {
    // Check if ship has Memory Bank
    const memoryBankCheck = await pool.query(
      `SELECT sc.id FROM ship_components sc
       JOIN component_templates ct ON sc.component_template_id = ct.id
       WHERE sc.ship_id = $1 AND ct.name = 'Memory Bank' AND sc.is_installed = true`,
      [shipId]
    );
    
    if (memoryBankCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Ship requires Memory Bank to record discoveries' });
    }
    
    // Record discovery
    const column = `${discoveryType}_id`;
    const result = await pool.query(
      `INSERT INTO ship_discoveries (ship_id, ${column}, discovery_method, has_basic_data, has_detailed_scan)
       VALUES ($1, $2, $3, true, $4)
       ON CONFLICT (ship_id, ${column}) DO UPDATE 
       SET has_detailed_scan = EXCLUDED.has_detailed_scan OR ship_discoveries.has_detailed_scan
       RETURNING *`,
      [shipId, discoveryId, discoveryMethod || 'Sensor Scan', hasDetailedScan || false]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error recording discovery:', error);
    res.status(500).json({ error: 'Failed to record discovery' });
  }
});

/**
 * GET /api/space/discoveries/:shipId
 * Get all discoveries for a ship
 */
router.get('/discoveries/:shipId', async (req, res) => {
  const { shipId } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT * FROM ship_discoveries WHERE ship_id = $1',
      [shipId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching discoveries:', error);
    res.status(500).json({ error: 'Failed to fetch discoveries' });
  }
});

/**
 * POST /api/space/init-starter-sector
 * Initialize the starting sector for a campaign (PoC)
 */
router.post('/init-starter-sector', async (req, res) => {
  const { campaignId } = req.body;
  
  try {
    // Get campaign seed
    const campaignResult = await pool.query(
      'SELECT seed FROM campaigns WHERE id = $1',
      [campaignId]
    );
    
    if (campaignResult.rows.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    const campaignSeed = campaignResult.rows[0].seed;
    
    // Generate starting galaxy at (0,0,0)
    const galaxyResult = await pool.query(
      'SELECT * FROM galaxies WHERE campaign_id = $1 AND x_coord = 0 AND y_coord = 0 AND z_coord = 0',
      [campaignId]
    );
    
    let galaxy;
    if (galaxyResult.rows.length === 0) {
      const galaxyData = generateGalaxy(campaignSeed, 0, 0, 0);
      const insertResult = await pool.query(
        `INSERT INTO galaxies (campaign_id, name, galaxy_code, x_coord, y_coord, z_coord, galaxy_type, danger_tier, seed_hash, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
        [campaignId, galaxyData.name, galaxyData.galaxy_code, galaxyData.x_coord, galaxyData.y_coord, galaxyData.z_coord, galaxyData.galaxy_type, galaxyData.danger_tier, galaxyData.seed_hash, galaxyData.description]
      );
      galaxy = insertResult.rows[0];
    } else {
      galaxy = galaxyResult.rows[0];
    }
    
    // Generate starting region at (0,0)
    const regionResult = await pool.query(
      'SELECT * FROM regions WHERE galaxy_id = $1 AND x_coord = 0 AND y_coord = 0',
      [galaxy.id]
    );
    
    let region;
    if (regionResult.rows.length === 0) {
      const regionData = generateRegion(galaxy.seed_hash, galaxy.id, 0, 0);
      const insertResult = await pool.query(
        `INSERT INTO regions (galaxy_id, name, region_code, x_coord, y_coord, danger_tier, faction_control, seed_hash, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [regionData.galaxy_id, regionData.name, regionData.region_code, regionData.x_coord, regionData.y_coord, regionData.danger_tier, regionData.faction_control, regionData.seed_hash, regionData.description]
      );
      region = insertResult.rows[0];
    } else {
      region = regionResult.rows[0];
    }
    
    // Generate starting sector at (0,0)
    const sectorResult = await pool.query(
      'SELECT * FROM sectors WHERE region_id = $1 AND x_coord = 0 AND y_coord = 0',
      [region.id]
    );
    
    let sector;
    if (sectorResult.rows.length === 0) {
      const sectorData = generateSector(region.seed_hash, region.id, 0, 0);
      const insertResult = await pool.query(
        `INSERT INTO sectors (region_id, name, sector_code, x_coord, y_coord, danger_tier, trade_hub, faction_control, seed_hash, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
        [sectorData.region_id, sectorData.name, sectorData.sector_code, sectorData.x_coord, sectorData.y_coord, sectorData.danger_tier, sectorData.trade_hub, sectorData.faction_control, sectorData.seed_hash, sectorData.description]
      );
      sector = insertResult.rows[0];
    } else {
      sector = sectorResult.rows[0];
    }
    
    // Generate starting system at (0,0)
    const systemResult = await pool.query(
      'SELECT * FROM systems WHERE sector_id = $1 AND x_coord = 0 AND y_coord = 0',
      [sector.id]
    );
    
    let system;
    if (systemResult.rows.length === 0) {
      const systemData = generateSystem(sector.seed_hash, sector.id, 0, 0);
      const insertResult = await pool.query(
        `INSERT INTO systems (sector_id, name, system_code, x_coord, y_coord, star_count, star_types, danger_tier, has_habitable_zone, dominant_faction, seed_hash, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         RETURNING *`,
        [systemData.sector_id, systemData.name, systemData.system_code, systemData.x_coord, systemData.y_coord, systemData.star_count, systemData.star_types, systemData.danger_tier, systemData.has_habitable_zone, systemData.dominant_faction, systemData.seed_hash, systemData.description]
      );
      system = insertResult.rows[0];
      
      // Generate 2-8 celestial bodies for the starting system
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
    } else {
      system = systemResult.rows[0];
    }
    
    // Update campaign with starting location
    await pool.query(
      `UPDATE campaigns 
       SET starting_galaxy_id = $1, starting_region_id = $2, starting_sector_id = $3, starting_system_id = $4
       WHERE id = $5`,
      [galaxy.id, region.id, sector.id, system.id, campaignId]
    );
    
    res.json({
      message: 'Starting sector initialized',
      galaxy,
      region,
      sector,
      system
    });
  } catch (error) {
    console.error('Error initializing starter sector:', error);
    res.status(500).json({ error: 'Failed to initialize starter sector' });
  }
});

module.exports = router;
