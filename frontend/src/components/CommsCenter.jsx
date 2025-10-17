import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import { API_URL, WS_URL } from '../config/api';

function CommsCenter() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [ships, setShips] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showComposer, setShowComposer] = useState(false);
  const [socket, setSocket] = useState(null);

  // Composer state
  const [senderName, setSenderName] = useState('');
  const [senderTitle, setSenderTitle] = useState('');
  const [recipientType, setRecipientType] = useState('character');
  const [recipientId, setRecipientId] = useState('');
  const [subject, setSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [priority, setPriority] = useState('normal');

  useEffect(() => {
    console.log('[CommsCenter] Initializing');

    fetchMessages();
    fetchCharacters();
    fetchShips();

    // Socket for real-time updates
    const token = localStorage.getItem('token');
    const newSocket = io(WS_URL, {
      auth: { token }
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('[CommsCenter] Socket connected:', newSocket.id);
    });

    // Listen for new messages (player replies)
    newSocket.on('new_message', (data) => {
      console.log('[CommsCenter] New message received:', data);
      fetchMessages(); // Refresh message list
      // Play notification sound
      playNotificationSound();
    });

    newSocket.on('disconnect', () => {
      console.log('[CommsCenter] Socket disconnected');
    });

    newSocket.on('connect_error', (error) => {
      console.error('[CommsCenter] Socket connection error:', error);
    });

    return () => {
      console.log('[CommsCenter] Cleaning up socket connection');
      newSocket.disconnect();
    };
  }, []);

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

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/comms/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchCharacters = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/characters`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCharacters(response.data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const fetchShips = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/ships`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShips(response.data);
    } catch (error) {
      console.error('Error fetching ships:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/comms/send`,
        {
          sender_type: 'npc',
          sender_name: senderName,
          sender_title: senderTitle || null,
          recipient_type: recipientType,
          recipient_id: recipientId || null,
          subject,
          message_body: messageBody,
          priority
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Reset form
      setSenderName('');
      setSenderTitle('');
      setRecipientType('character');
      setRecipientId('');
      setSubject('');
      setMessageBody('');
      setPriority('normal');
      setShowComposer(false);

      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      alert(error.response?.data?.error || 'Failed to send message');
    }
  };

  const handleReply = async (messageId, threadId, replyBody, senderName, senderTitle) => {
    try {
      const token = localStorage.getItem('token');

      // Get original message to determine recipient
      const originalMessage = messages.find(m => m.id === messageId);

      await axios.post(
        `${API_URL}/comms/send`,
        {
          sender_type: 'npc',
          sender_name: senderName,
          sender_title: senderTitle || null,
          recipient_type: originalMessage.sender_type === 'character' ? 'character' : 'all',
          recipient_id: originalMessage.sender_id || null,
          subject: `Re: ${originalMessage.subject || 'Message'}`,
          message_body: replyBody,
          priority: 'normal',
          thread_id: threadId || messageId
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchMessages();
      setSelectedMessage(null);
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply');
    }
  };

  const viewMessageThread = async (messageId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/comms/message/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedMessage(response.data);

      // Mark as read by DM
      console.log('[CommsCenter] Marking message as read:', messageId);
      const markReadResponse = await axios.post(
        `${API_URL}/comms/admin/mark-read/${messageId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('[CommsCenter] Mark-as-read response:', markReadResponse.data);

      // Refresh messages to update UI
      await fetchMessages();
      console.log('[CommsCenter] Messages refreshed');

      // Emit event to trigger badge update
      window.dispatchEvent(new CustomEvent('dm-message-read'));
    } catch (error) {
      console.error('Error in viewMessageThread:', error);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!confirm('⚠️ Permanently delete this message? This cannot be undone!')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/comms/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchMessages();
      setSelectedMessage(null);
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'emergency': return 'bg-red-600';
      case 'urgent': return 'bg-yellow-600';
      default: return 'bg-blue-600';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'emergency': return '🚨';
      case 'urgent': return '⚠️';
      default: return '📨';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded border-2 border-gray-600 font-bold"
            title="Back to Dashboard"
          >
            ← BACK
          </button>
          <h1 className="text-3xl font-bold text-white">📡 Comms Center</h1>
        </div>
        <button
          onClick={() => setShowComposer(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold"
        >
          + Send Message
        </button>
      </div>

      {/* Messages List */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Sent Messages</h2>
        </div>

        <div className="divide-y divide-gray-700">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No messages sent yet
            </div>
          ) : (
            messages.map((msg) => {
              const hasPlayerMessages = msg.has_player_messages;
              const latestSenderIsPlayer = msg.latest_message_sender_type === 'character';
              const dmHasViewed = msg.dm_has_viewed;
              const isUnread = hasPlayerMessages && latestSenderIsPlayer && !dmHasViewed; // Unread if latest is from player and DM hasn't viewed

              return (
                <div
                  key={msg.id}
                  onClick={() => viewMessageThread(msg.id)}
                  className={`p-4 cursor-pointer transition ${
                    isUnread
                      ? 'bg-blue-900 bg-opacity-30 hover:bg-opacity-40 border-l-4 border-blue-400'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{getPriorityIcon(msg.priority)}</span>
                        <div>
                          <div className="font-bold text-white">
                            {isUnread && <span className="text-blue-400 mr-2">[NEW]</span>}
                            {msg.subject || '(No Subject)'}
                          </div>
                          <div className="text-sm text-gray-400">
                            From: {msg.sender_name}
                            {msg.sender_title && <span className="text-gray-500"> ({msg.sender_title})</span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-300 mt-2 line-clamp-2">
                        {msg.latest_message_preview || msg.message_body}
                      </div>
                    </div>
                  <div className="text-right ml-4">
                    <div className={`text-xs px-2 py-1 rounded ${getPriorityColor(msg.priority)} text-white mb-2`}>
                      {msg.priority.toUpperCase()}
                    </div>
                    <div className="text-xs text-gray-400">
                      To: {msg.recipient_type === 'character'
                        ? characters.find(c => c.id === msg.recipient_id)?.name || 'Character'
                        : msg.recipient_type === 'ship_crew'
                        ? ships.find(s => s.id === msg.recipient_id)?.name || 'Ship Crew'
                        : msg.recipient_type === 'dm'
                        ? msg.metadata?.recipient_name || 'DM'
                        : msg.recipient_type.replace('_', ' ').toUpperCase()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </div>
                    {msg.reply_count > 0 && (
                      <div className="text-xs text-blue-400 mt-1">
                        💬 {msg.reply_count} {msg.reply_count === 1 ? 'reply' : 'replies'}
                      </div>
                    )}
                    {msg.read_count > 0 && (
                      <div className="text-xs text-green-400 mt-1">
                        ✓ {msg.read_count} read
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

      {/* Composer Modal */}
      {showComposer && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-600">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">📤 Send Message</h2>
              <button
                onClick={() => setShowComposer(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              {/* Sender Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">From (NPC Name) *</label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                    placeholder="e.g., Station Commander"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Title (optional)</label>
                  <input
                    type="text"
                    value={senderTitle}
                    onChange={(e) => setSenderTitle(e.target.value)}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                    placeholder="e.g., Orbital Station Alpha"
                  />
                </div>
              </div>

              {/* Recipient */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Send To *</label>
                  <select
                    value={recipientType}
                    onChange={(e) => {
                      setRecipientType(e.target.value);
                      setRecipientId('');
                    }}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                  >
                    <option value="character">Character</option>
                    <option value="ship_crew">Ship Crew</option>
                    <option value="party">Party</option>
                    <option value="all">All Players</option>
                  </select>
                </div>

                {(recipientType === 'character' || recipientType === 'ship_crew') && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      {recipientType === 'character' ? 'Select Character' : 'Select Ship'} *
                    </label>
                    <select
                      value={recipientId}
                      onChange={(e) => setRecipientId(e.target.value)}
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                      required
                    >
                      <option value="">Choose...</option>
                      {recipientType === 'character'
                        ? characters.map((char) => (
                            <option key={char.id} value={char.id}>
                              {char.name}
                            </option>
                          ))
                        : ships.map((ship) => (
                            <option key={ship.id} value={ship.id}>
                              {ship.name}
                            </option>
                          ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                >
                  <option value="normal">📨 Normal</option>
                  <option value="urgent">⚠️ Urgent</option>
                  <option value="emergency">🚨 Emergency</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                  placeholder="Enter subject..."
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Message *</label>
                <textarea
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded h-32"
                  placeholder="Type your message..."
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowComposer(false)}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-bold"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Message Thread Modal */}
      {selectedMessage && (
        <MessageThreadModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onReply={handleReply}
          onDelete={deleteMessage}
        />
      )}
    </div>
  );
}

// Message Thread Modal Component
function MessageThreadModal({ message, onClose, onReply, onDelete }) {
  const [replyBody, setReplyBody] = useState('');
  const [replySenderName, setReplySenderName] = useState('');
  const [replySenderTitle, setReplySenderTitle] = useState('');

  // Initialize with original sender details
  useEffect(() => {
    if (message?.message) {
      setReplySenderName(message.message.sender_name || '');
      setReplySenderTitle(message.message.sender_title || '');
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!replyBody.trim() || !replySenderName.trim()) return;

    onReply(
      message.message.id,
      message.message.thread_id || message.message.id,
      replyBody,
      replySenderName,
      replySenderTitle
    );
    setReplyBody('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-600">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">💬 Message Thread</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* Thread Messages */}
        <div className="space-y-3 mb-6">
          {message.thread.map((msg, index) => {
            const isPlayerMessage = msg.sender_type === 'character';
            const isRoot = msg.thread_id === null;

            return (
              <div key={msg.id} className="relative">
                {/* Thread connector */}
                {index > 0 && (
                  <div className="absolute left-6 -top-3 w-0.5 h-3 bg-gray-600"></div>
                )}

                <div
                  className={`p-4 rounded-lg relative ${
                    isPlayerMessage
                      ? 'bg-blue-900 bg-opacity-30 border-l-4 border-blue-500 ml-8'
                      : isRoot
                      ? 'bg-purple-900 bg-opacity-20 border-l-4 border-purple-500'
                      : 'bg-gray-700 ml-8 border-l-4 border-gray-500'
                  }`}
                >
                  {/* Reply indicator */}
                  {!isRoot && (
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
                      └→
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="font-bold text-white flex items-center gap-2 flex-wrap">
                        {isRoot && <span className="text-xs bg-purple-600 px-2 py-0.5 rounded">ORIGINAL</span>}
                        {isPlayerMessage && <span className="text-xs bg-blue-600 px-2 py-0.5 rounded">PLAYER</span>}
                        <span>{msg.sender_name}</span>
                        {msg.sender_title && (
                          <span className="text-gray-400 text-sm font-normal">({msg.sender_title})</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(msg.created_at).toLocaleString()}
                      </div>
                    </div>
                    {msg.priority !== 'normal' && (
                      <span className={`text-xs px-2 py-1 rounded ${
                        msg.priority === 'emergency' ? 'bg-red-600' : 'bg-yellow-600'
                      } text-white`}>
                        {msg.priority.toUpperCase()}
                      </span>
                    )}
                  </div>
                  {msg.subject && isRoot && (
                    <div className="text-sm text-gray-300 mb-2 font-bold">
                      Subject: {msg.subject}
                    </div>
                  )}
                  <div className="text-gray-200 whitespace-pre-wrap bg-gray-800 bg-opacity-50 p-3 rounded">
                    {msg.message_body}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply Form */}
        <form onSubmit={handleSubmit} className="border-t border-gray-600 pt-4">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Reply As (NPC Name) *</label>
              <input
                type="text"
                value={replySenderName}
                onChange={(e) => setReplySenderName(e.target.value)}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm"
                placeholder="e.g., Station Commander"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Title (optional)</label>
              <input
                type="text"
                value={replySenderTitle}
                onChange={(e) => setReplySenderTitle(e.target.value)}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded text-sm"
                placeholder="e.g., Orbital Station Alpha"
              />
            </div>
          </div>

          <label className="block text-sm text-gray-400 mb-2">Reply Message</label>
          <textarea
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded h-24 mb-3"
            placeholder="Type your reply..."
            required
          />
          <div className="flex gap-3 justify-between">
            <button
              type="button"
              onClick={() => onDelete(message.message.id)}
              className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded font-bold"
            >
              🗑️ Delete Conversation
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold"
              >
                Send Reply
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommsCenter;
