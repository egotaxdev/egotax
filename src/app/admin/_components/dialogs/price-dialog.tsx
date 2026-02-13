'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Save } from 'lucide-react';
import type { CalculatorPriceItem } from '../../_types';

interface PriceDialogProps {
  editingPrice: CalculatorPriceItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authToken: string | null;
  onSaved: () => void;
}

export function PriceDialog({ editingPrice, open, onOpenChange, authToken, onSaved }: PriceDialogProps) {
  const [form, setForm] = useState({ label: '', price: 0, description: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingPrice) {
      setForm({ label: editingPrice.label, price: editingPrice.price, description: editingPrice.description || '' });
    }
  }, [editingPrice, open]);

  const handleSave = async () => {
    if (!authToken || !editingPrice) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/prices', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          id: editingPrice.id,
          price: form.price,
          label: form.label,
          description: form.description,
        }),
      });
      if (res.ok) {
        onOpenChange(false);
        onSaved();
        toast.success('Preț actualizat cu succes');
      } else {
        const data = await res.json();
        toast.error(`Eroare: ${data.error}`);
      }
    } catch {
      toast.error('Eroare de conexiune');
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="Denumirea elementului" />
          </div>
          <div className="space-y-2">
            <Label>Preț (MDL)</Label>
            <Input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })} placeholder="0" />
          </div>
          <div className="space-y-2">
            <Label>Descriere (opțional)</Label>
            <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descriere suplimentară" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Anulează</Button>
          <Button onClick={handleSave} disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Se salvează...' : 'Salvează'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
