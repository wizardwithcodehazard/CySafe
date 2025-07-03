export interface Database {
  public: {
    Tables: {
      cybercrime_data: {
        Row: {
          id: string;
          type: string;
          description: string;
          date_reported: string;
          status: 'pending' | 'investigating' | 'resolved' | 'closed';
          severity: 'low' | 'medium' | 'high' | 'critical';
          category: string;
          prevention_tips: string[];
          reporting_steps: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          type: string;
          description: string;
          date_reported?: string;
          status?: 'pending' | 'investigating' | 'resolved' | 'closed';
          severity?: 'low' | 'medium' | 'high' | 'critical';
          category: string;
          prevention_tips?: string[];
          reporting_steps?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          type?: string;
          description?: string;
          date_reported?: string;
          status?: 'pending' | 'investigating' | 'resolved' | 'closed';
          severity?: 'low' | 'medium' | 'high' | 'critical';
          category?: string;
          prevention_tips?: string[];
          reporting_steps?: string[];
          updated_at?: string;
        };
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          hashed_password: string;
          last_login: string | null;
          login_attempts: number;
          locked_until: string | null;
          role: 'admin' | 'moderator';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          hashed_password: string;
          last_login?: string | null;
          login_attempts?: number;
          locked_until?: string | null;
          role?: 'admin' | 'moderator';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          hashed_password?: string;
          last_login?: string | null;
          login_attempts?: number;
          locked_until?: string | null;
          role?: 'admin' | 'moderator';
          updated_at?: string;
        };
      };
      user_reports: {
        Row: {
          id: string;
          report_type: string;
          description: string;
          contact_info: {
            name: string;
            email: string;
            phone?: string;
          };
          timestamp: string;
          status: 'new' | 'reviewed' | 'forwarded' | 'resolved';
          priority: 'low' | 'medium' | 'high' | 'urgent';
          assigned_to: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          report_type: string;
          description: string;
          contact_info: {
            name: string;
            email: string;
            phone?: string;
          };
          timestamp?: string;
          status?: 'new' | 'reviewed' | 'forwarded' | 'resolved';
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          report_type?: string;
          description?: string;
          contact_info?: {
            name: string;
            email: string;
            phone?: string;
          };
          timestamp?: string;
          status?: 'new' | 'reviewed' | 'forwarded' | 'resolved';
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          assigned_to?: string | null;
          updated_at?: string;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          admin_id: string;
          action: string;
          resource_type: string;
          resource_id: string | null;
          details: Record<string, any>;
          ip_address: string;
          user_agent: string;
          timestamp: string;
        };
        Insert: {
          id?: string;
          admin_id: string;
          action: string;
          resource_type: string;
          resource_id?: string | null;
          details?: Record<string, any>;
          ip_address: string;
          user_agent: string;
          timestamp?: string;
        };
        Update: {
          id?: string;
          admin_id?: string;
          action?: string;
          resource_type?: string;
          resource_id?: string | null;
          details?: Record<string, any>;
          ip_address?: string;
          user_agent?: string;
          timestamp?: string;
        };
      };
    };
  };
}