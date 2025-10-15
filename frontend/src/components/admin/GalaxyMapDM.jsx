import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import { API_URL, WS_URL } from '../../config/api';
import { api } from '../../config/api';
import GalaxyCanvas from '../star-map/GalaxyCanvas';

/**
 * GalaxyMapDM - DM Galaxy Map View
 * Shows full galaxy with all ship locations
 * No Memory Bank requirement
 */
function GalaxyMapDM() {
  const [galaxyData, setGalaxyData] = useState(null);
  const [allShips, setAllShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [selectedShipId, setSelectedShipId] = useState(null);
  const [positioningMode, setPositioningMode] = useState(false);

  // Fetch full galaxy data (DM view - no restrictions)
  const fetchGalaxyData = async () => {
    try {
      const response = await api.get(`${API_URL}/star-map/galaxy-data`);
      console.log('[GalaxyMapDM] Galaxy data loaded');
      setGalaxyData(response.data);
    } catch (error) {
      console.error('Error fetching galaxy data:', error);
    }
  };

  // Fetch all ship locations
  const fetchAllShips = async () => {
    try {
      const response = await api.get(`${API_URL}/star-map/all-ships`);
      console.log('[GalaxyMapDM] Ship locations loaded:', response.data.length, 'ships');
      setAllShips(response.data);
    } catch (error) {
      console.error('Error fetching ship locations:', error);
    }
  };

  // Update ship location via map click
  const updateShipLocation = async (shipId, x, y, z) => {
    try {
      await api.put(`${API_URL}/star-map/ship-location/${shipId}`, {
        x, y, z,
        currentRegionId: null,
        currentSectorId: null,
        currentSystemId: null
      });
      console.log('[GalaxyMapDM] Ship location updated');
      fetchAllShips(); // Refresh ship list
    } catch (error) {
      console.error('Error updating ship location:', error);
    }
  };

  // Handle map click in positioning mode
  const handleMapClick = (worldX, worldY) => {
    if (positioningMode && selectedShipId) {
      // Update ship location to clicked coordinates
      updateShipLocation(selectedShipId, worldX, worldY, 0);
    }
  };

  useEffect(() => {
    console.log('[GalaxyMapDM] Initializing DM galaxy map');

    // Load initial data
    Promise.all([fetchGalaxyData(), fetchAllShips()]).then(() => {
      setLoading(false);
    });

    // Setup socket for real-time updates
    const newSocket = io(WS_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('[GalaxyMapDM] Socket connected:', newSocket.id);
    });

    // Listen for ship location changes
    newSocket.on('ship_location_changed', (location) => {
      console.log('[GalaxyMapDM] Ship location changed:', location);
      fetchAllShips(); // Refresh all ship locations
    });

    newSocket.on('ship_updated', () => {
      console.log('[GalaxyMapDM] Ship updated');
      fetchAllShips();
    });

    newSocket.on('disconnect', () => {
      console.log('[GalaxyMapDM] Socket disconnected');
    });

    return () => {
      if (newSocket) {
        console.log('[GalaxyMapDM] Cleaning up socket connection');
        newSocket.disconnect();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-white">Loading galaxy map...</div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen relative bg-black overflow-hidden">
      {/* DM Controls - Top Right */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
        <Link
          to="/admin"
          className="px-3 py-2 bg-gray-900 bg-opacity-90 hover:bg-gray-800 text-purple-400 rounded border-2 border-purple-600 font-mono min-h-[44px] flex items-center shadow-lg shadow-purple-500/30"
        >
          ← BACK TO ADMIN
        </Link>

        {/* Ship selector */}
        <div className="bg-gray-900 bg-opacity-90 border-2 border-purple-600 rounded px-3 py-2 shadow-lg shadow-purple-500/30 flex items-center gap-2">
          <div className="text-purple-300 font-mono text-sm whitespace-nowrap">
            TRACK:
          </div>
          <select
            value={selectedShipId || ''}
            onChange={(e) => setSelectedShipId(e.target.value ? parseInt(e.target.value) : null)}
            className="bg-gray-800 text-purple-300 border border-purple-600 rounded px-2 py-1 font-mono text-sm focus:outline-none focus:border-purple-400"
          >
            <option value="">All Ships</option>
            {allShips.map(ship => (
              <option key={ship.ship_id} value={ship.ship_id}>
                {ship.ship_name}
              </option>
            ))}
          </select>
        </div>

        {/* Positioning mode toggle */}
        <button
          onClick={() => setPositioningMode(!positioningMode)}
          disabled={!selectedShipId}
          className={`px-4 py-2 rounded font-mono text-sm font-bold transition-colors border-2 min-h-[44px] shadow-lg ${
            positioningMode
              ? 'bg-green-600 hover:bg-green-700 text-white border-green-400 shadow-green-500/30'
              : 'bg-gray-900 bg-opacity-90 hover:bg-gray-800 text-purple-300 border-purple-600 shadow-purple-500/30'
          } ${!selectedShipId ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {positioningMode ? '🎯 POSITIONING' : '📍 POSITION'}
        </button>
      </div>

      {/* Galaxy Map - Fullscreen */}
      <div className="w-full h-full relative">
        {galaxyData ? (
          <GalaxyCanvas
            galaxyData={galaxyData}
            shipLocation={null} // Don't highlight a single ship
            showAllShips={true}
            allShips={allShips}
            dmPositioningMode={positioningMode}
            onMapClick={handleMapClick}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-purple-300 font-mono">Loading star charts...</div>
          </div>
        )}
      </div>

      {/* Ship List Sidebar - Bottom right corner */}
      <div className="absolute bottom-4 right-4 w-80 max-h-[40vh] overflow-y-auto bg-gray-900 bg-opacity-90 border border-purple-500 rounded shadow-lg shadow-purple-500/30 z-10">
        <div className="sticky top-0 bg-gray-800 border-b border-purple-600 p-3">
          <div className="text-purple-300 font-mono text-sm font-bold">SHIP POSITIONS</div>
        </div>

        <div className="divide-y divide-purple-800">
          {allShips.length === 0 ? (
            <div className="p-4 text-center text-purple-400 font-mono text-sm">
              No ships in database
            </div>
          ) : (
            allShips.map(ship => (
              <div
                key={ship.ship_id}
                className={`p-3 hover:bg-purple-900 hover:bg-opacity-30 transition cursor-pointer ${
                  selectedShipId === ship.ship_id ? 'bg-purple-900 bg-opacity-40 border-l-4 border-purple-400' : ''
                }`}
                onClick={() => setSelectedShipId(ship.ship_id === selectedShipId ? null : ship.ship_id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-bold text-purple-300 font-mono text-sm">
                      {ship.ship_name}
                    </div>
                    <div className="text-purple-400 font-mono text-xs mt-1">
                      {ship.ship_class} | Owner: {ship.owner_name}
                    </div>
                    <div className="text-green-400 font-mono text-xs mt-1">
                      X: {parseFloat(ship.x).toFixed(2)} |
                      Y: {parseFloat(ship.y).toFixed(2)} |
                      Z: {parseFloat(ship.z).toFixed(2)}
                    </div>
                    {ship.current_system_id && (
                      <div className="text-cyan-400 font-mono text-xs mt-1">
                        System: {ship.current_system_id}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default GalaxyMapDM;
