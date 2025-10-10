import { useState } from 'react';

function LocationDetails({ location, currentLevel, shipData }) {
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!location) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="text-center text-gray-400 py-12">
          <p className="text-lg mb-2">📡 No Location Selected</p>
          <p className="text-sm">Click on a location to view details</p>
        </div>
      </div>
    );
  }
  
  const tabs = ['overview'];
  if (currentLevel === 'system') {
    tabs.push('civilization', 'biology', 'environment', 'resources', 'physical');
  }
  
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 p-4 border-b border-gray-700">
        <h3 className="text-xl font-bold mb-1">
          {currentLevel === 'sector' ? location.system_code : location.name}
        </h3>
        <p className="text-sm text-gray-400">
          {currentLevel === 'sector' ? 'System' : location.body_type}
          {' · '}
          Coordinates: ({location.x_coord}, {location.y_coord})
        </p>
      </div>
      
      {/* Tabs */}
      {currentLevel === 'system' && (
        <div className="flex overflow-x-auto bg-gray-900 border-b border-gray-700">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-4 py-2 text-sm font-medium whitespace-nowrap
                ${activeTab === tab 
                  ? 'bg-gray-800 text-white border-b-2 border-blue-500' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      )}
      
      {/* Content */}
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {currentLevel === 'sector' && <SystemOverview location={location} />}
        {currentLevel === 'system' && activeTab === 'overview' && <PlanetOverview location={location} />}
        {currentLevel === 'system' && activeTab === 'civilization' && <CivilizationTab location={location} />}
        {currentLevel === 'system' && activeTab === 'biology' && <BiologyTab location={location} />}
        {currentLevel === 'system' && activeTab === 'environment' && <EnvironmentTab location={location} />}
        {currentLevel === 'system' && activeTab === 'resources' && <ResourcesTab location={location} />}
        {currentLevel === 'system' && activeTab === 'physical' && <PhysicalTab location={location} />}
      </div>
      
      {/* Action Buttons */}
      <div className="bg-gray-900 p-4 border-t border-gray-700 space-y-2">
        {currentLevel === 'system' && (
          <>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
              📡 Perform Detailed Scan
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
              🎯 Set as Navigation Target
            </button>
          </>
        )}
        {currentLevel === 'sector' && (
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
            🔍 View System Details
          </button>
        )}
      </div>
    </div>
  );
}

// System Overview (when viewing a system from sector level)
function SystemOverview({ location }) {
  return (
    <div className="space-y-4">
      <InfoRow label="System Code" value={location.system_code} />
      <InfoRow label="Star Type" value={location.star_type || 'Unknown'} />
      <InfoRow label="Star Count" value={location.star_count || 1} />
      <InfoRow label="Danger Tier" value={location.danger_tier} />
      
      {location.description && (
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2">Description</h4>
          <p className="text-sm text-gray-300">{location.description}</p>
        </div>
      )}
      
      <div className="bg-blue-900/20 border border-blue-500 rounded p-3 mt-4">
        <p className="text-sm text-blue-300">
          💡 Click on this system in the map to view its planets and celestial bodies
        </p>
      </div>
    </div>
  );
}

