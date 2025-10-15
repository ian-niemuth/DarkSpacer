// ============================================
// STAR MAP / GALAXY NAVIGATION ROUTES
// ============================================
// Requires Memory Bank component installed and online

const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const {
  hasAdvancedMemoryBank,
  getSensorRange,
  autoDiscoverInRange,
  filterGalaxyByDiscovery
} = require('../utils/discoveryHelpers');

router.use(authenticateToken);

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if a ship has an online Memory Bank component
 * @param {number} shipId - Ship ID to check
 * @returns {Object} { online: boolean, reason: string }
 */
async function checkMemoryBankStatus(shipId) {
  try {
    // Check if ship has a Memory Bank component that is enabled
    const result = await pool.query(`
      SELECT
        sc.*
      FROM ship_components sc
      JOIN component_templates sct ON sc.component_template_id = sct.id
      WHERE sc.ship_id = $1
        AND LOWER(sct.name) = 'memory bank'
        AND sc.maintenance_enabled = true
    `, [shipId]);

    if (result.rows.length === 0) {
      // Check if Memory Bank exists but is offline
      const offlineCheck = await pool.query(`
        SELECT sc.*
        FROM ship_components sc
        JOIN component_templates sct ON sc.component_template_id = sct.id
        WHERE sc.ship_id = $1
          AND LOWER(sct.name) = 'memory bank'
      `, [shipId]);

      if (offlineCheck.rows.length > 0) {
        return { online: false, reason: 'MEMORY_BANK_OFFLINE' };
      }

      return { online: false, reason: 'NO_MEMORY_BANK' };
    }

    return { online: true, reason: null };
  } catch (error) {
    console.error('Error checking Memory Bank status:', error);
    return { online: false, reason: 'ERROR' };
  }
}

/**
 * Check if user has access to a ship (owner or crew)
 */
async function checkShipAccess(userId, shipId, isAdminUser) {
  if (isAdminUser) return true;

  const result = await pool.query(`
    SELECT s.id
    FROM ships s
    LEFT JOIN ship_crew_assignments sca ON s.id = sca.ship_id
    WHERE s.id = $1
      AND (s.owner_id = $2 OR sca.character_id IN (
        SELECT id FROM characters WHERE user_id = $2
      ))
  `, [shipId, userId]);

  return result.rows.length > 0;
}

// ============================================
// GET Memory Bank status for a ship
// ============================================
router.get('/power-status/:shipId', async (req, res) => {
  try {
    const { shipId } = req.params;

    // Check ship access
    const hasAccess = await checkShipAccess(req.user.userId, shipId, req.user.isAdmin);
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const status = await checkMemoryBankStatus(shipId);
    res.json(status);
  } catch (error) {
    console.error('Error checking Memory Bank status:', error);
    res.status(500).json({ error: 'Failed to check Memory Bank status' });
  }
});

