import React from 'react';

export interface AdminUser {
  id: string;
  username: string;
  name: string | null;
  email: string | null;
  role: string;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  permissions: {
    canViewTransactions: boolean;
    canRefund: boolean;
    canViewRequests: boolean;
    canManageUsers: boolean;
  };
}

export interface PaymentTransaction {
  id: string;
  created_at: string;
  order_id: string;
  pay_id: string | null;
  service_type: 'contabilitate' | 'consultanta' | 'instruire';
  amount: number;
  currency: string;
  description: string | null;
  status: string;
  status_code: string | null;
  status_message: string | null;
  company_name: string | null;
  client_name: string | null;
  client_email: string | null;
  client_phone: string | null;
  card_number: string | null;
  rrn: string | null;
  approval: string | null;
  admin_notes: string | null;
}

export interface OCRequest {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  company_name: string | null;
  services: string[];
  message: string | null;
  source: string;
  status: string;
  admin_notes: string | null;
  assigned_to: string | null;
}

export interface CalculatorRequest {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  company_name: string | null;
  business_type: string | null;
  employee_count: number | null;
  estimated_price: number | null;
  message: string | null;
  status: string;
  admin_notes: string | null;
  assigned_to: string | null;
}

export interface ContactRequest {
  id: string;
  created_at: string;
  name: string;
  phone: string | null;
  email: string;
  company_name: string | null;
  subject: string | null;
  message: string;
  status: string;
  admin_notes: string | null;
  assigned_to: string | null;
}

export interface Stats {
  overview: {
    totalTransactions: number;
    successfulCount: number;
    failedCount: number;
    pendingCount: number;
    totalRevenue: number;
    conversionRate: string;
    newRequests: number;
    newOcRequests: number;
    newCalcRequests: number;
    newContactRequests: number;
  };
  dailyStats: { date: string; success: number; failed: number; revenue: number }[];
  byService: Record<string, { count: number; revenue: number }>;
}

export interface CalculatorPriceItem {
  id: string;
  category: string;
  key: string;
  label: string;
  description?: string;
  price: number;
  is_per_unit: boolean;
  sort_order: number;
  is_active: boolean;
}

export type ActivePage = 'dashboard' | 'transactions' | 'oc_requests' | 'calculator_requests' | 'contact_requests' | 'users' | 'settings' | 'prices';
