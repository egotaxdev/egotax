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

    // Check expiration
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
    // Fetch all data in parallel
    const [
      transactionsResult,
      ocRequestsResult,
      calculatorRequestsResult,
      contactRequestsResult,
    ] = await Promise.all([
      supabaseAdmin
        .from('payment_transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100),
      supabaseAdmin
        .from('oc_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100),
      supabaseAdmin
        .from('calculator_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100),
      supabaseAdmin
        .from('contact_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100),
    ]);

    return NextResponse.json({
      transactions: transactionsResult.data || [],
      ocRequests: ocRequestsResult.data || [],
      calculatorRequests: calculatorRequestsResult.data || [],
      contactRequests: contactRequestsResult.data || [],
    });
  } catch (error) {
    console.error('Admin data fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
