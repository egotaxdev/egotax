import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';
import type { OCRequest } from '../../_types';
import { REQUEST_STATUSES, STATUS_CONFIG } from '../../_constants';
import { formatShortDate } from '../../_lib/utils';
import { StatusBadge } from '../status-badge';
import { ContactActions } from '../contact-actions';

interface OCRequestsPageProps {
  requests: OCRequest[];
  searchQuery: string;
  onSearchChange: (v: string) => void;
  statusFilter: string;
  onStatusChange: (v: string) => void;
  onEditRequest: (req: OCRequest) => void;
}

export function OCRequestsPage({
  requests, searchQuery, onSearchChange, statusFilter, onStatusChange, onEditRequest,
}: OCRequestsPageProps) {
  const filtered = requests.filter(item => {
    const matchesSearch = !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone?.includes(searchQuery) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Cereri Servicii</h2>
          <p className="text-muted-foreground">Total: {requests.length}</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Caută..." className="pl-9 w-64" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
          </div>
          <Select value={statusFilter} onValueChange={onStatusChange}>
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
              <TableHead>Servicii</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Nu sunt cereri</TableCell></TableRow>
            ) : (
              filtered.map((req) => (
                <TableRow key={req.id} className={`cursor-pointer ${req.status === 'new' ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`} onClick={() => onEditRequest(req)}>
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
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <ContactActions
                      phone={req.phone}
                      email={req.email}
                      copyText={`${req.name}\n${req.phone}\n${req.email || ''}`}
                    />
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
