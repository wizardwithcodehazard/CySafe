import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ycqpvsihpuazwbgfrxwq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljcXB2c2locHVhendiZ2ZyeHdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMjMwMTYsImV4cCI6MjA2ODY5OTAxNn0.2Sh3BZBIeRn3I5He0s917vjJkFNuzX7YKi-NU1MroTU';

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return supabaseUrl && supabaseAnonKey && supabaseUrl.includes('supabase.co');
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'cybersafe-admin-portal'
    }
  }
});

// Security configuration
export const SECURITY_CONFIG = {
  JWT_EXPIRY: '30m',
  MAX_LOGIN_ATTEMPTS: 5,
  RATE_LIMIT: 100, // requests per minute
  PASSWORD_MIN_LENGTH: 12,
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes in milliseconds
  AUTHORIZED_ADMIN_EMAIL: 'cybersafeadmin@deepcytes.uk.in'
};

// Input sanitization utility
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/['"]/g, '') // Remove quotes
    .trim()
    .substring(0, 1000); // Limit length
};

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  
  const current = rateLimitStore.get(identifier);
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= SECURITY_CONFIG.RATE_LIMIT) {
    return false;
  }
  
  current.count++;
  return true;
};

// Helper function to check if Supabase is ready
export const isSupabaseReady = () => isSupabaseConfigured();