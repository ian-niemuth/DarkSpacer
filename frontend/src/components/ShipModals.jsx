import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL as BASE_API_URL } from '../config/api';

const API_URL = `${BASE_API_URL}/ships`;

// ============================================
// ARMOR TAB
// ============================================
export function ArmorTab({ ship, armorTemplates, onUpdate, showSuccess, showError }) {
  const [showInstallModal, setShowInstallModal] = useState(false);

  const handleInstallArmor = async (templateId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/${ship.id}/armor`, {
        armor_template_id: templateId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowInstallModal(false);
      onUpdate();
      showSuccess('Armor installed');
    } catch (error) {
      showError(error.response?.data?.error || 'Failed to install armor');
    }
  };

  const handleRemoveArmor = async () => {
    if (!confirm('Remove armor from ship?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${ship.id}/armor/${ship.armor.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
      showSuccess('Armor removed');
    } catch (error) {
      showError('Failed to remove armor');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Ship Armor</h3>
        {!ship.armor && (
          <button
            onClick={() => setShowInstallModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-bold"
          >
            ➕ Install Armor
          </button>
        )}
      </div>

      {ship.armor ? (
        <div className="bg-gray-700 rounded p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-lg">{ship.armor.name}</span>
                <span className="text-xs bg-blue-600 px-2 py-0.5 rounded">
                  {ship.armor.category}
                </span>
              </div>
              <p className="text-sm text-gray-300 mt-2">{ship.armor.description}</p>
              
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
                {ship.armor.dex_modifier_effect !== 'normal' && (
                  <div className="text-sm">
                    <span className="text-gray-400">DEX Modifier:</span>{' '}
                    <span className="text-yellow-400">{ship.armor.dex_modifier_effect}</span>
                  </div>
                )}
                {ship.armor.properties && (
                  <div className="text-sm">
                    <span className="text-gray-400">Properties:</span>{' '}
                    <span className="text-blue-300">
                      {Object.keys(
                        typeof ship.armor.properties === 'string'
                          ? JSON.parse(ship.armor.properties)
                          : ship.armor.properties
                      ).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleRemoveArmor}
              className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded ml-4"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="text-gray-400 text-center py-8">
          No armor installed. Ships without armor use base AC.
        </div>
      )}

      {/* Install Armor Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Install Armor</h3>
            <div className="space-y-2 mb-4">
              {armorTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleInstallArmor(template.id)}
                  className="w-full text-left p-4 rounded bg-gray-700 hover:bg-gray-600 transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{template.name}</span>
                        <span className="text-xs bg-blue-600 px-2 py-0.5 rounded">
                          {template.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">{template.description}</p>
                      <div className="text-xs text-gray-400 mt-2">
                        Cost: {template.cost}cr
                        {template.uses_system_slot && (
                          <span className="ml-2 text-yellow-400">
                            • Uses {template.system_slots_required} System Slot(s)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowInstallModal(false)}
              className="w-full bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// UPGRADES TAB
// ============================================
export function UpgradesTab({ ship, onUpdate, showSuccess, showError }) {
  const [upgradeInfo, setUpgradeInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpgradeInfo();
  }, [ship.id]);

  const fetchUpgradeInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/${ship.id}/upgrade-info`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUpgradeInfo(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching upgrade info:', error);
      setLoading(false);
    }
  };

  const handleUpgradeStat = async (stat, increase) => {
    const cost = increase * 1000;
    if (!confirm(`Upgrade ${stat.toUpperCase()} by +${increase}?\n\nCost: ${cost}cr\n\n⚠️ REMINDER: DM must manually deduct ${cost}cr from ${upgradeInfo.owner.name}'s credits!`)) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/${ship.id}/upgrade-stat`, { stat, increase }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
      fetchUpgradeInfo();
      showSuccess(`Successfully upgraded ${stat}! Remember to deduct ${cost}cr from ${upgradeInfo.owner.name}.`);
    } catch (error) {
      showError(error.response?.data?.error || 'Failed to upgrade stat');
    }
  };

  const handlePurchaseSlot = async (slotType) => {
    if (!confirm(`Purchase 1 ${slotType} slot?\n\nCost: 1000cr\n\n⚠️ REMINDER: DM must manually deduct 1000cr from ${upgradeInfo.owner.name}'s credits!`)) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/${ship.id}/purchase-slot`, { slot_type: slotType }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
      fetchUpgradeInfo();
      showSuccess(`Successfully purchased ${slotType} slot! Remember to deduct 1000cr from ${upgradeInfo.owner.name}.`);
    } catch (error) {
      showError(error.response?.data?.error || 'Failed to purchase slot');
    }
  };

  const handleUpgradeHP = async (increase) => {
    const cost = increase * 1000;
    if (!confirm(`Upgrade HP by +${increase}?\n\nCost: ${cost}cr\n\n⚠️ REMINDER: DM must manually deduct ${cost}cr from ${upgradeInfo.owner.name}'s credits!`)) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/${ship.id}/upgrade-hp`, { increase }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
      fetchUpgradeInfo();
      showSuccess(`Successfully upgraded HP! Remember to deduct ${cost}cr from ${upgradeInfo.owner.name}.`);
    } catch (error) {
      showError(error.response?.data?.error || 'Failed to upgrade HP');
    }
  };

  if (loading) {
    return <div className="text-gray-400">Loading upgrade options...</div>;
  }

  if (!upgradeInfo) {
    return <div className="text-gray-400">Failed to load upgrade options</div>;
  }

  return (
    <div className="space-y-6">
      {/* DM Instructions */}
      <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded p-4">
        <h3 className="font-bold text-blue-300 mb-2">💰 DM Instructions</h3>
        <div className="text-sm text-gray-300">
          <div className="mb-2">
            <span className="font-bold">Ship Owner:</span> {upgradeInfo.owner.name} ({upgradeInfo.owner.type})
          </div>
          <div className="text-yellow-300 text-xs space-y-1">
            <div>• All upgrades are approved instantly by DM</div>
            <div>• Costs shown below are for reference only</div>
            <div>• <span className="font-bold">DM must manually deduct credits from owner/party funds</span></div>
          </div>
        </div>
      </div>

      {/* HP Upgrade */}
      <div className="bg-gray-700 rounded p-4">
        <h3 className="font-bold text-white mb-4">Upgrade Ship HP (1000cr per +1)</h3>
        <div className="bg-gray-800 rounded p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="font-bold text-white text-lg">HP Max</span>
              <div className="text-gray-400 text-sm mt-1">Current: {upgradeInfo.hp.current_max}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleUpgradeHP(1)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold"
            >
              +1 HP (1000cr)
            </button>
            <button
              onClick={() => handleUpgradeHP(5)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold"
            >
              +5 HP (5000cr)
            </button>
            <button
              onClick={() => handleUpgradeHP(10)}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-bold"
            >
              +10 HP (10000cr)
            </button>
          </div>
        </div>
      </div>

      {/* Stat Upgrades */}
      <div className="bg-gray-700 rounded p-4">
        <h3 className="font-bold text-white mb-4">Upgrade Ship Stats (1000cr per +1)</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(upgradeInfo.stats).map(([stat, info]) => (
            <div key={stat} className="bg-gray-800 rounded p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-white uppercase">{stat.substring(0, 3)}</span>
                <span className="text-gray-300">
                  {info.current} / {info.max}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpgradeStat(stat, 1)}
                  disabled={info.current >= info.max}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 py-1 rounded text-xs"
                >
                  +1 (1000cr)
                </button>
                <button
                  onClick={() => handleUpgradeStat(stat, 2)}
                  disabled={info.current + 1 >= info.max}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 py-1 rounded text-xs"
                >
                  +2 (2000cr)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slot Purchases */}
      <div className="bg-gray-700 rounded p-4">
        <h3 className="font-bold text-white mb-4">Purchase Additional Slots (1000cr each)</h3>
        <div className="grid grid-cols-2 gap-4">
          {/* System Slots */}
          <div className="bg-gray-800 rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-white">System Slots</span>
              <span className="text-gray-300">
                {upgradeInfo.slots.system.current_max} / {upgradeInfo.slots.system.max_allowed}
              </span>
            </div>
            <button
              onClick={() => handlePurchaseSlot('system')}
              disabled={upgradeInfo.slots.system.current_max >= upgradeInfo.slots.system.max_allowed}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 py-2 rounded text-sm"
            >
              Purchase +1 (1000cr)
            </button>
          </div>

          {/* Feature Slots */}
          <div className="bg-gray-800 rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-white">Feature Slots</span>
              <span className="text-gray-300">
                {upgradeInfo.slots.feature.current_max} / {upgradeInfo.slots.feature.max_allowed}
              </span>
            </div>
            <button
              onClick={() => handlePurchaseSlot('feature')}
              disabled={upgradeInfo.slots.feature.current_max >= upgradeInfo.slots.feature.max_allowed}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 py-2 rounded text-sm"
            >
              Purchase +1 (1000cr)
            </button>
          </div>
        </div>
      </div>

      {/* Rules Reference */}
      <div className="bg-gray-700 border border-gray-600 rounded p-4">
        <h4 className="font-bold text-white mb-2">📖 Upgrade Rules</h4>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>• HP can be increased by any amount for 1000cr per +1</li>
          <li>• Stats can be increased in +1 increments for 1000cr each</li>
          <li>• Stats cannot exceed 18</li>
          <li>• Additional slots cost 1000cr each</li>
          <li>• Maximum of 10 slots per category (System/Feature)</li>
          <li className="text-yellow-300 font-bold">• DM approves all upgrades and manually deducts credits</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// CREW TAB
// ============================================
export function CrewTab({ ship, onUpdate, showSuccess, showError }) {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [crewRoles] = useState([
    'Captain', 'Pilot', 'Co-Pilot', 'Gunner', 'Astrogator',
    'Chaplain', 'Cook', 'Engineer', 'Medic', 'Quartermaster', 'Salvage Engineer'
  ]);

  const fetchCharacters = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_API_URL}/admin/characters`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCharacters(response.data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const handleOpenAssignModal = async () => {
    await fetchCharacters();
    setShowAssignModal(true);
  };

  const handleAssignCrew = async (characterId, crewRole) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/${ship.id}/crew`, {
        character_id: characterId,
        crew_role: crewRole,
        is_primary_role: true
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowAssignModal(false);
      onUpdate();
      showSuccess(`Assigned crew member to ${crewRole}`);
    } catch (error) {
      showError(error.response?.data?.error || 'Failed to assign crew');
    }
  };

  const handleRemoveCrew = async (assignmentId, characterName) => {
    if (!confirm(`Remove ${characterName} from crew?`)) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${ship.id}/crew/${assignmentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
      showSuccess('Crew member removed');
    } catch (error) {
      showError('Failed to remove crew member');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Crew Roster</h3>
        <button
          onClick={handleOpenAssignModal}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-bold"
        >
          ➕ Assign Crew
        </button>
      </div>

      {ship.crew && ship.crew.length > 0 ? (
        <div className="space-y-2">
          {ship.crew.map((member) => (
            <div key={member.id} className="bg-gray-700 rounded p-4 flex justify-between items-center">
              <div>
                <div className="font-bold text-white">{member.character_name}</div>
                <div className="text-sm text-gray-400 mt-1">
                  {member.crew_role} • {member.archetype}
                  {member.is_primary_role && (
                    <span className="ml-2 text-xs bg-green-600 px-2 py-0.5 rounded">PRIMARY</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleRemoveCrew(member.id, member.character_name)}
                className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-center py-8">
          No crew assigned. Add crew members to operate the ship!
        </div>
      )}

      {/* Assign Crew Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Assign Crew Member</h3>
            
            {characters.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                No characters available. Create characters first!
              </div>
            ) : (
              <div className="space-y-4">
                {characters.map((character) => (
                  <div key={character.id} className="bg-gray-700 rounded p-4">
                    <div className="font-bold text-white mb-2">
                      {character.name} - {character.archetype}
                    </div>
                    <div className="text-sm text-gray-400 mb-3">
                      Player: {character.player_username}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {crewRoles.map((role) => (
                        <button
                          key={role}
                          onClick={() => handleAssignCrew(character.id, role)}
                          className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowAssignModal(false)}
              className="w-full mt-4 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// ENHANCEMENTS TAB
// ============================================
export function EnhancementsTab({ ship, enhancementTemplates, onUpdate, showSuccess, showError }) {
  const [showInstallModal, setShowInstallModal] = useState(false);

  const handleInstallEnhancement = async (templateId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/${ship.id}/enhancements`, {
        enhancement_template_id: templateId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowInstallModal(false);
      onUpdate();
      showSuccess('Enhancement installed');
    } catch (error) {
      showError(error.response?.data?.error || 'Failed to install enhancement');
    }
  };

  const handleRemoveEnhancement = async (enhancementId, enhancementName) => {
    if (!confirm(`Remove ${enhancementName}?`)) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${ship.id}/enhancements/${enhancementId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
      showSuccess('Enhancement removed');
    } catch (error) {
      showError('Failed to remove enhancement');
    }
  };

  const handleToggleEnhancement = async (enhancementId, isActive) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/${ship.id}/enhancements/${enhancementId}/toggle`, {
        is_active: isActive
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
      showSuccess(isActive ? 'Enhancement activated' : 'Enhancement deactivated');
    } catch (error) {
      showError('Failed to toggle enhancement');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Installed Enhancements</h3>
        <button
          onClick={() => setShowInstallModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-bold"
        >
          ➕ Install Enhancement
        </button>
      </div>

      {ship.enhancements && ship.enhancements.length > 0 ? (
        <div className="space-y-2">
          {ship.enhancements.map((enhancement) => (
            <div key={enhancement.id} className="bg-gray-700 rounded p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{enhancement.name}</span>
                    <span className="text-xs bg-blue-600 px-2 py-0.5 rounded">
                      {enhancement.enhancement_type.toUpperCase()}
                    </span>
                    {!enhancement.is_active && (
                      <span className="text-xs bg-red-600 px-2 py-0.5 rounded">INACTIVE</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-300 mt-2">{enhancement.description}</p>
                  {enhancement.benefit && (
                    <div className="text-sm text-green-400 mt-2">
                      <span className="font-bold">Benefit:</span> {enhancement.benefit}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1 ml-4">
                  <button
                    onClick={() => handleToggleEnhancement(enhancement.id, !enhancement.is_active)}
                    className={`text-xs px-3 py-1 rounded ${
                      enhancement.is_active
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : 'bg-green-600 hover:bg-green-700'
                    } text-white`}
                  >
                    {enhancement.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleRemoveEnhancement(enhancement.id, enhancement.name)}
                    className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-center py-8">
          No enhancements installed. Add one to improve your ship!
        </div>
      )}

      {/* Install Enhancement Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Install Enhancement</h3>
            <div className="space-y-2 mb-4">
              {enhancementTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleInstallEnhancement(template.id)}
                  className="w-full text-left p-4 rounded bg-gray-700 hover:bg-gray-600 transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{template.name}</span>
                        <span className="text-xs bg-blue-600 px-2 py-0.5 rounded">
                          {template.enhancement_type.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">{template.description}</p>
                      {template.benefit && (
                        <div className="text-sm text-green-400 mt-2">
                          <span className="font-bold">Benefit:</span> {template.benefit}
                        </div>
                      )}
                      <div className="text-xs text-gray-400 mt-2">
                        Cost: {template.cost || 'N/A'}cr
                        {template.properties && template.properties.maintenance_cost && (
                          <span className="ml-2">• Maintenance: {template.properties.maintenance_cost}cr</span>
                        )}
                        <span className="ml-2 text-yellow-400">
                          • Uses {template.slots_required} {template.enhancement_type} slot(s)
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowInstallModal(false)}
              className="w-full bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// CREATE SHIP MODAL
// ============================================
export function CreateShipModal({ onClose, onSuccess, showError }) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_API_URL}/admin/characters`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCharacters(response.data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const shipData = {
      name: formData.get('name'),
      ship_class: formData.get('ship_class'),
      owner_type: formData.get('owner_type'),
      owner_id: formData.get('owner_type') === 'character' ? parseInt(formData.get('owner_id')) : null,
      strength: parseInt(formData.get('strength')),
      dexterity: parseInt(formData.get('dexterity')),
      constitution: parseInt(formData.get('constitution')),
      intelligence: parseInt(formData.get('intelligence')),
      wisdom: parseInt(formData.get('wisdom')),
      charisma: parseInt(formData.get('charisma')),
      hp_max: parseInt(formData.get('hp_max')),
      ac: parseInt(formData.get('ac') || 10),
      level: parseInt(formData.get('level') || 1),
      movement: formData.get('movement'),
      system_slots_max: parseInt(formData.get('system_slots_max')),
      feature_slots_max: parseInt(formData.get('feature_slots_max')),
      purchase_price: parseInt(formData.get('purchase_price') || 0),
      description: formData.get('description'),
      notes: formData.get('notes')
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post(API_URL, shipData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onSuccess();
    } catch (error) {
      showError(error.response?.data?.error || 'Failed to create ship');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Create New Ship</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-gray-700 rounded p-4">
            <h3 className="font-bold text-white mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Ship Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Millennium Eagle"
                  className="w-full bg-gray-600 text-white rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Ship Class *</label>
                <select
                  name="ship_class"
                  required
                  className="w-full bg-gray-600 text-white rounded px-3 py-2"
                >
                  <option value="Fighter">Fighter</option>
                  <option value="Freighter">Freighter</option>
                  <option value="Capital">Capital Ship</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Owner Type *</label>
                <select
                  name="owner_type"
                  id="owner_type"
                  required
                  defaultValue="party"
                  className="w-full bg-gray-600 text-white rounded px-3 py-2"
                  onChange={(e) => {
                    const ownerIdField = document.getElementById('owner_id_field');
                    ownerIdField.style.display = e.target.value === 'character' ? 'block' : 'none';
                  }}
                >
                  <option value="party">Party Ship</option>
                  <option value="character">Character Owned</option>
                </select>
              </div>
              <div id="owner_id_field" style={{ display: 'none' }}>
                <label className="block text-gray-300 text-sm mb-1">Owner Character</label>
                <select
                  name="owner_id"
                  className="w-full bg-gray-600 text-white rounded px-3 py-2"
                >
                  {characters.map((char) => (
                    <option key={char.id} value={char.id}>
                      {char.name} ({char.player_username})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gray-700 rounded p-4">
            <h3 className="font-bold text-white mb-3">Ship Stats</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">STR</label>
                <input type="number" name="strength" defaultValue="10" min="1" max="20" className="w-full bg-gray-600 text-white rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">DEX</label>
                <input type="number" name="dexterity" defaultValue="10" min="1" max="20" className="w-full bg-gray-600 text-white rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">CON</label>
                <input type="number" name="constitution" defaultValue="10" min="1" max="20" className="w-full bg-gray-600 text-white rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">INT</label>
                <input type="number" name="intelligence" defaultValue="10" min="1" max="20" className="w-full bg-gray-600 text-white rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">WIS</label>
                <input type="number" name="wisdom" defaultValue="10" min="1" max="20" className="w-full bg-gray-600 text-white rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">CHA</label>
                <input type="number" name="charisma" defaultValue="10" min="1" max="20" className="w-full bg-gray-600 text-white rounded px-3 py-2" />
              </div>
            </div>
          </div>

          {/* Combat & Slots */}
          <div className="bg-gray-700 rounded p-4">
            <h3 className="font-bold text-white mb-3">Combat & Slots</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">HP Max *</label>
                <input type="number" name="hp_max" defaultValue="10" min="1" required className="w-full bg-gray-600 text-white rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Base AC</label>
                <input type="number" name="ac" defaultValue="10" min="1" className="w-full bg-gray-600 text-white rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Level</label>
                <input type="number" name="level" defaultValue="1" min="1" className="w-full bg-gray-600 text-white rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Movement</label>
                <select name="movement" defaultValue="near" className="w-full bg-gray-600 text-white rounded px-3 py-2">
                  <option value="near">Near</option>
                  <option value="double near">Double Near</option>
                  <option value="far">Far</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">System Slots *</label>
                <input type="number" name="system_slots_max" defaultValue="10" min="1" max="10" required className="w-full bg-gray-600 text-white rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Feature Slots *</label>
                <input type="number" name="feature_slots_max" defaultValue="10" min="1" max="10" required className="w-full bg-gray-600 text-white rounded px-3 py-2" />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-700 rounded p-4">
            <h3 className="font-bold text-white mb-3">Additional Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Purchase Price (cr)</label>
                <input type="number" name="purchase_price" defaultValue="0" min="0" className="w-full bg-gray-600 text-white rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Description</label>
                <textarea name="description" rows="3" className="w-full bg-gray-600 text-white rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Notes</label>
                <textarea name="notes" rows="3" className="w-full bg-gray-600 text-white rounded px-3 py-2" />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-bold"
            >
              Create Ship
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
