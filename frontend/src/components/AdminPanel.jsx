import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../config/api';
import { API_URL, WS_URL } from '../config/api';
import { io } from 'socket.io-client';
import AdminInventoryPanel from './AdminInventoryPanel';
import CustomItemsManager from './CustomItemsManager';
import GMXPAward from './GMXPAward';
import SalvageManager from './SalvageManager';

function AdminPanel() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionResult, setActionResult] = useState('');
  const [showInventoryManager, setShowInventoryManager] = useState(false);
  const [inventoryCharacter, setInventoryCharacter] = useState(null);
  const [activeTab, setActiveTab] = useState('combat'); // 'combat', 'custom-items', 'xp-awards', or 'salvage'
  const [showQuickAction, setShowQuickAction] = useState(null); // { characterId, type: 'credits' | 'xp' }
  const [quickActionAmount, setQuickActionAmount] = useState('');
  const [quickActionNote, setQuickActionNote] = useState('');
  const [socket, setSocket] = useState(null);
  const [hudKey, setHudKey] = useState('darkspace-hud-2024'); // Default fallback
  const [timerTick, setTimerTick] = useState(0); // Force re-render for timer updates

  // Helper function to format time remaining for display
  const formatTimeRemaining = (expiresAt) => {
    if (!expiresAt) return null;

    const now = new Date();
    const expiry = new Date(expiresAt);
    const secondsRemaining = Math.floor((expiry - now) / 1000);

    if (secondsRemaining <= 0) {
      return { text: 'EXPIRED', color: 'text-red-500', urgent: true };
    }

    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    if (minutes < 1) {
      return {
        text: `${seconds}s`,
        color: 'text-red-400',
        urgent: true
      };
    } else if (minutes < 5) {
      return {
        text: `${minutes}m ${seconds}s`,
        color: 'text-orange-400',
        urgent: true
      };
    } else if (minutes < 10) {
      return {
        text: `${minutes}m ${seconds}s`,
        color: 'text-yellow-400',
        urgent: false
      };
    } else {
      return {
        text: `${minutes}m`,
        color: 'text-green-400',
        urgent: false
      };
    }
  };

  // Slot assignments state
  const [slotLayout, setSlotLayout] = useState('large-top'); // 'large-top', 'large-bottom', 'small-top', 'small-bottom'
  const [slotAssignments, setSlotAssignments] = useState({
    'large-top': {},
    'large-bottom': {},
    'small-top': {},
    'small-bottom': {}
  });

  useEffect(() => {
    fetchAllCharacters();

    // Fetch HUD access key
    const fetchHudKey = async () => {
      try {
        const response = await api.get(`${API_URL}/public/hud-key`);
        setHudKey(response.data.key);
      } catch (error) {
        console.error('Error fetching HUD key:', error);
        // Keep using default fallback
      }
    };
    fetchHudKey();

    // Connect to socket.io for real-time updates
    const token = localStorage.getItem('token');
    const newSocket = io(WS_URL, {
      auth: { token }
    });
    setSocket(newSocket);

    // Listen for admin refresh event (broadcasted from all admin actions)
    newSocket.on('admin_refresh', () => {
      fetchAllCharacters();
    });

    // Listen for character deletions (uses global emit)
    newSocket.on('character_deleted', () => {
      fetchAllCharacters();
    });

    // Listen for daily abilities reset (uses global emit)
    newSocket.on('daily_abilities_reset', () => {
      fetchAllCharacters();
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Update timer display every second for real-time countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerTick(prev => prev + 1); // Increment to force re-render
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const fetchAllCharacters = async () => {
    try {
      const response = await api.get(`${API_URL}/admin/characters`);
      setCharacters(response.data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSlotAssignments = async (layout) => {
    try {
      const response = await api.get(`${API_URL}/public/slot-assignments`, {
        params: { key: hudKey, layout }
      });

      // Convert array to object mapping slot_number -> character_id
      const slotsObj = {};
      response.data.forEach(slot => {
        slotsObj[slot.slot_number] = slot.id;
      });

      setSlotAssignments(prev => ({
        ...prev,
        [layout]: slotsObj
      }));
    } catch (error) {
      console.error(`Error fetching ${layout} slot assignments:`, error);
    }
  };

  const saveSlotAssignments = async (layout) => {
    try {
      const slotsObj = slotAssignments[layout];

      // Convert object to array format expected by API
      const assignments = Object.entries(slotsObj)
        .filter(([_, characterId]) => characterId) // Only include assigned slots
        .map(([slotNumber, characterId]) => ({
          slot_number: parseInt(slotNumber),
          character_id: characterId
        }));

      await api.post(`${API_URL}/admin/slot-assignments`, {
        layout_type: layout,
        assignments
      });

      setActionResult(`✅ ${layout} HUD slots saved successfully`);
      setTimeout(() => setActionResult(''), 3000);
    } catch (error) {
      console.error(`Error saving ${layout} slot assignments:`, error);
      setActionResult(`❌ Failed to save ${layout} slot assignments`);
      setTimeout(() => setActionResult(''), 5000);
    }
  };

  const handleQuickAction = async (characterId, actionType, amount, reasonOrSource) => {
    try {
      let endpoint = '';
      let data = {};
      let successMessage = '';
      let characterName = characters.find(c => c.id === characterId)?.name || 'Character';

      switch(actionType) {
        case 'credits':
          endpoint = `${API_URL}/admin/characters/${characterId}/credits`;
          data = { amount, reason: reasonOrSource };
          successMessage = `✅ ${characterName}: ${amount > 0 ? 'Gave' : 'Took'} ${Math.abs(amount)} credits`;
          break;
        case 'xp':
          endpoint = `${API_URL}/admin/characters/${characterId}/xp`;
          data = { xp: amount, reason: reasonOrSource };
          successMessage = `✅ ${characterName}: Awarded ${amount} XP`;
          break;
        default:
          return;
      }

      await api.post(endpoint, data);

      setActionResult(successMessage);
      setShowQuickAction(null);
      setQuickActionAmount('');
      setQuickActionNote('');
      fetchAllCharacters();
      setTimeout(() => setActionResult(''), 3000);
    } catch (error) {
      console.error(`Error with ${actionType}:`, error);
      setActionResult(`❌ Failed to ${actionType}`);
      setTimeout(() => setActionResult(''), 3000);
    }
  };



  const handleResetDailyAbilities = async () => {
    if (!confirm('Reset ALL daily abilities for ALL characters? This will affect the entire party.')) {
      return;
    }

    try {
      await api.post(
        `${API_URL}/admin/reset-daily-abilities`,
        {}
      );
      
      setActionResult('✅ All daily abilities reset for all characters');
      fetchAllCharacters();
      setTimeout(() => setActionResult(''), 3000);
    } catch (error) {
      setActionResult('❌ Failed to reset daily abilities');
    }
  };

  const handleDeleteCharacter = async () => {
    if (!selectedCharacter) return;

    if (!confirm(`Are you sure you want to delete ${selectedCharacter.name}? This action cannot be undone!`)) {
      return;
    }

    try {
      await api.delete(
        `${API_URL}/admin/characters/${selectedCharacter.id}`
      );

      setActionResult(`✅ ${selectedCharacter.name} has been deleted`);
      setSelectedCharacter(null);
      fetchAllCharacters();
      setTimeout(() => setActionResult(''), 3000);
    } catch (error) {
      console.error('Error deleting character:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to delete character';
      setActionResult(`❌ ${errorMessage}`);
      setTimeout(() => setActionResult(''), 5000);
    }
  };

  // Quick HP adjustment for combat view
  const handleCombatHPAdjust = async (characterId, amount) => {
    try {
      const character = characters.find(c => c.id === characterId);
      if (!character) return;

      const newHP = character.hp_current + amount;

      // Validate bounds
      if (newHP < 0 || newHP > character.hp_max) {
        setActionResult(`❌ HP must be between 0 and ${character.hp_max}`);
        setTimeout(() => setActionResult(''), 3000);
        return;
      }

      await api.post(`${API_URL}/admin/characters/${characterId}/damage`, {
        damage: -amount, // Negative damage = healing
        source: 'Combat adjustment'
      });

      fetchAllCharacters();
    } catch (error) {
      console.error('Error adjusting HP:', error);
      setActionResult('❌ Failed to adjust HP');
      setTimeout(() => setActionResult(''), 3000);
    }
  };

  const openInventoryManager = (character) => {
  setInventoryCharacter(character);
  setShowInventoryManager(true);
  };

  const handleExpendEnergyCell = async (characterId, itemId, itemName) => {
    if (!confirm(`Expend the energy cell from ${itemName}? This will permanently delete the cell.`)) {
      return;
    }

    try {
      await api.delete(`${API_URL}/admin/characters/${characterId}/energy-cell/${itemId}`);
      setActionResult(`✅ Energy cell expended from ${itemName}`);
      fetchAllCharacters();
      setTimeout(() => setActionResult(''), 3000);
    } catch (error) {
      console.error('Error expending energy cell:', error);
      setActionResult('❌ Failed to expend energy cell');
      setTimeout(() => setActionResult(''), 3000);
    }
  };

  const handleExpendAmmo = async (characterId, itemId, itemName) => {
    if (!confirm(`Expend the ammo clip from ${itemName}? This will permanently delete the ammo clip.`)) {
      return;
    }

    try {
      await api.delete(`${API_URL}/admin/characters/${characterId}/ammo/${itemId}`);
      setActionResult(`✅ Ammo clip expended from ${itemName}`);
      fetchAllCharacters();
      setTimeout(() => setActionResult(''), 3000);
    } catch (error) {
      console.error('Error expending ammo:', error);
      setActionResult('❌ Failed to expend ammo');
      setTimeout(() => setActionResult(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-white">Loading...</div>
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

      <div className="bg-red-900 bg-opacity-20 border border-red-600 rounded-lg p-4 mb-6">
        <h1 className="text-3xl font-bold text-white">🎲 Dungeon Master Panel</h1>
        <p className="text-gray-300 mt-2">
          Manage your campaign, give rewards, and control the game world
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 mb-6">
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('combat')}
            className={`px-6 py-3 font-bold transition ${
              activeTab === 'combat'
                ? 'bg-gray-700 text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ⚔️ Characters & Combat
          </button>
          <button
            onClick={() => setActiveTab('custom-items')}
            className={`px-6 py-3 font-bold transition ${
              activeTab === 'custom-items'
                ? 'bg-gray-700 text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🎨 Custom Items
          </button>
          <button
            onClick={() => setActiveTab('xp-awards')}
            className={`px-6 py-3 font-bold transition ${
              activeTab === 'xp-awards'
                ? 'bg-gray-700 text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ⭐ XP Awards
          </button>
          <button
            onClick={() => setActiveTab('salvage')}
            className={`px-6 py-3 font-bold transition ${
              activeTab === 'salvage'
                ? 'bg-gray-700 text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🔧 Salvage
          </button>
          <Link
            to="/admin/ships"
            className="px-6 py-3 font-bold transition text-gray-400 hover:text-white hover:bg-gray-700"
          >
            🚀 Manage Ships
          </Link>
          <Link
            to="/admin/bug-reports"
            className="px-6 py-3 font-bold transition text-gray-400 hover:text-white hover:bg-gray-700"
          >
            🐛 Bug Reports
          </Link>
          <Link
            to="/admin/galaxy-map"
            className="px-6 py-3 font-bold transition text-gray-400 hover:text-white hover:bg-gray-700"
          >
            🗺️ Galaxy Map
          </Link>
          <button
            onClick={() => {
              setActiveTab('hud-slots');
              fetchSlotAssignments('large-top');
              fetchSlotAssignments('large-bottom');
              fetchSlotAssignments('small-top');
              fetchSlotAssignments('small-bottom');
            }}
            className="ml-auto px-6 py-3 font-bold transition bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
          >
            📺 HUD Slots
          </button>
          <Link
            to={`/admin/character-hud?key=${hudKey}`}
            target="_blank"
            className="px-6 py-3 font-bold transition bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
            title="Open Streaming HUD (1360x880px) - Perfect for OBS Browser Source"
          >
            📺 Streaming HUD
          </Link>
        </div>
      </div>

      {actionResult && (
        <div className="mb-4 bg-green-600 text-white px-6 py-3 rounded-lg">
          {actionResult}
        </div>
      )}

      {/* Custom Items Tab */}
      {activeTab === 'custom-items' && (
        <CustomItemsManager />
      )}

      {/* XP Awards Tab */}
      {activeTab === 'xp-awards' && (
        <GMXPAward />
      )}

      {/* Salvage Tab */}
      {activeTab === 'salvage' && (
        <SalvageManager />
      )}

      {/* HUD Slots Tab */}
      {activeTab === 'hud-slots' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-2">📺 HUD Slot Management</h2>
            <p className="text-gray-400 text-sm mb-4">
              Configure which characters appear in each slot for OBS streaming HUDs
            </p>

            {/* Layout Selector */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setSlotLayout('large-top')}
                className={`px-6 py-3 rounded font-bold transition ${
                  slotLayout === 'large-top'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                📐 Large Top (2200×145px)
              </button>
              <button
                onClick={() => setSlotLayout('large-bottom')}
                className={`px-6 py-3 rounded font-bold transition ${
                  slotLayout === 'large-bottom'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                📐 Large Bottom (2200×145px)
              </button>
              <button
                onClick={() => setSlotLayout('small-top')}
                className={`px-6 py-3 rounded font-bold transition ${
                  slotLayout === 'small-top'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                📱 Small Top (1365×110px)
              </button>
              <button
                onClick={() => setSlotLayout('small-bottom')}
                className={`px-6 py-3 rounded font-bold transition ${
                  slotLayout === 'small-bottom'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-400 hover:text-white'
                }`}
              >
                📱 Small Bottom (1365×110px)
              </button>
            </div>

            {/* Slot Assignment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[1, 2, 3].map((slotNumber) => {
                const currentSlots = slotAssignments[slotLayout];
                const selectedCharacterId = currentSlots[slotNumber];

                return (
                  <div key={slotNumber} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                    <label className="block text-white font-bold mb-2">
                      Slot {slotNumber}
                    </label>
                    <select
                      value={selectedCharacterId || ''}
                      onChange={(e) => {
                        const newSlots = { ...currentSlots };
                        if (e.target.value) {
                          newSlots[slotNumber] = parseInt(e.target.value);
                        } else {
                          delete newSlots[slotNumber];
                        }

                        setSlotAssignments(prev => ({
                          ...prev,
                          [slotLayout]: newSlots
                        }));
                      }}
                      className="w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">-- Empty Slot --</option>
                      {characters.map((char) => (
                        <option key={char.id} value={char.id}>
                          {char.name} (Lv{char.level} {char.archetype})
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>

            {/* Save Button */}
            <div className="flex justify-between items-center flex-wrap gap-3">
              <button
                onClick={() => saveSlotAssignments(slotLayout)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-bold transition"
              >
                💾 Save {slotLayout.replace('-', ' ').toUpperCase()} Slots
              </button>

              {/* HUD Links */}
              <div className="flex gap-2 flex-wrap">
                <a
                  href={`/admin/character-slots-hud?key=${hudKey}&layout=large-top`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded font-bold transition text-xs"
                >
                  📐 Large Top
                </a>
                <a
                  href={`/admin/character-slots-hud?key=${hudKey}&layout=large-bottom`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded font-bold transition text-xs"
                >
                  📐 Large Bottom
                </a>
                <a
                  href={`/admin/character-slots-hud?key=${hudKey}&layout=small-top`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded font-bold transition text-xs"
                >
                  📱 Small Top
                </a>
                <a
                  href={`/admin/character-slots-hud?key=${hudKey}&layout=small-bottom`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded font-bold transition text-xs"
                >
                  📱 Small Bottom
                </a>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-3">ℹ️ Instructions</h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>• <strong>4 Layout Types:</strong> Large Top, Large Bottom, Small Top, Small Bottom</li>
              <li>• <strong>3 Slots per Layout:</strong> Each layout supports up to 3 character slots</li>
              <li>• <strong>Top vs Bottom:</strong> Use Top layouts for upper OBS position, Bottom for lower position</li>
              <li>• <strong>Empty Slots:</strong> Unassigned slots are automatically hidden in the HUD</li>
              <li>• <strong>Auto-Sizing:</strong> Occupied slots distribute evenly across the HUD width</li>
              <li>• <strong>Save:</strong> Click "Save" button to update assignments for current layout</li>
              <li>• <strong>Preview:</strong> Use "Open" buttons to view HUDs in new windows for OBS</li>
              <li>• <strong>OBS Setup:</strong> Add Browser Source, paste URL, set dimensions (2200×145 or 1365×110)</li>
            </ul>
          </div>
        </div>
      )}

      {/* Combat Reference Tab */}
      {activeTab === 'combat' && (
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">⚔️ Characters & Combat</h2>
                <p className="text-gray-400 text-sm">
                  Manage characters with combat essentials and quick actions
                </p>
              </div>
              <button
                onClick={handleResetDailyAbilities}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded font-bold transition whitespace-nowrap"
              >
                🔄 Reset Daily Abilities
              </button>
            </div>
          </div>

          {characters.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <p className="text-gray-400">No characters in the campaign yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {characters.map((char) => {
                const hpPercent = (char.hp_current / char.hp_max) * 100;
                const getHPColor = () => {
                  if (hpPercent > 75) return 'bg-green-500';
                  if (hpPercent > 50) return 'bg-yellow-500';
                  if (hpPercent > 25) return 'bg-orange-500';
                  return 'bg-red-500';
                };

                // Calculate ability modifiers
                const getMod = (score) => {
                  const mod = Math.floor((score - 10) / 2);
                  return mod >= 0 ? `+${mod}` : `${mod}`;
                };

                return (
                  <div
                    key={char.id}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{char.name}</h3>
                        <p className="text-sm text-gray-400">
                          Lv{char.level} {char.archetype} • {char.player_username}
                        </p>
                      </div>
                      <Link
                        to={`/character/${char.id}`}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                        title="View full character sheet"
                      >
                        📋
                      </Link>
                    </div>

                    {/* HP Bar with Quick Adjust */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-gray-300">HP</span>
                        <span className="text-sm font-bold text-red-400">
                          {char.hp_current} / {char.hp_max}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                        <div
                          className={`${getHPColor()} h-3 rounded-full transition-all duration-300`}
                          style={{ width: `${Math.max(0, Math.min(100, hpPercent))}%` }}
                        ></div>
                      </div>
                      {/* HP Adjust Buttons */}
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleCombatHPAdjust(char.id, -5)}
                          disabled={char.hp_current <= 0}
                          className="flex-1 text-xs bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-2 py-1 rounded font-bold"
                          title="Damage -5"
                        >
                          -5
                        </button>
                        <button
                          onClick={() => handleCombatHPAdjust(char.id, -1)}
                          disabled={char.hp_current <= 0}
                          className="flex-1 text-sm bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-2 py-1 rounded font-bold"
                          title="Damage -1"
                        >
                          ▼
                        </button>
                        <button
                          onClick={() => handleCombatHPAdjust(char.id, 1)}
                          disabled={char.hp_current >= char.hp_max}
                          className="flex-1 text-sm bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-2 py-1 rounded font-bold"
                          title="Heal +1"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => handleCombatHPAdjust(char.id, 5)}
                          disabled={char.hp_current >= char.hp_max}
                          className="flex-1 text-xs bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-2 py-1 rounded font-bold"
                          title="Heal +5"
                        >
                          +5
                        </button>
                      </div>
                    </div>

                    {/* AC and Quick Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="bg-gray-700 rounded p-2 text-center">
                        <div className="text-xs text-gray-400 mb-1">Armor Class</div>
                        <div className="text-2xl font-bold text-blue-400">{char.ac}</div>
                      </div>
                      <div className="bg-gray-700 rounded p-2">
                        <div className="text-xs text-gray-400 mb-1">Initiative</div>
                        <div className="text-xl font-bold text-purple-400">
                          {getMod(char.dexterity)}
                        </div>
                      </div>
                    </div>

                    {/* Ability Scores */}
                    <div className="grid grid-cols-6 gap-1 mb-3">
                      <div className="bg-gray-700 rounded p-1 text-center">
                        <div className="text-xs text-gray-400">STR</div>
                        <div className="text-sm font-bold text-white">{char.strength}</div>
                        <div className="text-xs text-gray-300">{getMod(char.strength)}</div>
                      </div>
                      <div className="bg-gray-700 rounded p-1 text-center">
                        <div className="text-xs text-gray-400">DEX</div>
                        <div className="text-sm font-bold text-white">{char.dexterity}</div>
                        <div className="text-xs text-gray-300">{getMod(char.dexterity)}</div>
                      </div>
                      <div className="bg-gray-700 rounded p-1 text-center">
                        <div className="text-xs text-gray-400">CON</div>
                        <div className="text-sm font-bold text-white">{char.constitution}</div>
                        <div className="text-xs text-gray-300">{getMod(char.constitution)}</div>
                      </div>
                      <div className="bg-gray-700 rounded p-1 text-center">
                        <div className="text-xs text-gray-400">INT</div>
                        <div className="text-sm font-bold text-white">{char.intelligence}</div>
                        <div className="text-xs text-gray-300">{getMod(char.intelligence)}</div>
                      </div>
                      <div className="bg-gray-700 rounded p-1 text-center">
                        <div className="text-xs text-gray-400">WIS</div>
                        <div className="text-sm font-bold text-white">{char.wisdom}</div>
                        <div className="text-xs text-gray-300">{getMod(char.wisdom)}</div>
                      </div>
                      <div className="bg-gray-700 rounded p-1 text-center">
                        <div className="text-xs text-gray-400">CHA</div>
                        <div className="text-sm font-bold text-white">{char.charisma}</div>
                        <div className="text-xs text-gray-300">{getMod(char.charisma)}</div>
                      </div>
                    </div>

                    {/* Inventory Space Bar */}
                    {char.slots_used !== undefined && char.slots_max !== undefined && (
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-gray-400">INVENTORY</span>
                          <span className="text-xs font-bold text-indigo-400">
                            {char.slots_used} / {char.slots_max} slots
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              char.slots_used > char.slots_max
                                ? 'bg-red-500'
                                : char.slots_used === char.slots_max
                                ? 'bg-yellow-500'
                                : char.slots_used / char.slots_max > 0.75
                                ? 'bg-orange-500'
                                : 'bg-indigo-500'
                            }`}
                            style={{
                              width: `${Math.min(100, (char.slots_used / char.slots_max) * 100)}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Equipped Gear */}
                    {char.equipped_gear && char.equipped_gear.length > 0 && (
                      <div className="mb-3 pb-3 border-b border-gray-700">
                        <div className="text-xs font-bold text-gray-400 mb-1">EQUIPPED</div>
                        <div className="space-y-1">
                          {char.equipped_gear.map((item, idx) => {
                            const requiresCell = item.properties && item.properties.includes('EC');
                            const hasCell = item.loaded_energy_cell_id && item.loaded_energy_cell_id > 0;
                            const requiresAmmo = item.properties && item.properties.includes('Am');
                            const hasAmmo = item.loaded_ammo_id && item.loaded_ammo_id > 0;

                            return (
                              <div key={idx} className="flex justify-between items-center text-xs text-gray-300">
                                <div>
                                  <span className="text-white font-semibold">{item.item_name}</span>
                                  {item.damage && (
                                    <span className="text-gray-400"> • {item.damage}</span>
                                  )}
                                  {item.range && (
                                    <span className="text-gray-400"> • {item.range}</span>
                                  )}
                                  {requiresCell && (
                                    hasCell ? (
                                      <>
                                        <span className="text-green-400"> • ⚡</span>
                                        {item.energy_cell_expires_at && (() => {
                                          const timeInfo = formatTimeRemaining(item.energy_cell_expires_at);
                                          return (
                                            <span className={`${timeInfo.color} font-mono ml-1`}>
                                              (⏱️ {timeInfo.text})
                                            </span>
                                          );
                                        })()}
                                      </>
                                    ) : (
                                      <span className="text-yellow-400"> • ⚠️</span>
                                    )
                                  )}
                                  {requiresAmmo && (
                                    hasAmmo ? (
                                      <span className="text-green-400"> • 🔫</span>
                                    ) : (
                                      <span className="text-yellow-400"> • ⚠️</span>
                                    )
                                  )}
                                </div>
                                <div className="flex gap-1">
                                  {requiresCell && hasCell && (
                                    <button
                                      onClick={() => handleExpendEnergyCell(char.id, item.id, item.item_name)}
                                      className="bg-orange-600 hover:bg-orange-700 text-white px-2 py-0.5 rounded text-xs font-bold"
                                      title="Expend energy cell"
                                    >
                                      🔥 EC
                                    </button>
                                  )}
                                  {requiresAmmo && hasAmmo && (
                                    <button
                                      onClick={() => handleExpendAmmo(char.id, item.id, item.item_name)}
                                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-0.5 rounded text-xs font-bold"
                                      title="Expend ammo clip"
                                    >
                                      🔥 Ammo
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Powered Gear Status (All EC items) */}
                    {char.powered_gear && char.powered_gear.length > 0 && (
                      <div className="mb-3 pb-3 border-b border-gray-700">
                        <details className="group">
                          <summary className="text-xs font-bold text-gray-400 mb-1 cursor-pointer hover:text-gray-300 list-none flex items-center">
                            <span className="mr-1 inline-block transform group-open:rotate-90 transition-transform">▶</span>
                            POWERED GEAR ({char.powered_gear.length})
                          </summary>
                          <div className="space-y-1 mt-2">
                            {char.powered_gear.map((item, idx) => {
                              const hasCell = item.loaded_energy_cell_id && item.loaded_energy_cell_id > 0;

                              return (
                                <div key={idx} className="flex justify-between items-center text-xs">
                                  <div className="flex items-center gap-2">
                                    <span className={item.equipped ? 'text-white font-semibold' : 'text-gray-400'}>
                                      {item.item_name}
                                    </span>
                                    {item.equipped && <span className="text-blue-400 text-xs">[E]</span>}
                                    {hasCell ? (
                                      <>
                                        <span className="text-green-400 font-bold">⚡ Loaded</span>
                                        {item.energy_cell_expires_at && (() => {
                                          const timeInfo = formatTimeRemaining(item.energy_cell_expires_at);
                                          return (
                                            <span className={`${timeInfo.color} font-mono text-xs`}>
                                              (⏱️ {timeInfo.text})
                                            </span>
                                          );
                                        })()}
                                      </>
                                    ) : (
                                      <span className="text-yellow-400">⚠️ Empty</span>
                                    )}
                                  </div>
                                  {hasCell && (
                                    <button
                                      onClick={() => handleExpendEnergyCell(char.id, item.id, item.item_name)}
                                      className="bg-orange-600 hover:bg-orange-700 text-white px-2 py-0.5 rounded text-xs font-bold"
                                      title="Expend energy cell"
                                    >
                                      🔥
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </details>
                      </div>
                    )}

                    {/* Ammo Weapons Status (All Am items) */}
                    {char.ammo_weapons && char.ammo_weapons.length > 0 && (
                      <div className="mb-3 pb-3 border-b border-gray-700">
                        <details className="group">
                          <summary className="text-xs font-bold text-gray-400 mb-1 cursor-pointer hover:text-gray-300 list-none flex items-center">
                            <span className="mr-1 inline-block transform group-open:rotate-90 transition-transform">▶</span>
                            AMMO WEAPONS ({char.ammo_weapons.length})
                          </summary>
                          <div className="space-y-1 mt-2">
                            {char.ammo_weapons.map((item, idx) => {
                              const hasAmmo = item.loaded_ammo_id && item.loaded_ammo_id > 0;

                              return (
                                <div key={idx} className="flex justify-between items-center text-xs">
                                  <div className="flex items-center gap-2">
                                    <span className={item.equipped ? 'text-white font-semibold' : 'text-gray-400'}>
                                      {item.item_name}
                                    </span>
                                    {item.equipped && <span className="text-blue-400 text-xs">[E]</span>}
                                    {hasAmmo ? (
                                      <span className="text-green-400 font-bold">🔫 Loaded</span>
                                    ) : (
                                      <span className="text-yellow-400">⚠️ Empty</span>
                                    )}
                                  </div>
                                  {hasAmmo && (
                                    <button
                                      onClick={() => handleExpendAmmo(char.id, item.id, item.item_name)}
                                      className="bg-red-600 hover:bg-red-700 text-white px-2 py-0.5 rounded text-xs font-bold"
                                      title="Expend ammo clip"
                                    >
                                      🔥
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </details>
                      </div>
                    )}

                    {/* Quick Action Buttons */}
                    <div className="flex gap-1 border-t border-gray-700 pt-3">
                      <button
                        onClick={() => setShowQuickAction({ characterId: char.id, type: 'credits' })}
                        className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded text-xs font-semibold"
                        title="Give/Take Credits"
                      >
                        💰
                      </button>
                      <button
                        onClick={() => setShowQuickAction({ characterId: char.id, type: 'xp' })}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded text-xs font-semibold"
                        title="Award XP"
                      >
                        ⭐
                      </button>
                      <button
                        onClick={() => openInventoryManager(char)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-2 py-1 rounded text-xs font-semibold"
                        title="Manage Inventory"
                      >
                        📦
                      </button>
                      <button
                        onClick={() => setSelectedCharacter(char)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-semibold"
                        title="Delete Character"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Quick Action Modals */}
      {showQuickAction && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">
              {showQuickAction.type === 'credits' ? '💰 Credits' : '⭐ Award XP'}
            </h2>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                {showQuickAction.type === 'credits'
                  ? 'Amount (use negative to take)'
                  : 'XP Amount'}
              </label>
              <input
                type="number"
                value={quickActionAmount}
                onChange={(e) => setQuickActionAmount(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
                placeholder={showQuickAction.type === 'credits' ? 'e.g., 100 or -50' : 'e.g., 5'}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                {showQuickAction.type === 'credits' ? 'Reason (optional)' : 'Reason (optional)'}
              </label>
              <input
                type="text"
                value={quickActionNote}
                onChange={(e) => setQuickActionNote(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none"
                placeholder="Add a note..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (quickActionAmount) {
                    handleQuickAction(
                      showQuickAction.characterId,
                      showQuickAction.type,
                      parseInt(quickActionAmount),
                      quickActionNote
                    );
                  }
                }}
                className={`flex-1 ${
                  showQuickAction.type === 'credits'
                    ? 'bg-yellow-600 hover:bg-yellow-700'
                    : 'bg-purple-600 hover:bg-purple-700'
                } text-white px-4 py-2 rounded font-bold`}
                disabled={!quickActionAmount}
              >
                {showQuickAction.type === 'credits' ? 'Apply' : 'Award'}
              </button>
              <button
                onClick={() => {
                  setShowQuickAction(null);
                  setQuickActionAmount('');
                  setQuickActionNote('');
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Character Confirmation Modal */}
      {selectedCharacter && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-red-700">
            <h2 className="text-xl font-bold text-red-400 mb-4">⚠️ Delete Character?</h2>

            <p className="text-gray-300 mb-4">
              Are you sure you want to delete <span className="font-bold text-white">{selectedCharacter.name}</span>?
            </p>

            <p className="text-sm text-gray-400 mb-6">
              This will permanently delete the character and all their inventory & crew assignments. This action cannot be undone!
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleDeleteCharacter}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold"
              >
                🗑️ Delete
              </button>
              <button
                onClick={() => setSelectedCharacter(null)}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Inventory Manager Modal */}
      {showInventoryManager && inventoryCharacter && (
        <AdminInventoryPanel
          character={inventoryCharacter}
          onClose={() => {
            setShowInventoryManager(false);
            setInventoryCharacter(null);
          }}
          onUpdate={() => {
            fetchAllCharacters();
          }}
        />
      )}
    </div>
  );
}

export default AdminPanel;