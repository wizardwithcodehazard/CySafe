import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Eye,
  Save,
  X,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield
} from 'lucide-react';
import { CybercrimeService } from '../../lib/database';
import { Database } from '../../types/database';

type CybercrimeData = Database['public']['Tables']['cybercrime_data']['Row'];

const EnhancedContentManagement: React.FC = () => {
  const [crimes, setCrimes] = useState<CybercrimeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [editingItem, setEditingItem] = useState<CybercrimeData | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    type: '',
    description: '',
    category: '',
    severity: 'medium' as const,
    prevention_tips: [''],
    reporting_steps: ['']
  });

  const categories = ['All', 'Email Fraud', 'Personal Data', 'Financial Fraud', 'Harassment', 'Identity Theft'];
  const severityLevels = ['All', 'low', 'medium', 'high', 'critical'];
  const statusOptions = ['pending', 'investigating', 'resolved', 'closed'];

  useEffect(() => {
    loadCrimes();
  }, []);

  const loadCrimes = async () => {
    try {
      setLoading(true);
      const result = await CybercrimeService.getAll();
      
      if (result.error) {
        setError(result.error);
      } else {
        setCrimes(result.data || []);
      }
    } catch (error) {
      setError('Failed to load cyber crime data');
    } finally {
      setLoading(false);
    }
  };

  const filteredCrimes = crimes.filter(crime => {
    const matchesSearch = crime.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crime.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || crime.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'All' || crime.severity === selectedSeverity;
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const handleSave = async () => {
    try {
      const adminId = 'current-admin-id'; // Get from auth context
      
      if (isCreating) {
        const result = await CybercrimeService.create(formData, adminId);
        if (result.error) {
          setError(result.error);
          return;
        }
      } else if (editingItem) {
        const result = await CybercrimeService.update(editingItem.id, formData, adminId);
        if (result.error) {
          setError(result.error);
          return;
        }
      }
      
      await loadCrimes();
      resetForm();
    } catch (error) {
      setError('Failed to save cyber crime data');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this cyber crime entry?')) return;
    
    try {
      const adminId = 'current-admin-id'; // Get from auth context
      const result = await CybercrimeService.delete(id, adminId);
      
      if (result.error) {
        setError(result.error);
      } else {
        await loadCrimes();
      }
    } catch (error) {
      setError('Failed to delete cyber crime data');
    }
  };

  const resetForm = () => {
    setFormData({
      type: '',
      description: '',
      category: '',
      severity: 'medium',
      prevention_tips: [''],
      reporting_steps: ['']
    });
    setIsCreating(false);
    setEditingItem(null);
  };

  const startEdit = (crime: CybercrimeData) => {
    setFormData({
      type: crime.type,
      description: crime.description,
      category: crime.category,
      severity: crime.severity,
      prevention_tips: crime.prevention_tips.length > 0 ? crime.prevention_tips : [''],
      reporting_steps: crime.reporting_steps.length > 0 ? crime.reporting_steps : ['']
    });
    setEditingItem(crime);
  };

  const addTip = (type: 'prevention_tips' | 'reporting_steps') => {
    setFormData({
      ...formData,
      [type]: [...formData[type], '']
    });
  };

  const updateTip = (type: 'prevention_tips' | 'reporting_steps', index: number, value: string) => {
    const updated = [...formData[type]];
    updated[index] = value;
    setFormData({
      ...formData,
      [type]: updated
    });
  };

  const removeTip = (type: 'prevention_tips' | 'reporting_steps', index: number) => {
    const updated = formData[type].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [type]: updated
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Management System</h1>
          <p className="text-gray-600">Manage cyber crime information and security content</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 mt-4 md:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Crime Type</span>
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">Error</span>
          </div>
          <p className="text-red-700 mt-1">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-red-600 hover:text-red-800 text-sm"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cyber crimes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {severityLevels.map((severity) => (
                <option key={severity} value={severity}>
                  {severity === 'All' ? 'All Severities' : severity.charAt(0).toUpperCase() + severity.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Crime Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCrimes.map((crime) => (
                <tr key={crime.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-red-100 p-2 rounded-lg mr-3">
                        <Shield className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{crime.type}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{crime.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {crime.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(crime.severity)}`}>
                      {crime.severity.charAt(0).toUpperCase() + crime.severity.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(crime.status)}`}>
                      {crime.status.charAt(0).toUpperCase() + crime.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(crime.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => startEdit(crime)}
                        className="text-green-600 hover:text-green-900 p-1 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(crime.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(isCreating || editingItem) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isCreating ? 'Create New Cyber Crime Entry' : 'Edit Cyber Crime Entry'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Crime Type *
                  </label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Advanced Phishing Attacks"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Detailed description of the cyber crime..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity Level
                </label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({...formData, severity: e.target.value as any})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              {/* Prevention Tips */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Prevention Tips
                  </label>
                  <button
                    onClick={() => addTip('prevention_tips')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Tip</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.prevention_tips.map((tip, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={tip}
                        onChange={(e) => updateTip('prevention_tips', index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Prevention tip ${index + 1}`}
                      />
                      {formData.prevention_tips.length > 1 && (
                        <button
                          onClick={() => removeTip('prevention_tips', index)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reporting Steps */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Reporting Steps
                  </label>
                  <button
                    onClick={() => addTip('reporting_steps')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Step</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.reporting_steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={step}
                        onChange={(e) => updateTip('reporting_steps', index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Reporting step ${index + 1}`}
                      />
                      {formData.reporting_steps.length > 1 && (
                        <button
                          onClick={() => removeTip('reporting_steps', index)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={resetForm}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedContentManagement;