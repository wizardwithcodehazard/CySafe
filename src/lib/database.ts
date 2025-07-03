import { supabase, sanitizeInput } from './supabase';
import { Database } from '../types/database';
import { logAuditAction } from './auth';

type CybercrimeData = Database['public']['Tables']['cybercrime_data']['Row'];
type UserReport = Database['public']['Tables']['user_reports']['Row'];

// CRUD Operations for Cybercrime Data
export class CybercrimeService {
  static async getAll(): Promise<{ data: CybercrimeData[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('cybercrime_data')
        .select('*')
        .order('created_at', { ascending: false });
      
      return { data, error: error?.message || null };
    } catch (error) {
      return { data: null, error: 'Failed to fetch cybercrime data' };
    }
  }
  
  static async getById(id: string): Promise<{ data: CybercrimeData | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('cybercrime_data')
        .select('*')
        .eq('id', id)
        .single();
      
      return { data, error: error?.message || null };
    } catch (error) {
      return { data: null, error: 'Failed to fetch cybercrime data' };
    }
  }
  
  static async create(
    crimeData: Database['public']['Tables']['cybercrime_data']['Insert'],
    adminId: string
  ): Promise<{ data: CybercrimeData | null; error: string | null }> {
    try {
      // Sanitize inputs
      const sanitizedData = {
        ...crimeData,
        type: sanitizeInput(crimeData.type),
        description: sanitizeInput(crimeData.description),
        category: sanitizeInput(crimeData.category),
        prevention_tips: crimeData.prevention_tips?.map(tip => sanitizeInput(tip)) || [],
        reporting_steps: crimeData.reporting_steps?.map(step => sanitizeInput(step)) || []
      };
      
      const { data, error } = await supabase
        .from('cybercrime_data')
        .insert(sanitizedData)
        .select()
        .single();
      
      if (data && !error) {
        await logAuditAction(adminId, 'CREATE', 'cybercrime_data', data.id, sanitizedData);
      }
      
      return { data, error: error?.message || null };
    } catch (error) {
      return { data: null, error: 'Failed to create cybercrime data' };
    }
  }
  
  static async update(
    id: string,
    updates: Database['public']['Tables']['cybercrime_data']['Update'],
    adminId: string
  ): Promise<{ data: CybercrimeData | null; error: string | null }> {
    try {
      // Sanitize inputs
      const sanitizedUpdates = {
        ...updates,
        type: updates.type ? sanitizeInput(updates.type) : undefined,
        description: updates.description ? sanitizeInput(updates.description) : undefined,
        category: updates.category ? sanitizeInput(updates.category) : undefined,
        prevention_tips: updates.prevention_tips?.map(tip => sanitizeInput(tip)),
        reporting_steps: updates.reporting_steps?.map(step => sanitizeInput(step)),
        updated_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('cybercrime_data')
        .update(sanitizedUpdates)
        .eq('id', id)
        .select()
        .single();
      
      if (data && !error) {
        await logAuditAction(adminId, 'UPDATE', 'cybercrime_data', id, sanitizedUpdates);
      }
      
      return { data, error: error?.message || null };
    } catch (error) {
      return { data: null, error: 'Failed to update cybercrime data' };
    }
  }
  
  static async delete(id: string, adminId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from('cybercrime_data')
        .delete()
        .eq('id', id);
      
      if (!error) {
        await logAuditAction(adminId, 'DELETE', 'cybercrime_data', id);
      }
      
      return { success: !error, error: error?.message || null };
    } catch (error) {
      return { success: false, error: 'Failed to delete cybercrime data' };
    }
  }
}

// CRUD Operations for User Reports
export class UserReportService {
  static async getAll(): Promise<{ data: UserReport[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('user_reports')
        .select('*')
        .order('created_at', { ascending: false });
      
      return { data, error: error?.message || null };
    } catch (error) {
      return { data: null, error: 'Failed to fetch user reports' };
    }
  }
  
  static async create(
    reportData: Database['public']['Tables']['user_reports']['Insert']
  ): Promise<{ data: UserReport | null; error: string | null }> {
    try {
      // Sanitize inputs
      const sanitizedData = {
        ...reportData,
        report_type: sanitizeInput(reportData.report_type),
        description: sanitizeInput(reportData.description),
        contact_info: {
          name: sanitizeInput(reportData.contact_info.name),
          email: sanitizeInput(reportData.contact_info.email),
          phone: reportData.contact_info.phone ? sanitizeInput(reportData.contact_info.phone) : undefined
        }
      };
      
      const { data, error } = await supabase
        .from('user_reports')
        .insert(sanitizedData)
        .select()
        .single();
      
      return { data, error: error?.message || null };
    } catch (error) {
      return { data: null, error: 'Failed to create user report' };
    }
  }
  
  static async updateStatus(
    id: string,
    status: UserReport['status'],
    adminId: string
  ): Promise<{ data: UserReport | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('user_reports')
        .update({ 
          status, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)
        .select()
        .single();
      
      if (data && !error) {
        await logAuditAction(adminId, 'UPDATE_STATUS', 'user_reports', id, { status });
      }
      
      return { data, error: error?.message || null };
    } catch (error) {
      return { data: null, error: 'Failed to update report status' };
    }
  }
}

// Analytics Service
export class AnalyticsService {
  static async getDashboardStats(): Promise<{
    totalCrimes: number;
    totalReports: number;
    pendingReports: number;
    resolvedReports: number;
    error: string | null;
  }> {
    try {
      const [crimesResult, reportsResult, pendingResult, resolvedResult] = await Promise.all([
        supabase.from('cybercrime_data').select('id', { count: 'exact' }),
        supabase.from('user_reports').select('id', { count: 'exact' }),
        supabase.from('user_reports').select('id', { count: 'exact' }).eq('status', 'new'),
        supabase.from('user_reports').select('id', { count: 'exact' }).eq('status', 'resolved')
      ]);
      
      return {
        totalCrimes: crimesResult.count || 0,
        totalReports: reportsResult.count || 0,
        pendingReports: pendingResult.count || 0,
        resolvedReports: resolvedResult.count || 0,
        error: null
      };
    } catch (error) {
      return {
        totalCrimes: 0,
        totalReports: 0,
        pendingReports: 0,
        resolvedReports: 0,
        error: 'Failed to fetch dashboard statistics'
      };
    }
  }
  
  static async getRecentActivity(limit: number = 10): Promise<{
    data: Array<{
      id: string;
      action: string;
      resource_type: string;
      timestamp: string;
      admin_email?: string;
    }>;
    error: string | null;
  }> {
    try {
      const { data, error } = await supabase
        .from('audit_logs')
        .select(`
          id,
          action,
          resource_type,
          timestamp,
          admin_users!inner(email)
        `)
        .order('timestamp', { ascending: false })
        .limit(limit);
      
      const formattedData = data?.map(item => ({
        id: item.id,
        action: item.action,
        resource_type: item.resource_type,
        timestamp: item.timestamp,
        admin_email: (item.admin_users as any)?.email
      })) || [];
      
      return { data: formattedData, error: error?.message || null };
    } catch (error) {
      return { data: [], error: 'Failed to fetch recent activity' };
    }
  }
}