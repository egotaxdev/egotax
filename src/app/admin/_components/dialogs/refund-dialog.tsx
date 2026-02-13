'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import type { PaymentTransaction } from '../../_types';
import { formatMoney } from '../../_lib/utils';

interface RefundDialogProps {
  transaction: PaymentTransaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authToken: string | null;
  onRefunded: () => void;
}

export function RefundDialog({ transaction, open, onOpenChange, authToken, onRefunded }: RefundDialogProps) {
  const [refundAmount, setRefundAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRefund = async () => {
    if (!transaction?.pay_id || !authToken) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          payId: transaction.pay_id,
          amount: refundAmount ? parseFloat(refundAmount) : undefined,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        onOpenChange(false);
        setRefundAmount('');
        onRefunded();
        alert('Returnare efectuată cu succes!');
      } else {
        alert(`Eroare: ${data.error || 'Returnare eșuată'}`);
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
          <DialogTitle>Returnare plată</DialogTitle>
          <DialogDescription>Suma totală: {formatMoney(transaction?.amount || 0)} {transaction?.currency}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Sumă de returnat (gol = returnare completă)</Label>
            <Input
              type="number"
              step="0.01"
              max={transaction?.amount}
              placeholder={`Max: ${transaction?.amount}`}
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
            />
          </div>
          <p className="text-sm text-muted-foreground">Atenție: Returnarea poate fi efectuată o singură dată.</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Anulează</Button>
          <Button onClick={handleRefund} disabled={loading}>
            {loading ? 'Se procesează...' : 'Confirmă returnarea'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
