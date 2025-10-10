import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../config/api';
import { API_URL } from '../config/api';
import AdminInventoryPanel from './AdminInventoryPanel';
import CustomItemsManager from './CustomItemsManager';
import GMXPAward from './GMXPAward';

function AdminPanel() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionResult, setActionResult] = useState('');
  const [showInventoryManager, setShowInventoryManager] = useState(false);
  const [inventoryCharacter, setInventoryCharacter] = useState(null);
  const [activeTab, setActiveTab] = useState('characters'); // 'characters', 'custom-items', or 'xp-awards'

  useEffect(() => {
    fetchAllCharacters();
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

  const handleQuickAction = async (actionType, amount, reasonOrSource) => {
    if (!selectedCharacter) return;
    
    try {
      let endpoint = '';
      let data = {};
      let successMessage = '';

      switch(actionType) {
        case 'credits':
          endpoint = `${API_URL}/admin/characters/${selectedCharacter.id}/credits`;
          data = { amount, reason: reasonOrSource };
          successMessage = `✅ ${amount > 0 ? 'Gave' : 'Took'} ${Math.abs(amount)} credits`;
          break;
        case 'xp':
          endpoint = `${API_URL}/admin/characters/${selectedCharacter.id}/xp`;
          data = { xp: amount, reason: reasonOrSource };
          successMessage = `✅ Awarded ${amount} XP`;
          break;
        case 'damage':
          endpoint = `${API_URL}/admin/characters/${selectedCharacter.id}/damage`;
          data = { damage: amount, source: reasonOrSource };
          successMessage = `✅ Dealt ${amount} damage`;
          break;
        case 'heal':
          endpoint = `${API_URL}/admin/characters/${selectedCharacter.id}/heal`;
          data = { healing: amount };
          successMessage = `✅ Healed ${amount} HP`;
          break;
        default:
          return;
      }

      await api.post(endpoint, data);
      
      setActionResult(successMessage);
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

  const openInventoryManager = (character) => {
  setInventoryCharacter(character);
  setShowInventoryManager(true);
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
            onClick={() => setActiveTab('characters')}
            className={`px-6 py-3 font-bold transition ${
              activeTab === 'characters'
                ? 'bg-gray-700 text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            👥 Characters
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
          <Link
            to="/admin/ships"
            className="px-6 py-3 font-bold transition text-gray-400 hover:text-white hover:bg-gray-700"
          >
            🚀 Manage Ships
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

      {/* Characters Tab */}
      {activeTab === 'characters' && (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">All Characters</h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {characters.length === 0 ? (
                <p className="text-gray-400">No characters yet</p>
              ) : (
                characters.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => setSelectedCharacter(char)}
                    className={`w-full text-left p-3 rounded transition-colors ${
                      selectedCharacter?.id === char.id
                        ? 'bg-blue-600'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <div className="font-bold text-white">{char.name}</div>
                    <div className="text-sm text-gray-300">
                      Player: {char.player_username}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      Lv{char.level} {char.archetype} • HP: {char.hp_current}/{char.hp_max} • {char.credits}cr
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {!selectedCharacter ? (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <p className="text-gray-400">Select a character to perform actions</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedCharacter.name}
                </h2>
                <div className="grid grid-cols-3 gap-4 text-gray-300">
                  <div>
                    <div className="text-sm text-gray-400">Player</div>
                    <div className="font-bold">{selectedCharacter.player_username}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">HP</div>
                    <div className="font-bold text-red-400">
                      {selectedCharacter.hp_current} / {selectedCharacter.hp_max}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Credits</div>
                    <div className="font-bold text-yellow-400">
                      {selectedCharacter.credits} cr
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-white">Quick Actions</h3>
                  <Link
                    to={`/character/${selectedCharacter.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold text-sm flex items-center gap-2"
                  >
                    📋 View Character Sheet
                  </Link>
                </div>

                <div className="space-y-4">
                  {/* Credits */}
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">💰</div>
                      <div className="flex-1">
                        <div className="font-bold text-white">Credits</div>
                        <div className="text-xs text-gray-400">Give or take credits (use negative for taking)</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Amount (e.g., 100 or -50)"
                        className="flex-1 bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
                        id="credits-amount"
                      />
                      <button
                        onClick={() => {
                          const amount = document.getElementById('credits-amount').value;
                          const reason = document.getElementById('credits-reason').value;
                          if (amount) {
                            handleQuickAction('credits', parseInt(amount), reason);
                            document.getElementById('credits-amount').value = '';
                            document.getElementById('credits-reason').value = '';
                          }
                        }}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded font-bold whitespace-nowrap"
                      >
                        Apply
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Reason (optional)"
                      className="w-full mt-2 bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none text-sm"
                      id="credits-reason"
                    />
                  </div>

                  {/* XP */}
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">⭐</div>
                      <div className="flex-1">
                        <div className="font-bold text-white">Experience Points</div>
                        <div className="text-xs text-gray-400">Award XP for accomplishments</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="XP Amount"
                        className="flex-1 bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                        id="xp-amount"
                        min="1"
                      />
                      <button
                        onClick={() => {
                          const amount = document.getElementById('xp-amount').value;
                          const reason = document.getElementById('xp-reason').value;
                          if (amount) {
                            handleQuickAction('xp', parseInt(amount), reason);
                            document.getElementById('xp-amount').value = '';
                            document.getElementById('xp-reason').value = '';
                          }
                        }}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-bold whitespace-nowrap"
                      >
                        Award
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Reason (optional)"
                      className="w-full mt-2 bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none text-sm"
                      id="xp-reason"
                    />
                  </div>

                  {/* Damage */}
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">⚔️</div>
                      <div className="flex-1">
                        <div className="font-bold text-white">Deal Damage</div>
                        <div className="text-xs text-gray-400">Reduce character HP</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Damage Amount"
                        className="flex-1 bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-red-500 focus:outline-none"
                        id="damage-amount"
                        min="1"
                      />
                      <button
                        onClick={() => {
                          const amount = document.getElementById('damage-amount').value;
                          const source = document.getElementById('damage-source').value;
                          if (amount) {
                            handleQuickAction('damage', parseInt(amount), source);
                            document.getElementById('damage-amount').value = '';
                            document.getElementById('damage-source').value = '';
                          }
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-bold whitespace-nowrap"
                      >
                        Apply
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Source (optional, e.g., 'Laser blast')"
                      className="w-full mt-2 bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-red-500 focus:outline-none text-sm"
                      id="damage-source"
                    />
                  </div>

                  {/* Heal */}
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">💚</div>
                      <div className="flex-1">
                        <div className="font-bold text-white">Heal</div>
                        <div className="text-xs text-gray-400">Restore character HP</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Healing Amount"
                        className="flex-1 bg-gray-800 text-white px-3 py-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                        id="heal-amount"
                        min="1"
                      />
                      <button
                        onClick={() => {
                          const amount = document.getElementById('heal-amount').value;
                          if (amount) {
                            handleQuickAction('heal', parseInt(amount));
                            document.getElementById('heal-amount').value = '';
                          }
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-bold whitespace-nowrap"
                      >
                        Heal
                      </button>
                    </div>
                  </div>

                  {/* Other Actions */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => openInventoryManager(selectedCharacter)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded font-bold"
                    >
                      📦 Manage Inventory
                    </button>
                    <button
                      onClick={handleResetDailyAbilities}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded font-bold"
                    >
                      🔄 Reset Daily Abilities
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4">Character Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <span className="text-gray-400">Player:</span> {selectedCharacter.player_username}
                  </div>
                  <div>
                    <span className="text-gray-400">Species:</span> {selectedCharacter.species}
                  </div>
                  <div>
                    <span className="text-gray-400">Archetype:</span> {selectedCharacter.archetype}
                  </div>
                  <div>
                    <span className="text-gray-400">Level:</span> {selectedCharacter.level}
                  </div>
                  <div>
                    <span className="text-gray-400">XP:</span> {selectedCharacter.xp} / {selectedCharacter.level * 10}
                  </div>
                  <div>
                    <span className="text-gray-400">AC:</span> {selectedCharacter.ac}
                  </div>
                  <div>
                    <span className="text-gray-400">Reputation:</span> {selectedCharacter.reputation}
                  </div>
                  <div>
                    <span className="text-gray-400">Bounty:</span> {selectedCharacter.bounty} cr
                  </div>
                </div>
                
                {/* Danger Zone */}
                <div className="mt-6 pt-6 border-t border-red-900">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-red-400">⚠️ Danger Zone</h4>
                      <p className="text-xs text-gray-400 mt-1">Permanent actions - cannot be undone</p>
                    </div>
                  </div>
                  <button
                    onClick={handleDeleteCharacter}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    🗑️ Delete Character
                  </button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    This will delete the character and all their inventory & crew assignments
                  </p>
                </div>
              </div>
            </div>
          )}
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