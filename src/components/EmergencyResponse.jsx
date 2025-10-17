import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Phone, MapPin, Users, Clock, Shield, Zap } from 'lucide-react'

const EmergencyResponse = () => {
  const [emergencyLevel, setEmergencyLevel] = useState('high')
  
  const emergencyActions = [
    {
      id: 1,
      title: 'Immediate Water Shutoff',
      description: 'Shut down contaminated water sources immediately',
      priority: 'critical',
      estimatedTime: '2-5 minutes',
      icon: Zap,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 2,
      title: 'Alert Health Authorities',
      description: 'Notify local health department and emergency services',
      priority: 'critical',
      estimatedTime: '1-2 minutes',
      icon: Phone,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 3,
      title: 'Evacuate Affected Areas',
      description: 'Coordinate with local authorities for area evacuation',
      priority: 'high',
      estimatedTime: '15-30 minutes',
      icon: Users,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 4,
      title: 'Deploy Emergency Water',
      description: 'Activate backup water supply and distribution',
      priority: 'high',
      estimatedTime: '10-20 minutes',
      icon: Shield,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleExecuteAction = (actionId) => {
    // Simulate action execution
    console.log(`Executing action ${actionId}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Emergency Response</h3>
            <p className="text-sm text-gray-500">Critical action protocols</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-red-600">ACTIVE ALERT</span>
        </div>
      </div>

      {/* Emergency Level Indicator */}
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-red-900">Emergency Level: HIGH</h4>
            <p className="text-sm text-red-700">Contamination detected in Zone B - Immediate action required</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-red-600">Detected: 2 minutes ago</p>
            <p className="text-xs text-red-500">Location: Water Treatment Plant B</p>
          </div>
        </div>
      </div>

      {/* Emergency Actions */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Required Actions</h4>
        {emergencyActions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${action.bgColor} ${action.borderColor} border rounded-lg p-4`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${action.bgColor}`}>
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="text-sm font-semibold text-gray-900">{action.title}</h5>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(action.priority)}`}>
                      {action.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{action.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>ETA: {action.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>Zone B</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleExecuteAction(action.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Execute
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Emergency Contacts */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Emergency Contacts</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Phone className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Health Department</p>
              <p className="text-xs text-gray-500">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Users className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Emergency Services</p>
              <p className="text-xs text-gray-500">911</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EmergencyResponse

