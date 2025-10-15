import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * GalaxyCanvas - Interactive 2D galaxy map renderer
 * Converted from galaxy-2d-viewer.html
 */
function GalaxyCanvas({
  galaxyData,
  shipLocation,
  showAllShips = false,
  allShips = [],
  dmPositioningMode = false,
  onMapClick = null,
  enablePlanetSearch = false
}) {
  const canvasRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 }); // Track drag start position immediately
  const [view, setView] = useState({
    axis1: 'x',
    axis2: 'y',
    depthAxis: 'z',
    offset: { x: 0, y: 0 },
    zoom: 1,
    isDragging: false
  });

  const [filters, setFilters] = useState({
    showRegions: true,
    showSectors: false,
    showSystems: false,
    showHazards: false,
    showStars: true,
    showPlanets: true,
    showHabitable: true
  });

  const [pointSize, setPointSize] = useState(3);
  const [depthColorIntensity, setDepthColorIntensity] = useState(0.5);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, content: '' });
  const [bounds, setBounds] = useState({ minX: 0, maxX: 0, minY: 0, maxY: 0, minZ: 0, maxZ: 0 });
  const [isolation, setIsolation] = useState({ level: null, id: null, data: null });
  const [selectedObject, setSelectedObject] = useState(null);
  const [hoveredObject, setHoveredObject] = useState(null);
  const [clickCoordinates, setClickCoordinates] = useState(null);

  // Store rendered objects for hit detection
  const renderedObjectsRef = useRef([]);

  // Track if we've done initial centering (to prevent re-centering on data updates)
  const hasInitialCenteredRef = useRef(false);
  const hasInitialFittedRef = useRef(false);

  // Calculate bounds when galaxy data changes
  useEffect(() => {
    if (!galaxyData || !galaxyData.stars) return;

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    galaxyData.stars.forEach(star => {
      const c = star.coordinates;
      minX = Math.min(minX, c.x); maxX = Math.max(maxX, c.x);
      minY = Math.min(minY, c.y); maxY = Math.max(maxY, c.y);
      minZ = Math.min(minZ, c.z); maxZ = Math.max(maxZ, c.z);
    });

    setBounds({ minX, maxX, minY, maxY, minZ, maxZ });
  }, [galaxyData]);

  // Auto-fit on load - ONLY ON INITIAL LOAD
  useEffect(() => {
    if (bounds.maxX !== 0 && !hasInitialFittedRef.current) {
      autoFit();
      hasInitialFittedRef.current = true;
    }
  }, [bounds]);

  // Auto-center on ship when loaded (player view only) - ONLY ON INITIAL LOAD
  useEffect(() => {
    if (shipLocation && !showAllShips && shipLocation.x !== undefined && shipLocation.y !== undefined && !hasInitialCenteredRef.current) {
      // Small delay to ensure canvas is ready
      const timer = setTimeout(() => {
        centerOnShip();
        hasInitialCenteredRef.current = true; // Mark as centered
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [shipLocation, showAllShips]);

  // Update selectedObject when ship data changes (for real-time component/weapons updates)
  useEffect(() => {
    if (selectedObject && selectedObject.type === 'ship' && allShips.length > 0) {
      // Find updated ship data
      const updatedShip = allShips.find(ship => ship.ship_id === selectedObject.data.ship_id);
      if (updatedShip) {
        // Update selectedObject with new data while preserving screen position
        setSelectedObject(prev => ({
          ...prev,
          data: updatedShip
        }));
      }
    }
  }, [allShips]);

  const autoFit = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const paddingFactor = 0.9;
    const axis1Range = bounds['max' + view.axis1.toUpperCase()] - bounds['min' + view.axis1.toUpperCase()];
    const axis2Range = bounds['max' + view.axis2.toUpperCase()] - bounds['min' + view.axis2.toUpperCase()];

    const scaleX = (canvas.width * paddingFactor) / axis1Range;
    const scaleY = (canvas.height * paddingFactor) / axis2Range;

    setView(prev => ({
      ...prev,
      zoom: Math.min(scaleX, scaleY),
      offset: { x: 0, y: 0 }
    }));
  }, [bounds, view.axis1, view.axis2]);

  const resetView = () => {
    setView(prev => ({
      ...prev,
      zoom: 1,
      offset: { x: 0, y: 0 }
    }));
  };

  const centerOnShip = () => {
    if (!shipLocation) return;

    setView(prev => ({
      ...prev,
      zoom: 2, // Reasonable zoom level to see nearby objects
      offset: {
        x: -parseFloat(shipLocation.x),
        y: -parseFloat(shipLocation.y)
      }
    }));
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query || query.length < 2 || !galaxyData) {
      setShowSearchResults(false);
      return;
    }

    // Build search index
    const searchIndex = [];

    galaxyData.stars?.forEach(star => {
      searchIndex.push({
        name: star.name,
        type: 'star',
        data: star,
        coordinates: star.coordinates
      });
    });

    galaxyData.regions?.forEach(region => {
      searchIndex.push({
        name: region.name,
        type: 'region',
        data: region,
        coordinates: region.coordinates
      });
    });

    galaxyData.sectors?.forEach(sector => {
      searchIndex.push({
        name: sector.name,
        type: 'sector',
        data: sector,
        coordinates: sector.coordinates
      });
    });

    galaxyData.systems?.forEach(system => {
      searchIndex.push({
        name: system.name,
        type: 'system',
        data: system,
        coordinates: system.coordinates
      });
    });

    // Add planets if planet search is enabled
    // Use galaxyData.planets (flat array) to match rendering logic
    if (enablePlanetSearch && galaxyData.planets) {
      galaxyData.planets.forEach(planet => {
        // Get parent star coordinates - same as rendering
        const parentStar = galaxyData.stars?.find(s => s.id === planet.starId);
        if (parentStar) {
          // Calculate planet position from parent star + orbit offset
          const orbitOffset = planet.orbit || 0;
          const angle = (planet.orbit * 137.5) % 360; // Golden angle distribution
          const separationMultiplier = 1; // Use base separation for search
          const offsetX = Math.cos(angle * Math.PI / 180) * orbitOffset * separationMultiplier;
          const offsetY = Math.sin(angle * Math.PI / 180) * orbitOffset * separationMultiplier;

          searchIndex.push({
            name: planet.name,
            type: 'planet',
            data: planet,
            coordinates: {
              x: parentStar.coordinates.x + offsetX,
              y: parentStar.coordinates.y + offsetY,
              z: parentStar.coordinates.z
            }
          });
        }
      });
    }

    const results = searchIndex
      .filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 10);

    setSearchResults(results);
    setShowSearchResults(true);
  };

  const focusOnObject = (result) => {
    if (!result.coordinates) return;

    const targetCoords = result.coordinates;
    let targetZoom = 1;

    switch (result.type) {
      case 'region': targetZoom = 0.3; break;
      case 'sector': targetZoom = 0.8; break;
      case 'system': targetZoom = 2; break;
      case 'star': targetZoom = 3; break;
      case 'planet': targetZoom = 4; break;
      default: targetZoom = 1;
    }

    setView(prev => ({
      ...prev,
      zoom: targetZoom,
      offset: {
        x: -targetCoords[prev.axis1],
        y: -targetCoords[prev.axis2]
      }
    }));

    // Also select the object
    setSelectedObject({
      type: result.type,
      data: result.data,
      screenX: 0,
      screenY: 0,
      hitRadius: 0
    });

    setSearchQuery('');
    setShowSearchResults(false);
  };

  // Rendering function
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !galaxyData) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Clear rendered objects for hit detection
    renderedObjectsRef.current = [];

    // Clear canvas
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, w, h);

    // Draw grid
    drawGrid(ctx, w, h);

    // Draw galaxy objects based on filters
    // Only show regions/sectors/systems/hazards if DM mode OR player has Advanced Memory Bank
    const canShowAdvancedLayers = showAllShips || galaxyData?.hasAdvancedMemoryBank;

    if (canShowAdvancedLayers && filters.showRegions && galaxyData.regions) {
      galaxyData.regions.forEach(region => {
        if (!isolation.level || isolation.id === region.id) {
          drawRegion(ctx, region);
        }
      });
    }

    if (canShowAdvancedLayers && filters.showSectors && galaxyData.sectors) {
      galaxyData.sectors.forEach(sector => {
        let shouldShow = !isolation.level;
        if (isolation.level === 'region') {
          shouldShow = isolation.data.sectors.includes(sector.id);
        } else if (isolation.level === 'sector') {
          shouldShow = isolation.id === sector.id;
        }
        if (shouldShow) {
          drawSector(ctx, sector);
        }
      });
    }

    if (canShowAdvancedLayers && filters.showSystems && galaxyData.systems) {
      galaxyData.systems.forEach(system => {
        let shouldShow = !isolation.level;
        if (isolation.level === 'region') {
          // Find sector that contains this system
          const sector = galaxyData.sectors?.find(s => s.systems?.includes(system.id));
          shouldShow = sector && isolation.data.sectors?.includes(sector.id);
        } else if (isolation.level === 'sector') {
          // Check if system is in this sector
          const sector = galaxyData.sectors?.find(s => s.id === isolation.id);
          shouldShow = sector && sector.systems?.includes(system.id);
        } else if (isolation.level === 'system') {
          shouldShow = isolation.id === system.id;
        }
        if (shouldShow) {
          drawSystem(ctx, system);
        }
      });
    }

    if (canShowAdvancedLayers && filters.showHazards && galaxyData.sectors) {
      galaxyData.sectors.forEach(sector => {
        sector.hazards?.forEach(hazard => drawHazard(ctx, hazard));
      });
    }

    // Draw stars and planets
    const objects = [];

    if (filters.showStars && galaxyData.stars) {
      galaxyData.stars.forEach(star => {
        // Filter stars based on isolation mode
        let shouldShow = !isolation.level;
        if (isolation.level) {
          // Find system that contains this star
          const system = galaxyData.systems?.find(sys => sys.stars?.includes(star.id));
          if (system) {
            if (isolation.level === 'region') {
              const sector = galaxyData.sectors?.find(s => s.systems?.includes(system.id));
              shouldShow = sector && isolation.data.sectors?.includes(sector.id);
            } else if (isolation.level === 'sector') {
              const sector = galaxyData.sectors?.find(s => s.id === isolation.id);
              shouldShow = sector && sector.systems?.includes(system.id);
            } else if (isolation.level === 'system') {
              shouldShow = isolation.id === system.id;
            }
          }
        }

        if (shouldShow) {
          objects.push({
            type: 'star',
            data: star,
            coords: star.coordinates,
            color: getStarColor(star)
          });
        }
      });
    }

    // Add planets
    if (filters.showPlanets && galaxyData.planets) {
      galaxyData.planets.forEach(planet => {
        // Get parent star coordinates
        const parentStar = galaxyData.stars?.find(s => s.id === planet.starId);
        if (parentStar) {
          // Filter planets based on isolation mode (same as their parent star)
          let shouldShow = !isolation.level;
          if (isolation.level) {
            const system = galaxyData.systems?.find(sys => sys.stars?.includes(parentStar.id));
            if (system) {
              if (isolation.level === 'region') {
                const sector = galaxyData.sectors?.find(s => s.systems?.includes(system.id));
                shouldShow = sector && isolation.data.sectors?.includes(sector.id);
              } else if (isolation.level === 'sector') {
                const sector = galaxyData.sectors?.find(s => s.id === isolation.id);
                shouldShow = sector && sector.systems?.includes(system.id);
              } else if (isolation.level === 'system') {
                shouldShow = isolation.id === system.id;
              }
            }
          }

          // Offset planets from their star based on orbit
          // Scale separation with zoom - more separation at higher zoom
          const orbitOffset = planet.orbit || 0;
          const angle = (planet.orbit * 137.5) % 360; // Golden angle distribution
          const separationMultiplier = Math.max(0.5, Math.min(5, view.zoom * 0.8)); // Scale from 0.5 to 5 based on zoom
          const offsetX = Math.cos(angle * Math.PI / 180) * orbitOffset * separationMultiplier;
          const offsetY = Math.sin(angle * Math.PI / 180) * orbitOffset * separationMultiplier;

          const isHabitable = planet.habitability && planet.habitability > 50;

          // Check if habitable filter should apply (only if Advanced Memory Bank or DM mode)
          const shouldApplyHabitableFilter = showAllShips || galaxyData?.hasAdvancedMemoryBank;

          // Only show if matching filter AND isolation check
          // If filter doesn't apply OR "Habitable Only" is off, show all planets
          // If filter applies AND "Habitable Only" is on, show only habitable planets
          const passesHabitableFilter = !shouldApplyHabitableFilter || !filters.showHabitable || isHabitable;

          if (shouldShow && passesHabitableFilter) {
            objects.push({
              type: 'planet',
              data: planet,
              coords: {
                x: parentStar.coordinates.x + offsetX,
                y: parentStar.coordinates.y + offsetY,
                z: parentStar.coordinates.z
              },
              color: getPlanetColor(planet)
            });
          }
        }
      });
    }

    // Sort by depth for proper rendering
    objects.sort((a, b) => b.coords[view.depthAxis] - a.coords[view.depthAxis]);
    objects.forEach(obj => drawObject(ctx, obj));

    // Draw ship location if provided
    if (shipLocation) {
      // Draw sensor range first (so it appears behind the ship)
      if (galaxyData.sensorRange && galaxyData.sensorRange > 0) {
        drawSensorRange(ctx, shipLocation, galaxyData.sensorRange);
      }
      drawShipMarker(ctx, shipLocation, shipLocation.ship_name || 'Unknown Ship', true); // Player ship is green
    }

    // Draw all ships if DM view or nearby ships for player
    if (showAllShips && allShips.length > 0) {
      allShips.forEach(ship => {
        drawShipMarker(ctx, ship, ship.ship_name, false); // Other ships are red
      });
    }

    // Draw tooltip if hovering
    if (hoveredObject && tooltip.show) {
      drawTooltip(ctx);
    }
  }, [galaxyData, view, filters, pointSize, depthColorIntensity, isolation, shipLocation, showAllShips, allShips, selectedObject, hoveredObject, tooltip]);

  const drawGrid = (ctx, w, h) => {
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 1;

    const gridSpacing = 100 * view.zoom;
    const startX = (view.offset.x * view.zoom) % gridSpacing;
    const startY = (view.offset.y * view.zoom) % gridSpacing;

    ctx.beginPath();
    for (let x = startX; x < w; x += gridSpacing) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (let y = startY; y < h; y += gridSpacing) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();

    // Draw origin crosshair
    ctx.strokeStyle = '#0ff';
    ctx.lineWidth = 2;
    const centerX = w / 2 + view.offset.x * view.zoom;
    const centerY = h / 2 + view.offset.y * view.zoom;
    ctx.beginPath();
    ctx.moveTo(centerX - 10, centerY);
    ctx.lineTo(centerX + 10, centerY);
    ctx.moveTo(centerX, centerY - 10);
    ctx.lineTo(centerX, centerY + 10);
    ctx.stroke();
  };

  const drawRegion = (ctx, region) => {
    const coords = region.coordinates;
    const x1 = coords[view.axis1];
    const x2 = coords[view.axis2];
    const radius = region.radius;

    const screenX = canvasRef.current.width / 2 + (x1 + view.offset.x) * view.zoom;
    const screenY = canvasRef.current.height / 2 - (x2 + view.offset.y) * view.zoom;
    const screenRadius = radius * Math.pow(view.zoom, 0.7);

    // Store for hit detection
    renderedObjectsRef.current.push({
      type: 'region',
      data: region,
      coords: region.coordinates, // Store world coordinates
      screenX,
      screenY,
      hitRadius: screenRadius
    });

    // Check discovery level (0 = undiscovered, 1 = scanned, 2 = discovered)
    const discoveryLevel = region.discoveryLevel ?? 2; // Default to discovered if not specified

    // Highlight if selected
    const isSelected = selectedObject?.type === 'region' && selectedObject?.data.id === region.id;
    const isHovered = hoveredObject?.type === 'region' && hoveredObject?.data.id === region.id;

    // Apply fog of war based on discovery level
    if (discoveryLevel === 0) {
      // Undiscovered - very dim, no label
      ctx.strokeStyle = '#44444420';
      ctx.fillStyle = '#44444410';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(screenX, screenY, screenRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      return; // Don't show name or details
    } else if (discoveryLevel === 1) {
      // In sensor range - dimmed, show name
      ctx.strokeStyle = isSelected ? '#00ff00' : (isHovered ? '#4db8ff80' : '#4db8ff50');
      ctx.fillStyle = isSelected || isHovered ? '#4db8ff30' : '#4db8ff15';
      ctx.lineWidth = isSelected ? 3 : 1.5;
    } else {
      // Fully discovered
      ctx.strokeStyle = isSelected ? '#00ff00' : (isHovered ? '#4db8ffff' : '#4db8ff30');
      ctx.fillStyle = isSelected || isHovered ? '#4db8ff20' : '#4db8ff08';
      ctx.lineWidth = isSelected ? 4 : 2;
    }

    ctx.beginPath();
    ctx.arc(screenX, screenY, screenRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (view.zoom > 0.3) {
      ctx.fillStyle = isSelected ? '#00ff00' : (discoveryLevel === 1 ? '#888' : '#0ff');
      const fontSize = Math.max(10, Math.min(24, 12 * Math.pow(view.zoom, 0.4)));
      ctx.font = isSelected ? `bold ${fontSize}px monospace` : `${fontSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(region.name, screenX, screenY - screenRadius - 10);

      // Show "?" for scanned areas
      if (discoveryLevel === 1) {
        ctx.fillStyle = '#888';
        ctx.font = `${fontSize * 0.8}px monospace`;
        ctx.fillText('?', screenX, screenY + 5);
      }
    }
  };

  const drawSector = (ctx, sector) => {
    const coords = sector.coordinates;
    const x1 = coords[view.axis1];
    const x2 = coords[view.axis2];
    const radius = sector.radius;

    const screenX = canvasRef.current.width / 2 + (x1 + view.offset.x) * view.zoom;
    const screenY = canvasRef.current.height / 2 - (x2 + view.offset.y) * view.zoom;
    const screenRadius = radius * Math.pow(view.zoom, 0.75);

    // Store for hit detection
    renderedObjectsRef.current.push({
      type: 'sector',
      data: sector,
      coords: sector.coordinates, // Store world coordinates
      screenX,
      screenY,
      hitRadius: screenRadius
    });

    // Check discovery level
    const discoveryLevel = sector.discoveryLevel ?? 2;

    const isContested = sector.contested;
    const isSelected = selectedObject?.type === 'sector' && selectedObject?.data.id === sector.id;
    const isHovered = hoveredObject?.type === 'sector' && hoveredObject?.data.id === sector.id;

    // Apply fog of war
    if (discoveryLevel === 0) {
      ctx.strokeStyle = '#44444420';
      ctx.fillStyle = '#44444410';
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(screenX, screenY, screenRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      return;
    } else if (discoveryLevel === 1) {
      ctx.strokeStyle = isSelected ? '#00ff00' : (isHovered ? '#64b5ff80' : (isContested ? '#ff990060' : '#64b5f660'));
      ctx.fillStyle = isSelected || isHovered ? '#64b5f630' : '#64b5f620';
      ctx.lineWidth = isSelected ? 3 : 1.5;
    } else {
      ctx.strokeStyle = isSelected ? '#00ff00' : (isHovered ? '#64b5ffff' : (isContested ? '#ff9900' : '#64b5f6'));
      ctx.fillStyle = isSelected || isHovered ? '#64b5f630' : '#64b5f615';
      ctx.lineWidth = isSelected ? 3 : 1.5;
    }

    ctx.setLineDash(isContested && !isSelected ? [5, 5] : []);
    ctx.beginPath();
    ctx.arc(screenX, screenY, screenRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);

    if (view.zoom > 0.5) {
      ctx.fillStyle = isSelected ? '#00ff00' : (discoveryLevel === 1 ? '#888' : '#0ff');
      const fontSize = Math.max(8, Math.min(20, 10 * Math.pow(view.zoom, 0.4)));
      ctx.font = isSelected ? `bold ${fontSize}px monospace` : `${fontSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(sector.name, screenX, screenY - screenRadius - 5);
    }
  };

  const drawSystem = (ctx, system) => {
    const coords = system.coordinates;
    const x1 = coords[view.axis1];
    const x2 = coords[view.axis2];

    const screenX = canvasRef.current.width / 2 + (x1 + view.offset.x) * view.zoom;
    const screenY = canvasRef.current.height / 2 - (x2 + view.offset.y) * view.zoom;
    const screenRadius = Math.max(3, 15 * Math.pow(view.zoom, 0.5));

    // Store for hit detection
    renderedObjectsRef.current.push({
      type: 'system',
      data: system,
      coords: system.coordinates, // Store world coordinates
      screenX,
      screenY,
      hitRadius: screenRadius
    });

    // Check discovery level
    const discoveryLevel = system.discoveryLevel ?? 2;

    const isSelected = selectedObject?.type === 'system' && selectedObject?.data.id === system.id;
    const isHovered = hoveredObject?.type === 'system' && hoveredObject?.data.id === system.id;

    // Apply fog of war
    if (discoveryLevel === 0) {
      // Undiscovered - very dim
      ctx.strokeStyle = '#44444430';
      ctx.fillStyle = '#44444415';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(screenX, screenY, screenRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      return;
    } else if (discoveryLevel === 1) {
      // In sensor range - dimmed
      ctx.strokeStyle = isSelected ? '#00ff00' : (isHovered ? '#00ffff80' : '#0ff60');
      ctx.fillStyle = isSelected || isHovered ? 'rgba(0,255,255,0.25)' : 'rgba(0,255,255,0.08)';
      ctx.lineWidth = isSelected ? 2 : 1;
    } else {
      // Fully discovered
      ctx.strokeStyle = isSelected ? '#00ff00' : (isHovered ? '#00ffffff' : '#0ff');
      ctx.fillStyle = isSelected || isHovered ? 'rgba(0,255,255,0.3)' : 'rgba(0,255,255,0.1)';
      ctx.lineWidth = isSelected ? 2 : 1;
    }

    ctx.beginPath();
    ctx.arc(screenX, screenY, screenRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (view.zoom > 1) {
      ctx.fillStyle = isSelected ? '#00ff00' : (discoveryLevel === 1 ? '#888' : '#0ff');
      const fontSize = Math.max(8, Math.min(18, 8 * Math.pow(view.zoom, 0.5)));
      ctx.font = isSelected ? `bold ${fontSize}px monospace` : `${fontSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(system.name, screenX, screenY - screenRadius - 3);
    }
  };

  const drawHazard = (ctx, hazard) => {
    const coords = hazard.coordinates;
    const x1 = coords[view.axis1];
    const x2 = coords[view.axis2];
    const radius = hazard.radius;

    const screenX = canvasRef.current.width / 2 + (x1 + view.offset.x) * view.zoom;
    const screenY = canvasRef.current.height / 2 - (x2 + view.offset.y) * view.zoom;
    const screenRadius = radius * Math.pow(view.zoom, 0.75);

    // Check discovery level
    const discoveryLevel = hazard.discoveryLevel ?? 2;

    // Apply fog of war
    if (discoveryLevel === 0) {
      // Undiscovered - don't show hazards at all
      return;
    } else if (discoveryLevel === 1) {
      // In sensor range - dimmed warning
      ctx.strokeStyle = '#ff6b6b40';
      ctx.fillStyle = '#ff6b6b08';
      ctx.lineWidth = 1;
    } else {
      // Fully discovered - clear warning
      ctx.strokeStyle = '#ff6b6b60';
      ctx.fillStyle = '#ff6b6b15';
      ctx.lineWidth = 1;
    }

    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.arc(screenX, screenY, screenRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);

    if (view.zoom > 0.7) {
      ctx.fillStyle = discoveryLevel === 1 ? '#ff6b6b80' : '#ff6b6b';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('⚠', screenX, screenY + 4);
    }
  };

  const drawObject = (ctx, obj) => {
    const coords = obj.coords;
    const x1 = coords[view.axis1];
    const x2 = coords[view.axis2];
    const depth = coords[view.depthAxis];

    const screenX = canvasRef.current.width / 2 + (x1 + view.offset.x) * view.zoom;
    const screenY = canvasRef.current.height / 2 - (x2 + view.offset.y) * view.zoom;

    const depthRange = bounds['max' + view.depthAxis.toUpperCase()] - bounds['min' + view.depthAxis.toUpperCase()];
    const depthNormalized = (depth - bounds['min' + view.depthAxis.toUpperCase()]) / depthRange;
    const depthFactor = 1 - (depthNormalized - 0.5) * depthColorIntensity;

    // Check discovery level
    const discoveryLevel = obj.data.discoveryLevel ?? 2;

    const baseColor = hexToRgb(obj.color);

    // Apply fog of war to color - adjust alpha based on discovery level
    let baseAlpha = 0.7 + depthNormalized * 0.3;
    let colorDimming = 1.0;

    if (discoveryLevel === 0) {
      // Undiscovered - very dim (shouldn't happen as they're filtered, but just in case)
      baseAlpha *= 0.2;
      colorDimming = 0.3;
    } else if (discoveryLevel === 1) {
      // In sensor range - dimmed
      baseAlpha *= 0.5;
      colorDimming = 0.6;
    }

    const finalColor = `rgba(${Math.floor(baseColor.r * depthFactor * colorDimming)}, ${Math.floor(baseColor.g * depthFactor * colorDimming)}, ${Math.floor(baseColor.b * depthFactor * colorDimming)}, ${baseAlpha})`;

    // Better scaling at extreme zoom levels
    const zoomFactor = view.zoom < 1 ? 1 : Math.pow(view.zoom, 0.5);
    const baseRadius = obj.type === 'star' ? pointSize * 1.5 : pointSize;
    const radius = Math.max(2, baseRadius * zoomFactor);

    // Store for hit detection
    renderedObjectsRef.current.push({
      type: obj.type,
      data: obj.data,
      coords: obj.coords, // Store world coordinates for planets
      screenX,
      screenY,
      hitRadius: radius + 3 // Add a bit of padding for easier clicking
    });

    // Check if selected or hovered
    const isSelected = selectedObject?.type === obj.type && selectedObject?.data.id === obj.data.id;
    const isHovered = hoveredObject?.type === obj.type && hoveredObject?.data.id === obj.data.id;

    // Draw glow effect if selected or hovered
    if (isSelected || isHovered) {
      ctx.fillStyle = isSelected ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 255, 255, 0.2)';
      ctx.beginPath();
      ctx.arc(screenX, screenY, radius * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = finalColor;
    ctx.beginPath();
    ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
    ctx.fill();

    // Draw selection ring
    if (isSelected) {
      ctx.strokeStyle = '#00ff00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(screenX, screenY, radius + 4, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw labels at high zoom levels
    if (obj.type === 'planet' && view.zoom > 3) {
      // Draw planet name label
      ctx.fillStyle = isSelected ? '#00ff00' : (discoveryLevel === 1 ? '#888888' : '#00ffff');
      const fontSize = Math.max(8, Math.min(14, 10 * Math.pow(view.zoom / 3, 0.4)));
      ctx.font = isSelected ? `bold ${fontSize}px monospace` : `${fontSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(obj.data.name, screenX, screenY + radius + fontSize + 2);
    } else if (obj.type === 'star' && view.zoom > 2) {
      // Draw star name label
      ctx.fillStyle = isSelected ? '#00ff00' : (discoveryLevel === 1 ? '#999999' : '#ffff00');
      const fontSize = Math.max(10, Math.min(16, 12 * Math.pow(view.zoom / 2, 0.4)));
      ctx.font = isSelected ? `bold ${fontSize}px monospace` : `${fontSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText(obj.data.name, screenX, screenY - radius - 4);
    }
  };

  const drawShipMarker = (ctx, ship, label, isPlayerShip = false) => {
    const x1 = parseFloat(ship.x);
    const x2 = parseFloat(ship.y);

    const screenX = canvasRef.current.width / 2 + (x1 + view.offset.x) * view.zoom;
    const screenY = canvasRef.current.height / 2 - (x2 + view.offset.y) * view.zoom;

    // Choose color: green for player ship, red for others
    const shipColor = isPlayerShip ? '#00ff00' : '#ff0000';

    // Draw ship icon
    ctx.fillStyle = shipColor;
    ctx.strokeStyle = shipColor;
    ctx.lineWidth = 2;

    // Draw triangle for ship
    ctx.beginPath();
    ctx.moveTo(screenX, screenY - 10);
    ctx.lineTo(screenX - 7, screenY + 7);
    ctx.lineTo(screenX + 7, screenY + 7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw label
    ctx.fillStyle = shipColor;
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(label, screenX, screenY - 15);

    // Store for hit detection (for tooltips)
    renderedObjectsRef.current.push({
      type: 'ship',
      data: ship,
      coords: { x: x1, y: x2, z: parseFloat(ship.z || 0) },
      screenX,
      screenY,
      hitRadius: 15 // Larger hit area for ships
    });
  };

  const drawSensorRange = (ctx, shipLocation, sensorRange) => {
    if (!shipLocation || !sensorRange || sensorRange <= 0) return;

    const x1 = parseFloat(shipLocation.x);
    const x2 = parseFloat(shipLocation.y);

    const screenX = canvasRef.current.width / 2 + (x1 + view.offset.x) * view.zoom;
    const screenY = canvasRef.current.height / 2 - (x2 + view.offset.y) * view.zoom;
    const screenRadius = sensorRange * view.zoom;

    // Draw sensor range circle
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
    ctx.fillStyle = 'rgba(0, 255, 255, 0.05)';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 5]);

    ctx.beginPath();
    ctx.arc(screenX, screenY, screenRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw label for sensor range if zoomed in enough
    if (view.zoom > 0.5) {
      ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`SENSOR RANGE: ${sensorRange.toFixed(0)} ly`, screenX, screenY + screenRadius + 15);
    }
  };

  const getStarColor = (star) => {
    const colors = {
      'O': '#9bb0ff',
      'B': '#aabfff',
      'A': '#cad7ff',
      'F': '#f8f7ff',
      'G': '#fff4ea',
      'K': '#ffd2a1',
      'M': '#ffcc6f'
    };
    return colors[star.spectralType] || '#ffffff';
  };

  const getPlanetColor = (planet) => {
    // Habitable planets get a special green color
    if (planet.habitability && planet.habitability > 50) {
      return '#00ff00';
    }

    // Color by planet type
    const colors = {
      'Gas Giant': '#ffa500',
      'Ice Giant': '#87ceeb',
      'Rocky': '#8b7355',
      'Terrestrial': '#90ee90',
      'Ice': '#e0ffff',
      'Lava': '#ff4500',
      'Ocean': '#4682b4',
      'Desert': '#daa520',
      'Barren': '#696969'
    };

    return colors[planet.type] || '#888888';
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
  };

  // Hit detection - find object at mouse position
  const findObjectAtPosition = (mouseX, mouseY) => {
    // Search in reverse order (last rendered = on top)
    for (let i = renderedObjectsRef.current.length - 1; i >= 0; i--) {
      const obj = renderedObjectsRef.current[i];
      const dx = mouseX - obj.screenX;
      const dy = mouseY - obj.screenY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= obj.hitRadius) {
        return obj;
      }
    }
    return null;
  };

  // Draw tooltip
  const drawTooltip = (ctx) => {
    if (!hoveredObject || !tooltip.content) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const padding = 10;
    const lineHeight = 16;
    const lines = tooltip.content.split('\n');
    const maxWidth = Math.max(...lines.map(line => ctx.measureText(line).width));
    const boxWidth = maxWidth + padding * 2;
    const boxHeight = lines.length * lineHeight + padding * 2;

    let x = tooltip.x + 15;
    let y = tooltip.y - boxHeight - 10;

    // Keep tooltip on screen
    if (x + boxWidth > canvas.width) x = tooltip.x - boxWidth - 15;
    if (y < 0) y = tooltip.y + 20;

    // Draw background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(x, y, boxWidth, boxHeight);

    // Draw border
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, boxWidth, boxHeight);

    // Draw text
    ctx.fillStyle = '#00ffff';
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';
    lines.forEach((line, i) => {
      ctx.fillText(line, x + padding, y + padding + (i + 1) * lineHeight);
    });
  };

  // Generate tooltip content for an object
  const getTooltipContent = (obj) => {
    if (!obj) return '';

    switch (obj.type) {
      case 'star':
        return `⭐ ${obj.data.name}\nType: ${obj.data.spectralType}\nMass: ${obj.data.mass} M☉`;
      case 'planet':
        return `🪐 ${obj.data.name}\nType: ${obj.data.type}\nHabitability: ${obj.data.habitability || 0}%`;
      case 'region':
        return `🌌 ${obj.data.name}\nType: ${obj.data.type}\nControl: ${obj.data.controlledBy || 'None'}`;
      case 'sector':
        return `📍 ${obj.data.name}\nControl: ${obj.data.controlledBy || 'None'}\nContested: ${obj.data.contested ? 'Yes' : 'No'}`;
      case 'system':
        return `⚙️ ${obj.data.name}\nType: ${obj.data.type || 'Unknown'}`;
      case 'ship':
        // Check if player has Advanced Sensor Array for detailed info
        if (galaxyData?.hasAdvancedSensorArray) {
          return `🚀 ${obj.data.ship_name || 'Unknown Vessel'}\nClass: ${obj.data.ship_class || 'Unknown'}\nOwner: ${obj.data.owner_name || 'Unknown'}\nDistance: ${obj.data.distance || '?'} ly`;
        } else {
          // Limited info without Advanced Sensor Array
          return `🚀 Unknown Vessel\nDistance: ${obj.data.distance || '?'} ly`;
        }
      default:
        return obj.data.name || 'Unknown';
    }
  };

  // Mouse interaction handlers
  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    dragStartRef.current = { x: mouseX, y: mouseY };

    setView(prev => ({
      ...prev,
      isDragging: true,
      clickStartX: mouseX, // Store initial click position for click detection
      clickStartY: mouseY
    }));
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (view.isDragging) {
      const dx = mouseX - dragStartRef.current.x;
      const dy = mouseY - dragStartRef.current.y;

      // Update ref immediately for next drag event
      dragStartRef.current = { x: mouseX, y: mouseY };

      setView(prev => ({
        ...prev,
        offset: {
          x: prev.offset.x + dx / prev.zoom,
          y: prev.offset.y - dy / prev.zoom
        }
      }));
    } else {
      // Update hover state
      const hoveredObj = findObjectAtPosition(mouseX, mouseY);
      if (hoveredObj) {
        setHoveredObject(hoveredObj);
        setTooltip({
          show: true,
          x: mouseX,
          y: mouseY,
          content: getTooltipContent(hoveredObj)
        });
      } else {
        setHoveredObject(null);
        setTooltip({ show: false, x: 0, y: 0, content: '' });
      }
    }
  };

  const handleMouseUp = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Check if this was a click (not a drag)
    const clickThreshold = 5; // pixels
    const dx = mouseX - (view.clickStartX || mouseX);
    const dy = mouseY - (view.clickStartY || mouseY);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < clickThreshold) {
      // Calculate world coordinates using current view state
      const worldX = (mouseX - canvasRef.current.width / 2) / view.zoom - view.offset.x;
      const worldY = -(mouseY - canvasRef.current.height / 2) / view.zoom - view.offset.y;

      // Check if in DM positioning mode
      if (dmPositioningMode && onMapClick) {
        // Call the DM's positioning callback
        onMapClick(worldX, worldY);
        setClickCoordinates({ x: worldX, y: worldY });
      } else {
        // Normal selection behavior
        const clickedObj = findObjectAtPosition(mouseX, mouseY);

        if (clickedObj) {
          // Select the clicked object
          setSelectedObject(clickedObj);
          setClickCoordinates({ x: worldX, y: worldY });
        } else {
          // Clicked on empty space - store coordinates
          setClickCoordinates({ x: worldX, y: worldY });
          setSelectedObject(null);
        }
      }
    }

    setView(prev => ({ ...prev, isDragging: false }));
  };

  // Handle double-click to enter isolation mode
  const handleDoubleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const clickedObj = findObjectAtPosition(mouseX, mouseY);

    if (clickedObj && ['region', 'sector', 'system'].includes(clickedObj.type)) {
      // Enter isolation mode for this object
      setIsolation({
        level: clickedObj.type,
        id: clickedObj.data.id,
        data: clickedObj.data
      });

      // Also select and focus on it
      setSelectedObject(clickedObj);
      focusOnObject({
        type: clickedObj.type,
        data: clickedObj.data,
        coordinates: clickedObj.coords
      });
    }
  };

  // Exit isolation mode
  const exitIsolationMode = () => {
    setIsolation({ level: null, id: null, data: null });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setView(prev => ({
      ...prev,
      zoom: Math.max(0.1, Math.min(prev.zoom * delta, 50))
    }));
  };

  // Setup canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Setup wheel event listener with passive: false to allow preventDefault
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="relative w-full h-full bg-black">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${dmPositioningMode ? 'cursor-cell' : 'cursor-crosshair'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
        style={{ touchAction: 'none' }}
      />

      {/* UI Panels */}
      <div className="absolute top-4 left-4 w-80 z-10">
        {/* Search Panel */}
        <div className="bg-gray-900 bg-opacity-90 border border-cyan-500 rounded p-3 mb-4 shadow-lg shadow-cyan-500/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-cyan-300 font-mono text-sm font-bold">SCANNER</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
            onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
            placeholder="Search coordinates..."
            className="w-full bg-black text-cyan-300 border border-cyan-600 rounded px-3 py-2 font-mono text-sm focus:outline-none focus:border-cyan-400"
          />
          {showSearchResults && searchResults.length > 0 && (
            <div className="mt-2 bg-black border border-cyan-500 rounded max-h-48 overflow-y-auto">
              {searchResults.map((result, idx) => (
                <div
                  key={idx}
                  onClick={() => focusOnObject(result)}
                  className="px-3 py-2 cursor-pointer hover:bg-cyan-900 hover:bg-opacity-30 border-b border-cyan-800 last:border-b-0 transition"
                >
                  <span className="text-cyan-300 font-mono text-sm">{result.name}</span>
                  <span className="text-green-400 font-mono text-xs ml-2">[{result.type.toUpperCase()}]</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Layers Panel - Show in DM mode or if player has Advanced Memory Bank */}
        {(showAllShips || galaxyData?.hasAdvancedMemoryBank) && (
          <div className="bg-gray-900 bg-opacity-90 border border-cyan-500 rounded p-3 mb-4 shadow-lg shadow-cyan-500/30">
            <div className="text-cyan-300 font-mono text-sm font-bold mb-2">SECTORS</div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer text-cyan-300 font-mono text-xs hover:bg-cyan-900 hover:bg-opacity-20 px-2 py-1 rounded transition">
                <input
                  type="checkbox"
                  checked={filters.showRegions}
                  onChange={(e) => setFilters(prev => ({ ...prev, showRegions: e.target.checked }))}
                  className="accent-cyan-500"
                />
                <span>Regions</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer text-cyan-300 font-mono text-xs hover:bg-cyan-900 hover:bg-opacity-20 px-2 py-1 rounded transition">
                <input
                  type="checkbox"
                  checked={filters.showSectors}
                  onChange={(e) => setFilters(prev => ({ ...prev, showSectors: e.target.checked }))}
                  className="accent-cyan-500"
                />
                <span>Sectors</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer text-cyan-300 font-mono text-xs hover:bg-cyan-900 hover:bg-opacity-20 px-2 py-1 rounded transition">
                <input
                  type="checkbox"
                  checked={filters.showSystems}
                  onChange={(e) => setFilters(prev => ({ ...prev, showSystems: e.target.checked }))}
                  className="accent-cyan-500"
                />
                <span>Systems</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer text-cyan-300 font-mono text-xs hover:bg-cyan-900 hover:bg-opacity-20 px-2 py-1 rounded transition">
                <input
                  type="checkbox"
                  checked={filters.showHazards}
                  onChange={(e) => setFilters(prev => ({ ...prev, showHazards: e.target.checked }))}
                  className="accent-cyan-500"
                />
                <span>Hazards</span>
              </label>
            </div>
          </div>
        )}

        {/* Objects Panel */}
        <div className="bg-gray-900 bg-opacity-90 border border-cyan-500 rounded p-3 shadow-lg shadow-cyan-500/30">
          <div className="text-cyan-300 font-mono text-sm font-bold mb-2">OBJECTS</div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer text-cyan-300 font-mono text-xs hover:bg-cyan-900 hover:bg-opacity-20 px-2 py-1 rounded transition">
              <input
                type="checkbox"
                checked={filters.showStars}
                onChange={(e) => setFilters(prev => ({ ...prev, showStars: e.target.checked }))}
                className="accent-cyan-500"
              />
              <span>Stars</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer text-cyan-300 font-mono text-xs hover:bg-cyan-900 hover:bg-opacity-20 px-2 py-1 rounded transition">
              <input
                type="checkbox"
                checked={filters.showPlanets}
                onChange={(e) => setFilters(prev => ({ ...prev, showPlanets: e.target.checked }))}
                className="accent-cyan-500"
              />
              <span>Planets</span>
            </label>
            {/* Habitable Only filter - Show in DM mode or if player has Advanced Memory Bank */}
            {(showAllShips || galaxyData?.hasAdvancedMemoryBank) && (
              <label className="flex items-center space-x-2 cursor-pointer text-cyan-300 font-mono text-xs hover:bg-cyan-900 hover:bg-opacity-20 px-2 py-1 rounded transition">
                <input
                  type="checkbox"
                  checked={filters.showHabitable}
                  onChange={(e) => setFilters(prev => ({ ...prev, showHabitable: e.target.checked }))}
                  className="accent-cyan-500"
                  disabled={!filters.showPlanets}
                />
                <span className={!filters.showPlanets ? 'opacity-50' : ''}>Habitable Only</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Controls - Bottom Left */}
      <div className="absolute bottom-4 left-4 w-64 bg-gray-900 bg-opacity-90 border border-cyan-500 rounded p-3 shadow-lg shadow-cyan-500/30">
        <div className="text-cyan-300 font-mono text-sm font-bold mb-3">DISPLAY</div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-cyan-300 font-mono text-xs mb-1">
              <span>Point Size</span>
              <span className="text-green-400">{pointSize}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={pointSize}
              onChange={(e) => setPointSize(parseFloat(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>
          <button
            onClick={resetView}
            className="w-full bg-cyan-900 bg-opacity-30 hover:bg-opacity-50 text-cyan-300 border border-cyan-600 rounded px-3 py-2 font-mono text-xs transition"
          >
            RESET VIEW
          </button>
          <button
            onClick={autoFit}
            className="w-full bg-cyan-900 bg-opacity-30 hover:bg-opacity-50 text-cyan-300 border border-cyan-600 rounded px-3 py-2 font-mono text-xs transition"
          >
            AUTO-FIT
          </button>
          {/* Center on Ship button - Only show in player view */}
          {shipLocation && !showAllShips && (
            <button
              onClick={centerOnShip}
              className="w-full bg-green-900 bg-opacity-30 hover:bg-opacity-50 text-green-300 border border-green-600 rounded px-3 py-2 font-mono text-xs transition"
            >
              🎯 CENTER ON SHIP
            </button>
          )}
        </div>
      </div>

      {/* Zoom Info - Bottom Right */}
      <div className="absolute bottom-4 right-4 bg-gray-900 bg-opacity-90 border border-cyan-500 rounded px-4 py-2 shadow-lg shadow-cyan-500/30">
        <span className="text-cyan-300 font-mono text-sm">
          ZOOM: <span className="text-green-400">{Math.round(view.zoom * 100)}%</span>
        </span>
      </div>

      {/* Isolation Mode Banner */}
      {isolation.level && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-purple-900 bg-opacity-95 border-2 border-purple-400 rounded-lg px-6 py-3 shadow-lg shadow-purple-500/50 flex items-center gap-4 z-20">
          <div className="flex items-center gap-2">
            <span className="text-purple-300 font-mono text-sm font-bold">ISOLATION MODE:</span>
            <span className="text-yellow-300 font-mono text-sm">{isolation.data.name}</span>
            <span className="text-purple-400 font-mono text-xs uppercase">[{isolation.level}]</span>
          </div>
          <button
            onClick={exitIsolationMode}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded font-mono text-xs font-bold transition-colors border border-red-400"
          >
            EXIT
          </button>
        </div>
      )}

      {/* Information Panel - Right Side */}
      {(selectedObject || clickCoordinates) && (
        <div className="absolute top-4 right-4 w-80 max-h-[calc(100vh-100px)] overflow-y-auto bg-gray-900 bg-opacity-95 border-2 border-cyan-500 rounded p-4 shadow-lg shadow-cyan-500/50">
          <div className="flex justify-between items-center mb-3">
            <div className="text-cyan-300 font-mono text-sm font-bold">
              {selectedObject ? 'OBJECT INFO' : 'COORDINATES'}
            </div>
            <button
              onClick={() => {
                setSelectedObject(null);
                setClickCoordinates(null);
              }}
              className="text-red-400 hover:text-red-300 font-bold text-lg"
            >
              ✕
            </button>
          </div>

          {selectedObject && (
            <div className="space-y-3">
              {/* Object Header */}
              <div className="border-b border-cyan-700 pb-2">
                <div className="text-green-400 font-mono text-lg font-bold">
                  {selectedObject.type === 'ship'
                    ? (galaxyData?.hasAdvancedSensorArray ? (selectedObject.data.ship_name || 'Unknown Vessel') : 'Unknown Contact')
                    : selectedObject.data.name
                  }
                </div>
                <div className="text-cyan-400 font-mono text-xs uppercase mt-1">
                  {selectedObject.type}
                </div>
              </div>

              {/* Object Details */}
              <div className="space-y-2 text-sm font-mono">
                {selectedObject.type === 'star' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Spectral Type:</span>
                      <span className="text-cyan-300">{selectedObject.data.spectralType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Mass:</span>
                      <span className="text-cyan-300">{selectedObject.data.mass} M☉</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Age:</span>
                      <span className="text-cyan-300">{selectedObject.data.age} Gyr</span>
                    </div>
                    {selectedObject.data.planets && selectedObject.data.planets.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-cyan-800">
                        <div className="text-gray-400 mb-1">Planets: {selectedObject.data.planets.length}</div>
                        <div className="max-h-32 overflow-y-auto space-y-1">
                          {selectedObject.data.planets.map((planet, idx) => (
                            <div key={idx} className="text-xs text-cyan-400 pl-2">
                              • {planet.name} ({planet.type})
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {selectedObject.type === 'planet' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-cyan-300">{selectedObject.data.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Orbit:</span>
                      <span className="text-cyan-300">{selectedObject.data.orbit} AU</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Habitability:</span>
                      <span className={selectedObject.data.habitability > 50 ? 'text-green-400' : 'text-red-400'}>
                        {selectedObject.data.habitability || 0}%
                      </span>
                    </div>
                    {selectedObject.data.temperature && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Temperature:</span>
                        <span className="text-cyan-300">{selectedObject.data.temperature}</span>
                      </div>
                    )}
                    {selectedObject.data.atmosphere && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Atmosphere:</span>
                        <span className="text-cyan-300">{selectedObject.data.atmosphere}</span>
                      </div>
                    )}
                  </>
                )}

                {selectedObject.type === 'region' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-cyan-300">{selectedObject.data.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Controlled By:</span>
                      <span className="text-cyan-300">{selectedObject.data.controlledBy || 'None'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Radius:</span>
                      <span className="text-cyan-300">{selectedObject.data.radius} ly</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-cyan-800">
                      <div className="text-purple-300 text-xs italic bg-purple-900 bg-opacity-30 p-2 rounded border border-purple-600">
                        💡 Double-click on map to isolate this region
                      </div>
                    </div>
                  </>
                )}

                {selectedObject.type === 'sector' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Controlled By:</span>
                      <span className="text-cyan-300">{selectedObject.data.controlledBy || 'None'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Contested:</span>
                      <span className={selectedObject.data.contested ? 'text-red-400' : 'text-green-400'}>
                        {selectedObject.data.contested ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Radius:</span>
                      <span className="text-cyan-300">{selectedObject.data.radius} ly</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-cyan-800">
                      <div className="text-purple-300 text-xs italic bg-purple-900 bg-opacity-30 p-2 rounded border border-purple-600">
                        💡 Double-click on map to isolate this sector
                      </div>
                    </div>
                  </>
                )}

                {selectedObject.type === 'system' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-cyan-300">{selectedObject.data.type || 'Unknown'}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-cyan-800">
                      <div className="text-purple-300 text-xs italic bg-purple-900 bg-opacity-30 p-2 rounded border border-purple-600">
                        💡 Double-click on map to isolate this system
                      </div>
                    </div>
                  </>
                )}

                {selectedObject.type === 'ship' && (
                  <>
                    {galaxyData?.hasAdvancedSensorArray ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Name:</span>
                          <span className="text-red-400 font-bold">{selectedObject.data.ship_name || 'Unknown Vessel'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Class:</span>
                          <span className="text-cyan-300">{selectedObject.data.ship_class || 'Unknown'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Owner:</span>
                          <span className="text-cyan-300">{selectedObject.data.owner_name || 'Unknown'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Distance:</span>
                          <span className="text-yellow-400">{selectedObject.data.distance || '?'} ly</span>
                        </div>

                        {/* Armor Stats */}
                        {(selectedObject.data.armor_rating || selectedObject.data.current_armor !== undefined) && (
                          <div className="mt-3 pt-3 border-t border-cyan-800">
                            <div className="text-cyan-300 text-xs font-bold mb-2">ARMOR</div>
                            {selectedObject.data.armor_rating && (
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-400">Rating:</span>
                                <span className="text-cyan-300">{selectedObject.data.armor_rating}</span>
                              </div>
                            )}
                            {selectedObject.data.current_armor !== undefined && (
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-400">Integrity:</span>
                                <span className={selectedObject.data.current_armor < selectedObject.data.max_armor * 0.5 ? 'text-red-400' : 'text-green-400'}>
                                  {selectedObject.data.current_armor} / {selectedObject.data.max_armor}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Components */}
                        {selectedObject.data.components && selectedObject.data.components.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-cyan-800">
                            <div className="text-cyan-300 text-xs font-bold mb-2">COMPONENTS ({selectedObject.data.components.length})</div>
                            <div className="max-h-32 overflow-y-auto space-y-1">
                              {selectedObject.data.components.map((comp, idx) => (
                                <div key={idx} className="flex justify-between text-xs">
                                  <span className="text-gray-400">
                                    • {comp.component_name}
                                    {comp.is_advanced && <span className="text-purple-400 ml-1">[ADV]</span>}
                                  </span>
                                  <span className={comp.maintenance_enabled ? 'text-green-400' : 'text-red-400'}>
                                    {comp.maintenance_enabled ? 'ON' : 'OFF'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Weapons */}
                        {selectedObject.data.weapons && selectedObject.data.weapons.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-cyan-800">
                            <div className="text-cyan-300 text-xs font-bold mb-2">WEAPONS ({selectedObject.data.weapons.length})</div>
                            <div className="max-h-32 overflow-y-auto space-y-1">
                              {selectedObject.data.weapons.map((weapon, idx) => (
                                <div key={idx} className="text-xs">
                                  <div className="flex justify-between">
                                    <span className={weapon.is_damaged ? 'text-red-400' : 'text-gray-400'}>
                                      • {weapon.weapon_name}
                                      {weapon.weapon_type && <span className="text-gray-500 ml-1 text-[10px]">({weapon.weapon_type})</span>}
                                    </span>
                                    <span className="text-yellow-400">{weapon.damage_dice}</span>
                                  </div>
                                  {weapon.requires_ammo && (
                                    <div className="flex justify-between pl-3 text-[10px]">
                                      <span className="text-gray-500">Ammo:</span>
                                      <span className={weapon.ammo_loaded ? 'text-green-400' : 'text-red-400'}>
                                        {weapon.ammo_loaded ? 'Loaded' : 'Empty'}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Enhancements */}
                        {selectedObject.data.enhancements && selectedObject.data.enhancements.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-cyan-800">
                            <div className="text-cyan-300 text-xs font-bold mb-2">ENHANCEMENTS ({selectedObject.data.enhancements.length})</div>
                            <div className="max-h-32 overflow-y-auto space-y-1">
                              {selectedObject.data.enhancements.map((enh, idx) => (
                                <div key={idx} className="text-xs">
                                  <div className="text-purple-400">• {enh.enhancement_name}</div>
                                  {enh.description && (
                                    <div className="text-gray-500 pl-3 text-[10px] italic">{enh.description}</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mt-3 pt-3 border-t border-cyan-800">
                          <div className="text-green-300 text-xs italic bg-green-900 bg-opacity-30 p-2 rounded border border-green-600">
                            ✓ Advanced Sensor Array: Full ship data available
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Vessel:</span>
                          <span className="text-red-400">Unknown Contact</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Distance:</span>
                          <span className="text-yellow-400">{selectedObject.data.distance || '?'} ly</span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-cyan-800">
                          <div className="text-yellow-300 text-xs italic bg-yellow-900 bg-opacity-30 p-2 rounded border border-yellow-600">
                            ⚠ Limited data: Install Advanced Sensor Array for detailed ship information
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* Coordinates */}
                {selectedObject.data.coordinates && (
                  <div className="mt-3 pt-3 border-t border-cyan-800">
                    <div className="text-gray-400 text-xs mb-1">COORDINATES:</div>
                    <div className="text-green-400 text-xs">
                      X: {selectedObject.data.coordinates.x?.toFixed(2) || 'N/A'}<br />
                      Y: {selectedObject.data.coordinates.y?.toFixed(2) || 'N/A'}<br />
                      Z: {selectedObject.data.coordinates.z?.toFixed(2) || 'N/A'}
                    </div>
                  </div>
                )}
                {selectedObject.coords && !selectedObject.data.coordinates && (
                  <div className="mt-3 pt-3 border-t border-cyan-800">
                    <div className="text-gray-400 text-xs mb-1">COORDINATES:</div>
                    <div className="text-green-400 text-xs">
                      X: {selectedObject.coords.x?.toFixed(2) || 'N/A'}<br />
                      Y: {selectedObject.coords.y?.toFixed(2) || 'N/A'}<br />
                      Z: {selectedObject.coords.z?.toFixed(2) || 'N/A'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {!selectedObject && clickCoordinates && (
            <div className="text-sm font-mono">
              <div className="text-gray-400 mb-2">Click Position:</div>
              <div className="text-green-400">
                X: {clickCoordinates.x.toFixed(2)}<br />
                Y: {clickCoordinates.y.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GalaxyCanvas;
