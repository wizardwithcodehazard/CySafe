import React, { useState } from 'react';
import { useEffect } from 'react';
import { AlertTriangle, Shield, Users, CreditCard, Search, ArrowRight, ExternalLink, CheckCircle } from 'lucide-react';
import { CybercrimeService } from '../lib/database';
import { Database } from '../types/database';
import * as LucideIcons from 'lucide-react';

type CybercrimeData = Database['public']['Tables']['cybercrime_data']['Row'];

const CyberCrimes: React.FC = () => {
  const [crimeTypes, setCrimeTypes] = useState<CybercrimeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCrime, setSelectedCrime] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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
        setCrimeTypes(result.data || []);
      }
    } catch (error) {
      setError('Failed to load cyber crime data');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Email Fraud', 'Personal Data', 'Financial Fraud', 'Harassment'];
  
  const filteredCrimes = crimeTypes.filter(crime => {
    const matchesSearch = crime.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crime.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || crime.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType<any>;
    return <AlertTriangle className="h-6 w-6" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Error Loading Cyber Crimes</span>
            </div>
            <p className="text-red-700 mt-2">{error}</p>
            <button
              onClick={loadCrimes}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedCrime) {
    const crime = crimeTypes.find(c => c.id === selectedCrime);
    if (!crime) return null;

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => setSelectedCrime(null)}
            className="mb-6 flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span>Back to Cyber Crimes</span>
          </button>

          {/* Crime Detail */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-white">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  {renderIcon('AlertTriangle')}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{crime.type}</h1>
                  <p className="text-red-100 text-lg">{crime.description}</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{crime.category}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium bg-white/20`}>
                      {crime.severity.charAt(0).toUpperCase() + crime.severity.slice(1)} Risk
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Prevention Tips */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-green-600" />
                    <span>Prevention Tips</span>
                  </h2>
                  <div className="space-y-3">
                    {crime.prevention_tips.map((tip, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reporting Steps */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                    <span>If You're a Victim</span>
                  </h2>
                  <div className="space-y-3">
                    {crime.reporting_steps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="flex items-center justify-center w-6 h-6 bg-orange-600 text-white rounded-full text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Report Crime CTA */}
              <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-xl text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Need to Report This Crime?</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  If you've been affected by this type of cyber crime, report it immediately through 
                  India's official cybercrime reporting portal.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
                  >
                    <span>Report on Cybercrime Portal</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a
                    href="tel:1930"
                    className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors inline-flex items-center space-x-2"
                  >
                    <span>Call Helpline: 1930</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cyber Crime Information Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about different types of cyber crimes, how to protect yourself, 
            and what to do if you become a victim.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
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
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">2.5L+</div>
            <div className="text-gray-600">Cases Reported</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">₹10K Cr</div>
            <div className="text-gray-600">Losses Prevented</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-gray-600">Recovery Rate</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
        </div>

        {/* Crime Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCrimes.map((crime) => (
            <div
              key={crime.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedCrime(crime.id)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      {renderIcon('AlertTriangle')}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{crime.type}</h3>
                      <p className="text-sm text-gray-500">{crime.category}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(crime.severity)}`}>
                    {crime.severity}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{crime.description}</p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {crime.prevention_tips.length} prevention tips
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600 font-medium group">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Section */}
        <div className="mt-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-8 text-white text-center">
          <AlertTriangle className="h-16 w-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Emergency? Report Immediately!</h2>
          <p className="text-red-100 mb-6 text-lg max-w-2xl mx-auto">
            If you're currently facing a cyber attack or have been victimized, 
            don't wait. Report it immediately through official channels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <span>Cybercrime Portal</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="tel:1930"
              className="bg-red-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-800 transition-colors inline-flex items-center space-x-2"
            >
              <span>Call 1930</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberCrimes;