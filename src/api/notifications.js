import apiClient from '../lib/apiClient'

export const notificationsApi = {
  sendNotification: async (data) => {
    const response = await apiClient.post('/notifications', data)
    return response.data
  },
  
  sendEmail: async (data) => {
    const response = await apiClient.post('/notifications/email', data)
    return response.data
  },
  
  getNotificationHistory: async (params) => {
    const response = await apiClient.get('/notifications/history', { params })
    return response.data
  },
}
