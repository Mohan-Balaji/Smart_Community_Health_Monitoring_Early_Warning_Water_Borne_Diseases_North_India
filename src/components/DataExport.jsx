import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, BarChart3, Calendar, Filter, Mail, Printer, Database } from 'lucide-react'

const DataExport = () => {
  const [selectedFormat, setSelectedFormat] = useState('csv')
  const [selectedData, setSelectedData] = useState([])
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [email, setEmail] = useState('')

  const exportFormats = [
    { value: 'csv', label: 'CSV', icon: FileText, description: 'Comma-separated values for Excel' },
    { value: 'json', label: 'JSON', icon: Database, description: 'Structured data format' },
    { value: 'pdf', label: 'PDF Report', icon: FileText, description: 'Formatted report with charts' },
    { value: 'excel', label: 'Excel', icon: BarChart3, description: 'Spreadsheet with multiple sheets' }
  ]

  const dataTypes = [
    { id: 'sensor_data', label: 'Sensor Data', description: 'pH, turbidity, temperature, conductivity' },
    { id: 'alerts', label: 'Alert History', description: 'All alerts and notifications' },
    { id: 'analytics', label: 'Analytics Data', description: 'ML predictions and risk assessments' },
    { id: 'user_activity', label: 'User Activity', description: 'Login logs and system usage' },
    { id: 'system_logs', label: 'System Logs', description: 'Performance and error logs' },
    { id: 'compliance', label: 'Compliance Reports', description: 'Regulatory compliance data' }
  ]

  const reportTemplates = [
    {
      id: 'daily_summary',
      title: 'Daily Summary Report',
      description: 'Overview of daily water quality metrics and alerts',
      icon: Calendar,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'weekly_analysis',
      title: 'Weekly Analysis Report',
      description: 'Trend analysis and pattern recognition',
      icon: BarChart3,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 'monthly_compliance',
      title: 'Monthly Compliance Report',
      description: 'Regulatory compliance and audit trail',
      icon: FileText,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'emergency_report',
      title: 'Emergency Response Report',
      description: 'Critical incidents and response actions',
      icon: Database,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    }
  ]

  const handleDataSelection = (dataId) => {
    setSelectedData(prev => 
      prev.includes(dataId) 
        ? prev.filter(id => id !== dataId)
        : [...prev, dataId]
    )
  }

  const handleExport = () => {
    console.log('Exporting data:', {
      format: selectedFormat,
      data: selectedData,
      dateRange,
      email
    })
  }

  const handleScheduleReport = () => {
    console.log('Scheduling report:', {
      template: 'daily_summary',
      frequency: 'daily',
      email
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
            <Download className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Data Export & Reports</h3>
            <p className="text-sm text-gray-500">Export data and generate reports</p>
          </div>
        </div>
      </div>

      {/* Export Format Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Export Format</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {exportFormats.map((format) => (
            <motion.button
              key={format.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedFormat(format.value)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedFormat === format.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <format.icon className={`w-6 h-6 mx-auto mb-2 ${
                selectedFormat === format.value ? 'text-primary-600' : 'text-gray-500'
              }`} />
              <h5 className="text-sm font-semibold text-gray-900 mb-1">{format.label}</h5>
              <p className="text-xs text-gray-500">{format.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Data Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Select Data to Export</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dataTypes.map((dataType) => (
            <motion.label
              key={dataType.id}
              whileHover={{ scale: 1.01 }}
              className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                selectedData.includes(dataType.id)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedData.includes(dataType.id)}
                onChange={() => handleDataSelection(dataType.id)}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <div className="flex-1">
                <h5 className="text-sm font-semibold text-gray-900">{dataType.label}</h5>
                <p className="text-xs text-gray-500">{dataType.description}</p>
              </div>
            </motion.label>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Date Range</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Email Notification */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Email Notification (Optional)</h4>
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-gray-400" />
          <input
            type="email"
            placeholder="Enter email address for notification"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Export Actions */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <button
          onClick={handleExport}
          disabled={selectedData.length === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Export Data</span>
        </button>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print Report</span>
        </button>
      </div>

      {/* Report Templates */}
      <div className="pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Quick Report Templates</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTemplates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.02 }}
              className={`${template.bgColor} border border-gray-200 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <template.icon className={`w-6 h-6 ${template.color}`} />
                <h5 className="text-sm font-semibold text-gray-900">{template.title}</h5>
              </div>
              <p className="text-xs text-gray-600 mb-4">{template.description}</p>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg transition-colors">
                  <Download className="w-3 h-3" />
                  <span>Generate</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 bg-white hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg transition-colors">
                  <Calendar className="w-3 h-3" />
                  <span>Schedule</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Export History */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Recent Exports</h4>
        <div className="space-y-3">
          {[
            { name: 'Daily Summary Report', date: '2024-01-15', format: 'PDF', size: '2.3 MB' },
            { name: 'Sensor Data Export', date: '2024-01-14', format: 'CSV', size: '1.8 MB' },
            { name: 'Alert History', date: '2024-01-13', format: 'Excel', size: '945 KB' }
          ].map((export_, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{export_.name}</p>
                  <p className="text-xs text-gray-500">{export_.date} • {export_.format} • {export_.size}</p>
                </div>
              </div>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default DataExport
