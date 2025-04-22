// src/lib/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-production-1d4d.up.railway.app/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
