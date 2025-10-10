import { useState } from 'react';

// ============================================
// SHIP SCHEMATIC VIEW - Blueprint Style
// ============================================
function ShipSchematicView({ ship }) {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedWeapon, setSelectedWeapon] = useState(null);

  // Component positioning logic - distribute around ship
  const getComponentPosition = (index, total, type) => {
    const positions = {
      system: [
        { x: 100, y: 150 }, // Top left
        { x: 100, y: 300 }, // Middle left
        { x: 100, y: 450 }, // Bottom left
        { x: 700, y: 150 }, // Top right
        { x: 700, y: 300 }, // Middle right
        { x: 700, y: 450 }, // Bottom right
      ],
      feature: [
        { x: 150, y: 80 },  // Top
        { x: 650, y: 80 },  // Top right
        { x: 150, y: 520 }, // Bottom
        { x: 650, y: 520 }, // Bottom right
      ],
      weapons: [
        { x: 250, y: 150 }, // Top left mount
        { x: 550, y: 150 }, // Top right mount
        { x: 250, y: 450 }, // Bottom left mount
        { x: 550, y: 450 }, // Bottom right mount
      ]
    };

    return positions[type]?.[index] || { x: 400, y: 300 };
  };

  const shipCenter = { x: 400, y: 300 };

  // Separate components by type
  const systemComponents = ship.components?.filter(c => c.component_type === 'system') || [];
  const featureComponents = ship.components?.filter(c => c.component_type === 'feature') || [];

  return (
    <div className="relative w-full h-full min-h-[700px] bg-gray-900 rounded-lg overflow-hidden">
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Scan lines effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59, 130, 246, 0.3) 2px, rgba(59, 130, 246, 0.3) 4px)'
        }}
      />

      {/* Main SVG Canvas */}
      <svg className="w-full h-full" viewBox="0 0 800 600">
        <defs>
          {/* Glow filter for lines */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Arrow marker for connection lines */}
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" opacity="0.6" />
          </marker>
        </defs>

        {/* Connection Lines - System Components */}
        {systemComponents.map((component, index) => {
          const pos = getComponentPosition(index, systemComponents.length, 'system');
          return (
            <g key={`line-system-${component.id}`}>
              <line
                x1={pos.x}
                y1={pos.y}
                x2={shipCenter.x}
                y2={shipCenter.y}
                stroke="#3b82f6"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.4"
                filter="url(#glow)"
                markerEnd="url(#arrowhead)"
              />
            </g>
          );
        })}

        {/* Connection Lines - Feature Components */}
        {featureComponents.map((component, index) => {
          const pos = getComponentPosition(index, featureComponents.length, 'feature');
          return (
            <g key={`line-feature-${component.id}`}>
              <line
                x1={pos.x}
                y1={pos.y}
                x2={shipCenter.x}
                y2={shipCenter.y}
                stroke="#10b981"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.4"
                filter="url(#glow)"
                markerEnd="url(#arrowhead)"
              />
            </g>
          );
        })}

        {/* Connection Lines - Weapons Arrays */}
        {ship.weapons_arrays?.map((array, index) => {
          const pos = getComponentPosition(index, ship.weapons_arrays.length, 'weapons');
          return (
            <g key={`line-weapon-${array.id}`}>
              <line
                x1={pos.x}
                y1={pos.y}
                x2={shipCenter.x}
                y2={shipCenter.y}
                stroke="#ef4444"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.4"
                filter="url(#glow)"
                markerEnd="url(#arrowhead)"
              />
            </g>
          );
        })}

        {/* Ship Outline - Placeholder (will be replaced with actual ship blueprint) */}
        <g transform={`translate(${shipCenter.x}, ${shipCenter.y})`}>
          {/* Simple ship silhouette */}
          <g transform="scale(0.8)">
            {/* Cockpit */}
            <path
              d="M 0,-80 L 20,-60 L 20,-40 L -20,-40 L -20,-60 Z"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              opacity="0.6"
            />
            {/* Main hull */}
            <rect
              x="-40"
              y="-40"
              width="80"
              height="80"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              opacity="0.6"
            />
            {/* Left engine */}
            <path
              d="M -40,0 L -60,20 L -60,60 L -40,40 Z"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              opacity="0.6"
            />
            {/* Right engine */}
            <path
              d="M 40,0 L 60,20 L 60,60 L 40,40 Z"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              opacity="0.6"
            />
            {/* Wing struts */}
            <line x1="-40" y1="-20" x2="-70" y2="-30" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
            <line x1="40" y1="-20" x2="70" y2="-30" stroke="#3b82f6" strokeWidth="2" opacity="0.6" />
          </g>
        </g>

        {/* Ship Label */}
        <text
          x={shipCenter.x}
          y={shipCenter.y + 80}
          textAnchor="middle"
          className="fill-blue-400 font-mono text-sm"
          style={{ fontFamily: 'Courier New, monospace' }}
        >
          {ship.name.toUpperCase()}
        </text>
        <text
          x={shipCenter.x}
          y={shipCenter.y + 95}
          textAnchor="middle"
          className="fill-gray-500 font-mono text-xs"
          style={{ fontFamily: 'Courier New, monospace' }}
        >
          {ship.ship_class.toUpperCase()} CLASS
        </text>
      </svg>

      {/* Component Nodes - System Components */}
      {systemComponents.map((component, index) => {
        const pos = getComponentPosition(index, systemComponents.length, 'system');
        return (
          <ComponentNode
            key={`system-${component.id}`}
            component={component}
            position={pos}
            type="system"
            onClick={() => setSelectedComponent(component)}
          />
        );
      })}

      {/* Component Nodes - Feature Components */}
      {featureComponents.map((component, index) => {
        const pos = getComponentPosition(index, featureComponents.length, 'feature');
        return (
          <ComponentNode
            key={`feature-${component.id}`}
            component={component}
            position={pos}
            type="feature"
            onClick={() => setSelectedComponent(component)}
          />
        );
      })}

      {/* Weapons Array Nodes */}
      {ship.weapons_arrays?.map((array, index) => {
        const pos = getComponentPosition(index, ship.weapons_arrays.length, 'weapons');
        return (
          <WeaponNode
            key={`weapon-${array.id}`}
            array={array}
            position={pos}
            onClick={() => setSelectedWeapon(array)}
          />
        );
      })}

      {/* Ship Stats Overlay - Top Right */}
      <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-90 border border-blue-500 rounded p-3 font-mono text-xs">
        <div className="text-blue-400 font-bold mb-2">SHIP STATUS</div>
        <div className="space-y-1 text-gray-300">
          <div>HP: <span className="text-red-400">{ship.hp_current}/{ship.hp_max}</span></div>
          <div>AC: <span className="text-blue-400">{ship.ac}</span></div>
          <div>PWR: <span className="text-green-400">ONLINE</span></div>
        </div>
      </div>

      {/* Slot Usage - Top Left */}
      <div className="absolute top-4 left-4 bg-gray-800 bg-opacity-90 border border-blue-500 rounded p-3 font-mono text-xs">
        <div className="text-blue-400 font-bold mb-2">SLOT USAGE</div>
        <div className="space-y-1 text-gray-300">
          <div>
            SYS: <span className={ship.system_slots_used > ship.system_slots_max ? 'text-red-400' : 'text-blue-400'}>
              {ship.system_slots_used}/{ship.system_slots_max}
            </span>
          </div>
          <div>
            FTR: <span className={ship.feature_slots_used > ship.feature_slots_max ? 'text-red-400' : 'text-green-400'}>
              {ship.feature_slots_used}/{ship.feature_slots_max}
            </span>
          </div>
        </div>
      </div>

      {/* Legend - Bottom Left */}
      <div className="absolute bottom-4 left-4 bg-gray-800 bg-opacity-90 border border-blue-500 rounded p-3 font-mono text-xs">
        <div className="text-blue-400 font-bold mb-2">LEGEND</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300">System</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">Feature</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-300">Weapons</span>
          </div>
        </div>
      </div>

      {/* Component Detail Modal */}
      {selectedComponent && (
        <ComponentDetailModal
          component={selectedComponent}
          onClose={() => setSelectedComponent(null)}
        />
      )}

      {/* Weapon Detail Modal */}
      {selectedWeapon && (
        <WeaponDetailModal
          array={selectedWeapon}
          onClose={() => setSelectedWeapon(null)}
        />
      )}
    </div>
  );
}

