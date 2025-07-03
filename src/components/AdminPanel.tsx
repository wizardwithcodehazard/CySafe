import React, { useState, useEffect } from 'react';
import SecureAdminLogin from './admin/SecureAdminLogin';
import AdminLayout from './admin/AdminLayout';
import EnhancedAdminDashboard from './admin/EnhancedAdminDashboard';
import EnhancedContentManagement from './admin/EnhancedContentManagement';
import UserManagement from './admin/UserManagement';
import Analytics from './admin/Analytics';

interface AdminPanelProps {
  onBackToWebsite?: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToWebsite }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on component mount
    const token = localStorage.getItem('admin_session_token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token));
        const now = Date.now();
        
        // Check if token is expired (30 minutes)
        if (now - decoded.timestamp < 30 * 60 * 1000) {
          setIsAuthenticated(true);
          setSessionToken(token);
          setCurrentUser({ 
            email: decoded.email, 
            userId: decoded.userId,
            role: decoded.role 
          });
        } else {
          localStorage.removeItem('admin_session_token');
        }
      } catch (error) {
        localStorage.removeItem('admin_session_token');
      }
    }
  }, []);

  useEffect(() => {
    // Session timeout check
    if (isAuthenticated && sessionToken) {
      const interval = setInterval(() => {
        try {
          const decoded = JSON.parse(atob(sessionToken));
          const now = Date.now();
          
          // Check if session expired
          if (now - decoded.timestamp >= 30 * 60 * 1000) {
            handleLogout();
          }
        } catch (error) {
          handleLogout();
        }
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, sessionToken]);

  const handleLogin = (token: string, user: any) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    setSessionToken(token);
    localStorage.setItem('admin_session_token', token);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setSessionToken(null);
    setCurrentSection('dashboard');
    localStorage.removeItem('admin_session_token');
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <EnhancedAdminDashboard />;
      case 'content':
        return <EnhancedContentManagement />;
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <Analytics />;
      case 'messages':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Management</h2>
            <p className="text-gray-600">User message and communication system coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">System Settings</h2>
            <p className="text-gray-600">Advanced system configuration panel coming soon...</p>
          </div>
        );
      default:
        return <EnhancedAdminDashboard />;
    }
  };

  if (!isAuthenticated) {
    return <SecureAdminLogin onLogin={handleLogin} onBack={onBackToWebsite} />;
  }

  return (
    <AdminLayout
      currentSection={currentSection}
      onNavigate={setCurrentSection}
      onLogout={handleLogout}
      onBackToWebsite={onBackToWebsite}
    >
      {renderSection()}
    </AdminLayout>
  );
};

export default AdminPanel;