import React from 'react';
import { Shield, Phone, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">CyberSafe</h3>
                <p className="text-sm text-gray-400">India Cyber Helpline</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Empowering Indians with cybersecurity knowledge and providing a safe platform 
              to report cybercrimes. Together, we build a safer digital India.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Cyber Crime Helpline: <span className="font-semibold">1930</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm">Emergency: <span className="font-semibold">112</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm">support@cybersafe.gov.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button className="text-gray-400 hover:text-white transition-colors">Cyber Crime Types</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">Prevention Tips</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">Report Crime</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">Contact Support</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">FAQ</button></li>
            </ul>
          </div>

          {/* Government Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Government Links</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://cybercrime.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>Cybercrime Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://digitalindia.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>Digital India</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://meity.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>MeitY</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://cert-in.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>CERT-In</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2024 CyberSafe India. Built for the safety of all Indians.
          </div>
          <div className="flex space-x-6 text-sm">
            <button className="text-gray-400 hover:text-white transition-colors">Privacy Policy</button>
            <button className="text-gray-400 hover:text-white transition-colors">Terms of Service</button>
            <button className="text-gray-400 hover:text-white transition-colors">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;