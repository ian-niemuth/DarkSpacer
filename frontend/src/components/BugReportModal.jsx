import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

function BugReportModal({ onClose }) {
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    setSubmitting(true);
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/bug-reports`, {
        description: description.trim()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage('Bug report submitted successfully! Thank you for your feedback.');
      setDescription('');

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Error submitting bug report:', err);
      setError(err.response?.data?.error || 'Failed to submit bug report');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">🐛 Report a Bug</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-300 mb-2">
              Bug Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe the bug you encountered..."
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 min-h-[120px]"
              disabled={submitting}
            />
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-600 text-white rounded">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 px-4 py-3 bg-green-600 text-white rounded">
              {message}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting || !description.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded font-bold transition-colors"
            >
              {submitting ? 'Submitting...' : 'Submit Report'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-bold transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BugReportModal;
