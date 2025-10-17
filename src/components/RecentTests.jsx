import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TestTube, Clock, MapPin, User, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Filter, Search } from 'lucide-react'

const RecentTests = () => {
  const [tests, setTests] = useState([])
  const [selectedTest, setSelectedTest] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Simulate recent test data
    const mockTests = [
      {
        id: 1,
        testId: 'WT-2024-001',
        location: 'Zone A - Well A1',
        tester: 'Dr. Sarah Johnson',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        status: 'completed',
        results: {
          turbidity: { value: 1.2, unit: 'NTU', status: 'warning', threshold: 1.0 },
          pH: { value: 7.1, unit: '', status: 'good', threshold: 6.5 },
          temperature: { value: 24.5, unit: '°C', status: 'good', threshold: 25.0 },
          conductivity: { value: 450, unit: 'μS/cm', status: 'good', threshold: 500 }
        },
        device: 'Portable Tester PT-001',
        notes: 'Slight increase in turbidity detected. Recommend re-testing in 2 hours.'
      },
      {
        id: 2,
        testId: 'WT-2024-002',
        location: 'Zone B - Treatment Plant B',
        tester: 'Mike Chen',
        timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
        status: 'critical',
        results: {
          turbidity: { value: 3.8, unit: 'NTU', status: 'critical', threshold: 1.0 },
          pH: { value: 6.2, unit: '', status: 'critical', threshold: 6.5 },
          temperature: { value: 26.8, unit: '°C', status: 'warning', threshold: 25.0 },
          conductivity: { value: 680, unit: 'μS/cm', status: 'warning', threshold: 500 }
        },
        device: 'Portable Tester PT-002',
        notes: 'CRITICAL: High turbidity and low pH detected. Immediate action required.'
      },
      {
        id: 3,
        testId: 'WT-2024-003',
        location: 'Zone C - Reservoir C',
        tester: 'Dr. Emily Rodriguez',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        status: 'completed',
        results: {
          turbidity: { value: 0.8, unit: 'NTU', status: 'good', threshold: 1.0 },
          pH: { value: 7.3, unit: '', status: 'good', threshold: 6.5 },
          temperature: { value: 22.1, unit: '°C', status: 'good', threshold: 25.0 },
          conductivity: { value: 380, unit: 'μS/cm', status: 'good', threshold: 500 }
        },
        device: 'Portable Tester PT-003',
        notes: 'All parameters within normal range. Water quality excellent.'
      },
      {
        id: 4,
        testId: 'WT-2024-004',
        location: 'Zone D - Well D1',
        tester: 'James Wilson',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        status: 'completed',
        results: {
          turbidity: { value: 1.5, unit: 'NTU', status: 'warning', threshold: 1.0 },
          pH: { value: 6.8, unit: '', status: 'good', threshold: 6.5 },
          temperature: { value: 23.2, unit: '°C', status: 'good', threshold: 25.0 },
          conductivity: { value: 420, unit: 'μS/cm', status: 'good', threshold: 500 }
        },
        device: 'Portable Tester PT-004',
        notes: 'Turbidity slightly elevated but within acceptable range for treatment.'
      },
      {
        id: 5,
        testId: 'WT-2024-005',
        location: 'Zone E - Treatment Plant E',
        tester: 'Lisa Park',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        status: 'completed',
        results: {
          turbidity: { value: 0.6, unit: 'NTU', status: 'good', threshold: 1.0 },
          pH: { value: 7.0, unit: '', status: 'good', threshold: 6.5 },
          temperature: { value: 21.8, unit: '°C', status: 'good', threshold: 25.0 },
          conductivity: { value: 395, unit: 'μS/cm', status: 'good', threshold: 500 }
        },
        device: 'Portable Tester PT-005',
        notes: 'Optimal water quality parameters. No concerns detected.'
      }
    ]

    setTests(mockTests)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100 border-green-200'
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'critical': return 'text-red-600 bg-red-100 border-red-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getTestStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'critical': return 'text-red-600 bg-red-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
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

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.testId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.tester.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || test.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleViewTest = (test) => {
    setSelectedTest(test)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <TestTube className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Water Quality Tests</h3>
            <p className="text-sm text-gray-500">Latest test results and turbidity monitoring</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">{tests.length} Tests</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tests by ID, location, or tester..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="critical">Critical</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Test Results Grid */}
      <div className="space-y-4">
        {filteredTests.map((test, index) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
            onClick={() => handleViewTest(test)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TestTube className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{test.testId}</h4>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{test.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{test.tester}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeAgo(test.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTestStatusColor(test.status)}`}>
                  {test.status}
                </span>
                <span className="text-xs text-gray-500">{test.device}</span>
              </div>
            </div>

            {/* Test Results */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(test.results).map(([parameter, data]) => (
                <div key={parameter} className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-600 uppercase">{parameter}</span>
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(data.status)}`}>
                      {data.status}
                    </span>
                  </div>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-lg font-bold text-gray-900">{data.value}</span>
                    <span className="text-xs text-gray-500">{data.unit}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Threshold: {data.threshold}{data.unit}
                  </div>
                </div>
              ))}
            </div>

            {/* Notes */}
            {test.notes && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">{test.notes}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Test Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Test Summary</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{tests.length}</p>
            <p className="text-xs text-gray-500">Total Tests</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {tests.filter(t => t.status === 'completed').length}
            </p>
            <p className="text-xs text-gray-500">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {tests.filter(t => t.status === 'critical').length}
            </p>
            <p className="text-xs text-gray-500">Critical</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {tests.filter(t => t.results.turbidity.status === 'warning' || t.results.turbidity.status === 'critical').length}
            </p>
            <p className="text-xs text-gray-500">Turbidity Issues</p>
          </div>
        </div>
      </div>

      {/* Test Detail Modal */}
      {selectedTest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Test Details - {selectedTest.testId}</h3>
              <button
                onClick={() => setSelectedTest(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Location</p>
                  <p className="text-sm text-gray-900">{selectedTest.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Tester</p>
                  <p className="text-sm text-gray-900">{selectedTest.tester}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Device</p>
                  <p className="text-sm text-gray-900">{selectedTest.device}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Timestamp</p>
                  <p className="text-sm text-gray-900">{selectedTest.timestamp.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Test Results</p>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selectedTest.results).map(([parameter, data]) => (
                    <div key={parameter} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 capitalize">{parameter}</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(data.status)}`}>
                          {data.status}
                        </span>
                      </div>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-xl font-bold text-gray-900">{data.value}</span>
                        <span className="text-sm text-gray-500">{data.unit}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Threshold: {data.threshold}{data.unit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedTest.notes && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Notes</p>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{selectedTest.notes}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default RecentTests

