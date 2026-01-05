import apiClient from '../lib/apiClient'

export const ordersApi = {
  getOrders: async (params) => {
    const response = await apiClient.get('/orders', { params })
    return response.data
  },
  
  getOrder: async (id) => {
    const response = await apiClient.get(`/orders/${id}`)
    return response.data
  },
  
  updateOrderStatus: async (id, status) => {
    const response = await apiClient.patch(`/orders/${id}/status`, { status })
    return response.data
  },
}
