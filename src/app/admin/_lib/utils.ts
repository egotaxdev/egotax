import { toast } from 'sonner';

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('ro-MD', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatShortDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ro-MD', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
}

export function formatMoney(amount: number) {
  return new Intl.NumberFormat('ro-MD', { minimumFractionDigits: 2 }).format(amount);
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  toast.success('Copiat în clipboard');
}
