// frontend/src/components/GMXPAward.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

function GMXPAward() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [xpAmount, setXpAmount] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  const fetchAllCharacters = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/characters`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCharacters(response.data);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setError('Failed to load characters');
    }
  };

  const toggleCharacter = (charId) => {
    setSelectedCharacters(prev => {
      if (prev.includes(charId)) {
        return prev.filter(id => id !== charId);
      } else {
        return [...prev, charId];
      }
    });
  };

  const selectAll = () => {
    setSelectedCharacters(characters.map(c => c.id));
  };

  const deselectAll = () => {
    setSelectedCharacters([]);
  };

  const handleAwardXP = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (selectedCharacters.length === 0) {
      setError('Please select at least one character');
      return;
    }

    if (!xpAmount || parseInt(xpAmount) <= 0) {
      setError('Please enter a valid XP amount');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/advancement/award-xp`,
        {
          characterIds: selectedCharacters,
          xpAmount: parseInt(xpAmount),
          reason: reason || 'XP Award'
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessage(response.data.message);
      
      // Show level-up notifications
      const canLevelUp = response.data.results.filter(r => r.canLevelUp);
      if (canLevelUp.length > 0) {
        setMessage(prev => prev + `\n\n🎉 ${canLevelUp.length} character(s) can level up!`);
      }

      // Reset form
      setXpAmount('');
      setReason('');
      setSelectedCharacters([]);
      
      // Refresh character list
      fetchAllCharacters();

      // Clear message after 5 seconds
      setTimeout(() => setMessage(''), 5000);

    } catch (error) {
      console.error('Error awarding XP:', error);
      setError(error.response?.data?.error || 'Failed to award XP');
    } finally {
      setLoading(false);
    }
  };

  const getXPRequired = (level) => level * 10;

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">🎲 Award Experience Points</h2>

      {message && (
        <div className="mb-4 bg-green-600 text-white px-4 py-3 rounded-lg whitespace-pre-line">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-600 text-white px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleAwardXP} className="space-y-6">
        {/* Character Selection */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-white font-bold">Select Characters</label>
            <div className="space-x-2">
              <button
                type="button"
                onClick={selectAll}
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={deselectAll}
                className="text-xs bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
              >
                Deselect All
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
            {characters.map((char) => {
              const xpRequired = getXPRequired(char.level);
              const xpProgress = (char.xp / xpRequired) * 100;
              
              return (
                <div
                  key={char.id}
                  onClick={() => toggleCharacter(char.id)}
                  className={`
                    cursor-pointer rounded-lg p-3 transition border-2
                    ${selectedCharacters.includes(char.id)
                      ? 'border-green-500 bg-green-900 bg-opacity-30'
                      : 'border-gray-600 bg-gray-700 hover:bg-gray-600'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-bold text-white">{char.name}</div>
                      <div className="text-xs text-gray-400">
                        Level {char.level} {char.archetype}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Player: {char.player_username}
                      </div>
                      
                      {/* XP Progress Bar */}
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>{char.xp} / {xpRequired} XP</span>
                          <span>{Math.round(xpProgress)}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              xpProgress >= 100 ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${Math.min(xpProgress, 100)}%` }}
                          />
                        </div>
                        {char.xp >= xpRequired && char.level < 10 && (
                          <div className="text-xs text-green-400 mt-1 font-bold">
                            ✨ Can Level Up!
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-2">
                      {selectedCharacters.includes(char.id) && (
                        <div className="text-green-500 text-xl">✓</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-sm text-gray-400 mt-2">
            {selectedCharacters.length} character(s) selected
          </div>
        </div>

        {/* XP Amount */}
        <div>
          <label className="block text-white font-bold mb-2">XP Amount</label>
          <input
            type="number"
            min="1"
            value={xpAmount}
            onChange={(e) => setXpAmount(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Enter XP amount"
            required
          />
          <div className="text-xs text-gray-400 mt-1">
            💡 Tip: Levels require Current Level × 10 XP
          </div>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-white font-bold mb-2">Reason (Optional)</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="e.g., Completed mission, defeated boss, great roleplay"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || selectedCharacters.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition"
        >
          {loading ? 'Awarding XP...' : `Award ${xpAmount || '?'} XP to ${selectedCharacters.length} Character(s)`}
        </button>
      </form>

      {/* Quick Award Buttons */}
      <div className="mt-6 border-t border-gray-700 pt-6">
        <div className="text-white font-bold mb-3">Quick Award</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[5, 10, 20, 50].map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setXpAmount(amount.toString())}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
            >
              {amount} XP
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GMXPAward;
