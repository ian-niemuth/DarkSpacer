import { useState, useEffect } from 'react';
import axios from 'axios';
import { PropertiesDisplay } from './PropertyTooltip';
import { API_URL } from '../config/api';

function CustomItemsManager() {
  const [customItems, setCustomItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'gear',
    subcategory: '',
    cost: '',
    weight: '1',
    damage: '',
    range: '',
    properties: '',
    description: '',
    // Archetype restriction fields
    weapon_type: '',
    weapon_weight_class: '',
    armor_type: '',
    hands_required: '1',
    allows_dex_modifier: 'true'
  });

  useEffect(() => {
    fetchCustomItems();
  }, []);

  const fetchCustomItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/inventory/custom-items`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCustomItems(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching custom items:', err);
      setError('Failed to load custom items');
      setLoading(false);
    }
  };

  const handleCreateItem = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setError('Item name is required');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      // Prepare data - convert empty strings to null
      const itemData = {
        ...formData,
        cost: formData.cost ? parseInt(formData.cost) : null,
        weight: formData.weight ? parseFloat(formData.weight) : 1,
        damage: formData.damage || null,
        range: formData.range || null,
        properties: formData.properties || null,
        description: formData.description || null,
        // Archetype restriction fields
        weapon_type: formData.weapon_type || null,
        weapon_weight_class: formData.weapon_weight_class || null,
        armor_type: formData.armor_type || null,
        hands_required: formData.hands_required ? parseInt(formData.hands_required) : 1,
        allows_dex_modifier: formData.allows_dex_modifier === 'true'
      };

      await axios.post(`${API_URL}/inventory/custom-item`, itemData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSuccess(`✅ Created "${formData.name}" successfully!`);
      setError('');
      
      // Reset form
      setFormData({
        name: '',
        category: 'gear',
        subcategory: '',
        cost: '',
        weight: '1',
        damage: '',
        range: '',
        properties: '',
        description: '',
        weapon_type: '',
        weapon_weight_class: '',
        armor_type: '',
        hands_required: '1',
        allows_dex_modifier: 'true'
      });
      
      setShowCreateForm(false);
      fetchCustomItems();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error creating custom item:', err);
      setError(err.response?.data?.error || 'Failed to create item');
      setSuccess('');
    }
  };

  const handleDeleteItem = async (itemId, itemName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${itemName}"?\n\nThis action cannot be undone!`
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_URL}/inventory/custom-item/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSuccess(response.data.message);
      setError('');
      fetchCustomItems();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error deleting custom item:', err);
      setError(err.response?.data?.error || 'Failed to delete item');
      setSuccess('');
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="text-white">Loading custom items...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">🎨 Custom Items Manager</h2>
            <p className="text-gray-400 text-sm">
              Create and manage custom gear, weapons, armor, and consumables for your campaign.
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className={`px-6 py-3 rounded font-bold transition ${
              showCreateForm
                ? 'bg-gray-600 hover:bg-gray-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {showCreateForm ? '✕ Cancel' : '+ Create New Item'}
          </button>
        </div>

        {/* Success/Error Messages */}
        {error && (
          <div className="mb-4 bg-red-900 bg-opacity-50 border border-red-600 text-red-200 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 bg-green-900 bg-opacity-50 border border-green-600 text-green-200 px-4 py-3 rounded">
            {success}
          </div>
        )}
      </div>

      {/* Create Item Form */}
      {showCreateForm && (
        <div className="bg-gray-800 rounded-lg p-6 border border-green-600">
          <h3 className="text-xl font-bold text-white mb-4">Create New Custom Item</h3>
          
          {/* Archetype Restrictions Info */}
          <div className="mb-4 p-4 bg-blue-900 bg-opacity-30 border border-blue-600 rounded">
            <div className="flex items-start gap-3">
              <div className="text-2xl">ℹ️</div>
              <div className="flex-1">
                <div className="font-bold text-blue-300 mb-2">Archetype Restriction System</div>
                <div className="text-sm text-gray-300 space-y-1">
                  <div><strong>Weapons:</strong> Set weapon type and weight class to control which archetypes can use this item.</div>
                  <div><strong>Light weapons:</strong> Quick, Clever, Wise, Charming (pistols only), Strong</div>
                  <div><strong>Standard weapons:</strong> Strong only</div>
                  <div><strong>Heavy weapons:</strong> Tough only (or Charming for pistols)</div>
                  <div><strong>Armor:</strong> Light (Quick, Charming), Medium/Heavy (Strong, Tough). Clever & Wise cannot wear armor!</div>
                  <div><strong>Gear/Consumables:</strong> No restrictions - anyone can use</div>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleCreateItem} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  placeholder="e.g., Plasma Torch, Nanoblade, Gravity Belt"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                >
                  <option value="weapon">Weapon</option>
                  <option value="armor">Armor</option>
                  <option value="gear">Gear</option>
                  <option value="consumable">Consumable</option>
                </select>
              </div>

              {/* Subcategory */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Subcategory
                </label>
                <input
                  type="text"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  placeholder="e.g., pistol, helmet, shield"
                />
              </div>

              {/* Cost */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Cost (credits)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  placeholder="e.g., 100"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Weight (slots)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  placeholder="1"
                />
                <div className="text-xs text-gray-400 mt-1">
                  0 = FREE, 0.5 = 2 per slot, 1+ = slots used
                </div>
              </div>

              {/* Damage (for weapons) */}
              {formData.category === 'weapon' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Damage
                  </label>
                  <input
                    type="text"
                    value={formData.damage}
                    onChange={(e) => setFormData({ ...formData, damage: e.target.value })}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                    placeholder="e.g., 1d6, 2d8"
                  />
                </div>
              )}

              {/* Range (for weapons) */}
              {formData.category === 'weapon' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Range
                  </label>
                  <select
                    value={formData.range}
                    onChange={(e) => setFormData({ ...formData, range: e.target.value })}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  >
                    <option value="">-- Select Range --</option>
                    <option value="C">C (Close)</option>
                    <option value="N">N (Near)</option>
                    <option value="F">F (Far)</option>
                    <option value="C/N">C/N (Close/Near)</option>
                  </select>
                </div>
              )}

              {/* Weapon Type (for weapons) */}
              {formData.category === 'weapon' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Weapon Type *
                  </label>
                  <select
                    required
                    value={formData.weapon_type}
                    onChange={(e) => setFormData({ ...formData, weapon_type: e.target.value })}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  >
                    <option value="">-- Select Type --</option>
                    <option value="melee">Melee</option>
                    <option value="ranged">Ranged</option>
                  </select>
                  <div className="text-xs text-gray-400 mt-1">
                    Affects archetype restrictions
                  </div>
                </div>
              )}

              {/* Weapon Weight Class (for weapons) */}
              {formData.category === 'weapon' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Weight Class *
                  </label>
                  <select
                    required
                    value={formData.weapon_weight_class}
                    onChange={(e) => setFormData({ ...formData, weapon_weight_class: e.target.value })}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  >
                    <option value="">-- Select Weight --</option>
                    <option value="light">Light (Quick, Clever, Wise, Charming)</option>
                    <option value="">Standard (Strong only)</option>
                    <option value="heavy">Heavy (Tough only)</option>
                  </select>
                  <div className="text-xs text-gray-400 mt-1">
                    Determines which archetypes can use this weapon
                  </div>
                </div>
              )}

              {/* Hands Required (for weapons) */}
              {formData.category === 'weapon' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Hands Required
                  </label>
                  <select
                    value={formData.hands_required}
                    onChange={(e) => setFormData({ ...formData, hands_required: e.target.value })}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  >
                    <option value="1">1 Hand</option>
                    <option value="2">2 Hands</option>
                  </select>
                </div>
              )}

              {/* Armor Type (for armor) */}
              {formData.category === 'armor' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Armor Type *
                  </label>
                  <select
                    required
                    value={formData.armor_type}
                    onChange={(e) => setFormData({ ...formData, armor_type: e.target.value })}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  >
                    <option value="">-- Select Armor Type --</option>
                    <option value="light">Light (AC 11, Quick, Charming)</option>
                    <option value="medium">Medium (AC 13, Strong, Tough)</option>
                    <option value="heavy">Heavy (AC 15, Strong, Tough)</option>
                    <option value="energy">Energy (AC 15, Strong, Tough)</option>
                    <option value="helmet">Helmet (+1 AC, anyone)</option>
                    <option value="shield">Shield (+2 AC, anyone)</option>
                  </select>
                  <div className="text-xs text-gray-400 mt-1">
                    Determines which archetypes can wear this. Clever & Wise cannot wear armor.
                  </div>
                </div>
              )}

              {/* Allows DEX Modifier (for armor) */}
              {formData.category === 'armor' && formData.armor_type && !['helmet', 'shield'].includes(formData.armor_type) && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Allows DEX Modifier?
                  </label>
                  <select
                    value={formData.allows_dex_modifier}
                    onChange={(e) => setFormData({ ...formData, allows_dex_modifier: e.target.value })}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  >
                    <option value="true">Yes (Light/Medium)</option>
                    <option value="false">No (Heavy/Energy)</option>
                  </select>
                  <div className="text-xs text-gray-400 mt-1">
                    Heavy/Energy armor doesn't add DEX to AC
                  </div>
                </div>
              )}

              {/* Properties */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Properties
                </label>
                <input
                  type="text"
                  value={formData.properties}
                  onChange={(e) => setFormData({ ...formData, properties: e.target.value })}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  placeholder="e.g., EC, AP, 2H (comma separated)"
                />
                <div className="text-xs text-gray-400 mt-1">
                  Common: 2H (Two-Handed), 1H (One-Hand), EC (Energy Cell), AP (Armor Piercing), 
                  Bl (Blast), Am (Ammo), R (Repeating), Th (Thrown), V (Versatile)
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
                  placeholder="Describe what this item does and how it works..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
              >
                ✓ Create Item
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded font-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Custom Items List */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Your Custom Items</h3>
        
        {customItems.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-lg mb-2">No custom items yet</p>
            <p className="text-sm">Click "Create New Item" to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {customItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Item Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{item.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-600">
                        {item.category}
                      </span>
                      {item.subcategory && (
                        <span className="text-xs px-2 py-0.5 rounded bg-gray-600">
                          {item.subcategory}
                        </span>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-3">
                      {item.cost !== null && (
                        <div>
                          <span className="text-gray-400">Cost:</span>
                          <span className="text-yellow-400 ml-1">{item.cost}cr</span>
                        </div>
                      )}
                      {item.weight !== null && (
                        <div>
                          <span className="text-gray-400">Weight:</span>
                          <span className="text-white ml-1">
                            {item.weight === 0 ? 'FREE' : 
                             item.weight < 1 ? `${item.weight} (2/slot)` : 
                             item.weight}
                          </span>
                        </div>
                      )}
                      {item.damage && (
                        <div>
                          <span className="text-gray-400">Damage:</span>
                          <span className="text-red-400 ml-1">{item.damage}</span>
                        </div>
                      )}
                      {item.range && (
                        <div>
                          <span className="text-gray-400">Range:</span>
                          <span className="text-blue-400 ml-1">{item.range}</span>
                        </div>
                      )}
                      {item.weapon_type && (
                        <div>
                          <span className="text-gray-400">Type:</span>
                          <span className="text-white ml-1 capitalize">{item.weapon_type}</span>
                        </div>
                      )}
                      {item.weapon_weight_class !== undefined && item.weapon_type && (
                        <div>
                          <span className="text-gray-400">Weight:</span>
                          <span className="text-white ml-1 capitalize">
                            {item.weapon_weight_class || 'Standard'}
                          </span>
                        </div>
                      )}
                      {item.armor_type && (
                        <div>
                          <span className="text-gray-400">Armor:</span>
                          <span className="text-white ml-1 capitalize">{item.armor_type}</span>
                        </div>
                      )}
                      {item.ac_bonus && (
                        <div>
                          <span className="text-gray-400">AC:</span>
                          <span className="text-green-400 ml-1">{item.ac_bonus}</span>
                        </div>
                      )}
                      {item.hands_required && item.hands_required > 1 && (
                        <div>
                          <span className="text-gray-400">Hands:</span>
                          <span className="text-white ml-1">{item.hands_required}H</span>
                        </div>
                      )}
                    </div>

                    {/* Archetype Restrictions */}
                    {(item.weapon_type || item.armor_type) && (
                      <div className="mb-3 p-2 bg-gray-800 rounded border border-gray-600">
                        <div className="text-xs font-semibold text-gray-400 mb-1">Usable By:</div>
                        <div className="text-xs text-gray-300">
                          {item.weapon_type && (
                            <>
                              {item.weapon_type === 'melee' && (
                                <>
                                  {item.weapon_weight_class === 'light' && 'Quick, Clever, Wise, Charming, Strong'}
                                  {item.weapon_weight_class === null && 'Strong only'}
                                  {item.weapon_weight_class === '' && 'Strong only'}
                                  {item.weapon_weight_class === 'heavy' && 'Tough only'}
                                </>
                              )}
                              {item.weapon_type === 'ranged' && (
                                <>
                                  {item.weapon_weight_class === 'light' && (
                                    item.subcategory?.toLowerCase().includes('pistol') || item.subcategory?.toLowerCase().includes('blaster')
                                      ? 'Quick, Clever, Charming'
                                      : 'Quick, Clever'
                                  )}
                                  {(item.weapon_weight_class === null || item.weapon_weight_class === '') && (
                                    item.subcategory?.toLowerCase().includes('pistol') || item.subcategory?.toLowerCase().includes('blaster')
                                      ? 'Charming'
                                      : 'Strong only'
                                  )}
                                  {item.weapon_weight_class === 'heavy' && (
                                    item.subcategory?.toLowerCase().includes('pistol') || item.subcategory?.toLowerCase().includes('blaster')
                                      ? 'Charming, Tough'
                                      : 'Tough only'
                                  )}
                                </>
                              )}
                            </>
                          )}
                          {item.armor_type && (
                            <>
                              {item.armor_type === 'light' && 'Quick, Charming, Strong, Tough'}
                              {item.armor_type === 'medium' && 'Strong, Tough'}
                              {item.armor_type === 'heavy' && 'Strong, Tough'}
                              {item.armor_type === 'energy' && 'Strong, Tough'}
                              {item.armor_type === 'helmet' && 'All archetypes'}
                              {item.armor_type === 'shield' && 'All archetypes'}
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    {item.description && (
                      <p className="text-sm text-gray-300">{item.description}</p>
                    )}

                    {/* Properties with Tooltips */}
                    {item.properties && (
                      <div className="mb-3">
                        <PropertiesDisplay properties={item.properties} />
                      </div>
                    )}

                    {/* Usage Info */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className={`${
                        parseInt(item.usage_count) > 0 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {parseInt(item.usage_count) > 0 ? (
                          <>
                            ⚠️ In use by {item.usage_count} character(s)
                          </>
                        ) : (
                          <>
                            ✓ Not in use
                          </>
                        )}
                      </div>
                      
                      {item.used_by_characters && item.used_by_characters.length > 0 && (
                        <div className="text-gray-400">
                          ({item.used_by_characters.join(', ')})
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteItem(item.id, item.name)}
                    disabled={parseInt(item.usage_count) > 0}
                    className={`ml-4 px-4 py-2 rounded font-bold transition ${
                      parseInt(item.usage_count) > 0
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                    title={
                      parseInt(item.usage_count) > 0
                        ? 'Cannot delete - remove from all inventories first'
                        : 'Delete this custom item'
                    }
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {customItems.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-600">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-700 rounded p-3">
                <div className="text-2xl font-bold text-white">{customItems.length}</div>
                <div className="text-xs text-gray-400">Total Custom Items</div>
              </div>
              <div className="bg-gray-700 rounded p-3">
                <div className="text-2xl font-bold text-green-400">
                  {customItems.filter(item => parseInt(item.usage_count) === 0).length}
                </div>
                <div className="text-xs text-gray-400">Can Be Deleted</div>
              </div>
              <div className="bg-gray-700 rounded p-3">
                <div className="text-2xl font-bold text-yellow-400">
                  {customItems.filter(item => parseInt(item.usage_count) > 0).length}
                </div>
                <div className="text-xs text-gray-400">In Use</div>
              </div>
              <div className="bg-gray-700 rounded p-3">
                <div className="text-2xl font-bold text-blue-400">
                  {customItems.reduce((sum, item) => sum + parseInt(item.usage_count), 0)}
                </div>
                <div className="text-xs text-gray-400">Total Uses</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomItemsManager;
