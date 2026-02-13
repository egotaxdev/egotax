'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import type { AdminUser } from '../../_types';

interface UserDialogProps {
  editingUser: AdminUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authToken: string | null;
  onSaved: () => void;
}

export function UserDialog({ editingUser, open, onOpenChange, authToken, onSaved }: UserDialogProps) {
  const [form, setForm] = useState({ username: '', password: '', name: '', email: '', role: 'admin' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingUser) {
      setForm({ username: editingUser.username, password: '', name: editingUser.name || '', email: editingUser.email || '', role: editingUser.role });
    } else {
      setForm({ username: '', password: '', name: '', email: '', role: 'admin' });
    }
  }, [editingUser, open]);

  const handleSave = async () => {
    if (!authToken) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: editingUser ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(editingUser ? { id: editingUser.id, ...form } : form),
      });
      if (res.ok) {
        onOpenChange(false);
        onSaved();
      } else {
        const data = await res.json();
        alert(`Eroare: ${data.error}`);
      }
    } catch {
      alert('Eroare de conexiune');
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} disabled={!!editingUser} placeholder="Introduceți username" />
          </div>
          <div className="space-y-2">
            <Label>Parolă {editingUser && '(lăsați gol pentru a păstra)'}</Label>
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder={editingUser ? 'Parolă nouă (opțional)' : 'Introduceți parola'} />
          </div>
          <div className="space-y-2">
            <Label>Nume complet</Label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Introduceți numele" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Introduceți email" />
          </div>
          <div className="space-y-2">
            <Label>Rol</Label>
            <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Anulează</Button>
          <Button onClick={handleSave} disabled={loading || (!editingUser && (!form.username || !form.password))}>
            {loading ? 'Se salvează...' : 'Salvează'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
