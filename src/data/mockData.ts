import { CrimeType, Badge } from '../types';

export const crimeTypes: CrimeType[] = [
  {
    id: '1',
    title: 'Phishing',
    description: 'Fraudulent attempts to obtain sensitive information by impersonating trustworthy entities',
    category: 'Email Fraud',
    severity: 'High',
    icon: 'Mail',
    preventionTips: [
      'Always verify sender email addresses',
      'Never click suspicious links',
      'Use two-factor authentication',
      'Keep software updated',
    ],
    reportingSteps: [
      'Do not respond to the phishing email',
      'Report to your email provider',
      'File a complaint at cybercrime.gov.in',
      'Contact your bank if financial information was compromised',
    ],
  },
  {
    id: '2',
    title: 'Identity Theft',
    description: 'Unauthorized use of personal information to commit fraud or other crimes',
    category: 'Personal Data',
    severity: 'Critical',
    icon: 'User',
    preventionTips: [
      'Monitor your credit reports regularly',
      'Secure personal documents',
      'Use strong, unique passwords',
      'Be cautious about sharing personal information',
    ],
    reportingSteps: [
      'Contact financial institutions immediately',
      'File a police report',
      'Report to cybercrime.gov.in',
      'Monitor accounts for unusual activity',
    ],
  },
  {
    id: '3',
    title: 'Online Fraud',
    description: 'Deceptive practices carried out over the internet to gain money or personal information',
    category: 'Financial Fraud',
    severity: 'High',
    icon: 'CreditCard',
    preventionTips: [
      'Verify website authenticity before transactions',
      'Use secure payment methods',
      'Read reviews and ratings',
      'Avoid deals that seem too good to be true',
    ],
    reportingSteps: [
      'Contact your bank or payment provider',
      'Gather evidence of the fraud',
      'File a complaint at cybercrime.gov.in',
      'Report to local police if significant amount involved',
    ],
  },
  {
    id: '4',
    title: 'Cyberbullying',
    description: 'Use of digital platforms to harass, threaten, or intimidate others',
    category: 'Harassment',
    severity: 'Medium',
    icon: 'MessageCircle',
    preventionTips: [
      'Use privacy settings on social media',
      'Block and report abusive users',
      'Think before you post',
      'Educate children about online behavior',
    ],
    reportingSteps: [
      'Document the harassment with screenshots',
      'Block the perpetrator',
      'Report to the platform',
      'File a complaint at cybercrime.gov.in',
    ],
  },
];

export const badges: Badge[] = [
  {
    id: '1',
    name: 'Security Aware',
    description: 'Learned about cyber security basics',
    icon: 'Award',
  },
  {
    id: '2',
    name: 'Phishing Expert',
    description: 'Mastered phishing awareness',
    icon: 'Shield',
  },
  {
    id: '3',
    name: 'Crime Reporter',
    description: 'Successfully reported a cyber crime',
    icon: 'AlertTriangle',
  },
  {
    id: '4',
    name: 'Community Helper',
    description: 'Helped others stay safe online',
    icon: 'Users',
  },
];