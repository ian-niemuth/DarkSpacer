// API Configuration
// Uses environment variables for production deployment

const isDevelopment = import.meta.env.DEV;

export const API_URL = isDevelopment
  ? 'http://localhost:3001/api'
  : (import.meta.env.VITE_API_URL || '/api');

export const WS_URL = isDevelopment
  ? 'http://localhost:3001'
  : (import.meta.env.VITE_WS_URL || window.location.origin);

// Export axios instance with default config
import axios from 'axios';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to all requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors (token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