// ============================================
// COMPONENT NODE
// ============================================
function ComponentNode({ component, position, type, onClick }) {
  const isOnline = component.maintenance_enabled && !component.is_damaged && !component.is_offline;
  const colorClass = type === 'system' ? 'blue' : 'green';
  
  return (
    <div
      className={`absolute cursor-pointer transition-transform hover:scale-110`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={onClick}
    >
      {/* Node circle */}
      <div className={`relative w-12 h-12 rounded-full border-2 border-${colorClass}-500 bg-gray-800 bg-opacity-90 flex items-center justify-center`}>
        {/* Status indicator */}
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
          isOnline ? 'bg-green-400' : 'bg-red-500'
        } animate-pulse`}></div>
        
        {/* Icon */}
        <span className={`text-${colorClass}-400 text-xl`}>
          {type === 'system' ? '⚙️' : '📦'}
        </span>
      </div>
      
      {/* Label */}
      <div className={`mt-1 text-center text-xs font-mono text-${colorClass}-400 max-w-[100px] truncate`}>
        {component.name}
      </div>
      
      {/* Status label */}
      {!isOnline && (
        <div className="mt-0.5 text-center text-[10px] font-mono text-red-400 font-bold">
          OFFLINE
        </div>
      )}
    </div>
  );
}

// ============================================
// WEAPON NODE
// ============================================
function WeaponNode({ array, position, onClick }) {
  const isOnline = array.maintenance_enabled && !array.is_damaged;
  
  return (
    <div
      className="absolute cursor-pointer transition-transform hover:scale-110"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={onClick}
    >
      {/* Node circle */}
      <div className="relative w-12 h-12 rounded-full border-2 border-red-500 bg-gray-800 bg-opacity-90 flex items-center justify-center">
        {/* Status indicator */}
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
          isOnline ? 'bg-green-400' : 'bg-red-500'
        } animate-pulse`}></div>
        
        {/* Icon */}
        <span className="text-red-400 text-xl">⚔️</span>
      </div>
      
      {/* Label */}
      <div className="mt-1 text-center text-xs font-mono text-red-400 max-w-[100px] truncate">
        {array.array_name}
      </div>
      
      {/* Weapon count */}
      <div className="mt-0.5 text-center text-[10px] font-mono text-gray-400">
        {array.weapons?.length || 0}/{array.max_weapons}
      </div>
    </div>
  );
}

