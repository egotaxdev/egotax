import { Button } from '@/components/ui/button';
import { Phone, Mail, Copy } from 'lucide-react';
import { copyToClipboard } from '../_lib/utils';

interface ContactActionsProps {
  phone?: string | null;
  email?: string | null;
  copyText: string;
}

export function ContactActions({ phone, email, copyText }: ContactActionsProps) {
  return (
    <div className="flex gap-1">
      {phone && (
        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
          <a href={`tel:${phone}`}><Phone className="w-3.5 h-3.5" /></a>
        </Button>
      )}
      {email && (
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(email)}>
          <Mail className="w-3.5 h-3.5" />
        </Button>
      )}
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(copyText)}>
        <Copy className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}
