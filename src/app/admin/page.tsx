'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  BarChart3,
  Bell,
  Building2,
  Calculator,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  CreditCard,
  Download,
  Edit,
  FileText,
  Filter,
  Home,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Save,
  Search,
  Settings,
  Trash2,
  TrendingUp,
  Undo2,
  User,
  UserPlus,
  Users,
  XCircle,
  AlertCircle,
  Eye,
  ChevronRight,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuBadge,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Toaster, toast } from 'sonner';
import { supabase } from '@/lib/supabase';

// Types
interface AdminUser {
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

interface PaymentTransaction {
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

interface OCRequest {
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

interface CalculatorRequest {
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

interface ContactRequest {
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

interface Stats {
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

// Constants
const SERVICE_NAMES: Record<string, string> = {
  contabilitate: 'Contabilitate',
  consultanta: 'Consultanță',
  instruire: 'Instruire',
};

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
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

const REQUEST_STATUSES = ['new', 'in_progress', 'completed', 'cancelled'];

type ActivePage = 'dashboard' | 'transactions' | 'oc_requests' | 'calculator_requests' | 'contact_requests' | 'users' | 'settings' | 'prices';

interface CalculatorPriceItem {
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

const CATEGORY_NAMES: Record<string, string> = {
  legal_form: 'Forme juridice',
  activity_type: 'Tipuri de activitate',
  operations: 'Operații',
  additional: 'Parametri suplimentari',
  per_unit: 'Per unitate',
  equipment: 'Echipament',
};

// Helper functions
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('ro-MD', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatShortDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ro-MD', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat('ro-MD', { minimumFractionDigits: 2 }).format(amount);
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.created;
  const Icon = config.icon;
  return (
    <Badge variant="secondary" className={`${config.color} gap-1 font-medium`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}

// Mini chart component
function MiniChart({ data }: { data: { date: string; success: number; revenue: number }[] }) {
  if (data.length === 0) return <div className="text-sm text-muted-foreground">Nu sunt date</div>;

  const maxRevenue = Math.max(...data.map(d => d.revenue), 1);

  return (
    <div className="flex items-end gap-1 h-20">
      {data.slice(-14).map((d, i) => (
        <div
          key={i}
          className="flex-1 bg-primary/80 hover:bg-primary rounded-t transition-colors min-w-1 cursor-pointer"
          style={{ height: `${Math.max((d.revenue / maxRevenue) * 100, 4)}%` }}
          title={`${d.date}: ${formatMoney(d.revenue)} MDL`}
        />
      ))}
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, subtitle, icon: Icon, trend }: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: { value: number; positive: boolean };
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        {trend && (
          <p className={`text-xs mt-1 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.positive ? '+' : ''}{trend.value}% față de luna trecută
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  // Data state
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [ocRequests, setOcRequests] = useState<OCRequest[]>([]);
  const [calculatorRequests, setCalculatorRequests] = useState<CalculatorRequest[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  // UI state
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<PaymentTransaction | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<{ data: OCRequest | CalculatorRequest | ContactRequest; table: string } | null>(null);
  const [refundAmount, setRefundAmount] = useState('');
  const [refundLoading, setRefundLoading] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  // User management state
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [newUser, setNewUser] = useState({ username: '', password: '', name: '', email: '', role: 'admin' });

  // Price management state
  const [calculatorPrices, setCalculatorPrices] = useState<CalculatorPriceItem[]>([]);
  const [editingPrice, setEditingPrice] = useState<CalculatorPriceItem | null>(null);
  const [showPriceDialog, setShowPriceDialog] = useState(false);
  const [priceForm, setPriceForm] = useState({ label: '', price: 0, description: '' });

  // Notifications & Realtime
  const [lastRequestCount, setLastRequestCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false);

  // Fetch functions
  const fetchData = useCallback(async () => {
    if (!authToken) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/data', {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setTransactions(data.transactions || []);
        setOcRequests(data.ocRequests || []);
        setCalculatorRequests(data.calculatorRequests || []);
        setContactRequests(data.contactRequests || []);

        const newCount = (data.ocRequests?.filter((r: OCRequest) => r.status === 'new').length || 0) +
          (data.calculatorRequests?.filter((r: CalculatorRequest) => r.status === 'new').length || 0) +
          (data.contactRequests?.filter((r: ContactRequest) => r.status === 'new').length || 0);

        if (lastRequestCount > 0 && newCount > lastRequestCount && audioRef.current) {
          audioRef.current.play().catch(() => { });
        }
        setLastRequestCount(newCount);
      } else if (res.status === 401) {
        handleLogout();
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
    setLoading(false);
  }, [authToken, lastRequestCount]);

  const fetchStats = useCallback(async () => {
    if (!authToken) return;
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, [authToken]);

  const fetchUsers = useCallback(async () => {
    if (!authToken || !currentUser?.permissions.canManageUsers) return;
    try {
      const res = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAdminUsers(data.users || []);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  }, [authToken, currentUser?.permissions.canManageUsers]);

  const fetchPrices = useCallback(async () => {
    if (!authToken) return;
    try {
      const res = await fetch('/api/admin/prices', {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCalculatorPrices(data.prices || []);
      }
    } catch (err) {
      console.error('Failed to fetch prices:', err);
    }
  }, [authToken]);

  // Auth functions
  useEffect(() => {
    const savedToken = sessionStorage.getItem('admin_token');
    const savedUser = sessionStorage.getItem('admin_user');
    if (savedToken && savedUser) {
      try {
        const tokenData = JSON.parse(atob(savedToken));
        if (tokenData.exp > Date.now()) {
          setAuthToken(savedToken);
          setCurrentUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem('admin_token');
          sessionStorage.removeItem('admin_user');
        }
      } catch {
        sessionStorage.removeItem('admin_token');
        sessionStorage.removeItem('admin_user');
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && authToken) {
      fetchData();
      fetchStats();
      fetchUsers();
      fetchPrices();

      // Fallback polling every 60 seconds (in case realtime fails)
      const interval = setInterval(() => {
        fetchStats();
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated, authToken, fetchData, fetchStats, fetchUsers]);

  // Supabase Realtime subscription
  useEffect(() => {
    if (!isAuthenticated) return;

    const channel = supabase
      .channel('admin-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'oc_requests' },
        (payload) => {
          const newRequest = payload.new as OCRequest;
          setOcRequests(prev => [newRequest, ...prev]);
          toast.success('Cerere nouă servicii', {
            description: `${newRequest.name} - ${newRequest.phone}`,
            action: {
              label: 'Vezi',
              onClick: () => setActivePage('oc_requests'),
            },
          });
          audioRef.current?.play().catch(() => {});
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'calculator_requests' },
        (payload) => {
          const newRequest = payload.new as CalculatorRequest;
          setCalculatorRequests(prev => [newRequest, ...prev]);
          toast.success('Cerere nouă calculator', {
            description: `${newRequest.name} - ${newRequest.phone}`,
            action: {
              label: 'Vezi',
              onClick: () => setActivePage('calculator_requests'),
            },
          });
          audioRef.current?.play().catch(() => {});
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'contact_requests' },
        (payload) => {
          const newRequest = payload.new as ContactRequest;
          setContactRequests(prev => [newRequest, ...prev]);
          toast.success('Mesaj nou contact', {
            description: `${newRequest.name} - ${newRequest.email}`,
            action: {
              label: 'Vezi',
              onClick: () => setActivePage('contact_requests'),
            },
          });
          audioRef.current?.play().catch(() => {});
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'payment_transactions' },
        (payload) => {
          const newTx = payload.new as PaymentTransaction;
          setTransactions(prev => [newTx, ...prev]);
          if (newTx.status === 'ok') {
            toast.success('Plată nouă reușită', {
              description: `${newTx.client_name} - ${newTx.amount} ${newTx.currency}`,
              action: {
                label: 'Vezi',
                onClick: () => setActivePage('transactions'),
              },
            });
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'payment_transactions' },
        (payload) => {
          const updatedTx = payload.new as PaymentTransaction;
          setTransactions(prev => prev.map(tx => tx.id === updatedTx.id ? updatedTx : tx));
          if (updatedTx.status === 'ok' && payload.old && (payload.old as PaymentTransaction).status !== 'ok') {
            toast.success('Plată confirmată', {
              description: `${updatedTx.client_name} - ${updatedTx.amount} ${updatedTx.currency}`,
            });
            audioRef.current?.play().catch(() => {});
          }
        }
      )
      .subscribe((status) => {
        setIsRealtimeConnected(status === 'SUBSCRIBED');
        if (status === 'SUBSCRIBED') {
          console.log('Realtime connected');
        } else if (status === 'CHANNEL_ERROR') {
          console.error('Realtime connection error');
          toast.error('Eroare conexiune realtime', { description: 'Se va încerca reconectarea...' });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem('admin_token', data.token);
        sessionStorage.setItem('admin_user', JSON.stringify(data.user));
        setAuthToken(data.token);
        setCurrentUser(data.user);
        setIsAuthenticated(true);
      } else {
        setError(data.error || 'Autentificare eșuată');
      }
    } catch {
      setError('Eroare de conexiune');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_user');
    setAuthToken(null);
    setCurrentUser(null);
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // Action handlers
  const handleRefund = async () => {
    if (!selectedTransaction?.pay_id || !authToken) return;
    setRefundLoading(true);

    try {
      const res = await fetch('/api/admin/refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          payId: selectedTransaction.pay_id,
          amount: refundAmount ? parseFloat(refundAmount) : undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setShowRefundDialog(false);
        setSelectedTransaction(null);
        setRefundAmount('');
        fetchData();
        alert('Returnare efectuată cu succes!');
      } else {
        alert(`Eroare: ${data.error || 'Returnare eșuată'}`);
      }
    } catch {
      alert('Eroare de conexiune');
    }
    setRefundLoading(false);
  };

  const handleUpdateRequest = async () => {
    if (!selectedRequest || !authToken) return;
    setSaveLoading(true);

    try {
      const res = await fetch('/api/admin/requests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          id: selectedRequest.data.id,
          table: selectedRequest.table,
          status: editStatus,
          admin_notes: editNotes,
        }),
      });

      if (res.ok) {
        setSelectedRequest(null);
        fetchData();
      } else {
        const data = await res.json();
        alert(`Eroare: ${data.error}`);
      }
    } catch {
      alert('Eroare de conexiune');
    }
    setSaveLoading(false);
  };

  const handleExport = async (type: string) => {
    if (!authToken) return;

    const res = await fetch(`/api/admin/export?type=${type}`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleSaveUser = async () => {
    if (!authToken) return;
    setSaveLoading(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: editingUser ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(editingUser ? { id: editingUser.id, ...newUser } : newUser),
      });

      if (res.ok) {
        setShowUserDialog(false);
        setEditingUser(null);
        setNewUser({ username: '', password: '', name: '', email: '', role: 'admin' });
        fetchUsers();
      } else {
        const data = await res.json();
        alert(`Eroare: ${data.error}`);
      }
    } catch {
      alert('Eroare de conexiune');
    }
    setSaveLoading(false);
  };

  const handleDeleteUser = async (id: string) => {
    if (!authToken || !confirm('Sigur doriți să ștergeți acest utilizator?')) return;

    const res = await fetch(`/api/admin/users?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authToken}` },
    });

    if (res.ok) {
      fetchUsers();
    } else {
      const data = await res.json();
      alert(`Eroare: ${data.error}`);
    }
  };

  const handleUpdatePrice = async () => {
    if (!authToken || !editingPrice) return;
    setSaveLoading(true);

    try {
      const res = await fetch('/api/admin/prices', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          id: editingPrice.id,
          price: priceForm.price,
          label: priceForm.label,
          description: priceForm.description,
        }),
      });

      if (res.ok) {
        setShowPriceDialog(false);
        setEditingPrice(null);
        fetchPrices();
        toast.success('Preț actualizat cu succes');
      } else {
        const data = await res.json();
        toast.error(`Eroare: ${data.error}`);
      }
    } catch {
      toast.error('Eroare de conexiune');
    }
    setSaveLoading(false);
  };

  // Filter functions
  const filterItems = <T extends { name: string; phone?: string | null; email?: string | null; company_name?: string | null; status: string }>(items: T[]) => {
    return items.filter(item => {
      const matchesSearch = !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone?.includes(searchQuery) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company_name?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  };

  const filterTransactions = (items: PaymentTransaction[]) => {
    return items.filter(item => {
      const matchesSearch = !searchQuery ||
        item.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.client_phone?.includes(searchQuery) ||
        item.company_name?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  };

  // Page titles
  const pageTitles: Record<ActivePage, string> = {
    dashboard: 'Dashboard',
    transactions: 'Tranzacții',
    oc_requests: 'Cereri Servicii',
    calculator_requests: 'Cereri Calculator',
    contact_requests: 'Mesaje Contact',
    users: 'Utilizatori',
    settings: 'Setări',
    prices: 'Prețuri Calculator',
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardHeader className="space-y-1 pb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">EgoTax Admin</CardTitle>
            <CardDescription className="text-center">
              Introduceți datele de autentificare
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Utilizator</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Introduceți utilizatorul"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Parola</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Introduceți parola"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={loading || !username || !password}
              >
                {loading ? 'Se verifică...' : 'Autentificare'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const newRequestsCount = stats?.overview.newRequests || 0;

  return (
    <SidebarProvider>
      {/* Toaster for notifications */}
      <Toaster richColors position="top-right" />

      {/* Notification sound */}
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Onp2ZlZONkZaYm5mVko2KjI6Rk5OSkI2LjI+SlJSSkI2LjI+SlJSSkI2LjI+SkpKQjo2Mjo+QkZCPjo2Njo+QkZCPjo2Njo+Qj4+OjY2Ojo+Pj46NjY2Ojo+Pj46NjY2Ojo+Pjo6NjY2Ojo6Ojo6NjY2Njo6Ojo6NjY2Njo6Ojo2NjY2NjY6OjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2N" />

      {/* Sidebar */}
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-b border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Building2 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">EgoTax</span>
                  <span className="truncate text-xs text-muted-foreground">Admin Panel</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigare</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activePage === 'dashboard'}
                  onClick={() => setActivePage('dashboard')}
                  tooltip="Dashboard"
                >
                  <Home className="size-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activePage === 'transactions'}
                  onClick={() => setActivePage('transactions')}
                  tooltip="Tranzacții"
                >
                  <CreditCard className="size-4" />
                  <span>Tranzacții</span>
                </SidebarMenuButton>
                {(stats?.overview.pendingCount || 0) > 0 && (
                  <SidebarMenuBadge className="bg-yellow-500 text-white">
                    {stats?.overview.pendingCount}
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Cereri</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activePage === 'oc_requests'}
                  onClick={() => setActivePage('oc_requests')}
                  tooltip="Cereri Servicii"
                >
                  <FileText className="size-4" />
                  <span>Cereri Servicii</span>
                </SidebarMenuButton>
                {(stats?.overview.newOcRequests || 0) > 0 && (
                  <SidebarMenuBadge className="bg-red-500 text-white animate-pulse">
                    {stats?.overview.newOcRequests}
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activePage === 'calculator_requests'}
                  onClick={() => setActivePage('calculator_requests')}
                  tooltip="Cereri Calculator"
                >
                  <Calculator className="size-4" />
                  <span>Calculator</span>
                </SidebarMenuButton>
                {(stats?.overview.newCalcRequests || 0) > 0 && (
                  <SidebarMenuBadge className="bg-red-500 text-white animate-pulse">
                    {stats?.overview.newCalcRequests}
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activePage === 'contact_requests'}
                  onClick={() => setActivePage('contact_requests')}
                  tooltip="Mesaje Contact"
                >
                  <MessageSquare className="size-4" />
                  <span>Contact</span>
                </SidebarMenuButton>
                {(stats?.overview.newContactRequests || 0) > 0 && (
                  <SidebarMenuBadge className="bg-red-500 text-white animate-pulse">
                    {stats?.overview.newContactRequests}
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          {currentUser?.permissions.canManageUsers && (
            <SidebarGroup>
              <SidebarGroupLabel>Administrare</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activePage === 'users'}
                    onClick={() => setActivePage('users')}
                    tooltip="Utilizatori"
                  >
                    <Users className="size-4" />
                    <span>Utilizatori</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activePage === 'prices'}
                    onClick={() => setActivePage('prices')}
                    tooltip="Prețuri Calculator"
                  >
                    <Calculator className="size-4" />
                    <span>Prețuri</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          )}
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg bg-primary/10">
                        {currentUser?.name?.[0] || currentUser?.username?.[0] || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{currentUser?.name || currentUser?.username}</span>
                      <span className="truncate text-xs text-muted-foreground">{currentUser?.role}</span>
                    </div>
                    <ChevronRight className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  side="right"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel>Contul meu</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Deconectare
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* Main Content */}
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 flex-1">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" onClick={() => setActivePage('dashboard')}>
                    Admin
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{pageTitles[activePage]}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            {/* Realtime status indicator */}
            <div className="flex items-center gap-1" title={isRealtimeConnected ? 'Live mode activ' : 'Reconectare...'}>
              {isRealtimeConnected ? (
                <Wifi className="w-4 h-4 text-green-500" />
              ) : (
                <WifiOff className="w-4 h-4 text-yellow-500 animate-pulse" />
              )}
              <span className="text-xs text-muted-foreground hidden sm:inline">
                {isRealtimeConnected ? 'Live' : '...'}
              </span>
            </div>

            <Separator orientation="vertical" className="h-4" />

            {newRequestsCount > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                <Bell className="w-3 h-3 mr-1" />
                {newRequestsCount} noi
              </Badge>
            )}
            <Button variant="outline" size="sm" onClick={() => { fetchData(); fetchStats(); }} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Actualizează</span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Dashboard */}
          {activePage === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  title="Venituri totale"
                  value={`${formatMoney(stats?.overview.totalRevenue || 0)} MDL`}
                  icon={TrendingUp}
                />
                <StatCard
                  title="Plăți reușite"
                  value={stats?.overview.successfulCount || 0}
                  subtitle={`${stats?.overview.conversionRate || 0}% conversie`}
                  icon={CheckCircle2}
                />
                <StatCard
                  title="Cereri noi"
                  value={newRequestsCount}
                  subtitle="Necesită atenție"
                  icon={Bell}
                />
                <StatCard
                  title="Total tranzacții"
                  value={stats?.overview.totalTransactions || 0}
                  icon={CreditCard}
                />
              </div>

              {/* Charts Row */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Venituri (ultimele 14 zile)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MiniChart data={stats?.dailyStats || []} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Venituri pe servicii</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stats?.byService && Object.entries(stats.byService).map(([service, data]) => (
                        <div key={service} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-sm">{SERVICE_NAMES[service] || service}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium">{formatMoney(data.revenue)} MDL</span>
                            <span className="text-xs text-muted-foreground ml-2">({data.count})</span>
                          </div>
                        </div>
                      ))}
                      {(!stats?.byService || Object.keys(stats.byService).length === 0) && (
                        <p className="text-sm text-muted-foreground text-center py-4">Nu sunt date</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Export date</CardTitle>
                  <CardDescription>Descarcă datele în format CSV</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleExport('transactions')}>
                      <Download className="w-4 h-4 mr-2" />
                      Tranzacții
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport('oc_requests')}>
                      <Download className="w-4 h-4 mr-2" />
                      Cereri OC
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport('calculator_requests')}>
                      <Download className="w-4 h-4 mr-2" />
                      Calculator
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport('contact_requests')}>
                      <Download className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Activitate recentă</CardTitle>
                  <CardDescription>Ultimele tranzacții și cereri</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${tx.status === 'ok' ? 'bg-green-500' : tx.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                          <div>
                            <p className="text-sm font-medium">{tx.client_name || 'Client necunoscut'}</p>
                            <p className="text-xs text-muted-foreground">{SERVICE_NAMES[tx.service_type]}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{formatMoney(tx.amount)} {tx.currency}</p>
                          <p className="text-xs text-muted-foreground">{formatShortDate(tx.created_at)}</p>
                        </div>
                      </div>
                    ))}
                    {transactions.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">Nu sunt tranzacții</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Transactions Page */}
          {activePage === 'transactions' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Tranzacții</h2>
                  <p className="text-muted-foreground">
                    Total: {transactions.length} | Filtrate: {filterTransactions(transactions).length}
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Caută..."
                      className="pl-9 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toate</SelectItem>
                      <SelectItem value="ok">Reușite</SelectItem>
                      <SelectItem value="failed">Eșuate</SelectItem>
                      <SelectItem value="pending">În așteptare</SelectItem>
                      <SelectItem value="refunded">Returnate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Serviciu</TableHead>
                      <TableHead>Sumă</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Acțiuni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterTransactions(transactions).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          Nu sunt tranzacții
                        </TableCell>
                      </TableRow>
                    ) : (
                      filterTransactions(transactions).map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell className="font-mono text-xs">
                            {formatShortDate(tx.created_at)}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{tx.client_name || '-'}</p>
                              <p className="text-xs text-muted-foreground">{tx.company_name || tx.client_email || '-'}</p>
                            </div>
                          </TableCell>
                          <TableCell>{SERVICE_NAMES[tx.service_type]}</TableCell>
                          <TableCell className="font-medium">
                            {formatMoney(tx.amount)} {tx.currency}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={tx.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              {tx.client_phone && (
                                <Button variant="ghost" size="icon" asChild>
                                  <a href={`tel:${tx.client_phone}`}><Phone className="w-4 h-4" /></a>
                                </Button>
                              )}
                              {tx.client_email && (
                                <Button variant="ghost" size="icon" asChild>
                                  <a href={`mailto:${tx.client_email}`}><Mail className="w-4 h-4" /></a>
                                </Button>
                              )}
                              <Button variant="ghost" size="icon" onClick={() => setSelectedTransaction(tx)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              {tx.status === 'ok' && tx.pay_id && currentUser?.permissions.canRefund && (
                                <Button variant="ghost" size="icon" onClick={() => { setSelectedTransaction(tx); setRefundAmount(''); setShowRefundDialog(true); }}>
                                  <Undo2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {/* OC Requests Page */}
          {activePage === 'oc_requests' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Cereri Servicii</h2>
                  <p className="text-muted-foreground">Total: {ocRequests.length}</p>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Caută..." className="pl-9 w-64" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toate</SelectItem>
                      {REQUEST_STATUSES.map(s => <SelectItem key={s} value={s}>{STATUS_CONFIG[s]?.label || s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Servicii</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Acțiuni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterItems(ocRequests).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          Nu sunt cereri
                        </TableCell>
                      </TableRow>
                    ) : (
                      filterItems(ocRequests).map((req) => (
                        <TableRow key={req.id} className={req.status === 'new' ? 'bg-blue-50 dark:bg-blue-950/20' : ''}>
                          <TableCell className="font-mono text-xs">{formatShortDate(req.created_at)}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{req.name}</p>
                              <p className="text-xs text-muted-foreground">{req.company_name || '-'}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{req.phone}</p>
                              <p className="text-xs text-muted-foreground">{req.email || '-'}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {req.services?.slice(0, 2).map((s, i) => (
                                <Badge key={i} variant="outline" className="text-xs">{s}</Badge>
                              ))}
                              {(req.services?.length || 0) > 2 && (
                                <Badge variant="outline" className="text-xs">+{req.services.length - 2}</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell><StatusBadge status={req.status} /></TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" asChild><a href={`tel:${req.phone}`}><Phone className="w-4 h-4" /></a></Button>
                              {req.email && <Button variant="ghost" size="icon" asChild><a href={`mailto:${req.email}`}><Mail className="w-4 h-4" /></a></Button>}
                              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(`${req.name}\n${req.phone}\n${req.email || ''}`)}><Copy className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon" onClick={() => { setSelectedRequest({ data: req, table: 'oc_requests' }); setEditStatus(req.status); setEditNotes(req.admin_notes || ''); }}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {/* Calculator Requests Page */}
          {activePage === 'calculator_requests' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Cereri Calculator</h2>
                  <p className="text-muted-foreground">Total: {calculatorRequests.length}</p>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Caută..." className="pl-9 w-64" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toate</SelectItem>
                      {REQUEST_STATUSES.map(s => <SelectItem key={s} value={s}>{STATUS_CONFIG[s]?.label || s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Tip afacere</TableHead>
                      <TableHead>Preț estimat</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Acțiuni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterItems(calculatorRequests).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Nu sunt cereri
                        </TableCell>
                      </TableRow>
                    ) : (
                      filterItems(calculatorRequests).map((req) => (
                        <TableRow key={req.id} className={req.status === 'new' ? 'bg-blue-50 dark:bg-blue-950/20' : ''}>
                          <TableCell className="font-mono text-xs">{formatShortDate(req.created_at)}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{req.name}</p>
                              <p className="text-xs text-muted-foreground">{req.company_name || '-'}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{req.phone}</p>
                              <p className="text-xs text-muted-foreground">{req.email || '-'}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{req.business_type || '-'}</p>
                              {req.employee_count && <p className="text-xs text-muted-foreground">{req.employee_count} angajați</p>}
                            </div>
                          </TableCell>
                          <TableCell>
                            {req.estimated_price ? (
                              <Badge className="bg-primary/10 text-primary">{req.estimated_price} MDL</Badge>
                            ) : '-'}
                          </TableCell>
                          <TableCell><StatusBadge status={req.status} /></TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" asChild><a href={`tel:${req.phone}`}><Phone className="w-4 h-4" /></a></Button>
                              {req.email && <Button variant="ghost" size="icon" asChild><a href={`mailto:${req.email}`}><Mail className="w-4 h-4" /></a></Button>}
                              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(`${req.name}\n${req.phone}\n${req.email || ''}`)}><Copy className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon" onClick={() => { setSelectedRequest({ data: req, table: 'calculator_requests' }); setEditStatus(req.status); setEditNotes(req.admin_notes || ''); }}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {/* Contact Requests Page */}
          {activePage === 'contact_requests' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Mesaje Contact</h2>
                  <p className="text-muted-foreground">Total: {contactRequests.length}</p>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Caută..." className="pl-9 w-64" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toate</SelectItem>
                      {REQUEST_STATUSES.map(s => <SelectItem key={s} value={s}>{STATUS_CONFIG[s]?.label || s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Subiect</TableHead>
                      <TableHead>Mesaj</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Acțiuni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterItems(contactRequests).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          Nu sunt mesaje
                        </TableCell>
                      </TableRow>
                    ) : (
                      filterItems(contactRequests).map((req) => (
                        <TableRow key={req.id} className={req.status === 'new' ? 'bg-blue-50 dark:bg-blue-950/20' : ''}>
                          <TableCell className="font-mono text-xs">{formatShortDate(req.created_at)}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{req.name}</p>
                              <p className="text-xs text-muted-foreground">{req.email}</p>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[150px] truncate">{req.subject || '-'}</TableCell>
                          <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">{req.message}</TableCell>
                          <TableCell><StatusBadge status={req.status} /></TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              {req.phone && <Button variant="ghost" size="icon" asChild><a href={`tel:${req.phone}`}><Phone className="w-4 h-4" /></a></Button>}
                              <Button variant="ghost" size="icon" asChild><a href={`mailto:${req.email}`}><Mail className="w-4 h-4" /></a></Button>
                              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(`${req.name}\n${req.email}\n${req.phone || ''}`)}><Copy className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon" onClick={() => { setSelectedRequest({ data: req, table: 'contact_requests' }); setEditStatus(req.status); setEditNotes(req.admin_notes || ''); }}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {/* Users Page */}
          {activePage === 'users' && currentUser?.permissions.canManageUsers && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Utilizatori Admin</h2>
                  <p className="text-muted-foreground">Total: {adminUsers.length}</p>
                </div>
                <Button onClick={() => { setEditingUser(null); setNewUser({ username: '', password: '', name: '', email: '', role: 'admin' }); setShowUserDialog(true); }}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Adaugă utilizator
                </Button>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Utilizator</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Ultima autentificare</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Acțiuni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user.name?.[0] || user.username[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name || user.username}</p>
                              <p className="text-xs text-muted-foreground">@{user.username}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.email || '-'}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{user.role}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {user.last_login_at ? formatDate(user.last_login_at) : 'Niciodată'}
                        </TableCell>
                        <TableCell>
                          {user.is_active ? (
                            <Badge className="bg-green-100 text-green-700">Activ</Badge>
                          ) : (
                            <Badge variant="destructive">Inactiv</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => {
                              setEditingUser(user);
                              setNewUser({ username: user.username, password: '', name: user.name || '', email: user.email || '', role: user.role });
                              setShowUserDialog(true);
                            }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            {user.id !== currentUser?.id && (
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}

          {/* Prices Page */}
          {activePage === 'prices' && currentUser?.permissions.canManageUsers && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Prețuri Calculator</h2>
                <p className="text-muted-foreground">
                  Gestionați prețurile pentru calculatorul de costuri
                </p>
              </div>

              {Object.entries(
                calculatorPrices.reduce((acc, price) => {
                  if (!acc[price.category]) acc[price.category] = [];
                  acc[price.category].push(price);
                  return acc;
                }, {} as Record<string, CalculatorPriceItem[]>)
              ).map(([category, prices]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="text-lg">{CATEGORY_NAMES[category] || category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Denumire</TableHead>
                          <TableHead>Cheie</TableHead>
                          <TableHead>Descriere</TableHead>
                          <TableHead className="text-right">Preț (MDL)</TableHead>
                          <TableHead>Per unitate</TableHead>
                          <TableHead className="text-right">Acțiuni</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {prices.sort((a, b) => a.sort_order - b.sort_order).map((price) => (
                          <TableRow key={price.id}>
                            <TableCell className="font-medium">{price.label}</TableCell>
                            <TableCell className="font-mono text-xs text-muted-foreground">{price.key}</TableCell>
                            <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                              {price.description || '-'}
                            </TableCell>
                            <TableCell className="text-right font-bold">{price.price}</TableCell>
                            <TableCell>
                              {price.is_per_unit ? (
                                <Badge variant="outline" className="text-xs">Per unitate</Badge>
                              ) : '-'}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setEditingPrice(price);
                                  setPriceForm({
                                    label: price.label,
                                    price: price.price,
                                    description: price.description || '',
                                  });
                                  setShowPriceDialog(true);
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}

              {calculatorPrices.length === 0 && (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    <p>Nu sunt prețuri configurate.</p>
                    <p className="text-sm mt-2">
                      Rulați scriptul SQL din <code className="bg-muted px-1 rounded">supabase_calculator_prices.sql</code> pentru a adăuga prețurile implicite.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </SidebarInset>

      {/* Transaction Details Dialog */}
      <Dialog open={!!selectedTransaction && !showRefundDialog} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalii tranzacție</DialogTitle>
            <DialogDescription>Informații complete despre tranzacție</DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <StatusBadge status={selectedTransaction.status} />
                <span className="text-xl font-bold">{formatMoney(selectedTransaction.amount)} {selectedTransaction.currency}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Order ID</p>
                  <p className="font-mono text-xs bg-muted px-2 py-1 rounded">{selectedTransaction.order_id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Pay ID</p>
                  <p className="font-mono text-xs bg-muted px-2 py-1 rounded">{selectedTransaction.pay_id || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Serviciu</p>
                  <p>{SERVICE_NAMES[selectedTransaction.service_type]}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Data</p>
                  <p>{formatDate(selectedTransaction.created_at)}</p>
                </div>
                {selectedTransaction.company_name && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Companie</p>
                    <p>{selectedTransaction.company_name}</p>
                  </div>
                )}
                {selectedTransaction.client_name && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Client</p>
                    <p>{selectedTransaction.client_name}</p>
                  </div>
                )}
                {selectedTransaction.client_email && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Email</p>
                    <p>{selectedTransaction.client_email}</p>
                  </div>
                )}
                {selectedTransaction.client_phone && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Telefon</p>
                    <p>{selectedTransaction.client_phone}</p>
                  </div>
                )}
                {selectedTransaction.card_number && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Card</p>
                    <p className="font-mono">{selectedTransaction.card_number}</p>
                  </div>
                )}
                {selectedTransaction.rrn && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground">RRN</p>
                    <p className="font-mono">{selectedTransaction.rrn}</p>
                  </div>
                )}
              </div>
              {selectedTransaction.status_message && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Status Message</p>
                  <p className="text-sm">{selectedTransaction.status_message}</p>
                </div>
              )}
              <div className="flex gap-2 pt-4 border-t">
                {selectedTransaction.client_phone && (
                  <Button variant="outline" asChild className="flex-1">
                    <a href={`tel:${selectedTransaction.client_phone}`}><Phone className="w-4 h-4 mr-2" />Sună</a>
                  </Button>
                )}
                {selectedTransaction.client_email && (
                  <Button variant="outline" asChild className="flex-1">
                    <a href={`mailto:${selectedTransaction.client_email}`}><Mail className="w-4 h-4 mr-2" />Email</a>
                  </Button>
                )}
              </div>
              {selectedTransaction.status === 'ok' && selectedTransaction.pay_id && currentUser?.permissions.canRefund && (
                <Button className="w-full" variant="outline" onClick={() => { setRefundAmount(''); setShowRefundDialog(true); }}>
                  <Undo2 className="w-4 h-4 mr-2" />Efectuează returnare
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Refund Dialog */}
      <Dialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Returnare plată</DialogTitle>
            <DialogDescription>Suma totală: {formatMoney(selectedTransaction?.amount || 0)} {selectedTransaction?.currency}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Sumă de returnat (gol = returnare completă)</Label>
              <Input
                type="number"
                step="0.01"
                max={selectedTransaction?.amount}
                placeholder={`Max: ${selectedTransaction?.amount}`}
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
              />
            </div>
            <p className="text-sm text-muted-foreground">Atenție: Returnarea poate fi efectuată o singură dată.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRefundDialog(false)}>Anulează</Button>
            <Button onClick={handleRefund} disabled={refundLoading}>
              {refundLoading ? 'Se procesează...' : 'Confirmă returnarea'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Edit Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Editare cerere</DialogTitle>
            <DialogDescription>Actualizați statusul și notele pentru această cerere</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Nume</p>
                  <p className="font-medium">{selectedRequest.data.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Data</p>
                  <p>{formatDate(selectedRequest.data.created_at)}</p>
                </div>
                {'phone' in selectedRequest.data && selectedRequest.data.phone && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Telefon</p>
                    <p>{selectedRequest.data.phone}</p>
                  </div>
                )}
                {'email' in selectedRequest.data && selectedRequest.data.email && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Email</p>
                    <p>{selectedRequest.data.email}</p>
                  </div>
                )}
              </div>
              {'message' in selectedRequest.data && selectedRequest.data.message && (
                <div className="space-y-2">
                  <Label>Mesaj</Label>
                  <div className="p-3 bg-muted/50 rounded-lg text-sm max-h-32 overflow-y-auto">
                    {selectedRequest.data.message}
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {REQUEST_STATUSES.map(s => <SelectItem key={s} value={s}>{STATUS_CONFIG[s]?.label || s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Note admin</Label>
                <Textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Adaugă note..."
                  rows={3}
                />
              </div>
              <div className="flex gap-2 pt-4 border-t">
                {'phone' in selectedRequest.data && selectedRequest.data.phone && (
                  <Button variant="outline" asChild className="flex-1">
                    <a href={`tel:${selectedRequest.data.phone}`}><Phone className="w-4 h-4 mr-2" />Sună</a>
                  </Button>
                )}
                {'email' in selectedRequest.data && selectedRequest.data.email && (
                  <Button variant="outline" asChild className="flex-1">
                    <a href={`mailto:${selectedRequest.data.email}`}><Mail className="w-4 h-4 mr-2" />Email</a>
                  </Button>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedRequest(null)}>Anulează</Button>
            <Button onClick={handleUpdateRequest} disabled={saveLoading}>
              <Save className="w-4 h-4 mr-2" />{saveLoading ? 'Se salvează...' : 'Salvează'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Editare utilizator' : 'Utilizator nou'}</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Actualizați informațiile utilizatorului' : 'Creați un nou cont de administrator'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                disabled={!!editingUser}
                placeholder="Introduceți username"
              />
            </div>
            <div className="space-y-2">
              <Label>Parolă {editingUser && '(lăsați gol pentru a păstra)'}</Label>
              <Input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder={editingUser ? 'Parolă nouă (opțional)' : 'Introduceți parola'}
              />
            </div>
            <div className="space-y-2">
              <Label>Nume complet</Label>
              <Input
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Introduceți numele"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Introduceți email"
              />
            </div>
            <div className="space-y-2">
              <Label>Rol</Label>
              <Select value={newUser.role} onValueChange={(v) => setNewUser({ ...newUser, role: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUserDialog(false)}>Anulează</Button>
            <Button onClick={handleSaveUser} disabled={saveLoading || (!editingUser && (!newUser.username || !newUser.password))}>
              {saveLoading ? 'Se salvează...' : 'Salvează'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Price Edit Dialog */}
      <Dialog open={showPriceDialog} onOpenChange={setShowPriceDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editare preț</DialogTitle>
            <DialogDescription>
              {editingPrice && (
                <span className="font-mono text-xs">{editingPrice.category} / {editingPrice.key}</span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Denumire</Label>
              <Input
                value={priceForm.label}
                onChange={(e) => setPriceForm({ ...priceForm, label: e.target.value })}
                placeholder="Denumirea elementului"
              />
            </div>
            <div className="space-y-2">
              <Label>Preț (MDL)</Label>
              <Input
                type="number"
                min="0"
                value={priceForm.price}
                onChange={(e) => setPriceForm({ ...priceForm, price: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Descriere (opțional)</Label>
              <Input
                value={priceForm.description}
                onChange={(e) => setPriceForm({ ...priceForm, description: e.target.value })}
                placeholder="Descriere suplimentară"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPriceDialog(false)}>Anulează</Button>
            <Button onClick={handleUpdatePrice} disabled={saveLoading}>
              <Save className="w-4 h-4 mr-2" />
              {saveLoading ? 'Se salvează...' : 'Salvează'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
