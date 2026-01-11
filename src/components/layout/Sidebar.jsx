import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  ShoppingBag, 
  Bell, 
  LogOut,
  ChevronDown,
  ChevronUp,
  PackageCheck
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/shops', icon: Store, label: 'Shops' },
  { path: '/orders', icon: ShoppingBag, label: 'Orders' },
  { path: '/notifications', icon: Bell, label: 'Notifications' },
]

const userMenuItems = [
  { path: '/users', label: 'Users' },
  { path: '/shopkeepers', label: 'Shopkeepers' },
  { path: '/admins', label: 'Admins' },
]

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false)
  
  const handleLogout = () => {
    clearAuth()
    navigate('/login')
  }

  return (
    <aside className="w-64 bg-white border-r border-secondary-200">
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-secondary-200 gap-3">
          <PackageCheck size={28} className="text-primary-600" />
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
          
          {/* Users Dropdown */}
          <div className="space-y-1">
            <button
              onClick={() => setIsUsersDropdownOpen(!isUsersDropdownOpen)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full ${
                userMenuItems.some(item => location.pathname === item.path)
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-secondary-600 hover:bg-secondary-100'
              }`}
            >
              <Users size={20} />
              <span className="flex-1 text-left">Users</span>
              {isUsersDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {isUsersDropdownOpen && (
              <div className="ml-4 space-y-1">
                {userMenuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-secondary-600 hover:bg-secondary-100'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>
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
