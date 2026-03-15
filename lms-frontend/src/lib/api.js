/**
 * API Service Layer
 */

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      const errorMessage = response.data?.message || 
                          (response.data?.errors && response.data.errors.map(e => e.msg).join(', ')) ||
                          `Request failed with status ${response.status}`;
      
      switch (response.status) {
        case 401:
          // Only clear authentication state for non-login requests
          if (!config.url.includes('/auth/login')) {
            import('../stores/authStore').then(({ default: useAuthStore }) => {
              useAuthStore.getState().logout();
            });
          }
          break;
        case 403:
          console.error('Access forbidden:', errorMessage);
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error:', errorMessage);
          break;
        default:
          console.error('API error:', errorMessage);
      }
    } else {
      console.error('Network error - please check your connection');
    }

    return Promise.reject(error);
  }
);

export default api;