// ============================================
// GET galaxy data for ship view (requires Memory Bank)
// ============================================
router.get('/ship-view/:shipId', async (req, res) => {
  try {
    const { shipId } = req.params;

    // Check ship access
    const hasAccess = await checkShipAccess(req.user.userId, shipId, req.user.isAdmin);
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Check Memory Bank status
    const memoryBankStatus = await checkMemoryBankStatus(shipId);
    if (!memoryBankStatus.online) {
      return res.status(403).json({
        error: 'MEMORY_BANK_OFFLINE',
        reason: memoryBankStatus.reason
      });
    }

    // Get ship location with ship name
    const shipLocation = await pool.query(`
      SELECT sl.*, s.name as ship_name
      FROM ship_locations sl
      JOIN ships s ON sl.ship_id = s.id
      WHERE sl.ship_id = $1
    `, [shipId]);

    let location = null;
    if (shipLocation.rows.length > 0) {
      location = shipLocation.rows[0];
    } else {
      // Initialize ship location if it doesn't exist
      await pool.query(`
        INSERT INTO ship_locations (ship_id, x, y, z)
        VALUES ($1, 0, 0, 0)
      `, [shipId]);

      // Get ship name for the initialized location
      const shipName = await pool.query(`
        SELECT name FROM ships WHERE id = $1
      `, [shipId]);

      location = {
        ship_id: shipId,
        x: 0,
        y: 0,
        z: 0,
        ship_name: shipName.rows.length > 0 ? shipName.rows[0].name : 'Unknown Ship'
      };
    }

    // Get full galaxy data
    // In the future, this could be filtered by discoveries
    const [regions, sectors, systems, stars, planets, hazards] = await Promise.all([
      pool.query('SELECT * FROM galaxy_regions ORDER BY name'),
      pool.query('SELECT * FROM galaxy_sectors ORDER BY name'),
      pool.query('SELECT * FROM galaxy_systems ORDER BY name'),
      pool.query('SELECT * FROM galaxy_stars ORDER BY name'),
      pool.query('SELECT * FROM galaxy_planets ORDER BY name'),
      pool.query('SELECT * FROM galaxy_hazards ORDER BY name')
    ]);

    // Build galaxy data structure
    const galaxyData = {
      shipLocation: location,
      regions: regions.rows.map(r => ({
        id: r.id,
        name: r.name,
        type: r.type,
        coordinates: { x: parseFloat(r.x), y: parseFloat(r.y), z: parseFloat(r.z) },
        radius: parseFloat(r.radius),
        controlledBy: r.controlled_by,
        sectors: [] // Will be populated below
      })),
      sectors: sectors.rows.map(s => ({
        id: s.id,
        name: s.name,
        regionId: s.region_id,
        coordinates: { x: parseFloat(s.x), y: parseFloat(s.y), z: parseFloat(s.z) },
        radius: parseFloat(s.radius),
        controlledBy: s.controlled_by,
        contested: s.contested,
        systems: [], // Will be populated below
        hazards: []  // Will be populated below
      })),
      systems: systems.rows.map(sys => ({
        id: sys.id,
        name: sys.name,
        sectorId: sys.sector_id,
        coordinates: { x: parseFloat(sys.x), y: parseFloat(sys.y), z: parseFloat(sys.z) },
        type: sys.system_type,
        stars: [] // Will be populated below
      })),
      stars: stars.rows.map(star => ({
        id: star.id,
        name: star.name,
        systemId: star.system_id,
        coordinates: { x: parseFloat(star.x), y: parseFloat(star.y), z: parseFloat(star.z) },
        spectralType: star.spectral_type,
        mass: parseFloat(star.mass),
        age: parseFloat(star.age),
        planets: [] // Will be populated below
      })),
      planets: planets.rows.map(p => ({
        id: p.id,
        name: p.name,
        starId: p.star_id,
        type: p.planet_type,
        orbit: parseFloat(p.orbit),
        habitability: p.habitability,
        temperature: p.temperature,
        atmosphere: p.atmosphere
      })),
      hazards: hazards.rows.map(h => ({
        id: h.id,
        name: h.name,
        sectorId: h.sector_id,
        type: h.hazard_type,
        coordinates: { x: parseFloat(h.x), y: parseFloat(h.y), z: parseFloat(h.z) },
        radius: parseFloat(h.radius),
        severity: h.severity
      }))
    };

    // Build hierarchical relationships
    // Link sectors to regions
    galaxyData.regions.forEach(region => {
      region.sectors = galaxyData.sectors
        .filter(s => s.regionId === region.id)
        .map(s => s.id);
    });

    // Link systems to sectors
    galaxyData.sectors.forEach(sector => {
      sector.systems = galaxyData.systems
        .filter(sys => sys.sectorId === sector.id)
        .map(sys => sys.id);

      // Link hazards to sectors
      sector.hazards = galaxyData.hazards.filter(h => h.sectorId === sector.id);
    });

    // Link stars to systems
    galaxyData.systems.forEach(system => {
      system.stars = galaxyData.stars
        .filter(star => star.systemId === system.id)
        .map(star => star.id);
    });

    // Link planets to stars
    galaxyData.stars.forEach(star => {
      star.planets = galaxyData.planets.filter(p => p.starId === star.id);
    });

    // Auto-discover objects in sensor range
    await autoDiscoverInRange(shipId, location);

    // Filter galaxy data based on ship's discoveries
    const filteredGalaxyData = await filterGalaxyByDiscovery(galaxyData, shipId, location);

    res.json(filteredGalaxyData);
  } catch (error) {
    console.error('Error fetching ship galaxy view:', error);
    res.status(500).json({ error: 'Failed to fetch galaxy data' });
  }
});

