import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Bell, BellOff, BellRing, Loader2 } from 'lucide-react';

interface SettingsPageProps {
  pushSupported: boolean;
  pushSubscription: PushSubscription | null;
  pushLoading: boolean;
  onPushSubscribe: () => void;
  onPushUnsubscribe: () => void;
}

export function SettingsPage({
  pushSupported, pushSubscription, pushLoading, onPushSubscribe, onPushUnsubscribe,
}: SettingsPageProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Push Notificări
          </CardTitle>
          <CardDescription>
            Primiți notificări push despre cereri noi și plăți, chiar și când browser-ul este închis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!pushSupported ? (
            <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                Browser-ul dvs. nu suportă push notificări.
              </p>
            </div>
          ) : pushSubscription ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <BellRing className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-700 dark:text-green-400">Push notificări active</p>
                  <p className="text-sm text-green-600 dark:text-green-500">
                    Veți primi notificări despre cereri și plăți noi.
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={onPushUnsubscribe} disabled={pushLoading}>
                {pushLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <BellOff className="w-4 h-4 mr-2" />}
                Dezactivează notificări
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <BellOff className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Push notificări inactive</p>
                  <p className="text-sm text-muted-foreground">
                    Activați pentru a primi notificări instant.
                  </p>
                </div>
              </div>
              <Button onClick={onPushSubscribe} disabled={pushLoading}>
                {pushLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <BellRing className="w-4 h-4 mr-2" />}
                Activează notificări push
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
