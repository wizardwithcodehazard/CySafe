import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  Shield,
  BookOpen,
  MessageSquare,
  Activity,
  Calendar
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      title: 'Total Users',
      value: '12,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Learners',
      value: '8,234',
      change: '+8.2%',
      trend: 'up',
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      title: 'Crime Reports',
      value: '1,456',
      change: '-5.3%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'bg-red-500'
    },
    {
      title: 'Modules Completed',
      value: '23,891',
      change: '+15.7%',
      trend: 'up',
      icon: Shield,
      color: 'bg-purple-500'
    }
  ];

  const recentActivity = [
    {
      type: 'user',
      message: 'New user registration: Priya Sharma',
      time: '2 minutes ago',
      icon: Users
    },
    {
      type: 'content',
      message: 'Phishing module updated by Admin',
      time: '15 minutes ago',
      icon: FileText
    },
    {
      type: 'report',
      message: 'New cyber crime report submitted',
      time: '32 minutes ago',
      icon: AlertTriangle
    },
    {
      type: 'system',
      message: 'System backup completed successfully',
      time: '1 hour ago',
      icon: Activity
    }
  ];

  const topModules = [
    { name: 'Phishing Awareness', completions: 3247, rating: 4.8 },
    { name: 'Password Security', completions: 2891, rating: 4.7 },
    { name: 'Social Media Safety', completions: 2456, rating: 4.6 },
    { name: 'Online Shopping Security', completions: 1987, rating: 4.5 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600">Monitor your CyberSafe platform performance and user engagement</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`h-4 w-4 mr-1 ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                  <activity.icon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Modules */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Top Learning Modules</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topModules.map((module, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{module.name}</h3>
                  <p className="text-sm text-gray-500">{module.completions} completions</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{module.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white/20 backdrop-blur-sm p-4 rounded-lg hover:bg-white/30 transition-colors text-left">
            <FileText className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Create New Module</h3>
            <p className="text-sm text-blue-100">Add educational content</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm p-4 rounded-lg hover:bg-white/30 transition-colors text-left">
            <AlertTriangle className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Review Reports</h3>
            <p className="text-sm text-blue-100">Check pending reports</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm p-4 rounded-lg hover:bg-white/30 transition-colors text-left">
            <MessageSquare className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Send Announcement</h3>
            <p className="text-sm text-blue-100">Notify all users</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;