// ============================================
// GET full galaxy data (DM only - no restrictions)
// ============================================
router.get('/galaxy-data', isAdmin, async (req, res) => {
  try {
    // Get all galaxy data (same structure as ship-view but without Memory Bank check)
    const [regions, sectors, systems, stars, planets, hazards] = await Promise.all([
      pool.query('SELECT * FROM galaxy_regions ORDER BY name'),
      pool.query('SELECT * FROM galaxy_sectors ORDER BY name'),
      pool.query('SELECT * FROM galaxy_systems ORDER BY name'),
      pool.query('SELECT * FROM galaxy_stars ORDER BY name'),
      pool.query('SELECT * FROM galaxy_planets ORDER BY name'),
      pool.query('SELECT * FROM galaxy_hazards ORDER BY name')
    ]);

    // Build galaxy data structure (same as above)
    const galaxyData = {
      regions: regions.rows.map(r => ({
        id: r.id,
        name: r.name,
        type: r.type,
        coordinates: { x: parseFloat(r.x), y: parseFloat(r.y), z: parseFloat(r.z) },
        radius: parseFloat(r.radius),
        controlledBy: r.controlled_by,
        sectors: []
      })),
      sectors: sectors.rows.map(s => ({
        id: s.id,
        name: s.name,
        regionId: s.region_id,
        coordinates: { x: parseFloat(s.x), y: parseFloat(s.y), z: parseFloat(s.z) },
        radius: parseFloat(s.radius),
        controlledBy: s.controlled_by,
        contested: s.contested,
        systems: [],
        hazards: []
      })),
      systems: systems.rows.map(sys => ({
        id: sys.id,
        name: sys.name,
        sectorId: sys.sector_id,
        coordinates: { x: parseFloat(sys.x), y: parseFloat(sys.y), z: parseFloat(sys.z) },
        type: sys.system_type,
        stars: []
      })),
      stars: stars.rows.map(star => ({
        id: star.id,
        name: star.name,
        systemId: star.system_id,
        coordinates: { x: parseFloat(star.x), y: parseFloat(star.y), z: parseFloat(star.z) },
        spectralType: star.spectral_type,
        mass: parseFloat(star.mass),
        age: parseFloat(star.age),
        planets: []
      })),
      planets: planets.rows.map(p => ({
        id: p.id,
        name: p.name,
        starId: p.star_id,
        type: p.planet_type,
        orbit: parseFloat(p.orbit),
        habitability: p.habitability,
        temperature: p.temperature,
        atmosphere: p.atmosphere
      })),
      hazards: hazards.rows.map(h => ({
        id: h.id,
        name: h.name,
        sectorId: h.sector_id,
        type: h.hazard_type,
        coordinates: { x: parseFloat(h.x), y: parseFloat(h.y), z: parseFloat(h.z) },
        radius: parseFloat(h.radius),
        severity: h.severity
      }))
    };

    // Build hierarchical relationships
    galaxyData.regions.forEach(region => {
      region.sectors = galaxyData.sectors
        .filter(s => s.regionId === region.id)
        .map(s => s.id);
    });

    galaxyData.sectors.forEach(sector => {
      sector.systems = galaxyData.systems
        .filter(sys => sys.sectorId === sector.id)
        .map(sys => sys.id);
      sector.hazards = galaxyData.hazards.filter(h => h.sectorId === sector.id);
    });

    galaxyData.systems.forEach(system => {
      system.stars = galaxyData.stars
        .filter(star => star.systemId === system.id)
        .map(star => star.id);
    });

    galaxyData.stars.forEach(star => {
      star.planets = galaxyData.planets.filter(p => p.starId === star.id);
    });

    res.json(galaxyData);
  } catch (error) {
    console.error('Error fetching galaxy data:', error);
    res.status(500).json({ error: 'Failed to fetch galaxy data' });
  }
});

// ============================================
// GET all ship locations (DM only)
// ============================================
router.get('/all-ships', isAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        sl.*,
        s.name as ship_name,
        s.ship_class,
        c.name as owner_name
      FROM ship_locations sl
      JOIN ships s ON sl.ship_id = s.id
      LEFT JOIN characters c ON s.owner_id = c.id
      ORDER BY s.name
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching ship locations:', error);
    res.status(500).json({ error: 'Failed to fetch ship locations' });
  }
});

// ============================================
// PUT update ship location (DM only)
// ============================================
router.put('/ship-location/:shipId', isAdmin, async (req, res) => {
  try {
    const { shipId } = req.params;
    const { x, y, z, currentRegionId, currentSectorId, currentSystemId } = req.body;

    const result = await pool.query(`
      INSERT INTO ship_locations (ship_id, x, y, z, current_region_id, current_sector_id, current_system_id, last_updated)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      ON CONFLICT (ship_id) DO UPDATE SET
        x = EXCLUDED.x,
        y = EXCLUDED.y,
        z = EXCLUDED.z,
        current_region_id = EXCLUDED.current_region_id,
        current_sector_id = EXCLUDED.current_sector_id,
        current_system_id = EXCLUDED.current_system_id,
        last_updated = NOW()
      RETURNING *
    `, [shipId, x, y, z, currentRegionId || null, currentSectorId || null, currentSystemId || null]);

    // Trigger auto-discovery for new location
    await autoDiscoverInRange(shipId, { x, y, z });

    // Get ship name for socket event
    const shipName = await pool.query(`
      SELECT name FROM ships WHERE id = $1
    `, [shipId]);

    const locationWithName = {
      ...result.rows[0],
      ship_name: shipName.rows.length > 0 ? shipName.rows[0].name : 'Unknown Ship'
    };

    // Emit socket event for real-time update
    const io = req.app.get('io');
    io.to(`ship_${shipId}`).emit('ship_location_changed', locationWithName);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating ship location:', error);
    res.status(500).json({ error: 'Failed to update ship location' });
  }
});

module.exports = router;
