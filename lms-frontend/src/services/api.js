import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handles errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const requestUrl = error.config?.url || ''

    // Normalize to a pathname (handles both relative and absolute URLs)
    let pathname = requestUrl
    try {
      pathname = new URL(requestUrl, window.location.origin).pathname
    } catch {
      // ignore
    }

    // Avoid triggering a full-page redirect on failed auth calls.
    // e.g. /auth/login, /auth/register, /auth/refresh
    const isAuthEndpoint = pathname.startsWith('/auth/')

    if (status === 401 && !isAuthEndpoint) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default api