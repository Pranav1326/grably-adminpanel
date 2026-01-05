import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Send } from 'lucide-react'
import { notificationsApi } from '../api/notifications'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { Input, TextArea, Select } from '../components/forms'

const NotificationsPage = () => {
  const [notificationType, setNotificationType] = useState('push')
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const sendNotificationMutation = useMutation({
    mutationFn: notificationsApi.sendNotification,
    onSuccess: () => {
      alert('Notification sent successfully!')
      reset()
    },
  })

  const sendEmailMutation = useMutation({
    mutationFn: notificationsApi.sendEmail,
    onSuccess: () => {
      alert('Email sent successfully!')
      reset()
    },
  })

  const onSubmit = (data) => {
    if (notificationType === 'email') {
      sendEmailMutation.mutate(data)
    } else {
      sendNotificationMutation.mutate(data)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Notifications</h1>
        <p className="text-secondary-600 mt-1">Send notifications and emails to users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Notification Form */}
        <Card title="Send Notification">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Select
              label="Notification Type"
              name="type"
              value={notificationType}
              onChange={(e) => setNotificationType(e.target.value)}
              options={[
                { value: 'push', label: 'Push Notification' },
                { value: 'email', label: 'Email' },
              ]}
              required
            />

            <Select
              label="Recipient"
              name="recipient"
              register={register}
              error={errors.recipient}
              options={[
                { value: 'all', label: 'All Users' },
                { value: 'users', label: 'All Customers' },
                { value: 'shops', label: 'All Shop Owners' },
                { value: 'custom', label: 'Custom' },
              ]}
              required
            />

            {notificationType === 'email' && (
              <Input
                label="Subject"
                name="subject"
                register={register}
                error={errors.subject}
                placeholder="Email subject"
                required
              />
            )}

            <Input
              label="Title"
              name="title"
              register={register}
              error={errors.title}
              placeholder="Notification title"
              required
            />

            <TextArea
              label="Message"
              name="message"
              register={register}
              error={errors.message}
              placeholder="Write your message here..."
              rows={6}
              required
            />

            <Button 
              type="submit" 
              className="w-full"
              isLoading={sendNotificationMutation.isPending || sendEmailMutation.isPending}
            >
              <Send size={20} className="mr-2" />
              Send {notificationType === 'email' ? 'Email' : 'Notification'}
            </Button>
          </form>
        </Card>

        {/* Recent Notifications */}
        <Card title="Recent Notifications">
          <div className="space-y-4">
            {[
              {
                id: 1,
                title: 'Welcome to Grably',
                message: 'Thank you for joining Grably!',
                type: 'email',
                recipient: 'All Users',
                date: '2 hours ago',
              },
              {
                id: 2,
                title: 'New Order Alert',
                message: 'You have received a new order',
                type: 'push',
                recipient: 'Shop Owners',
                date: '5 hours ago',
              },
              {
                id: 3,
                title: 'Order Delivered',
                message: 'Your order has been delivered',
                type: 'push',
                recipient: 'Customers',
                date: '1 day ago',
              },
            ].map((notification) => (
              <div 
                key={notification.id} 
                className="p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-secondary-900">{notification.title}</h4>
                  <span className="text-xs text-secondary-500">{notification.date}</span>
                </div>
                <p className="text-sm text-secondary-600 mb-2">{notification.message}</p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                    {notification.type}
                  </span>
                  <span className="text-xs text-secondary-500">
                    Sent to: {notification.recipient}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default NotificationsPage
