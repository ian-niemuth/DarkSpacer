import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SpaceMap({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [shipData, setShipData] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const [systems, setSystems] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [systemBodies, setSystemBodies] = useState([]);
  const [selectedBody, setSelectedBody] = useState(null);
  
  // Check ship access and load data
  useEffect(() => {
    initializeSpaceMap();
  }, []);
  
  const initializeSpaceMap = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Get player's ships
      const shipsResponse = await fetch('http://localhost:3001/api/ships/player', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!shipsResponse.ok) throw new Error('Failed to fetch ships');
      const ships = await shipsResponse.json();
      
      if (ships.length === 0) {
        setError('You need a ship to access the space map!');
        setLoading(false);
        return;
      }
      
      // Get first ship's details
      const shipResponse = await fetch(`http://localhost:3001/api/ships/${ships[0].id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!shipResponse.ok) throw new Error('Failed to fetch ship details');
      const shipDetails = await shipResponse.json();
      
      // Check for Memory Bank
      const hasMemoryBank = shipDetails.components?.some(
        c => c.component_name === 'Memory Bank' && c.is_installed
      );
      
      setShipData({ ...shipDetails, hasMemoryBank });
      
      // Load campaign and systems
      await loadCampaignSystems(token);
      
    } catch (err) {
      console.error('Error initializing space map:', err);
      setError(err.message || 'Failed to load space map');
    } finally {
      setLoading(false);
    }
  };
  
  const loadCampaignSystems = async (token) => {
    try {
      // Get campaign
      const campaignResponse = await fetch('http://localhost:3001/api/space/campaigns', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!campaignResponse.ok) throw new Error('Failed to fetch campaign');
      const campaigns = await campaignResponse.json();
      
      if (campaigns.length === 0) {
        throw new Error('No campaign found');
      }
      
      const activeCampaign = campaigns[0];
      
      // Initialize if needed
      if (!activeCampaign.starting_sector_id) {
        const initResponse = await fetch('http://localhost:3001/api/space/init-starter-sector', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ campaignId: activeCampaign.id })
        });
        
        if (!initResponse.ok) throw new Error('Failed to initialize space');
        
        // Reload campaign
        const updatedResponse = await fetch('http://localhost:3001/api/space/campaigns', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const updatedCampaigns = await updatedResponse.json();
        setCampaign(updatedCampaigns[0]);
      } else {
        setCampaign(activeCampaign);
      }
      
      // Load systems in starter sector
      const sectorId = activeCampaign.starting_sector_id;
      const systemsResponse = await fetch(`http://localhost:3001/api/space/systems/${sectorId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!systemsResponse.ok) throw new Error('Failed to fetch systems');
      const systemsData = await systemsResponse.json();
      
      setSystems(systemsData);
      
    } catch (err) {
      console.error('Error loading campaign:', err);
      throw err;
    }
  };
  
  const loadSystemBodies = async (system) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/space/celestial-bodies/${system.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Failed to fetch celestial bodies');
      const bodies = await response.json();
      
      setSystemBodies(bodies);
      setSelectedSystem(system);
      setSelectedBody(null);
    } catch (err) {
      console.error('Error loading system bodies:', err);
      alert('Failed to load system details');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading space map...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-8 max-w-md">
          <h2 className="text-xl font-bold text-red-400 mb-4">⚠️ Access Denied</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">🌌 Space Map</h1>
            <div className="text-sm text-gray-400 mt-1">
              Ship: {shipData?.name}
              {shipData?.hasMemoryBank ? (
                <span className="ml-2 text-green-400">✓ Memory Bank Active</span>
              ) : (
                <span className="ml-2 text-yellow-400">⚠️ No Memory Bank</span>
              )}
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            ← Dashboard
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Systems List - Left Column */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">⭐ Systems in Current Sector</h2>
              
              {systems.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <p>No systems detected</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {systems.map((system) => (
                    <div
                      key={system.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedSystem?.id === system.id
                          ? 'bg-blue-900/30 border-blue-500'
                          : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                      }`}
                      onClick={() => loadSystemBodies(system)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{system.name}</h3>
                          <p className="text-sm text-gray-400">{system.system_code}</p>
                          {system.description && (
                            <p className="text-sm text-gray-300 mt-2">{system.description}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-sm">
                            {system.star_count} {system.star_count === 1 ? 'Star' : 'Stars'}
                          </div>
                          {system.danger_tier && (
                            <div className="text-xs text-yellow-400 mt-1">
                              Danger: {system.danger_tier}/5
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Show bodies if this system is selected */}
                      {selectedSystem?.id === system.id && systemBodies.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-600">
                          <h4 className="text-sm font-semibold text-gray-400 mb-2">Celestial Bodies:</h4>
                          <div className="space-y-2">
                            {systemBodies.map((body) => (
                              <button
                                key={body.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedBody(body);
                                }}
                                className={`w-full text-left p-3 rounded border transition-all ${
                                  selectedBody?.id === body.id
                                    ? 'bg-green-900/30 border-green-500'
                                    : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xl">{getBodyIcon(body)}</span>
                                    <div>
                                      <div className="font-semibold">{body.name}</div>
                                      <div className="text-xs text-gray-400">{body.body_type}</div>
                                    </div>
                                  </div>
                                  {body.is_habitable && (
                                    <span className="text-xs text-green-400">✓ Habitable</span>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Details Panel - Right Column */}
          <div className="lg:col-span-1">
            {selectedBody ? (
              <BodyDetailsPanel body={selectedBody} />
            ) : selectedSystem ? (
              <SystemDetailsPanel system={selectedSystem} />
            ) : (
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="text-center text-gray-400 py-12">
                  <p className="text-lg mb-2">📡 Select a System</p>
                  <p className="text-sm">Click on a system to view its details</p>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}

function SystemDetailsPanel({ system }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">{system.name}</h3>
      <div className="space-y-3 text-sm">
        <InfoRow label="System Code" value={system.system_code} />
        <InfoRow label="Stars" value={system.star_count} />
        <InfoRow label="Star Types" value={system.star_types || 'Unknown'} />
        <InfoRow label="Danger Tier" value={`${system.danger_tier || 0}/5`} />
        <InfoRow label="Habitable Zone" value={system.has_habitable_zone ? 'Yes' : 'No'} />
        {system.dominant_faction && (
          <InfoRow label="Faction" value={system.dominant_faction} />
        )}
      </div>
      {system.description && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-300">{system.description}</p>
        </div>
      )}
    </div>
  );
}

function BodyDetailsPanel({ body }) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const tabs = ['overview', 'civilization', 'biology', 'environment', 'resources', 'physical'];
  
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="bg-gray-900 p-4 border-b border-gray-700">
        <h3 className="text-xl font-bold">{body.name}</h3>
        <p className="text-sm text-gray-400">{body.body_type}</p>
      </div>
      
      <div className="flex overflow-x-auto bg-gray-900 border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-medium whitespace-nowrap ${
              activeTab === tab
                ? 'bg-gray-800 text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {activeTab === 'overview' && <OverviewTab body={body} />}
        {activeTab === 'civilization' && <CivilizationTab body={body} />}
        {activeTab === 'biology' && <BiologyTab body={body} />}
        {activeTab === 'environment' && <EnvironmentTab body={body} />}
        {activeTab === 'resources' && <ResourcesTab body={body} />}
        {activeTab === 'physical' && <PhysicalTab body={body} />}
      </div>
    </div>
  );
}

// Tab Components
function OverviewTab({ body }) {
  return (
    <div className="space-y-3 text-sm">
      <InfoRow label="Type" value={body.body_type} />
      <InfoRow label="Danger" value={`${body.overall_danger || 0}/10`} />
      {body.is_habitable !== undefined && (
        <div className={`p-2 rounded ${body.is_habitable ? 'bg-green-900/20' : 'bg-red-900/20'}`}>
          <span className={body.is_habitable ? 'text-green-400' : 'text-red-400'}>
            {body.is_habitable ? '✓ Habitable' : '✗ Not Habitable'}
          </span>
        </div>
      )}
      <InfoRow label="Population" value={body.population ? formatNumber(body.population) : 'None'} />
      <InfoRow label="Tech Level" value={body.tech_level || 'N/A'} />
    </div>
  );
}

function CivilizationTab({ body }) {
  return (
    <div className="space-y-3 text-sm">
      <InfoRow label="Population" value={body.population ? formatNumber(body.population) : 'Uninhabited'} />
      <InfoRow label="Tech Level" value={body.tech_level || 'N/A'} />
      <InfoRow label="Government" value={body.government_type || 'None'} />
      <InfoRow label="Faction" value={body.faction_control || 'Independent'} />
      <InfoRow label="Spaceport" value={body.has_spaceport ? 'Yes' : 'No'} />
      {body.spaceport_class && <InfoRow label="Spaceport Class" value={body.spaceport_class} />}
    </div>
  );
}

function BiologyTab({ body }) {
  return (
    <div className="space-y-3 text-sm">
      <InfoRow label="Life Present" value={body.has_life ? 'Yes' : 'No'} />
      <InfoRow label="Ecosystem" value={body.ecosystem_type || 'None'} />
      <InfoRow label="Flora Danger" value={`${body.flora_danger || 0}/10`} />
      <InfoRow label="Fauna Danger" value={`${body.fauna_danger || 0}/10`} />
    </div>
  );
}

function EnvironmentTab({ body }) {
  return (
    <div className="space-y-3 text-sm">
      <InfoRow label="Atmosphere" value={body.atmosphere_type || 'None'} />
      <InfoRow label="Temperature" value={body.temperature_avg ? `${body.temperature_avg}°C` : 'Unknown'} />
      <InfoRow label="Radiation" value={`${body.radiation_level || 0}/10`} />
      <InfoRow label="Weather" value={body.weather_severity || 'Stable'} />
    </div>
  );
}

function ResourcesTab({ body }) {
  return (
    <div className="space-y-3 text-sm">
      <InfoRow label="Minerals" value={`${body.mineral_richness || 0}/10`} />
      <InfoRow label="Fuel Deposits" value={body.fuel_deposits || 'None'} />
      <InfoRow label="Rare Elements" value={body.rare_elements || 'None'} />
      {body.trade_goods && <InfoRow label="Trade Goods" value={body.trade_goods} />}
    </div>
  );
}

function PhysicalTab({ body }) {
  return (
    <div className="space-y-3 text-sm">
      <InfoRow label="Size Class" value={body.size_class || 'Unknown'} />
      <InfoRow label="Diameter" value={body.diameter_km ? `${formatNumber(body.diameter_km)} km` : 'Unknown'} />
      <InfoRow label="Gravity" value={body.gravity ? `${body.gravity}g` : 'Unknown'} />
      <InfoRow label="Moons" value={body.moon_count || 0} />
      <InfoRow label="Rings" value={body.has_rings ? 'Yes' : 'No'} />
    </div>
  );
}

// Helper Components
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}:</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}

function getBodyIcon(body) {
  if (body.body_type === 'Station') return '🛰️';
  if (body.body_type === 'Planet' && body.is_habitable) return '🌍';
  if (body.body_type === 'Planet') return '🪐';
  if (body.body_type === 'Moon') return '🌙';
  if (body.body_type === 'Gas Giant') return '🌀';
  if (body.body_type === 'Asteroid Belt') return '☄️';
  return '⭐';
}

function formatNumber(num) {
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num.toString();
}

export default SpaceMap;
