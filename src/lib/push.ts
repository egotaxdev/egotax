import webpush from 'web-push';
import { supabaseAdmin } from '@/lib/supabase';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY!;

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    'mailto:info@egotax.md',
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
  );
}

interface PushPayload {
  title: string;
  body: string;
  tag?: string;
  url?: string;
}

export async function sendPushNotification(payload: PushPayload): Promise<boolean> {
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    console.error('VAPID keys not configured');
    return false;
  }

  try {
    // Get all active subscriptions
    const { data: subscriptions, error } = await supabaseAdmin
      .from('push_subscriptions')
      .select('id, endpoint, p256dh, auth')
      .eq('is_active', true);

    if (error) {
      console.error('Failed to fetch push subscriptions:', error);
      return false;
    }

    if (!subscriptions || subscriptions.length === 0) {
      return true; // No subscribers, not an error
    }

    const message = JSON.stringify(payload);
    const expiredIds: string[] = [];

    await Promise.allSettled(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth },
            },
            message
          );
        } catch (err: unknown) {
          const statusCode = (err as { statusCode?: number }).statusCode;
          if (statusCode === 404 || statusCode === 410) {
            // Subscription expired, mark for removal
            expiredIds.push(sub.id);
          } else {
            console.error(`Push failed for ${sub.endpoint}:`, err);
          }
        }
      })
    );

    // Remove expired subscriptions
    if (expiredIds.length > 0) {
      await supabaseAdmin
        .from('push_subscriptions')
        .delete()
        .in('id', expiredIds);
    }

    return true;
  } catch (error) {
    console.error('Push notification error:', error);
    return false;
  }
}
