import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../config/api';
import { API_URL as BASE_API_URL } from '../config/api';

const API_URL = `${BASE_API_URL}/equipment`;

function GearCatalog() {
  const [allGear, setAllGear] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'cost', 'category'

  useEffect(() => {
    fetchAllGear();
  }, []);

  const fetchAllGear = async () => {
    try {
      const response = await api.get(`${API_URL}/all`);
      setAllGear(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching gear catalog:', error);
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(allGear.map(item => item.category))];

  const filterAndSortItems = () => {
    let filtered = allGear;

    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'cost':
          return (a.cost || 0) - (b.cost || 0);
        case 'category':
          return (a.category || '').localeCompare(b.category || '');
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  };

  const filteredItems = filterAndSortItems();

  // Group items by category for stats
  const itemsByCategory = allGear.reduce((acc, item) => {
    const cat = item.category || 'Other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-white">Loading gear catalog...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link to="/" className="text-blue-400 hover:text-blue-300">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-purple-900 bg-opacity-20 border border-purple-600 rounded-lg p-4 mb-6">
        <h1 className="text-3xl font-bold text-white">⚔️ Gear Catalog</h1>
        <p className="text-gray-300 mt-2">
          Browse all available equipment, weapons, armor, and items
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search gear by name, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white rounded px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 text-white rounded px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="name">Sort by Name</option>
              <option value="cost">Sort by Cost</option>
              <option value="category">Sort by Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const count = category === 'all' 
              ? allGear.length 
              : itemsByCategory[category] || 0;
            
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded font-bold text-sm transition-colors ${
                  activeCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? 'All Items' : category} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-400 text-sm">
        Showing {filteredItems.length} of {allGear.length} items
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
          <div className="text-gray-400 text-lg">No items found matching your search.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredItems.map((item) => (
            <GearItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Stats Summary */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">📊 Catalog Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <StatCard label="Total Items" value={allGear.length} icon="📦" />
          {Object.entries(itemsByCategory)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 7)
            .map(([category, count]) => (
              <StatCard 
                key={category} 
                label={category} 
                value={count} 
                icon={getCategoryIcon(category)} 
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

// Gear Item Card Component
function GearItemCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  // Parse properties if they're JSON
  const parseProperties = (props) => {
    if (!props) return null;
    try {
      return typeof props === 'string' ? JSON.parse(props) : props;
    } catch (e) {
      return props;
    }
  };

  const properties = parseProperties(item.properties);

  return (
    <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-bold text-white flex-1">{item.name}</h3>
        <div className="text-right">
          <div className="text-yellow-400 font-bold">{item.cost || 0}cr</div>
        </div>
      </div>

      {/* Category Badge */}
      <div className="flex items-center gap-2 mb-3">
        {item.category && (
          <span className="text-xs px-2 py-0.5 rounded bg-blue-600">
            {item.category}
          </span>
        )}
        {item.subcategory && (
          <span className="text-xs px-2 py-0.5 rounded bg-gray-600">
            {item.subcategory}
          </span>
        )}
      </div>

      {/* Key Stats */}
      <div className="text-sm space-y-1 mb-3">
        {item.damage && (
          <div className="flex justify-between">
            <span className="text-gray-400">Damage:</span>
            <span className="text-red-400">{item.damage}</span>
          </div>
        )}
        {item.range && (
          <div className="flex justify-between">
            <span className="text-gray-400">Range:</span>
            <span className="text-blue-400">{item.range}</span>
          </div>
        )}
        {item.ac_bonus !== undefined && item.ac_bonus !== null && (
          <div className="flex justify-between">
            <span className="text-gray-400">AC Bonus:</span>
            <span className="text-green-400">+{item.ac_bonus}</span>
          </div>
        )}
        {item.weight !== undefined && item.weight !== null && (
          <div className="flex justify-between">
            <span className="text-gray-400">Weight:</span>
            <span className="text-white">{item.weight}</span>
          </div>
        )}
        {item.bulk !== undefined && item.bulk !== null && (
          <div className="flex justify-between">
            <span className="text-gray-400">Bulk:</span>
            <span className="text-white">{item.bulk}</span>
          </div>
        )}
      </div>

      {/* Properties */}
      {properties && expanded && (
        <div className="mb-3 text-xs">
          <div className="font-bold text-gray-400 mb-1">Properties:</div>
          <div className="text-blue-300 bg-gray-800 rounded p-2">
            {typeof properties === 'object' 
              ? Object.entries(properties).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-gray-400">{key}:</span> {String(value)}
                  </div>
                ))
              : String(properties)
            }
          </div>
        </div>
      )}

      {/* Description */}
      {item.description && (
        <div className="text-sm text-gray-300 mb-3 border-t border-gray-600 pt-3">
          <div className={`${!expanded && 'line-clamp-3'}`}>
            {item.description}
          </div>
        </div>
      )}

      {/* Expand/Collapse Button */}
      {(item.description?.length > 150 || properties) && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-blue-400 hover:text-blue-300 font-bold"
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
    <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-400">{label}</div>
          <div className="text-xl font-bold text-white">{value}</div>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
    </div>
  );
}

// Helper function to get category icon
function getCategoryIcon(category) {
  const icons = {
    'Weapons': '⚔️',
    'Armor': '🛡️',
    'Tools': '🔧',
    'Medical': '💊',
    'Explosives': '💣',
    'Ammo': '🔫',
    'Equipment': '🎒',
    'Consumables': '🍖',
    'Technology': '💻',
    'Misc': '📦'
  };
  return icons[category] || '📦';
}

export default GearCatalog;
