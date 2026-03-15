import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Authentication Store with rehydration handling
 */
const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false, // new: tracks rehydration

      // Actions
      login: (user, token) => {
        localStorage.setItem('token', token)
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          isInitialized: true,
        })
      },

      logout: () => {
        localStorage.removeItem('token')
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true,
        })
      },

      setLoading: (isLoading) => set({ isLoading }),

      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
      })),

      // Getters
      getUserRole: () => get().user?.role || null,
      isTeacher: () => get().user?.role?.toLowerCase() === 'teacher',
      isStudent: () => get().user?.role?.toLowerCase() === 'student',
      isAdmin: () => get().user?.role?.toLowerCase() === 'admin',
    }),
    {
      name: 'lms-auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
      onRehydrateStorage: () => (state) => {
        // mark store as initialized after rehydration
        if (state && state.user && state.token) {
          state.isAuthenticated = true
        } else {
          state.isAuthenticated = false
        }
        state.isInitialized = true
      },
    }
  )
)

export default useAuthStore