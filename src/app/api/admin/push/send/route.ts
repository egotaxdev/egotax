import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import webpush from 'web-push';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Lazy initialization of web-push
let webpushConfigured = false;

function configureWebPush() {
  if (webpushConfigured) return true;

  const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
  const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@egotax.md';

  if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
    webpushConfigured = true;
    return true;
  }
  return false;
}

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

// Send push notification to all subscribers (internal use)
export async function POST(request: NextRequest) {
  // This endpoint can be called internally or with admin auth
  const session = verifyToken(request);
  const internalKey = request.headers.get('x-internal-key');

  if (!session && internalKey !== process.env.INTERNAL_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!configureWebPush()) {
    return NextResponse.json({ error: 'Push notifications not configured' }, { status: 500 });
  }

  try {
    const { title, body, url, excludeUserId } = await request.json();

    // Get all subscriptions (optionally exclude the user who triggered the event)
    let query = supabaseAdmin
      .from('push_subscriptions')
      .select('*');

    if (excludeUserId) {
      query = query.neq('user_id', excludeUserId);
    }

    const { data: subscriptions, error } = await query;

    if (error) {
      console.error('Failed to fetch subscriptions:', error);
      return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
    }

    if (!subscriptions || subscriptions.length === 0) {
      return NextResponse.json({ success: true, sent: 0 });
    }

    const payload = JSON.stringify({
      title: title || 'EgoTax Admin',
      body: body || 'Aveți o notificare nouă',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      data: { url: url || '/admin' }
    });

    const results = await Promise.allSettled(
      subscriptions.map(async (sub) => {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth
          }
        };

        try {
          await webpush.sendNotification(pushSubscription, payload);
          return { success: true, endpoint: sub.endpoint };
        } catch (err: unknown) {
          const error = err as { statusCode?: number };
          // If subscription is invalid, remove it
          if (error.statusCode === 410 || error.statusCode === 404) {
            await supabaseAdmin
              .from('push_subscriptions')
              .delete()
              .eq('endpoint', sub.endpoint);
          }
          return { success: false, endpoint: sub.endpoint, error };
        }
      })
    );

    const sent = results.filter(r => r.status === 'fulfilled' && (r.value as { success: boolean }).success).length;

    return NextResponse.json({ success: true, sent, total: subscriptions.length });

  } catch (error) {
    console.error('Send push error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
