// ============================================
// GALAXY DATA IMPORT SCRIPT
// ============================================
// Imports galaxy.json data into database tables
// Run this after executing migration 020_add_galaxy_star_map.sql

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'darkspace_campaign',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD
});

async function importGalaxyData() {
  console.log('🌌 Starting galaxy data import...\n');

  try {
    // Read galaxy.json
    const galaxyPath = path.join(__dirname, '..', '..', 'galaxy.json');
    console.log(`📂 Reading galaxy data from: ${galaxyPath}`);

    if (!fs.existsSync(galaxyPath)) {
      throw new Error(`galaxy.json not found at ${galaxyPath}`);
    }

    const galaxyData = JSON.parse(fs.readFileSync(galaxyPath, 'utf8'));
    console.log(`✅ Galaxy data loaded: ${galaxyData.metadata.starCount} stars, ${galaxyData.metadata.planetCount} planets\n`);

    // Begin transaction
    const client = await pool.connect();
    await client.query('BEGIN');

    try {
      // ============================================
      // 1. IMPORT REGIONS
      // ============================================
      console.log('📍 Importing regions...');
      let regionCount = 0;

      for (const region of galaxyData.regions || []) {
        await client.query(`
          INSERT INTO galaxy_regions (id, name, type, x, y, z, radius, controlled_by)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            type = EXCLUDED.type,
            x = EXCLUDED.x,
            y = EXCLUDED.y,
            z = EXCLUDED.z,
            radius = EXCLUDED.radius,
            controlled_by = EXCLUDED.controlled_by,
            updated_at = NOW()
        `, [
          region.id,
          region.name,
          region.type,
          region.coordinates.x,
          region.coordinates.y,
          region.coordinates.z,
          region.radius,
          region.controlledBy
        ]);
        regionCount++;
      }
      console.log(`✅ Imported ${regionCount} regions`);

      // ============================================
      // 2. IMPORT SECTORS
      // ============================================
      console.log('📍 Importing sectors...');
      let sectorCount = 0;

      for (const sector of galaxyData.sectors || []) {
        // Find which region this sector belongs to
        const region = galaxyData.regions.find(r => r.sectors.includes(sector.id));

        await client.query(`
          INSERT INTO galaxy_sectors (id, name, region_id, x, y, z, radius, controlled_by, contested)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            region_id = EXCLUDED.region_id,
            x = EXCLUDED.x,
            y = EXCLUDED.y,
            z = EXCLUDED.z,
            radius = EXCLUDED.radius,
            controlled_by = EXCLUDED.controlled_by,
            contested = EXCLUDED.contested,
            updated_at = NOW()
        `, [
          sector.id,
          sector.name,
          region ? region.id : null,
          sector.coordinates.x,
          sector.coordinates.y,
          sector.coordinates.z,
          sector.radius,
          sector.controlledBy,
          (sector.contestedBy && sector.contestedBy.length > 0) || false
        ]);
        sectorCount++;
      }
      console.log(`✅ Imported ${sectorCount} sectors`);

      // ============================================
      // 3. IMPORT SYSTEMS
      // ============================================
      console.log('📍 Importing systems...');
      let systemCount = 0;

      for (const system of galaxyData.systems || []) {
        // Find which sector this system belongs to
        const sector = galaxyData.sectors.find(s => s.systems && s.systems.includes(system.id));

        await client.query(`
          INSERT INTO galaxy_systems (id, name, sector_id, x, y, z, system_type)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            sector_id = EXCLUDED.sector_id,
            x = EXCLUDED.x,
            y = EXCLUDED.y,
            z = EXCLUDED.z,
            system_type = EXCLUDED.system_type,
            updated_at = NOW()
        `, [
          system.id,
          system.name,
          sector ? sector.id : null,
          system.coordinates.x,
          system.coordinates.y,
          system.coordinates.z,
          system.type || null
        ]);
        systemCount++;
      }
      console.log(`✅ Imported ${systemCount} systems`);

      // ============================================
      // 4. IMPORT STARS
      // ============================================
      console.log('⭐ Importing stars...');
      let starCount = 0;

      for (const star of galaxyData.stars || []) {
        // Find which system this star belongs to
        const system = galaxyData.systems.find(s => s.stars && s.stars.includes(star.id));

        await client.query(`
          INSERT INTO galaxy_stars (id, name, system_id, x, y, z, spectral_type, mass, age)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            system_id = EXCLUDED.system_id,
            x = EXCLUDED.x,
            y = EXCLUDED.y,
            z = EXCLUDED.z,
            spectral_type = EXCLUDED.spectral_type,
            mass = EXCLUDED.mass,
            age = EXCLUDED.age,
            updated_at = NOW()
        `, [
          star.id,
          star.name,
          system ? system.id : null,
          star.coordinates.x,
          star.coordinates.y,
          star.coordinates.z,
          star.spectralType,
          star.mass,
          star.age
        ]);
        starCount++;

        // ============================================
        // 5. IMPORT PLANETS (for this star)
        // ============================================
        if (star.planets && star.planets.length > 0) {
          for (const planet of star.planets) {
            await client.query(`
              INSERT INTO galaxy_planets (id, name, star_id, planet_type, orbit, habitability, temperature, atmosphere)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
              ON CONFLICT (id) DO UPDATE SET
                name = EXCLUDED.name,
                star_id = EXCLUDED.star_id,
                planet_type = EXCLUDED.planet_type,
                orbit = EXCLUDED.orbit,
                habitability = EXCLUDED.habitability,
                temperature = EXCLUDED.temperature,
                atmosphere = EXCLUDED.atmosphere,
                updated_at = NOW()
            `, [
              planet.id,
              planet.name,
              star.id,
              planet.type,
              planet.orbit,
              planet.habitability || 0,
              planet.temperature,
              planet.atmosphere || null
            ]);
          }
        }
      }
      console.log(`✅ Imported ${starCount} stars and their planets`);

      // ============================================
      // 6. IMPORT HAZARDS
      // ============================================
      console.log('⚠️  Importing hazards...');
      let hazardCount = 0;

      for (const sector of galaxyData.sectors || []) {
        if (sector.hazards && sector.hazards.length > 0) {
          for (const hazard of sector.hazards) {
            await client.query(`
              INSERT INTO galaxy_hazards (id, name, sector_id, hazard_type, x, y, z, radius, severity)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
              ON CONFLICT (id) DO UPDATE SET
                name = EXCLUDED.name,
                sector_id = EXCLUDED.sector_id,
                hazard_type = EXCLUDED.hazard_type,
                x = EXCLUDED.x,
                y = EXCLUDED.y,
                z = EXCLUDED.z,
                radius = EXCLUDED.radius,
                severity = EXCLUDED.severity,
                updated_at = NOW()
            `, [
              hazard.id,
              hazard.name,
              sector.id,
              hazard.type,
              hazard.coordinates.x,
              hazard.coordinates.y,
              hazard.coordinates.z,
              hazard.radius,
              hazard.severity || 'medium'
            ]);
            hazardCount++;
          }
        }
      }
      console.log(`✅ Imported ${hazardCount} hazards`);

      // Commit transaction
      await client.query('COMMIT');
      console.log('\n✨ Galaxy data import completed successfully!');
      console.log(`\n📊 Summary:`);
      console.log(`   Regions:  ${regionCount}`);
      console.log(`   Sectors:  ${sectorCount}`);
      console.log(`   Systems:  ${systemCount}`);
      console.log(`   Stars:    ${starCount}`);
      console.log(`   Planets:  ${galaxyData.metadata.planetCount}`);
      console.log(`   Hazards:  ${hazardCount}`);

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('\n❌ Error importing galaxy data:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

// Run the import
importGalaxyData()
  .then(() => {
    console.log('\n✅ Import script finished successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Import script failed:', error);
    process.exit(1);
  });
