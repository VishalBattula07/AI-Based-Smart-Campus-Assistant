import axios from 'axios';

// Dedicated Axios instance configured for Spring Boot backend
const baseURL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) 
  ? import.meta.env.VITE_API_URL 
  : 'http://localhost:8080/api';

const api = axios.create({
  baseURL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to automatically attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('campusiq_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified error parsing & token refresh handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Auto handle expired sessions safely
      // localStorage.removeItem('campusiq_token');
    }
    return Promise.reject(error);
  }
);

export default api;
