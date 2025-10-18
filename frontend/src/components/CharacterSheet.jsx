// Enhanced CharacterSheet.jsx - FIXED JSON parsing issues
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../config/api';
import { io } from 'socket.io-client';
import { API_URL, WS_URL } from '../config/api';
import LevelUpModal from './LevelUpModal';
import { PropertiesDisplay } from './PropertyTooltip';
import PropertiesGuideModal from './PropertiesGuideModal';

const ARCHETYPE_DATA = {
  'Charming': {
    abilities: [
      { name: 'Languages', description: 'You know four additional common languages and one rare language.' },
      { name: 'Know a Guy', description: 'Whenever you are in a populated area, you might "know someone who knows someone" who might be able to help you with supplies, information, repairs or whatever it is you need. Make a Charisma check DC 12 to locate a contact that might help you. You still have to compensate them for whatever services required but they are discreet and it is off the record.' },
      { name: 'Sway', description: 'Make a Charisma check to sway your audience with one of the following effects. If you fail, you can\'t use that effect again until you successfully rest.\n• Motivate. DC 12. One target in NEAR gains a luck token if they do not have one.\n• Beguile. DC 15. You transfix targets whose total levels are equal up to your level plus CHA modifier within near for 1d4 rounds.' },
      { name: 'Bon Vivant', description: 'Groups carousing with 1 or more Charming characters add 1d6 to their rolls.' }
    ]
  },
  'Clever': {
    abilities: [
      { name: 'Languages', description: 'You know two additional common languages and two rare languages.' },
      { name: 'Expert Knowledge', description: 'Choose one non-combat Area of Expertise of your choosing. Try not to be too broad or too narrow (ex. Medicine is too broad, brain surgery is too narrow). Collaborate with your GM if needed. Add +1 to any rolls associated with that area of expertise. In addition, add half your level to these rolls (round down).' },
      { name: 'Keen Support', description: '3/day, when an ally is about to make a non-combat roll, make a DC 9 Intelligence check. If you succeed, they can add +1d4 to their roll.', usesPerDay: 3 }
    ]
  },
  'Quick': {
    abilities: [
      { name: 'Quick Shot', description: "If you're sneaky and the creature doesn't see you coming, you get to roll extra weapon dice for damage equal to half your level (rounded down)." },
      { name: 'Never Tell Me the Odds', description: 'Start each game with a Luck Token. After you have finished a rest you get a Luck Token if you don\'t already have one.' },
      { name: 'Reflexes', description: 'You have advantage on DEX checks to avoid a dangerous situation, such as avoiding a laser mine or flying through an asteroid field.' }
    ]
  },
  'Strong': {
    abilities: [
      { name: 'Hauler', description: 'Add your CON modifier, if positive, to your gear slots.' },
      { name: 'Weapon Expertise', description: 'Pick a category of melee weapon, like blunt weapons. You get +1 to hit and do damage with that kind of weapon. On top of that, add half your level to those rolls (rounded down).' },
      { name: 'Grit', description: "You have advantage on STR checks to overcome an opposing force, such as kicking open a stuck cargo hatch or pulling a robot's arm off." }
    ]
  },
  'Tough': {
    abilities: [
      { name: 'Stout', description: 'Start with +2 HP. Roll hit points per level with advantage.' },
      { name: 'Resilient', description: 'You have advantage on CON checks to resist permanent injury, disease, poison, or endure extreme environments.' },
      { name: 'Unyielding', description: '3/day, when you drop to 0 HP, make a DC 18 CON check (the Resilient talent applies). If you succeed, you tough it out and stay at 1 HP instead of going down.', usesPerDay: 3 }
    ]
  },
  'Wise': {
    abilities: [
      { name: 'Optimization', description: 'If you use a luck token, add 1d6 to the new roll.' },
      { name: 'Enlightenment', description: '3/day, you can make a DC 9 WIS check. On a success, gain a luck token (you can\'t have more than one luck token at a time).', usesPerDay: 3, isEnlightenment: true },
      { name: 'Insightful Defense', description: 'Add half your level (round down, minimum 1) to your AC.' }
    ]
  }
};

const safeParseTalents = (talents) => {
  if (!talents) return [];
  
  // If it's already an array, return it
  if (Array.isArray(talents)) return talents;
  
  // If it's already an object, return it as array
  if (typeof talents === 'object') return [talents];
  
  // If it's a string, try to parse it
  if (typeof talents === 'string') {
    try {
      const parsed = JSON.parse(talents);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      console.error('Error parsing talents:', e);
      return [];
    }
  }
  
  return [];
};

