// Properties Guide Modal - Comprehensive reference for all gear properties
import { PROPERTIES_DATA, getCategoryIcon } from '../utils/propertiesData';

function PropertiesGuideModal({ onClose }) {
  // Group properties by category
  const categories = {
    'Weapon': [],
    'Armor': [],
    'Weapon/Armor': [],
    'Ship Weapon': []
  };

  Object.entries(PROPERTIES_DATA).forEach(([abbrev, data]) => {
    if (categories[data.category]) {
      categories[data.category].push({ abbrev, ...data });
    }
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden border-2 border-blue-500">
        {/* Header */}
        <div className="bg-gray-900 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            📋 Gear Properties Reference
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="overflow-y-auto p-6 max-h-[calc(90vh-80px)]">
          <div className="text-gray-300 mb-6 text-sm">
            Hover over property abbreviations in your inventory to see quick definitions, or use this guide for complete reference.
          </div>

          {/* Weapon Properties */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2 border-b border-gray-700 pb-2">
              {getCategoryIcon('Weapon')} Weapon Properties
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories['Weapon'].map((prop) => (
                <div key={prop.abbrev} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-bold text-yellow-400 text-lg">
                      {prop.abbrev}
                    </div>
                    <div className="text-xs bg-gray-600 px-2 py-1 rounded">
                      {prop.name}
                    </div>
                  </div>
                  <div className="text-sm text-gray-300">
                    {prop.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Armor Properties */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2 border-b border-gray-700 pb-2">
              {getCategoryIcon('Armor')} Armor Properties
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories['Armor'].map((prop) => (
                <div key={prop.abbrev} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-bold text-yellow-400 text-lg">
                      {prop.abbrev}
                    </div>
                    <div className="text-xs bg-gray-600 px-2 py-1 rounded">
                      {prop.name}
                    </div>
                  </div>
                  <div className="text-sm text-gray-300">
                    {prop.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shared Weapon/Armor Properties */}
          {categories['Weapon/Armor'].length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2 border-b border-gray-700 pb-2">
                {getCategoryIcon('Weapon/Armor')} Weapon & Armor Properties
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories['Weapon/Armor'].map((prop) => (
                  <div key={prop.abbrev} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-bold text-yellow-400 text-lg">
                        {prop.abbrev}
                      </div>
                      <div className="text-xs bg-gray-600 px-2 py-1 rounded">
                        {prop.name}
                      </div>
                    </div>
                    <div className="text-sm text-gray-300">
                      {prop.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ship Weapon Properties */}
          {categories['Ship Weapon'].length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2 border-b border-gray-700 pb-2">
                {getCategoryIcon('Ship Weapon')} Ship Weapon Properties
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories['Ship Weapon'].map((prop) => (
                  <div key={prop.abbrev} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-bold text-yellow-400 text-lg">
                        {prop.abbrev}
                      </div>
                      <div className="text-xs bg-gray-600 px-2 py-1 rounded">
                        {prop.name}
                      </div>
                    </div>
                    <div className="text-sm text-gray-300">
                      {prop.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Reference */}
          <div className="bg-blue-900 bg-opacity-30 rounded-lg p-4 border border-blue-700">
            <h4 className="font-bold text-blue-300 mb-2">💡 Quick Tips</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• <strong>EC (Energy Cell)</strong> gear needs cells loaded before use</li>
              <li>• <strong>EC(c) (Consumable Energy Cell)</strong> cells expire in 1 hour and cannot be removed</li>
              <li>• <strong>AP (Armor Piercing)</strong> weapons bypass physical armor</li>
              <li>• <strong>2H (Two-Handed)</strong> weapons need both weapon slots empty</li>
              <li>• <strong>V (Versatile)</strong> weapons deal more damage when used two-handed</li>
              <li>• <strong>Bl (Blast)</strong> weapons can hit multiple targets</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 border-t border-gray-700 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertiesGuideModal;
