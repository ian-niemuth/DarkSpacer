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
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-bold ${
              activeTab === 'overview'
                ? 'bg-gray-700 text-white border-b-2 border-purple-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className={`px-6 py-3 font-bold ${
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

// Components tab will continue in next file...
// I'll create separate files for the complex tabs

export default AdminShipsPanel;
