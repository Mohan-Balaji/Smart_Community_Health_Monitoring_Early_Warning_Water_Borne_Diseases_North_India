import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Shield, Eye, Edit, Trash2, Plus, Search, Filter } from 'lucide-react'

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@health.gov',
      role: 'admin',
      department: 'Health Department',
      lastActive: '2 minutes ago',
      status: 'active',
      permissions: ['dashboard', 'alerts', 'analytics', 'users', 'settings']
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike.chen@field.gov',
      role: 'field_worker',
      department: 'Field Operations',
      lastActive: '15 minutes ago',
      status: 'active',
      permissions: ['dashboard', 'alerts', 'mobile_app']
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@research.gov',
      role: 'analyst',
      department: 'Research & Analytics',
      lastActive: '1 hour ago',
      status: 'active',
      permissions: ['dashboard', 'analytics', 'reports']
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james.wilson@emergency.gov',
      role: 'emergency_responder',
      department: 'Emergency Services',
      lastActive: '30 minutes ago',
      status: 'active',
      permissions: ['dashboard', 'alerts', 'emergency_response']
    },
    {
      id: 5,
      name: 'Lisa Park',
      email: 'lisa.park@community.gov',
      role: 'community_worker',
      department: 'Community Outreach',
      lastActive: '2 hours ago',
      status: 'inactive',
      permissions: ['dashboard', 'mobile_app', 'community_reports']
    }
  ])

  const roles = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Administrator' },
    { value: 'field_worker', label: 'Field Worker' },
    { value: 'analyst', label: 'Data Analyst' },
    { value: 'emergency_responder', label: 'Emergency Responder' },
    { value: 'community_worker', label: 'Community Worker' }
  ]

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200'
      case 'field_worker': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'analyst': return 'bg-green-100 text-green-800 border-green-200'
      case 'emergency_responder': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'community_worker': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800'
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  const handleEditUser = (userId) => {
    console.log('Edit user:', userId)
  }

  const handleViewUser = (userId) => {
    console.log('View user:', userId)
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
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
            <p className="text-sm text-gray-500">Manage system access and permissions</p>
          </div>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800">Total Users</p>
              <p className="text-2xl font-bold text-blue-900">{users.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Active Users</p>
              <p className="text-2xl font-bold text-green-900">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-800">Admins</p>
              <p className="text-2xl font-bold text-orange-900">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-800">Field Workers</p>
              <p className="text-2xl font-bold text-purple-900">
                {users.filter(u => u.role === 'field_worker').length}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="space-y-4">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500">{user.department}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                      {user.role.replace('_', ' ')}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Last active: {user.lastActive}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewUser(user.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditUser(user.id)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit User"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete User"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-700 mb-2">Permissions:</p>
              <div className="flex flex-wrap gap-1">
                {user.permissions.map((permission) => (
                  <span
                    key={permission}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    {permission.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Role Permissions Overview */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Role Permissions Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.slice(1).map((role) => (
            <div key={role.value} className="bg-gray-50 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-gray-900 mb-2">{role.label}</h5>
              <div className="space-y-1">
                {role.value === 'admin' && (
                  <>
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-xs text-gray-600">Full system access</span>
                  </>
                )}
                {role.value === 'field_worker' && (
                  <>
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-xs text-gray-600">Dashboard, alerts, mobile app</span>
                  </>
                )}
                {role.value === 'analyst' && (
                  <>
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-xs text-gray-600">Analytics and reporting</span>
                  </>
                )}
                {role.value === 'emergency_responder' && (
                  <>
                    <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    <span className="text-xs text-gray-600">Emergency response tools</span>
                  </>
                )}
                {role.value === 'community_worker' && (
                  <>
                    <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    <span className="text-xs text-gray-600">Community outreach tools</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default UserManagement

