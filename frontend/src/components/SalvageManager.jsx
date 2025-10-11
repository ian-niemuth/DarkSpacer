import { useState, useEffect } from 'react';
import { api, API_URL } from '../config/api';

function SalvageManager() {
  const [selectedTier, setSelectedTier] = useState('0-3');
  const [salvageItems, setSalvageItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [rollFilter, setRollFilter] = useState('');
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionResult, setActionResult] = useState('');
  const [showGiveModal, setShowGiveModal] = useState(null); // { salvageId, itemName }
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [quantity, setQuantity] = useState(1);

  const tiers = ['0-3', '4-6', '7-9', '10+'];

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    if (selectedTier) {
      fetchSalvageItems(selectedTier);
    }
  }, [selectedTier]);

  useEffect(() => {
    filterItems();
  }, [salvageItems, rollFilter]);

  const fetchCharacters = async () => {
    try {
      const response = await api.get(`${API_URL}/admin/characters`);
      setCharacters(response.data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const fetchSalvageItems = async (tier) => {
    setLoading(true);
    try {
      const response = await api.get(`${API_URL}/salvage/tier/${tier}`);
      setSalvageItems(response.data);
    } catch (error) {
      console.error('Error fetching salvage items:', error);
      setActionResult('Failed to load salvage items');
      setTimeout(() => setActionResult(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    if (!rollFilter || rollFilter === '') {
      setFilteredItems(salvageItems);
      return;
    }

    const roll = parseInt(rollFilter);
    if (isNaN(roll) || roll < 1 || roll > 100) {
      setFilteredItems(salvageItems);
      return;
    }

    const filtered = salvageItems.filter(
      item => item.roll_min <= roll && item.roll_max >= roll
    );
    setFilteredItems(filtered);
  };

  const handleGiveSalvage = async () => {
    if (!selectedCharacter || !showGiveModal) return;

    try {
      const response = await api.post(`${API_URL}/salvage/give`, {
        characterId: parseInt(selectedCharacter),
        salvageId: showGiveModal.salvageId,
        quantity: parseInt(quantity)
      });

      setActionResult(`✅ ${response.data.message}`);
      setShowGiveModal(null);
      setSelectedCharacter('');
      setQuantity(1);
      setTimeout(() => setActionResult(''), 3000);
    } catch (error) {
      console.error('Error giving salvage:', error);
      const errorMsg = error.response?.data?.error || error.message || 'Failed to give salvage';
      setActionResult(`❌ ${errorMsg}`);
      setTimeout(() => setActionResult(''), 5000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-2">🔧 Salvage Manager</h2>
        <p className="text-gray-400 text-sm">
          Browse salvage tables by tier and give items to characters
        </p>
      </div>

      {actionResult && (
        <div className={`px-6 py-3 rounded-lg ${
          actionResult.startsWith('✅')
            ? 'bg-green-600 text-white'
            : 'bg-red-600 text-white'
        }`}>
          {actionResult}
        </div>
      )}

      {/* Tier Selection */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div className="flex flex-wrap gap-2 mb-4">
          {tiers.map(tier => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-4 py-2 rounded font-bold transition ${
                selectedTier === tier
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Tier {tier}
            </button>
          ))}
        </div>

        {/* Roll Filter */}
        <div className="flex gap-2 items-center">
          <label className="text-sm text-gray-400 whitespace-nowrap">
            Filter by d100 Roll:
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={rollFilter}
            onChange={(e) => setRollFilter(e.target.value)}
            placeholder="1-100"
            className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none w-32"
          />
          {rollFilter && (
            <button
              onClick={() => setRollFilter('')}
              className="text-gray-400 hover:text-white text-sm"
            >
              Clear
            </button>
          )}
          <span className="text-gray-500 text-sm ml-auto">
            Showing {filteredItems.length} of {salvageItems.length} items
          </span>
        </div>
      </div>

      {/* Salvage Items Table */}
      {loading ? (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center text-gray-400">
          Loading salvage items...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center text-gray-400">
          No salvage items found
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 border-b border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase">
                    Roll
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase">
                    Item
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-400 uppercase">
                    Value
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-gray-400 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-750 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-300 whitespace-nowrap">
                      {item.roll_min === item.roll_max
                        ? item.roll_min.toString().padStart(2, '0')
                        : `${item.roll_min.toString().padStart(2, '0')}-${item.roll_max.toString().padStart(2, '0')}`
                      }
                    </td>
                    <td className="px-4 py-3 text-sm text-white">
                      {item.item_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-yellow-400 text-right font-semibold">
                      {item.value} cr
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setShowGiveModal({
                          salvageId: item.id,
                          itemName: item.item_name,
                          value: item.value
                        })}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-bold"
                      >
                        Give to Player
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Give Salvage Modal */}
      {showGiveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">🔧 Give Salvage</h2>

            <div className="mb-4 p-3 bg-gray-900 rounded border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Item:</div>
              <div className="text-white font-semibold">{showGiveModal.itemName}</div>
              <div className="text-yellow-400 text-sm mt-1">{showGiveModal.value} cr</div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                Select Character
              </label>
              <select
                value={selectedCharacter}
                onChange={(e) => setSelectedCharacter(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="">-- Select a character --</option>
                {characters.map(char => (
                  <option key={char.id} value={char.id}>
                    {char.name} (Lv{char.level} {char.archetype})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleGiveSalvage}
                disabled={!selectedCharacter}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded font-bold"
              >
                Give Item
              </button>
              <button
                onClick={() => {
                  setShowGiveModal(null);
                  setSelectedCharacter('');
                  setQuantity(1);
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded"
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

export default SalvageManager;
