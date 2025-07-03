import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  typing?: boolean;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m CyberSafe Assistant. I can help you with cybersecurity questions, guide you through our website, and provide information about cyber crimes. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Predefined responses for common cybersecurity questions
  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Navigation help
    if (message.includes('navigate') || message.includes('how to use') || message.includes('website')) {
      return 'I can help you navigate our website! Here are the main sections:\n\n🏠 **Home** - Overview and quick access\n🚨 **Cyber Crimes** - Learn about different types of cyber threats\n📝 **Report** - Report cyber crimes safely\n📞 **Contact** - Get help and support\n\nWhat would you like to explore?';
    }
    
    // Phishing questions
    if (message.includes('phishing') || message.includes('suspicious email')) {
      return 'Phishing is a serious threat! Here are key warning signs:\n\n⚠️ **Red Flags:**\n• Urgent language ("Act now!")\n• Suspicious sender addresses\n• Requests for personal information\n• Poor grammar/spelling\n• Unexpected attachments\n\n🛡️ **Stay Safe:**\n• Never click suspicious links\n• Verify sender independently\n• Use two-factor authentication\n• Report phishing emails\n\nNeed to report a phishing attempt?';
    }
    
    // Password security
    if (message.includes('password') || message.includes('secure password')) {
      return 'Strong passwords are your first line of defense! 🔐\n\n✅ **Password Best Practices:**\n• At least 12 characters long\n• Mix of uppercase, lowercase, numbers, symbols\n• Unique for each account\n• Use a password manager\n• Enable two-factor authentication\n\n❌ **Avoid:**\n• Personal information\n• Common words\n• Reusing passwords\n\nWould you like tips on password managers?';
    }
    
    // Social media safety
    if (message.includes('social media') || message.includes('facebook') || message.includes('instagram')) {
      return 'Social media safety is crucial! 📱\n\n🔒 **Privacy Settings:**\n• Review privacy settings regularly\n• Limit personal information sharing\n• Be cautious with friend requests\n• Think before posting\n\n⚠️ **Watch Out For:**\n• Fake profiles\n• Suspicious links\n• Oversharing location data\n• Cyberbullying\n\nNeed help with specific platform settings?';
    }
    
    // Online shopping
    if (message.includes('online shopping') || message.includes('shopping') || message.includes('ecommerce')) {
      return 'Safe online shopping tips! 🛒\n\n✅ **Before You Buy:**\n• Verify website authenticity\n• Look for HTTPS (secure connection)\n• Read reviews and ratings\n• Use secure payment methods\n• Avoid public Wi-Fi for purchases\n\n🚫 **Red Flags:**\n• Deals too good to be true\n• No contact information\n• Poor website design\n• Requests for unusual payment methods\n\nNeed help verifying a website?';
    }
    
    // Reporting crimes
    if (message.includes('report') || message.includes('crime') || message.includes('victim')) {
      return 'I can help you report cyber crimes! 🚨\n\n📞 **Emergency Contacts:**\n• Cyber Crime Helpline: **1930**\n• National Emergency: **112**\n\n💻 **Online Reporting:**\n• Visit cybercrime.gov.in\n• Use our Report section\n\n📋 **What to Include:**\n• Screenshots of evidence\n• Email headers\n• Transaction details\n• Timeline of events\n\n**Remember:** Report immediately for best results!';
    }
    
    // Identity theft
    if (message.includes('identity theft') || message.includes('stolen identity')) {
      return 'Identity theft is serious! Act quickly: 🆘\n\n🚨 **Immediate Steps:**\n1. Contact your bank/credit card companies\n2. File a police report\n3. Report to cybercrime.gov.in\n4. Monitor your accounts\n5. Consider credit monitoring\n\n🛡️ **Prevention:**\n• Secure personal documents\n• Monitor credit reports\n• Use strong passwords\n• Be cautious sharing personal info\n\nNeed help with the reporting process?';
    }
    
    // General help
    if (message.includes('help') || message.includes('assistance')) {
      return 'I\'m here to help! 🤖\n\nI can assist with:\n• **Cybersecurity education** - Learn about threats\n• **Website navigation** - Find what you need\n• **Crime reporting** - Guide you through the process\n• **Prevention tips** - Stay safe online\n• **Emergency contacts** - Get immediate help\n\nWhat specific topic interests you?';
    }
    
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! 👋 Welcome to CyberSafe! I\'m your cybersecurity assistant. I can help you:\n\n• Learn about cyber threats\n• Navigate our website\n• Report cyber crimes\n• Get safety tips\n• Find emergency contacts\n\nWhat would you like to know about?';
    }
    
    // Default response
    return 'I understand you\'re asking about cybersecurity. While I may not have a specific answer for that question, I can help you with:\n\n• **Cyber crime information** - Types and prevention\n• **Reporting guidance** - How to report incidents\n• **Safety tips** - Protect yourself online\n• **Website navigation** - Find what you need\n\nFor complex issues, please contact our support team or call the cyber crime helpline at **1930**. What else can I help you with?';
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (text: string) => {
    // Convert markdown-style formatting to HTML
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 z-50"
        title="Open CyberSafe Assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 left-6 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">CyberSafe Assistant</h3>
            <p className="text-xs text-blue-100">
              {isTyping ? 'Typing...' : 'Online • Ready to help'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <div 
                      className="text-sm whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
                    />
                    <div className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="p-2 rounded-full bg-gray-100">
                    <Bot className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="p-3 rounded-lg bg-gray-100">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about cybersecurity, navigation, or reporting..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Ask me about cyber crimes, safety tips, or how to use this website!
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;