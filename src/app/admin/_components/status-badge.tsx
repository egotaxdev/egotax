import { Badge } from '@/components/ui/badge';
import { STATUS_CONFIG } from '../_constants';

export function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.created;
  const Icon = config.icon;
  return (
    <Badge variant="secondary" className={`${config.color} gap-1 font-medium`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </Badge>
  );
}
