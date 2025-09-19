import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Activity, 
  AlertTriangle, 
  BarChart3, 
  MapPin, 
  Smartphone,
  Cloud,
  Shield
} from 'lucide-react'

const Sidebar = () => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Sensor Data', href: '/sensors', icon: Activity },
    { name: 'Alerts', href: '/alerts', icon: AlertTriangle },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Map View', href: '/map', icon: MapPin },
    { name: 'Mobile App', href: '/mobile', icon: Smartphone },
    { name: 'Cloud Status', href: '/cloud', icon: Cloud },
    { name: 'Security', href: '/security', icon: Shield },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-800">System Online</span>
          </div>
          <p className="text-xs text-green-600 mt-1">All sensors connected</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
