// ============================================
// DISCOVERY SYSTEM HELPER FUNCTIONS
// ============================================
// Utilities for fog of war and progressive discovery

const pool = require('../config/database');

/**
 * Check if ship has Advanced Memory Bank (bypasses all discovery checks)
 * @param {number} shipId
 * @returns {Promise<boolean>}
 */
async function hasAdvancedMemoryBank(shipId) {
  try {
    const result = await pool.query(`
      SELECT has_advanced_memory_bank($1) as has_advanced
    `, [shipId]);

    const hasAdvanced = result.rows[0]?.has_advanced || false;
    console.log(`[Discovery] Ship ${shipId} has Advanced Memory Bank: ${hasAdvanced}`);
    return hasAdvanced;
  } catch (error) {
    console.error('Error checking advanced memory bank:', error);
    return false;
  }
}

/**
 * Get ship's sensor range in light years
 * @param {number} shipId
 * @returns {Promise<number>} Range in light years (0 if no sensors)
 */
async function getSensorRange(shipId) {
  try {
    const result = await pool.query(`
      SELECT get_ship_sensor_range($1) as sensor_range
    `, [shipId]);

    return parseFloat(result.rows[0]?.sensor_range) || 0;
  } catch (error) {
    console.error('Error getting sensor range:', error);
    return 0;
  }
}

/**
 * Get all discoveries for a ship
 * @param {number} shipId
 * @returns {Promise<Object>} Map of discovery type to array of IDs
 */
async function getShipDiscoveries(shipId) {
  try {
    const result = await pool.query(`
      SELECT discovery_type, discovery_id, detail_level
      FROM ship_discoveries
      WHERE ship_id = $1
    `, [shipId]);

    const discoveries = {
      regions: [],
      sectors: [],
      systems: [],
      stars: [],
      planets: [],
      hazards: []
    };

    result.rows.forEach(row => {
      const key = row.discovery_type + 's'; // 'region' -> 'regions'
      if (discoveries[key]) {
        discoveries[key].push({
          id: row.discovery_id,
          detailLevel: row.detail_level
        });
      }
    });

    return discoveries;
  } catch (error) {
    console.error('Error getting ship discoveries:', error);
    return {
      regions: [],
      sectors: [],
      systems: [],
      stars: [],
      planets: [],
      hazards: []
    };
  }
}

/**
 * Check if an object is in sensor range
 * @param {Object} object - Object with coordinates {x, y, z}
 * @param {Object} shipLocation - Ship location {x, y, z}
 * @param {number} sensorRange - Sensor range in light years
 * @returns {boolean}
 */
function isInSensorRange(object, shipLocation, sensorRange) {
  if (!object || !shipLocation || sensorRange <= 0) return false;

  const dx = parseFloat(object.x) - parseFloat(shipLocation.x);
  const dy = parseFloat(object.y) - parseFloat(shipLocation.y);
  const dz = parseFloat(object.z) - parseFloat(shipLocation.z);

  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

  return distance <= sensorRange;
}

/**
 * Calculate distance between two points in 3D space
 * @param {Object} point1 - {x, y, z}
 * @param {Object} point2 - {x, y, z}
 * @returns {number} Distance in light years
 */
