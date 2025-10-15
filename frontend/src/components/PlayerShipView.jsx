import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../config/api';
import ShipSchematicView from './ship-views/ShipSchematicView';
import ShipCargoTab from './ShipCargoTab';
import { API_URL as BASE_API_URL, WS_URL } from '../config/api';
import io from 'socket.io-client';

const API_URL = `${BASE_API_URL}/player-ships`;

// Crew Role Descriptions
const CREW_ROLE_DESCRIPTIONS = {
  'Captain': 'You are responsible and answer for a ship. This may or may not be the same position as the pilot.',
  'Pilot': 'You are responsible for maneuvering the ship.',
  'Co-Pilot': 'You assist as an additional pilot or gunner.',
  'Gunner': 'You are responsible for firing a weapon.',
  'Astrogator': 'You are responsible for making astrogation calculations.',
  'Chaplain': 'The spiritual guide of the ship. Can act as a counselor or negotiator.',
  'Cook': 'You are responsible for feeding the crew. Having a cook means not living off of rations.',
  'Engineer': 'You are responsible for the maintenance and repair of the ship.',
  'Medic': 'You are responsible for the crew\'s health.',
  'Quartermaster': 'You are responsible for the cargo and ship accounts.',
  'Salvage Engineer': 'A polite term for experts who take apart damaged and scrapped ships.'
};

