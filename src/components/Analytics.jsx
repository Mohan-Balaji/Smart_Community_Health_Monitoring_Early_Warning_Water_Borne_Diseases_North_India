import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Brain, TrendingUp, Target, Activity } from 'lucide-react'

const Analytics = () => {
  const [predictionData, setPredictionData] = useState([])
  const [riskDistribution, setRiskDistribution] = useState([])

  useEffect(() => {
    // Simulate prediction data
    const mockPredictionData = [
      { zone: 'Zone A', risk: 15, cases: 2, population: 1200 },
      { zone: 'Zone B', risk: 45, cases: 8, population: 1800 },
      { zone: 'Zone C', risk: 78, cases: 15, population: 2100 },
      { zone: 'Zone D', risk: 25, cases: 3, population: 1500 },
      { zone: 'Zone E', risk: 60, cases: 12, population: 1900 }
    ]

    const mockRiskDistribution = [
      { name: 'Low Risk', value: 35, color: '#10b981' },
      { name: 'Medium Risk', value: 40, color: '#f59e0b' },
      { name: 'High Risk', value: 25, color: '#ef4444' }
    ]

    setPredictionData(mockPredictionData)
    setRiskDistribution(mockRiskDistribution)
  }, [])

  const mlMetrics = [
    {
      title: 'Model Accuracy',
      value: '94.2%',
      change: '+1.2%',
      icon: Brain,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Prediction Confidence',
      value: '87.5%',
      change: '+2.1%',
      icon: Target,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'False Positive Rate',
      value: '3.8%',
      change: '-0.5%',
      icon: TrendingUp,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">AI/ML Analytics</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">Model Active</span>
        </div>
      </div>

      {/* ML Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {mlMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`${metric.bgColor} rounded-lg p-4`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">{metric.title}</p>
                <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                <p className="text-xs text-green-600">{metric.change}</p>
              </div>
              <metric.icon className={`w-6 h-6 ${metric.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Risk Assessment Chart */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Outbreak Risk by Zone</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="zone" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                label={{ value: 'Risk %', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => [`${value}%`, 'Risk Level']}
              />
              <Bar 
                dataKey="risk" 
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Risk Distribution Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Risk Distribution</h4>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [`${value}%`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-4">Risk Legend</h4>
          <div className="space-y-3">
            {riskDistribution.map((item) => (
              <div key={item.name} className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.value}% of zones</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Model Status */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Python ML Model</p>
              <p className="text-xs text-gray-500">Last trained: 2 hours ago</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Processing: 45ms</p>
            <p className="text-xs text-gray-500">GPU: Tesla V100</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Analytics

