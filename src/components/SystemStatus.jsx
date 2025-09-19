import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wifi, Cloud, Shield, Smartphone, Server, Database } from 'lucide-react'

const SystemStatus = () => {
  const [systemComponents, setSystemComponents] = useState([])

  useEffect(() => {
    const mockComponents = [
      {
        name: 'IoT Sensors',
        status: 'online',
        uptime: '99.8%',
        lastSeen: '2 seconds ago',
        icon: Wifi,
        details: 'Arduino UNO + ESP8266',
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      },
      {
        name: 'Cloud Platform',
        status: 'online',
        uptime: '99.9%',
        lastSeen: '1 second ago',
        icon: Cloud,
        details: 'AWS IoT Core',
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
      },
      {
        name: 'Database',
        status: 'online',
        uptime: '99.7%',
        lastSeen: '1 second ago',
        icon: Database,
        details: 'PostgreSQL + Redis',
        color: 'text-purple-500',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200'
      },
      {
        name: 'ML Server',
        status: 'online',
        uptime: '98.5%',
        lastSeen: '5 seconds ago',
        icon: Server,
        details: 'Python + TensorFlow',
        color: 'text-orange-500',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200'
      },
      {
        name: 'Mobile App',
        status: 'online',
        uptime: '99.2%',
        lastSeen: '3 seconds ago',
        icon: Smartphone,
        details: 'Android + Offline Sync',
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      },
      {
        name: 'Security',
        status: 'online',
        uptime: '100%',
        lastSeen: '1 second ago',
        icon: Shield,
        details: 'End-to-end encryption',
        color: 'text-red-500',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      }
    ]

    setSystemComponents(mockComponents)
  }, [])

  const getStatusIndicator = (status) => {
    return status === 'online' ? (
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
    ) : (
      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
    )
  }

  const getUptimeColor = (uptime) => {
    const value = parseFloat(uptime)
    if (value >= 99.5) return 'text-green-600'
    if (value >= 98.0) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">All Systems Operational</span>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Overall Health</p>
              <p className="text-2xl font-bold text-green-900">99.2%</p>
            </div>
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Active Connections</p>
              <p className="text-2xl font-bold text-blue-900">1,247</p>
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Wifi className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Component Status */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Component Status</h4>
        {systemComponents.map((component, index) => (
          <motion.div
            key={component.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${component.bgColor} ${component.borderColor} border rounded-lg p-4`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${component.bgColor}`}>
                  <component.icon className={`w-5 h-5 ${component.color}`} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h5 className="text-sm font-semibold text-gray-900">{component.name}</h5>
                    {getStatusIndicator(component.status)}
                  </div>
                  <p className="text-xs text-gray-600">{component.details}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`text-sm font-medium ${getUptimeColor(component.uptime)}`}>
                  {component.uptime}
                </p>
                <p className="text-xs text-gray-500">{component.lastSeen}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Performance Metrics</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">2.3ms</p>
            <p className="text-xs text-gray-500">Avg Response Time</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">847</p>
            <p className="text-xs text-gray-500">Data Points/min</p>
          </div>
        </div>
      </div>

      {/* Security Status */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Security Status</p>
              <p className="text-xs text-gray-500">All systems encrypted</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-green-600">Secure</p>
            <p className="text-xs text-gray-500">AES-256</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SystemStatus
