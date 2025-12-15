import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

interface AdminUser {
  id: string;
  username: string;
  password_hash: string;
  name: string | null;
  role: string;
  is_active: boolean;
  can_view_transactions: boolean;
  can_refund: boolean;
  can_view_requests: boolean;
  can_manage_users: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    // Find user in database
    const { data: user, error } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .eq('username', username.toLowerCase().trim())
      .eq('is_active', true)
      .single<AdminUser>();

    if (error || !user) {
      // Don't reveal whether username exists
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Update last login time
    await supabaseAdmin
      .from('admin_users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', user.id);

    // Generate session token (simple approach - use JWT for production)
    const sessionToken = Buffer.from(JSON.stringify({
      userId: user.id,
      username: user.username,
      role: user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    })).toString('base64');

    return NextResponse.json({
      success: true,
      token: sessionToken,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        permissions: {
          canViewTransactions: user.can_view_transactions,
          canRefund: user.can_refund,
          canViewRequests: user.can_view_requests,
          canManageUsers: user.can_manage_users,
        },
      },
    });

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

// Endpoint to create/hash a password (for setup only)
export async function PUT(request: NextRequest) {
  try {
    const { password, secret } = await request.json();

    // Simple protection - require a setup secret
    if (secret !== process.env.ADMIN_SETUP_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const hash = await bcrypt.hash(password, 10);

    return NextResponse.json({ hash });

  } catch {
    return NextResponse.json({ error: 'Failed to hash password' }, { status: 500 });
  }
}
