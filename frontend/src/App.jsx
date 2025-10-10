import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CharacterSheet from './components/CharacterSheet';
import AdminPanel from './components/AdminPanel';
import AdminShipsPanel from './components/AdminShipsPanel';
import PlayerShipView from './components/PlayerShipView';
import ShipCatalog from './components/ShipCatalog';
import GearCatalog from './components/GearCatalog';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, []);

  const handleLogin = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900">
        {user && (
          <>
            {/* Desktop/Tablet Navigation */}
            <nav className="bg-gray-800 border-b border-gray-700">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  {/* Left side - Logo */}
                  <div className="flex items-center">
                    <Link to="/" onClick={closeMobileMenu}>
                      <h1 className="text-xl sm:text-2xl font-bold text-white">
                        ⚡ DarkSpacer
                      </h1>
                    </Link>
                  </div>

                  {/* Mobile menu button */}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {mobileMenuOpen ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      )}
                    </svg>
                  </button>

                  {/* Desktop menu */}
                  <div className="hidden md:flex md:items-center md:space-x-4">
                    <span className="text-gray-300 text-sm">
                      {user.username}
                      {user.isAdmin && (
                        <span className="ml-2 text-xs bg-red-600 text-white px-2 py-1 rounded">
                          DM
                        </span>
                      )}
                    </span>
                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold text-sm"
                      >
                        🎲 DM Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile menu dropdown */}
              {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-700 bg-gray-800">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    <div className="px-3 py-2 text-gray-300 text-base font-medium border-b border-gray-700 mb-2">
                      {user.username}
                      {user.isAdmin && (
                        <span className="ml-2 text-xs bg-red-600 text-white px-2 py-1 rounded">
                          DM
                        </span>
                      )}
                    </div>
                    
                    <Link
                      to="/"
                      onClick={closeMobileMenu}
                      className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      🏠 Dashboard
                    </Link>
                    
                    <Link
                      to="/ships"
                      onClick={closeMobileMenu}
                      className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      🚀 My Ships
                    </Link>
                    
                    <Link
                      to="/catalog/ships"
                      onClick={closeMobileMenu}
                      className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      📖 Ship Catalog
                    </Link>
                    
                    <Link
                      to="/catalog/gear"
                      onClick={closeMobileMenu}
                      className="block px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      ⚔️ Gear Catalog
                    </Link>

                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        onClick={closeMobileMenu}
                        className="block px-3 py-3 rounded-md text-base font-medium bg-red-600 text-white hover:bg-red-700 mt-2"
                      >
                        🎲 DM Panel
                      </Link>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-3 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700 mt-2"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </nav>
          </>
        )}

        <Routes>
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
            }
          />
          
          <Route
            path="/"
            element={
              user ? <Dashboard user={user} /> : <Navigate to="/login" />
            }
          />
          
          <Route
            path="/character/:id"
            element={
              user ? <CharacterSheet user={user} /> : <Navigate to="/login" />
            }
          />
          
          <Route
            path="/admin"
            element={
              user && user.isAdmin ? (
                <AdminPanel user={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          
          <Route
            path="/admin/ships"
            element={
              user && user.isAdmin ? (
                <AdminShipsPanel user={user} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          
          <Route
            path="/ships/:id?"
            element={
              user ? <PlayerShipView user={user} /> : <Navigate to="/login" />
            }
          />
          
          <Route
            path="/catalog/ships"
            element={
              user ? <ShipCatalog user={user} /> : <Navigate to="/login" />
            }
          />
          
          <Route
            path="/catalog/gear"
            element={
              user ? <GearCatalog user={user} /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
