import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Smartphone, Battery, Wifi, MapPin, User, Settings, AlertTriangle, CheckCircle, Clock, Signal } from 'lucide-react'

const PortableDevices = () => {
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState(null)

  useEffect(() => {
    // Simulate portable device data
    const mockDevices = [
      {
        id: 1,
        deviceId: 'PT-001',
        name: 'Portable Tester PT-001',
        type: 'Water Quality Tester',
        status: 'active',
        battery: 85,
        signal: -45,
        location: 'Zone A - Well A1',
        assignedTo: 'Dr. Sarah Johnson',
        lastSeen: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        testsToday: 12,
        totalTests: 1247,
        firmware: 'v2.1.3',
        maintenanceDue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        features: ['pH', 'Turbidity', 'Temperature', 'Conductivity'],
        connectivity: 'Wi-Fi + Bluetooth',
        storage: { used: 2.3, total: 8.0 }
      },
      {
        id: 2,
        deviceId: 'PT-002',
        name: 'Portable Tester PT-002',
        type: 'Water Quality Tester',
        status: 'critical',
        battery: 15,
        signal: -65,
        location: 'Zone B - Treatment Plant B',
        assignedTo: 'Mike Chen',
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        testsToday: 8,
        totalTests: 892,
        firmware: 'v2.1.2',
        maintenanceDue: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days overdue
        features: ['pH', 'Turbidity', 'Temperature', 'Conductivity'],
        connectivity: 'Wi-Fi + Bluetooth',
        storage: { used: 5.8, total: 8.0 }
      },
      {
        id: 3,
        deviceId: 'PT-003',
        name: 'Portable Tester PT-003',
        type: 'Water Quality Tester',
        status: 'active',
        battery: 92,
        signal: -38,
        location: 'Zone C - Reservoir C',
        assignedTo: 'Dr. Emily Rodriguez',
        lastSeen: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
        testsToday: 15,
        totalTests: 2103,
        firmware: 'v2.1.3',
        maintenanceDue: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        features: ['pH', 'Turbidity', 'Temperature', 'Conductivity'],
        connectivity: 'Wi-Fi + Bluetooth',
        storage: { used: 1.2, total: 8.0 }
      },
      {
        id: 4,
        deviceId: 'PT-004',
        name: 'Portable Tester PT-004',
        type: 'Water Quality Tester',
        status: 'warning',
        battery: 45,
        signal: -55,
        location: 'Zone D - Well D1',
        assignedTo: 'James Wilson',
        lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        testsToday: 6,
        totalTests: 756,
        firmware: 'v2.0.8',
        maintenanceDue: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        features: ['pH', 'Turbidity', 'Temperature', 'Conductivity'],
        connectivity: 'Wi-Fi + Bluetooth',
        storage: { used: 3.4, total: 8.0 }
      },
      {
        id: 5,
        deviceId: 'PT-005',
        name: 'Portable Tester PT-005',
        type: 'Water Quality Tester',
        status: 'offline',
        battery: 0,
        signal: null,
        location: 'Zone E - Treatment Plant E',
        assignedTo: 'Lisa Park',
        lastSeen: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        testsToday: 0,
        totalTests: 445,
        firmware: 'v2.1.1',
        maintenanceDue: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
        features: ['pH', 'Turbidity', 'Temperature', 'Conductivity'],
        connectivity: 'Wi-Fi + Bluetooth',
        storage: { used: 0.8, total: 8.0 }
      }
    ]

    setDevices(mockDevices)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' }
      case 'warning': return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' }
      case 'critical': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
      case 'offline': return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' }
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' }
    }
  }

  const getBatteryColor = (battery) => {
    if (battery > 50) return 'text-green-600'
    if (battery > 20) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getSignalColor = (signal) => {
    if (!signal) return 'text-gray-400'
    if (signal > -50) return 'text-green-600'
    if (signal > -70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    
    if (minutes < 60) {
      return `${minutes}m ago`
    } else {
      return `${hours}h ago`
    }
  }

  const handleDeviceAction = (deviceId, action) => {
    console.log(`${action} device ${deviceId}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Portable Devices</h3>
            <p className="text-sm text-gray-500">Field testing equipment management</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">{devices.filter(d => d.status === 'active').length} Active</span>
        </div>
      </div>

      {/* Device Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Active Devices</p>
              <p className="text-2xl font-bold text-green-900">
                {devices.filter(d => d.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-800">Critical Issues</p>
              <p className="text-2xl font-bold text-red-900">
                {devices.filter(d => d.status === 'critical').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Total Tests Today</p>
              <p className="text-2xl font-bold text-blue-900">
                {devices.reduce((sum, d) => sum + d.testsToday, 0)}
              </p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-800">Maintenance Due</p>
              <p className="text-2xl font-bold text-yellow-900">
                {devices.filter(d => d.maintenanceDue < new Date()).length}
              </p>
            </div>
            <Settings className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Device List */}
      <div className="space-y-4">
        {devices.map((device, index) => {
          const statusColors = getStatusColor(device.status)
          
          return (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${statusColors.bg} ${statusColors.border} border rounded-lg p-4`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{device.name}</h4>
                    <div className="flex items-center space-x-4 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{device.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{device.assignedTo}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTimeAgo(device.lastSeen)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors.text} ${statusColors.bg} ${statusColors.border}`}>
                    {device.status}
                  </span>
                </div>
              </div>

              {/* Device Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="bg-white rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600">Battery</span>
                    <Battery className={`w-4 h-4 ${getBatteryColor(device.battery)}`} />
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className={`text-lg font-bold ${getBatteryColor(device.battery)}`}>
                      {device.battery}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className={`h-1.5 rounded-full ${
                        device.battery > 50 ? 'bg-green-500' : 
                        device.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${device.battery}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600">Signal</span>
                    <Signal className={`w-4 h-4 ${getSignalColor(device.signal)}`} />
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className={`text-lg font-bold ${getSignalColor(device.signal)}`}>
                      {device.signal ? `${device.signal} dBm` : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600">Tests Today</span>
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-lg font-bold text-gray-900">{device.testsToday}</span>
                    <span className="text-xs text-gray-500">/ {device.totalTests}</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600">Storage</span>
                    <Settings className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-lg font-bold text-gray-900">{device.storage.used}GB</span>
                    <span className="text-xs text-gray-500">/ {device.storage.total}GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div 
                      className="h-1.5 rounded-full bg-blue-500"
                      style={{ width: `${(device.storage.used / device.storage.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Device Features */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Features:</p>
                <div className="flex flex-wrap gap-1">
                  {device.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white text-gray-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Device Actions */}
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  <p>Firmware: {device.firmware} • {device.connectivity}</p>
                  <p>Maintenance: {device.maintenanceDue.toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDeviceAction(device.id, 'configure')}
                    className="px-3 py-1 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg transition-colors"
                  >
                    Configure
                  </button>
                  <button
                    onClick={() => handleDeviceAction(device.id, 'maintenance')}
                    className="px-3 py-1 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg transition-colors"
                  >
                    Maintenance
                  </button>
                  <button
                    onClick={() => handleDeviceAction(device.id, 'locate')}
                    className="px-3 py-1 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg transition-colors"
                  >
                    Locate
                  </button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Device Management Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Device Management</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors">
            <Settings className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Firmware Update</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Health Check</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-lg transition-colors">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Maintenance</span>
          </button>
          <button className="flex items-center space-x-2 p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors">
            <MapPin className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Track All</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default PortableDevices

