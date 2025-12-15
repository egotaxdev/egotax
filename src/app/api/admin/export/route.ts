import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface SessionData {
  userId: string;
  username: string;
  role: string;
  exp: number;
}

function verifyToken(request: NextRequest): SessionData | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  try {
    const token = authHeader.substring(7);
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString()) as SessionData;
    if (decoded.exp < Date.now()) return null;
    return decoded;
  } catch {
    return null;
  }
}

function escapeCSV(value: unknown): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function toCSV(data: Record<string, unknown>[], columns: { key: string; label: string }[]): string {
  const header = columns.map(c => escapeCSV(c.label)).join(',');
  const rows = data.map(row =>
    columns.map(c => escapeCSV(row[c.key])).join(',')
  );
  return [header, ...rows].join('\n');
}

export async function GET(request: NextRequest) {
  const session = verifyToken(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    let csv = '';
    let filename = '';

    if (type === 'transactions') {
      const { data } = await supabaseAdmin
        .from('payment_transactions')
        .select('*')
        .order('created_at', { ascending: false });

      csv = toCSV(data || [], [
        { key: 'created_at', label: 'Data' },
        { key: 'order_id', label: 'Order ID' },
        { key: 'pay_id', label: 'Pay ID' },
        { key: 'service_type', label: 'Serviciu' },
        { key: 'amount', label: 'Sumă' },
        { key: 'currency', label: 'Valută' },
        { key: 'status', label: 'Status' },
        { key: 'company_name', label: 'Companie' },
        { key: 'client_name', label: 'Client' },
        { key: 'client_email', label: 'Email' },
        { key: 'client_phone', label: 'Telefon' },
        { key: 'card_number', label: 'Card' },
        { key: 'rrn', label: 'RRN' },
        { key: 'status_message', label: 'Mesaj Status' },
      ]);
      filename = `transactions_${new Date().toISOString().split('T')[0]}.csv`;

    } else if (type === 'oc_requests') {
      const { data } = await supabaseAdmin
        .from('oc_requests')
        .select('*')
        .order('created_at', { ascending: false });

      csv = toCSV((data || []).map(r => ({
        ...r,
        services: Array.isArray(r.services) ? r.services.join('; ') : r.services
      })), [
        { key: 'created_at', label: 'Data' },
        { key: 'name', label: 'Nume' },
        { key: 'phone', label: 'Telefon' },
        { key: 'email', label: 'Email' },
        { key: 'company_name', label: 'Companie' },
        { key: 'services', label: 'Servicii' },
        { key: 'message', label: 'Mesaj' },
        { key: 'status', label: 'Status' },
        { key: 'source', label: 'Sursă' },
        { key: 'admin_notes', label: 'Note Admin' },
      ]);
      filename = `oc_requests_${new Date().toISOString().split('T')[0]}.csv`;

    } else if (type === 'calculator_requests') {
      const { data } = await supabaseAdmin
        .from('calculator_requests')
        .select('*')
        .order('created_at', { ascending: false });

      csv = toCSV(data || [], [
        { key: 'created_at', label: 'Data' },
        { key: 'name', label: 'Nume' },
        { key: 'phone', label: 'Telefon' },
        { key: 'email', label: 'Email' },
        { key: 'company_name', label: 'Companie' },
        { key: 'business_type', label: 'Tip Afacere' },
        { key: 'employee_count', label: 'Angajați' },
        { key: 'estimated_price', label: 'Preț Estimat' },
        { key: 'status', label: 'Status' },
        { key: 'admin_notes', label: 'Note Admin' },
      ]);
      filename = `calculator_requests_${new Date().toISOString().split('T')[0]}.csv`;

    } else if (type === 'contact_requests') {
      const { data } = await supabaseAdmin
        .from('contact_requests')
        .select('*')
        .order('created_at', { ascending: false });

      csv = toCSV(data || [], [
        { key: 'created_at', label: 'Data' },
        { key: 'name', label: 'Nume' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Telefon' },
        { key: 'company_name', label: 'Companie' },
        { key: 'subject', label: 'Subiect' },
        { key: 'message', label: 'Mesaj' },
        { key: 'status', label: 'Status' },
        { key: 'admin_notes', label: 'Note Admin' },
      ]);
      filename = `contact_requests_${new Date().toISOString().split('T')[0]}.csv`;

    } else {
      return NextResponse.json({ error: 'Invalid export type' }, { status: 400 });
    }

    // Add BOM for Excel UTF-8 compatibility
    const bom = '\uFEFF';

    return new NextResponse(bom + csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
