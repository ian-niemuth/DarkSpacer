const fs = require('fs');

// Read galaxy.json
const galaxyData = JSON.parse(fs.readFileSync('galaxy.json', 'utf8'));

const habitablePlanets = [];

// Create lookup maps
const systemsMap = new Map(galaxyData.systems.map(s => [s.id, s]));
const starsMap = new Map(galaxyData.stars.map(s => [s.id, s]));

// Iterate through all stars and collect habitable planets
galaxyData.stars.forEach(star => {
  if (star.planets && Array.isArray(star.planets)) {
    star.planets.forEach(planet => {
      if (planet.habitability && planet.habitability > 0) {
        const system = systemsMap.get(star.systemId);

        // Add context information
        habitablePlanets.push({
          ...planet,
          systemName: system ? system.name : 'Unknown',
          systemId: star.systemId,
          sectorId: system ? system.sectorId : null,
          starName: star.name,
          starId: star.id,
          starType: star.spectralType,
          systemCoordinates: system ? system.coordinates : null
        });
      }
    });
  }
});

// Write to output file
fs.writeFileSync('habitable_planets.json', JSON.stringify(habitablePlanets, null, 2));

console.log(`Found ${habitablePlanets.length} habitable planets`);
console.log('Output written to habitable_planets.json');
