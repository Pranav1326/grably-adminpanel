import { Users, Store, ShoppingBag, DollarSign } from 'lucide-react'
import Card from '../components/ui/Card'

const stats = [
  { 
    name: 'Total Users', 
    value: '1,234', 
    icon: Users, 
    change: '+12.5%',
    changeType: 'positive' 
  },
  { 
    name: 'Active Shops', 
    value: '456', 
    icon: Store, 
    change: '+8.2%',
    changeType: 'positive' 
  },
  { 
    name: 'Total Orders', 
    value: '3,890', 
    icon: ShoppingBag, 
    change: '+15.3%',
    changeType: 'positive' 
  },
  { 
    name: 'Revenue', 
    value: '$45,678', 
    icon: DollarSign, 
    change: '-2.4%',
    changeType: 'negative' 
  },
]

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Dashboard</h1>
        <p className="text-secondary-600 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name} className="hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-secondary-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-2 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon className="text-primary-600" size={24} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Orders">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((order) => (
              <div key={order} className="flex items-center justify-between py-3 border-b border-secondary-100 last:border-0">
                <div>
                  <p className="font-medium text-secondary-900">Order #{1000 + order}</p>
                  <p className="text-sm text-secondary-600">Customer Name</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-secondary-900">${(Math.random() * 100).toFixed(2)}</p>
                  <p className="text-xs text-secondary-600">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Shop Registrations">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((shop) => (
              <div key={shop} className="flex items-center justify-between py-3 border-b border-secondary-100 last:border-0">
                <div>
                  <p className="font-medium text-secondary-900">Shop Name {shop}</p>
                  <p className="text-sm text-secondary-600">Category</p>
                </div>
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
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

export default DashboardPage
