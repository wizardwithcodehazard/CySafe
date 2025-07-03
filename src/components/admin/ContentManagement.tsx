import React, { useState } from 'react';
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
  BookOpen,
  FileText
} from 'lucide-react';
import { crimeTypes, modules } from '../../data/mockData';

const ContentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'crimes' | 'modules'>('crimes');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [newCrime, setNewCrime] = useState({
    title: '',
    description: '',
    category: '',
    severity: 'Medium',
    icon: 'AlertTriangle',
    preventionTips: [''],
    reportingSteps: ['']
  });

  const categories = ['All', 'Email Fraud', 'Personal Data', 'Financial Fraud', 'Harassment'];
  const severityLevels = ['Low', 'Medium', 'High', 'Critical'];

  const filteredCrimes = crimeTypes.filter(crime => {
    const matchesSearch = crime.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || crime.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveCrime = () => {
    // In a real app, this would save to the database
    console.log('Saving crime:', newCrime);
    setIsCreating(false);
    setNewCrime({
      title: '',
      description: '',
      category: '',
      severity: 'Medium',
      icon: 'AlertTriangle',
      preventionTips: [''],
      reportingSteps: ['']
    });
  };

  const handleDeleteCrime = (id: string) => {
    if (confirm('Are you sure you want to delete this cyber crime entry?')) {
      // In a real app, this would delete from the database
      console.log('Deleting crime:', id);
    }
  };

  const addTip = (type: 'preventionTips' | 'reportingSteps') => {
    setNewCrime({
      ...newCrime,
      [type]: [...newCrime[type], '']
    });
  };

  const updateTip = (type: 'preventionTips' | 'reportingSteps', index: number, value: string) => {
    const updated = [...newCrime[type]];
    updated[index] = value;
    setNewCrime({
      ...newCrime,
      [type]: updated
    });
  };

  const removeTip = (type: 'preventionTips' | 'reportingSteps', index: number) => {
    const updated = newCrime[type].filter((_, i) => i !== index);
    setNewCrime({
      ...newCrime,
      [type]: updated
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Management</h1>
          <p className="text-gray-600">Manage cyber crime information and learning modules</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 mt-4 md:mt-0"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Content</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('crimes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'crimes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Cyber Crimes</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('modules')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'modules'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Learning Modules</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search content..."
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
          </div>
        </div>
      </div>

      {/* Content List */}
      {activeTab === 'crimes' && (
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
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{crime.title}</div>
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
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        crime.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                        crime.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                        crime.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {crime.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      2 days ago
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => setEditingItem(crime)}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCrime(crime.id)}
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
      )}

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
                  onClick={() => {
                    setIsCreating(false);
                    setEditingItem(null);
                  }}
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
                    Crime Title *
                  </label>
                  <input
                    type="text"
                    value={newCrime.title}
                    onChange={(e) => setNewCrime({...newCrime, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Advanced Phishing Attacks"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={newCrime.category}
                    onChange={(e) => setNewCrime({...newCrime, category: e.target.value})}
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
                  value={newCrime.description}
                  onChange={(e) => setNewCrime({...newCrime, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Detailed description of the cyber crime..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Severity Level
                  </label>
                  <select
                    value={newCrime.severity}
                    onChange={(e) => setNewCrime({...newCrime, severity: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {severityLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={newCrime.icon}
                    onChange={(e) => setNewCrime({...newCrime, icon: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Lucide icon name"
                  />
                </div>
              </div>

              {/* Prevention Tips */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Prevention Tips
                  </label>
                  <button
                    onClick={() => addTip('preventionTips')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Tip</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {newCrime.preventionTips.map((tip, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={tip}
                        onChange={(e) => updateTip('preventionTips', index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Prevention tip ${index + 1}`}
                      />
                      {newCrime.preventionTips.length > 1 && (
                        <button
                          onClick={() => removeTip('preventionTips', index)}
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
                    onClick={() => addTip('reportingSteps')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Step</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {newCrime.reportingSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={step}
                        onChange={(e) => updateTip('reportingSteps', index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Reporting step ${index + 1}`}
                      />
                      {newCrime.reportingSteps.length > 1 && (
                        <button
                          onClick={() => removeTip('reportingSteps', index)}
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
                onClick={() => {
                  setIsCreating(false);
                  setEditingItem(null);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCrime}
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

export default ContentManagement;