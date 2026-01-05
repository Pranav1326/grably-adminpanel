import apiClient from '../lib/apiClient'

export const authApi = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/admin/login', credentials)
    return response.data
  },
  
  logout: async () => {
    const response = await apiClient.post('/auth/logout')
    return response.data
  },
  
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me')
    return response.data
  },
  
  refreshToken: async () => {
    const response = await apiClient.post('/auth/refresh')
    return response.data
  },
}
