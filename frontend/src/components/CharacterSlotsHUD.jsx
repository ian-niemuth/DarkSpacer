import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { WS_URL } from '../config/api';
import axios from 'axios';

function CharacterSlotsHUD() {
  const [searchParams] = useSearchParams();
  const hudKey = searchParams.get('key');
  const layout = searchParams.get('layout') || 'large-top'; // 'large-top', 'large-bottom', 'small-top', 'small-bottom'
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parse layout to get size
  const size = layout.startsWith('large') ? 'large' : 'small';

  // Dimensions based on size
  const dimensions = size === 'large'
    ? { width: 2200, height: 145 }
    : { width: 1365, height: 110 };

  // Fetch slot assignments (public endpoint with key)
  const fetchSlots = useCallback(async () => {
    try {
      const response = await axios.get(`${WS_URL}/api/public/slot-assignments`, {
        params: { key: hudKey, layout }
      });
      setSlots(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error fetching slot assignments:', error);
      setError(error.response?.data?.error || 'Failed to load HUD');
      setLoading(false);
    }
  }, [hudKey, layout]);

  // Initialize data and socket connection
  useEffect(() => {
    if (!hudKey) {
      setError('Access key required. Please use the link from the Admin Panel.');
      setLoading(false);
      return;
    }

    fetchSlots();

    // Connect to Socket.io for real-time updates
    const socket = io(WS_URL, {
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      console.log('[CharacterSlotsHUD] Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('[CharacterSlotsHUD] Socket disconnected');
    });

    socket.on('admin_refresh', () => {
      console.log('[CharacterSlotsHUD] Admin refresh event received');
      // Re-fetch slots with current hudKey and layout
      axios.get(`${WS_URL}/api/public/slot-assignments`, {
        params: { key: hudKey, layout }
      }).then(response => {
        setSlots(response.data);
      }).catch(error => {
        console.error('Error fetching slots on admin_refresh:', error);
      });
    });

    socket.on('character_updated', () => {
      console.log('[CharacterSlotsHUD] Character updated event received');
      // Re-fetch slots with current hudKey and layout
      axios.get(`${WS_URL}/api/public/slot-assignments`, {
        params: { key: hudKey, layout }
      }).then(response => {
        setSlots(response.data);
      }).catch(error => {
        console.error('Error fetching slots on character_updated:', error);
      });
    });

    socket.on('slot_assignments_updated', (data) => {
      console.log('[CharacterSlotsHUD] Slot assignments updated:', data);
      if (data.layout_type === layout) {
        axios.get(`${WS_URL}/api/public/slot-assignments`, {
          params: { key: hudKey, layout }
        }).then(response => {
          setSlots(response.data);
        }).catch(error => {
          console.error('Error fetching slots on slot_assignments_updated:', error);
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [hudKey, layout]); // Removed fetchSlots from dependencies

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


  // Error state
  if (error) {
    return (
      <div
        className="bg-black flex items-center justify-center"
        style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
      >
        <div className="text-center">
          <div className="text-white text-2xl mb-2 font-mono">ACCESS DENIED</div>
          <div className="text-gray-400 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div
        className="bg-black flex items-center justify-center"
        style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
      >
        <div className="text-white text-xl font-mono">LOADING...</div>
      </div>
    );
  }

  // No slots assigned state (show empty HUD)
  if (slots.length === 0) {
    return (
      <div
        className="bg-black"
        style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
      >
      </div>
    );
  }

  // Calculate slot width - distribute evenly based on number of slots
  const slotWidth = Math.floor(dimensions.width / slots.length);
  const slotHeight = dimensions.height;

  return (
    <div
      className="bg-black overflow-hidden flex"
      style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
    >
      {slots.map((slot, index) => {
        const isLastSlot = index === slots.length - 1;

        const isDowned = slot.hp_current <= 0;

        return (
          <div
            key={slot.id}
            className={`border-r-4 flex ${
              isDowned
                ? 'border-red-600 animate-pulse ring-8 ring-red-600 bg-red-900/30'
                : 'bg-white/5 border-white'
            }`}
            style={{
              width: isLastSlot ? 'auto' : `${slotWidth}px`,
              flex: isLastSlot ? '1' : 'none',
              height: `${slotHeight}px`,
              borderRight: isLastSlot ? 'none' : undefined,
              boxShadow: isDowned ? '0 0 40px rgba(220, 38, 38, 0.8), inset 0 0 60px rgba(220, 38, 38, 0.3)' : 'none'
            }}
          >
            {/* Left Column: HP */}
            <div className="flex-1 flex flex-col items-center justify-center border-r border-white/20 px-2">
              <div className="text-gray-400 font-mono uppercase font-bold mb-1" style={{
                fontSize: size === 'large' ? '1.25rem' : '1rem'
              }}>
                HP
              </div>
              <div className="text-white font-bold font-mono" style={{
                fontSize: size === 'large' ? '3.5rem' : '2.75rem',
                lineHeight: '1'
              }}>
                {slot.hp_current}/{slot.hp_max}
              </div>
            </div>

            {/* Center Column: Character Info */}
            <div className="flex-[2] flex flex-col items-center justify-center border-r border-white/20 px-3">
              <div className="text-white font-bold font-mono mb-1 truncate w-full text-center" style={{
                fontSize: size === 'large' ? '2.75rem' : '2rem',
                lineHeight: '1.1'
              }}>
                {slot.name}
              </div>
              <div className="text-gray-400 font-mono mb-1" style={{
                fontSize: size === 'large' ? '1.25rem' : '1rem'
              }}>
                Level {slot.level} - {slot.archetype}
              </div>
              {slot.crew_role && (
                <div className="text-gray-500 font-mono" style={{
                  fontSize: size === 'large' ? '1.125rem' : '0.875rem'
                }}>
                  {slot.crew_role}
                </div>
              )}
            </div>

            {/* Right Column: Armor */}
            <div className="flex-1 flex flex-col items-center justify-center px-2">
              <div className="text-gray-400 font-mono uppercase font-bold mb-1" style={{
                fontSize: size === 'large' ? '1.25rem' : '1rem'
              }}>
                ARMOR
              </div>
              <div className="text-white font-bold font-mono" style={{
                fontSize: size === 'large' ? '3.5rem' : '2.75rem',
                lineHeight: '1'
              }}>
                {slot.ac}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CharacterSlotsHUD;
