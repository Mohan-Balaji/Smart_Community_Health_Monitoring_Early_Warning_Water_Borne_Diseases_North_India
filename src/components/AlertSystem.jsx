import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle, XCircle, Clock, MapPin, Bell } from 'lucide-react'

const AlertSystem = () => {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    // Simulate alerts
    const mockAlerts = [
      {
        id: 1,
        type: 'warning',
        title: 'High Turbidity Detected',
        message: 'Turbidity levels above normal range in Zone A',
        location: 'Water Source A',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        severity: 'medium',
        status: 'active'
      },
      {
        id: 2,
        type: 'danger',
        title: 'pH Level Critical',
        message: 'pH dropped to 6.2 - immediate attention required',
        location: 'Treatment Plant B',
        timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
        severity: 'high',
        status: 'active'
      },
      {
        id: 3,
        type: 'info',
        title: 'Outbreak Risk Predicted',
        message: 'AI model predicts 78% probability of contamination',
        location: 'Distribution Network C',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        severity: 'medium',
        status: 'investigating'
      },
      {
        id: 4,
        type: 'success',
        title: 'Alert Resolved',
        message: 'Temperature anomaly resolved - system back to normal',
        location: 'Sensor Station D',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        severity: 'low',
        status: 'resolved'
      }
    ]

    setAlerts(mockAlerts)
  }, [])

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return AlertTriangle
      case 'danger': return XCircle
      case 'success': return CheckCircle
      default: return Bell
    }
  }

  const getAlertColors = (type, severity) => {
    const baseColors = {
      warning: 'border-yellow-200 bg-yellow-50',
      danger: 'border-red-200 bg-red-50',
      success: 'border-green-200 bg-green-50',
      info: 'border-blue-200 bg-blue-50'
    }

    const iconColors = {
      warning: 'text-yellow-600',
      danger: 'text-red-600',
      success: 'text-green-600',
      info: 'text-blue-600'
    }

    return {
      container: baseColors[type] || baseColors.info,
      icon: iconColors[type] || iconColors.info
    }
  }

  const getSeverityBadge = (severity) => {
    const badges = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    }
    return badges[severity] || badges.low
  }

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-red-100 text-red-800',
      investigating: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800'
    }
    return badges[status] || badges.active
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

  const handleDismissAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Alert System</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">3 Active</span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {alerts.map((alert) => {
            const Icon = getAlertIcon(alert.type)
            const colors = getAlertColors(alert.type, alert.severity)
            
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`border rounded-lg p-4 ${colors.container}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 rounded-lg ${colors.container}`}>
                      <Icon className={`w-5 h-5 ${colors.icon}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">
                          {alert.title}
                        </h4>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityBadge(alert.severity)}`}>
                          {alert.severity}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(alert.status)}`}>
                          {alert.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        {alert.message}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimeAgo(alert.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {alert.status !== 'resolved' && (
                    <button
                      onClick={() => handleDismissAlert(alert.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Alert Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Auto-notifications enabled</span>
          </div>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View All Alerts
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default AlertSystem