function calculateDistance(point1, point2) {
  const dx = parseFloat(point1.x) - parseFloat(point2.x);
  const dy = parseFloat(point1.y) - parseFloat(point2.y);
  const dz = parseFloat(point1.z) - parseFloat(point2.z);

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Auto-discover objects in sensor range when ship moves
 * @param {number} shipId
 * @param {Object} location - {x, y, z}
 * @returns {Promise<Array>} Array of newly discovered objects
 */
async function autoDiscoverInRange(shipId, location) {
  try {
    const result = await pool.query(`
      SELECT * FROM auto_discover_in_range($1, $2, $3, $4)
    `, [shipId, location.x, location.y, location.z]);

    return result.rows || [];
  } catch (error) {
    console.error('Error auto-discovering objects:', error);
    return [];
  }
}

/**
 * Filter galaxy data based on ship's discoveries
 * @param {Object} galaxyData - Full galaxy data
 * @param {number} shipId
 * @param {Object} shipLocation
 * @returns {Promise<Object>} Filtered galaxy data with discovery levels
 */
async function filterGalaxyByDiscovery(galaxyData, shipId, shipLocation) {
  // Check if ship has Advanced Memory Bank
  const hasAdvanced = await hasAdvancedMemoryBank(shipId);

  // If Advanced Memory Bank, return everything (current behavior)
  if (hasAdvanced) {
    console.log(`[Discovery] Ship ${shipId} has Advanced Memory Bank - returning all data`);
    return {
      ...galaxyData,
      hasAdvancedMemoryBank: true,
      sensorRange: 0,
      discoveries: { regions: [], sectors: [], systems: [], stars: [], planets: [], hazards: [] }
    };
  }

  // Get ship's sensor range and discoveries
  const sensorRange = await getSensorRange(shipId);
  const discoveries = await getShipDiscoveries(shipId);

  console.log(`[Discovery] Ship ${shipId} - Sensor Range: ${sensorRange} ly`);
  console.log(`[Discovery] Ship ${shipId} - Discoveries:`, {
    regions: discoveries.regions?.length || 0,
    sectors: discoveries.sectors?.length || 0,
    systems: discoveries.systems?.length || 0,
    stars: discoveries.stars?.length || 0,
    planets: discoveries.planets?.length || 0,
    hazards: discoveries.hazards?.length || 0
  });

  // Helper to check if object is discovered
  const isDiscovered = (type, id) => {
    const typeKey = type + 's';
    return discoveries[typeKey]?.some(d => d.id === id) || false;
  };

  // Helper to get discovery level (0 = undiscovered, 1 = scanned, 2 = discovered)
  const getDiscoveryLevel = (type, id, coords) => {
    const typeKey = type + 's';
    const discovery = discoveries[typeKey]?.find(d => d.id === id);

    if (discovery) {
      return discovery.detailLevel; // 1 or 2
    }

    // Check if in sensor range
    if (coords && shipLocation && isInSensorRange(coords, shipLocation, sensorRange)) {
      return 1; // In range
    }

    return 0; // Undiscovered
  };

  // Filter and annotate galaxy data
  const filtered = {
    shipLocation: galaxyData.shipLocation,
    hasAdvancedMemoryBank: false,
    sensorRange,
    discoveries,

    // Regions - always visible but with discovery levels
    regions: galaxyData.regions?.map(r => ({
      ...r,
      discoveryLevel: getDiscoveryLevel('region', r.id, r.coordinates)
    })) || [],

    // Sectors - always visible but with discovery levels
    sectors: galaxyData.sectors?.map(s => ({
      ...s,
      discoveryLevel: getDiscoveryLevel('sector', s.id, s.coordinates)
    })) || [],

    // Systems - show all but mark discovery levels
    systems: galaxyData.systems?.map(sys => ({
      ...sys,
      discoveryLevel: getDiscoveryLevel('system', sys.id, sys.coordinates),
      stars: isDiscovered('system', sys.id) ? sys.stars : [] // Hide stars unless system discovered
    })) || [],

    // Stars - filter by discovery
    stars: galaxyData.stars?.filter(star => {
      const level = getDiscoveryLevel('star', star.id, star.coordinates);
      return level > 0; // Show if discovered or in range
    }).map(star => ({
      ...star,
      discoveryLevel: getDiscoveryLevel('star', star.id, star.coordinates),
      planets: isDiscovered('star', star.id) ? star.planets : [] // Hide planets unless star discovered
    })) || [],

    // Planets - filter by discovery
    planets: galaxyData.planets?.filter(planet => {
      // Find parent star
      const parentStar = galaxyData.stars?.find(s => s.id === planet.starId);
      if (!parentStar) return false;

      // Show if parent star is discovered OR in sensor range
      const starDiscoveryLevel = getDiscoveryLevel('star', parentStar.id, parentStar.coordinates);
      return starDiscoveryLevel > 0; // Show if star is scanned (1) or discovered (2)
    }).map(planet => {
      // Get planet's own discovery level
      const typeKey = 'planets';
      const planetDiscovery = discoveries[typeKey]?.find(d => d.id === planet.id);

      // Get parent star's discovery level
      const parentStar = galaxyData.stars?.find(s => s.id === planet.starId);
      const starDiscoveryLevel = parentStar
        ? getDiscoveryLevel('star', parentStar.id, parentStar.coordinates)
        : 0;

      // Planet inherits parent star's discovery level as minimum
      // If planet is specifically discovered (level 2), use that
      const planetLevel = planetDiscovery?.detailLevel || 0;
      const discoveryLevel = Math.max(planetLevel, starDiscoveryLevel);

      return {
        ...planet,
        discoveryLevel
      };
    }) || [],

    // Hazards - filter by discovery
    hazards: galaxyData.hazards?.filter(hazard => {
      const level = getDiscoveryLevel('hazard', hazard.id, hazard.coordinates);
      return level > 0; // Show if discovered or in range
    }).map(hazard => ({
      ...hazard,
      discoveryLevel: getDiscoveryLevel('hazard', hazard.id, hazard.coordinates)
    })) || []
  };

  return filtered;
}

/**
 * Record a discovery manually (for purchases, sharing, etc.)
 * @param {number} shipId
 * @param {string} discoveryType - 'region', 'sector', 'system', 'star', 'planet', 'hazard'
 * @param {string} discoveryId
 * @param {string} method - 'chart_purchase', 'shared', 'jump', etc.
 * @param {number} detailLevel - 1 = scanned, 2 = fully discovered
 * @returns {Promise<boolean>} Success
 */
async function recordDiscovery(shipId, discoveryType, discoveryId, method = 'manual', detailLevel = 2) {
  try {
    await pool.query(`
      INSERT INTO ship_discoveries (ship_id, discovery_type, discovery_id, discovery_method, detail_level)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (ship_id, discovery_type, discovery_id)
      DO UPDATE SET
        detail_level = GREATEST(ship_discoveries.detail_level, EXCLUDED.detail_level),
        discovery_method = EXCLUDED.discovery_method
    `, [shipId, discoveryType, discoveryId, method, detailLevel]);

    return true;
  } catch (error) {
    console.error('Error recording discovery:', error);
    return false;
  }
}

module.exports = {
  hasAdvancedMemoryBank,
  getSensorRange,
  getShipDiscoveries,
  isInSensorRange,
  calculateDistance,
  autoDiscoverInRange,
  filterGalaxyByDiscovery,
  recordDiscovery
};
