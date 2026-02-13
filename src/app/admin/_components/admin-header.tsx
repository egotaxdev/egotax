import { Bell, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type { ActivePage } from '../_types';
import { pageTitles } from '../_constants';

interface AdminHeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  isRealtimeConnected: boolean;
  newRequestsCount: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AdminHeader({
  activePage,
  setActivePage,
  isRealtimeConnected,
  newRequestsCount,
  loading,
  onRefresh,
}: AdminHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 flex-1">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#" onClick={() => setActivePage('dashboard')}>
                Admin
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{pageTitles[activePage]}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1" title={isRealtimeConnected ? 'Live mode activ' : 'Reconectare...'}>
          {isRealtimeConnected ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-yellow-500 animate-pulse" />
          )}
          <span className="text-xs text-muted-foreground hidden sm:inline">
            {isRealtimeConnected ? 'Live' : '...'}
          </span>
        </div>

        <Separator orientation="vertical" className="h-4" />

        {newRequestsCount > 0 && (
          <Badge variant="destructive" className="animate-pulse">
            <Bell className="w-3 h-3 mr-1" />
            {newRequestsCount} noi
          </Badge>
        )}
        <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Actualizează</span>
        </Button>
      </div>
    </header>
  );
}
