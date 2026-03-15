import api from './api'

/**
 * Authentication Service
 * 
 * Handles all authentication-related API operations:
 * - Login
 * - Register
 * - Logout
 * - Get current user
 * - Update profile
 */

const authService = {
  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<{user: Object, token: string}>}
   */
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.firstName - First name
   * @param {string} userData.lastName - Last name
   * @param {string} userData.email - Email address
   * @param {string} userData.password - Password
   * @param {string} userData.role - User role (student/teacher)
   * @returns {Promise<{user: Object, token: string}>}
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  /**
   * Get current authenticated user
   * @returns {Promise<{user: Object}>}
   */
  getMe: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },

  /**
   * Update user profile
   * @param {Object} updates - Profile updates
   * @returns {Promise<{user: Object}>}
   */
  updateProfile: async (updates) => {
    const response = await api.patch('/auth/profile', updates)
    return response.data
  },

  /**
   * Change user password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<Object>}
   */
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.post('/auth/change-password', {
      currentPassword,
      newPassword,
    })
    return response.data
  },

  /**
   * Upload avatar image
   * @param {FormData} formData - Form data with avatar file
   * @returns {Promise<{avatar: string}>}
   */
  uploadAvatar: async (formData) => {
    const response = await api.post('/auth/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  /**
   * Logout user (client-side only)
   * Clears auth state from store
   */
  logout: () => {
    // Clear auth store
    useAuthStore.getState().logout()
  },
}

export default authService
