import apiClient from '../lib/apiClient'

export const authApi = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials)
    return response.data
  },
  
  logout: async () => {
    const response = await apiClient.post('/admin/logout')
    return response.data
  },
  
  getCurrentUser: async () => {
    const response = await apiClient.get('/admin/me')
    return response.data
  },
  
  refreshToken: async () => {
    const response = await apiClient.post('/admin/refresh')
    return response.data
  },
}
