import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Calendar, TrendingUp, TrendingDown, BarChart3, Download, Filter } from 'lucide-react'

const HistoricalAnalysis = () => {
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedMetric, setSelectedMetric] = useState('pH')
  const [historicalData, setHistoricalData] = useState([])

  useEffect(() => {
    // Generate historical data based on time range
    const generateHistoricalData = () => {
      const data = []
      const now = new Date()
      let intervals, intervalMinutes

      switch (timeRange) {
        case '24h':
          intervals = 24
          intervalMinutes = 60
          break
        case '7d':
          intervals = 7
          intervalMinutes = 24 * 60
          break
        case '30d':
          intervals = 30
          intervalMinutes = 24 * 60
          break
        case '90d':
          intervals = 12
          intervalMinutes = 7 * 24 * 60
          break
        default:
          intervals = 7
          intervalMinutes = 24 * 60
      }

      for (let i = intervals; i >= 0; i--) {
        const date = new Date(now.getTime() - i * intervalMinutes * 60 * 1000)
        data.push({
          date: timeRange === '24h' 
            ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : date.toLocaleDateString([], { month: 'short', day: 'numeric' }),
          pH: 7.0 + (Math.random() - 0.5) * 0.8 + Math.sin(i * 0.5) * 0.3,
          turbidity: 0.5 + Math.random() * 2 + Math.sin(i * 0.3) * 0.5,
          temperature: 20 + Math.random() * 10 + Math.sin(i * 0.2) * 3,
          conductivity: 400 + Math.random() * 200 + Math.sin(i * 0.4) * 50,
          contamination_risk: Math.max(0, Math.min(100, 30 + Math.random() * 40 + Math.sin(i * 0.6) * 20)),
          outbreak_cases: Math.floor(Math.random() * 10)
        })
      }
      
      setHistoricalData(data)
    }

    generateHistoricalData()
  }, [timeRange])

  const timeRanges = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ]

  const metrics = [
    { value: 'pH', label: 'pH Level', color: '#3b82f6' },
    { value: 'turbidity', label: 'Turbidity', color: '#f59e0b' },
    { value: 'temperature', label: 'Temperature', color: '#ef4444' },
    { value: 'conductivity', label: 'Conductivity', color: '#8b5cf6' },
    { value: 'contamination_risk', label: 'Contamination Risk', color: '#10b981' }
  ]

  const selectedMetricData = metrics.find(m => m.value === selectedMetric)

  // Calculate trends
  const calculateTrend = (data, key) => {
    if (data.length < 2) return 0
    const first = data[0][key]
    const last = data[data.length - 1][key]
    return ((last - first) / first) * 100
  }

  const trend = calculateTrend(historicalData, selectedMetric)

  const getTrendIcon = (trend) => {
    return trend > 0 ? TrendingUp : TrendingDown
  }

  const getTrendColor = (trend) => {
    return trend > 0 ? 'text-red-600' : 'text-green-600'
  }

  const handleExport = () => {
    // Simulate data export
    console.log('Exporting historical data...')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Historical Analysis</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {metrics.map((metric) => (
              <option key={metric.value} value={metric.value}>
                {metric.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Trend Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Value</p>
              <p className="text-2xl font-bold text-gray-900">
                {historicalData[historicalData.length - 1]?.[selectedMetric]?.toFixed(2) || '0.00'}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Trend</p>
              <div className="flex items-center space-x-2">
                {React.createElement(getTrendIcon(trend), { className: `w-5 h-5 ${getTrendColor(trend)}` })}
                <span className={`text-lg font-bold ${getTrendColor(trend)}`}>
                  {Math.abs(trend).toFixed(1)}%
                </span>
              </div>
            </div>
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average</p>
              <p className="text-2xl font-bold text-gray-900">
                {(historicalData.reduce((sum, d) => sum + d[selectedMetric], 0) / historicalData.length).toFixed(2)}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="h-80 mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-4">
          {selectedMetricData?.label} Trend ({timeRanges.find(r => r.value === timeRange)?.label})
        </h4>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={historicalData}>
            <defs>
              <linearGradient id={`gradient-${selectedMetric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={selectedMetricData?.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={selectedMetricData?.color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
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
            <Area
              type="monotone"
              dataKey={selectedMetric}
              stroke={selectedMetricData?.color}
              strokeWidth={2}
              fill={`url(#gradient-${selectedMetric})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Outbreak Correlation */}
      <div className="h-64">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Contamination Risk vs Outbreak Cases</h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              yAxisId="left"
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
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
              yAxisId="left"
              type="monotone" 
              dataKey="contamination_risk" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Risk %"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="outbreak_cases" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              name="Cases"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Key Insights */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Key Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="text-sm font-semibold text-blue-900 mb-2">Peak Risk Periods</h5>
            <p className="text-sm text-blue-800">
              Highest contamination risk typically occurs between 2-4 PM, correlating with peak water usage.
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 className="text-sm font-semibold text-green-900 mb-2">Predictive Accuracy</h5>
            <p className="text-sm text-green-800">
              ML model shows 94.2% accuracy in predicting outbreaks 24-48 hours in advance.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HistoricalAnalysis
