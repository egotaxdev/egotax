'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, UserPlus, Lock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminSetupPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [hasUsers, setHasUsers] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if setup is needed by trying to create a test request
    fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _check: true }), // Will fail validation but tells us if first setup
    })
      .then(res => res.json())
      .then(data => {
        // If we get "Username and password required" error, it means first setup is allowed
        if (data.error === 'Username and password required') {
          setHasUsers(false);
        } else if (data.error === 'Unauthorized') {
          setHasUsers(true);
        } else {
          setHasUsers(true);
        }
      })
      .catch(() => setHasUsers(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Parolele nu coincid');
      return;
    }

    if (password.length < 6) {
      setError('Parola trebuie să aibă cel puțin 6 caractere');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          name: name || 'Administrator',
          role: 'admin',
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || 'Eroare la crearea utilizatorului');
      }
    } catch {
      setError('Eroare de conexiune');
    }

    setLoading(false);
  };

  if (hasUsers === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FFB343] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (hasUsers) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Setup complet</h1>
          <p className="text-muted-foreground mb-6">
            Administratorul a fost deja configurat. Folosiți pagina de login.
          </p>
          <Button asChild className="bg-[#FFB343] text-black hover:bg-[#FFC56D]">
            <Link href="/admin">Mergi la Admin</Link>
          </Button>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Administrator creat!</h1>
          <p className="text-muted-foreground mb-6">
            Acum puteți accesa panoul de administrare.
          </p>
          <Button asChild className="bg-[#FFB343] text-black hover:bg-[#FFC56D]">
            <Link href="/admin">Mergi la Admin</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#FFB343]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-[#FFB343]" />
          </div>
          <h1 className="text-2xl font-bold">Setup Admin</h1>
          <p className="text-muted-foreground">Creați primul administrator</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nume (opțional)</Label>
            <Input
              id="name"
              type="text"
              placeholder="Administrator"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Utilizator</Label>
            <Input
              id="username"
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Parola</Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimum 6 caractere"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmă parola</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Repetați parola"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-[#FFB343] text-black hover:bg-[#FFC56D]"
            disabled={loading || !username || !password || !confirmPassword}
          >
            {loading ? (
              'Se creează...'
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Creează Administrator
              </>
            )}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Această pagină este disponibilă doar dacă nu există administratori în sistem.
        </p>
      </Card>
    </div>
  );
}