function PlayerShipView({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ships, setShips] = useState([]);
  const [selectedShip, setSelectedShip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'schematic'
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetchMyShips();

    // Setup socket.io
    const newSocket = io(WS_URL);
    setSocket(newSocket);

    // Listen for ship updates
    newSocket.on('ship_updated', (data) => {
      console.log('Ship updated:', data);
      if (id) {
        fetchShipDetails(id);
      }
      fetchMyShips();
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (id) {
      fetchShipDetails(id);

      // Join ship-specific room
      if (socket) {
        socket.emit('join_ship_room', id);
      }
    }

    return () => {
      if (socket && id) {
        socket.emit('leave_ship_room', id);
      }
    };
  }, [id, socket]);

  const fetchMyShips = async () => {
    try {
      const response = await api.get(`${API_URL}/my-ships`);
      setShips(response.data);
      
      // If no ship selected but we have ships, select the first one
      if (!id && response.data.length > 0) {
        navigate(`/ships/${response.data[0].id}`);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ships:', error);
      setLoading(false);
    }
  };

  const fetchShipDetails = async (shipId) => {
    try {
      const response = await api.get(`${API_URL}/my-ships/${shipId}`);
      setSelectedShip(response.data);
    } catch (error) {
      console.error('Error fetching ship details:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-white">Loading ships...</div>
      </div>
    );
  }

  if (ships.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Dashboard
          </Link>
        </div>
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">No Ships Available</h2>
          <p className="text-gray-400">
            You are not currently assigned to any ships. Contact your DM to join a crew!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/" className="text-blue-400 hover:text-blue-300">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-purple-900 bg-opacity-20 border border-purple-600 rounded-lg p-4 mb-6">
        <h1 className="text-3xl font-bold text-white">🚀 My Ships</h1>
        <p className="text-gray-300 mt-2">
          View your ship assignments and details
        </p>
      </div>

      {/* Ship List - Horizontal */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6">
        <h2 className="text-lg font-bold text-white mb-3">Available Ships ({ships.length})</h2>
        <div className="flex gap-3 overflow-x-auto scrollbar-thin pb-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 #1F2937' }}>
          {ships.map((ship) => (
            <Link
              key={ship.id}
              to={`/ships/${ship.id}`}
              className={`flex-shrink-0 p-3 rounded transition-colors min-w-[200px] ${
                selectedShip?.id === ship.id
                  ? 'bg-purple-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <div className="font-bold text-white">{ship.name}</div>
              <div className="text-xs text-gray-400 mt-1">
                {ship.owner_name}
              </div>
              {ship.crew_role && (
                <div className="text-xs text-blue-300 mt-1">
                  {ship.crew_role}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Ship Details - Full Width */}
      {!selectedShip ? (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <p className="text-gray-400">Select a ship to view details</p>
        </div>
      ) : (
        <ShipDetails
          ship={selectedShip}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          viewMode={viewMode}
          setViewMode={setViewMode}
          user={user}
          onRefresh={() => fetchShipDetails(selectedShip.id)}
        />
      )}
    </div>
  );
}

// Ship Details Component
function ShipDetails({ ship, activeTab, setActiveTab, viewMode, setViewMode, user, onRefresh }) {
  return (
    <div className="space-y-4">
      {/* Ship Header */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">{ship.name}</h2>
            <div className="text-sm text-gray-400 mt-1">
              {ship.owner_name}
              {ship.user_role && (
                <span className="ml-2 text-blue-400">• Your Role: {ship.user_role}</span>
              )}
            </div>
            {ship.user_role && CREW_ROLE_DESCRIPTIONS[ship.user_role] && (
              <div className="mt-2 text-xs text-gray-300 bg-gray-700 bg-opacity-50 rounded px-3 py-2 max-w-2xl">
                <span className="font-bold text-blue-400">{ship.user_role}:</span> {CREW_ROLE_DESCRIPTIONS[ship.user_role]}
              </div>
            )}
          </div>
          
          {/* View Mode Toggle & Star Map */}
          <div className="flex gap-2">
            <div className="flex gap-2 bg-gray-700 rounded p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded font-bold text-sm transition-colors ${
                  viewMode === 'list'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                📋 List View
              </button>
              <button
                onClick={() => setViewMode('schematic')}
                className={`px-4 py-2 rounded font-bold text-sm transition-colors ${
                  viewMode === 'schematic'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🔧 Schematic
              </button>
            </div>
            <Link
              to={`/ships/${ship.id}/star-map`}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded font-bold text-sm transition-colors"
            >
              🗺️ Star Map
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-gray-400">Class</div>
            <div className="font-bold text-white">{ship.ship_class}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">HP</div>
            <div className="font-bold text-red-400">{ship.hp_current}/{ship.hp_max}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">AC</div>
            <div className="font-bold text-blue-400">{ship.ac}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Level</div>
            <div className="font-bold text-white">{ship.level}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <div className="text-xs text-gray-400 mb-1">System Slots</div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${
                  ship.system_slots_used > ship.system_slots_max ? 'bg-red-500' :
                  ship.system_slots_used === ship.system_slots_max ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min((ship.system_slots_used / ship.system_slots_max) * 100, 100)}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {ship.system_slots_used} / {ship.system_slots_max} used
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Feature Slots</div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${
                  ship.feature_slots_used > ship.feature_slots_max ? 'bg-red-500' :
                  ship.feature_slots_used === ship.feature_slots_max ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min((ship.feature_slots_used / ship.feature_slots_max) * 100, 100)}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {ship.feature_slots_used} / {ship.feature_slots_max} used
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-300">
          <span className="text-gray-400">Maintenance:</span>{' '}
          <span className="text-yellow-400 font-bold">{ship.total_maintenance_cost || 0} cr</span>
        </div>
      </div>

      {/* Conditional Rendering Based on View Mode */}
      {viewMode === 'schematic' ? (
        <ShipSchematicView ship={ship} />
      ) : (
        /* Tabs - List View */
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div
            className="flex border-b border-gray-700 overflow-x-auto scrollbar-thin"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#4B5563 #1F2937'
            }}
          >
            <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} label="📊 Overview" />
            <TabButton active={activeTab === 'components'} onClick={() => setActiveTab('components')} label={`🔧 Components (${ship.components?.length || 0})`} />
            <TabButton active={activeTab === 'weapons'} onClick={() => setActiveTab('weapons')} label={`⚔️ Weapons (${ship.weapons_arrays?.length || 0})`} />
            <TabButton active={activeTab === 'armor'} onClick={() => setActiveTab('armor')} label="🛡️ Armor" />
            <TabButton active={activeTab === 'enhancements'} onClick={() => setActiveTab('enhancements')} label={`✨ Enhancements (${ship.enhancements?.length || 0})`} />
            <TabButton active={activeTab === 'crew'} onClick={() => setActiveTab('crew')} label={`👥 Crew (${ship.crew?.length || 0})`} />
            <TabButton active={activeTab === 'cargo'} onClick={() => setActiveTab('cargo')} label="📦 Cargo" />
          </div>

          <div className="p-6">
            {activeTab === 'overview' && <OverviewTab ship={ship} />}
            {activeTab === 'components' && <ComponentsTab ship={ship} />}
            {activeTab === 'weapons' && <WeaponsTab ship={ship} />}
            {activeTab === 'armor' && <ArmorTab ship={ship} />}
            {activeTab === 'enhancements' && <EnhancementsTab ship={ship} />}
            {activeTab === 'crew' && <CrewTab ship={ship} />}
            {activeTab === 'cargo' && (
              <ShipCargoTab 
                ship={ship} 
                isAdmin={false}
                onUpdate={onRefresh}
                showSuccess={(msg) => console.log(msg)}
                showError={(msg) => console.error(msg)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Tab Button Component
function TabButton({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-bold whitespace-nowrap ${
        active
          ? 'bg-gray-700 text-white border-b-2 border-purple-500'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

// Overview Tab
function OverviewTab({ ship }) {
  return (
    <div className="space-y-4">
      {/* Combat Status - At a Glance */}
      <div className="bg-gray-700 rounded p-4 border-2 border-purple-600">
        <h3 className="font-bold text-white text-lg mb-4">⚔️ Combat Status</h3>

        {/* HP and AC */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-800 rounded p-3 text-center">
            <div className="text-xs text-gray-400">Hit Points</div>
            <div className="text-2xl font-bold text-red-400">{ship.hp_current}/{ship.hp_max}</div>
          </div>
          <div className="bg-gray-800 rounded p-3 text-center">
            <div className="text-xs text-gray-400">Armor Class</div>
            <div className="text-2xl font-bold text-blue-400">{ship.ac}</div>
          </div>
          <div className="bg-gray-800 rounded p-3 text-center">
            <div className="text-xs text-gray-400">Movement</div>
            <div className="text-lg font-bold text-white capitalize">{ship.movement || 'near'}</div>
          </div>
        </div>

        {/* Weapons Arrays */}
        {ship.weapons_arrays && ship.weapons_arrays.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-bold text-orange-400 mb-2">Weapons Systems</h4>
            <div className="space-y-1">
              {ship.weapons_arrays.map((array) => (
                <div key={array.id} className="flex items-center justify-between bg-gray-800 rounded px-3 py-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-white">{array.array_name}</span>
                    {array.is_firelinked && (
                      <span className="bg-orange-600 px-1.5 py-0.5 rounded text-[10px]">FIRE-LINKED</span>
                    )}
                    {array.maintenance_enabled ? (
                      <span className="bg-green-600 px-1.5 py-0.5 rounded text-[10px]">ONLINE</span>
                    ) : (
                      <span className="bg-red-600 px-1.5 py-0.5 rounded text-[10px]">OFFLINE</span>
                    )}
                  </div>
                  <span className="text-gray-400">{array.weapons?.length || 0} weapons</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Armor */}
        {ship.armor && (
          <div className="mb-3">
            <h4 className="text-sm font-bold text-blue-400 mb-2">Armor</h4>
            <div className="bg-gray-800 rounded px-3 py-2 text-xs">
              <span className="text-white">{ship.armor.name}</span>
              <span className="text-gray-400 ml-2">• AC: {ship.armor.ac_bonus || ship.ac}</span>
            </div>
          </div>
        )}

        {/* Components */}
        {ship.components && ship.components.length > 0 && (
          <div className="mb-3">
            <h4 className="text-sm font-bold text-purple-400 mb-2">Systems ({ship.components.length})</h4>
            <div className="grid grid-cols-2 gap-1">
              {ship.components.map((component) => (
                <div key={component.id} className="flex items-center justify-between bg-gray-800 rounded px-2 py-1 text-[10px]">
                  <span className="text-white truncate">{component.name}</span>
                  {component.maintenance_enabled ? (
                    <span className="bg-green-600 px-1 py-0.5 rounded text-[9px]">ON</span>
                  ) : (
                    <span className="bg-red-600 px-1 py-0.5 rounded text-[9px]">OFF</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhancements */}
        {ship.enhancements && ship.enhancements.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-indigo-400 mb-2">Enhancements ({ship.enhancements.length})</h4>
            <div className="grid grid-cols-2 gap-1">
              {ship.enhancements.map((enhancement) => (
                <div key={enhancement.id} className="flex items-center justify-between bg-gray-800 rounded px-2 py-1 text-[10px]">
                  <span className="text-white truncate">{enhancement.name}</span>
                  {enhancement.is_active ? (
                    <span className="bg-green-600 px-1 py-0.5 rounded text-[9px]">ON</span>
                  ) : (
                    <span className="bg-gray-600 px-1 py-0.5 rounded text-[9px]">OFF</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats and Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 rounded p-4">
          <h3 className="font-bold text-white mb-2">Stats</h3>
          <div className="space-y-1 text-sm">
            <StatRow label="STR" value={ship.strength || 10} />
            <StatRow label="DEX" value={ship.dexterity || 10} />
            <StatRow label="CON" value={ship.constitution || 10} />
            <StatRow label="INT" value={ship.intelligence || 10} />
            <StatRow label="WIS" value={ship.wisdom || 10} />
            <StatRow label="CHA" value={ship.charisma || 10} />
          </div>
        </div>

        <div className="bg-gray-700 rounded p-4">
          <h3 className="font-bold text-white mb-2">Details</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Owner</span>
              <span className="text-white">{ship.owner_name || 'Unknown'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Level</span>
              <span className="text-white">{ship.level || 1}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Purchase Price</span>
              <span className="text-yellow-400">{ship.purchase_price || 0} cr</span>
            </div>
          </div>
        </div>
      </div>

      {ship.description && (
        <div className="bg-gray-700 rounded p-4">
          <h3 className="font-bold text-white mb-2">Description</h3>
          <p className="text-gray-300 text-sm">{ship.description}</p>
        </div>
      )}
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}

// Components Tab
function ComponentsTab({ ship }) {
  if (!ship.components || ship.components.length === 0) {
    return <div className="text-gray-400 text-center py-8">No components installed</div>;
  }

  return (
    <div className="space-y-2">
      {ship.components.map((component) => {
        // Safely handle description which might be null/undefined
        const description = component.description || 'No description available';
        
        return (
          <div key={component.id} className="bg-gray-700 rounded p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-white">{component.name}</span>
              {component.is_advanced && (
                <span className="text-xs bg-purple-600 px-2 py-0.5 rounded">ADVANCED</span>
              )}
              <span className="text-xs bg-blue-600 px-2 py-0.5 rounded">
                {String(component.component_type || '').toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-400">{description}</p>
            <div className="text-xs text-gray-500 mt-2">
              Maintenance: {component.maintenance_cost || 0}cr
              {!component.maintenance_enabled && (
                <span className="text-red-400 ml-2">• OFFLINE</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Weapons Tab
function WeaponsTab({ ship }) {
  if (!ship.weapons_arrays || ship.weapons_arrays.length === 0) {
    return <div className="text-gray-400 text-center py-8">No weapons installed</div>;
  }

  return (
    <div className="space-y-4">
      {ship.weapons_arrays.map((array) => (
        <div key={array.id} className="bg-gray-700 rounded p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-white">{array.array_name}</span>
            {array.is_firelinked && (
              <span className="text-xs bg-orange-600 px-2 py-0.5 rounded">FIRE-LINKED</span>
            )}
            {!array.maintenance_enabled && (
              <span className="text-xs bg-red-600 px-2 py-0.5 rounded">OFFLINE</span>
            )}
          </div>

          {array.weapons && array.weapons.length > 0 ? (
            <div className="space-y-2">
              {array.weapons.map((weapon) => {
                // Parse properties to show clean list of property names
                let propertiesDisplay = '';
                if (weapon.properties) {
                  try {
                    let propsObj = weapon.properties;
                    if (typeof weapon.properties === 'string') {
                      propsObj = JSON.parse(weapon.properties);
                    }
                    // Extract property keys/names
                    const propKeys = Object.keys(propsObj);
                    propertiesDisplay = propKeys.join(', ');
                  } catch (e) {
                    // If parsing fails, show as-is
                    propertiesDisplay = typeof weapon.properties === 'string'
                      ? weapon.properties
                      : JSON.stringify(weapon.properties);
                  }
                }

                return (
                  <div key={weapon.id} className="bg-gray-800 rounded p-3">
                    <div className="font-bold text-white text-sm">{weapon.name}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Damage: {weapon.damage || 'N/A'} • Range: {weapon.range === 'N' ? 'Near' : weapon.range === 'F' ? 'Far' : weapon.range}
                    </div>
                    {propertiesDisplay && (
                      <div className="text-xs text-blue-300 mt-1">
                        {propertiesDisplay}
                      </div>
                    )}
                    {weapon.requires_ammo && (
                      <div className={`text-xs mt-1 ${weapon.ammo_loaded ? 'text-green-400' : 'text-yellow-400'}`}>
                        {weapon.ammo_loaded ? '✓ Ammo Loaded' : '⚠ No Ammo'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-gray-400 text-sm text-center py-2">No weapons in array</div>
          )}
        </div>
      ))}
    </div>
  );
}

// Armor Tab
function ArmorTab({ ship }) {
  if (!ship.armor) {
    return <div className="text-gray-400 text-center py-8">No armor installed</div>;
  }

  // Parse properties to human-readable format
  const parseProperties = (props) => {
    if (!props) return null;
    
    try {
      let propsObj = props;
      if (typeof props === 'string') {
        propsObj = JSON.parse(props);
      }
      
      // Convert object to readable string
      const propsList = [];
      for (const [key, value] of Object.entries(propsObj)) {
        if (value === true) {
          propsList.push(key);
        } else if (value !== false && value !== null) {
          propsList.push(`${key}: ${value}`);
        }
      }
      return propsList.length > 0 ? propsList.join(', ') : null;
    } catch (e) {
      return typeof props === 'string' ? props : null;
    }
  };

  const propertiesDisplay = parseProperties(ship.armor.properties);

  return (
    <div className="bg-gray-700 rounded p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-bold text-white text-lg">{ship.armor.name}</span>
        <span className="text-xs bg-blue-600 px-2 py-0.5 rounded">
          {ship.armor.category}
        </span>
      </div>
      {ship.armor.description && (
        <p className="text-sm text-gray-300 mt-2">{ship.armor.description}</p>
      )}
      
      <div className="mt-4 space-y-2">
        {ship.armor.ac_formula && (
          <div className="text-sm">
            <span className="text-gray-400">AC Formula:</span>{' '}
            <span className="text-blue-300 font-mono">{ship.armor.ac_formula}</span>
          </div>
        )}
        {ship.armor.ac_bonus > 0 && (
          <div className="text-sm">
            <span className="text-gray-400">AC Bonus:</span>{' '}
            <span className="text-green-400">+{ship.armor.ac_bonus}</span>
          </div>
        )}
        {propertiesDisplay && (
          <div className="text-sm">
            <span className="text-gray-400">Properties:</span>{' '}
            <span className="text-blue-300">{propertiesDisplay}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Enhancements Tab
function EnhancementsTab({ ship }) {
  if (!ship.enhancements || ship.enhancements.length === 0) {
    return <div className="text-gray-400 text-center py-8">No enhancements installed</div>;
  }

  return (
    <div className="space-y-2">
      {ship.enhancements.map((enhancement) => (
        <div key={enhancement.id} className="bg-gray-700 rounded p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-white">{enhancement.name}</span>
            <span className="text-xs bg-blue-600 px-2 py-0.5 rounded">
              {enhancement.enhancement_type.toUpperCase()}
            </span>
            {!enhancement.is_active && (
              <span className="text-xs bg-red-600 px-2 py-0.5 rounded">INACTIVE</span>
            )}
            {enhancement.is_active && (
              <span className="text-xs bg-green-600 px-2 py-0.5 rounded">ACTIVE</span>
            )}
          </div>
          {enhancement.description && (
            <p className="text-sm text-gray-400 mb-2">{enhancement.description}</p>
          )}
          {enhancement.benefit && (
            <div className="text-sm text-green-400">
              <span className="font-bold">Benefit:</span> {enhancement.benefit}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Crew Tab
function CrewTab({ ship }) {
  if (!ship.crew || ship.crew.length === 0) {
    return <div className="text-gray-400 text-center py-8">No crew assigned</div>;
  }

  return (
    <div className="space-y-3">
      {ship.crew.map((member) => (
        <div key={member.id} className="bg-gray-700 rounded p-4">
          <div className="font-bold text-white">{member.character_name || 'Unknown'}</div>
          <div className="text-sm text-gray-400 mt-1">
            {member.crew_role || 'Crew'} • {member.archetype || 'Unknown'}
            {member.is_primary_role && (
              <span className="ml-2 text-xs bg-green-600 px-2 py-0.5 rounded">PRIMARY</span>
            )}
          </div>
          {member.crew_role && CREW_ROLE_DESCRIPTIONS[member.crew_role] && (
            <div className="mt-2 text-xs text-gray-300 bg-gray-800 rounded px-3 py-2">
              <span className="font-bold text-blue-400">{member.crew_role}:</span> {CREW_ROLE_DESCRIPTIONS[member.crew_role]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PlayerShipView;
