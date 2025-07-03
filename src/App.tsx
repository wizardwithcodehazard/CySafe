import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CyberCrimes from './components/CyberCrimes';
import ReportCrime from './components/ReportCrime';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import Chatbot from './components/Chatbot';

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  // Check if admin panel is requested
  if (currentSection === 'admin') {
    return <AdminPanel onBackToWebsite={() => setCurrentSection('home')} />;
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <HomePage onNavigate={setCurrentSection} />;
      case 'crimes':
        return <CyberCrimes />;
      case 'report':
        return <ReportCrime />;
      case 'contact':
        return <Contact />;
      default:
        return <HomePage onNavigate={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentSection={currentSection} onNavigate={setCurrentSection} />
      <main>
        {renderSection()}
      </main>
      <Footer />
      
      {/* Admin Access Button - Hidden in production */}
      <button
        onClick={() => setCurrentSection('admin')}
        className="fixed bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-40"
        title="Admin Panel Access"
      >
        🔐
      </button>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
}

export default App;