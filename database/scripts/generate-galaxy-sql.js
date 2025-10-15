// ============================================
// GALAXY SQL GENERATOR
// ============================================
// Generates a pure SQL file from galaxy.json
// Output can be copy-pasted into pgAdmin

const fs = require('fs');
const path = require('path');

function escapeSql(value) {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'number') return value;
  if (typeof value === 'boolean') return value;
  // Escape single quotes for SQL strings
  return `'${String(value).replace(/'/g, "''")}'`;
}

function generateGalaxySql() {
  console.log('🌌 Generating galaxy SQL...\n');

  try {
    // Read galaxy.json
    const galaxyPath = path.join(__dirname, '..', '..', 'galaxy.json');
    console.log(`📂 Reading galaxy data from: ${galaxyPath}`);

    if (!fs.existsSync(galaxyPath)) {
      throw new Error(`galaxy.json not found at ${galaxyPath}`);
    }

    const galaxyData = JSON.parse(fs.readFileSync(galaxyPath, 'utf8'));
    console.log(`✅ Galaxy data loaded: ${galaxyData.metadata.starCount} stars, ${galaxyData.metadata.planetCount} planets\n`);

    let sql = '';

    sql += '-- ============================================\n';
    sql += '-- GALAXY DATA IMPORT - AUTO-GENERATED\n';
    sql += '-- ============================================\n';
    sql += '-- Generated from galaxy.json\n';
    sql += `-- Stars: ${galaxyData.metadata.starCount}\n`;
    sql += `-- Planets: ${galaxyData.metadata.planetCount}\n`;
    sql += '-- ============================================\n\n';

    sql += 'BEGIN;\n\n';

    // ============================================
    // 1. IMPORT REGIONS
    // ============================================
    sql += '-- ============================================\n';
    sql += '-- 1. REGIONS\n';
    sql += '-- ============================================\n\n';

    for (const region of galaxyData.regions || []) {
      sql += `INSERT INTO galaxy_regions (id, name, type, x, y, z, radius, controlled_by)\n`;
      sql += `VALUES (${escapeSql(region.id)}, ${escapeSql(region.name)}, ${escapeSql(region.type)}, `;
      sql += `${region.coordinates.x}, ${region.coordinates.y}, ${region.coordinates.z}, `;
      sql += `${escapeSql(region.radius)}, ${escapeSql(region.controlledBy)})\n`;
      sql += `ON CONFLICT (id) DO UPDATE SET\n`;
      sql += `  name = EXCLUDED.name,\n`;
      sql += `  type = EXCLUDED.type,\n`;
      sql += `  x = EXCLUDED.x,\n`;
      sql += `  y = EXCLUDED.y,\n`;
      sql += `  z = EXCLUDED.z,\n`;
      sql += `  radius = EXCLUDED.radius,\n`;
      sql += `  controlled_by = EXCLUDED.controlled_by,\n`;
      sql += `  updated_at = NOW();\n\n`;
    }

    // ============================================
    // 2. IMPORT SECTORS
    // ============================================
    sql += '-- ============================================\n';
    sql += '-- 2. SECTORS\n';
    sql += '-- ============================================\n\n';

    for (const sector of galaxyData.sectors || []) {
      const region = galaxyData.regions.find(r => r.sectors.includes(sector.id));
      const contested = (sector.contestedBy && sector.contestedBy.length > 0) || false;

      sql += `INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)\n`;
      sql += `VALUES (${escapeSql(sector.id)}, ${escapeSql(sector.name)}, ${escapeSql(region ? region.id : null)}, `;
      sql += `${sector.coordinates.x}, ${sector.coordinates.y}, ${sector.coordinates.z}, `;
      sql += `${escapeSql(sector.radius)}, ${escapeSql(sector.controlledBy)}, ${contested})\n`;
      sql += `ON CONFLICT (id) DO UPDATE SET\n`;
      sql += `  name = EXCLUDED.name,\n`;
      sql += `  region_id = EXCLUDED.region_id,\n`;
      sql += `  x = EXCLUDED.x,\n`;
      sql += `  y = EXCLUDED.y,\n`;
      sql += `  z = EXCLUDED.z,\n`;
      sql += `  radius = EXCLUDED.radius,\n`;
      sql += `  controlled_by = EXCLUDED.controlled_by,\n`;
      sql += `  contested = EXCLUDED.contested,\n`;
      sql += `  updated_at = NOW();\n\n`;
    }

    // ============================================
    // 3. IMPORT SYSTEMS
    // ============================================
    sql += '-- ============================================\n';
    sql += '-- 3. SYSTEMS\n';
    sql += '-- ============================================\n\n';

    for (const system of galaxyData.systems || []) {
      const sector = galaxyData.sectors.find(s => s.systems && s.systems.includes(system.id));

      sql += `INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)\n`;
      sql += `VALUES (${escapeSql(system.id)}, ${escapeSql(system.name)}, ${escapeSql(sector ? sector.id : null)}, `;
      sql += `${system.coordinates.x}, ${system.coordinates.y}, ${system.coordinates.z}, `;
      sql += `${escapeSql(system.type || null)})\n`;
      sql += `ON CONFLICT (id) DO UPDATE SET\n`;
      sql += `  name = EXCLUDED.name,\n`;
      sql += `  sector_id = EXCLUDED.sector_id,\n`;
      sql += `  x = EXCLUDED.x,\n`;
      sql += `  y = EXCLUDED.y,\n`;
      sql += `  z = EXCLUDED.z,\n`;
      sql += `  system_type = EXCLUDED.system_type,\n`;
      sql += `  updated_at = NOW();\n\n`;
    }

    // ============================================
    // 4. IMPORT STARS
    // ============================================
    sql += '-- ============================================\n';
    sql += '-- 4. STARS\n';
    sql += '-- ============================================\n\n';

    for (const star of galaxyData.stars || []) {
      const system = galaxyData.systems.find(s => s.stars && s.stars.includes(star.id));

      sql += `INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)\n`;
      sql += `VALUES (${escapeSql(star.id)}, ${escapeSql(star.name)}, ${escapeSql(system ? system.id : null)}, `;
      sql += `${star.coordinates.x}, ${star.coordinates.y}, ${star.coordinates.z}, `;
      sql += `${escapeSql(star.spectralType)}, ${escapeSql(star.mass)}, ${escapeSql(star.age)})\n`;
      sql += `ON CONFLICT (id) DO UPDATE SET\n`;
      sql += `  name = EXCLUDED.name,\n`;
      sql += `  system_id = EXCLUDED.system_id,\n`;
      sql += `  x = EXCLUDED.x,\n`;
      sql += `  y = EXCLUDED.y,\n`;
      sql += `  z = EXCLUDED.z,\n`;
      sql += `  spectral_type = EXCLUDED.spectral_type,\n`;
      sql += `  mass = EXCLUDED.mass,\n`;
      sql += `  age = EXCLUDED.age,\n`;
      sql += `  updated_at = NOW();\n\n`;
    }

    // ============================================
    // 5. IMPORT PLANETS
    // ============================================
    sql += '-- ============================================\n';
    sql += '-- 5. PLANETS\n';
    sql += '-- ============================================\n\n';

    for (const star of galaxyData.stars || []) {
      if (star.planets && star.planets.length > 0) {
        for (const planet of star.planets) {
          sql += `INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)\n`;
          sql += `VALUES (${escapeSql(planet.id)}, ${escapeSql(planet.name)}, ${escapeSql(star.id)}, `;
          sql += `${escapeSql(planet.type)}, ${escapeSql(planet.orbit)}, ${escapeSql(planet.habitability || 0)}, `;
          sql += `${escapeSql(planet.temperature)}, ${escapeSql(planet.atmosphere || null)})\n`;
          sql += `ON CONFLICT (id) DO UPDATE SET\n`;
          sql += `  name = EXCLUDED.name,\n`;
          sql += `  star_id = EXCLUDED.star_id,\n`;
          sql += `  planet_type = EXCLUDED.planet_type,\n`;
          sql += `  orbit = EXCLUDED.orbit,\n`;
          sql += `  habitability = EXCLUDED.habitability,\n`;
          sql += `  temperature = EXCLUDED.temperature,\n`;
          sql += `  atmosphere = EXCLUDED.atmosphere,\n`;
          sql += `  updated_at = NOW();\n\n`;
        }
      }
    }

    // ============================================
    // 6. IMPORT HAZARDS
    // ============================================
    sql += '-- ============================================\n';
    sql += '-- 6. HAZARDS\n';
    sql += '-- ============================================\n\n';

    let hazardCounter = 0;
    for (const sector of galaxyData.sectors || []) {
      if (sector.hazards && sector.hazards.length > 0) {
        for (const hazard of sector.hazards) {
          // Generate ID if hazard doesn't have one
          const hazardId = hazard.id || `hazard-${sector.id}-${hazardCounter++}`;

          sql += `INSERT INTO galaxy_hazards (id, name, sector_id, hazard_type, x, y, z, radius, severity)\n`;
          sql += `VALUES (${escapeSql(hazardId)}, ${escapeSql(hazard.name)}, ${escapeSql(sector.id)}, `;
          sql += `${escapeSql(hazard.type)}, ${hazard.coordinates.x}, ${hazard.coordinates.y}, ${hazard.coordinates.z}, `;
          sql += `${escapeSql(hazard.radius)}, ${escapeSql(hazard.severity || 'medium')})\n`;
          sql += `ON CONFLICT (id) DO UPDATE SET\n`;
          sql += `  name = EXCLUDED.name,\n`;
          sql += `  sector_id = EXCLUDED.sector_id,\n`;
          sql += `  hazard_type = EXCLUDED.hazard_type,\n`;
          sql += `  x = EXCLUDED.x,\n`;
          sql += `  y = EXCLUDED.y,\n`;
          sql += `  z = EXCLUDED.z,\n`;
          sql += `  radius = EXCLUDED.radius,\n`;
          sql += `  severity = EXCLUDED.severity,\n`;
          sql += `  updated_at = NOW();\n\n`;
        }
      }
    }

    sql += 'COMMIT;\n';

    // Write to file
    const outputPath = path.join(__dirname, '..', 'galaxy-data.sql');
    fs.writeFileSync(outputPath, sql, 'utf8');

    console.log(`✅ SQL file generated: ${outputPath}`);
    console.log(`\n📋 You can now:\n`);
    console.log(`   1. Open pgAdmin`);
    console.log(`   2. Connect to your database`);
    console.log(`   3. Open Query Tool`);
    console.log(`   4. Copy-paste the contents of: database/galaxy-data.sql`);
    console.log(`   5. Execute the script\n`);

  } catch (error) {
    console.error('\n❌ Error generating SQL:', error);
    throw error;
  }
}

// Run the generator
generateGalaxySql();
