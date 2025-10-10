import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ComponentsTab, WeaponsTab } from './ShipTabs';
import { ArmorTab, CrewTab, CreateShipModal, UpgradesTab } from './ShipModals';
import ShipCargoTab from './ShipCargoTab';
import { API_URL as BASE_API_URL } from '../config/api';

const API_URL = `${BASE_API_URL}/ships`;

function AdminShipsPanel() {
  const [ships, setShips] = useState([]);
  const [selectedShip, setSelectedShip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionResult, setActionResult] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, components, weapons, armor, crew

  // Templates
  const [componentTemplates, setComponentTemplates] = useState([]);
  const [weaponTemplates, setWeaponTemplates] = useState([]);
  const [armorTemplates, setArmorTemplates] = useState([]);
  const [enhancementTemplates, setEnhancementTemplates] = useState([]);

  useEffect(() => {
    fetchShips();
    fetchTemplates();
  }, []);

  const fetchShips = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(API_URL, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setShips(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ships:', error);
      setLoading(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem('token');
      const [components, weapons, armor, enhancements] = await Promise.all([
        axios.get(`${API_URL}/templates/components`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/templates/weapons`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/templates/armor`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/templates/enhancements`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);
      
      setComponentTemplates(components.data);
      setWeaponTemplates(weapons.data);
      setArmorTemplates(armor.data);
      setEnhancementTemplates(enhancements.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const fetchShipDetails = async (shipId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/${shipId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setSelectedShip(response.data);
    } catch (error) {
      console.error('Error fetching ship details:', error);
    }
  };

  const handleSelectShip = (ship) => {
    fetchShipDetails(ship.id);
    setActiveTab('overview');
  };

  const showSuccess = (message) => {
    setActionResult(`✅ ${message}`);
    setTimeout(() => setActionResult(''), 3000);
  };

  const showError = (message) => {
    setActionResult(`❌ ${message}`);
    setTimeout(() => setActionResult(''), 3000);
  };

  const handleDeleteShip = async (shipId, shipName) => {
    if (!confirm(`⚠️ DELETE SHIP: "${shipName}"?\n\nThis will permanently delete the ship and all its components, weapons, armor, and crew assignments. This action CANNOT be undone!`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${shipId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // Clear selection if deleted ship was selected
      if (selectedShip?.id === shipId) {
        setSelectedShip(null);
      }
      
      fetchShips();
      showSuccess(`Ship "${shipName}" deleted successfully`);
    } catch (error) {
      console.error('Error deleting ship:', error);
      showError(error.response?.data?.error || 'Failed to delete ship');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-white">Loading ships...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex justify-between items-center">
        <Link to="/admin" className="text-blue-400 hover:text-blue-300">
          ← Back to Admin Panel
        </Link>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold"
        >
          ➕ Create New Ship
        </button>
      </div>

      <div className="bg-purple-900 bg-opacity-20 border border-purple-600 rounded-lg p-4 mb-6">
        <h1 className="text-3xl font-bold text-white">🚀 Ship Management</h1>
        <p className="text-gray-300 mt-2">
          Create and manage ships, install components, weapons, and assign crew
        </p>
      </div>

      {actionResult && (
        <div className={`mb-4 px-6 py-3 rounded-lg ${
          actionResult.startsWith('✅') ? 'bg-green-600' : 'bg-red-600'
        } text-white`}>
          {actionResult}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Ships List */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">All Ships ({ships.length})</h2>
            <div className="space-y-2 max-h-[700px] overflow-y-auto">
              {ships.length === 0 ? (
                <p className="text-gray-400">No ships yet. Create one to get started!</p>
              ) : (
                ships.map((ship) => (
                  <button
                    key={ship.id}
                    onClick={() => handleSelectShip(ship)}
                    className={`w-full text-left p-3 rounded transition-colors ${
                      selectedShip?.id === ship.id
                        ? 'bg-purple-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <div className="font-bold text-white">{ship.name}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {ship.ship_class} • {ship.owner_name}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      HP: {ship.hp_current}/{ship.hp_max} • AC: {ship.ac}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Slots: S {ship.system_slots_used}/{ship.system_slots_max} • 
                      F {ship.feature_slots_used}/{ship.feature_slots_max}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Ship Details */}
        <div className="lg:col-span-2">
          {!selectedShip ? (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <p className="text-gray-400">Select a ship to view details and manage components</p>
            </div>
          ) : (
            <ShipDetailView 
              ship={selectedShip}
              componentTemplates={componentTemplates}
              weaponTemplates={weaponTemplates}
              armorTemplates={armorTemplates}
              enhancementTemplates={enhancementTemplates}
              onUpdate={() => {
                fetchShipDetails(selectedShip.id);
                fetchShips();
              }}
              showSuccess={showSuccess}
              showError={showError}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onDelete={() => handleDeleteShip(selectedShip.id, selectedShip.name)}
            />
          )}
        </div>
      </div>

      {/* Create Ship Modal */}
      {showCreateModal && (
        <CreateShipModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchShips();
            showSuccess('Ship created successfully!');
          }}
          showError={showError}
        />
      )}
    </div>
  );
}

// ============================================
// SHIP DETAIL VIEW COMPONENT
// ============================================
function ShipDetailView({ 
  ship, 
  componentTemplates, 
  weaponTemplates, 
  armorTemplates, 
  enhancementTemplates,
  onUpdate, 
  showSuccess, 
  showError,
  activeTab,
  setActiveTab,
  onDelete
}) {
  return (
    <div className="space-y-4">
      {/* Ship Header */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-white">{ship.name}</h2>
          <button
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
            title="Delete Ship"
          >
            🗑️ Delete Ship
          </button>
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
          <span className="text-gray-400">Total Maintenance:</span>{' '}
          <span className="text-yellow-400 font-bold">{ship.total_maintenance_cost || 0} cr</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex border-b border-gray-700 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-bold whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-gray-700 text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActiveTab('combat')}
            className={`px-6 py-3 font-bold whitespace-nowrap ${
              activeTab === 'combat'
                ? 'bg-gray-700 text-white border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ⚔️ Combat
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className={`px-6 py-3 font-bold whitespace-nowrap ${
              activeTab === 'components'
                ? 'bg-gray-700 text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🔧 Components ({ship.components?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('weapons')}
            className={`px-6 py-3 font-bold ${
              activeTab === 'weapons'
                ? 'bg-gray-700 text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ⚔️ Weapons ({ship.weapons_arrays?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('armor')}
            className={`px-6 py-3 font-bold ${
              activeTab === 'armor'
                ? 'bg-gray-700 text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🛡️ Armor
          </button>
          <button
            onClick={() => setActiveTab('crew')}
            className={`px-6 py-3 font-bold ${
              activeTab === 'crew'
                ? 'bg-gray-700 text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            👥 Crew ({ship.crew?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('upgrades')}
            className={`px-6 py-3 font-bold ${
              activeTab === 'upgrades'
                ? 'bg-gray-700 text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ⬆️ Upgrades
          </button>
          <button
            onClick={() => setActiveTab('cargo')}
            className={`px-6 py-3 font-bold ${
              activeTab === 'cargo'
                ? 'bg-gray-700 text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            📦 Cargo
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <OverviewTab ship={ship} />
          )}
          {activeTab === 'combat' && (
            <CombatTab
              ship={ship}
              onUpdate={onUpdate}
              showSuccess={showSuccess}
              showError={showError}
            />
          )}
          {activeTab === 'components' && (
            <ComponentsTab 
              ship={ship} 
              templates={componentTemplates}
              onUpdate={onUpdate}
              showSuccess={showSuccess}
              showError={showError}
            />
          )}
          {activeTab === 'weapons' && (
            <WeaponsTab 
              ship={ship}
              weaponTemplates={weaponTemplates}
              onUpdate={onUpdate}
              showSuccess={showSuccess}
              showError={showError}
            />
          )}
          {activeTab === 'armor' && (
            <ArmorTab 
              ship={ship}
              armorTemplates={armorTemplates}
              onUpdate={onUpdate}
              showSuccess={showSuccess}
              showError={showError}
            />
          )}
          {activeTab === 'crew' && (
            <CrewTab 
              ship={ship}
              onUpdate={onUpdate}
              showSuccess={showSuccess}
              showError={showError}
            />
          )}
          {activeTab === 'upgrades' && (
            <UpgradesTab 
              ship={ship}
              onUpdate={onUpdate}
              showSuccess={showSuccess}
              showError={showError}
            />
          )}
          {activeTab === 'cargo' && (
            <ShipCargoTab 
              ship={ship}
              isAdmin={true}
              onUpdate={onUpdate}
              showSuccess={showSuccess}
              showError={showError}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// OVERVIEW TAB
// ============================================
function OverviewTab({ ship }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 rounded p-4">
          <h3 className="font-bold text-white mb-2">Stats</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">STR</span>
              <span className="text-white">{ship.strength}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">DEX</span>
              <span className="text-white">{ship.dexterity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">CON</span>
              <span className="text-white">{ship.constitution}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">INT</span>
              <span className="text-white">{ship.intelligence}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">WIS</span>
              <span className="text-white">{ship.wisdom}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">CHA</span>
              <span className="text-white">{ship.charisma}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 rounded p-4">
          <h3 className="font-bold text-white mb-2">Details</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Owner</span>
              <span className="text-white">{ship.owner_name || 'Party'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Movement</span>
              <span className="text-white">{ship.movement}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Purchase Price</span>
              <span className="text-yellow-400">{ship.purchase_price} cr</span>
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

      {ship.notes && (
        <div className="bg-gray-700 rounded p-4">
          <h3 className="font-bold text-white mb-2">Notes</h3>
          <p className="text-gray-300 text-sm whitespace-pre-wrap">{ship.notes}</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// COMBAT TAB
// ============================================
function CombatTab({ ship, onUpdate, showSuccess, showError }) {
  const handleAdjustHP = async (amount) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_URL}/${ship.id}/hp`, {
        amount: amount
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
      showSuccess(`HP adjusted by ${amount >= 0 ? '+' : ''}${amount}`);
    } catch (error) {
      showError(error.response?.data?.error || 'Failed to adjust HP');
    }
  };

  return (
    <div className="space-y-4">
      {/* HP Control */}
      <div className="bg-gray-700 rounded p-6">
        <h3 className="font-bold text-white text-lg mb-4">Hit Points</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl font-bold">
            <span className="text-red-400">{ship.hp_current}</span>
            <span className="text-gray-400"> / </span>
            <span className="text-white">{ship.hp_max}</span>
          </div>
          <div className="text-sm text-gray-400">
            {Math.round((ship.hp_current / ship.hp_max) * 100)}%
          </div>
        </div>

        {/* HP Bar */}
        <div className="w-full bg-gray-800 rounded-full h-6 mb-4">
          <div
            className={`h-6 rounded-full transition-all ${
              ship.hp_current === 0 ? 'bg-gray-600' :
              ship.hp_current <= ship.hp_max * 0.25 ? 'bg-red-600' :
              ship.hp_current <= ship.hp_max * 0.5 ? 'bg-yellow-600' :
              'bg-green-600'
            }`}
            style={{ width: `${Math.max((ship.hp_current / ship.hp_max) * 100, 0)}%` }}
          />
        </div>

        {/* HP Adjustment Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-bold text-red-400 mb-2">Deal Damage</h4>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => handleAdjustHP(-1)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded font-bold">-1</button>
              <button onClick={() => handleAdjustHP(-5)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded font-bold">-5</button>
              <button onClick={() => handleAdjustHP(-10)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded font-bold">-10</button>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-green-400 mb-2">Heal/Repair</h4>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => handleAdjustHP(1)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded font-bold">+1</button>
              <button onClick={() => handleAdjustHP(5)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded font-bold">+5</button>
              <button onClick={() => handleAdjustHP(10)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded font-bold">+10</button>
            </div>
          </div>
        </div>
      </div>

      {/* Combat Stats */}
      <div className="bg-gray-700 rounded p-6">
        <h3 className="font-bold text-white text-lg mb-4">Combat Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded p-4 text-center">
            <div className="text-xs text-gray-400 mb-1">Armor Class</div>
            <div className="text-3xl font-bold text-blue-400">{ship.ac}</div>
          </div>
          <div className="bg-gray-800 rounded p-4 text-center">
            <div className="text-xs text-gray-400 mb-1">Level</div>
            <div className="text-3xl font-bold text-purple-400">{ship.level}</div>
          </div>
          <div className="bg-gray-800 rounded p-4 text-center">
            <div className="text-xs text-gray-400 mb-1">Movement</div>
            <div className="text-xl font-bold text-white capitalize">{ship.movement}</div>
          </div>
        </div>
      </div>

      {/* Weapons Status */}
      {ship.weapons_arrays && ship.weapons_arrays.length > 0 && (
        <div className="bg-gray-700 rounded p-6">
          <h3 className="font-bold text-white text-lg mb-4">Weapons Systems</h3>
          <div className="space-y-2">
            {ship.weapons_arrays.map((array) => (
              <div key={array.id} className="bg-gray-800 rounded p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{array.array_name}</span>
                    {array.is_firelinked && (
                      <span className="text-xs bg-orange-600 px-2 py-0.5 rounded">FIRE-LINKED</span>
                    )}
                    {array.maintenance_enabled ? (
                      <span className="text-xs bg-green-600 px-2 py-0.5 rounded">ONLINE</span>
                    ) : (
                      <span className="text-xs bg-red-600 px-2 py-0.5 rounded">OFFLINE</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">
                    {array.weapons?.length || 0} / {array.max_weapons} weapons
                  </div>
                </div>
                {array.weapons && array.weapons.length > 0 && (
                  <div className="mt-2 text-xs text-gray-400">
                    {array.weapons.map(w => w.name).join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminShipsPanel;
