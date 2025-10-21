import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api, API_URL } from '../config/api';
import { io } from 'socket.io-client';
import { WS_URL } from '../config/api';

function CharacterNotes() {
  const { characterId } = useParams();
  const navigate = useNavigate();

  // State
  const [notes, setNotes] = useState([]);
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [socket, setSocket] = useState(null);

  // Editor state
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editNoteTitle, setEditNoteTitle] = useState('');
  const [editNoteContent, setEditNoteContent] = useState('');
  const [editNoteTags, setEditNoteTags] = useState([]);
  const [editNotePinned, setEditNotePinned] = useState(false);

  // Filter/search state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);

  // UI state
  const [showNewNote, setShowNewNote] = useState(false);
  const [newNoteTags, setNewNoteTags] = useState([]);
  const [newNotePinned, setNewNotePinned] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [expandedNotes, setExpandedNotes] = useState(new Set());

  // Fetch character info
  const fetchCharacter = async () => {
    try {
      const response = await api.get(`${API_URL}/characters/${characterId}`);
      setCharacter(response.data);
    } catch (error) {
      console.error('Error fetching character:', error);
    }
  };

  // Fetch notes with filters
  const fetchNotes = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedTags.length > 0) params.append('tags', selectedTags.join(','));
      if (showArchived) params.append('archived', 'true');
      if (sortBy) params.append('sort', sortBy);
      if (showPinnedOnly) params.append('pinned', 'true');

      const response = await api.get(`${API_URL}/characters/${characterId}/notes?${params}`);
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await api.get(`${API_URL}/characters/${characterId}/notes/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Create note
  const handleCreateNote = async () => {
    if (!newNoteContent.trim()) return;

    try {
      await api.post(`${API_URL}/characters/${characterId}/notes`, {
        title: newNoteTitle,
        content: newNoteContent,
        tags: newNoteTags,
        pinned: newNotePinned
      });
      setNewNoteTitle('');
      setNewNoteContent('');
      setNewNoteTags([]);
      setNewNotePinned(false);
      setShowNewNote(false);
      fetchNotes();
      fetchStats();
    } catch (error) {
      console.error('Error creating note:', error);
      alert(error.response?.data?.error || 'Failed to create note');
    }
  };

  // Update note
  const handleUpdateNote = async (noteId) => {
    if (!editNoteContent.trim()) return;

    try {
      await api.put(`${API_URL}/characters/${characterId}/notes/${noteId}`, {
        title: editNoteTitle,
        content: editNoteContent,
        tags: editNoteTags,
        pinned: editNotePinned
      });
      setEditingNoteId(null);
      setEditNoteTitle('');
      setEditNoteContent('');
      setEditNoteTags([]);
      setEditNotePinned(false);
      fetchNotes();
      fetchStats();
    } catch (error) {
      console.error('Error updating note:', error);
      alert(error.response?.data?.error || 'Failed to update note');
    }
  };

  // Delete note
  const handleDeleteNote = async (noteId) => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
      await api.delete(`${API_URL}/characters/${characterId}/notes/${noteId}`);
      fetchNotes();
      fetchStats();
    } catch (error) {
      console.error('Error deleting note:', error);
      alert(error.response?.data?.error || 'Failed to delete note');
    }
  };

  // Toggle pin
  const handleTogglePin = async (note) => {
    try {
      await api.put(`${API_URL}/characters/${characterId}/notes/${note.id}`, {
        title: note.title,
        content: note.content,
        tags: note.tags,
        pinned: !note.pinned
      });
      fetchNotes();
      fetchStats();
    } catch (error) {
      console.error('Error toggling pin:', error);
    }
  };

  // Archive note
  const handleArchiveNote = async (note) => {
    try {
      await api.put(`${API_URL}/characters/${characterId}/notes/${note.id}`, {
        title: note.title,
        content: note.content,
        tags: note.tags,
        pinned: note.pinned,
        archived: !note.archived
      });
      fetchNotes();
      fetchStats();
    } catch (error) {
      console.error('Error archiving note:', error);
    }
  };

  // Bulk operations
  const handleBulkOperation = async (operation, data = {}) => {
    if (selectedNotes.length === 0) return;

    try {
      await api.patch(`${API_URL}/characters/${characterId}/notes/bulk`, {
        noteIds: selectedNotes,
        operation,
        data
      });
      setSelectedNotes([]);
      setShowBulkActions(false);
      fetchNotes();
      fetchStats();
    } catch (error) {
      console.error('Error in bulk operation:', error);
      alert(error.response?.data?.error || 'Bulk operation failed');
    }
  };

  // Add tag to note
  const handleAddTag = (tags, setTags) => {
    if (!tagInput.trim()) return;
    if (!tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
    }
    setTagInput('');
  };

  // Remove tag
  const handleRemoveTag = (tag, tags, setTags) => {
    setTags(tags.filter(t => t !== tag));
  };

  // Start editing
  const handleStartEdit = (note) => {
    setEditingNoteId(note.id);
    setEditNoteTitle(note.title || '');
    setEditNoteContent(note.content);
    setEditNoteTags(note.tags || []);
    setEditNotePinned(note.pinned);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditNoteTitle('');
    setEditNoteContent('');
    setEditNoteTags([]);
    setEditNotePinned(false);
  };

  // Toggle note selection
  const toggleNoteSelection = (noteId) => {
    setSelectedNotes(prev =>
      prev.includes(noteId) ? prev.filter(id => id !== noteId) : [...prev, noteId]
    );
  };

  // Toggle note expansion
  const toggleNoteExpansion = (noteId) => {
    setExpandedNotes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(noteId)) {
        newSet.delete(noteId);
      } else {
        newSet.add(noteId);
      }
      return newSet;
    });
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Export notes
  const handleExport = () => {
    const notesToExport = selectedNotes.length > 0
      ? notes.filter(n => selectedNotes.includes(n.id))
      : notes;

    const text = notesToExport.map(note => {
      let content = '';
      if (note.title) {
        content += `${note.title}\n${'='.repeat(note.title.length)}\n\n`;
      }
      content += `${note.content}\n\n`;
      content += `Created: ${formatTimestamp(note.created_at)}\n`;
      if (note.tags && note.tags.length > 0) {
        content += `Tags: ${note.tags.join(', ')}\n`;
      }
      content += '\n---\n\n';
      return content;
    }).join('');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${character?.name || 'character'}-notes.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Initialize
  useEffect(() => {
    fetchCharacter();
    fetchNotes();
    fetchStats();

    // Setup socket
    const token = localStorage.getItem('token');
    const newSocket = io(WS_URL, {
      auth: { token }
    });
    setSocket(newSocket);

    newSocket.emit('join_character', characterId);

    newSocket.on('notes_updated', () => {
      fetchNotes();
      fetchStats();
    });

    return () => {
      newSocket.disconnect();
    };
  }, [characterId]);

  // Refetch notes when filters change
  useEffect(() => {
    if (!loading) {
      fetchNotes();
    }
  }, [searchTerm, selectedTags, showArchived, sortBy, showPinnedOnly]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading notes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Link
              to={`/character/${characterId}`}
              className="text-blue-400 hover:text-blue-300 text-sm mb-2 inline-block"
            >
              ← Back to Character Sheet
            </Link>
            <h1 className="text-3xl font-bold">📝 Private Notes</h1>
            {stats && (
              <p className="text-gray-400 text-sm mt-1">
                {stats.activeNotes} active • {stats.archivedNotes} archived • {stats.totalCharacters} characters
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowNewNote(!showNewNote)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold"
            >
              ✚ New Note
            </button>
            {selectedNotes.length > 0 && (
              <button
                onClick={() => setShowBulkActions(!showBulkActions)}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-bold"
              >
                Bulk ({selectedNotes.length})
              </button>
            )}
            {notes.length > 0 && (
              <button
                onClick={handleExport}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-bold"
              >
                Export
              </button>
            )}
          </div>
        </div>

        {/* Bulk Actions Panel */}
        {showBulkActions && selectedNotes.length > 0 && (
          <div className="bg-purple-900 border border-purple-600 rounded-lg p-4 mb-4">
            <h3 className="font-bold mb-2">Bulk Actions ({selectedNotes.length} selected)</h3>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleBulkOperation('delete')}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Delete Selected
              </button>
              <button
                onClick={() => handleBulkOperation('archive')}
                className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm"
              >
                Archive Selected
              </button>
              <button
                onClick={() => handleBulkOperation('unarchive')}
                className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
              >
                Unarchive Selected
              </button>
              <button
                onClick={() => setSelectedNotes([])}
                className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* New Note Form */}
        {showNewNote && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Create New Note</h2>
            <input
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              placeholder="Title (optional)"
              className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:outline-none focus:border-blue-500 mb-3"
            />
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Write your note here... (Markdown supported)"
              className="w-full bg-gray-700 text-white rounded-lg p-4 border border-gray-600 focus:outline-none focus:border-blue-500 resize-none mb-3"
              rows="6"
            />
            <div className="text-sm text-gray-400 mb-3">
              {newNoteContent.length} characters
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Tags</label>
              <div className="flex gap-2 mb-2 flex-wrap">
                {newNoteTags.map(tag => (
                  <span key={tag} className="bg-blue-600 px-2 py-1 rounded text-sm flex items-center gap-1">
                    {tag}
                    <button onClick={() => handleRemoveTag(tag, newNoteTags, setNewNoteTags)} className="hover:text-red-400">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag(newNoteTags, setNewNoteTags)}
                  placeholder="Add tag..."
                  className="flex-1 bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => handleAddTag(newNoteTags, setNewNoteTags)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Pin */}
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={newNotePinned}
                onChange={(e) => setNewNotePinned(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">📌 Pin this note</span>
            </label>

            <div className="flex gap-2">
              <button
                onClick={handleCreateNote}
                disabled={!newNoteContent.trim()}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-2 rounded font-bold"
              >
                Create Note
              </button>
              <button
                onClick={() => {
                  setShowNewNote(false);
                  setNewNoteTitle('');
                  setNewNoteContent('');
                  setNewNoteTags([]);
                  setNewNotePinned(false);
                }}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-bold mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notes..."
                className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-bold mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="updated">Recently Updated</option>
                <option value="az">A-Z</option>
              </select>
            </div>

            {/* Filters */}
            <div className="space-y-2">
              <label className="block text-sm font-bold mb-2">Filters</label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showArchived}
                  onChange={(e) => setShowArchived(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Show Archived</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showPinnedOnly}
                  onChange={(e) => setShowPinnedOnly(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Pinned Only</span>
              </label>
            </div>

            {/* Tag Filter */}
            {stats && stats.allTags.length > 0 && (
              <div>
                <label className="block text-sm font-bold mb-2">Filter by Tags</label>
                <div className="flex gap-1 flex-wrap">
                  {stats.allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedTags(prev =>
                          prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                        );
                      }}
                      className={`px-2 py-1 rounded text-xs ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          {notes.length === 0 ? (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
              <p className="text-gray-400 text-lg">No notes found. Create your first note!</p>
            </div>
          ) : (
            notes.map(note => (
              <div
                key={note.id}
                className={`bg-gray-800 border rounded-lg p-4 ${
                  note.pinned ? 'border-yellow-500' : 'border-gray-700'
                } ${note.archived ? 'opacity-60' : ''}`}
              >
                {editingNoteId === note.id ? (
                  // Edit Mode
                  <div>
                    <input
                      type="text"
                      value={editNoteTitle}
                      onChange={(e) => setEditNoteTitle(e.target.value)}
                      placeholder="Title (optional)"
                      className="w-full bg-gray-700 text-white rounded-lg p-3 border border-gray-600 focus:outline-none focus:border-blue-500 mb-3"
                    />
                    <textarea
                      value={editNoteContent}
                      onChange={(e) => setEditNoteContent(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg p-4 border border-gray-600 focus:outline-none focus:border-blue-500 resize-none mb-3"
                      rows="6"
                    />
                    <div className="text-sm text-gray-400 mb-3">
                      {editNoteContent.length} characters
                    </div>

                    {/* Tags in edit mode */}
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2">Tags</label>
                      <div className="flex gap-2 mb-2 flex-wrap">
                        {editNoteTags.map(tag => (
                          <span key={tag} className="bg-blue-600 px-2 py-1 rounded text-sm flex items-center gap-1">
                            {tag}
                            <button onClick={() => handleRemoveTag(tag, editNoteTags, setEditNoteTags)} className="hover:text-red-400">×</button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddTag(editNoteTags, setEditNoteTags)}
                          placeholder="Add tag..."
                          className="flex-1 bg-gray-700 text-white rounded px-3 py-2 border border-gray-600 focus:outline-none focus:border-blue-500"
                        />
                        <button
                          onClick={() => handleAddTag(editNoteTags, setEditNoteTags)}
                          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    <label className="flex items-center gap-2 mb-4">
                      <input
                        type="checkbox"
                        checked={editNotePinned}
                        onChange={(e) => setEditNotePinned(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">📌 Pin this note</span>
                    </label>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateNote(note.id)}
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <input
                          type="checkbox"
                          checked={selectedNotes.includes(note.id)}
                          onChange={() => toggleNoteSelection(note.id)}
                          className="mt-1 w-4 h-4"
                        />
                        <div className="flex-1">
                          {note.pinned && <span className="text-yellow-500 mr-2">📌</span>}
                          {note.archived && <span className="text-gray-500 mr-2">[Archived]</span>}
                          {note.title && (
                            <h3 className="text-lg font-bold text-blue-400 mb-2">{note.title}</h3>
                          )}
                          <div
                            className={`whitespace-pre-wrap ${
                              !expandedNotes.has(note.id) && note.content.length > 300 ? 'line-clamp-3' : ''
                            }`}
                          >
                            {note.content}
                          </div>
                          {note.content.length > 300 && (
                            <button
                              onClick={() => toggleNoteExpansion(note.id)}
                              className="text-blue-400 hover:text-blue-300 text-sm mt-2"
                            >
                              {expandedNotes.has(note.id) ? 'Show less' : 'Show more'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    {note.tags && note.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap mb-3">
                        {note.tags.map(tag => (
                          <span key={tag} className="bg-blue-600 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <div>
                        <div>Created: {formatTimestamp(note.created_at)}</div>
                        {note.updated_at !== note.created_at && (
                          <div>Updated: {formatTimestamp(note.updated_at)}</div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleTogglePin(note)}
                          className={`px-3 py-1 rounded text-sm ${
                            note.pinned
                              ? 'bg-yellow-600 hover:bg-yellow-700'
                              : 'bg-gray-600 hover:bg-gray-700'
                          }`}
                        >
                          {note.pinned ? 'Unpin' : 'Pin'}
                        </button>
                        <button
                          onClick={() => handleArchiveNote(note)}
                          className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm"
                        >
                          {note.archived ? 'Unarchive' : 'Archive'}
                        </button>
                        <button
                          onClick={() => handleStartEdit(note)}
                          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterNotes;
