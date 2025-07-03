import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Shield, ExternalLink, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const contactInfo = [
    {
      icon: Phone,
      title: 'Emergency Helplines',
      details: [
        'Cyber Crime: 1930',
        'National Emergency: 112',
        'Women Helpline: 181',
        'Child Helpline: 1098'
      ],
      color: 'bg-red-500'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: [
        'General: support@cybersafe.gov.in',
        'Reports: reports@cybersafe.gov.in',
        'Technical: tech@cybersafe.gov.in',
        'Media: media@cybersafe.gov.in'
      ],
      color: 'bg-blue-500'
    },
    {
      icon: MapPin,
      title: 'Regional Offices',
      details: [
        'Delhi, Mumbai, Bangalore',
        'Chennai, Kolkata, Hyderabad',
        'Pune, Ahmedabad, Jaipur',
        'Kochi, Bhubaneswar, Guwahati'
      ],
      color: 'bg-green-500'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      details: [
        'Emergency: 24/7',
        'Phone Support: 9 AM - 6 PM',
        'Email: Response within 24hrs',
        'Weekend: Limited support'
      ],
      color: 'bg-purple-500'
    }
  ];

  const faqs = [
    {
      question: 'How quickly will I get a response to my report?',
      answer: 'Emergency cases are handled immediately. Standard cases receive acknowledgment within 24 hours and updates within 72 hours.'
    },
    {
      question: 'Can I report anonymously?',
      answer: 'Yes, you can file anonymous reports, but providing contact information helps with follow-up and resolution.'
    },
    {
      question: 'What information should I include in my report?',
      answer: 'Include all relevant details: dates, screenshots, email headers, transaction IDs, and any communication with the perpetrator.'
    },
    {
      question: 'Is there any cost for reporting cyber crimes?',
      answer: 'No, all cyber crime reporting services are completely free of charge.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message. We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact & Support
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Need help or have questions? We're here to support you 24/7. 
            Choose the best way to reach us based on your needs.
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-xl mb-12">
          <div className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Emergency Support Available 24/7</h2>
            <p className="text-red-100 mb-6">
              If you're facing an active cyber threat or emergency, don't wait. Contact us immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1930"
                className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
              >
                <Phone className="h-5 w-5" />
                <span>Call 1930</span>
              </a>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-800 transition-colors inline-flex items-center space-x-2"
              >
                <ExternalLink className="h-5 w-5" />
                <span>Report Online</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="report">Report Issue</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    rows={6}
                    placeholder="Please provide as much detail as possible..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`${info.color} p-2 rounded-lg`}>
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{info.title}</h3>
                </div>
                <ul className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <li key={idx} className="text-gray-600 text-sm">{detail}</li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Live Chat Widget */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl p-6">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Live Chat Support</h3>
                <p className="text-blue-100 mb-4 text-sm">
                  Get instant help from our cybersecurity experts. Available during business hours.
                </p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Start Chat
                </button>
              </div>
            </div>

            {/* Resource Links */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>Download Safety Guide</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>Report Status Check</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>Safety Tips Archive</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>Regional Office Locator</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;