import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { API_URL, WS_URL } from '../config/api';

/**
 * Ship Cargo Management Tab
 * Works for both Admin and Player views
 */
function ShipCargoTab({ 
  ship, 
  isAdmin = false, 
  onUpdate, 
  showSuccess, 
  showError 
}) {
  const [cargo, setCargo] = useState([]);
  const [cargoStats, setCargoStats] = useState({
    cargo_used: 0,
    cargo_available: 0,
    cargo_capacity: ship.cargo_capacity || 10
  });
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  // For loading/unloading
  const [userCharacters, setUserCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characterInventory, setCharacterInventory] = useState([]);

  // For quantity modals
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [quantityModalData, setQuantityModalData] = useState(null);

  // For admin: add item directly
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [gearDatabase, setGearDatabase] = useState([]);

  // For admin: adjust capacity
  const [showAdjustCapacity, setShowAdjustCapacity] = useState(false);
  const [newCapacity, setNewCapacity] = useState(ship.cargo_capacity || 10);

  // Socket.io connection for real-time updates
  useEffect(() => {
    const newSocket = io(WS_URL);
    setSocket(newSocket);

    newSocket.emit('join_ship_room', ship.id);

    newSocket.on('ship_updated', (data) => {
      // Cargo updated - refresh cargo list
      fetchCargo();
    });

    return () => {
      newSocket.emit('leave_ship_room', ship.id);
      newSocket.disconnect();
    };
  }, [ship.id]);

  useEffect(() => {
    fetchCargo();
    if (!isAdmin) {
      fetchUserCharacters();
    } else {
      fetchGearDatabase();
    }
  }, [ship.id]);

  useEffect(() => {
    if (selectedCharacter) {
      fetchCharacterInventory(selectedCharacter);
    }
  }, [selectedCharacter]);

  const fetchCargo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/ships/${ship.id}/cargo`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setCargo(response.data.cargo || []);
      setCargoStats({
        cargo_used: response.data.ship.cargo_used,
        cargo_available: response.data.ship.cargo_available,
        cargo_capacity: response.data.ship.cargo_capacity
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cargo:', error);
      showError(error.response?.data?.error || 'Failed to fetch cargo');
      setCargo([]);
      setLoading(false);
    }
  };

  const fetchUserCharacters = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/characters`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // SECURITY: Only show characters owned by this user
      setUserCharacters(response.data);
      if (response.data.length > 0) {
        setSelectedCharacter(response.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const fetchCharacterInventory = async (characterId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/inventory/${characterId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // API returns { inventory: [...], slotsUsed, maxSlots, ... }
      setCharacterInventory(response.data.inventory || []);
    } catch (error) {
      console.error('Error fetching character inventory:', error);
      setCharacterInventory([]);
    }
  };

  const fetchGearDatabase = async () => {
    try {
      const response = await axios.get(`${API_URL}/equipment/all`);
      setGearDatabase(response.data);
    } catch (error) {
      console.error('Error fetching gear database:', error);
    }
  };

  // ============================================
  // LOAD CARGO (Character → Ship)
  // ============================================
  const handleLoadCargo = async (itemId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      const item = characterInventory.find(i => i.id === itemId);
      
      if (!selectedCharacter) {
        showError('Please select a character');
        return;
      }

      // Parse quantity as integer to avoid "1.00" error
      const qty = parseInt(quantity);
      if (isNaN(qty) || qty <= 0) {
        showError('Invalid quantity');
        return;
      }

      await axios.post(
        `${API_URL}/ships/${ship.id}/cargo/load`,
        {
          characterId: selectedCharacter,
          itemId,
          quantity: qty
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showSuccess(`Loaded ${qty}× ${item.item_name} onto ${ship.name}`);
      fetchCargo();
      fetchCharacterInventory(selectedCharacter);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error loading cargo:', error);
      showError(error.response?.data?.error || 'Failed to load cargo');
    }
  };

  // ============================================
  // UNLOAD CARGO (Ship → Character)
  // ============================================
  const handleUnloadCargo = async (cargoItemId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      const item = cargo.find(i => i.id === cargoItemId);
      
      if (!selectedCharacter) {
        showError('Please select a character');
        return;
      }

      // Parse quantity as integer
      const qty = parseInt(quantity);
      if (isNaN(qty) || qty <= 0) {
        showError('Invalid quantity');
        return;
      }

      await axios.post(
        `${API_URL}/ships/${ship.id}/cargo/unload`,
        {
          characterId: selectedCharacter,
          cargoItemId,
          quantity: qty
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showSuccess(`Unloaded ${qty}× ${item.item_name} from ${ship.name}`);
      fetchCargo();
      fetchCharacterInventory(selectedCharacter);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error unloading cargo:', error);
      showError(error.response?.data?.error || 'Failed to unload cargo');
    }
  };

  // ============================================
  // ADMIN: ADD ITEM DIRECTLY TO CARGO
  // ============================================
  const handleAddItemDirectly = async (gearItem, quantity) => {
    try {
      const token = localStorage.getItem('token');
      
      await axios.post(
        `${API_URL}/ships/${ship.id}/cargo/add-direct`,
        {
          item_name: gearItem.name,
          item_type: gearItem.category,
          quantity: parseInt(quantity),
          description: gearItem.description,
          weight: gearItem.weight,
          damage: gearItem.damage,
          range: gearItem.range,
          properties: gearItem.properties
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showSuccess(`Added ${quantity}× ${gearItem.name} to ship cargo`);
      fetchCargo();
      setShowAddItemModal(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error adding item:', error);
      showError(error.response?.data?.error || 'Failed to add item');
    }
  };

  // ============================================
  // ADMIN: REMOVE ITEM FROM CARGO
  // ============================================
  const handleRemoveItem = async (cargoItemId) => {
    const item = cargo.find(i => i.id === cargoItemId);
    if (!confirm(`Remove ${item.quantity}× ${item.item_name} from cargo?`)) return;

    try {
      const token = localStorage.getItem('token');
      
      await axios.delete(
        `${API_URL}/ships/${ship.id}/cargo/${cargoItemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showSuccess(`Removed ${item.item_name} from cargo`);
      fetchCargo();
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error removing item:', error);
      showError(error.response?.data?.error || 'Failed to remove item');
    }
  };

  // ============================================
  // ADMIN: ADJUST CARGO CAPACITY
  // ============================================
  const handleAdjustCapacity = async () => {
    try {
      const token = localStorage.getItem('token');
      
      await axios.put(
        `${API_URL}/ships/${ship.id}`,
        { cargo_capacity: parseInt(newCapacity) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showSuccess(`Updated cargo capacity to ${newCapacity}`);
      fetchCargo();
      setShowAdjustCapacity(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error adjusting capacity:', error);
      showError(error.response?.data?.error || 'Failed to adjust capacity');
    }
  };

  // Open quantity modal
  const openQuantityModal = (type, item) => {
    setQuantityModalData({ type, item });
    setShowQuantityModal(true);
  };

  if (loading) {
    return <div className="text-gray-400">Loading cargo...</div>;
  }

  const capacityPercentage = (cargoStats.cargo_used / cargoStats.cargo_capacity) * 100;

  return (
    <div className="space-y-4">
      {/* Cargo Capacity Bar */}
      <div className="bg-gray-700 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-white">📦 Cargo Hold</h3>
          {isAdmin && (
            <button
              onClick={() => setShowAdjustCapacity(!showAdjustCapacity)}
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
            >
              ⚙️ Adjust Capacity
            </button>
          )}
        </div>
        
        <div className="w-full bg-gray-600 rounded-full h-6 mb-2">
          <div
            className={`h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              capacityPercentage >= 100 ? 'bg-red-500' :
              capacityPercentage >= 75 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
          >
            {capacityPercentage >= 20 && (
              <span className="text-white">
                {cargoStats.cargo_used} / {cargoStats.cargo_capacity}
              </span>
            )}
          </div>
        </div>
        
        <div className="text-sm text-gray-300">
          <span className={capacityPercentage >= 100 ? 'text-red-400' : ''}>
            {cargoStats.cargo_used} weight used
          </span>
          {' • '}
          <span className={capacityPercentage >= 100 ? 'text-red-400' : 'text-green-400'}>
            {cargoStats.cargo_available} available
          </span>
        </div>

        {/* Adjust Capacity Form */}
        {isAdmin && showAdjustCapacity && (
          <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-600">
            <label className="block text-sm text-gray-400 mb-2">
              New Cargo Capacity:
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={newCapacity}
                onChange={(e) => setNewCapacity(e.target.value)}
                className="flex-1 bg-gray-700 text-white px-3 py-2 rounded"
                min="0"
              />
              <button
                onClick={handleAdjustCapacity}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setShowAdjustCapacity(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Current Cargo */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white">Current Cargo ({cargo.length} items)</h3>
            {isAdmin && (
              <button
                onClick={() => setShowAddItemModal(true)}
                className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded font-bold"
              >
                ➕ Add Item
              </button>
            )}
          </div>

          {cargo.length === 0 ? (
            <p className="text-gray-400 text-sm italic">Cargo hold is empty</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {cargo.map((item) => (
                <div key={item.id} className="bg-gray-800 rounded p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-bold text-white">
                        {item.item_name} 
                        <span className="text-gray-400 text-sm ml-2">×{item.quantity}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {item.item_type} • Weight: {item.weight * item.quantity}
                      </div>
                      {item.description && (
                        <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 ml-2">
                      {!isAdmin && (
                        <button
                          onClick={() => openQuantityModal('unload', item)}
                          className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                        >
                          ⬇️ Unload
                        </button>
                      )}
                      {isAdmin && (
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Character Inventory (for loading) */}
        {!isAdmin && (
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="font-bold text-white mb-4">Load Cargo</h3>
            
            {/* Character Selector */}
            {userCharacters.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">
                  Your Character:
                </label>
                <select
                  value={selectedCharacter || ''}
                  onChange={(e) => setSelectedCharacter(parseInt(e.target.value))}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded"
                >
                  {userCharacters.map((char) => (
                    <option key={char.id} value={char.id}>
                      {char.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  You can only load items from your own characters
                </p>
              </div>
            )}

            {/* Character's Inventory */}
            {selectedCharacter && (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {characterInventory.length === 0 ? (
                  <p className="text-gray-400 text-sm italic">Character has no items</p>
                ) : (
                  characterInventory.map((item) => (
                    <div key={item.id} className="bg-gray-800 rounded p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-bold text-white">
                            {item.item_name}
                            <span className="text-gray-400 text-sm ml-2">×{item.quantity}</span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Weight: {item.weight * item.quantity}
                          </div>
                          {item.equipped && (
                            <div className="text-xs text-yellow-400 mt-1">
                              ⚠️ Equipped - unequip first
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => openQuantityModal('load', item)}
                          disabled={item.equipped}
                          className="text-xs bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-2 py-1 rounded ml-2"
                        >
                          ⬆️ Load
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quantity Modal */}
      {showQuantityModal && quantityModalData && (
        <QuantityModal
          item={quantityModalData.item}
          type={quantityModalData.type}
          onConfirm={(qty) => {
            if (quantityModalData.type === 'load') {
              handleLoadCargo(quantityModalData.item.id, qty);
            } else {
              handleUnloadCargo(quantityModalData.item.id, qty);
            }
            setShowQuantityModal(false);
            setQuantityModalData(null);
          }}
          onClose={() => {
            setShowQuantityModal(false);
            setQuantityModalData(null);
          }}
        />
      )}

      {/* Admin: Add Item Modal */}
      {isAdmin && showAddItemModal && (
        <AddItemModal
          gearDatabase={gearDatabase}
          onAdd={handleAddItemDirectly}
          onClose={() => setShowAddItemModal(false)}
        />
      )}
    </div>
  );
}

// ============================================
// QUANTITY MODAL (Pretty replacement for prompt)
// ============================================
function QuantityModal({ item, type, onConfirm, onClose }) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity > 0 && quantity <= item.quantity) {
      onConfirm(quantity);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-600">
        <h2 className="text-xl font-bold text-white mb-4">
          {type === 'load' ? '⬆️ Load Cargo' : '⬇️ Unload Cargo'}
        </h2>
        
        <div className="bg-gray-700 rounded p-3 mb-4">
          <div className="font-bold text-white">{item.item_name}</div>
          <div className="text-sm text-gray-400 mt-1">
            Available: {item.quantity} • Weight: {item.weight} each
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm text-gray-400 mb-2">
            How many to {type}?
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.min(parseInt(e.target.value) || 1, item.quantity))}
            min="1"
            max={item.quantity}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4"
            autoFocus
          />

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              {type === 'load' ? 'Load' : 'Unload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================
// ADMIN: ADD ITEM MODAL
// ============================================
function AddItemModal({ gearDatabase, onAdd, onClose }) {
  const [selectedGear, setSelectedGear] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGear = gearDatabase.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">➕ Add Item to Cargo</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded"
          />
        </div>

        {/* Item List */}
        <div className="mb-4 max-h-64 overflow-y-auto space-y-2">
          {filteredGear.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedGear(item)}
              className={`w-full text-left p-3 rounded transition-colors ${
                selectedGear?.id === item.id
                  ? 'bg-purple-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <div className="font-bold text-white">{item.name}</div>
              <div className="text-xs text-gray-400">
                {item.category} • Weight: {item.weight} • Cost: {item.cost} cr
              </div>
            </button>
          ))}
        </div>

        {/* Selected Item Details */}
        {selectedGear && (
          <div className="bg-gray-700 rounded p-4 mb-4">
            <h3 className="font-bold text-white mb-2">{selectedGear.name}</h3>
            <div className="text-sm text-gray-300 space-y-1">
              <div><span className="text-gray-400">Category:</span> {selectedGear.category}</div>
              <div><span className="text-gray-400">Weight:</span> {selectedGear.weight}</div>
              <div><span className="text-gray-400">Cost:</span> {selectedGear.cost} cr</div>
              {selectedGear.description && (
                <div><span className="text-gray-400">Description:</span> {selectedGear.description}</div>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-2">Quantity:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-gray-600 text-white px-3 py-2 rounded"
                min="1"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => selectedGear && onAdd(selectedGear, quantity)}
            disabled={!selectedGear}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cargo
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShipCargoTab;
