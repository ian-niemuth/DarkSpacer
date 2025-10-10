import { useState } from 'react';

function SpaceMapGrid({ locations, currentLevel, onLocationClick, selectedLocation, shipData }) {
  
  // If no locations, show helpful message
  if (locations.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-2">No locations detected in this area</p>
          <p className="text-sm">This area of space is empty or unexplored</p>
        </div>
      </div>
    );
  }
  
  // For system level (planets), use list view instead of grid if coordinates missing
  if (currentLevel === 'system') {
    const hasCoordinates = locations.every(l => l.x_coord !== null && l.y_coord !== null);
    
    if (!hasCoordinates) {
      return (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">🪐 Celestial Bodies</h2>
            <div className="text-sm text-gray-400">
              {locations.length} {locations.length === 1 ? 'body' : 'bodies'} detected
            </div>
          </div>
          
          <div className="space-y-2">
            {locations.map((location, index) => (
              <button
                key={location.id}
                onClick={() => onLocationClick(location)}
                className={`w-full text-left p-4 rounded border-2 transition-all ${
                  selectedLocation?.id === location.id
                    ? 'bg-yellow-600 border-yellow-400'
                    : 'bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getLocationIcon(location, currentLevel)}</div>
                    <div>
                      <div className="font-bold text-white">{location.name}</div>
                      <div className="text-sm text-gray-400">
                        {location.body_type}
                        {location.is_habitable && <span className="ml-2 text-green-400">✓ Habitable</span>}
                      </div>
                    </div>
                  </div>
                  {location.danger_level && (
                    <div className="text-sm">
                      <span className="text-red-400">⚠️ Danger: {location.danger_level}/10</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }
  }
  
  // Calculate grid dimensions based on locations
  const getGridDimensions = () => {
    const maxX = Math.max(...locations.map(l => l.x_coord || 0));
    const maxY = Math.max(...locations.map(l => l.y_coord || 0));
    
    // Add padding
    return {
      maxX: Math.max(maxX + 2, 5),
      maxY: Math.max(maxY + 2, 5)
    };
  };
  
  const { maxX, maxY } = getGridDimensions();
  
  // Create grid cells
  const renderGrid = () => {
    const cells = [];
    
    for (let y = 0; y <= maxY; y++) {
      for (let x = 0; x <= maxX; x++) {
        // Find location at this coordinate
        const location = locations.find(
          l => l.x_coord === x && l.y_coord === y
        );
        
        cells.push(
          <GridCell
            key={`${x}-${y}`}
            x={x}
            y={y}
            location={location}
            isSelected={selectedLocation?.id === location?.id}
            onClick={() => location && onLocationClick(location)}
            currentLevel={currentLevel}
          />
        );
      }
    }
    
    return cells;
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {currentLevel === 'sector' && '⭐ Systems'}
          {currentLevel === 'system' && '🪐 Celestial Bodies'}
        </h2>
        <div className="text-sm text-gray-400">
          {locations.length} {currentLevel === 'sector' ? 'systems' : 'bodies'} detected
        </div>
      </div>
      
      <div 
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${maxX + 1}, minmax(80px, 1fr))`
        }}
      >
        {renderGrid()}
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 rounded"></div>
          <span>System/Planet</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-600 rounded"></div>
          <span>Habitable</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          <span>Dangerous</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-600 rounded"></div>
          <span>Space Station</span>
        </div>
      </div>
    </div>
  );
}

function getLocationIcon(location, currentLevel) {
  if (!location) return '';
  
  if (currentLevel === 'sector') {
    // System icons
    return '⭐';
  } else if (currentLevel === 'system') {
    // Planet/body icons
    if (location.body_type === 'Station') return '🛰️';
    if (location.body_type === 'Planet' && location.is_habitable) return '🌍';
    if (location.body_type === 'Planet') return '🪐';
    if (location.body_type === 'Moon') return '🌙';
    if (location.body_type === 'Gas Giant') return '🌀';
    if (location.body_type === 'Asteroid Belt') return '☄️';
  }
  return '⭐';
}

function GridCell({ x, y, location, isSelected, onClick, currentLevel }) {
  
  const getLocationIcon = () => {
    if (!location) return '';
    
    if (currentLevel === 'sector') {
      // System icons
      return '⭐';
    } else if (currentLevel === 'system') {
      // Planet/body icons  
      if (location.body_type === 'Station') return '🛰️';
      if (location.body_type === 'Planet' && location.is_habitable) return '🌍';
      if (location.body_type === 'Planet') return '🪐';
      if (location.body_type === 'Moon') return '🌙';
      if (location.body_type === 'Gas Giant') return '🌀';
      if (location.body_type === 'Asteroid Belt') return '☄️';
    }
    return '⭐';
  };
  
  const getCellColor = () => {
    if (!location) return 'bg-gray-700/30 border-gray-700';
    
    if (isSelected) return 'bg-yellow-600 border-yellow-400';
    
    // Color by danger/type
    if (currentLevel === 'system') {
      if (location.body_type === 'Station') return 'bg-purple-600 border-purple-400';
      if (location.is_habitable) return 'bg-green-600 border-green-400';
      if (location.danger_level && location.danger_level >= 7) return 'bg-red-600 border-red-400';
    }
    
    return 'bg-blue-600 border-blue-400';
  };
  
  const getLocationName = () => {
    if (!location) return '';
    if (currentLevel === 'sector') return location.system_code;
    return location.name;
  };
  
  return (
    <div
      onClick={onClick}
      className={`
        relative aspect-square rounded border-2 transition-all
        ${location ? 'cursor-pointer hover:scale-105 hover:shadow-lg' : 'cursor-default'}
        ${getCellColor()}
        ${isSelected ? 'ring-2 ring-yellow-300' : ''}
      `}
      title={location ? getLocationName() : `Empty (${x}, ${y})`}
    >
      {/* Coordinate Label */}
      <div className="absolute top-0 left-0 text-[8px] text-gray-400 p-0.5">
        {x},{y}
      </div>
      
      {/* Location Content */}
      {location && (
        <div className="flex flex-col items-center justify-center h-full p-1">
          <div className="text-2xl mb-1">{getLocationIcon()}</div>
          <div className="text-[10px] text-center font-semibold leading-tight">
            {getLocationName()}
          </div>
          {currentLevel === 'system' && location.danger_level && (
            <div className="text-[8px] text-red-300">
              ⚠️ {location.danger_level}
            </div>
          )}
        </div>
      )}
      
      {/* Empty space indicator */}
      {!location && (
        <div className="flex items-center justify-center h-full text-gray-600 text-xs">
          ·
        </div>
      )}
    </div>
  );
}

export default SpaceMapGrid;
