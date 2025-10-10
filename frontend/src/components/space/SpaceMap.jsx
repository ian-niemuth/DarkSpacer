import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpaceMapGrid from './SpaceMapGrid';
import LocationDetails from './LocationDetails';

function SpaceMap({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Navigation state - track where we are in the hierarchy
  const [currentLevel, setCurrentLevel] = useState('sector'); // 'galaxy' | 'region' | 'sector' | 'system'
  const [breadcrumb, setBreadcrumb] = useState({
    campaign: null,
    galaxy: null,
    region: null,
    sector: null,
    system: null
  });
  
  // Data state
  const [campaign, setCampaign] = useState(null);
  const [locations, setLocations] = useState([]); // Current level's locations
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [shipData, setShipData] = useState(null);
  
  // Check if user has a ship with Memory Bank
  useEffect(() => {
    checkShipAccess();
  }, []);
  
  const checkShipAccess = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/ships/player', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch ships');
      
      const ships = await response.json();
      
      if (ships.length === 0) {
        setError('You need a ship to access the space map!');
        setLoading(false);
        return;
      }
      
      // Get first ship's details to check for Memory Bank
      const shipResponse = await fetch(`http://localhost:3001/api/ships/${ships[0].id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!shipResponse.ok) throw new Error('Failed to fetch ship details');
      
      const shipDetails = await shipResponse.json();
      
      // Check for Memory Bank component
      const hasMemoryBank = shipDetails.components?.some(
        c => c.component_name === 'Memory Bank' && c.is_installed
      );
      
      setShipData({
        ...shipDetails,
        hasMemoryBank
      });
      
      // Load campaign and starter sector
      await loadCampaignData();
      
    } catch (err) {
      console.error('Error checking ship access:', err);
      setError('Failed to load space map data');
    } finally {
      setLoading(false);
    }
  };
  
  const loadCampaignData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Get campaigns
      const response = await fetch('http://localhost:3001/api/space/campaigns', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch campaigns');
      
      const campaigns = await response.json();
      
      if (campaigns.length === 0) {
        setError('No campaign found. DM needs to initialize space.');
        return;
      }
      
      const activeCampaign = campaigns[0];
      
      // Check if campaign has starting location
      if (!activeCampaign.starting_sector_id) {
        console.log('Campaign not initialized, initializing starter sector...');
        
        // Initialize starter sector
        const initResponse = await fetch('http://localhost:3001/api/space/init-starter-sector', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ campaignId: activeCampaign.id })
        });
        
        if (!initResponse.ok) throw new Error('Failed to initialize starter sector');
        
        const initResult = await initResponse.json();
        console.log('Starter sector initialized:', initResult);
        
        // Reload campaign to get updated data
        const updatedResponse = await fetch('http://localhost:3001/api/space/campaigns', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const updatedCampaigns = await updatedResponse.json();
        const updatedCampaign = updatedCampaigns[0];
        
        setCampaign(updatedCampaign);
        
        // Set initial breadcrumb to starter sector
        setBreadcrumb({
          campaign: updatedCampaign,
          galaxy: { id: updatedCampaign.starting_galaxy_id },
          region: { id: updatedCampaign.starting_region_id },
          sector: { id: updatedCampaign.starting_sector_id },
          system: null
        });
        
        // Load starter sector's systems
        await loadSectorSystems(updatedCampaign.starting_sector_id);
        
      } else {
        // Campaign already initialized
        setCampaign(activeCampaign);
        
        // Set initial breadcrumb to starter sector
        setBreadcrumb({
          campaign: activeCampaign,
          galaxy: { id: activeCampaign.starting_galaxy_id },
          region: { id: activeCampaign.starting_region_id },
          sector: { id: activeCampaign.starting_sector_id },
          system: null
        });
        
        // Load starter sector's systems
        await loadSectorSystems(activeCampaign.starting_sector_id);
      }
      
    } catch (err) {
      console.error('Error loading campaign:', err);
      setError('Failed to load campaign data');
    }
  };
  
  const loadSectorSystems = async (sectorId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/space/systems/${sectorId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch systems');
      
      const systems = await response.json();
      setLocations(systems);
      setCurrentLevel('sector'); // Viewing systems within a sector
      
    } catch (err) {
      console.error('Error loading systems:', err);
      setError('Failed to load systems');
    }
  };
  
  const loadSystemBodies = async (systemId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/space/celestial-bodies/${systemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch celestial bodies');
      
      const bodies = await response.json();
      setLocations(bodies);
      setCurrentLevel('system'); // Viewing planets within a system
      
    } catch (err) {
      console.error('Error loading celestial bodies:', err);
      setError('Failed to load celestial bodies');
    }
  };
  
  const handleLocationClick = async (location) => {
    setSelectedLocation(location);
    
    // If clicking a system from sector view, drill down to show planets
    if (currentLevel === 'sector') {
      await loadSystemBodies(location.id);
      setBreadcrumb(prev => ({
        ...prev,
        system: location
      }));
    }
  };
  
  const handleBreadcrumbClick = async (level) => {
    // Navigate back up the hierarchy
    if (level === 'sector' && breadcrumb.sector) {
      await loadSectorSystems(breadcrumb.sector.id);
      setBreadcrumb(prev => ({
        ...prev,
        system: null
      }));
      setSelectedLocation(null);
    }
    // Add more levels as needed (region, galaxy)
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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">🌌 Space Map</h1>
            <p className="text-gray-400">
              Ship: {shipData?.name} 
              {shipData?.hasMemoryBank ? (
                <span className="ml-2 text-green-400">✓ Memory Bank Active</span>
              ) : (
                <span className="ml-2 text-yellow-400">⚠️ No Memory Bank (discoveries won't be saved)</span>
              )}
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            ← Back to Dashboard
          </button>
        </div>
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm bg-gray-800 p-3 rounded-lg">
          <button
            onClick={() => handleBreadcrumbClick('campaign')}
            className="text-blue-400 hover:text-blue-300 hover:underline"
          >
            {campaign?.name || 'Campaign'}
          </button>
          
          {breadcrumb.sector && (
            <>
              <span className="text-gray-600">→</span>
              <button
                onClick={() => handleBreadcrumbClick('sector')}
                className={`${
                  currentLevel === 'sector' 
                    ? 'text-white font-semibold' 
                    : 'text-blue-400 hover:text-blue-300 hover:underline'
                }`}
              >
                Sector (Systems View)
              </button>
            </>
          )}
          
          {breadcrumb.system && (
            <>
              <span className="text-gray-600">→</span>
              <span className="text-white font-semibold">
                {breadcrumb.system.system_code} (Planets View)
              </span>
              <button
                onClick={() => handleBreadcrumbClick('sector')}
                className="ml-4 text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-blue-400"
              >
                ← Back to Systems
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Grid - 2/3 width */}
        <div className="lg:col-span-2">
          <SpaceMapGrid
            locations={locations}
            currentLevel={currentLevel}
            onLocationClick={handleLocationClick}
            selectedLocation={selectedLocation}
            shipData={shipData}
          />
        </div>
        
        {/* Details Panel - 1/3 width */}
        <div className="lg:col-span-1">
          <LocationDetails
            location={selectedLocation}
            currentLevel={currentLevel}
            shipData={shipData}
          />
        </div>
      </div>
    </div>
  );
}

export default SpaceMap;
