/*
  # CyberSafe Database Schema

  1. New Tables
    - `cybercrime_data`
      - `id` (uuid, primary key)
      - `type` (text)
      - `description` (text)
      - `date_reported` (timestamptz)
      - `status` (enum)
      - `severity` (enum)
      - `category` (text)
      - `prevention_tips` (text array)
      - `reporting_steps` (text array)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `hashed_password` (text)
      - `last_login` (timestamptz)
      - `login_attempts` (integer)
      - `locked_until` (timestamptz)
      - `role` (enum)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `user_reports`
      - `id` (uuid, primary key)
      - `report_type` (text)
      - `description` (text)
      - `contact_info` (jsonb)
      - `timestamp` (timestamptz)
      - `status` (enum)
      - `priority` (enum)
      - `assigned_to` (uuid, foreign key)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `audit_logs`
      - `id` (uuid, primary key)
      - `admin_id` (uuid, foreign key)
      - `action` (text)
      - `resource_type` (text)
      - `resource_id` (uuid)
      - `details` (jsonb)
      - `ip_address` (text)
      - `user_agent` (text)
      - `timestamp` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
    - Add indexes for performance
    - Add constraints for data integrity
*/

-- Create custom types
CREATE TYPE crime_status AS ENUM ('pending', 'investigating', 'resolved', 'closed');
CREATE TYPE crime_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE admin_role AS ENUM ('admin', 'moderator');
CREATE TYPE report_status AS ENUM ('new', 'reviewed', 'forwarded', 'resolved');
CREATE TYPE report_priority AS ENUM ('low', 'medium', 'high', 'urgent');

-- Create cybercrime_data table
CREATE TABLE IF NOT EXISTS cybercrime_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  description text NOT NULL,
  date_reported timestamptz DEFAULT now(),
  status crime_status DEFAULT 'pending',
  severity crime_severity DEFAULT 'medium',
  category text NOT NULL,
  prevention_tips text[] DEFAULT '{}',
  reporting_steps text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  hashed_password text NOT NULL,
  last_login timestamptz,
  login_attempts integer DEFAULT 0,
  locked_until timestamptz,
  role admin_role DEFAULT 'admin',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_reports table
CREATE TABLE IF NOT EXISTS user_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_type text NOT NULL,
  description text NOT NULL,
  contact_info jsonb NOT NULL,
  timestamp timestamptz DEFAULT now(),
  status report_status DEFAULT 'new',
  priority report_priority DEFAULT 'medium',
  assigned_to uuid REFERENCES admin_users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES admin_users(id) NOT NULL,
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id uuid,
  details jsonb DEFAULT '{}',
  ip_address text NOT NULL,
  user_agent text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE cybercrime_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for cybercrime_data
CREATE POLICY "Public can read cybercrime data"
  ON cybercrime_data
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage cybercrime data"
  ON cybercrime_data
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create policies for admin_users
CREATE POLICY "Admins can read admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update their own data"
  ON admin_users
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

-- Create policies for user_reports
CREATE POLICY "Anyone can create user reports"
  ON user_reports
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can manage user reports"
  ON user_reports
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create policies for audit_logs
CREATE POLICY "Admins can read audit logs"
  ON audit_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "System can create audit logs"
  ON audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_cybercrime_data_category ON cybercrime_data(category);
CREATE INDEX IF NOT EXISTS idx_cybercrime_data_status ON cybercrime_data(status);
CREATE INDEX IF NOT EXISTS idx_cybercrime_data_severity ON cybercrime_data(severity);
CREATE INDEX IF NOT EXISTS idx_cybercrime_data_created_at ON cybercrime_data(created_at);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_last_login ON admin_users(last_login);

CREATE INDEX IF NOT EXISTS idx_user_reports_status ON user_reports(status);
CREATE INDEX IF NOT EXISTS idx_user_reports_priority ON user_reports(priority);
CREATE INDEX IF NOT EXISTS idx_user_reports_created_at ON user_reports(created_at);
CREATE INDEX IF NOT EXISTS idx_user_reports_assigned_to ON user_reports(assigned_to);

CREATE INDEX IF NOT EXISTS idx_audit_logs_admin_id ON audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource_type ON audit_logs(resource_type);

-- Add constraints
ALTER TABLE cybercrime_data ADD CONSTRAINT check_type_not_empty CHECK (length(trim(type)) > 0);
ALTER TABLE cybercrime_data ADD CONSTRAINT check_description_not_empty CHECK (length(trim(description)) > 0);
ALTER TABLE cybercrime_data ADD CONSTRAINT check_category_not_empty CHECK (length(trim(category)) > 0);

ALTER TABLE admin_users ADD CONSTRAINT check_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
ALTER TABLE admin_users ADD CONSTRAINT check_login_attempts_positive CHECK (login_attempts >= 0);

ALTER TABLE user_reports ADD CONSTRAINT check_report_type_not_empty CHECK (length(trim(report_type)) > 0);
ALTER TABLE user_reports ADD CONSTRAINT check_description_not_empty CHECK (length(trim(description)) > 0);
ALTER TABLE user_reports ADD CONSTRAINT check_contact_info_has_name CHECK (contact_info ? 'name');
ALTER TABLE user_reports ADD CONSTRAINT check_contact_info_has_email CHECK (contact_info ? 'email');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_cybercrime_data_updated_at
  BEFORE UPDATE ON cybercrime_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_reports_updated_at
  BEFORE UPDATE ON user_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial admin user (password: CyberSafe2024!)
-- Note: In production, this should be done securely
INSERT INTO admin_users (email, hashed_password, role) VALUES 
('cybersafeadmin@deepcytes.uk.in', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/hqDxU6Cq6', 'admin')
ON CONFLICT (email) DO NOTHING;