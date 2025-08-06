import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URI}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to every request if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
