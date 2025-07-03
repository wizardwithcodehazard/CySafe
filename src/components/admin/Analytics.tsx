import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  AlertTriangle, 
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('users');

  const metrics = [
    {
      id: 'users',
      name: 'User Growth',
      value: '12,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      id: 'engagement',
      name: 'Engagement Rate',
      value: '68.4%',
      change: '+5.2%',
      trend: 'up',
      icon: Activity,
      color: 'green'
    },
    {
      id: 'completion',
      name: 'Module Completion',
      value: '23,891',
      change: '+15.7%',
      trend: 'up',
      icon: BookOpen,
      color: 'purple'
    },
    {
      id: 'reports',
      name: 'Crime Reports',
      value: '1,456',
      change: '-5.3%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  const topModules = [
    { name: 'Phishing Awareness', completions: 3247, engagement: 89 },
    { name: 'Password Security', completions: 2891, engagement: 85 },
    { name: 'Social Media Safety', completions: 2456, engagement: 82 },
    { name: 'Online Shopping Security', completions: 1987, engagement: 78 },
    { name: 'Identity Protection', completions: 1654, engagement: 75 }
  ];

  const userDemographics = [
    { age: '18-25', percentage: 28, count: 3597 },
    { age: '26-35', percentage: 35, count: 4496 },
    { age: '36-45', percentage: 22, count: 2826 },
    { age: '46-55', percentage: 10, count: 1285 },
    { age: '55+', percentage: 5, count: 643 }
  ];

  const recentTrends = [
    {
      title: 'Phishing Attacks Awareness',
      description: 'Increased interest in phishing protection modules',
      change: '+23%',
      period: 'Last 7 days'
    },
    {
      title: 'Mobile Security Concerns',
      description: 'Growing queries about mobile app security',
      change: '+18%',
      period: 'Last 14 days'
    },
    {
      title: 'Financial Fraud Reports',
      description: 'Spike in online banking fraud reports',
      change: '+31%',
      period: 'Last 30 days'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track performance metrics and user engagement</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer ${
              selectedMetric === metric.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedMetric(metric.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.name}</p>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`h-4 w-4 mr-1 ${
                    metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className={`bg-${metric.color}-100 p-3 rounded-lg`}>
                <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">User Growth Trend</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Chart visualization would be implemented here</p>
              <p className="text-sm text-gray-400">Using libraries like Chart.js or D3.js</p>
            </div>
          </div>
        </div>

        {/* Top Performing Modules */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Top Learning Modules</h2>
            <Target className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topModules.map((module, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{module.name}</h3>
                  <p className="text-sm text-gray-500">{module.completions} completions</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{module.engagement}%</div>
                  <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${module.engagement}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Demographics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">User Demographics</h2>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {userDemographics.map((demo, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-600 rounded" style={{ 
                    backgroundColor: `hsl(${220 + index * 30}, 70%, ${60 - index * 5}%)` 
                  }}></div>
                  <span className="font-medium text-gray-900">{demo.age} years</span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{demo.percentage}%</div>
                  <div className="text-sm text-gray-500">{demo.count.toLocaleString()} users</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Trends */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Trending Topics</h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentTrends.map((trend, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{trend.title}</h3>
                  <span className="text-sm font-medium text-green-600">{trend.change}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{trend.description}</p>
                <p className="text-xs text-gray-500">{trend.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Export Analytics</h2>
        <p className="text-blue-100 mb-6">
          Generate detailed reports for stakeholders and compliance requirements.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white/20 backdrop-blur-sm p-4 rounded-lg hover:bg-white/30 transition-colors text-left">
            <Download className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">User Report</h3>
            <p className="text-sm text-blue-100">Detailed user analytics</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm p-4 rounded-lg hover:bg-white/30 transition-colors text-left">
            <BarChart3 className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Engagement Report</h3>
            <p className="text-sm text-blue-100">Module performance data</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm p-4 rounded-lg hover:bg-white/30 transition-colors text-left">
            <AlertTriangle className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Security Report</h3>
            <p className="text-sm text-blue-100">Crime reporting statistics</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;