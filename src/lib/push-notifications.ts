import webpush from 'web-push';
import { supabaseAdmin } from './supabase';

// Lazy initialization of web-push
let isConfigured = false;

function configureWebPush() {
  if (isConfigured) return true;

  const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
  const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@egotax.md';

  if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
    isConfigured = true;
    return true;
  }
  return false;
}

interface PushPayload {
  title: string;
  body: string;
  url?: string;
  tag?: string;
}

export async function sendPushToAllAdmins(payload: PushPayload): Promise<{ sent: number; total: number }> {
  if (!configureWebPush()) {
    console.log('Push notifications not configured (missing VAPID keys)');
    return { sent: 0, total: 0 };
  }

  try {
    // Get all push subscriptions
    const { data: subscriptions, error } = await supabaseAdmin
      .from('push_subscriptions')
      .select('*');

    if (error) {
      console.error('Failed to fetch push subscriptions:', error);
      return { sent: 0, total: 0 };
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log('No push subscriptions found');
      return { sent: 0, total: 0 };
    }

    const pushPayload = JSON.stringify({
      title: payload.title,
      body: payload.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: payload.tag || 'egotax-notification',
      data: { url: payload.url || '/admin' }
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
          await webpush.sendNotification(pushSubscription, pushPayload);
          return { success: true };
        } catch (err: unknown) {
          const error = err as { statusCode?: number };
          // If subscription is invalid (expired/unsubscribed), remove it
          if (error.statusCode === 410 || error.statusCode === 404) {
            await supabaseAdmin
              .from('push_subscriptions')
              .delete()
              .eq('endpoint', sub.endpoint);
          }
          console.error('Push send error:', error);
          return { success: false };
        }
      })
    );

    const sent = results.filter(r => r.status === 'fulfilled' && (r.value as { success: boolean }).success).length;

    console.log(`Push notifications sent: ${sent}/${subscriptions.length}`);
    return { sent, total: subscriptions.length };

  } catch (error) {
    console.error('sendPushToAllAdmins error:', error);
    return { sent: 0, total: 0 };
  }
}

// Shortcut functions for common notifications
export async function notifyNewOCRequest(name: string, services: string[]) {
  return sendPushToAllAdmins({
    title: 'Cerere nouă servicii',
    body: `${name} solicită: ${services.slice(0, 2).join(', ')}${services.length > 2 ? '...' : ''}`,
    url: '/admin?page=oc_requests',
    tag: 'new-oc-request'
  });
}

export async function notifyNewCalculatorRequest(name: string, businessType?: string) {
  return sendPushToAllAdmins({
    title: 'Cerere nouă calculator',
    body: `${name}${businessType ? ` - ${businessType}` : ''} solicită ofertă`,
    url: '/admin?page=calculator_requests',
    tag: 'new-calculator-request'
  });
}

export async function notifyNewContactRequest(name: string, subject?: string) {
  return sendPushToAllAdmins({
    title: 'Mesaj nou contact',
    body: `${name}: ${subject || 'Mesaj nou'}`,
    url: '/admin?page=contact_requests',
    tag: 'new-contact-request'
  });
}

export async function notifyNewPayment(clientName: string, amount: number, currency: string) {
  return sendPushToAllAdmins({
    title: 'Plată nouă',
    body: `${clientName} - ${amount} ${currency}`,
    url: '/admin?page=transactions',
    tag: 'new-payment'
  });
}
