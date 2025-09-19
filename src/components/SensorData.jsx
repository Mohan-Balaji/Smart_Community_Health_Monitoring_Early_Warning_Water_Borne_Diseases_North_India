import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Thermometer, Droplets, Zap, Gauge } from 'lucide-react'

const SensorData = () => {
  const [sensorData, setSensorData] = useState([])
  const [selectedSensor, setSelectedSensor] = useState('pH')

  // Simulate real-time data
  useEffect(() => {
    const generateData = () => {
      const now = new Date()
      const data = []
      
      for (let i = 11; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 5 * 60 * 1000) // 5-minute intervals
        data.push({
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          pH: 7.0 + (Math.random() - 0.5) * 0.8,
          turbidity: 0.5 + Math.random() * 2,
          temperature: 20 + Math.random() * 10,
          conductivity: 400 + Math.random() * 200
        })
      }
      
      setSensorData(data)
    }

    generateData()
    const interval = setInterval(generateData, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const sensors = [
    {
      name: 'pH',
      value: sensorData[sensorData.length - 1]?.pH?.toFixed(2) || '7.2',
      unit: '',
      status: 'good',
      icon: Droplets,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      name: 'Turbidity',
      value: sensorData[sensorData.length - 1]?.turbidity?.toFixed(1) || '1.2',
      unit: 'NTU',
      status: 'warning',
      icon: Gauge,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      name: 'Temperature',
      value: sensorData[sensorData.length - 1]?.temperature?.toFixed(1) || '24.5',
      unit: '°C',
      status: 'good',
      icon: Thermometer,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      name: 'Conductivity',
      value: sensorData[sensorData.length - 1]?.conductivity?.toFixed(0) || '450',
      unit: 'μS/cm',
      status: 'good',
      icon: Zap,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'danger': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Real-time Sensor Data</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Live</span>
        </div>
      </div>

      {/* Sensor Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {sensors.map((sensor) => (
          <motion.div
            key={sensor.name}
            whileHover={{ scale: 1.02 }}
            className={`${sensor.bgColor} ${sensor.borderColor} border rounded-lg p-4 cursor-pointer transition-all ${
              selectedSensor === sensor.name ? 'ring-2 ring-primary-500' : ''
            }`}
            onClick={() => setSelectedSensor(sensor.name)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{sensor.name}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sensor.value}
                  <span className="text-sm font-normal text-gray-500 ml-1">{sensor.unit}</span>
                </p>
              </div>
              <sensor.icon className={`w-6 h-6 ${sensor.color}`} />
            </div>
            <div className="mt-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sensor.status)}`}>
                {sensor.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-64">
        <h4 className="text-sm font-medium text-gray-700 mb-4">
          {selectedSensor} Trend (Last Hour)
        </h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sensorData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey={selectedSensor.toLowerCase()} 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* IoT Status */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Arduino UNO + ESP8266</p>
              <p className="text-xs text-gray-500">Connected via Wi-Fi</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Signal: -45 dBm</p>
            <p className="text-xs text-gray-500">Uptime: 99.8%</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SensorData
