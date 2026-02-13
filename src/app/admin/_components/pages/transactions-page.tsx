import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter, Mail, Phone, Search, Undo2 } from 'lucide-react';
import type { AdminUser, PaymentTransaction } from '../../_types';
import { SERVICE_NAMES } from '../../_constants';
import { formatMoney, formatShortDate } from '../../_lib/utils';
import { StatusBadge } from '../status-badge';

interface TransactionsPageProps {
  transactions: PaymentTransaction[];
  searchQuery: string;
  onSearchChange: (v: string) => void;
  statusFilter: string;
  onStatusChange: (v: string) => void;
  currentUser: AdminUser | null;
  onViewTransaction: (tx: PaymentTransaction) => void;
  onRefundTransaction: (tx: PaymentTransaction) => void;
}

export function TransactionsPage({
  transactions, searchQuery, onSearchChange, statusFilter, onStatusChange,
  currentUser, onViewTransaction, onRefundTransaction,
}: TransactionsPageProps) {
  const filtered = transactions.filter(item => {
    const matchesSearch = !searchQuery ||
      item.order_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client_phone?.includes(searchQuery) ||
      item.company_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tranzacții</h2>
          <p className="text-muted-foreground">Total: {transactions.length} | Filtrate: {filtered.length}</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Caută..." className="pl-9 w-64" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
          </div>
          <Select value={statusFilter} onValueChange={onStatusChange}>
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
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Nu sunt tranzacții</TableCell>
              </TableRow>
            ) : (
              filtered.map((tx) => (
                <TableRow key={tx.id} className="cursor-pointer" onClick={() => onViewTransaction(tx)}>
                  <TableCell className="font-mono text-xs">{formatShortDate(tx.created_at)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{tx.client_name || '-'}</p>
                      <p className="text-xs text-muted-foreground">{tx.company_name || tx.client_email || '-'}</p>
                    </div>
                  </TableCell>
                  <TableCell>{SERVICE_NAMES[tx.service_type]}</TableCell>
                  <TableCell className="font-medium">{formatMoney(tx.amount)} {tx.currency}</TableCell>
                  <TableCell><StatusBadge status={tx.status} /></TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-end gap-1">
                      {tx.client_phone && (
                        <Button variant="ghost" size="icon" asChild><a href={`tel:${tx.client_phone}`}><Phone className="w-4 h-4" /></a></Button>
                      )}
                      {tx.client_email && (
                        <Button variant="ghost" size="icon" asChild><a href={`mailto:${tx.client_email}`}><Mail className="w-4 h-4" /></a></Button>
                      )}
                      {tx.status === 'ok' && tx.pay_id && currentUser?.permissions.canRefund && (
                        <Button variant="ghost" size="icon" onClick={() => onRefundTransaction(tx)}><Undo2 className="w-4 h-4" /></Button>
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
  );
}
