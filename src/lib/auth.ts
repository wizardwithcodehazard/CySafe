import bcrypt from 'bcryptjs';
import { supabase, SECURITY_CONFIG, sanitizeInput } from './supabase';
import { Database } from '../types/database';

type AdminUser = Database['public']['Tables']['admin_users']['Row'];

export interface AuthResult {
  success: boolean;
  user?: AdminUser;
  error?: string;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Specific authorized credentials
const AUTHORIZED_CREDENTIALS = {
  email: 'cybersafeadmin@deepcytes.uk.in',
  password: 'Deepcytes@121#lol'
};

// Password validation
export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < SECURITY_CONFIG.PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${SECURITY_CONFIG.PASSWORD_MIN_LENGTH} characters long`);
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return { valid: errors.length === 0, errors };
};

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Verify password
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// Authenticate admin user with specific credentials
export const authenticateAdmin = async (credentials: LoginCredentials): Promise<AuthResult> => {
  try {
    const sanitizedEmail = sanitizeInput(credentials.email.toLowerCase());
    
    // Check if email matches authorized email
    if (sanitizedEmail !== AUTHORIZED_CREDENTIALS.email) {
      return { success: false, error: 'Unauthorized email address' };
    }
    
    // Check if password matches authorized password
    if (credentials.password !== AUTHORIZED_CREDENTIALS.password) {
      return { success: false, error: 'Invalid credentials' };
    }
    
    // Create mock user object for successful authentication
    const mockUser: AdminUser = {
      id: 'admin-001',
      email: AUTHORIZED_CREDENTIALS.email,
      hashed_password: '', // Don't return password hash
      last_login: new Date().toISOString(),
      login_attempts: 0,
      locked_until: null,
      role: 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Generate session token
    const token = btoa(JSON.stringify({
      userId: mockUser.id,
      email: mockUser.email,
      role: mockUser.role,
      timestamp: Date.now()
    }));
    
    return { 
      success: true, 
      user: mockUser,
      token 
    };
    
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, error: 'Authentication failed' };
  }
};

// Validate session token
export const validateSession = (token: string): { valid: boolean; userId?: string; email?: string } => {
  try {
    const decoded = JSON.parse(atob(token));
    const now = Date.now();
    
    // Check if token is expired
    if (now - decoded.timestamp > SECURITY_CONFIG.SESSION_TIMEOUT) {
      return { valid: false };
    }
    
    // Verify the token belongs to authorized user
    if (decoded.email !== AUTHORIZED_CREDENTIALS.email) {
      return { valid: false };
    }
    
    return { 
      valid: true, 
      userId: decoded.userId, 
      email: decoded.email 
    };
  } catch {
    return { valid: false };
  }
};

// Log audit action (mock implementation)
export const logAuditAction = async (
  adminId: string,
  action: string,
  resourceType: string,
  resourceId?: string,
  details?: Record<string, any>
): Promise<void> => {
  try {
    // In a real implementation, this would log to the database
    console.log('Audit Log:', {
      admin_id: adminId,
      action,
      resource_type: resourceType,
      resource_id: resourceId || null,
      details: details || {},
      ip_address: 'unknown',
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to log audit action:', error);
  }
};