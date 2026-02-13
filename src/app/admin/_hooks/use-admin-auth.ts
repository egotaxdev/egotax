'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AdminUser } from '../_types';

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  // Restore session from sessionStorage
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

  const handleLogin = useCallback(async (e: React.FormEvent) => {
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
  }, [username, password]);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_user');
    setAuthToken(null);
    setCurrentUser(null);
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  }, []);

  return {
    isAuthenticated,
    username, setUsername,
    password, setPassword,
    error,
    loading,
    authToken,
    currentUser,
    handleLogin,
    handleLogout,
  };
}
