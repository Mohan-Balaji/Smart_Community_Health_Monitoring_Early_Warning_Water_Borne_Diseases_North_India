import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SensorData from './SensorData'
import AlertSystem from './AlertSystem'
import Analytics from './Analytics'
import SystemStatus from './SystemStatus'
import EmergencyResponse from './EmergencyResponse'
import WaterSourceMap from './WaterSourceMap'
import HistoricalAnalysis from './HistoricalAnalysis'
import UserManagement from './UserManagement'
import DataExport from './DataExport'
import RecentTests from './RecentTests'
import PortableDevices from './PortableDevices'
import { Activity, AlertTriangle, TrendingUp, Wifi } from 'lucide-react'

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      title: 'Active Sensors',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: Activity,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Alerts',
      value: '3',
      change: '-1',
      changeType: 'negative',
      icon: AlertTriangle,
      color: 'bg-red-500'
    },
    {
      title: 'Prediction Accuracy',
      value: '94.2%',
      change: '+1.2%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'IoT Connectivity',
      value: '100%',
      change: '0%',
      changeType: 'neutral',
      icon: Wifi,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600">
            Real-time water quality monitoring and outbreak prediction
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="text-lg font-mono text-gray-900">
            {currentTime.toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card card-hover"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' :
                    stat.changeType === 'negative' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last hour</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sensor Data - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <SensorData />
        </div>
        
        {/* Alert System - Takes 1 column */}
        <div>
          <AlertSystem />
        </div>
      </div>

      {/* Recent Tests and Portable Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTests />
        <PortableDevices />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Analytics />
        <SystemStatus />
      </div>

      {/* Emergency Response Section */}
      <EmergencyResponse />

      {/* Water Source Mapping */}
      <WaterSourceMap />

      {/* Historical Analysis */}
      <HistoricalAnalysis />

      {/* User Management */}
      <UserManagement />

      {/* Data Export & Reports */}
      <DataExport />
    </div>
  )
}

export default Dashboard