// ============================================
// COMPONENT DETAIL MODAL
// ============================================
function ComponentDetailModal({ component, onClose }) {
  const isOnline = component.maintenance_enabled && !component.is_damaged && !component.is_offline;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-gray-800 border-2 border-blue-500 rounded-lg p-6 max-w-md w-full font-mono" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-blue-400">{component.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded ${
                component.component_type === 'system' ? 'bg-blue-600' : 'bg-green-600'
              }`}>
                {component.component_type.toUpperCase()}
              </span>
              {component.is_advanced && (
                <span className="text-xs px-2 py-0.5 rounded bg-purple-600">ADVANCED</span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
        </div>

        {/* Status */}
        <div className={`mb-4 p-3 rounded border ${
          isOnline 
            ? 'bg-green-900 bg-opacity-20 border-green-500' 
            : 'bg-red-900 bg-opacity-20 border-red-500'
        }`}>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-500'} animate-pulse`}></div>
            <span className={`font-bold ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
          {!isOnline && (
            <div className="text-xs text-red-300 mt-1">
              {!component.maintenance_enabled && '• Maintenance disabled'}
              {component.is_damaged && '• Component damaged'}
              {component.is_offline && '• Manually offline'}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <div className="text-xs text-gray-400 mb-1">DESCRIPTION</div>
          <div className="text-sm text-gray-300">{component.description}</div>
        </div>

        {/* Stats */}
        <div className="mb-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Maintenance Cost:</span>
            <span className="text-yellow-400">{component.maintenance_cost}cr</span>
          </div>
          {component.instance_notes && (
            <div>
              <div className="text-xs text-gray-400 mb-1">NOTES</div>
              <div className="text-xs text-gray-300 bg-gray-900 p-2 rounded">{component.instance_notes}</div>
            </div>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}

// ============================================
// WEAPON DETAIL MODAL
// ============================================
function WeaponDetailModal({ array, onClose }) {
  const isOnline = array.maintenance_enabled && !array.is_damaged;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-gray-800 border-2 border-red-500 rounded-lg p-6 max-w-md w-full font-mono" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-red-400">{array.array_name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 rounded bg-red-600">WEAPONS</span>
              {array.is_firelinked && (
                <span className="text-xs px-2 py-0.5 rounded bg-orange-600">FIRE-LINKED</span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
        </div>

        {/* Status */}
        <div className={`mb-4 p-3 rounded border ${
          isOnline 
            ? 'bg-green-900 bg-opacity-20 border-green-500' 
            : 'bg-red-900 bg-opacity-20 border-red-500'
        }`}>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-500'} animate-pulse`}></div>
            <span className={`font-bold ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
              {isOnline ? 'ARMED' : 'OFFLINE'}
            </span>
          </div>
        </div>

        {/* Capacity */}
        <div className="mb-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Weapon Capacity:</span>
            <span className="text-gray-300">{array.weapons?.length || 0}/{array.max_weapons}</span>
          </div>
        </div>

        {/* Weapons List */}
        <div className="mb-4">
          <div className="text-xs text-gray-400 mb-2">MOUNTED WEAPONS</div>
          {array.weapons && array.weapons.length > 0 ? (
            <div className="space-y-2">
              {array.weapons.map((weapon) => (
                <div key={weapon.id} className="bg-gray-900 p-2 rounded text-xs">
                  <div className="font-bold text-red-300">{weapon.name}</div>
                  <div className="text-gray-400 mt-1">
                    DMG: {weapon.damage} • RNG: {weapon.range === 'N' ? 'Near' : 'Far'}
                  </div>
                  {weapon.requires_ammo && (
                    <div className={`text-xs mt-1 ${weapon.ammo_loaded ? 'text-green-400' : 'text-yellow-400'}`}>
                      {weapon.ammo_loaded ? '✓ Ammo Loaded' : '⚠ No Ammo'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-xs">No weapons mounted</div>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-bold"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}

export default ShipSchematicView;
