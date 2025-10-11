import { useState, useEffect } from 'react';
import { api } from '../config/api';

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Debug: Log when error changes
  useEffect(() => {
    if (error) {
      console.log('Error set to:', error);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Don't clear error before submit - let it persist until we get a response
    setLoading(true);

    try {
      const endpoint = isRegistering ? '/auth/register' : '/auth/login';
      const data = isRegistering
        ? { username, password, email, registrationCode }
        : { username, password };

      const response = await api.post(endpoint, data);

      if (isRegistering) {
        setLoading(false);
        setIsRegistering(false);
        setPassword('');
        setError('Registration successful! Please log in.');
      } else {
        // Clear error on successful login
        setError('');
        onLogin(response.data.token, response.data.user);
      }
    } catch (err) {
      console.log('Login error caught:', err.response?.data?.error);
      const errorMessage = err.response?.data?.error || 'An error occurred';
      // Update both states together
      setLoading(false);
      setError(errorMessage);
      console.log('Error and loading state updated');
    }
  };

  // Clear error only when user types, not during form submission
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    // Clear error when user corrects their input
    if (error && !error.includes('successful') && !loading) {
      setError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Clear error when user corrects their input
    if (error && !error.includes('successful') && !loading) {
      setError('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-white">
            ⚡ DarkSpacer
          </h2>
          <p className="mt-2 text-center text-sm sm:text-base text-gray-400">
            {isRegistering ? 'Create a new account' : 'Sign in to your account'}
          </p>
        </div>

        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                className="appearance-none rounded relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>

            {isRegistering && (
              <>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="appearance-none rounded relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                    placeholder="Email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="registrationCode" className="sr-only">
                    Registration Code
                  </label>
                  <input
                    id="registrationCode"
                    type="text"
                    required
                    className="appearance-none rounded relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base uppercase"
                    placeholder="Registration Code"
                    value={registrationCode}
                    onChange={(e) => setRegistrationCode(e.target.value.toUpperCase())}
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="appearance-none rounded relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          {error && (
            <div className={`px-4 py-3 rounded-lg text-sm sm:text-base font-semibold ${
              error.includes('successful')
                ? 'bg-green-600 bg-opacity-20 border border-green-600 text-green-400'
                : 'bg-red-600 bg-opacity-20 border border-red-600 text-red-400'
            }`}>
              {error.includes('successful') ? '✅ ' : '❌ '}{error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 min-h-[44px]"
            >
              {loading ? 'Please wait...' : isRegistering ? 'Register' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              className="text-blue-400 hover:text-blue-300 text-sm sm:text-base min-h-[44px] flex items-center justify-center"
            >
              {isRegistering
                ? 'Already have an account? Sign in'
                : "Don't have an account? Register"}
            </button>
          </div>
        </form>


      </div>
    </div>
  );
}

export default Login;