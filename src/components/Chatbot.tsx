import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2, Phone, ExternalLink, Shield, AlertTriangle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  typing?: boolean;
  links?: Array<{ text: string; url: string }>;
  actions?: Array<{ text: string; action: string }>;
}

interface Intent {
  name: string;
  patterns: string[];
  responses: string[];
  context?: string;
  actions?: Array<{ text: string; action: string }>;
  links?: Array<{ text: string; url: string }>;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m CyberSafe AI Assistant powered by DeepCytes intelligence. I can help you with:\n\n🛡️ **Cybercrime Information** - Learn about different types of cyber threats\n📞 **Report Assistance** - Guide you through reporting procedures\n⚖️ **Legal Guidance** - Information about Indian cyber laws\n🔒 **Safety Tips** - Best practices for cyber security\n🏢 **DeepCytes Services** - Our AI-enabled cyber intelligence solutions\n\nHow can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Enhanced ML-based knowledge base with DeepCytes information
  const intents: Intent[] = [
    // Company Information
    {
      name: 'company_info',
      patterns: ['about deepcytes', 'what is deepcytes', 'company info', 'who are you', 'tell me about your company'],
      responses: [
        '🏢 **DeepCytes** is an AI-enabled cyber intelligence company headquartered in the UK with a major hub in Mumbai, India.\n\n**Our Core Focus:**\n• Cyber Threat Intelligence\n• Ransomware Protection\n• Digital Forensics\n• Regulatory Compliance\n• Cybersecurity Training\n\n**Key Achievements:**\n• 95+ professionals with government advisors\n• Trained 6,500+ officials (Police, CBI, CID, ED, EoW)\n• Collaborations with UK Govt, PMO India, Japan Govt, Microsoft, Cornell University\n\nWe\'re recognized as a "cyber sentinel" for public and private sectors. Visit: www.deepcytes.io'
      ],
      links: [{ text: 'Visit DeepCytes Website', url: 'https://www.deepcytes.io' }]
    },
    
    // Cybercrime Types - Financial Frauds
    {
      name: 'financial_fraud',
      patterns: ['financial fraud', 'phishing', 'upi fraud', 'credit card fraud', 'otp scam', 'banking fraud', 'online fraud'],
      responses: [
        '💰 **Financial Cybercrimes** are among the most common threats:\n\n**Types:**\n• **Phishing**: Fake emails/messages to steal sensitive info\n• **UPI Fraud**: Fake UPI links or unauthorized money transfers\n• **OTP Scams**: Fraudsters asking for OTPs to access accounts\n• **Credit Card Fraud**: Unauthorized use of card details\n\n**Warning Signs:**\n• Urgent requests for OTPs/CVVs\n• Suspicious payment links\n• Fake bank notifications\n• "You won lottery" messages\n\n**Legal Provisions:**\n• IT Act Sec 66C (Identity theft)\n• IT Act Sec 66D (Impersonation for cheating)\n• IPC Sec 420 (Online fraud/cheating)'
      ],
      actions: [
        { text: 'Report Financial Fraud', action: 'report_financial' },
        { text: 'Safety Tips', action: 'financial_safety' }
      ]
    },

    // Cybercrime Types - Personal Crimes
    {
      name: 'personal_crimes',
      patterns: ['cyberbullying', 'harassment', 'cyberstalking', 'revenge porn', 'impersonation', 'fake profile'],
      responses: [
        '👤 **Personalized Cybercrimes** target individuals:\n\n**Types:**\n• **Cyberbullying**: Online harassment or intimidation\n• **Cyberstalking**: Repeated online monitoring/harassment\n• **Revenge Porn**: Non-consensual sharing of intimate content\n• **Impersonation**: Creating fake profiles to deceive\n\n**Warning Signs:**\n• Threatening messages from unknown accounts\n• Fake profiles using your photos\n• Repeated contact after blocking\n• Demands for money or favors\n\n**Legal Provisions:**\n• IT Act Sec 66E (Privacy violations)\n• IT Act Sec 67-67B (Obscene content)\n• IPC Sec 354D (Cyberstalking)\n• IPC Sec 507 (Threatening messages)'
      ],
      actions: [
        { text: 'Report Harassment', action: 'report_harassment' },
        { text: 'Block & Report Guide', action: 'blocking_guide' }
      ]
    },

    // System Level Attacks
    {
      name: 'system_attacks',
      patterns: ['ransomware', 'malware', 'hacking', 'data breach', 'virus', 'trojan', 'system attack'],
      responses: [
        '💻 **System-Level Attacks** target your devices and data:\n\n**Types:**\n• **Ransomware**: Encrypts files and demands ransom payment\n• **Malware**: Malicious software that damages systems\n• **Hacking**: Unauthorized access to systems/accounts\n• **Data Breaches**: Unauthorized access to sensitive data\n\n**Warning Signs:**\n• Random pop-ups or ransom notes\n• Slow device performance\n• Unexpected file encryption\n• Unknown programs running\n\n**DeepCytes Protection:**\nOur Cyber Intelligence OS provides advanced ransomware detection, response, and recovery modules.\n\n**Legal Provisions:**\n• IT Act Sec 43 (Damage to systems)\n• IT Act Sec 66 (Hacking offenses)'
      ],
      actions: [
        { text: 'Report System Attack', action: 'report_system' },
        { text: 'DeepCytes Protection', action: 'deepcytes_protection' }
      ]
    },

    // Legal Guidance
    {
      name: 'legal_guidance',
      patterns: ['cyber law', 'it act', 'legal help', 'what law applies', 'legal provisions', 'ipc sections'],
      responses: [
        '⚖️ **Indian Cyber Laws** protect you online:\n\n**IT Act 2000 Key Sections:**\n• **Sec 43**: Penalty for system damage\n• **Sec 66**: Hacking offenses\n• **Sec 66C**: Identity theft\n• **Sec 66D**: Impersonation for cheating\n• **Sec 66E**: Privacy violations\n• **Sec 67-67B**: Obscene/child sexual content\n• **Sec 72**: Breach of confidentiality\n\n**IPC Sections:**\n• **Sec 354D**: Cyberstalking\n• **Sec 420**: Online fraud/cheating\n• **Sec 499-500**: Online defamation\n• **Sec 507**: Threatening messages\n\nNeed specific legal advice for your case?'
      ],
      actions: [
        { text: 'File Legal Complaint', action: 'legal_complaint' },
        { text: 'Know Your Rights', action: 'legal_rights' }
      ]
    },

    // Reporting Assistance
    {
      name: 'report_crime',
      patterns: ['how to report', 'file complaint', 'report cybercrime', 'where to report', 'complaint process'],
      responses: [
        '📋 **How to Report Cybercrime:**\n\n**Step 1: Immediate Action**\n• Stop ongoing transactions\n• Change passwords\n• Secure accounts\n\n**Step 2: Gather Evidence**\n• Screenshots of messages/transactions\n• URLs of fake websites\n• Phone numbers used\n• Email headers\n\n**Step 3: File Complaint**\n• Online: cybercrime.gov.in\n• Call: 1930 (Cyber Crime Helpline)\n• Visit: Nearest cyber police station\n\n**Information Needed:**\n• Your details (name, age, location)\n• Incident date and platform\n• Nature of crime\n• Evidence collected\n• Financial loss (if any)'
      ],
      links: [
        { text: 'National Cyber Crime Portal', url: 'https://cybercrime.gov.in' },
        { text: 'Report Here', url: '/report' }
      ],
      actions: [
        { text: 'Start Reporting Process', action: 'start_report' }
      ]
    },

    // Safety Guidelines
    {
      name: 'safety_tips',
      patterns: ['safety tips', 'how to stay safe', 'cyber safety', 'protection tips', 'security advice'],
      responses: [
        '🔒 **Cyber Safety Guidelines:**\n\n**Password Security:**\n• Use strong passwords (12+ characters)\n• Enable 2-Factor Authentication\n• Don\'t reuse passwords\n\n**Online Behavior:**\n• Hover before clicking links\n• Verify sender identity\n• Never share OTPs/CVVs\n• Use official apps/websites\n\n**Device Protection:**\n• Keep OS and apps updated\n• Use antivirus software\n• Avoid public Wi-Fi for sensitive tasks\n• Turn off Bluetooth/location when unused\n\n**Shopping Safety:**\n• Use verified websites\n• Prefer COD payments\n• Check seller reviews\n\n**Child Protection:**\n• Educate children about online risks\n• Use parental controls\n• Monitor online activities'
      ],
      actions: [
        { text: 'Password Security Guide', action: 'password_guide' },
        { text: 'Device Protection Tips', action: 'device_protection' }
      ]
    },

    // Emergency Help
    {
      name: 'emergency',
      patterns: ['emergency', 'urgent help', 'immediate help', 'being threatened', 'blackmail', 'help me'],
      responses: [
        '🚨 **Emergency Cyber Crime Support:**\n\n**Immediate Actions:**\n1. **Don\'t panic** - Help is available\n2. **Don\'t pay** any ransom or demands\n3. **Don\'t delete** evidence\n4. **Contact authorities** immediately\n\n**Emergency Contacts:**\n• **Cyber Crime Helpline**: 1930\n• **National Emergency**: 112\n• **Women Helpline**: 181\n• **Child Helpline**: 1098\n\n**For Immediate Threats:**\n• Screenshot all evidence\n• Block the perpetrator\n• Report to platform (social media/app)\n• File police complaint\n\n**DeepCytes Emergency Response:**\nOur forensics team can assist with evidence collection and legal support.'
      ],
      links: [
        { text: 'Emergency Report Portal', url: 'https://cybercrime.gov.in' }
      ],
      actions: [
        { text: 'Call Emergency Helpline', action: 'call_emergency' },
        { text: 'Contact DeepCytes', action: 'contact_deepcytes' }
      ]
    },

    // DeepCytes Services
    {
      name: 'deepcytes_services',
      patterns: ['deepcytes services', 'what do you offer', 'cyber intelligence', 'forensics', 'training'],
      responses: [
        '🛡️ **DeepCytes Core Services:**\n\n**1. Cyber Threat Intelligence**\n• Real-time threat detection\n• Advanced threat analysis\n• Proactive threat mitigation\n\n**2. Ransomware Protection**\n• Detection modules\n• Incident response\n• Data recovery solutions\n\n**3. Digital Forensics**\n• Legal investigation support\n• Evidence collection\n• Court-admissible reports\n\n**4. Regulatory Compliance**\n• Help meet cybersecurity laws\n• Compliance auditing\n• Policy development\n\n**5. Cybersecurity Training**\n• Law enforcement training\n• Government official programs\n• Professional certification\n\n**Trusted by:** Governments, law enforcement agencies, and enterprises worldwide.'
      ],
      links: [
        { text: 'Learn More About Services', url: 'https://www.deepcytes.io' }
      ],
      actions: [
        { text: 'Request Consultation', action: 'request_consultation' }
      ]
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced ML-based intent recognition
  const classifyIntent = (userMessage: string): Intent | null => {
    const message = userMessage.toLowerCase();
    let bestMatch: Intent | null = null;
    let highestScore = 0;

    for (const intent of intents) {
      let score = 0;
      
      // Pattern matching with fuzzy logic
      for (const pattern of intent.patterns) {
        const patternWords = pattern.toLowerCase().split(' ');
        const messageWords = message.split(' ');
        
        // Calculate word overlap score
        const overlap = patternWords.filter(word => 
          messageWords.some(msgWord => 
            msgWord.includes(word) || word.includes(msgWord) || 
            levenshteinDistance(word, msgWord) <= 2
          )
        ).length;
        
        const patternScore = (overlap / patternWords.length) * 100;
        score = Math.max(score, patternScore);
      }
      
      // Boost score for exact keyword matches
      const keywords = intent.patterns.join(' ').toLowerCase().split(' ');
      for (const keyword of keywords) {
        if (message.includes(keyword)) {
          score += 20;
        }
      }
      
      if (score > highestScore && score > 30) { // Minimum confidence threshold
        highestScore = score;
        bestMatch = intent;
      }
    }
    
    return bestMatch;
  };

  // Levenshtein distance for fuzzy matching
  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[str2.length][str1.length];
  };

  // Generate intelligent response
  const generateResponse = (userMessage: string): Message => {
    const intent = classifyIntent(userMessage);
    
    if (intent) {
      const response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
      return {
        id: Date.now().toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        links: intent.links,
        actions: intent.actions
      };
    }
    
    // Fallback response with helpful suggestions
    return {
      id: Date.now().toString(),
      text: 'I understand you\'re asking about cybersecurity. While I may not have a specific answer for that question, I can help you with:\n\n• **Cybercrime Information** - Types and prevention\n• **Report Assistance** - How to file complaints\n• **Legal Guidance** - Indian cyber laws\n• **Safety Tips** - Protect yourself online\n• **DeepCytes Services** - Our AI-powered solutions\n\nTry asking about specific topics like "phishing", "how to report", or "cyber laws". For complex issues, contact our experts or call 1930.',
      sender: 'bot',
      timestamp: new Date(),
      actions: [
        { text: 'Learn About Cybercrimes', action: 'learn_crimes' },
        { text: 'Report a Crime', action: 'report_crime' },
        { text: 'Contact Expert', action: 'contact_expert' }
      ]
    };
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

    // Simulate AI processing time
    setTimeout(() => {
      const botResponse = generateResponse(inputText);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  const handleAction = (action: string) => {
    const actionResponses: { [key: string]: string } = {
      'report_financial': 'I\'ll guide you through reporting financial fraud. Please visit cybercrime.gov.in or call 1930 immediately. Have your transaction details, screenshots, and bank statements ready.',
      'financial_safety': 'Here are key financial safety tips:\n• Never share OTPs or CVVs\n• Verify payment requests independently\n• Use official banking apps only\n• Enable transaction alerts\n• Check statements regularly',
      'call_emergency': 'For immediate help, call:\n• Cyber Crime Helpline: 1930\n• National Emergency: 112\n• Women Helpline: 181',
      'contact_deepcytes': 'Contact DeepCytes for expert assistance:\n• Website: www.deepcytes.io\n• Emergency forensics support available\n• Professional consultation services',
      'start_report': 'Let me guide you to our reporting section where you can file a detailed complaint with all necessary information.',
    };

    const response = actionResponses[action] || 'I\'ll help you with that. Please provide more details about your specific situation.';
    
    const botMessage: Message = {
      id: Date.now().toString(),
      text: response,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);

    // Handle specific actions
    if (action === 'start_report') {
      setTimeout(() => {
        window.location.href = '/report';
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 group"
        title="Open CyberSafe AI Assistant"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AI Assistant
        </div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${
      isMinimized 
        ? 'w-72 sm:w-80 h-14 sm:h-16' 
        : 'w-80 sm:w-96 h-96 sm:h-[500px]'
    }`}>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 sm:p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="bg-white/20 p-1.5 sm:p-2 rounded-full">
            <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base">CyberSafe AI</h3>
            <p className="text-xs text-blue-100">
              {isTyping ? 'Analyzing...' : 'Powered by DeepCytes'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            title={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" /> : <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            title="Close"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-64 sm:h-80 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[85%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`p-1.5 sm:p-2 rounded-full flex-shrink-0 ${
                    message.sender === 'user' ? 'bg-blue-100' : 'bg-gradient-to-r from-purple-100 to-blue-100'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    ) : (
                      <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                    )}
                  </div>
                  <div className={`p-2 sm:p-3 rounded-lg max-w-full ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 shadow-sm border'
                  }`}>
                    <div 
                      className="text-xs sm:text-sm whitespace-pre-wrap break-words"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
                    />
                    
                    {/* Action Buttons */}
                    {message.actions && (
                      <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                        {message.actions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => handleAction(action.action)}
                            className="block w-full text-left px-2 sm:px-3 py-1 sm:py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-xs sm:text-sm font-medium transition-colors"
                          >
                            {action.text}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* Links */}
                    {message.links && (
                      <div className="mt-2 sm:mt-3 space-y-1">
                        {message.links.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium"
                          >
                            <span>{link.text}</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    )}
                    
                    <div className={`text-xs mt-1 sm:mt-2 ${
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
                <div className="flex items-start space-x-2 max-w-[85%]">
                  <div className="p-1.5 sm:p-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100">
                    <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                  </div>
                  <div className="p-2 sm:p-3 rounded-lg bg-white shadow-sm border">
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
          <div className="p-3 sm:p-4 border-t border-gray-200 bg-white rounded-b-xl">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about cybercrimes, reporting, or safety..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>Powered by DeepCytes AI</span>
              <div className="flex items-center space-x-2">
                <Phone className="h-3 w-3" />
                <span>Emergency: 1930</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;