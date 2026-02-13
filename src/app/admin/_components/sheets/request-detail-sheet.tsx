'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Mail, Phone, Save } from 'lucide-react';
import type { OCRequest, CalculatorRequest, ContactRequest } from '../../_types';
import { REQUEST_STATUSES, STATUS_CONFIG } from '../../_constants';
import { formatDate } from '../../_lib/utils';

type AnyRequest = OCRequest | CalculatorRequest | ContactRequest;

interface RequestDetailSheetProps {
  request: { data: AnyRequest; table: string } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authToken: string | null;
  onSaved: () => void;
}

export function RequestDetailSheet({
  request, open, onOpenChange, authToken, onSaved,
}: RequestDetailSheetProps) {
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (request) {
      setEditStatus(request.data.status);
      setEditNotes(request.data.admin_notes || '');
    }
  }, [request]);

  const handleSave = async () => {
    if (!request || !authToken) return;
    setSaveLoading(true);
    try {
      const res = await fetch('/api/admin/requests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          id: request.data.id,
          table: request.table,
          status: editStatus,
          admin_notes: editNotes,
        }),
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
    setSaveLoading(false);
  };

  const data = request?.data;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Editare cerere</SheetTitle>
          <SheetDescription>Actualizați statusul și notele pentru această cerere</SheetDescription>
        </SheetHeader>
        {data && (
          <div className="space-y-4 px-4">
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Nume</p>
                <p className="font-medium">{data.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Data</p>
                <p>{formatDate(data.created_at)}</p>
              </div>
              {'phone' in data && data.phone && (
                <div className="space-y-1">
                  <p className="text-muted-foreground">Telefon</p>
                  <p>{data.phone}</p>
                </div>
              )}
              {'email' in data && data.email && (
                <div className="space-y-1">
                  <p className="text-muted-foreground">Email</p>
                  <p>{data.email}</p>
                </div>
              )}
            </div>
            {'message' in data && data.message && (
              <div className="space-y-2">
                <Label>Mesaj</Label>
                <div className="p-3 bg-muted/50 rounded-lg text-sm max-h-32 overflow-y-auto">
                  {data.message}
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
              {'phone' in data && data.phone && (
                <Button variant="outline" asChild className="flex-1">
                  <a href={`tel:${data.phone}`}><Phone className="w-4 h-4 mr-2" />Sună</a>
                </Button>
              )}
              {'email' in data && data.email && (
                <Button variant="outline" asChild className="flex-1">
                  <a href={`mailto:${data.email}`}><Mail className="w-4 h-4 mr-2" />Email</a>
                </Button>
              )}
            </div>
          </div>
        )}
        <SheetFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Anulează</Button>
          <Button onClick={handleSave} disabled={saveLoading}>
            <Save className="w-4 h-4 mr-2" />{saveLoading ? 'Se salvează...' : 'Salvează'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
