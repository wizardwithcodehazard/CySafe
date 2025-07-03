import React from 'react';
import { Shield, AlertTriangle, Phone, ArrowRight, Users, FileText, Zap } from 'lucide-react';

interface HomePageProps {
  onNavigate: (section: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const stats = [
    { icon: Users, label: 'Users Protected', value: '50,000+' },
    { icon: FileText, label: 'Crime Types Documented', value: '25+' },
    { icon: Shield, label: 'Reports Processed', value: '15,000+' },
    { icon: AlertTriangle, label: 'Threats Prevented', value: '100,000+' },
  ];

  const features = [
    {
      icon: AlertTriangle,
      title: 'Crime Awareness',
      description: 'Comprehensive information about cyber threats and prevention strategies',
      color: 'bg-orange-500',
    },
    {
      icon: Phone,
      title: 'Easy Reporting',
      description: 'Quick access to official reporting channels and emergency helplines',
      color: 'bg-red-500',
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Latest cyber threat intelligence and security advisories',
      color: 'bg-green-500',
    },
    {
      icon: Shield,
      title: 'Expert Guidance',
      description: 'Professional cybersecurity advice and incident response support',
      color: 'bg-blue-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">India's Cyber Security Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Stay Safe in the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Digital World
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Learn about cyber crimes, get expert guidance, and report incidents with India's most comprehensive 
              cybersecurity information platform. Join thousands of Indians staying safe online.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => onNavigate('crimes')}
                className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
              >
                <AlertTriangle className="h-5 w-5" />
                <span>Explore Cyber Crimes</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => onNavigate('report')}
                className="group bg-red-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-600 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
              >
                <Phone className="h-5 w-5" />
                <span>Report Crime</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Cyber Protection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to stay safe online, from detailed crime information 
              to instant incident reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.color} rounded-lg mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <Phone className="h-10 w-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Emergency? Need Immediate Help?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            If you're facing an active cyber attack or urgent security threat, 
            contact our emergency helplines immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:1930"
              className="group bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              <span>Cyber Helpline: 1930</span>
            </a>
            <a
              href="tel:112"
              className="group bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-800 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              <span>Emergency: 112</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Stay Cyber Secure?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of Indians who have already strengthened their digital defenses. 
            Explore our comprehensive cyber crime database and reporting tools.
          </p>
          <button
            onClick={() => onNavigate('crimes')}
            className="group bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center space-x-2 transform hover:scale-105"
          >
            <Shield className="h-6 w-6" />
            <span>Explore Cyber Crimes</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;