'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import type {
  AdminUser,
  PaymentTransaction,
  OCRequest,
  CalculatorRequest,
  ContactRequest,
  Stats,
  CalculatorPriceItem,
  ActivePage,
} from '../_types';

interface UseAdminDataOptions {
  authToken: string | null;
  currentUser: AdminUser | null;
  isAuthenticated: boolean;
  onLogout: () => void;
  onNavigate: (page: ActivePage) => void;
}

export function useAdminData({
  authToken,
  currentUser,
  isAuthenticated,
  onLogout,
  onNavigate,
}: UseAdminDataOptions) {
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [ocRequests, setOcRequests] = useState<OCRequest[]>([]);
  const [calculatorRequests, setCalculatorRequests] = useState<CalculatorRequest[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [calculatorPrices, setCalculatorPrices] = useState<CalculatorPriceItem[]>([]);
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const lastRequestCountRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

        const newCount =
          (data.ocRequests?.filter((r: OCRequest) => r.status === 'new').length || 0) +
          (data.calculatorRequests?.filter((r: CalculatorRequest) => r.status === 'new').length || 0) +
          (data.contactRequests?.filter((r: ContactRequest) => r.status === 'new').length || 0);

        if (lastRequestCountRef.current > 0 && newCount > lastRequestCountRef.current && audioRef.current) {
          audioRef.current.play().catch(() => {});
        }
        lastRequestCountRef.current = newCount;
      } else if (res.status === 401) {
        onLogout();
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
    setLoading(false);
  }, [authToken, onLogout]);

  const fetchStats = useCallback(async () => {
    if (!authToken) return;
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      if (res.ok) setStats(await res.json());
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

  // Initial fetch + polling
  useEffect(() => {
    if (isAuthenticated && authToken) {
      fetchData();
      fetchStats();
      fetchUsers();
      fetchPrices();

      const interval = setInterval(fetchStats, 60000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, authToken, fetchData, fetchStats, fetchUsers, fetchPrices]);

  // Supabase Realtime
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
            action: { label: 'Vezi', onClick: () => onNavigate('oc_requests') },
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
            action: { label: 'Vezi', onClick: () => onNavigate('calculator_requests') },
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
            action: { label: 'Vezi', onClick: () => onNavigate('contact_requests') },
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
              action: { label: 'Vezi', onClick: () => onNavigate('transactions') },
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
  }, [isAuthenticated, onNavigate]);

  return {
    transactions,
    ocRequests,
    calculatorRequests,
    contactRequests,
    adminUsers,
    stats,
    calculatorPrices,
    isRealtimeConnected,
    loading,
    audioRef,
    fetchData,
    fetchStats,
    fetchUsers,
    fetchPrices,
  };
}
