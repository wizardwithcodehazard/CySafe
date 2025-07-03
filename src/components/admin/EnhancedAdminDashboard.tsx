import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  Shield,
  Activity,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download
} from 'lucide-react';
import { AnalyticsService } from '../../lib/database';

interface DashboardStats {
  totalCrimes: number;
  totalReports: number;
  pendingReports: number;
  resolvedReports: number;
}

interface RecentActivity {
  id: string;
  action: string;
  resource_type: string;
  timestamp: string;
  admin_email?: string;
}

const EnhancedAdminDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [stats, setStats] = useState<DashboardStats>({
    totalCrimes: 0,
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const [statsResult, activityResult] = await Promise.all([
        AnalyticsService.getDashboardStats(),
        AnalyticsService.getRecentActivity(10)
      ]);
      
      if (statsResult.error) {
        setError(statsResult.error);
      } else {
        setStats({
          totalCrimes: statsResult.totalCrimes,
          totalReports: statsResult.totalReports,
          pendingReports: statsResult.pendingReports,
          resolvedReports: statsResult.resolvedReports
        });
      }
      
      if (activityResult.error) {
        console.error('Failed to load activity:', activityResult.error);
      } else {
        setRecentActivity(activityResult.data);
      }
      
    } catch (error) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardMetrics = [
    {
      title: 'Total Cyber Crimes',
      value: stats.totalCrimes.toLocaleString(),
      change: '+12.5%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'bg-red-500',
      description: 'Documented crime types'
    },
    {
      title: 'User Reports',
      value: stats.totalReports.toLocaleString(),
      change: '+8.2%',
      trend: 'up',
      icon: FileText,
      color: 'bg-blue-500',
      description: 'Total reports received'
    },
    {
      title: 'Pending Reports',
      value: stats.pendingReports.toLocaleString(),
      change: '-5.3%',
      trend: 'down',
      icon: Clock,
      color: 'bg-orange-500',
      description: 'Awaiting review'
    },
    {
      title: 'Resolved Cases',
      value: stats.resolvedReports.toLocaleString(),
      change: '+15.7%',
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-green-500',
      description: 'Successfully resolved'
    }
  ];

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create': return <FileText className="h-4 w-4 text-green-600" />;
      case 'update': return <Edit className="h-4 w-4 text-blue-600" />;
      case 'delete': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'view': return <Eye className="h-4 w-4 text-gray-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 text-red-800">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-medium">Error Loading Dashboard</span>
        </div>
        <p className="text-red-700 mt-2">{error}</p>
        <button
          onClick={loadDashboardData}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Security Dashboard</h1>
          <p className="text-gray-600">Real-time monitoring and analytics for CyberSafe platform</p>
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
          <button
            onClick={loadDashboardData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Activity className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Security Status Banner */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">System Security Status</h2>
            <p className="text-green-100">All systems operational • Last security scan: 2 hours ago</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-sm text-green-100">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-green-100">Threats</div>
            </div>
            <Shield className="h-12 w-12 text-green-200" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
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
              <div className={`${metric.color} p-3 rounded-lg`}>
                <metric.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Admin Activity</h2>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    {getActionIcon(activity.action)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.action}</span> on{' '}
                      <span className="font-medium">{activity.resource_type}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      by {activity.admin_email} • {formatTimestamp(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">System Health</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-gray-900">Database</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Operational</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-gray-900">Authentication</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Secure</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-gray-900">API Services</span>
              </div>
              <span className="text-sm text-green-600 font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-gray-900">Backup System</span>
              </div>
              <span className="text-sm text-yellow-600 font-medium">Scheduled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Quick Security Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-white/20 backdrop-blur-sm p-4 rounded-lg hover:bg-white/30 transition-colors text-left">
            <FileText className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Generate Report</h3>
            <p className="text-sm text-blue-100">Security analytics</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm p-4 rounded-lg hover:bg-white/30 transition-colors text-left">
            <AlertTriangle className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Review Alerts</h3>
            <p className="text-sm text-blue-100">Check pending issues</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm p-4 rounded-lg hover:bg-white/30 transition-colors text-left">
            <Users className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">User Management</h3>
            <p className="text-sm text-blue-100">Manage access</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm p-4 rounded-lg hover:bg-white/30 transition-colors text-left">
            <Download className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Export Data</h3>
            <p className="text-sm text-blue-100">Download reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;