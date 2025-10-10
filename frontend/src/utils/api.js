import axios from 'axios';

// Create axios instance with auth header automatically included
const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// Add auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
