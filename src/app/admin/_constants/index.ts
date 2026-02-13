import React from 'react';
import { Clock, CheckCircle2, XCircle, AlertCircle, Bell, Undo2 } from 'lucide-react';
import type { ActivePage } from '../_types';

export const SERVICE_NAMES: Record<string, string> = {
  contabilitate: 'Contabilitate',
  consultanta: 'Consultanță',
  instruire: 'Instruire',
};

export const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  created: { label: 'Creat', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300', icon: Clock },
  pending: { label: 'În așteptare', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: Clock },
  ok: { label: 'Reușit', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: CheckCircle2 },
  failed: { label: 'Eșuat', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: XCircle },
  declined: { label: 'Refuzat', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: XCircle },
  timeout: { label: 'Expirat', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', icon: AlertCircle },
  refunded: { label: 'Returnat', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', icon: Undo2 },
  new: { label: 'Nou', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: Bell },
  in_progress: { label: 'În lucru', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: Clock },
  completed: { label: 'Finalizat', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: CheckCircle2 },
  cancelled: { label: 'Anulat', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300', icon: XCircle },
};

export const REQUEST_STATUSES = ['new', 'in_progress', 'completed', 'cancelled'];

export const CATEGORY_NAMES: Record<string, string> = {
  legal_form: 'Forme juridice',
  activity_type: 'Tipuri de activitate',
  operations: 'Operații',
  additional: 'Parametri suplimentari',
  per_unit: 'Per unitate',
  equipment: 'Echipament',
};

export const pageTitles: Record<ActivePage, string> = {
  dashboard: 'Dashboard',
  transactions: 'Tranzacții',
  oc_requests: 'Cereri Servicii',
  calculator_requests: 'Cereri Calculator',
  contact_requests: 'Mesaje Contact',
  users: 'Utilizatori',
  settings: 'Setări',
  prices: 'Prețuri Calculator',
};
