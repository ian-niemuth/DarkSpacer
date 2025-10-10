// frontend/src/components/AdminInventoryPanel.jsx
// New component for managing character inventory

import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

function AdminInventoryPanel({ character, onClose, onUpdate }) {
  const [gearDatabase, setGearDatabase] = useState([]);
  const [filteredGear, setFilteredGear] = useState([]);
  const [characterInventory, setCharacterInventory] = useState([]);
  const [inventoryInfo, setInventoryInfo] = useState({ slotsUsed: 0, maxSlots: 10, percentFull: 0 });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customItem, setCustomItem] = useState({
    name: '',
    category: 'gear',
    subcategory: '',
    cost: 0,
    weight: 1,
    damage: '',
    range: '',
    properties: '',
    description: '',
    weapon_type: null,
    weapon_weight_class: null,
    armor_type: null,
    hands_required: 1,
    allows_dex_modifier: true
  });

  const categories = ['all', 'weapon', 'armor', 'gear', 'consumable'];

  useEffect(() => {
    fetchGearDatabase();
    fetchCharacterInventory();
  }, [character.id]);

  useEffect(() => {
    filterGear();
  }, [searchTerm, categoryFilter, gearDatabase]);

  const fetchGearDatabase = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/inventory/gear-database`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGearDatabase(response.data);
    } catch (error) {
      console.error('Error fetching gear database:', error);
    }
  };

  const fetchCharacterInventory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/inventory/${character.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCharacterInventory(response.data.inventory);
      setInventoryInfo({
        slotsUsed: response.data.slotsUsed,
        maxSlots: response.data.maxSlots,
        percentFull: response.data.percentFull
      });
    } catch (error) {
      console.error('Error fetching character inventory:', error);
    }
  };

  const filterGear = () => {
    let filtered = gearDatabase;

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredGear(filtered);
  };

  const handleGiveItem = async () => {
    if (!selectedItem) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/inventory/give-item/${character.id}`,
        { itemName: selectedItem.name, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert(`Gave ${quantity}× ${selectedItem.name} to ${character.name}`);
      setSelectedItem(null);
      setQuantity(1);
      fetchCharacterInventory();
      onUpdate();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to give item');
    }
  };

  const handleRemoveItem = async (itemId, itemName, currentQuantity) => {
    const removeQty = prompt(`How many ${itemName} to remove? (Max: ${currentQuantity})`, '1');
    if (!removeQty) return;

    const qty = parseInt(removeQty);
    if (isNaN(qty) || qty < 1 || qty > currentQuantity) {
      alert('Invalid quantity');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${API_URL}/inventory/remove-item/${character.id}/${itemId}`,
        { 
          data: { quantity: qty },
          headers: { Authorization: `Bearer ${token}` } 
        }
      );
      
      alert(`Removed ${qty}× ${itemName}`);
      fetchCharacterInventory();
      onUpdate();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to remove item');
    }
  };

  const handleAddCustomItem = async (e) => {
    e.preventDefault();
    
    // DEBUG: Log what we're sending
    console.log('Sending custom item data:', customItem);
    
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/inventory/custom-item`,
        customItem,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert(`Custom item "${customItem.name}" added to database`);
      setShowCustomForm(false);
      setCustomItem({
        name: '',
        category: 'gear',
        subcategory: '',
        cost: 0,
        weight: 1,
        damage: '',
        range: '',
        properties: '',
        description: '',
        weapon_type: null,
        weapon_weight_class: null,
        armor_type: null,
        hands_required: 1,
        allows_dex_modifier: true
      });
      fetchGearDatabase();
    } catch (error) {
      console.error('Error creating custom item:', error);
      const errorMessage = error.response?.data?.details || error.response?.data?.error || 'Failed to add custom item';
      alert(`Error: ${errorMessage}`);
    }
  };

  const getSlotColor = () => {
    if (inventoryInfo.percentFull >= 100) return 'text-red-400';
    if (inventoryInfo.percentFull >= 80) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            Inventory Manager: {character.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* Inventory Status */}
        <div className="mb-6 p-4 bg-gray-700 rounded">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-bold">Inventory Capacity</span>
            <span className={`font-bold ${getSlotColor()}`}>
              {inventoryInfo.slotsUsed} / {inventoryInfo.maxSlots} slots
            </span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all ${
                inventoryInfo.percentFull >= 100 ? 'bg-red-500' :
                inventoryInfo.percentFull >= 80 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(inventoryInfo.percentFull, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Based on STR {inventoryInfo.maxSlots}. FREE items don't count.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: Give Items */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Give Items</h3>
            
            {/* Search and Filter */}
            <div className="mb-4 space-y-2">
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded"
              />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Gear List */}
            <div className="bg-gray-700 rounded p-3 max-h-96 overflow-y-auto space-y-2">
              {filteredGear.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-3 rounded cursor-pointer transition ${
                    selectedItem?.id === item.id
                      ? 'bg-blue-600'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-xs text-gray-300">
                        {item.cost}cr • {item.weight === 0 ? 'FREE' : `${item.weight} slots`}
                        {item.damage && ` • ${item.damage} damage`}
                        {item.range && ` • ${item.range} range`}
                      </div>
                      {item.properties && (
                        <div className="text-xs text-blue-300 mt-1">
                          {item.properties}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Give Item Form */}
            {selectedItem && (
              <div className="mt-4 p-4 bg-gray-700 rounded">
                <h4 className="text-white font-bold mb-2">{selectedItem.name}</h4>
                <p className="text-sm text-gray-300 mb-3">{selectedItem.description}</p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-20 px-3 py-2 bg-gray-600 text-white rounded"
                  />
                  <button
                    onClick={handleGiveItem}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                  >
                    Give Item
                  </button>
                </div>
              </div>
            )}

            {/* Custom Item Button */}
            <button
              onClick={() => setShowCustomForm(!showCustomForm)}
              className="mt-4 w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
            >
              {showCustomForm ? 'Cancel' : '+ Add Custom Item'}
            </button>

            {/* Custom Item Form */}
            {showCustomForm && (
              <form onSubmit={handleAddCustomItem} className="mt-4 p-4 bg-gray-700 rounded space-y-2">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={customItem.name}
                  onChange={(e) => setCustomItem({...customItem, name: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-600 text-white rounded"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={customItem.category}
                    onChange={(e) => {
                      const newCategory = e.target.value;
                      setCustomItem({
                        ...customItem, 
                        category: newCategory,
                        // Reset type-specific fields when category changes
                        weapon_type: newCategory === 'weapon' ? customItem.weapon_type : null,
                        weapon_weight_class: newCategory === 'weapon' ? customItem.weapon_weight_class : null,
                        armor_type: newCategory === 'armor' ? customItem.armor_type : null,
                      });
                    }}
                    className="px-3 py-2 bg-gray-600 text-white rounded"
                  >
                    <option value="gear">Gear</option>
                    <option value="weapon">Weapon</option>
                    <option value="armor">Armor</option>
                    <option value="consumable">Consumable</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Cost (cr)"
                    value={customItem.cost}
                    onChange={(e) => setCustomItem({...customItem, cost: parseInt(e.target.value) || 0})}
                    className="px-3 py-2 bg-gray-600 text-white rounded"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    step="0.5"
                    placeholder="Weight"
                    value={customItem.weight}
                    onChange={(e) => setCustomItem({...customItem, weight: parseFloat(e.target.value) || 1})}
                    className="px-3 py-2 bg-gray-600 text-white rounded"
                  />
                  <input
                    type="text"
                    placeholder="Damage"
                    value={customItem.damage}
                    onChange={(e) => setCustomItem({...customItem, damage: e.target.value})}
                    className="px-3 py-2 bg-gray-600 text-white rounded"
                  />
                  <input
                    type="text"
                    placeholder="Range"
                    value={customItem.range}
                    onChange={(e) => setCustomItem({...customItem, range: e.target.value})}
                    className="px-3 py-2 bg-gray-600 text-white rounded"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Properties (e.g., EC, 2H, Th)"
                  value={customItem.properties}
                  onChange={(e) => setCustomItem({...customItem, properties: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-600 text-white rounded"
                />
                
                {/* Weapon-specific fields */}
                {customItem.category === 'weapon' && (
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={customItem.weapon_type || ''}
                      onChange={(e) => setCustomItem({...customItem, weapon_type: e.target.value || null})}
                      className="px-3 py-2 bg-gray-600 text-white rounded"
                      required
                    >
                      <option value="">Weapon Type *</option>
                      <option value="melee">Melee</option>
                      <option value="ranged">Ranged</option>
                    </select>
                    <select
                      value={customItem.weapon_weight_class === null ? 'standard' : customItem.weapon_weight_class}
                      onChange={(e) => setCustomItem({...customItem, weapon_weight_class: e.target.value === 'standard' ? null : e.target.value})}
                      className="px-3 py-2 bg-gray-600 text-white rounded"
                      required
                    >
                      <option value="">Weight Class *</option>
                      <option value="light">Light</option>
                      <option value="standard">Standard</option>
                      <option value="heavy">Heavy</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Hands Required"
                      value={customItem.hands_required}
                      onChange={(e) => setCustomItem({...customItem, hands_required: parseInt(e.target.value) || 1})}
                      className="px-3 py-2 bg-gray-600 text-white rounded"
                      min="1"
                      max="2"
                    />
                  </div>
                )}
                
                {/* Armor-specific fields */}
                {customItem.category === 'armor' && (
                  <select
                    value={customItem.armor_type || ''}
                    onChange={(e) => setCustomItem({...customItem, armor_type: e.target.value || null})}
                    className="w-full px-3 py-2 bg-gray-600 text-white rounded"
                    required
                  >
                    <option value="">Armor Type *</option>
                    <option value="light">Light (AC 11)</option>
                    <option value="medium">Medium (AC 13)</option>
                    <option value="heavy">Heavy (AC 15)</option>
                    <option value="energy">Energy (AC 15)</option>
                    <option value="helmet">Helmet (+1 AC)</option>
                    <option value="shield">Shield (+2 AC)</option>
                  </select>
                )}
                
                <textarea
                  placeholder="Description"
                  value={customItem.description}
                  onChange={(e) => setCustomItem({...customItem, description: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-600 text-white rounded"
                  rows="2"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
                >
                  Add to Database
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Current Inventory */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Current Inventory</h3>
            
            <div className="bg-gray-700 rounded p-3 max-h-[600px] overflow-y-auto space-y-2">
              {characterInventory.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No items in inventory</p>
              ) : (
                characterInventory.map(item => (
                  <div key={item.id} className="p-3 bg-gray-600 rounded">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-bold text-white">
                          {item.item_name} ×{item.quantity}
                        </div>
                        <div className="text-xs text-gray-300">
                          Weight: {item.actual_weight === 0 ? 'FREE' : 
                                   item.actual_weight < 1 ? '0.5 (2 per slot)' : 
                                   item.actual_weight} slots each
                        </div>
                        {item.damage && (
                          <div className="text-xs text-gray-300">
                            {item.damage} damage • {item.range} range
                          </div>
                        )}
                        {item.full_properties && (
                          <div className="text-xs text-blue-300 mt-1">
                            {item.full_properties}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.item_name, item.quantity)}
                        className="ml-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminInventoryPanel;