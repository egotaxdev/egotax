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

export async function GET(request: NextRequest) {
  const session = verifyToken(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get transactions for stats
    const { data: transactions } = await supabaseAdmin
      .from('payment_transactions')
      .select('created_at, amount, status, service_type')
      .order('created_at', { ascending: true });

    // Get request counts
    const [ocResult, calcResult, contactResult] = await Promise.all([
      supabaseAdmin.from('oc_requests').select('status', { count: 'exact' }),
      supabaseAdmin.from('calculator_requests').select('status', { count: 'exact' }),
      supabaseAdmin.from('contact_requests').select('status', { count: 'exact' }),
    ]);

    // Calculate stats
    const txList = transactions || [];

    const totalTransactions = txList.length;
    const successfulTransactions = txList.filter(t => t.status === 'ok');
    const failedTransactions = txList.filter(t => ['failed', 'declined', 'timeout'].includes(t.status));
    const pendingTransactions = txList.filter(t => ['created', 'pending'].includes(t.status));

    const totalRevenue = successfulTransactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    const conversionRate = totalTransactions > 0
      ? ((successfulTransactions.length / totalTransactions) * 100).toFixed(1)
      : '0';

    // Group by day for chart (last 30 days)
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const dailyStats: Record<string, { date: string; success: number; failed: number; revenue: number }> = {};

    txList.forEach(tx => {
      const date = new Date(tx.created_at).toISOString().split('T')[0];
      if (new Date(date) >= last30Days) {
        if (!dailyStats[date]) {
          dailyStats[date] = { date, success: 0, failed: 0, revenue: 0 };
        }
        if (tx.status === 'ok') {
          dailyStats[date].success++;
          dailyStats[date].revenue += tx.amount || 0;
        } else if (['failed', 'declined', 'timeout'].includes(tx.status)) {
          dailyStats[date].failed++;
        }
      }
    });

    // Group by service type
    const byService: Record<string, { count: number; revenue: number }> = {};
    successfulTransactions.forEach(tx => {
      const service = tx.service_type || 'unknown';
      if (!byService[service]) {
        byService[service] = { count: 0, revenue: 0 };
      }
      byService[service].count++;
      byService[service].revenue += tx.amount || 0;
    });

    // Count new requests
    const newOcRequests = (ocResult.data || []).filter(r => r.status === 'new').length;
    const newCalcRequests = (calcResult.data || []).filter(r => r.status === 'new').length;
    const newContactRequests = (contactResult.data || []).filter(r => r.status === 'new').length;

    return NextResponse.json({
      overview: {
        totalTransactions,
        successfulCount: successfulTransactions.length,
        failedCount: failedTransactions.length,
        pendingCount: pendingTransactions.length,
        totalRevenue,
        conversionRate,
        newRequests: newOcRequests + newCalcRequests + newContactRequests,
        newOcRequests,
        newCalcRequests,
        newContactRequests,
      },
      dailyStats: Object.values(dailyStats).sort((a, b) => a.date.localeCompare(b.date)),
      byService,
    });

  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
