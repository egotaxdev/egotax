'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Mail, Phone, Undo2 } from 'lucide-react';
import type { AdminUser, PaymentTransaction } from '../../_types';
import { SERVICE_NAMES } from '../../_constants';
import { formatDate, formatMoney } from '../../_lib/utils';
import { StatusBadge } from '../status-badge';

interface TransactionDetailSheetProps {
  transaction: PaymentTransaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUser: AdminUser | null;
  onRefund: (tx: PaymentTransaction) => void;
}

export function TransactionDetailSheet({
  transaction, open, onOpenChange, currentUser, onRefund,
}: TransactionDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Detalii tranzacție</SheetTitle>
          <SheetDescription>Informații complete despre tranzacție</SheetDescription>
        </SheetHeader>
        {transaction && (
          <div className="space-y-4 px-4">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <StatusBadge status={transaction.status} />
              <span className="text-xl font-bold">{formatMoney(transaction.amount)} {transaction.currency}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Order ID</p>
                <p className="font-mono text-xs bg-muted px-2 py-1 rounded">{transaction.order_id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Pay ID</p>
                <p className="font-mono text-xs bg-muted px-2 py-1 rounded">{transaction.pay_id || '-'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Serviciu</p>
                <p>{SERVICE_NAMES[transaction.service_type]}</p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Data</p>
                <p>{formatDate(transaction.created_at)}</p>
              </div>
              {transaction.company_name && (
                <div className="space-y-1">
                  <p className="text-muted-foreground">Companie</p>
                  <p>{transaction.company_name}</p>
                </div>
              )}
              {transaction.client_name && (
                <div className="space-y-1">
                  <p className="text-muted-foreground">Client</p>
                  <p>{transaction.client_name}</p>
                </div>
              )}
              {transaction.client_email && (
                <div className="space-y-1">
                  <p className="text-muted-foreground">Email</p>
                  <p>{transaction.client_email}</p>
                </div>
              )}
              {transaction.client_phone && (
                <div className="space-y-1">
                  <p className="text-muted-foreground">Telefon</p>
                  <p>{transaction.client_phone}</p>
                </div>
              )}
              {transaction.card_number && (
                <div className="space-y-1">
                  <p className="text-muted-foreground">Card</p>
                  <p className="font-mono">{transaction.card_number}</p>
                </div>
              )}
              {transaction.rrn && (
                <div className="space-y-1">
                  <p className="text-muted-foreground">RRN</p>
                  <p className="font-mono">{transaction.rrn}</p>
                </div>
              )}
            </div>
            {transaction.status_message && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Status Message</p>
                <p className="text-sm">{transaction.status_message}</p>
              </div>
            )}
            <div className="flex gap-2 pt-4 border-t">
              {transaction.client_phone && (
                <Button variant="outline" asChild className="flex-1">
                  <a href={`tel:${transaction.client_phone}`}><Phone className="w-4 h-4 mr-2" />Sună</a>
                </Button>
              )}
              {transaction.client_email && (
                <Button variant="outline" asChild className="flex-1">
                  <a href={`mailto:${transaction.client_email}`}><Mail className="w-4 h-4 mr-2" />Email</a>
                </Button>
              )}
            </div>
            {transaction.status === 'ok' && transaction.pay_id && currentUser?.permissions.canRefund && (
              <Button className="w-full" variant="outline" onClick={() => onRefund(transaction)}>
                <Undo2 className="w-4 h-4 mr-2" />Efectuează returnare
              </Button>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
