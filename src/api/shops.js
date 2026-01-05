import apiClient from '../lib/apiClient'

export const shopsApi = {
  getShops: async (params) => {
    const response = await apiClient.get('/shops', { params })
    return response.data
  },
  
  getShop: async (id) => {
    const response = await apiClient.get(`/shops/${id}`)
    return response.data
  },
  
  createShop: async (data) => {
    const response = await apiClient.post('/shops', data)
    return response.data
  },
  
  updateShop: async (id, data) => {
    const response = await apiClient.put(`/shops/${id}`, data)
    return response.data
  },
  
  deleteShop: async (id) => {
    const response = await apiClient.delete(`/shops/${id}`)
    return response.data
  },
  
  approveShop: async (id) => {
    const response = await apiClient.patch(`/shops/${id}/approve`)
    return response.data
  },
  
  rejectShop: async (id, reason) => {
    const response = await apiClient.patch(`/shops/${id}/reject`, { reason })
    return response.data
  },
}
