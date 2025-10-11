import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/api';

function RegistrationCodesPanel() {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [count, setCount] = useState(1);
  const [note, setNote] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [grantsAdmin, setGrantsAdmin] = useState(false);
  const [message, setMessage] = useState('');
  const [newCodes, setNewCodes] = useState([]);

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/registration-codes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCodes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching registration codes:', error);
      setLoading(false);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setGenerating(true);
    setMessage('');
    setNewCodes([]);

    try {
      const token = localStorage.getItem('token');
      const payload = {
        note: note.trim() || null,
        grantsAdmin
      };

      // If custom code is provided, use it; otherwise use count
      if (customCode.trim()) {
        payload.customCode = customCode.trim();
      } else {
        payload.count = parseInt(count);
      }

      const response = await axios.post(`${API_URL}/registration-codes/generate`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNewCodes(response.data.codes);
      setMessage(`✅ ${response.data.message}`);
      setNote('');
      setCustomCode('');
      setCount(1);
      setGrantsAdmin(false);
      fetchCodes();
    } catch (error) {
      console.error('Error generating codes:', error);
      const errorMsg = error.response?.data?.error || 'Failed to generate codes';
      setMessage(`❌ ${errorMsg}`);
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this registration code?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/registration-codes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCodes(codes.filter(c => c.id !== id));
      setMessage('✅ Code deleted');
    } catch (error) {
      console.error('Error deleting code:', error);
      setMessage('❌ Failed to delete code');
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setMessage(`✅ Copied: ${code}`);
    setTimeout(() => setMessage(''), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const unusedCodes = codes.filter(c => !c.is_used);
  const usedCodes = codes.filter(c => c.is_used);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/admin" className="text-blue-400 hover:text-blue-300">
          ← Back to Admin Panel
        </Link>
      </div>

      <div className="bg-purple-900 bg-opacity-20 border border-purple-600 rounded-lg p-4 mb-6">
        <h1 className="text-3xl font-bold text-white">🔑 Registration Codes</h1>
        <p className="text-gray-300 mt-2">
          Generate and manage registration codes for new users
        </p>
      </div>

      {message && (
        <div className={`mb-6 px-6 py-3 rounded-lg font-semibold ${
          message.startsWith('✅') ? 'bg-green-600' : 'bg-red-600'
        } text-white`}>
          {message}
        </div>
      )}

      {/* Generate New Codes */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Generate New Codes</h2>
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">
                Custom Code (optional)
              </label>
              <input
                type="text"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                placeholder="Leave empty for random codes"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 uppercase"
              />
              <p className="text-xs text-gray-400 mt-1">
                3-50 chars, letters/numbers/hyphens/underscores only
              </p>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">
                Number of Random Codes
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                disabled={!!customCode.trim()}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                required={!customCode.trim()}
              />
              <p className="text-xs text-gray-400 mt-1">
                {customCode.trim() ? 'Disabled when using custom code' : 'Generate multiple random codes'}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Note (optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g., For new DMs or For player batch #1"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-700 rounded border border-gray-600">
            <input
              type="checkbox"
              id="grantsAdmin"
              checked={grantsAdmin}
              onChange={(e) => setGrantsAdmin(e.target.checked)}
              className="w-5 h-5 text-red-600 bg-gray-600 border-gray-500 rounded focus:ring-red-500"
            />
            <label htmlFor="grantsAdmin" className="flex-1">
              <span className="text-white font-bold">Grants Admin (DM) Status</span>
              <p className="text-sm text-gray-300 mt-1">
                Users who register with this code will automatically become admins (DMs)
              </p>
            </label>
          </div>

          <button
            type="submit"
            disabled={generating}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-6 py-2 rounded font-bold transition-colors"
          >
            {generating ? 'Generating...' : customCode.trim() ? 'Create Custom Code' : 'Generate Random Codes'}
          </button>
        </form>

        {/* Show newly generated codes */}
        {newCodes.length > 0 && (
          <div className="mt-6 p-4 bg-gray-700 rounded border border-green-600">
            <h3 className="text-lg font-bold text-green-400 mb-3">✅ Newly Generated Codes</h3>
            <div className="space-y-2">
              {newCodes.map((codeObj) => (
                <div key={codeObj.id} className="flex items-center justify-between bg-gray-800 rounded px-4 py-2">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-mono text-lg">{codeObj.code}</span>
                    {codeObj.grants_admin && (
                      <span className="text-xs bg-red-600 px-2 py-1 rounded text-white font-bold">
                        🎲 GRANTS DM
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => copyToClipboard(codeObj.code)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-bold"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Unused Codes */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
        <h2 className="text-xl font-bold text-white mb-4">
          Available Codes ({unusedCodes.length})
        </h2>
        {unusedCodes.length === 0 ? (
          <p className="text-gray-400">No unused codes. Generate some above!</p>
        ) : (
          <div className="space-y-2">
            {unusedCodes.map((code) => (
              <div key={code.id} className="bg-gray-700 rounded p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-mono text-lg font-bold">{code.code}</span>
                      <span className="text-xs bg-green-600 px-2 py-1 rounded text-white">
                        UNUSED
                      </span>
                      {code.grants_admin && (
                        <span className="text-xs bg-red-600 px-2 py-1 rounded text-white font-bold">
                          🎲 GRANTS DM
                        </span>
                      )}
                    </div>
                    {code.note && (
                      <p className="text-sm text-gray-400 mt-1">{code.note}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Created {new Date(code.created_at).toLocaleDateString()}
                      {code.created_by_username && ` by ${code.created_by_username}`}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(code.code)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-bold"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => handleDelete(code.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Used Codes */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">
          Used Codes ({usedCodes.length})
        </h2>
        {usedCodes.length === 0 ? (
          <p className="text-gray-400">No codes have been used yet</p>
        ) : (
          <div className="space-y-2">
            {usedCodes.map((code) => (
              <div key={code.id} className="bg-gray-700 rounded p-4 opacity-75">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 font-mono line-through">{code.code}</span>
                      <span className="text-xs bg-gray-600 px-2 py-1 rounded text-white">
                        USED
                      </span>
                      {code.grants_admin && (
                        <span className="text-xs bg-red-600 px-2 py-1 rounded text-white font-bold">
                          🎲 GRANTED DM
                        </span>
                      )}
                    </div>
                    {code.note && (
                      <p className="text-sm text-gray-500 mt-1">{code.note}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Used by <span className="text-white font-semibold">{code.used_by_username || 'Unknown'}</span> on {new Date(code.used_at).toLocaleDateString()}
                      {code.grants_admin && <span className="text-red-400"> (now a DM)</span>}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(code.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegistrationCodesPanel;
