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

export const shopkeepersApi = {
  getShopkeepers: async (params) => {
    const response = await apiClient.get('/shopkeepers', { params })
    return response.data
  },
  
  getShopkeeper: async (id) => {
    const response = await apiClient.get(`/shopkeepers/${id}`)
    return response.data
  },
  
  createShopkeeper: async (data) => {
    const response = await apiClient.post('/shopkeepers', data)
    return response.data
  },
  
  updateShopkeeper: async (id, data) => {
    const response = await apiClient.put(`/shopkeepers/${id}`, data)
    return response.data
  },
  
  deleteShopkeeper: async (id) => {
    const response = await apiClient.delete(`/shopkeepers/${id}`)
    return response.data
  },
  
  toggleShopkeeperStatus: async (id) => {
    const response = await apiClient.patch(`/shopkeepers/${id}/toggle-status`)
    return response.data
  },
}

export const adminsApi = {
  getAdmins: async (params) => {
    const response = await apiClient.get('/admins', { params })
    return response.data
  },
  
  getAdmin: async (id) => {
    const response = await apiClient.get(`/admins/${id}`)
    return response.data
  },
  
  createAdmin: async (data) => {
    const response = await apiClient.post('/admins', data)
    return response.data
  },
  
  updateAdmin: async (id, data) => {
    const response = await apiClient.put(`/admins/${id}`, data)
    return response.data
  },
  
  deleteAdmin: async (id) => {
    const response = await apiClient.delete(`/admins/${id}`)
    return response.data
  },
  
  toggleAdminStatus: async (id) => {
    const response = await apiClient.patch(`/admins/${id}/toggle-status`)
    return response.data
  },
}