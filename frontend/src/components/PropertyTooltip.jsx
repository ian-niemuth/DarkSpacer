// Tooltip component for property abbreviations
import { useState } from 'react';
import { PROPERTIES_DATA } from '../utils/propertiesData';

function PropertyTooltip({ property, children }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const propData = PROPERTIES_DATA[property];

  if (!propData) {
    return <span>{children || property}</span>;
  }

  return (
    <span
      className="relative inline-block cursor-help"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="border-b border-dotted border-blue-400">
        {children || property}
      </span>
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 z-50">
          <div className="bg-gray-900 border border-blue-500 rounded-lg p-3 shadow-xl">
            <div className="text-blue-300 font-bold text-sm mb-1">
              {property} - {propData.name}
            </div>
            <div className="text-gray-300 text-xs">
              {propData.description}
            </div>
            <div className="text-gray-500 text-xs mt-1">
              {propData.category}
            </div>
            {/* Arrow pointer */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
              <div className="border-8 border-transparent border-t-blue-500"></div>
            </div>
          </div>
        </div>
      )}
    </span>
  );
}

// Component to render properties with tooltips
export function PropertiesDisplay({ properties }) {
  if (!properties) return null;

  const props = properties.split(',').map(p => p.trim()).filter(p => p);

  return (
    <div className="text-xs text-blue-300">
      Properties:{' '}
      {props.map((prop, index) => (
        <span key={prop}>
          <PropertyTooltip property={prop} />
          {index < props.length - 1 && ', '}
        </span>
      ))}
    </div>
  );
}

export default PropertyTooltip;
