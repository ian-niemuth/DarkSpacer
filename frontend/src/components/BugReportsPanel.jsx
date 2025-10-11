import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/api';

function BugReportsPanel() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'unresolved', 'resolved'

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/bug-reports`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReports(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bug reports:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this bug report?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/bug-reports/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReports(reports.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting bug report:', error);
      alert('Failed to delete bug report');
    }
  };

  const handleToggleResolved = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/bug-reports/${id}/resolve`, {
        resolved: !currentStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setReports(reports.map(r =>
        r.id === id ? { ...r, resolved: !currentStatus } : r
      ));
    } catch (error) {
      console.error('Error updating bug report:', error);
      alert('Failed to update bug report');
    }
  };

  const filteredReports = reports.filter(report => {
    if (filter === 'unresolved') return !report.resolved;
    if (filter === 'resolved') return report.resolved;
    return true;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-white">Loading bug reports...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/admin" className="text-blue-400 hover:text-blue-300">
          ← Back to Admin Panel
        </Link>
      </div>

      <div className="bg-purple-900 bg-opacity-20 border border-purple-600 rounded-lg p-4 mb-6">
        <h1 className="text-3xl font-bold text-white">🐛 Bug Reports</h1>
        <p className="text-gray-300 mt-2">
          View and manage bug reports from players
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded font-bold transition-colors ${
            filter === 'all'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          All ({reports.length})
        </button>
        <button
          onClick={() => setFilter('unresolved')}
          className={`px-4 py-2 rounded font-bold transition-colors ${
            filter === 'unresolved'
              ? 'bg-red-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Unresolved ({reports.filter(r => !r.resolved).length})
        </button>
        <button
          onClick={() => setFilter('resolved')}
          className={`px-4 py-2 rounded font-bold transition-colors ${
            filter === 'resolved'
              ? 'bg-green-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Resolved ({reports.filter(r => r.resolved).length})
        </button>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
            <p className="text-gray-400">No bug reports found</p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report.id}
              className={`bg-gray-800 rounded-lg p-6 border ${
                report.resolved ? 'border-green-600' : 'border-red-600'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">
                    #{report.id}
                  </span>
                  <span className="font-bold text-white">
                    {report.username}
                  </span>
                  {report.resolved ? (
                    <span className="text-xs bg-green-600 px-2 py-1 rounded text-white">
                      RESOLVED
                    </span>
                  ) : (
                    <span className="text-xs bg-red-600 px-2 py-1 rounded text-white">
                      OPEN
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(report.created_at).toLocaleString()}
                </div>
              </div>

              <div className="bg-gray-700 rounded p-4 mb-4">
                <p className="text-white whitespace-pre-wrap">{report.description}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleToggleResolved(report.id, report.resolved)}
                  className={`px-4 py-2 rounded font-bold transition-colors ${
                    report.resolved
                      ? 'bg-yellow-600 hover:bg-yellow-700'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                >
                  {report.resolved ? 'Mark as Unresolved' : 'Mark as Resolved'}
                </button>
                <button
                  onClick={() => handleDelete(report.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BugReportsPanel;
