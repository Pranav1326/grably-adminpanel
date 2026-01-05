import { NavLink, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  ShoppingBag, 
  Bell, 
  LogOut 
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/users', icon: Users, label: 'Users' },
  { path: '/shops', icon: Store, label: 'Shops' },
  { path: '/orders', icon: ShoppingBag, label: 'Orders' },
  { path: '/notifications', icon: Bell, label: 'Notifications' },
]

const Sidebar = () => {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((state) => state.clearAuth)
  
  const handleLogout = () => {
    clearAuth()
    navigate('/login')
  }

  return (
    <aside className="w-64 bg-white border-r border-secondary-200">
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-secondary-200">
          <h1 className="text-2xl font-bold text-primary-600">Grably</h1>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-secondary-600 hover:bg-secondary-100'
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
        
        {/* Logout */}
        <div className="p-4 border-t border-secondary-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-secondary-600 hover:bg-secondary-100 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
