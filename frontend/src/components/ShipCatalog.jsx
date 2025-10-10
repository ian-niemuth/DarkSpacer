import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../config/api';
import { API_URL as BASE_API_URL } from '../config/api';

const API_URL = `${BASE_API_URL}/ships`;

function ShipCatalog() {
  const [components, setComponents] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [armor, setArmor] = useState([]);
  const [enhancements, setEnhancements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('components');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // for components: 'all', 'system', 'feature'

  useEffect(() => {
    fetchAllCatalogData();
  }, []);

  const fetchAllCatalogData = async () => {
    try {
      const [componentsRes, weaponsRes, armorRes, enhancementsRes] = await Promise.all([
        api.get(`${API_URL}/templates/components`),
        api.get(`${API_URL}/templates/weapons`),
        api.get(`${API_URL}/templates/armor`),
        api.get(`${API_URL}/templates/enhancements`)
      ]);

      setComponents(componentsRes.data);
      setWeapons(weaponsRes.data);
      setArmor(armorRes.data);
      setEnhancements(enhancementsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching catalog data:', error);
      setLoading(false);
    }
  };

  const filterItems = (items) => {
    let filtered = items;

    // Apply type filter for components
    if (activeCategory === 'components' && filterType !== 'all') {
      filtered = filtered.filter(item => item.component_type === filterType);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-white">Loading ship catalog...</div>
      </div>
    );
  }

  const getCurrentItems = () => {
    switch (activeCategory) {
      case 'components': return filterItems(components);
      case 'weapons': return filterItems(weapons);
      case 'armor': return filterItems(armor);
      case 'enhancements': return filterItems(enhancements);
      default: return [];
    }
  };

  const currentItems = getCurrentItems();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link to="/" className="text-blue-400 hover:text-blue-300">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-purple-900 bg-opacity-20 border border-purple-600 rounded-lg p-4 mb-6">
        <h1 className="text-3xl font-bold text-white">🚀 Ship Catalog</h1>
        <p className="text-gray-300 mt-2">
          Browse all available ship components, weapons, armor, and enhancements
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white rounded px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Component Type Filter (only for components category) */}
          {activeCategory === 'components' && (
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-gray-700 text-white rounded px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="system">System Only</option>
                <option value="feature">Feature Only</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 mb-6">
        <div className="flex border-b border-gray-700 overflow-x-auto">
          <CategoryTab
            active={activeCategory === 'components'}
            onClick={() => { setActiveCategory('components'); setFilterType('all'); }}
            label={`🔧 Components (${components.length})`}
          />
          <CategoryTab
            active={activeCategory === 'weapons'}
            onClick={() => setActiveCategory('weapons')}
            label={`⚔️ Weapons (${weapons.length})`}
          />
          <CategoryTab
            active={activeCategory === 'armor'}
            onClick={() => setActiveCategory('armor')}
            label={`🛡️ Armor (${armor.length})`}
          />
          <CategoryTab
            active={activeCategory === 'enhancements'}
            onClick={() => setActiveCategory('enhancements')}
            label={`⬆️ Enhancements (${enhancements.length})`}
          />
        </div>

        {/* Items Grid */}
        <div className="p-6">
          {currentItems.length === 0 ? (
            <div className="text-gray-400 text-center py-8">
              No items found matching your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentItems.map((item) => (
                <ItemCard key={item.id} item={item} category={activeCategory} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Components" value={components.length} icon="🔧" />
        <StatCard label="Weapons" value={weapons.length} icon="⚔️" />
        <StatCard label="Armor Types" value={armor.length} icon="🛡️" />
        <StatCard label="Enhancements" value={enhancements.length} icon="⬆️" />
      </div>
    </div>
  );
}

// Category Tab Component
function CategoryTab({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-bold whitespace-nowrap ${
        active
          ? 'bg-gray-700 text-white border-b-2 border-purple-500'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

// Item Card Component
function ItemCard({ item, category }) {
  const [expanded, setExpanded] = useState(false);

  const renderItemDetails = () => {
    switch (category) {
      case 'components':
        return (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-0.5 rounded ${
                item.component_type === 'system' ? 'bg-blue-600' : 'bg-green-600'
              }`}>
                {item.component_type?.toUpperCase()}
              </span>
              {item.can_be_advanced && (
                <span className="text-xs px-2 py-0.5 rounded bg-purple-600">
                  CAN BE ADVANCED
                </span>
              )}
            </div>
            <div className="text-sm space-y-1 mb-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Initial Cost:</span>
                <span className="text-yellow-400 font-bold">{item.initial_cost}cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Maintenance:</span>
                <span className="text-yellow-400">{item.maintenance_cost}cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Slots Required:</span>
                <span className="text-white">{item.slots_required}</span>
              </div>
            </div>
          </>
        );

      case 'weapons':
        return (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded bg-red-600">
                {item.category}
              </span>
              {item.is_single_use && (
                <span className="text-xs px-2 py-0.5 rounded bg-orange-600">
                  SINGLE USE
                </span>
              )}
            </div>
            <div className="text-sm space-y-1 mb-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Cost:</span>
                <span className="text-yellow-400 font-bold">{item.cost}cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Damage:</span>
                <span className="text-red-400">{item.damage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Range:</span>
                <span className="text-blue-400">{item.range === 'N' ? 'Near' : 'Far'}</span>
              </div>
              {item.requires_ammo && (
                <div className="text-xs text-yellow-300">⚠️ Requires Ammo</div>
              )}
              {item.requires_energy_generator && (
                <div className="text-xs text-blue-300">⚡ Requires Energy Generator</div>
              )}
            </div>
            {item.properties && expanded && (
              <div className="text-xs text-gray-400 mb-2">
                <div className="font-bold mb-1">Properties:</div>
                <div className="text-blue-300">
                  {typeof item.properties === 'string' 
                    ? item.properties 
                    : JSON.stringify(item.properties, null, 2)}
                </div>
              </div>
            )}
          </>
        );

      case 'armor':
        return (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded bg-blue-600">
                {item.category}
              </span>
              {item.uses_system_slot && (
                <span className="text-xs px-2 py-0.5 rounded bg-yellow-600">
                  USES SLOT
                </span>
              )}
            </div>
            <div className="text-sm space-y-1 mb-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Cost:</span>
                <span className="text-yellow-400 font-bold">{item.cost}cr</span>
              </div>
              {item.ac_formula && (
                <div className="flex justify-between">
                  <span className="text-gray-400">AC Formula:</span>
                  <span className="text-blue-300 font-mono text-xs">{item.ac_formula}</span>
                </div>
              )}
              {item.ac_bonus > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-400">AC Bonus:</span>
                  <span className="text-green-400">+{item.ac_bonus}</span>
                </div>
              )}
              {item.uses_system_slot && (
                <div className="flex justify-between">
                  <span className="text-gray-400">System Slots:</span>
                  <span className="text-white">{item.system_slots_required}</span>
                </div>
              )}
              <div className="text-xs text-gray-400">
                DEX Modifier: {item.dex_modifier_effect}
              </div>
            </div>
          </>
        );

      case 'enhancements':
        return (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-0.5 rounded ${
                item.enhancement_type === 'system' ? 'bg-blue-600' : 'bg-green-600'
              }`}>
                {item.enhancement_type?.toUpperCase()}
              </span>
            </div>
            <div className="text-sm space-y-1 mb-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Cost:</span>
                <span className="text-yellow-400 font-bold">{item.cost}cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Slots Required:</span>
                <span className="text-white">{item.slots_required}</span>
              </div>
            </div>
            {item.benefit && expanded && (
              <div className="text-sm text-green-300 mb-2">
                <div className="font-bold text-xs text-gray-400 mb-1">Benefit:</div>
                {item.benefit}
              </div>
            )}
            {item.drawback && expanded && (
              <div className="text-sm text-red-300 mb-2">
                <div className="font-bold text-xs text-gray-400 mb-1">Drawback:</div>
                {item.drawback}
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
      <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
      
      {renderItemDetails()}

      {/* Description */}
      {item.description && (
        <div className="text-sm text-gray-300 mb-3 border-t border-gray-600 pt-3">
          <div className={`${!expanded && 'line-clamp-2'}`}>
            {item.description}
          </div>
        </div>
      )}

      {/* Expand/Collapse Button */}
      {item.description && item.description.length > 100 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-blue-400 hover:text-blue-300"
        >
          {expanded ? '▲ Show Less' : '▼ Show More'}
        </button>
      )}
    </div>
  );
}

// Stat Card Component
function StatCard({ label, value, icon }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-400">{label}</div>
          <div className="text-2xl font-bold text-white">{value}</div>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}

export default ShipCatalog;
