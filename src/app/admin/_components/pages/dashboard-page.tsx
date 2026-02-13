import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle2, CreditCard, Download, TrendingUp } from 'lucide-react';
import type { Stats, PaymentTransaction } from '../../_types';
import { SERVICE_NAMES } from '../../_constants';
import { formatMoney, formatShortDate } from '../../_lib/utils';
import { StatCard } from '../stat-card';
import { MiniChart } from '../mini-chart';

interface DashboardPageProps {
  stats: Stats | null;
  transactions: PaymentTransaction[];
  newRequestsCount: number;
  onExport: (type: string) => void;
}

export function DashboardPage({ stats, transactions, newRequestsCount, onExport }: DashboardPageProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Venituri totale" value={`${formatMoney(stats?.overview.totalRevenue || 0)} MDL`} icon={TrendingUp} />
        <StatCard title="Plăți reușite" value={stats?.overview.successfulCount || 0} subtitle={`${stats?.overview.conversionRate || 0}% conversie`} icon={CheckCircle2} />
        <StatCard title="Cereri noi" value={newRequestsCount} subtitle="Necesită atenție" icon={Bell} />
        <StatCard title="Total tranzacții" value={stats?.overview.totalTransactions || 0} icon={CreditCard} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Venituri (ultimele 14 zile)</CardTitle>
          </CardHeader>
          <CardContent>
            <MiniChart data={stats?.dailyStats || []} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Venituri pe servicii</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.byService && Object.entries(stats.byService).map(([service, data]) => (
                <div key={service} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm">{SERVICE_NAMES[service] || service}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">{formatMoney(data.revenue)} MDL</span>
                    <span className="text-xs text-muted-foreground ml-2">({data.count})</span>
                  </div>
                </div>
              ))}
              {(!stats?.byService || Object.keys(stats.byService).length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-4">Nu sunt date</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Export date</CardTitle>
          <CardDescription>Descarcă datele în format CSV</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => onExport('transactions')}><Download className="w-4 h-4 mr-2" />Tranzacții</Button>
            <Button variant="outline" size="sm" onClick={() => onExport('oc_requests')}><Download className="w-4 h-4 mr-2" />Cereri OC</Button>
            <Button variant="outline" size="sm" onClick={() => onExport('calculator_requests')}><Download className="w-4 h-4 mr-2" />Calculator</Button>
            <Button variant="outline" size="sm" onClick={() => onExport('contact_requests')}><Download className="w-4 h-4 mr-2" />Contact</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Activitate recentă</CardTitle>
          <CardDescription>Ultimele tranzacții și cereri</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${tx.status === 'ok' ? 'bg-green-500' : tx.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                  <div>
                    <p className="text-sm font-medium">{tx.client_name || 'Client necunoscut'}</p>
                    <p className="text-xs text-muted-foreground">{SERVICE_NAMES[tx.service_type]}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatMoney(tx.amount)} {tx.currency}</p>
                  <p className="text-xs text-muted-foreground">{formatShortDate(tx.created_at)}</p>
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">Nu sunt tranzacții</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
