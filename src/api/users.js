import apiClient from '../lib/apiClient'

export const usersApi = {
  getUsers: async (params) => {
    const response = await apiClient.get('/users', { params })
    return response.data
  },
  
  getUser: async (id) => {
    const response = await apiClient.get(`/users/${id}`)
    return response.data
  },
  
  createUser: async (data) => {
    const response = await apiClient.post('/users', data)
    return response.data
  },
  
  updateUser: async (id, data) => {
    const response = await apiClient.put(`/users/${id}`, data)
    return response.data
  },
  
  deleteUser: async (id) => {
    const response = await apiClient.delete(`/users/${id}`)
    return response.data
  },
  
  toggleUserStatus: async (id) => {
    const response = await apiClient.patch(`/users/${id}/toggle-status`)
    return response.data
  },
}
