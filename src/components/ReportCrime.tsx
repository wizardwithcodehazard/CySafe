import React, { useState } from 'react';
import { AlertTriangle, Phone, ExternalLink, FileText, Clock, Shield, CheckCircle, ArrowRight } from 'lucide-react';

const ReportCrime: React.FC = () => {
  const [selectedCrimeType, setSelectedCrimeType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    urgency: 'medium'
  });

  const crimeTypes = [
    'Phishing/Email Fraud',
    'Identity Theft',
    'Online Financial Fraud',
    'Cyberbullying/Harassment',
    'Fake Website/App',
    'Social Media Fraud',
    'Online Job Fraud',
    'Cryptocurrency Fraud',
    'Other'
  ];

  const emergencyContacts = [
    { name: 'Cyber Crime Helpline', number: '1930', description: 'For all cyber crime related issues' },
    { name: 'National Emergency', number: '112', description: 'For immediate emergency assistance' },
    { name: 'Women Helpline', number: '181', description: 'For women facing cyber harassment' },
    { name: 'Child Helpline', number: '1098', description: 'For child-related cyber crimes' },
  ];

  const reportingSteps = [
    {
      step: 1,
      title: 'Immediate Action',
      description: 'Stop any ongoing transactions, change passwords, and secure your accounts',
      icon: Shield,
    },
    {
      step: 2,
      title: 'Gather Evidence',
      description: 'Take screenshots, save emails, and collect all relevant proof',
      icon: FileText,
    },
    {
      step: 3,
      title: 'File Complaint',
      description: 'Report on cybercrime.gov.in or call the helpline numbers',
      icon: Phone,
    },
    {
      step: 4,
      title: 'Follow Up',
      description: 'Keep track of your complaint and provide additional information if needed',
      icon: Clock,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally send data to backend
    alert('Your report has been submitted. You will be redirected to the official portal.');
    window.open('https://cybercrime.gov.in', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Report Cyber Crime
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            If you've been a victim of cyber crime, report it immediately. 
            We'll guide you through the process and connect you with the right authorities.
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-600 text-white p-6 rounded-xl mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <AlertTriangle className="h-8 w-8" />
            <h2 className="text-2xl font-bold">Emergency Situation?</h2>
          </div>
          <p className="text-center text-red-100 mb-6">
            If you're facing an active cyber attack or urgent threat, contact emergency services immediately.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {emergencyContacts.map((contact, index) => (
              <a
                key={index}
                href={`tel:${contact.number}`}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center hover:bg-white/20 transition-colors"
              >
                <Phone className="h-6 w-6 mx-auto mb-2" />
                <div className="font-bold text-lg">{contact.number}</div>
                <div className="text-sm text-red-100">{contact.name}</div>
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Reporting Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Report Form</h2>
            <p className="text-gray-600 mb-6">
              Fill out this form to get started. You'll be redirected to the official National Cyber Crime Reporting Portal.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Cyber Crime *
                </label>
                <select
                  value={selectedCrimeType}
                  onChange={(e) => setSelectedCrimeType(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select crime type</option>
                  {crimeTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low - General inquiry</option>
                  <option value="medium">Medium - Standard case</option>
                  <option value="high">High - Urgent attention needed</option>
                  <option value="critical">Critical - Active threat</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brief Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  rows={4}
                  placeholder="Please describe what happened, when it occurred, and any other relevant details..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Submit & Go to Official Portal</span>
                <ExternalLink className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> After submitting this form, you'll be redirected to cybercrime.gov.in 
                to file your official complaint with the authorities.
              </p>
            </div>
          </div>

          {/* Reporting Process */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Report Effectively</h2>
              
              <div className="space-y-6">
                {reportingSteps.map((step) => (
                  <div key={step.step} className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full flex-shrink-0">
                      <step.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Step {step.step}: {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Portals */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Official Reporting Portals</h2>
              
              <div className="space-y-4">
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                      National Cyber Crime Reporting Portal
                    </h3>
                    <p className="text-sm text-gray-600">cybercrime.gov.in</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                </a>

                <a
                  href="https://pgportal.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                      Public Grievance Portal
                    </h3>
                    <p className="text-sm text-gray-600">pgportal.gov.in</p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                </a>
              </div>
            </div>

            {/* What to Expect */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <span>What to Expect</span>
              </h2>
              
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">You'll receive a complaint number for tracking</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Investigation may take 2-4 weeks depending on complexity</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">You may be contacted for additional information</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Keep all evidence safe until case resolution</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCrime;