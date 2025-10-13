import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import { API_URL, WS_URL } from '../config/api';

function Communicator() {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [character, setCharacter] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showComposer, setShowComposer] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newMessageBody, setNewMessageBody] = useState('');
  const [recipientType, setRecipientType] = useState('npc');
  const [recipientName, setRecipientName] = useState('');
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [powerStatus, setPowerStatus] = useState(null); // { powered: bool, reason: string }

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

  const checkPower = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/comms/power-status/${characterId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('[Communicator] Power status:', response.data);
      setPowerStatus(response.data);
      return response.data;
    } catch (error) {
      console.error('Error checking power:', error);
      setPowerStatus({ powered: false, reason: 'ERROR' });
      return { powered: false, reason: 'ERROR' };
    }
  };

  useEffect(() => {
    if (!characterId) return;

    console.log('[Communicator] Initializing for character:', characterId);

    fetchCharacter();

    // Check initial power status
    checkPower().then((status) => {
      if (status.powered) {
        // Load messages only if powered
        fetchMessages();
        fetchUnreadCount();
        fetchAvailablePlayers();
      }
    });

    // Always set up socket for real-time updates (even if offline)
    // This allows us to detect when power is restored or lost
    const newSocket = io(WS_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('[Communicator] Socket connected:', newSocket.id);
      newSocket.emit('join_character', characterId);
      console.log('[Communicator] Joined character room:', characterId);
    });

    newSocket.on('new_message', (msg) => {
      console.log('[Communicator] New message received:', msg);

      // Refresh messages and unread count
      fetchMessages();
      fetchUnreadCount();

      // Only play sound if message is relevant to this character
      const isFromMe = msg.sender_type === 'character' && msg.sender_id === parseInt(characterId);

      // Check if this message is for me (or a broadcast I should see)
      const isDirectToMe = msg.recipient_type === 'character' && msg.recipient_id === parseInt(characterId);
      const isBroadcast = msg.recipient_type === 'all' || msg.recipient_type === 'party';
      const isForMe = isDirectToMe || isBroadcast;

      // Play sound only if message is FOR this character and NOT from this character
      if (!isFromMe && isForMe) {
        console.log('[Communicator] Playing notification sound');
        playNotificationSound();
      } else {
        console.log('[Communicator] Not playing sound - isFromMe:', isFromMe, 'isForMe:', isForMe);
      }
    });

    // Listen for inventory/equipment changes that might affect power status
    newSocket.on('equipment_changed', () => {
      console.log('[Communicator] Equipment changed, rechecking power status');
      checkPower().then((status) => {
        // If power was restored, fetch messages
        if (status.powered) {
          fetchMessages();
          fetchUnreadCount();
          fetchAvailablePlayers();
        }
      });
    });

    newSocket.on('item_removed', () => {
      console.log('[Communicator] Item removed, rechecking power status');
      checkPower();
    });

    newSocket.on('inventory_updated', () => {
      console.log('[Communicator] Inventory updated, rechecking power status');
      checkPower().then((status) => {
        // If power was restored, fetch messages
        if (status.powered) {
          fetchMessages();
          fetchUnreadCount();
          fetchAvailablePlayers();
        }
      });
    });

    newSocket.on('disconnect', () => {
      console.log('[Communicator] Socket disconnected');
    });

    newSocket.on('connect_error', (error) => {
      console.error('[Communicator] Socket connection error:', error);
    });

    // Cleanup function
    return () => {
      if (socket) {
        console.log('[Communicator] Cleaning up socket connection');
        socket.disconnect();
      }
    };
  }, [characterId]);

  const fetchCharacter = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/characters/${characterId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCharacter(response.data);
    } catch (error) {
      console.error('Error fetching character:', error);
    }
  };

  const fetchAvailablePlayers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/characters/party`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Filter out current character
      const otherPlayers = response.data.filter(char => char.id !== parseInt(characterId));
      setAvailablePlayers(otherPlayers);
    } catch (error) {
      console.error('Error fetching available players:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/comms/inbox/${characterId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/comms/unread-count/${characterId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUnreadCount(response.data.unread_count);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/comms/mark-read/${messageId}`,
        { characterId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUnreadCount();
      fetchMessages();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const viewMessage = async (messageId) => {
    try {
      const token = localStorage.getItem('token');
      console.log('[Communicator] Viewing message:', messageId, 'as character:', characterId);

      const response = await axios.get(`${API_URL}/comms/message/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedMessage(response.data);

      console.log('[Communicator] Thread participants:', response.data.thread.map(m => ({
        id: m.id,
        sender_type: m.sender_type,
        sender_id: m.sender_id,
        sender_name: m.sender_name
      })));

      markAsRead(messageId);
    } catch (error) {
      console.error('Error viewing message:', error);
    }
  };

  const archiveMessage = async (messageId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/comms/archive/${messageId}`,
        { characterId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchMessages();
      fetchUnreadCount();
      setSelectedMessage(null);
    } catch (error) {
      console.error('Error archiving message:', error);
      alert('Failed to archive message');
    }
  };

  const sendReply = async (messageId, threadId, replyBody) => {
    try {
      const token = localStorage.getItem('token');

      // Get the root message to find the original sender
      const rootMessage = selectedMessage.thread.find(m => m.thread_id === null);

      // Determine recipient based on root message sender
      let recipientType, recipientId;

      if (rootMessage.sender_type === 'character' && rootMessage.sender_id !== parseInt(characterId)) {
        // Reply to player message - send back to that player
        recipientType = 'character';
        recipientId = rootMessage.sender_id;
      } else {
        // Reply to NPC/DM message - send to DM only (not broadcast)
        recipientType = 'dm';
        recipientId = null;
      }

      await axios.post(
        `${API_URL}/comms/send`,
        {
          sender_type: 'character',
          sender_id: characterId,
          sender_name: character.name,
          sender_title: character.ship_role || null,
          recipient_type: recipientType,
          recipient_id: recipientId,
          subject: `Re: ${selectedMessage.message.subject || 'Message'}`,
          message_body: replyBody,
          priority: 'normal',
          thread_id: threadId || messageId
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Mark the thread as read after replying since you just engaged with it
      await markAsRead(threadId || messageId);

      setSelectedMessage(null);
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply');
    }
  };

  const sendNewMessage = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      // Build the message payload
      const messageData = {
        sender_type: 'character',
        sender_id: characterId,
        sender_name: character.name,
        sender_title: character.ship_role || null,
        subject: newSubject,
        message_body: newMessageBody,
        priority: 'normal',
        thread_id: null
      };

      // Set recipient based on type
      if (recipientType === 'npc') {
        // NPC message - goes ONLY to DM (not broadcast to all players)
        messageData.recipient_type = 'dm';
        messageData.recipient_id = null;
        // Store the NPC name in metadata so we know who it was sent to
        messageData.metadata = { recipient_name: recipientName };
      } else if (recipientType === 'player') {
        // Player-to-player message
        messageData.recipient_type = 'character';
        messageData.recipient_id = parseInt(selectedPlayerId);
      }

      await axios.post(
        `${API_URL}/comms/send`,
        messageData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Reset form
      setNewSubject('');
      setNewMessageBody('');
      setRecipientType('npc');
      setRecipientName('');
      setSelectedPlayerId('');
      setShowComposer(false);
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'emergency': return 'border-red-500 bg-red-900 bg-opacity-20';
      case 'urgent': return 'border-yellow-500 bg-yellow-900 bg-opacity-20';
      default: return 'border-green-500 bg-gray-800';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'emergency': return '🚨';
      case 'urgent': return '⚠️';
      default: return '📨';
    }
  };

  if (!character) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-white">Loading communicator...</div>
      </div>
    );
  }

  // Show offline screen if communicator is not powered
  if (powerStatus && !powerStatus.powered) {
    const getOfflineMessage = () => {
      switch (powerStatus.reason) {
        case 'NO_COMMUNICATOR':
          return {
            title: 'NO COMMUNICATOR DETECTED',
            subtitle: 'HARDWARE NOT FOUND IN INVENTORY',
            details: 'You need a Communicator device to access this terminal.'
          };
        case 'NO_POWER':
          return {
            title: 'COMMUNICATOR OFFLINE',
            subtitle: 'NO POWER SOURCE DETECTED',
            details: 'Load an Energy Cell into your Communicator to restore power.'
          };
        case 'ERROR':
          return {
            title: 'SYSTEM ERROR',
            subtitle: 'UNABLE TO VERIFY COMMUNICATOR STATUS',
            details: 'Contact your DM if this issue persists.'
          };
        default:
          return {
            title: 'TERMINAL OFFLINE',
            subtitle: 'ACCESS DENIED',
            details: 'Unknown error occurred.'
          };
      }
    };

    const offlineMsg = getOfflineMessage();

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Offline Terminal Screen */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-8 border-2 border-red-600">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            {/* Animated warning icon */}
            <div className="text-8xl mb-8 animate-pulse">
              ⚠️
            </div>

            {/* Main error message */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-red-500 font-mono mb-3">
                [TERMINAL OFFLINE]
              </h1>
              <h2 className="text-2xl font-bold text-red-400 font-mono mb-2">
                {offlineMsg.title}
              </h2>
              <p className="text-xl text-red-300 font-mono mb-4">
                {offlineMsg.subtitle}
              </p>
              <p className="text-gray-400 font-mono max-w-md mx-auto">
                {offlineMsg.details}
              </p>
            </div>

            {/* Terminal-style divider */}
            <div className="w-full max-w-2xl my-8 border-t-2 border-red-800"></div>

            {/* Status display */}
            <div className="bg-black bg-opacity-50 border-2 border-red-700 rounded p-6 mb-8 w-full max-w-md">
              <div className="font-mono text-left space-y-2">
                <div className="text-gray-500">
                  &gt;&gt; SYSTEM DIAGNOSTICS
                </div>
                <div className="text-red-500">
                  POWER: <span className="text-red-400 animate-pulse">OFFLINE</span>
                </div>
                <div className="text-gray-600">
                  USER: {character.name.toUpperCase()}
                </div>
                <div className="text-gray-600">
                  STATUS: <span className="text-red-400">NO CONNECTION</span>
                </div>
              </div>
            </div>

            {/* Back button */}
            <button
              onClick={() => navigate(`/character/${characterId}`)}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-red-400 rounded border-2 border-red-600 font-mono font-bold text-base sm:text-lg transition min-h-[44px]"
            >
              ← RETURN TO CHARACTER SHEET
            </button>

            {/* Helpful hint */}
            <div className="mt-8 text-sm text-gray-600 font-mono max-w-md">
              <p>💡 TIP: Check your inventory for a Communicator and ensure it has an Energy Cell loaded.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Communicator Header */}
      <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-t-lg p-4 sm:p-6 border-2 border-green-500">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate(`/character/${characterId}`)}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-green-400 rounded border-2 border-green-600 font-mono min-h-[44px] sm:min-h-0"
              title="Back to Character Sheet"
            >
              ← BACK
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-green-300 font-mono">
                [COMMUNICATOR TERMINAL]
              </h1>
              <div className="text-green-400 text-xs sm:text-sm mt-1 font-mono">
                USER: {character.name.toUpperCase()} | STATUS: ONLINE
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
            <button
              onClick={() => setShowComposer(true)}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded border-2 border-blue-500 font-mono font-bold min-h-[44px] sm:min-h-0 flex-1 sm:flex-none"
            >
              [+ NEW MESSAGE]
            </button>
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-bold text-green-300 font-mono">
                {unreadCount > 0 ? (
                  <span className="animate-pulse">[{unreadCount}]</span>
                ) : (
                  '[0]'
                )}
              </div>
              <div className="text-xs text-green-400 font-mono">UNREAD</div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-gray-900 border-2 border-green-500 border-t-0 rounded-b-lg">
        <div className="p-4 border-b-2 border-green-700 bg-green-950">
          <h2 className="text-green-300 font-mono font-bold">
            &gt;&gt; INCOMING TRANSMISSIONS
          </h2>
        </div>

        <div className="divide-y divide-green-800">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-green-600 font-mono">
              [NO MESSAGES]
            </div>
          ) : (
            messages.map((msg) => {
              const isUnread = !msg.is_read_by_character;
              const iParticipated = msg.character_participated; // Did I send any message in this thread?
              const hasUnreadReplies = msg.has_unread_replies;
              const showAsNew = (iParticipated && hasUnreadReplies) || (isUnread && !iParticipated);

              // Debug logging for first render
              console.log('[Communicator] Message display:', {
                msg_id: msg.id,
                subject: msg.subject,
                isUnread,
                iParticipated,
                hasUnreadReplies,
                showAsNew,
                willShowSent: iParticipated && !hasUnreadReplies,
                sender_type: msg.sender_type,
                sender_id: msg.sender_id
              });

              return (
                <div
                  key={msg.id}
                  onClick={() => viewMessage(msg.id)}
                  className={`p-3 sm:p-4 transition cursor-pointer ${
                    showAsNew
                      ? 'bg-green-900 bg-opacity-30 hover:bg-opacity-50 border-l-4 border-green-400'
                      : iParticipated
                      ? 'bg-blue-900 bg-opacity-20 hover:bg-opacity-30'
                      : 'hover:bg-green-900 hover:bg-opacity-20'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl sm:text-2xl">{getPriorityIcon(msg.priority)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-green-300 font-mono text-sm sm:text-base">
                            {showAsNew && <span className="text-green-400 mr-2">[NEW]</span>}
                            {iParticipated && !hasUnreadReplies && <span className="text-blue-400 mr-2">[SENT]</span>}
                            <span className="break-words">{msg.subject || '[NO SUBJECT]'}</span>
                          </div>
                          <div className="text-xs sm:text-sm text-green-400 font-mono">
                            {msg.sender_type === 'character' && msg.sender_id === parseInt(characterId) ? (
                              // I sent the root message - show TO: recipient
                              msg.recipient_type === 'dm' ?
                                `TO: ${msg.metadata?.recipient_name?.toUpperCase() || 'DM'}` :
                              msg.recipient_type === 'character' ?
                                `TO: ${availablePlayers.find(p => p.id === msg.recipient_id)?.name.toUpperCase() || 'PLAYER'}` :
                              `TO: ${msg.recipient_type.toUpperCase()}`
                            ) : (
                              // Someone else sent the root - show FROM: sender
                              `FROM: ${msg.sender_name.toUpperCase()}`
                            )}
                            {msg.sender_title && !(msg.sender_type === 'character' && msg.sender_id === parseInt(characterId)) && (
                              <span className="text-green-600"> - {msg.sender_title.toUpperCase()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-300 mt-2 line-clamp-2 font-mono">
                        {msg.latest_message_preview || msg.message_body}
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 w-full sm:w-auto sm:text-right sm:ml-4">
                      {msg.priority !== 'normal' && (
                        <div className={`text-xs px-2 py-1 rounded font-mono ${
                          msg.priority === 'emergency' ? 'bg-red-600' : 'bg-yellow-600'
                        } text-white animate-pulse whitespace-nowrap`}>
                          {msg.priority.toUpperCase()}
                        </div>
                      )}
                      <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
                        <div className="text-xs text-green-600 font-mono whitespace-nowrap">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-green-700 font-mono whitespace-nowrap">
                          {new Date(msg.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                      {msg.reply_count > 0 && (
                        <div className="text-xs text-blue-400 font-mono animate-pulse whitespace-nowrap">
                          💬 [{msg.reply_count} {msg.reply_count === 1 ? 'REPLY' : 'REPLIES'}]
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <MessageDetailModal
          message={selectedMessage}
          character={character}
          onClose={() => setSelectedMessage(null)}
          onReply={sendReply}
          onArchive={archiveMessage}
        />
      )}

      {/* Composer Modal */}
      {showComposer && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg border-2 border-green-500 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b-2 border-green-700 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-green-300 font-mono">
                [COMPOSE NEW MESSAGE]
              </h2>
              <button
                onClick={() => setShowComposer(false)}
                className="text-green-400 hover:text-green-300 text-2xl sm:text-3xl font-mono min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
              >
                [X]
              </button>
            </div>

            <form onSubmit={sendNewMessage} className="space-y-4">
              <div>
                <label className="block text-sm text-green-400 mb-2 font-mono">
                  &gt;&gt; SEND TO *
                </label>
                <select
                  value={recipientType}
                  onChange={(e) => {
                    setRecipientType(e.target.value);
                    setRecipientName('');
                    setSelectedPlayerId('');
                  }}
                  className="w-full bg-gray-800 text-green-300 px-3 py-2 rounded border-2 border-green-600 focus:border-green-400 focus:outline-none font-mono"
                >
                  <option value="npc">NPC / Contact</option>
                  <option value="player">Player Character</option>
                </select>
              </div>

              {recipientType === 'npc' && (
                <div>
                  <label className="block text-sm text-green-400 mb-2 font-mono">
                    NPC/CONTACT NAME *
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full bg-gray-800 text-green-300 px-3 py-2 rounded border-2 border-green-600 focus:border-green-400 focus:outline-none font-mono"
                    placeholder="e.g., Station Commander, Captain Vex..."
                    required
                  />
                  <div className="text-xs text-green-600 mt-1 font-mono">
                    (Message will be sent to DM who can reply as this NPC)
                  </div>
                </div>
              )}

              {recipientType === 'player' && (
                <div>
                  <label className="block text-sm text-green-400 mb-2 font-mono">
                    SELECT PLAYER *
                  </label>
                  <select
                    value={selectedPlayerId}
                    onChange={(e) => setSelectedPlayerId(e.target.value)}
                    className="w-full bg-gray-800 text-green-300 px-3 py-2 rounded border-2 border-green-600 focus:border-green-400 focus:outline-none font-mono"
                    required
                  >
                    <option value="">Choose player...</option>
                    {availablePlayers.map((player) => (
                      <option key={player.id} value={player.id}>
                        {player.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm text-green-400 mb-2 font-mono">
                  SUBJECT *
                </label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full bg-gray-800 text-green-300 px-3 py-2 rounded border-2 border-green-600 focus:border-green-400 focus:outline-none font-mono"
                  placeholder="Enter subject..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-green-400 mb-2 font-mono">
                  MESSAGE *
                </label>
                <textarea
                  value={newMessageBody}
                  onChange={(e) => setNewMessageBody(e.target.value)}
                  className="w-full bg-gray-800 text-green-300 px-3 py-2 rounded border-2 border-green-600 focus:border-green-400 focus:outline-none h-32 font-mono"
                  placeholder="Type your message..."
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t-2 border-green-700">
                <button
                  type="button"
                  onClick={() => setShowComposer(false)}
                  className="px-6 py-3 sm:py-2 bg-gray-700 hover:bg-gray-600 text-green-400 rounded border-2 border-green-700 font-mono min-h-[44px] sm:min-h-0 order-2 sm:order-1"
                >
                  [CANCEL]
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 sm:py-2 bg-green-700 hover:bg-green-600 text-white rounded border-2 border-green-500 font-bold font-mono min-h-[44px] sm:min-h-0 order-1 sm:order-2"
                >
                  [SEND MESSAGE]
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Message Detail Modal
function MessageDetailModal({ message, character, onClose, onReply, onArchive }) {
  const [replyBody, setReplyBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!replyBody.trim()) return;

    onReply(message.message.id, message.message.thread_id || message.message.id, replyBody);
    setReplyBody('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg border-2 border-green-500 p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 border-b-2 border-green-700 pb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-green-300 font-mono">
            [MESSAGE THREAD]
          </h2>
          <button
            onClick={onClose}
            className="text-green-400 hover:text-green-300 text-2xl sm:text-3xl font-mono min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
          >
            [X]
          </button>
        </div>

        {/* Thread Messages */}
        <div className="space-y-3 mb-6">
          {message.thread.map((msg, index) => {
            const isSentByMe = msg.sender_type === 'character' && msg.sender_id === character.id;
            const isRoot = msg.thread_id === null;

            return (
              <div key={msg.id} className="relative">
                {/* Thread connector line */}
                {index > 0 && (
                  <div className="absolute left-6 -top-3 w-0.5 h-3 bg-green-700"></div>
                )}

                <div
                  className={`p-4 rounded border-2 font-mono relative ${
                    isSentByMe
                      ? 'bg-blue-900 bg-opacity-30 border-blue-500 ml-8'
                      : isRoot
                      ? 'bg-green-900 bg-opacity-30 border-green-500'
                      : 'bg-green-900 bg-opacity-20 border-green-600 ml-8'
                  }`}
                >
                  {/* Reply indicator */}
                  {!isRoot && (
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-green-600">
                      └→
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="font-bold text-green-300">
                        {isRoot && <span className="text-green-500 mr-2">[ORIGINAL]</span>}
                        {isSentByMe ? `[YOU] ${msg.sender_name.toUpperCase()}` : `[${msg.sender_name.toUpperCase()}]`}
                        {msg.sender_title && (
                          <span className="text-green-500 ml-2">- {msg.sender_title.toUpperCase()}</span>
                        )}
                      </div>
                      <div className="text-xs text-green-600">
                        {new Date(msg.created_at).toLocaleString()}
                      </div>
                    </div>
                    {msg.priority !== 'normal' && (
                      <span className={`text-xs px-2 py-1 rounded ${
                        msg.priority === 'emergency' ? 'bg-red-600' : 'bg-yellow-600'
                      } text-white animate-pulse`}>
                        [{msg.priority.toUpperCase()}]
                      </span>
                    )}
                  </div>
                  {msg.subject && isRoot && (
                    <div className="text-sm text-green-400 mb-2 font-bold">
                      SUBJECT: {msg.subject.toUpperCase()}
                    </div>
                  )}
                  <div className="text-gray-200 whitespace-pre-wrap border-l-4 border-green-700 pl-3 mt-2">
                    {msg.message_body}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply Form */}
        <form onSubmit={handleSubmit} className="border-t-2 border-green-700 pt-4">
          <label className="block text-sm text-green-400 mb-2 font-mono">
            &gt;&gt; COMPOSE REPLY
          </label>
          <textarea
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
            className="w-full bg-gray-800 text-green-300 px-3 py-2 rounded border-2 border-green-600 focus:border-green-400 focus:outline-none h-32 mb-3 font-mono"
            placeholder="Type your message..."
          />
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <button
              type="button"
              onClick={() => {
                if (confirm('⚠️ Archive this conversation? This will permanently remove it from your inbox.')) {
                  onArchive(message.message.thread_id || message.message.id);
                }
              }}
              className="px-4 py-3 sm:py-2 bg-red-800 hover:bg-red-700 text-white rounded border-2 border-red-600 font-mono text-sm min-h-[44px] sm:min-h-0 order-3 sm:order-1"
            >
              [🗑️ ARCHIVE CONVERSATION]
            </button>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 sm:py-2 bg-gray-700 hover:bg-gray-600 text-green-400 rounded border-2 border-green-700 font-mono min-h-[44px] sm:min-h-0 order-2 sm:order-1"
              >
                [CLOSE]
              </button>
              <button
                type="submit"
                className="px-6 py-3 sm:py-2 bg-green-700 hover:bg-green-600 text-white rounded border-2 border-green-500 font-bold font-mono min-h-[44px] sm:min-h-0 order-1 sm:order-2"
              >
                [SEND REPLY]
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Communicator;
