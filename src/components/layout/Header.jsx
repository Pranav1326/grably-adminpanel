import { Bell, User } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const Header = () => {
  const user = useAuthStore((state) => state.user)

  return (
    <header className="h-16 bg-white border-b border-secondary-200 flex items-center justify-between px-6">
      <div className="flex-1">
        {/* Search or breadcrumbs can go here */}
      </div>
      
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {/* User Menu */}
        <div className="flex items-center gap-3 pl-4 border-l border-secondary-200">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <User size={18} className="text-primary-600" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-secondary-900">
              {user?.name || 'Admin User'}
            </p>
            <p className="text-secondary-500">
              {user?.email || 'admin@grably.com'}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
