import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      setAuth: (user, token) => {
        set({ user, token, isAuthenticated: true })
      },
      
      clearAuth: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },
      
      updateUser: (user) => {
        set({ user })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

// Helper functions for use outside React components
export const getAuthToken = () => useAuthStore.getState().token
export const clearAuth = () => useAuthStore.getState().clearAuth()
