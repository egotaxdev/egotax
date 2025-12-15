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

// Update request status
export async function PUT(request: NextRequest) {
  const session = verifyToken(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, table, status, admin_notes } = await request.json();

    if (!id || !table) {
      return NextResponse.json({ error: 'ID and table required' }, { status: 400 });
    }

    const validTables = ['oc_requests', 'calculator_requests', 'contact_requests'];
    if (!validTables.includes(table)) {
      return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    if (status) updates.status = status;
    if (admin_notes !== undefined) updates.admin_notes = admin_notes;
    updates.assigned_to = session.username;

    const { error } = await supabaseAdmin
      .from(table)
      .update(updates)
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Update request error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
