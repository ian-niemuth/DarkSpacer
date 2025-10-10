import { useState } from 'react';
import axios from 'axios';
import { API_URL as BASE_API_URL } from '../config/api';

const API_URL = `${BASE_API_URL}/ships`;

// ============================================
// COMPONENTS TAB
// ============================================
export function ComponentsTab({ ship, templates, onUpdate, showSuccess, showError }) {
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isAdvanced, setIsAdvanced] = useState(false);

  const handleInstallComponent = async () => {
    if (!selectedTemplate) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/${ship.id}/components`, {
        component_template_id: selectedTemplate.id,
        is_advanced: isAdvanced
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowInstallModal(false);
      setSelectedTemplate(null);
      setIsAdvanced(false);
      onUpdate();
      showSuccess(`Installed ${selectedTemplate.name}${isAdvanced ? ' (Advanced)' : ''}`);
    } catch (error) {
      showError(error.response?.data?.error || 'Failed to install component');
    }
  };

  const handleRemoveComponent = async (componentId, componentName) => {
    if (!confirm(`Remove ${componentName}?`)) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${ship.id}/components/${componentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
      showSuccess(`Removed ${componentName}`);
    } catch (error) {
      showError('Failed to remove component');
    }
  };

  const handleToggleMaintenance = async (componentId, enabled) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/${ship.id}/components/${componentId}/maintenance`, {
        maintenance_enabled: enabled
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
      showSuccess(enabled ? 'Maintenance enabled' : 'Maintenance disabled');
    } catch (error) {
      showError('Failed to toggle maintenance');
    }
  };

  const handleUpgradeToAdvanced = async (componentId, componentName) => {
    if (!confirm(`Upgrade ${componentName} to Advanced? This will use an additional slot.`)) return;

    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/${ship.id}/components/${componentId}/upgrade`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
      showSuccess(`Upgraded ${componentName} to Advanced`);
    } catch (error) {
      showError(error.response?.data?.error || 'Failed to upgrade component');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Installed Components</h3>
        <button
          onClick={() => setShowInstallModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-bold"
        >
          ➕ Install Component
        </button>
      </div>

      {ship.components && ship.components.length > 0 ? (
        <div className="space-y-2">
          {ship.components.map((component) => (
            <div key={component.id} className="bg-gray-700 rounded p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{component.name}</span>
                    {component.is_advanced && (
                      <span className="text-xs bg-purple-600 px-2 py-0.5 rounded">ADVANCED</span>
                    )}
                    <span className="text-xs bg-blue-600 px-2 py-0.5 rounded">
                      {component.component_type.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{component.description}</p>
                  <div className="text-xs text-gray-500 mt-2">
                    Maintenance: {component.maintenance_cost}cr
                    {!component.maintenance_enabled && (
                      <span className="text-red-400 ml-2">• DISABLED</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1 ml-4">
                  <button
                    onClick={() => handleToggleMaintenance(component.id, !component.maintenance_enabled)}
                    className={`text-xs px-3 py-1 rounded ${
                      component.maintenance_enabled
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : 'bg-green-600 hover:bg-green-700'
                    } text-white`}
                  >
                    {component.maintenance_enabled ? 'Disable' : 'Enable'}
                  </button>
                  {!component.is_advanced && templates.find(t => t.id === component.component_template_id)?.can_be_advanced && (
                    <button
                      onClick={() => handleUpgradeToAdvanced(component.id, component.name)}
                      className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
                    >
                      Upgrade
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveComponent(component.id, component.name)}
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
          No components installed. Add one to get started!
        </div>
      )}

      {/* Install Component Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Install Component</h3>
            
            <div className="mb-4">
              <label className="flex items-center space-x-2 text-white">
                <input
                  type="checkbox"
                  checked={isAdvanced}
                  onChange={(e) => setIsAdvanced(e.target.checked)}
                  className="rounded"
                />
                <span>Install as Advanced (uses 2x slots, grants bonuses)</span>
              </label>
            </div>

            <div className="space-y-2 mb-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`w-full text-left p-4 rounded transition ${
                    selectedTemplate?.id === template.id
                      ? 'bg-green-600 border-2 border-green-400'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{template.name}</span>
                        <span className="text-xs bg-blue-600 px-2 py-0.5 rounded">
                          {template.component_type.toUpperCase()}
                        </span>
                        {template.can_be_advanced && (
                          <span className="text-xs bg-purple-600 px-2 py-0.5 rounded">
                            Can be Advanced
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-300 mt-1">{template.description}</p>
                      <div className="text-xs text-gray-400 mt-2">
                        Cost: {template.initial_cost}cr • Maintenance: {template.maintenance_cost}cr
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleInstallComponent}
                disabled={!selectedTemplate}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded font-bold"
              >
                Install Selected
              </button>
              <button
                onClick={() => {
                  setShowInstallModal(false);
                  setSelectedTemplate(null);
                  setIsAdvanced(false);
                }}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// WEAPONS TAB
// ============================================
export function WeaponsTab({ ship, weaponTemplates, onUpdate, showSuccess, showError }) {
  const [showCreateArray, setShowCreateArray] = useState(false);
  const [showAddWeapon, setShowAddWeapon] = useState(false);
  const [selectedArray, setSelectedArray] = useState(null);
  
  const handleCreateArray = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/${ship.id}/weapons-arrays`, {
        array_name: formData.get('array_name'),
        max_weapons: parseInt(formData.get('max_weapons')),
        is_firelinked: formData.get('is_firelinked') === 'on'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowCreateArray(false);
      onUpdate();
      showSuccess('Weapons array created');
    } catch (error) {
      showError(error.response?.data?.error || 'Failed to create weapons array');
    }
  };

  const handleAddWeapon = async (templateId) => {
    if (!selectedArray) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/${ship.id}/weapons-arrays/${selectedArray.id}/weapons`, {
        weapon_template_id: templateId,
        array_position: (selectedArray.weapons?.length || 0) + 1
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowAddWeapon(false);
      setSelectedArray(null);
      onUpdate();
      showSuccess('Weapon added to array');
    } catch (error) {
      showError(error.response?.data?.error || 'Failed to add weapon');
    }
  };

  const handleRemoveWeapon = async (arrayId, weaponId, weaponName) => {
    if (!confirm(`Remove ${weaponName}?`)) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${ship.id}/weapons-arrays/${arrayId}/weapons/${weaponId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
      showSuccess('Weapon removed');
    } catch (error) {
      showError('Failed to remove weapon');
    }
  };

  const handleRemoveArray = async (arrayId, arrayName) => {
    if (!confirm(`Remove entire ${arrayName}? This will delete all weapons in it.`)) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/${ship.id}/weapons-arrays/${arrayId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
      showSuccess('Weapons array removed');
    } catch (error) {
      showError('Failed to remove weapons array');
    }
  };

  const handleToggleArrayMaintenance = async (arrayId, enabled) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/${ship.id}/weapons-arrays/${arrayId}/maintenance`, {
        maintenance_enabled: enabled
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdate();
      showSuccess(enabled ? 'Weapons array enabled' : 'Weapons array disabled');
    } catch (error) {
      showError('Failed to toggle weapons array');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Weapons Arrays</h3>
        <button
          onClick={() => setShowCreateArray(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-bold"
        >
          ➕ Create Weapons Array
        </button>
      </div>

      {ship.weapons_arrays && ship.weapons_arrays.length > 0 ? (
        <div className="space-y-4">
          {ship.weapons_arrays.map((array) => (
            <div key={array.id} className="bg-gray-700 rounded p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{array.array_name}</span>
                    {array.is_firelinked && (
                      <span className="text-xs bg-orange-600 px-2 py-0.5 rounded">FIRE-LINKED</span>
                    )}
                    {!array.maintenance_enabled && (
                      <span className="text-xs bg-red-600 px-2 py-0.5 rounded">DISABLED</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Weapons: {array.weapons?.length || 0} / {array.max_weapons}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleArrayMaintenance(array.id, !array.maintenance_enabled)}
                    className={`text-xs px-3 py-1 rounded ${
                      array.maintenance_enabled
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : 'bg-green-600 hover:bg-green-700'
                    } text-white`}
                  >
                    {array.maintenance_enabled ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedArray(array);
                      setShowAddWeapon(true);
                    }}
                    disabled={(array.weapons?.length || 0) >= array.max_weapons}
                    className="text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    Add Weapon
                  </button>
                  <button
                    onClick={() => handleRemoveArray(array.id, array.array_name)}
                    className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Remove Array
                  </button>
                </div>
              </div>

              {/* Weapons in array */}
              {array.weapons && array.weapons.length > 0 ? (
                <div className="space-y-2 mt-3 border-t border-gray-600 pt-3">
                  {array.weapons.map((weapon) => (
                    <div key={weapon.id} className="bg-gray-800 rounded p-3 flex justify-between items-start">
                      <div>
                        <div className="font-bold text-white text-sm">{weapon.name}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          Damage: {weapon.damage} • Range: {weapon.range === 'N' ? 'Near' : 'Far'}
                        </div>
                        {weapon.properties && (
                          <div className="text-xs text-blue-300 mt-1">
                            {Object.entries(
                              typeof weapon.properties === 'string' 
                                ? JSON.parse(weapon.properties) 
                                : weapon.properties
                            ).map(([key, value]) => (
                              <span key={key} className="mr-2">{key}</span>
                            ))}
                          </div>
                        )}
                        {weapon.requires_ammo && (
                          <div className={`text-xs mt-1 ${weapon.ammo_loaded ? 'text-green-400' : 'text-yellow-400'}`}>
                            {weapon.ammo_loaded ? '✓ Ammo Loaded' : '⚠ No Ammo'}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveWeapon(array.id, weapon.id, weapon.name)}
                        className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-sm text-center py-4 border-t border-gray-600 mt-3">
                  No weapons installed
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-center py-8">
          No weapons arrays. Create one to add weapons!
        </div>
      )}

      {/* Create Array Modal */}
      {showCreateArray && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Create Weapons Array</h3>
            <form onSubmit={handleCreateArray}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-1">Array Name</label>
                  <input
                    type="text"
                    name="array_name"
                    defaultValue="Weapons Array"
                    className="w-full bg-gray-700 text-white rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Max Weapons</label>
                  <input
                    type="number"
                    name="max_weapons"
                    defaultValue="4"
                    min="1"
                    max="8"
                    className="w-full bg-gray-700 text-white rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-white">
                    <input type="checkbox" name="is_firelinked" className="rounded" />
                    <span>Fire-Linked (+100cr per weapon)</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateArray(false)}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Weapon Modal */}
      {showAddWeapon && selectedArray && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">
              Add Weapon to {selectedArray.array_name}
            </h3>
            <div className="space-y-2">
              {weaponTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleAddWeapon(template.id)}
                  className="w-full text-left p-4 rounded bg-gray-700 hover:bg-gray-600 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-white">{template.name}</div>
                      <div className="text-sm text-gray-300 mt-1">
                        Damage: {template.damage} • Range: {template.range === 'N' ? 'Near' : 'Far'}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Cost: {template.cost}cr
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setShowAddWeapon(false);
                setSelectedArray(null);
              }}
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

// ArmorTab and CrewTab components will be shorter, I'll continue...
