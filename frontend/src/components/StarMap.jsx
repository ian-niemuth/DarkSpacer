import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import { API_URL, WS_URL } from '../config/api';
import { api } from '../config/api';
import GalaxyCanvas from './star-map/GalaxyCanvas';

/**
 * StarMap - Player ship star map view
 * Requires Memory Bank component installed and online
 * Pattern similar to Communicator.jsx
 */
function StarMap() {
  const { shipId } = useParams();
  const navigate = useNavigate();

  const [galaxyData, setGalaxyData] = useState(null);
  const [shipLocation, setShipLocation] = useState(null);
  const [nearbyShips, setNearbyShips] = useState([]);
  const [memoryBankStatus, setMemoryBankStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  // Check Memory Bank status
  const checkMemoryBank = async () => {
    try {
      const response = await api.get(`${API_URL}/star-map/power-status/${shipId}`);
      console.log('[StarMap] Memory Bank status:', response.data);
      setMemoryBankStatus(response.data);
      return response.data;
    } catch (error) {
      console.error('Error checking Memory Bank:', error);
      setMemoryBankStatus({ online: false, reason: 'ERROR' });
      return { online: false, reason: 'ERROR' };
    }
  };

  // Fetch galaxy data
  const fetchGalaxyData = async () => {
    try {
      const response = await api.get(`${API_URL}/star-map/ship-view/${shipId}`);
      console.log('[StarMap] Galaxy data loaded:', response.data);
      setGalaxyData(response.data);
      setShipLocation(response.data.shipLocation);
      setNearbyShips(response.data.nearbyShips || []);

      if (response.data.nearbyShips?.length > 0) {
        console.log(`[StarMap] Detected ${response.data.nearbyShips.length} nearby ships:`, response.data.nearbyShips);
      }
    } catch (error) {
      console.error('Error fetching galaxy data:', error);
    }
  };

  useEffect(() => {
    if (!shipId) return;

    console.log('[StarMap] Initializing for ship:', shipId);

    // Check initial Memory Bank status
    checkMemoryBank().then((status) => {
      if (status.online) {
        // Load galaxy data only if Memory Bank is online
        fetchGalaxyData();
      }
      setLoading(false);
    });

    // Setup socket for real-time updates
    const newSocket = io(WS_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('[StarMap] Socket connected:', newSocket.id);
      newSocket.emit('join_ship_room', shipId);
      console.log('[StarMap] Joined ship room:', shipId);
    });

    // Listen for component maintenance changes
    newSocket.on('ship_updated', () => {
      console.log('[StarMap] Ship updated, rechecking Memory Bank status');
      checkMemoryBank().then((status) => {
        if (status.online) {
          fetchGalaxyData();
        }
      });
    });

    // Listen for ship location changes
    newSocket.on('ship_location_changed', (location) => {
      console.log('[StarMap] Ship location changed:', location);
      setShipLocation(location);
      // Refetch galaxy data to trigger auto-discovery and refresh sensor view
      fetchGalaxyData();
    });

    // Listen for nearby ship updates (components, weapons, etc.)
    newSocket.on('nearby_ship_updated', (data) => {
      console.log('[StarMap] Nearby ship updated:', data.shipId);
      // Only refetch if the updated ship is NOT the current ship we're viewing
      // (The current ship's updates are handled by 'ship_updated' event)
      if (data.shipId && data.shipId.toString() !== shipId?.toString()) {
        console.log('[StarMap] Refetching galaxy data for nearby ship update');
        fetchGalaxyData();
      }
    });

    newSocket.on('disconnect', () => {
      console.log('[StarMap] Socket disconnected');
    });

    newSocket.on('connect_error', (error) => {
      console.error('[StarMap] Socket connection error:', error);
    });

    return () => {
      if (newSocket) {
        console.log('[StarMap] Cleaning up socket connection');
        newSocket.emit('leave_ship_room', shipId);
        newSocket.disconnect();
      }
    };
  }, [shipId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-white">Loading star map...</div>
      </div>
    );
  }

  // Show offline screen if Memory Bank is not online
  if (memoryBankStatus && !memoryBankStatus.online) {
    const getOfflineMessage = () => {
      switch (memoryBankStatus.reason) {
        case 'NO_MEMORY_BANK':
          return {
            title: 'NO MEMORY BANK DETECTED',
            subtitle: 'NAVIGATION SYSTEM OFFLINE',
            details: 'This ship requires a Memory Bank component to access star charts and navigation data.'
          };
        case 'MEMORY_BANK_OFFLINE':
          return {
            title: 'MEMORY BANK OFFLINE',
            subtitle: 'COMPONENT DISABLED',
            details: 'The Memory Bank component is installed but currently offline. Enable it from the ship components tab.'
          };
        case 'ERROR':
          return {
            title: 'SYSTEM ERROR',
            subtitle: 'UNABLE TO VERIFY MEMORY BANK STATUS',
            details: 'Contact your DM if this issue persists.'
          };
        default:
          return {
            title: 'NAVIGATION OFFLINE',
            subtitle: 'ACCESS DENIED',
            details: 'Unknown error occurred.'
          };
      }
    };

    const offlineMsg = getOfflineMessage();

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Offline Terminal Screen */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-8 border-2 border-red-600">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* Animated warning icon */}
            <div className="text-8xl mb-8 animate-pulse">
              ⚠️
            </div>

            {/* Main error message */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-red-500 font-mono mb-3">
                [NAVIGATION OFFLINE]
              </h1>
              <h2 className="text-2xl font-bold text-red-400 font-mono mb-2">
                {offlineMsg.title}
              </h2>
              <p className="text-xl text-red-300 font-mono mb-4">
                {offlineMsg.subtitle}
              </p>
              <p className="text-gray-400 font-mono max-w-md mx-auto">
                {offlineMsg.details}
              </p>
            </div>

            {/* Terminal-style divider */}
            <div className="w-full max-w-2xl my-8 border-t-2 border-red-800"></div>

            {/* Status display */}
            <div className="bg-black bg-opacity-50 border-2 border-red-700 rounded p-6 mb-8 w-full max-w-md">
              <div className="font-mono text-left space-y-2">
                <div className="text-gray-500">
                  &gt;&gt; SYSTEM DIAGNOSTICS
                </div>
                <div className="text-red-500">
                  MEMORY BANK: <span className="text-red-400 animate-pulse">OFFLINE</span>
                </div>
                <div className="text-gray-600">
                  SHIP ID: {shipId}
                </div>
                <div className="text-gray-600">
                  STATUS: <span className="text-red-400">NO CONNECTION</span>
                </div>
              </div>
            </div>

            {/* Back button */}
            <Link
              to={`/ships/${shipId}`}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-red-400 rounded border-2 border-red-600 font-mono font-bold text-base sm:text-lg transition min-h-[44px]"
            >
              ← RETURN TO SHIP
            </Link>

            {/* Helpful hint */}
            <div className="mt-8 text-sm text-gray-600 font-mono max-w-md">
              <p>💡 TIP: Install a Memory Bank component in your ship to access the star map.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Star Map is online and loaded
  return (
    <div className="w-screen h-screen relative bg-black overflow-hidden">
      {/* Back button - Absolute positioned */}
      <Link
        to={`/ships/${shipId}`}
        className="absolute top-4 right-4 z-20 px-3 py-2 bg-gray-900 bg-opacity-90 hover:bg-gray-800 text-cyan-400 rounded border-2 border-cyan-600 font-mono min-h-[44px] flex items-center shadow-lg shadow-cyan-500/30"
      >
        ← BACK TO SHIP
      </Link>

      {/* Nearby Ships Indicator - Bottom Right (above zoom info) */}
      {nearbyShips.length > 0 && (
        <div className="absolute bottom-16 right-4 z-20 px-3 py-2 bg-red-900 bg-opacity-90 border-2 border-red-600 rounded font-mono shadow-lg shadow-red-500/30 max-w-xs">
          <div className="text-red-300 text-sm font-bold">⚠️ CONTACTS DETECTED</div>
          <div className="text-red-200 text-xs mt-1">
            {nearbyShips.length} ship{nearbyShips.length > 1 ? 's' : ''} in sensor range
          </div>
          <div className="text-red-400 text-xs mt-2 space-y-0.5 max-h-32 overflow-y-auto">
            {nearbyShips.map((ship, idx) => (
              <div key={idx} className="truncate">
                • {ship.ship_name} ({ship.distance} ly)
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Galaxy Map - Fullscreen */}
      {galaxyData ? (
        <GalaxyCanvas
          galaxyData={galaxyData}
          shipLocation={shipLocation}
          showAllShips={nearbyShips.length > 0}
          allShips={nearbyShips}
        />
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-cyan-300 font-mono">Loading star charts...</div>
        </div>
      )}
    </div>
  );
}

export default StarMap;
