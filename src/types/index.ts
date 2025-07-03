export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  points: number;
  badges: Badge[];
  currentStreak: number;
  totalProgress: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export interface CrimeType {
  id: string;
  title: string;
  description: string;
  category: string;
  preventionTips: string[];
  reportingSteps: string[];
  icon: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface UserProgress {
  userId: string;
  crimeId: string;
  completed: boolean;
  completedAt?: string;
}