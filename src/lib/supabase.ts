import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client for browser usage (limited permissions)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server client with service role (full permissions) - only use in API routes
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Types for database tables
export interface OCRequest {
  id?: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  phone: string;
  email?: string;
  company_name?: string;
  services: string[];
  message?: string;
  source?: 'oc_form' | 'calculator' | 'contact_page' | 'other';
  status?: 'new' | 'in_progress' | 'completed' | 'cancelled';
  ip_address?: string;
  user_agent?: string;
  page_url?: string;
  admin_notes?: string;
  assigned_to?: string;
}

export interface CalculatorRequest {
  id?: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  phone: string;
  email?: string;
  company_name?: string;
  business_type?: string;
  employee_count?: number;
  monthly_operations?: number;
  has_vat?: boolean;
  has_foreign_operations?: boolean;
  additional_services?: string[];
  estimated_price?: number;
  message?: string;
  status?: 'new' | 'in_progress' | 'completed' | 'cancelled';
  ip_address?: string;
  user_agent?: string;
  admin_notes?: string;
  assigned_to?: string;
}

export interface ContactRequest {
  id?: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  phone?: string;
  email: string;
  company_name?: string;
  subject?: string;
  message: string;
  status?: 'new' | 'in_progress' | 'completed' | 'cancelled';
  ip_address?: string;
  user_agent?: string;
  page_url?: string;
  admin_notes?: string;
  assigned_to?: string;
}

export interface PaymentTransaction {
  id?: string;
  created_at?: string;
  updated_at?: string;
  order_id: string;
  pay_id?: string;
  service_type: 'contabilitate' | 'consultanta' | 'instruire';
  amount: number;
  currency: string;
  description?: string;
  status: 'created' | 'pending' | 'ok' | 'failed' | 'declined' | 'timeout' | 'refunded';
  status_code?: string;
  status_message?: string;
  client_ip?: string;
  company_name?: string;
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  card_number?: string;
  rrn?: string;
  approval?: string;
  three_ds?: string;
  callback_received_at?: string;
  admin_notes?: string;
}
