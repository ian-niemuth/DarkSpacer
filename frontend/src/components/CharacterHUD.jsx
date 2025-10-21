import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { API_URL, WS_URL } from '../config/api';
import axios from 'axios';

function CharacterHUD() {
  const [searchParams] = useSearchParams();
  const hudKey = searchParams.get('key');
  const [characters, setCharacters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [fadeState, setFadeState] = useState('fade-in');

  // Fetch all characters (public endpoint with key)
  const fetchCharacters = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/public/hud-characters`, {
        params: { key: hudKey }
      });
      setCharacters(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setError(error.response?.data?.error || 'Failed to load HUD');
      setLoading(false);
    }
  }, [hudKey]);

  // Initialize data and socket connection
  useEffect(() => {
    if (!hudKey) {
      setError('Access key required. Please use the link from the Admin Panel.');
      setLoading(false);
      return;
    }

    fetchCharacters();

    // Connect to Socket.io for real-time updates (without auth token)
    const socket = io(WS_URL, {
      transports: ['websocket', 'polling']
    });

    socket.on('admin_refresh', () => {
      console.log('[CharacterHUD] Admin refresh event received');
      fetchCharacters();
    });

    socket.on('character_updated', () => {
      console.log('[CharacterHUD] Character updated event received');
      fetchCharacters();
    });

    return () => {
      socket.disconnect();
    };
  }, [fetchCharacters, hudKey]);

  // Auto-cycle through characters every 15 seconds
  useEffect(() => {
    if (isPaused || characters.length === 0) return;

    const interval = setInterval(() => {
      setFadeState('fade-out');

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % characters.length);
        setFadeState('fade-in');
      }, 500); // Match CSS transition duration
    }, 15000);

    return () => clearInterval(interval);
  }, [characters.length, isPaused]);

  // Set body overflow to hidden and ensure proper sizing
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    return () => {
      document.body.style.overflow = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPaused(!isPaused);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        setFadeState('fade-out');
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % characters.length);
          setFadeState('fade-in');
        }, 500);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setFadeState('fade-out');
        setTimeout(() => {
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? characters.length - 1 : prevIndex - 1
          );
          setFadeState('fade-in');
        }, 500);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [characters.length, isPaused]);

  // Helper function to calculate ability modifier
  const getMod = (score) => {
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  // Error state
  if (error) {
    return (
      <div className="w-[1360px] h-[880px] bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-3xl mb-4 font-mono">ACCESS DENIED</div>
          <div className="text-gray-400 text-xl">{error}</div>
          <div className="text-gray-600 text-base mt-4">Please use the "Streaming HUD" link from the Admin Panel</div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="w-[1360px] h-[880px] bg-black flex items-center justify-center">
        <div className="text-white text-3xl font-mono">LOADING...</div>
      </div>
    );
  }

  // No characters state
  if (characters.length === 0) {
    return (
      <div className="w-[1360px] h-[880px] bg-black flex items-center justify-center">
        <div className="text-gray-400 text-2xl font-mono">NO CHARACTERS IN CAMPAIGN</div>
      </div>
    );
  }

  const character = characters[currentIndex];
  const hpPercent = (character.hp_current / character.hp_max) * 100;

  // HP color based on percentage (monochrome)
  const getHPColor = () => {
    if (hpPercent > 75) return 'bg-white';
    if (hpPercent > 50) return 'bg-white/80';
    if (hpPercent > 25) return 'bg-white/60';
    return 'bg-white/40';
  };

  return (
    <div className="w-[1360px] h-[880px] bg-black overflow-hidden relative">
      {/* Subtle scanline effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '100% 4px'
        }}></div>
      </div>

      {/* Main HUD Container */}
      <div className={`relative w-full h-full transition-opacity duration-500 ${
        fadeState === 'fade-in' ? 'opacity-100' : 'opacity-0'
      }`}>

        {/* Main Content Area - Full Height */}
        <div className="absolute inset-0 flex gap-8 p-6">

          {/* LEFT PANEL - Portrait & Identity */}
          <div className="w-[45%] flex flex-col gap-6">

            {/* Character Portrait & Name */}
            <div className="bg-white/5 border border-white/20 p-8 flex flex-col items-center justify-center flex-1">
              {/* Portrait Placeholder */}
              <div className="w-80 h-80 bg-white/10 border-2 border-white/30 flex items-center justify-center mb-8">
                <div className="text-white/60 text-9xl">
                  {character.archetype === 'Charming' && '😎'}
                  {character.archetype === 'Clever' && '🧠'}
                  {character.archetype === 'Quick' && '⚡'}
                  {character.archetype === 'Strong' && '💪'}
                  {character.archetype === 'Tough' && '🛡️'}
                  {character.archetype === 'Wise' && '🔮'}
                </div>
              </div>

              {/* Character Name */}
              <div className="text-center w-full">
                <h1 className="text-7xl font-bold text-white mb-6 tracking-wide uppercase">
                  {character.name}
                </h1>
                <div className="text-4xl text-gray-300 font-light mb-4">
                  Level {character.level} {character.species} - {character.archetype}
                </div>
                <div className="text-2xl text-gray-500 uppercase tracking-widest">
                  {character.background}
                </div>
              </div>
            </div>

            {/* Credits & XP */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/20 p-6">
                <div className="text-gray-400 text-2xl font-mono uppercase tracking-wider mb-3">CREDITS</div>
                <div className="text-white text-6xl font-bold font-mono">{character.credits}</div>
              </div>
              <div className="bg-white/5 border border-white/20 p-6">
                <div className="text-gray-400 text-2xl font-mono uppercase tracking-wider mb-3">EXP</div>
                <div className="text-white text-6xl font-bold font-mono">{character.xp}</div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Stats & Equipment */}
          <div className="w-[55%] flex flex-col gap-6">

            {/* Core Combat Stats */}
            <div className="grid grid-cols-3 gap-6">
              {/* HP Bar */}
              <div className="col-span-2 bg-white/5 border border-white/20 p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-400 text-2xl font-mono uppercase tracking-wider">HEALTH</span>
                  <span className="text-white text-5xl font-bold font-mono">
                    {character.hp_current} <span className="text-gray-500">/</span> {character.hp_max}
                  </span>
                </div>
                <div className="w-full bg-black/50 border border-white/10 h-12">
                  <div
                    className={`${getHPColor()} h-12 transition-all duration-500 flex items-center justify-center`}
                    style={{ width: `${Math.max(0, Math.min(100, hpPercent))}%` }}
                  >
                    {hpPercent > 15 && (
                      <span className="text-white font-bold text-xl font-mono">
                        {Math.round(hpPercent)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* AC */}
              <div className="bg-white/5 border border-white/20 p-6 flex flex-col items-center justify-center">
                <div className="text-gray-400 text-2xl font-mono uppercase tracking-wider mb-2">ARMOR</div>
                <div className="text-white text-7xl font-bold font-mono">{character.ac}</div>
              </div>
            </div>

            {/* Ability Scores */}
            <div className="bg-white/5 border border-white/20 p-6">
              <div className="text-gray-400 text-2xl font-mono uppercase tracking-wider mb-4">ATTRIBUTES</div>
              <div className="grid grid-cols-6 gap-4">
                {[
                  { name: 'STR', value: character.strength },
                  { name: 'DEX', value: character.dexterity },
                  { name: 'CON', value: character.constitution },
                  { name: 'INT', value: character.intelligence },
                  { name: 'WIS', value: character.wisdom },
                  { name: 'CHA', value: character.charisma }
                ].map((ability) => (
                  <div
                    key={ability.name}
                    className="bg-black/30 border border-white/20 p-4 text-center"
                  >
                    <div className="text-gray-500 text-base font-mono mb-2">
                      {ability.name}
                    </div>
                    <div className="text-white text-5xl font-bold font-mono">
                      {ability.value}
                    </div>
                    <div className="text-gray-400 text-xl font-mono mt-1">
                      {getMod(ability.value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment & Inventory - Combined */}
            <div className="bg-white/5 border border-white/20 p-6 flex-1 flex flex-col">
              <div className="text-gray-400 text-2xl font-mono uppercase tracking-wider mb-4">EQUIPMENT & INVENTORY</div>

              {/* Equipped Gear */}
              <div className="space-y-3 mb-6 flex-1 overflow-y-auto">
                {character.equipped_gear && character.equipped_gear.length > 0 ? (
                  character.equipped_gear.slice(0, 8).map((item, idx) => {
                    const requiresCell = item.properties && item.properties.includes('EC');
                    const hasCell = item.loaded_energy_cell_id && item.loaded_energy_cell_id > 0;
                    const requiresAmmo = item.properties && item.properties.includes('Am');
                    const hasAmmo = item.loaded_ammo_id && item.loaded_ammo_id > 0;

                    return (
                      <div key={idx} className="bg-black/30 border border-white/10 p-3 flex justify-between items-center">
                        <div className="flex-1">
                          <div className="text-white font-semibold text-lg mb-1">
                            {item.item_name}
                          </div>
                          <div className="text-gray-500 text-base flex items-center gap-3 font-mono">
                            {item.damage && <span>{item.damage}</span>}
                            {item.range && <span>{item.range}</span>}
                          </div>
                        </div>
                        <div className="flex gap-2 text-xl">
                          {requiresCell && (
                            <span className={hasCell ? 'text-white' : 'text-gray-600'}>
                              {hasCell ? '⚡' : '○'}
                            </span>
                          )}
                          {requiresAmmo && (
                            <span className={hasAmmo ? 'text-white' : 'text-gray-600'}>
                              {hasAmmo ? '●' : '○'}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-gray-600 text-lg">No equipped gear</div>
                )}
              </div>

              {/* Inventory Capacity */}
              {character.slots_used !== undefined && character.slots_max !== undefined && (
                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-400 text-xl font-mono uppercase">CAPACITY</span>
                    <span className="text-white text-4xl font-bold font-mono">
                      {character.slots_used} <span className="text-gray-600">/</span> {character.slots_max}
                    </span>
                  </div>
                  <div className="w-full bg-black/50 border border-white/10 h-10">
                    <div
                      className={`h-10 transition-all duration-500 ${
                        character.slots_used > character.slots_max
                          ? 'bg-white'
                          : 'bg-white/60'
                      }`}
                      style={{
                        width: `${Math.min(100, (character.slots_used / character.slots_max) * 100)}%`
                      }}
                    ></div>
                  </div>
                  {character.slots_used > character.slots_max && (
                    <div className="text-white text-base mt-2 font-mono animate-pulse">
                      OVERENCUMBERED
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pause Indicator (top-right corner) */}
      {isPaused && (
        <div className="absolute top-4 right-4 text-white text-sm bg-white/10 px-4 py-2 border border-white/30 font-mono animate-pulse">
          ⏸ PAUSED
        </div>
      )}
    </div>
  );
}

export default CharacterHUD;