// Planet Overview Tab
function PlanetOverview({ location }) {
  return (
    <div className="space-y-4">
      <InfoRow label="Name" value={location.name} />
      <InfoRow label="Type" value={location.body_type} />
      <InfoRow label="Danger Level" value={`${location.danger_level || 'Unknown'} / 10`} />
      
      {location.is_habitable !== undefined && (
        <div className={`p-3 rounded ${location.is_habitable ? 'bg-green-900/20 border border-green-500' : 'bg-red-900/20 border border-red-500'}`}>
          <p className={`text-sm font-semibold ${location.is_habitable ? 'text-green-300' : 'text-red-300'}`}>
            {location.is_habitable ? '✓ Habitable' : '✗ Not Habitable'}
          </p>
        </div>
      )}
      
      {location.description && (
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2">Description</h4>
          <p className="text-sm text-gray-300">{location.description}</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        <QuickStat icon="👥" label="Population" value={location.population ? formatPopulation(location.population) : 'None'} />
        <QuickStat icon="🏭" label="Tech Level" value={location.tech_level || 'N/A'} />
        <QuickStat icon="🌡️" label="Temperature" value={location.avg_temp_c ? `${location.avg_temp_c}°C` : 'Unknown'} />
        <QuickStat icon="💨" label="Atmosphere" value={location.atmosphere_type || 'Unknown'} />
      </div>
    </div>
  );
}

// Civilization Tab
function CivilizationTab({ location }) {
  return (
    <div className="space-y-4">
      <InfoRow label="Population" value={location.population ? formatPopulation(location.population) : 'Uninhabited'} />
      <InfoRow label="Tech Level" value={location.tech_level || 'N/A'} />
      <InfoRow label="Government Type" value={location.government_type || 'None'} />
      <InfoRow label="Faction Control" value={location.faction_control || 'Independent'} />
      <InfoRow label="Spaceport" value={location.has_spaceport ? 'Yes' : 'No'} />
      
      {location.major_settlements && (
        <>
          <h4 className="text-sm font-semibold text-gray-400 mt-4">Major Settlements</h4>
          <p className="text-sm text-gray-300">{location.major_settlements}</p>
        </>
      )}
      
      {location.trade_goods && (
        <>
          <h4 className="text-sm font-semibold text-gray-400 mt-4">Trade Goods</h4>
          <p className="text-sm text-gray-300">{location.trade_goods}</p>
        </>
      )}
    </div>
  );
}

// Biology Tab
function BiologyTab({ location }) {
  return (
    <div className="space-y-4">
      <InfoRow label="Habitable" value={location.is_habitable ? 'Yes' : 'No'} />
      <InfoRow label="Life Present" value={location.has_life ? 'Yes' : 'No'} />
      <InfoRow label="Ecosystem Type" value={location.ecosystem_type || 'None'} />
      <InfoRow label="Flora Danger" value={`${location.flora_danger_level || 0} / 10`} />
      <InfoRow label="Fauna Danger" value={`${location.fauna_danger_level || 0} / 10`} />
      <InfoRow label="Indigenous Species" value={location.indigenous_species || 'None'} />
      
      {location.dominant_biome && (
        <>
          <h4 className="text-sm font-semibold text-gray-400 mt-4">Dominant Biome</h4>
          <p className="text-sm text-gray-300">{location.dominant_biome}</p>
        </>
      )}
    </div>
  );
}

// Environment Tab
function EnvironmentTab({ location }) {
  return (
    <div className="space-y-4">
      <InfoRow label="Atmosphere" value={location.atmosphere_type || 'None'} />
      <InfoRow label="Atmosphere Pressure" value={location.atmosphere_pressure || 'Unknown'} />
      <InfoRow label="Average Temperature" value={location.avg_temp_c ? `${location.avg_temp_c}°C` : 'Unknown'} />
      <InfoRow label="Temperature Range" value={location.temp_range_c || 'Unknown'} />
      <InfoRow label="Weather Patterns" value={location.weather_patterns || 'Stable'} />
      <InfoRow label="Radiation Level" value={`${location.radiation_level || 0} / 10`} />
      <InfoRow label="Seismic Activity" value={location.seismic_activity || 'None'} />
      <InfoRow label="Magnetic Field" value={location.magnetic_field_strength || 'Unknown'} />
    </div>
  );
}

// Resources Tab
function ResourcesTab({ location }) {
  return (
    <div className="space-y-4">
      <InfoRow label="Mineral Richness" value={`${location.mineral_richness || 0} / 10`} />
      <InfoRow label="Fuel Deposits" value={location.fuel_deposits || 'None'} />
      <InfoRow label="Rare Elements" value={location.rare_elements || 'None'} />
      
      {location.salvage_opportunities && (
        <>
          <h4 className="text-sm font-semibold text-gray-400 mt-4">Salvage Opportunities</h4>
          <p className="text-sm text-gray-300">{location.salvage_opportunities}</p>
        </>
      )}
      
      {location.trade_goods && (
        <>
          <h4 className="text-sm font-semibold text-gray-400 mt-4">Available Trade Goods</h4>
          <p className="text-sm text-gray-300">{location.trade_goods}</p>
        </>
      )}
      
      <div className="bg-yellow-900/20 border border-yellow-500 rounded p-3 mt-4">
        <p className="text-sm text-yellow-300">
          💰 Resource extraction may require specialized equipment and permits
        </p>
      </div>
    </div>
  );
}

// Physical Tab
function PhysicalTab({ location }) {
  return (
    <div className="space-y-4">
      <InfoRow label="Size Class" value={location.size_class || 'Unknown'} />
      <InfoRow label="Diameter" value={location.diameter_km ? `${location.diameter_km.toLocaleString()} km` : 'Unknown'} />
      <InfoRow label="Gravity" value={location.gravity_g ? `${location.gravity_g}g` : 'Unknown'} />
      <InfoRow label="Orbital Period" value={location.orbital_period_days ? `${location.orbital_period_days} days` : 'Unknown'} />
      <InfoRow label="Rotation Period" value={location.rotation_period_hours ? `${location.rotation_period_hours} hours` : 'Unknown'} />
      <InfoRow label="Axial Tilt" value={location.axial_tilt_degrees ? `${location.axial_tilt_degrees}°` : 'Unknown'} />
      <InfoRow label="Moons" value={location.moon_count || 0} />
      <InfoRow label="Rings" value={location.has_rings ? 'Yes' : 'No'} />
    </div>
  );
}

// Helper Components
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-sm text-gray-400">{label}:</span>
      <span className="text-sm text-white font-medium text-right">{value}</span>
    </div>
  );
}

function QuickStat({ icon, label, value }) {
  return (
    <div className="bg-gray-700/50 rounded p-2 text-center">
      <div className="text-xl mb-1">{icon}</div>
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

function formatPopulation(pop) {
  if (pop >= 1e9) return `${(pop / 1e9).toFixed(1)}B`;
  if (pop >= 1e6) return `${(pop / 1e6).toFixed(1)}M`;
  if (pop >= 1e3) return `${(pop / 1e3).toFixed(1)}K`;
  return pop.toString();
}

export default LocationDetails;
