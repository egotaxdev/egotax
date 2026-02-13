import { formatMoney } from '../_lib/utils';

export function MiniChart({ data }: { data: { date: string; success: number; revenue: number }[] }) {
  if (data.length === 0) return <div className="text-sm text-muted-foreground">Nu sunt date</div>;

  const maxRevenue = Math.max(...data.map(d => d.revenue), 1);

  return (
    <div className="flex items-end gap-1 h-20">
      {data.slice(-14).map((d, i) => (
        <div
          key={i}
          className="flex-1 bg-primary/80 hover:bg-primary rounded-t transition-colors min-w-1 cursor-pointer"
          style={{ height: `${Math.max((d.revenue / maxRevenue) * 100, 4)}%` }}
          title={`${d.date}: ${formatMoney(d.revenue)} MDL`}
        />
      ))}
    </div>
  );
}
