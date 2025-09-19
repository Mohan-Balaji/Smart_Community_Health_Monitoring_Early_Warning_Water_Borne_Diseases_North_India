import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Droplets, AlertTriangle, CheckCircle, Clock, Users } from 'lucide-react'

const WaterSourceMap = () => {
  const [selectedZone, setSelectedZone] = useState('Zone A')
  
  const waterSources = [
    {
      id: 'A',
      name: 'Zone A',
      location: 'North District',
      status: 'good',
      population: 1200,
      lastTested: '2 hours ago',
      riskLevel: 15,
      coordinates: { x: 20, y: 30 },
      sources: ['Well A1', 'Well A2', 'Treatment Plant A']
    },
    {
      id: 'B',
      name: 'Zone B',
      location: 'Central District',
      status: 'critical',
      population: 1800,
      lastTested: '30 minutes ago',
      riskLevel: 78,
      coordinates: { x: 50, y: 40 },
      sources: ['Well B1', 'Treatment Plant B', 'Reservoir B']
    },
    {
      id: 'C',
      name: 'Zone C',
      location: 'South District',
      status: 'warning',
      population: 2100,
      lastTested: '1 hour ago',
      riskLevel: 45,
      coordinates: { x: 30, y: 70 },
      sources: ['Well C1', 'Well C2', 'Treatment Plant C']
    },
    {
      id: 'D',
      name: 'Zone D',
      location: 'East District',
      status: 'good',
      population: 1500,
      lastTested: '3 hours ago',
      riskLevel: 25,
      coordinates: { x: 70, y: 50 },
      sources: ['Well D1', 'Reservoir D']
    },
    {
      id: 'E',
      name: 'Zone E',
      location: 'West District',
      status: 'warning',
      population: 1900,
      lastTested: '45 minutes ago',
      riskLevel: 60,
      coordinates: { x: 10, y: 60 },
      sources: ['Well E1', 'Well E2', 'Treatment Plant E']
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return { bg: 'bg-green-500', border: 'border-green-200', text: 'text-green-800' }
      case 'warning': return { bg: 'bg-yellow-500', border: 'border-yellow-200', text: 'text-yellow-800' }
      case 'critical': return { bg: 'bg-red-500', border: 'border-red-200', text: 'text-red-800' }
      default: return { bg: 'bg-gray-500', border: 'border-gray-200', text: 'text-gray-800' }
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good': return CheckCircle
      case 'warning': return AlertTriangle
      case 'critical': return AlertTriangle
      default: return Droplets
    }
  }

  const selectedSource = waterSources.find(source => source.name === selectedZone)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Water Source Map</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Live Tracking</span>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 mb-6 h-64 border border-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <MapPin className="w-12 h-12 mx-auto mb-2" />
            <p className="text-sm">Interactive Map View</p>
            <p className="text-xs">Click zones for details</p>
          </div>
        </div>
        
        {/* Zone Markers */}
        {waterSources.map((source) => {
          const colors = getStatusColor(source.status)
          const Icon = getStatusIcon(source.status)
          
          return (
            <motion.button
              key={source.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedZone(source.name)}
              className={`absolute w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center border-2 border-white shadow-lg ${
                selectedZone === source.name ? 'ring-2 ring-primary-500' : ''
              }`}
              style={{
                left: `${source.coordinates.x}%`,
                top: `${source.coordinates.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <Icon className="w-4 h-4 text-white" />
            </motion.button>
          )
        })}
      </div>

      {/* Zone Details */}
      {selectedSource && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${getStatusColor(selectedSource.status).bg} rounded-lg flex items-center justify-center`}>
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{selectedSource.name}</h4>
                <p className="text-sm text-gray-600">{selectedSource.location}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{selectedSource.riskLevel}%</p>
              <p className="text-xs text-gray-500">Risk Level</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">{selectedSource.population.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Population</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">{selectedSource.lastTested}</p>
                <p className="text-xs text-gray-500">Last Tested</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Water Sources:</p>
            <div className="flex flex-wrap gap-2">
              {selectedSource.sources.map((source, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {source}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Zone Status Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {waterSources.map((source) => {
          const colors = getStatusColor(source.status)
          const Icon = getStatusIcon(source.status)
          
          return (
            <motion.button
              key={source.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedZone(source.name)}
              className={`p-3 rounded-lg border ${colors.border} ${
                selectedZone === source.name ? 'ring-2 ring-primary-500' : ''
              } transition-all`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Icon className={`w-4 h-4 ${colors.text}`} />
                <span className="text-sm font-medium text-gray-900">{source.name}</span>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{source.riskLevel}%</p>
                <p className="text-xs text-gray-500">Risk</p>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Status Legend</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Good (0-30%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Warning (31-70%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Critical (71-100%)</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WaterSourceMap