function CharacterSheet() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [socket, setSocket] = useState(null);
  const [abilityUses, setAbilityUses] = useState({});
  const [inventoryInfo, setInventoryInfo] = useState({
  slotsUsed: 0,
  maxSlots: 10,
  percentFull: 0
});
  const [equippedGear, setEquippedGear] = useState([]);
  const [acBreakdown, setAcBreakdown] = useState('');
  const [poweredGear, setPoweredGear] = useState([]);
  const [availableCells, setAvailableCells] = useState([]);
  const [showCellModal, setShowCellModal] = useState(false);
  const [selectedItemForCell, setSelectedItemForCell] = useState(null);
  const [availableAmmo, setAvailableAmmo] = useState([]);
  const [showAmmoModal, setShowAmmoModal] = useState(false);
  const [selectedItemForAmmo, setSelectedItemForAmmo] = useState(null);
  const [showUseConfirm, setShowUseConfirm] = useState(false);
  const [selectedConsumable, setSelectedConsumable] = useState(null);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [selectedDiscard, setSelectedDiscard] = useState(null);
  const [ships, setShips] = useState([]);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [canLevelUp, setCanLevelUp] = useState(false);
  const [showPropertiesGuide, setShowPropertiesGuide] = useState(false);
  
  // Transfer/Gift states
  const [partyMembers, setPartyMembers] = useState([]);
  const [showTransferCredits, setShowTransferCredits] = useState(false);
  const [showGiftItem, setShowGiftItem] = useState(false);
  const [selectedGiftItem, setSelectedGiftItem] = useState(null);
  const [transferAmount, setTransferAmount] = useState('');
  const [giftQuantity, setGiftQuantity] = useState(1);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [transferNote, setTransferNote] = useState('');
  const [recipientSearch, setRecipientSearch] = useState('');

  const [showHPAdjust, setShowHPAdjust] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [communicatorPowered, setCommunicatorPowered] = useState(null); // null = loading, true/false = status

  // Toast notification system
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random(); // Unique ID
    const newToast = { id, message, type };

    setToasts(prev => [...prev, newToast]);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Play notification sound (3 pings)
  const playNotificationSound = () => {
    try {
      const playPing = (count) => {
        if (count >= 3) return;
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSiKzPDTgjMGHm7A7+OZUBMOX6Lt8bFjGwU7k9n0zn4qBSh+yO/aiTgIG2m98OScTgwOUqjj8bllHAY+mtvy0IEsBS19yPDajjgIG2e88OOXTxAOT6Pi8bVkHAU7k9jyz34qBSh+yO/aiTgIG2m98OScTgwOUqjj8bllHAY+mtvy0IEsBS19yPDajjgIG2i98OOYTw==');
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Could not play sound:', e));
        setTimeout(() => playPing(count + 1), 200); // 200ms delay between pings
      };
      playPing(0);
    } catch (error) {
      console.log('Sound notification failed:', error);
    }
  };

  // Fetch unread message count
  const fetchUnreadCount = async () => {
    try {
      const response = await api.get(`${API_URL}/comms/unread-count/${id}`);
      setUnreadMessages(response.data.unread_count);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  // Check communicator power status
  const checkCommunicatorPower = async () => {
    try {
      const response = await api.get(`${API_URL}/comms/power-status/${id}`);
      setCommunicatorPowered(response.data.powered);
    } catch (error) {
      console.error('Error checking communicator power:', error);
      setCommunicatorPowered(false);
    }
  };

  // Join ship rooms when ships change
  useEffect(() => {
    if (socket && ships.length > 0) {
      ships.forEach(ship => {
        socket.emit('join_ship_room', ship.id);
      });

      return () => {
        ships.forEach(ship => {
          socket.emit('leave_ship_room', ship.id);
        });
      };
    }
  }, [ships, socket]);

  useEffect(() => {
    fetchCharacter();
    fetchPartyMembers();
    fetchUnreadCount();
    fetchAvailableAmmo();
    checkCommunicatorPower();

    const token = localStorage.getItem('token');
    const newSocket = io(WS_URL, {
      auth: { token }
    });
    setSocket(newSocket);

    newSocket.emit('join_character', id);
    
    newSocket.on('character_updated', async (data) => {
      // Only show notification if not a silent update (e.g., HP changes)
      if (!data.silent && data.message) {
        addToast(data.message, 'success');
      }
      await fetchCharacter();

      // If canLevelUp is provided in the socket data, update it directly
      if (data.canLevelUp !== undefined) {
        setCanLevelUp(data.canLevelUp);
      }
    });
    
    newSocket.on('item_received', (data) => {
      addToast(data.message, 'success');
      fetchCharacter();
      checkCommunicatorPower();
    });
    
    newSocket.on('credits_received', (data) => {
      addToast(data.message, 'success');
      fetchCharacter();
    });
    
    newSocket.on('credits_updated', (data) => {
      addToast(data.message, 'success');
      fetchCharacter();
    });
    
    newSocket.on('inventory_updated', (data) => {
      // Silent update - data refreshes automatically (to avoid duplicate toasts)
      fetchCharacter();
      fetchPoweredGear(); // Explicitly refresh powered gear
      fetchEquippedGear(); // Explicitly refresh equipped gear
      fetchAvailableCells(); // Explicitly refresh available cells
      fetchAvailableAmmo(); // Explicitly refresh available ammo
    });

    newSocket.on('equipment_changed', (data) => {
      // Silent update - no toast (to avoid duplicates with item_removed)
      fetchCharacter(); // Refresh character data (including AC)
      fetchEquippedGear(); // Refresh equipped gear
      fetchPoweredGear(); // Refresh powered gear in case powered armor was equipped/unequipped
    });

    newSocket.on('item_removed', (data) => {
      // Only show toast if there's a meaningful message (typically from DM actions)
      if (data.message && !data.message.includes('updated')) {
        addToast(data.message, 'success');
      }
      fetchCharacter(); // Refresh character data
      fetchEquippedGear(); // Refresh equipped gear in case it was removed
      fetchPoweredGear(); // Refresh powered gear
      fetchAvailableCells(); // Refresh available cells
      fetchAvailableAmmo(); // Refresh available ammo
    });

    newSocket.on('daily_abilities_reset', (data) => {
      addToast(data.message, 'success');
      fetchAbilityUses();
    });

    newSocket.on('ship_updated', (data) => {
      // Ship updated - refresh ships list
      fetchShips();
    });

    newSocket.on('new_message', (data) => {
      console.log('[CharacterSheet] New message received:', data);
      // Only play sound if message is relevant to this character
      const isFromMe = data.sender_type === 'character' && data.sender_id === parseInt(id);
      const isForMe = (
        data.recipient_type === 'character' && data.recipient_id === parseInt(id)
      ) || (
        data.recipient_type === 'all'
      ) || (
        data.recipient_type === 'party'
      );

      // Play sound only if message is FOR this character and NOT from this character
      if (!isFromMe && isForMe) {
        playNotificationSound();
      }
      // New message received - refresh unread count
      fetchUnreadCount();
    });

    return () => {
      newSocket.disconnect();
    };
  }, [id]);

  const fetchCharacter = async () => {
    try {
      const response = await api.get(`${API_URL}/characters/${id}`);
      setCharacter(response.data);
      
      // Fetch ability uses from database
      fetchAbilityUses();
      //Fetch inventory info
      fetchInventoryInfo();
      fetchEquippedGear();
      fetchPoweredGear();
      fetchAvailableCells();
      fetchShips();
      checkLevelUpStatus();

    } catch (error) {
      console.error('Error fetching character:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInventoryInfo = async () => {
    try {
      const response = await api.get(`${API_URL}/inventory/${id}`);
      setInventoryInfo({
        slotsUsed: response.data.slotsUsed,
        maxSlots: response.data.maxSlots,
        percentFull: response.data.percentFull
      });
    } catch (error) {
      console.error('Error fetching inventory info:', error);
    }
  };

  const fetchEquippedGear = async () => {
    try {
      const response = await api.get(`${API_URL}/inventory/equipped/${id}`);
      setEquippedGear(response.data.equipped);
      setAcBreakdown(response.data.acBreakdown);
    } catch (error) {
      console.error('Error fetching equipped gear:', error);
    }
  };

  const handleEquip = async (itemId, slot) => {
    try {
      const response = await api.post(
        `${API_URL}/inventory/equip/${id}/${itemId}`,
        { slot }
      );
      if (response.data.message) {
        addToast(response.data.message, 'success');
      }
      fetchCharacter();
      fetchEquippedGear();
    } catch (error) {
      console.error('Error equipping item:', error);
      addToast(error.response?.data?.error || 'Failed to equip item', 'error');
    }
  };

  const handleUnequip = async (itemId) => {
    try {
      const response = await api.post(
        `${API_URL}/inventory/unequip/${id}/${itemId}`,
        {}
      );
      if (response.data.message) {
        addToast(response.data.message, 'success');
      }
      fetchCharacter();
      fetchEquippedGear();
    } catch (error) {
      console.error('Error unequipping item:', error);
      addToast(error.response?.data?.error || 'Failed to unequip item', 'error');
    }
  };

  const determineSlot = (item) => {
    const itemType = item.item_type?.toLowerCase();
    const itemName = item.item_name?.toLowerCase();
    
    if (itemType === 'weapon') {
      return 'primary_weapon';
    }
    if (itemName.includes('shield')) {
      return 'shield';
    }
    if (itemName.includes('helmet')) {
      return 'helmet';
    }
    if (itemType === 'armor') {
      return 'body_armor';
    }
    return null;
  };

  const fetchPoweredGear = async () => {
    try {
      const response = await api.get(`${API_URL}/inventory/powered-gear/${id}`);
      setPoweredGear(response.data);
    } catch (error) {
      console.error('Error fetching powered gear:', error);
    }
  };

  const fetchAvailableCells = async () => {
    try {
      const response = await api.get(`${API_URL}/inventory/energy-cells/available/${id}`);
      setAvailableCells(response.data);
    } catch (error) {
      console.error('Error fetching available cells:', error);
    }
  };

  const fetchAvailableAmmo = async () => {
    try {
      const response = await api.get(`${API_URL}/inventory/ammo-clips/available/${id}`);
      setAvailableAmmo(response.data);
    } catch (error) {
      console.error('Error fetching available ammo:', error);
    }
  };

  const fetchShips = async () => {
    try {
      const response = await api.get(`${API_URL}/player-ships/my-ships`);
      setShips(response.data);
    } catch (error) {
      console.error('Error fetching ships:', error);
    }
  };

  const fetchPartyMembers = async () => {
    try {
      const response = await api.get(`${API_URL}/characters/party`);
      // Filter out the current character
      setPartyMembers(response.data.filter(char => char.id !== parseInt(id)));
    } catch (error) {
      console.error('Error fetching party members:', error);
    }
  };

  const handleLoadCell = async (cellId) => {
    try {
      const response = await api.post(
        `${API_URL}/inventory/load-cell/${id}/${selectedItemForCell.id}`,
        { energyCellId: cellId }
      );
      if (response.data.message) {
        addToast(response.data.message, 'success');
      }
      setShowCellModal(false);
      setSelectedItemForCell(null);
      fetchCharacter();
      fetchPoweredGear();
      fetchAvailableCells();
      checkCommunicatorPower();
    } catch (error) {
      console.error('Error loading cell:', error);
      addToast(error.response?.data?.error || 'Failed to load energy cell', 'error');
    }
  };

  const handleUnloadCell = async (itemId) => {
    try {
      const response = await api.post(
        `${API_URL}/inventory/unload-cell/${id}/${itemId}`,
        {}
      );
      if (response.data.message) {
        addToast(response.data.message, 'success');
      }
      fetchCharacter();
      fetchPoweredGear();
      fetchAvailableCells();
      checkCommunicatorPower();
    } catch (error) {
      console.error('Error unloading cell:', error);
      addToast(error.response?.data?.error || 'Failed to unload energy cell', 'error');
    }
  };

  const handleLoadAmmo = async (ammoId) => {
    try {
      const response = await api.post(
        `${API_URL}/inventory/load-ammo/${id}/${selectedItemForAmmo.id}`,
        { ammoClipId: ammoId }
      );
      if (response.data.message) {
        addToast(response.data.message, 'success');
      }
      setShowAmmoModal(false);
      setSelectedItemForAmmo(null);
      fetchCharacter();
      fetchAvailableAmmo();
    } catch (error) {
      console.error('Error loading ammo:', error);
      addToast(error.response?.data?.error || 'Failed to load ammo', 'error');
    }
  };

  const handleUnloadAmmo = async (itemId) => {
    try {
      const response = await api.post(
        `${API_URL}/inventory/unload-ammo/${id}/${itemId}`,
        {}
      );
      if (response.data.message) {
        addToast(response.data.message, 'success');
      }
      fetchCharacter();
      fetchAvailableAmmo();
    } catch (error) {
      console.error('Error unloading ammo:', error);
      addToast(error.response?.data?.error || 'Failed to unload ammo', 'error');
    }
  };

  const handleUseConsumable = async () => {
    if (!selectedConsumable) return;

    try {
      await api.post(
        `${API_URL}/inventory/use-consumable/${id}/${selectedConsumable.id}`,
        {}
      );
      setShowUseConfirm(false);
      setSelectedConsumable(null);
      fetchCharacter();
      fetchAvailableCells();
    } catch (error) {
      console.error('Error using consumable:', error);
      addToast(error.response?.data?.error || 'Failed to use consumable', 'error');
      setShowUseConfirm(false);
      setSelectedConsumable(null);
    }
  };

  const handleDiscardItem = async () => {
    if (!selectedDiscard) return;

    try {
      await api.delete(
        `${API_URL}/inventory/discard/${id}/${selectedDiscard.id}`,
        { 
          data: { quantity: 1 }
        }
      );
      setShowDiscardConfirm(false);
      setSelectedDiscard(null);
      fetchCharacter();
      fetchAvailableCells();
    } catch (error) {
      console.error('Error discarding item:', error);
      addToast(error.response?.data?.error || 'Failed to discard item', 'error');
      setShowDiscardConfirm(false);
      setSelectedDiscard(null);
    }
  };

  const checkLevelUpStatus = async () => {
    try {
      const response = await api.get(`${API_URL}/advancement/can-level-up/${id}`);
      setCanLevelUp(response.data.canLevelUp);
    } catch (error) {
      console.error('Error checking level up status:', error);
    }
  };

  const handleHPAdjust = async (amount) => {
    const newHP = character.hp_current + amount;
    
    // Validate bounds
    if (newHP < 0 || newHP > character.hp_max) {
      addToast(`HP must be between 0 and ${character.hp_max}`, 'error');
      return;
    }

    try {
      await api.patch(`${API_URL}/characters/${id}/hp`, {
        hp_current: newHP
      });
      fetchCharacter();
      // Keep the HP adjustment panel open for multiple adjustments
    } catch (error) {
      console.error('Error adjusting HP:', error);
      addToast(error.response?.data?.error || 'Failed to adjust HP', 'error');
    }
  };

  const handleLevelUpComplete = () => {
    setShowLevelUpModal(false);
    fetchCharacter();
    checkLevelUpStatus();
  };

  const openTransferCredits = () => {
    setTransferAmount('');
    setSelectedRecipient('');
    setTransferNote('');
    setRecipientSearch('');
    setShowTransferCredits(true);
  };

  const openGiftItem = (item) => {
    setSelectedGiftItem(item);
    setGiftQuantity(1);
    setSelectedRecipient('');
    setRecipientSearch('');
    setShowGiftItem(true);
  };

  const handleTransferCredits = async () => {
    if (!selectedRecipient) {
      addToast('Please select a recipient', 'error');
      return;
    }

    const amount = parseInt(transferAmount);
    if (!amount || amount <= 0) {
      addToast('Please enter a valid amount', 'error');
      return;
    }

    if (amount > character.credits) {
      addToast(`Insufficient credits. You only have ${character.credits}cr`, 'error');
      return;
    }

    try {
      const recipient = partyMembers.find(p => p.id === parseInt(selectedRecipient));
      
      await api.post(
        `${API_URL}/characters/${id}/transfer-credits`,
        { 
          recipientId: selectedRecipient, 
          amount: amount,
          note: transferNote 
        }
      );

      addToast(`✅ Transferred ${amount}cr to ${recipient.name}!`, 'success');
      setShowTransferCredits(false);
      fetchCharacter();
    } catch (error) {
      console.error('Error transferring credits:', error);
      addToast(error.response?.data?.error || 'Failed to transfer credits', 'error');
    }
  };

  const handleGiftItem = async () => {
    if (!selectedRecipient) {
      addToast('Please select a recipient', 'error');
      return;
    }

    if (giftQuantity <= 0 || giftQuantity > selectedGiftItem.quantity) {
      addToast(`Invalid quantity. Must be between 1 and ${selectedGiftItem.quantity}`, 'error');
      return;
    }

    try {
      const recipient = partyMembers.find(p => p.id === parseInt(selectedRecipient));
      
      await api.post(
        `${API_URL}/inventory/gift-item/${id}/${selectedGiftItem.id}`,
        { 
          recipientId: selectedRecipient,
          quantity: giftQuantity
        }
      );

      addToast(`✅ Gifted ${giftQuantity}× ${selectedGiftItem.item_name} to ${recipient.name}!`, 'success');
      setShowGiftItem(false);
      setSelectedGiftItem(null);
      fetchCharacter();
    } catch (error) {
      console.error('Error gifting item:', error);
      addToast(error.response?.data?.error || 'Failed to gift item', 'error');
    }
  };

  const openLoadCellModal = (item) => {
    setSelectedItemForCell(item);
    setShowCellModal(true);
  };

  const openLoadAmmoModal = (item) => {
    setSelectedItemForAmmo(item);
    setShowAmmoModal(true);
  };

  const openUseConfirm = (item) => {
    setSelectedConsumable(item);
    setShowUseConfirm(true);
  };

  const openDiscardConfirm = (item) => {
    setSelectedDiscard(item);
    setShowDiscardConfirm(true);
  };

  const requiresEnergyCell = (item) => {
    const properties = item.properties || item.full_properties || '';
    const itemName = item.item_name?.toLowerCase() || '';

    // Energy cells themselves don't require energy cells!
    if (itemName.includes('energy cell')) {
      return false;
    }

    return properties.includes('EC');
  };

  const hasEnergyCell = (item) => {
    return item.loaded_energy_cell_id && item.loaded_energy_cell_id > 0;
  };

  const requiresAmmo = (item) => {
    const properties = item.properties || item.full_properties || '';
    const itemName = item.item_name?.toLowerCase() || '';

    // Ammo clips themselves don't require ammo!
    if (itemName.includes('ammo')) {
      return false;
    }

    return properties.includes('Am');
  };

  const hasAmmo = (item) => {
    return item.loaded_ammo_id && item.loaded_ammo_id > 0;
  };
  
  const fetchAbilityUses = async () => {
    try {
      const response = await api.get(`${API_URL}/abilities/${id}`);
      
      // Convert database format to state format
      const uses = {};
      response.data.forEach(use => {
        const key = `${use.ability_type}_${use.ability_index}`;
        if (!uses[key]) {
          uses[key] = [];
        }
        uses[key][use.use_index] = use.is_used;
      });
      
      setAbilityUses(uses);
    } catch (error) {
      console.error('Error fetching ability uses:', error);
      // If error (like table doesn't exist yet), initialize empty
      setAbilityUses({});
    }
  };
  
  const markAbilityAsUsed = async (abilityType, abilityIndex, useIndex) => {
    // Check if already used - if so, do nothing (can't uncheck)
    const key = `${abilityType}_${abilityIndex}`;
    if (abilityUses[key]?.[useIndex]) {
      // Already used, can't uncheck
      return;
    }
    
    try {
      await api.post(
        `${API_URL}/abilities/${id}/use`,
        { abilityType, abilityIndex, useIndex }
      );
      
      // Update local state - mark as used
      setAbilityUses(prev => {
        const newUses = { ...prev };
        if (!newUses[key]) {
          newUses[key] = [];
        }
        newUses[key] = [...(newUses[key] || [])];
        newUses[key][useIndex] = true;
        return newUses;
      });
    } catch (error) {
      console.error('Error marking ability as used:', error);
      addToast('Failed to mark ability as used', 'error');
    }
  };

  const calculateModifier = (stat) => {
    return Math.floor((stat - 10) / 2);
  };

  const getStatWithBonusInfo = (statName) => {
    if (!character || !character.talents) return null;
    
    // ✅ FIXED: Use safe parsing
    const talents = safeParseTalents(character.talents);
    const bonuses = talents.filter(t => {
      if (t.choice && t.statBonus) {
        const shortName = statName.substring(0, 3).toUpperCase();
        return t.choice.toUpperCase() === shortName;
      }
      if (t.nestedChoice && t.choice && t.choice.includes('+2')) {
        return t.nestedChoice.toUpperCase() === statName.substring(0, 3).toUpperCase();
      }
      return false;
    });
    
    return bonuses.length > 0 ? bonuses : null;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-white">Loading character...</div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-white">Character not found</div>
      </div>
    );
  }

  const archetypeAbilities = ARCHETYPE_DATA[character.archetype]?.abilities || [];
  // ✅ FIXED: Use safe parsing
  const talents = safeParseTalents(character.talents);

  return (
    <>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">

      {/* Level Up Available Banner */}
      {canLevelUp && (
        <div className="mb-3 sm:mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 sm:px-6 py-4 rounded-lg border-2 border-yellow-400 animate-pulse">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
              <div className="text-lg sm:text-xl font-bold">⬆️ Level Up Available!</div>
              <div className="text-sm">{character.name} can advance to Level {character.level + 1}</div>
            </div>
            <button
              onClick={() => setShowLevelUpModal(true)}
              className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition text-base sm:text-sm min-h-[44px] sm:min-h-0 whitespace-nowrap"
            >
              Level Up Now!
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <Link to="/" className="text-blue-400 hover:text-blue-300 inline-block text-base sm:text-sm min-h-[44px] sm:min-h-0 flex items-center">
          ← Back to Dashboard
        </Link>

        {communicatorPowered ? (
          <Link
            to={`/communicator/${id}`}
            className="relative bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
          >
            📡 Communicator
            {unreadMessages > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                {unreadMessages}
              </span>
            )}
          </Link>
        ) : (
          <div className="relative group">
            <button
              disabled
              className="bg-gray-600 text-gray-400 px-4 py-2 rounded-lg font-bold flex items-center gap-2 cursor-not-allowed opacity-60"
            >
              📡 Communicator ⚠️
            </button>
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap z-10 border border-red-500">
              <div className="font-bold text-red-400 mb-1">⚠️ OFFLINE</div>
              <div>Requires: Communicator + Energy Cell</div>
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-red-500"></div>
            </div>
          </div>
        )}
      </div>

      {/* Character Header - Enhanced with HP, AC, and Ability Scores */}
      <div className="bg-gray-800 rounded-lg mb-4 sm:mb-6 border border-gray-700">
        {/* Top Row - Name and Credits */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 p-4 sm:p-6 pb-3 sm:pb-4 border-b border-gray-700">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{character.name}</h1>
            <p className="text-gray-400 text-base sm:text-base">
              Level {character.level} {character.species} {character.archetype}
            </p>
            <p className="text-gray-500 text-sm">{character.background} • {character.motivation}</p>
            {character.ship_role && (
              <p className="text-blue-400 text-sm mt-1">Ship Role: {character.ship_role}</p>
            )}
          </div>
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:text-right">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-yellow-400">
                💰 {character.credits} cr
              </div>
              <div className="text-sm text-gray-400 mt-1">
                XP: {character.xp}
              </div>
            </div>
            <button
              onClick={openTransferCredits}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm font-semibold transition min-h-[44px] sm:min-h-0 whitespace-nowrap"
              disabled={partyMembers.length === 0}
              title={partyMembers.length === 0 ? 'No other characters available' : 'Transfer credits to another character'}
            >
              💸 Transfer
            </button>
          </div>
        </div>

        {/* Stats Row - HP, AC, and Ability Scores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-6">
          {/* HP */}
          <div className="bg-gray-700 rounded-lg p-3 sm:p-4">
            <div className="text-gray-400 text-xs sm:text-sm uppercase mb-1">Hit Points</div>
            <div className="text-2xl sm:text-3xl font-bold text-red-400 mb-2">
              {character.hp_current} / {character.hp_max}
            </div>
            
            {/* HP Adjustment Controls */}
            <div className="flex flex-col gap-2">
              {!showHPAdjust ? (
                <button
                  onClick={() => setShowHPAdjust(true)}
                  className="text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded min-h-[40px] sm:min-h-0"
                >
                  Adjust HP
                </button>
              ) : (
                <div className="space-y-2">
                  {/* Quick adjustment buttons */}
                  <div className="flex gap-1 sm:gap-2">
                    <button
                      onClick={() => handleHPAdjust(-5)}
                      disabled={character.hp_current <= 0}
                      className="flex-1 text-xs sm:text-sm bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-2 py-2 sm:py-1 rounded min-h-[44px] sm:min-h-0"
                    >
                      -5
                    </button>
                    <button
                      onClick={() => handleHPAdjust(-1)}
                      disabled={character.hp_current <= 0}
                      className="flex-1 text-lg bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-2 py-2 sm:py-1 rounded font-bold min-h-[44px] sm:min-h-0"
                      title="Decrease HP by 1"
                    >
                      ▼
                    </button>
                    <button
                      onClick={() => handleHPAdjust(1)}
                      disabled={character.hp_current >= character.hp_max}
                      className="flex-1 text-lg bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-2 py-2 sm:py-1 rounded font-bold min-h-[44px] sm:min-h-0"
                      title="Increase HP by 1"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => handleHPAdjust(5)}
                      disabled={character.hp_current >= character.hp_max}
                      className="flex-1 text-xs sm:text-sm bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-2 py-2 sm:py-1 rounded min-h-[44px] sm:min-h-0"
                    >
                      +5
                    </button>
                  </div>
                  <button
                    onClick={() => setShowHPAdjust(false)}
                    className="text-xs sm:text-sm bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded w-full min-h-[40px] sm:min-h-0"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* AC */}
          <div className="bg-gray-700 rounded-lg p-3 sm:p-4">
            <div className="text-gray-400 text-xs sm:text-sm uppercase mb-1">Armor Class</div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-400 cursor-help" title={acBreakdown || 'Base AC'}>
              {character.ac}
            </div>
            {acBreakdown && (
              <div className="text-xs text-gray-400 mt-1">{acBreakdown}</div>
            )}
          </div>

          {/* Ability Scores - Compact Grid */}
          <div className="bg-gray-700 rounded-lg p-3 sm:p-4 sm:col-span-2 lg:col-span-1">
            <div className="text-gray-400 text-xs sm:text-sm uppercase mb-2">Ability Scores</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:text-base">
              {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(
                (stat) => {
                  const bonuses = getStatWithBonusInfo(stat);
                  return (
                    <div key={stat} className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">{stat.substring(0, 3).toUpperCase()}</span>
                      <div className="flex items-center space-x-1">
                        <span className="text-white font-bold">{character[stat]}</span>
                        <span className="text-gray-400 text-xs">
                          ({calculateModifier(character[stat]) >= 0 ? '+' : ''}
                          {calculateModifier(character[stat])})
                        </span>
                        {bonuses && (
                          <span className="text-xs text-blue-400" title={`+${bonuses.reduce((sum, b) => sum + b.statBonus, 0)} from talents`}>
                            *
                          </span>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            {talents.some(t => t.statBonus || (t.choice && t.choice.includes('+2'))) && (
              <p className="text-xs text-blue-400 mt-2">* Includes talent bonuses</p>
            )}
          </div>
        </div>
      </div>

      {/* Powered Gear Summary */}
      {poweredGear.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            ⚡ Powered Gear Status
          </h2>
          <div className="space-y-2">
            {poweredGear.map((item) => (
              <div key={item.id} className="bg-gray-700 rounded p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">{item.item_name}</div>
                    {hasEnergyCell(item) ? (
                      <div className="text-sm text-green-400 mt-1">
                        ⚡ Energy Cell Loaded ✓
                      </div>
                    ) : (
                      <div className="text-sm text-yellow-400 mt-1">
                        ⚠️ No Energy Cell
                      </div>
                    )}
                  </div>
                  {hasEnergyCell(item) ? (
                    <button
                      onClick={() => handleUnloadCell(item.id)}
                      className="text-xs bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded"
                    >
                      Unload Cell
                    </button>
                  ) : (
                    <button
                      onClick={() => openLoadCellModal(item)}
                      className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                      disabled={availableCells.length === 0}
                    >
                      Load Cell
                    </button>
                  )}
                </div>
              </div>
            ))}
            {availableCells.length === 0 && poweredGear.some(item => !hasEnergyCell(item)) && (
              <div className="text-sm text-red-400 mt-2">
                ⚠️ No available energy cells in inventory!
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">

          {/* Ship Assignments */}
          {ships.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
            🚀 Ship Assignments
          </h2>
          <div className="space-y-3">
            {ships.map((ship) => {
              const hpPercent = (ship.hp_current / ship.hp_max) * 100;
              const hpColor = hpPercent > 50 ? 'bg-green-500' : hpPercent > 25 ? 'bg-yellow-500' : 'bg-red-500';

              return (
                <Link
                  key={ship.id}
                  to={`/ships/${ship.id}`}
                  className="block bg-gray-700 rounded p-3 hover:bg-gray-600 transition border-l-4 border-purple-600"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="font-bold text-white">{ship.name}</div>
                      <div className="text-sm text-gray-400 mt-1">
                        {ship.owner_name}
                      </div>
                      {ship.crew_role && (
                        <div className="text-sm text-blue-300 mt-1">
                          Role: {ship.crew_role}
                          {ship.is_captain && (
                            <span className="ml-2 text-xs bg-yellow-600 px-2 py-0.5 rounded">CAPTAIN</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-right ml-3">
                      <div className="text-xs text-gray-400">HP</div>
                      <div className="text-sm font-bold text-red-400">{ship.hp_current}/{ship.hp_max}</div>
                    </div>
                  </div>

                  {/* HP Bar */}
                  <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full ${hpColor}`}
                      style={{ width: `${Math.min(hpPercent, 100)}%` }}
                    />
                  </div>

                  {/* Status Summary */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">Components:</span>
                      <span className={ship.active_components === ship.total_components ? 'text-green-400' : 'text-yellow-400'}>
                        {ship.active_components}/{ship.total_components}
                      </span>
                      {ship.active_components < ship.total_components && (
                        <span className="text-red-400" title="Some components offline">⚠️</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">Weapons:</span>
                      <span className={ship.active_weapon_arrays === ship.total_weapon_arrays ? 'text-green-400' : 'text-yellow-400'}>
                        {ship.active_weapon_arrays}/{ship.total_weapon_arrays}
                      </span>
                      {ship.active_weapon_arrays < ship.total_weapon_arrays && (
                        <span className="text-red-400" title="Some weapons offline">⚠️</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link
            to="/ships"
            className="mt-4 block text-center text-sm text-blue-400 hover:text-blue-300"
          >
            View All Ships →
          </Link>
        </div>
      )}

      {/* Equipped Gear Section */}
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
              ⚔️ Equipped Gear
            </h2>
            <div className="space-y-2">
              {/* Primary Weapon Slot */}
              <div className="bg-gray-700 rounded p-2 sm:p-3">
                <div className="text-xs text-gray-400 mb-1">PRIMARY WEAPON</div>
                {equippedGear.find(item => item.equipped_slot === 'primary_weapon') ? (
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-white">
                          {equippedGear.find(item => item.equipped_slot === 'primary_weapon').item_name}
                        </div>
                        {equippedGear.find(item => item.equipped_slot === 'primary_weapon').damage && (
                          <div className="text-sm text-gray-300 mt-1">
                            Damage: {equippedGear.find(item => item.equipped_slot === 'primary_weapon').damage} • 
                            Range: {equippedGear.find(item => item.equipped_slot === 'primary_weapon').range}
                          </div>
                        )}
                        {equippedGear.find(item => item.equipped_slot === 'primary_weapon').properties && (
                          <div className="mt-1">
                            <PropertiesDisplay properties={equippedGear.find(item => item.equipped_slot === 'primary_weapon').properties} />
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleUnequip(equippedGear.find(item => item.equipped_slot === 'primary_weapon').id)}
                        className="text-xs sm:text-sm bg-red-600 hover:bg-red-700 px-3 py-2 rounded min-h-[44px] sm:min-h-0"
                      >
                        Unequip
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">Empty</div>
                )}
              </div>

              {/* Secondary Weapon/Shield Slot */}
              <div className="bg-gray-700 rounded p-3">
                <div className="text-xs text-gray-400 mb-1">SECONDARY WEAPON / SHIELD</div>
                {equippedGear.find(item => item.equipped_slot === 'secondary_weapon' || item.equipped_slot === 'shield') ? (
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-white">
                          {equippedGear.find(item => item.equipped_slot === 'secondary_weapon' || item.equipped_slot === 'shield').item_name}
                        </div>
                        {equippedGear.find(item => item.equipped_slot === 'secondary_weapon' || item.equipped_slot === 'shield').damage && (
                          <div className="text-sm text-gray-300 mt-1">
                            Damage: {equippedGear.find(item => item.equipped_slot === 'secondary_weapon' || item.equipped_slot === 'shield').damage}
                          </div>
                        )}
                        {equippedGear.find(item => item.equipped_slot === 'secondary_weapon' || item.equipped_slot === 'shield').ac_bonus > 0 && (
                          <div className="text-sm text-gray-300 mt-1">
                            AC Bonus: +{equippedGear.find(item => item.equipped_slot === 'secondary_weapon' || item.equipped_slot === 'shield').ac_bonus}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleUnequip(equippedGear.find(item => item.equipped_slot === 'secondary_weapon' || item.equipped_slot === 'shield').id)}
                        className="text-xs sm:text-sm bg-red-600 hover:bg-red-700 px-3 py-2 rounded min-h-[44px] sm:min-h-0"
                      >
                        Unequip
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">Empty</div>
                )}
              </div>

              {/* Body Armor Slot */}
              <div className="bg-gray-700 rounded p-3">
                <div className="text-xs text-gray-400 mb-1">BODY ARMOR</div>
                {equippedGear.find(item => item.equipped_slot === 'body_armor') ? (
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-white">
                          {equippedGear.find(item => item.equipped_slot === 'body_armor').item_name}
                        </div>
                        <div className="text-sm text-gray-300 mt-1">
                          AC: {equippedGear.find(item => item.equipped_slot === 'body_armor').ac_bonus}
                        </div>
                      </div>
                      <button
                        onClick={() => handleUnequip(equippedGear.find(item => item.equipped_slot === 'body_armor').id)}
                        className="text-xs sm:text-sm bg-red-600 hover:bg-red-700 px-3 py-2 rounded min-h-[44px] sm:min-h-0"
                      >
                        Unequip
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">Empty</div>
                )}
              </div>

              {/* Helmet Slot */}
              <div className="bg-gray-700 rounded p-3">
                <div className="text-xs text-gray-400 mb-1">HELMET</div>
                {equippedGear.find(item => item.equipped_slot === 'helmet') ? (
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-white">
                          {equippedGear.find(item => item.equipped_slot === 'helmet').item_name}
                        </div>
                        <div className="text-sm text-gray-300 mt-1">
                          AC Bonus: +{equippedGear.find(item => item.equipped_slot === 'helmet').ac_bonus}
                        </div>
                      </div>
                      <button
                        onClick={() => handleUnequip(equippedGear.find(item => item.equipped_slot === 'helmet').id)}
                        className="text-xs sm:text-sm bg-red-600 hover:bg-red-700 px-3 py-2 rounded min-h-[44px] sm:min-h-0"
                      >
                        Unequip
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">Empty</div>
                )}
              </div>
            </div>
          </div>

          {/* Talents Section */}
          {talents.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Talents</h2>
              <div className="space-y-4">
                {talents.map((talent, index) => (
                  <div key={index} className="border-b border-gray-700 pb-3 last:border-b-0">
                    <div className="font-bold text-blue-300 text-sm">{talent.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{talent.description}</div>
                    {talent.choice && (
                      <div className="text-xs text-yellow-400 mt-1">
                        Choice: {talent.choice}
                        {talent.nestedChoice && ` → ${talent.nestedChoice}`}
                      </div>
                    )}
                    {talent.usesPerDay > 0 && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-gray-400">Uses/Day:</span>
                        {Array(talent.usesPerDay).fill(0).map((_, useIdx) => {
                          const isUsed = abilityUses[`talent_${index}`]?.[useIdx] || false;
                          return (
                            <input
                              key={useIdx}
                              type="checkbox"
                              checked={isUsed}
                              onChange={() => markAbilityAsUsed('talent', index, useIdx)}
                              disabled={isUsed}
                              className={`w-4 h-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500 ${
                                isUsed ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                              }`}
                              title={isUsed ? 'Already used (DM can reset)' : 'Click to mark as used'}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DarkSpace Stats */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">DarkSpace Stats</h2>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Reputation</span>
                <span className="font-bold">{character.reputation}</span>
              </div>
              <div className="flex justify-between">
                <span>Bounty</span>
                <span className="font-bold text-red-400">{character.bounty} cr</span>
              </div>
              <div className="flex justify-between">
                <span>Luck</span>
                <span className="font-bold">{character.luck}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Archetype Abilities */}
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{character.archetype} Abilities</h2>
            <div className="space-y-4">
              {archetypeAbilities
                .filter(ability => {
                  // If this is Wise archetype and ability is Enlightenment, check if they have Triad powers
                  if (character.archetype === 'Wise' && ability.isEnlightenment) {
                    let hasTriadPowers = false;
                    try {
                      const triadPowers = JSON.parse(character.triad_powers || '[]');
                      hasTriadPowers = triadPowers.length > 0;
                    } catch (e) {
                      hasTriadPowers = false;
                    }
                    // Only show Enlightenment if they DON'T have Triad powers
                    return !hasTriadPowers;
                  }
                  return true;
                })
                .map((ability, index) => (
                <div key={index} className="border-b border-gray-700 pb-3 last:border-b-0">
                  <div className="font-bold text-green-300">{ability.name}</div>
                  <div className="text-sm text-gray-300 mt-1 whitespace-pre-line">{ability.description}</div>
                  {ability.usesPerDay && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-gray-400">Uses/Day:</span>
                      {Array(ability.usesPerDay).fill(0).map((_, useIdx) => {
                        const isUsed = abilityUses[`archetype_${index}`]?.[useIdx] || false;
                        return (
                          <input
                            key={useIdx}
                            type="checkbox"
                            checked={isUsed}
                            onChange={() => markAbilityAsUsed('archetype', index, useIdx)}
                            disabled={isUsed}
                            className={`w-4 h-4 rounded border-gray-600 text-green-600 focus:ring-green-500 ${
                              isUsed ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                            }`}
                            title={isUsed ? 'Already used (DM can reset)' : 'Click to mark as used'}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Triad Powers (for Wise archetype) */}
          {character.archetype === 'Wise' && character.triad_powers && (() => {
            let triadPowers = [];
            let hasEnlightenment = false;
            
            try {
              triadPowers = JSON.parse(character.triad_powers);
            } catch (e) {
              triadPowers = Array.isArray(character.triad_powers) ? character.triad_powers : [];
            }
            
            // Check if they have Enlightenment by looking at talents
            try {
              const talents = JSON.parse(character.talents || '[]');
              hasEnlightenment = talents.some(t => 
                t.name === 'Enhanced Enlightenment' || 
                (t.choice && t.choice.includes('Enlightenment'))
              );
              // If they don't have Triad powers, they have standard Enlightenment
              if (triadPowers.length === 0) {
                hasEnlightenment = true;
              }
            } catch (e) {
              hasEnlightenment = triadPowers.length === 0;
            }
            
            if (triadPowers.length > 0) {
              return (
                <div className="bg-purple-900 bg-opacity-30 rounded-lg p-6 border border-purple-600">
                  <h2 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                    ⚡ The Triad Powers
                  </h2>
                  <div className="space-y-4">
                    {triadPowers.map((power, index) => (
                      <div key={index} className="bg-gray-800 rounded-lg p-4 border border-purple-700">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-bold text-purple-200 text-lg flex items-center gap-2">
                            {power === 'Body' && '💪'}
                            {power === 'Mind' && '🧠'}
                            {power === 'Soul' && '✨'}
                            {power} Power
                          </div>
                          <div className="text-xs bg-purple-700 px-2 py-1 rounded">
                            {power === 'Body' ? 'CON' : power === 'Mind' ? 'INT' : 'WIS'} Check
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-300 mb-3">
                          {power === 'Body' && 'Affecting your physical body or the material world around you.'}
                          {power === 'Mind' && 'Affecting your mind and the minds of others.'}
                          {power === 'Soul' && 'Affecting your connection to the metaphysical and transcendent universe.'}
                        </div>
                        
                        <div className="text-xs text-purple-300 mb-2">
                          <div className="font-semibold mb-1">Examples:</div>
                          {power === 'Body' && 'Enhanced Strength, Increased Speed, Power Leaping, Telekinesis, Pyrokinesis, Levitation'}
                          {power === 'Mind' && 'Perfect Recall, Telepathy, Thought Reading, Mind Blasts, Enhancing Senses'}
                          {power === 'Soul' && 'Precognition, Remote Viewing, Calming Emotions, Astral Projection, Life Sense, Empathic Perception'}
                        </div>
                        
                        <div className="bg-gray-900 rounded p-2 mt-3">
                          <div className="text-xs font-semibold text-purple-200 mb-1">DC → Damage/Effect:</div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                            <div>DC 9 (Easy) → 1d4</div>
                            <div>DC 12 (Normal) → 1d6</div>
                            <div>DC 15 (Hard) → 1d8</div>
                            <div>DC 18 (Extreme) → 1d10</div>
                          </div>
                          <div className="text-xs text-yellow-400 mt-2">
                            ⚠️ Critical failure: Can't use this power until rest
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    
                    {hasEnlightenment && (
                      <div className="text-xs text-gray-400 mt-4 p-3 bg-gray-800 rounded">
                        <div className="font-semibold text-green-300 mb-1">✨ Hybrid Path:</div>
                        <div>You also have Enlightenment abilities in addition to your Triad powers.</div>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-400 mt-4 p-3 bg-gray-800 rounded">
                      <div className="font-semibold text-purple-300 mb-1">Using Triad Powers:</div>
                      <div>Make a check using the appropriate stat ({triadPowers.includes('Body') ? 'CON' : ''}{triadPowers.includes('Mind') ? (triadPowers.includes('Body') ? ', INT' : 'INT') : ''}{triadPowers.includes('Soul') ? (triadPowers.length > 1 ? ', WIS' : 'WIS') : ''}). The DC determines the effect's power. Can be maintained with Focus (new check each turn). Critical success doubles numerical effects, critical failure prevents use until rest.
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })()}

          {/* Enhanced Inventory Section */}
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
                <h2 className="text-lg sm:text-xl font-bold text-white">Inventory</h2>
                <button
                  onClick={() => setShowPropertiesGuide(true)}
                  className="text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center gap-1 min-h-[36px] sm:min-h-0"
                  title="View Properties Reference Guide"
                >
                  📋 Guide
                </button>
              </div>
              <span className={`text-sm font-bold ${
                inventoryInfo.percentFull >= 100 ? 'text-red-400' :
                inventoryInfo.percentFull >= 80 ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {inventoryInfo.slotsUsed} / {inventoryInfo.maxSlots} slots
              </span>
            </div>

            {/* Capacity Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    inventoryInfo.percentFull >= 100 ? 'bg-red-500' :
                    inventoryInfo.percentFull >= 80 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(inventoryInfo.percentFull, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Inventory capacity based on STR {inventoryInfo.maxSlots}
                {inventoryInfo.percentFull >= 100 && ' - OVER-ENCUMBERED!'}
              </p>
            </div>

            {!character.inventory || character.inventory.length === 0 ? (
              <p className="text-gray-400">No items in inventory</p>
            ) : (
              <>
                {/* Group items by category */}
                {['weapon', 'armor', 'gear', 'consumable', 'salvage'].map(category => {
                  const items = character.inventory.filter(
                    item => item.item_type?.toLowerCase() === category
                  );

                  if (items.length === 0) return null;

                  return (
                    <div key={category} className="mb-4">
                      <h3 className="text-sm font-bold text-blue-300 uppercase mb-2 border-b border-gray-600 pb-1">
                        {category === 'weapon' ? '⚔️ Weapons' :
                         category === 'armor' ? '🛡️ Armor' :
                         category === 'gear' ? '🔧 Gear' :
                         category === 'consumable' ? '💊 Consumables' :
                         '🔧 Salvage'}
                      </h3>
                      <div className="space-y-2">
                        {items.map((item) => {
                          // Calculate actual slots used by this item stack
                          const weight = parseFloat(item.weight) || 1;
                          const slotsUsed = weight === 0 ? 0 :
                                           weight < 1 ? Math.ceil(item.quantity / 2) :
                                           weight * item.quantity;
                          
                          return (
                            <div
                              key={item.id}
                              className={`bg-gray-700 rounded p-3 sm:p-4 transition ${
                                item.equipped ? 'border-2 border-green-500' : 'hover:bg-gray-600'
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-white text-sm sm:text-base">{item.item_name}</span>
                                    {item.quantity > 1 && (
                                      <span className="text-gray-400 text-sm">×{item.quantity}</span>
                                    )}
                                    {slotsUsed === 0 && (
                                      <span className="text-xs bg-green-600 px-2 py-0.5 rounded">FREE</span>
                                    )}
                                    {item.equipped && (
                                      <span className="text-xs bg-green-600 px-2 py-0.5 rounded">EQUIPPED</span>
                                    )}
                                    {item.in_use_by_item_id && (
                                      <span className="text-xs bg-yellow-600 px-2 py-0.5 rounded">IN USE</span>
                                    )}
                                  </div>
                                  
                                  {item.description && (
                                    <div className="text-sm text-gray-400 mt-1">{item.description}</div>
                                  )}

                                  {/* Show which item this consumable is loaded into */}
                                  {item.in_use_by_item_id && (() => {
                                    const parentItem = character.inventory.find(i => i.id === item.in_use_by_item_id);
                                    return parentItem && (
                                      <div className="text-xs text-yellow-400 mt-1">
                                        🔗 Loaded in: <span className="font-semibold">{parentItem.item_name}</span>
                                      </div>
                                    );
                                  })()}

                                  <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                                    <span>
                                      {slotsUsed === 0 ? 'FREE' :
                                       weight < 1 ? `${slotsUsed} slots (2 per slot)` :
                                       weight > 1 ? `${weight} slots each` :
                                       `${slotsUsed} slot${slotsUsed !== 1 ? 's' : ''}`}
                                    </span>
                                    {item.cost !== null && item.cost !== undefined && <span className="text-yellow-500">• {item.cost}cr</span>}
                                    {item.damage && <span>• Damage: {item.damage}</span>}
                                    {item.range && <span>• Range: {item.range}</span>}
                                  </div>
                                  
                                  {item.properties && (
                                  <div className="mt-1">
                                  <PropertiesDisplay properties={item.properties} />
                                  </div>
                                  )}

                                  {/* Energy Cell Status */}
                                  {requiresEnergyCell(item) && (
                                    <div className="text-xs mt-2">
                                      {hasEnergyCell(item) ? (
                                        <span className="text-green-400">⚡ Energy Cell Loaded ✓</span>
                                      ) : (
                                        <span className="text-yellow-400">⚠️ No Energy Cell</span>
                                      )}
                                    </div>
                                  )}

                                  {/* Ammo Status */}
                                  {requiresAmmo(item) && (
                                    <div className="text-xs mt-2">
                                      {hasAmmo(item) ? (
                                        <span className="text-green-400">🔫 Ammo Loaded ✓</span>
                                      ) : (
                                        <span className="text-yellow-400">⚠️ No Ammo</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-row sm:flex-col flex-wrap gap-2 sm:gap-1 sm:ml-4">
                                  {/* Equip/Unequip buttons */}
                                  {item.equipped ? (
                                    <button
                                    onClick={() => handleUnequip(item.id)}
                                    className="text-xs sm:text-sm bg-red-600 hover:bg-red-700 px-3 py-2 rounded whitespace-nowrap min-h-[44px] sm:min-h-0 flex-1 sm:flex-none"
                                    >
                                    Unequip
                                    </button>
                                  ) : (
                                    determineSlot(item) && (
                                      <button
                                      onClick={() => handleEquip(item.id, determineSlot(item))}
                                      className="text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded whitespace-nowrap min-h-[44px] sm:min-h-0 flex-1 sm:flex-none"
                                      >
                                      Equip
                                      </button>
                                    )
                                  )}

                                  {/* Energy Cell Load/Unload buttons */}
                                  {requiresEnergyCell(item) && (
                                    hasEnergyCell(item) ? (
                                      <button
                                      onClick={() => handleUnloadCell(item.id)}
                                      className="text-xs sm:text-sm bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded whitespace-nowrap min-h-[44px] sm:min-h-0 flex-1 sm:flex-none"
                                      >
                                      Unload Cell
                                      </button>
                                    ) : (
                                      <button
                                      onClick={() => openLoadCellModal(item)}
                                      className="text-xs sm:text-sm bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded whitespace-nowrap min-h-[44px] sm:min-h-0 flex-1 sm:flex-none"
                                      disabled={availableCells.length === 0}
                                      >
                                      Load Cell
                                      </button>
                                    )
                                  )}

                                  {/* Ammo Load/Unload buttons */}
                                  {requiresAmmo(item) && (
                                    hasAmmo(item) ? (
                                      <button
                                      onClick={() => handleUnloadAmmo(item.id)}
                                      className="text-xs sm:text-sm bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded whitespace-nowrap min-h-[44px] sm:min-h-0 flex-1 sm:flex-none"
                                      >
                                      Unload Ammo
                                      </button>
                                    ) : (
                                      <button
                                      onClick={() => openLoadAmmoModal(item)}
                                      className="text-xs sm:text-sm bg-cyan-600 hover:bg-cyan-700 px-3 py-2 rounded whitespace-nowrap min-h-[44px] sm:min-h-0 flex-1 sm:flex-none"
                                      disabled={availableAmmo.length === 0}
                                      >
                                      Load Ammo
                                      </button>
                                    )
                                  )}

                                  {/* Use button for consumables (not energy cells or ammo) */}
                                  {item.item_type === 'consumable' && !item.item_name.toLowerCase().includes('energy cell') && !item.item_name.toLowerCase().includes('ammo') && (
                                    <button
                                      onClick={() => openUseConfirm(item)}
                                      className="text-xs sm:text-sm bg-green-600 hover:bg-green-700 px-3 py-2 rounded whitespace-nowrap min-h-[44px] sm:min-h-0 flex-1 sm:flex-none"
                                    >
                                      Use
                                    </button>
                                  )}

                                  {/* Gift button - only if not equipped and not loaded */}
                                  {!item.equipped && !item.in_use_by_item_id && !item.loaded_energy_cell_id && !item.loaded_ammo_id && (
                                    <button
                                      onClick={() => openGiftItem(item)}
                                      className="text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded whitespace-nowrap min-h-[44px] sm:min-h-0 flex-1 sm:flex-none"
                                      disabled={partyMembers.length === 0}
                                      title={partyMembers.length === 0 ? 'No other characters available' : 'Gift to another character'}
                                    >
                                      🎁 Gift
                                    </button>
                                  )}

                                  {/* Discard button - available for all items when not equipped and not loaded */}
                                  {!item.equipped && !item.in_use_by_item_id && !item.loaded_energy_cell_id && !item.loaded_ammo_id && (
                                    <button
                                      onClick={() => openDiscardConfirm(item)}
                                      className="text-xs sm:text-sm bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded whitespace-nowrap min-h-[44px] sm:min-h-0 flex-1 sm:flex-none"
                                    >
                                      Discard
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                
                {/* Items without category */}
                {character.inventory.some(item => !item.item_type) && (
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase mb-2 border-b border-gray-600 pb-1">
                      📦 Other Items
                    </h3>
                    <div className="space-y-2">
                      {character.inventory
                        .filter(item => !item.item_type)
                        .map((item) => {
                          const weight = parseFloat(item.weight) || 1;
                          const slotsUsed = weight === 0 ? 0 :
                                           weight < 1 ? Math.ceil(item.quantity / 2) :
                                           weight * item.quantity;
                          
                          return (
                            <div
                              key={item.id}
                              className={`bg-gray-700 rounded p-3 transition ${
                                item.equipped ? 'border-2 border-green-500' : 'hover:bg-gray-600'
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-white">{item.item_name}</span>
                                    {item.quantity > 1 && (
                                      <span className="text-gray-400 text-sm">×{item.quantity}</span>
                                    )}
                                    {item.equipped && (
                                      <span className="text-xs bg-green-600 px-2 py-0.5 rounded">EQUIPPED</span>
                                    )}
                                  </div>
                                  {item.description && (
                                    <div className="text-sm text-gray-400 mt-1">{item.description}</div>
                                  )}
                                  <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                                    <span>
                                      {slotsUsed === 0 ? 'FREE' : `${slotsUsed} slot${slotsUsed !== 1 ? 's' : ''}`}
                                    </span>
                                    {item.cost !== null && item.cost !== undefined && <span className="text-yellow-500">• {item.cost}cr</span>}
                                  </div>

                                  {/* Energy Cell Status */}
                                  {requiresEnergyCell(item) && (
                                    <div className="text-xs mt-2">
                                      {hasEnergyCell(item) ? (
                                        <span className="text-green-400">⚡ Energy Cell Loaded ✓</span>
                                      ) : (
                                        <span className="text-yellow-400">⚠️ No Energy Cell</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4 flex flex-col gap-1">
                                  {/* Equip/Unequip buttons */}
                                  {item.equipped ? (
                                    <button
                                      onClick={() => handleUnequip(item.id)}
                                      className="text-xs bg-red-600 hover:bg-red-700 px-3 py-1 rounded whitespace-nowrap"
                                    >
                                      Unequip
                                    </button>
                                  ) : (
                                    determineSlot(item) && (
                                      <button
                                        onClick={() => handleEquip(item.id, determineSlot(item))}
                                        className="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded whitespace-nowrap"
                                      >
                                        Equip
                                      </button>
                                    )
                                  )}

                                  {/* Energy Cell Load/Unload buttons */}
                                  {requiresEnergyCell(item) && (
                                    hasEnergyCell(item) ? (
                                      <button
                                        onClick={() => handleUnloadCell(item.id)}
                                        className="text-xs bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded whitespace-nowrap"
                                      >
                                        Unload Cell
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => openLoadCellModal(item)}
                                        className="text-xs bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded whitespace-nowrap"
                                        disabled={availableCells.length === 0}
                                      >
                                        Load Cell
                                      </button>
                                    )
                                  )}

                                  {/* Use button for consumables (not energy cells) */}
                                  {item.item_type === 'consumable' && !item.item_name.toLowerCase().includes('energy cell') && (
                                    <button
                                      onClick={() => openUseConfirm(item)}
                                      className="text-xs bg-green-600 hover:bg-green-700 px-3 py-1 rounded whitespace-nowrap"
                                    >
                                      Use
                                    </button>
                                  )}

                                  {/* Gift button - only if not equipped and not loaded */}
                                  {!item.equipped && !item.in_use_by_item_id && !item.loaded_energy_cell_id && (
                                    <button
                                      onClick={() => openGiftItem(item)}
                                      className="text-xs bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded whitespace-nowrap"
                                      disabled={partyMembers.length === 0}
                                      title={partyMembers.length === 0 ? 'No other characters available' : 'Gift to another character'}
                                    >
                                      🎁 Gift
                                    </button>
                                  )}

                                  {/* Discard button - available for all items when not equipped and not loaded */}
                                  {!item.equipped && !item.in_use_by_item_id && !item.loaded_energy_cell_id && (
                                    <button
                                      onClick={() => openDiscardConfirm(item)}
                                      className="text-xs bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded whitespace-nowrap"
                                    >
                                      Discard
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Ship Info */}
          {character.ship && (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Ship Assignment</h2>
              <div className="text-gray-300">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-white">{character.ship.name}</span>
                  <span className="text-blue-400">{character.ship.crew_role}</span>
                </div>
                <div className="text-sm text-gray-400">
                  {character.ship.ship_class} • Hull: {character.ship.hull_current}/{character.ship.hull_max}
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {character.notes && (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Notes</h2>
              <p className="text-gray-300 whitespace-pre-wrap">{character.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Load Energy Cell Modal */}
      {showCellModal && selectedItemForCell && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 max-w-md w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
              Load Energy Cell into {selectedItemForCell.item_name}
            </h2>
            
            {availableCells.length > 0 ? (
              <div className="space-y-2 mb-4">
                {availableCells.map((cell) => (
                  <button
                    key={cell.id}
                    onClick={() => handleLoadCell(cell.id)}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white p-3 sm:p-4 rounded text-left transition min-h-[44px]"
                  >
                    <div className="font-bold text-base">{cell.item_name}</div>
                    <div className="text-sm text-gray-400">Quantity: {cell.quantity}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-yellow-400 mb-4">
                No available energy cells in inventory!
              </div>
            )}

            <button
              onClick={() => {
                setShowCellModal(false);
                setSelectedItemForCell(null);
              }}
              className="w-full bg-gray-600 hover:bg-gray-500 text-white px-4 py-3 rounded text-base min-h-[44px]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Load Ammo Modal */}
      {showAmmoModal && selectedItemForAmmo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 max-w-md w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
              Load Ammo into {selectedItemForAmmo.item_name}
            </h2>

            {availableAmmo.length > 0 ? (
              <div className="space-y-2 mb-4">
                {availableAmmo.map((ammo) => (
                  <button
                    key={ammo.id}
                    onClick={() => handleLoadAmmo(ammo.id)}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white p-3 sm:p-4 rounded text-left transition min-h-[44px]"
                  >
                    <div className="font-bold text-base">{ammo.item_name}</div>
                    <div className="text-sm text-gray-400">Quantity: {ammo.quantity}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-yellow-400 mb-4">
                No available ammo clips in inventory!
              </div>
            )}

            <button
              onClick={() => {
                setShowAmmoModal(false);
                setSelectedItemForAmmo(null);
              }}
              className="w-full bg-gray-600 hover:bg-gray-500 text-white px-4 py-3 rounded text-base min-h-[44px]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Use Consumable Confirmation Modal */}
      {showUseConfirm && selectedConsumable && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 max-w-md w-full border border-gray-700">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Use Consumable?</h2>
            
            <div className="mb-4 sm:mb-6">
              <div className="font-bold text-white text-base sm:text-lg">{selectedConsumable.item_name}</div>
              <div className="text-gray-400 mt-2">{selectedConsumable.description}</div>
              <div className="text-sm text-gray-500 mt-2">
                {selectedConsumable.quantity > 1 
                  ? `You have ${selectedConsumable.quantity}. Using one will leave ${selectedConsumable.quantity - 1}.`
                  : 'This is your last one!'}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleUseConsumable}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded font-bold text-base min-h-[44px] sm:min-h-0"
              >
                Use It
              </button>
              <button
                onClick={() => {
                  setShowUseConfirm(false);
                  setSelectedConsumable(null);
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-4 py-3 rounded text-base min-h-[44px] sm:min-h-0"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discard Item Confirmation Modal */}
      {showDiscardConfirm && selectedDiscard && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 max-w-md w-full border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Discard Item?</h2>
            
            <div className="mb-6">
              <div className="font-bold text-white text-lg">{selectedDiscard.item_name}</div>
              <div className="text-gray-400 mt-2">{selectedDiscard.description}</div>
              <div className="text-sm text-yellow-400 mt-2">
                {selectedDiscard.quantity > 1 
                  ? `You have ${selectedDiscard.quantity}. Discarding one will leave ${selectedDiscard.quantity - 1}.`
                  : 'This is your last one! It will be permanently removed.'}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                ⚠️ Discarded items cannot be recovered.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleDiscardItem}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded font-bold text-base min-h-[44px] sm:min-h-0"
              >
                Discard
              </button>
              <button
                onClick={() => {
                  setShowDiscardConfirm(false);
                  setSelectedDiscard(null);
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-4 py-3 rounded text-base min-h-[44px] sm:min-h-0"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Level Up Modal */}
      {showLevelUpModal && character && (
        <LevelUpModal
          character={character}
          onClose={() => setShowLevelUpModal(false)}
          onLevelUp={handleLevelUpComplete}
        />
      )}

      {/* Properties Guide Modal */}
      {showPropertiesGuide && (
        <PropertiesGuideModal
          onClose={() => setShowPropertiesGuide(false)}
        />
      )}

      {/* Transfer Credits Modal */}
      {showTransferCredits && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 max-w-md w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">💸 Transfer Credits</h2>
            
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-2">Your Balance:</div>
              <div className="text-2xl font-bold text-yellow-400">{character.credits} cr</div>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Amount to Transfer</label>
              <input
                type="number"
                min="1"
                max={character.credits}
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none text-base"
                placeholder="Enter amount..."
              />
            </div>

            {/* Recipient Selection */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Transfer To</label>
              <input
                type="text"
                value={recipientSearch}
                onChange={(e) => setRecipientSearch(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none mb-2 text-base"
                placeholder="Search characters..."
              />
              <div className="max-h-48 overflow-y-auto space-y-2">
                {partyMembers
                  .filter(char => 
                    recipientSearch === '' || 
                    char.name.toLowerCase().includes(recipientSearch.toLowerCase())
                  )
                  .map((char) => (
                    <button
                      key={char.id}
                      onClick={() => setSelectedRecipient(char.id.toString())}
                      className={`w-full text-left p-3 rounded transition ${
                        selectedRecipient === char.id.toString()
                          ? 'bg-yellow-600 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                    >
                      <div className="font-bold">{char.name}</div>
                      <div className="text-sm opacity-75">
                        {char.species} {char.archetype} (Level {char.level})
                      </div>
                    </button>
                  ))}
              </div>
              {partyMembers.filter(char => 
                recipientSearch === '' || 
                char.name.toLowerCase().includes(recipientSearch.toLowerCase())
              ).length === 0 && (
                <div className="text-center text-gray-500 py-4">No characters found</div>
              )}
            </div>

            {/* Optional Note */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Note (Optional)</label>
              <input
                type="text"
                value={transferNote}
                onChange={(e) => setTransferNote(e.target.value)}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
                placeholder="Add a note..."
                maxLength={100}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleTransferCredits}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded font-bold transition text-base min-h-[44px] sm:min-h-0"
                disabled={!selectedRecipient || !transferAmount || parseInt(transferAmount) <= 0}
              >
                Transfer {transferAmount ? `${transferAmount}cr` : 'Credits'}
              </button>
              <button
                onClick={() => setShowTransferCredits(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-4 py-3 rounded transition text-base min-h-[44px] sm:min-h-0"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gift Item Modal */}
      {showGiftItem && selectedGiftItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 max-w-md w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">🎁 Gift Item</h2>
            
            {/* Item Being Gifted */}
            <div className="bg-gray-700 rounded p-4 mb-4">
              <div className="font-bold text-white text-lg">{selectedGiftItem.item_name}</div>
              {selectedGiftItem.description && (
                <div className="text-sm text-gray-400 mt-1">{selectedGiftItem.description}</div>
              )}
              <div className="text-sm text-gray-500 mt-2">
                You have: {selectedGiftItem.quantity}×
              </div>
            </div>

            {/* Quantity Selection (if stackable) */}
            {selectedGiftItem.quantity > 1 && (
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Quantity to Gift</label>
                <input
                  type="number"
                  min="1"
                  max={selectedGiftItem.quantity}
                  value={giftQuantity}
                  onChange={(e) => setGiftQuantity(parseInt(e.target.value) || 1)}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            )}

            {/* Recipient Selection */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Gift To</label>
              <input
                type="text"
                value={recipientSearch}
                onChange={(e) => setRecipientSearch(e.target.value)}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-indigo-500 focus:outline-none mb-2"
                placeholder="Search characters..."
              />
              <div className="max-h-48 overflow-y-auto space-y-2">
                {partyMembers
                  .filter(char => 
                    recipientSearch === '' || 
                    char.name.toLowerCase().includes(recipientSearch.toLowerCase())
                  )
                  .map((char) => (
                    <button
                      key={char.id}
                      onClick={() => setSelectedRecipient(char.id.toString())}
                      className={`w-full text-left p-3 rounded transition ${
                        selectedRecipient === char.id.toString()
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      }`}
                    >
                      <div className="font-bold">{char.name}</div>
                      <div className="text-sm opacity-75">
                        {char.species} {char.archetype} (Level {char.level})
                      </div>
                    </button>
                  ))}
              </div>
              {partyMembers.filter(char => 
                recipientSearch === '' || 
                char.name.toLowerCase().includes(recipientSearch.toLowerCase())
              ).length === 0 && (
                <div className="text-center text-gray-500 py-4">No characters found</div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={handleGiftItem}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded font-bold transition text-base min-h-[44px] sm:min-h-0"
                disabled={!selectedRecipient}
              >
                Gift {giftQuantity}× {selectedGiftItem.item_name}
              </button>
              <button
                onClick={() => {
                  setShowGiftItem(false);
                  setSelectedGiftItem(null);
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-4 py-3 rounded transition text-base min-h-[44px] sm:min-h-0"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Toast Notification Container - Bottom Right */}
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className={`${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          } text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-3 min-w-[300px] animate-slide-in-right`}
          style={{
            animation: 'slideInRight 0.3s ease-out forwards',
          }}
        >
          <span className="flex-1 text-sm">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white hover:text-gray-200 font-bold text-lg leading-none min-w-[24px] min-h-[24px]"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>

    {/* Add keyframe animation to global styles */}
    <style>{`
      @keyframes slideInRight {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `}</style>
    </>
  );
}

export default CharacterSheet;