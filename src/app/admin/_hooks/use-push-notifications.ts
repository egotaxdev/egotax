'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export function usePushNotifications(isAuthenticated: boolean, authToken: string | null) {
  const [pushSupported, setPushSupported] = useState(false);
  const [pushSubscription, setPushSubscription] = useState<PushSubscription | null>(null);
  const [pushLoading, setPushLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;

    setPushSupported(true);

    navigator.serviceWorker.register('/sw.js').then(async (reg) => {
      await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      setPushSubscription(sub);
    }).catch((err) => {
      console.error('SW registration failed:', err);
    });
  }, [isAuthenticated]);

  const handlePushSubscribe = useCallback(async () => {
    setPushLoading(true);
    try {
      const reg = await navigator.serviceWorker.ready;

      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
      const padding = '='.repeat((4 - vapidKey.length % 4) % 4);
      const base64 = (vapidKey + padding).replace(/-/g, '+').replace(/_/g, '/');
      const rawData = window.atob(base64);
      const applicationServerKey = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
        applicationServerKey[i] = rawData.charCodeAt(i);
      }

      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      const res = await fetch('/api/admin/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ subscription: sub.toJSON() }),
      });

      if (res.ok) {
        setPushSubscription(sub);
        toast.success('Push notificări activate');
      } else {
        toast.error('Eroare la activarea notificărilor');
      }
    } catch (err) {
      console.error('Push subscribe error:', err);
      toast.error('Eroare la activarea notificărilor push');
    }
    setPushLoading(false);
  }, [authToken]);

  const handlePushUnsubscribe = useCallback(async () => {
    if (!pushSubscription) return;
    setPushLoading(true);
    try {
      await pushSubscription.unsubscribe();

      await fetch('/api/admin/push/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ endpoint: pushSubscription.endpoint }),
      });

      setPushSubscription(null);
      toast.success('Push notificări dezactivate');
    } catch (err) {
      console.error('Push unsubscribe error:', err);
      toast.error('Eroare la dezactivarea notificărilor');
    }
    setPushLoading(false);
  }, [authToken, pushSubscription]);

  return {
    pushSupported,
    pushSubscription,
    pushLoading,
    handlePushSubscribe,
    handlePushUnsubscribe,
  };
}
