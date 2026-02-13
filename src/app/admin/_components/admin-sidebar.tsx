import {
  Building2, Calculator, CreditCard, FileText, Home,
  LogOut, MessageSquare, Settings, Users, ChevronRight,
} from 'lucide-react';
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupLabel,
  SidebarMenuBadge, SidebarRail,
} from '@/components/ui/sidebar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { ActivePage, AdminUser, Stats } from '../_types';

interface AdminSidebarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  stats: Stats | null;
  currentUser: AdminUser | null;
  onLogout: () => void;
}

export function AdminSidebar({ activePage, setActivePage, stats, currentUser, onLogout }: AdminSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Building2 className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">EgoTax</span>
                <span className="truncate text-xs text-muted-foreground">Admin Panel</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigare</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activePage === 'dashboard'} onClick={() => setActivePage('dashboard')} tooltip="Dashboard">
                <Home className="size-4" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton isActive={activePage === 'transactions'} onClick={() => setActivePage('transactions')} tooltip="Tranzacții">
                <CreditCard className="size-4" />
                <span>Tranzacții</span>
              </SidebarMenuButton>
              {(stats?.overview.pendingCount || 0) > 0 && (
                <SidebarMenuBadge className="bg-yellow-500 text-white">
                  {stats?.overview.pendingCount}
                </SidebarMenuBadge>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Cereri</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activePage === 'oc_requests'} onClick={() => setActivePage('oc_requests')} tooltip="Cereri Servicii">
                <FileText className="size-4" />
                <span>Cereri Servicii</span>
              </SidebarMenuButton>
              {(stats?.overview.newOcRequests || 0) > 0 && (
                <SidebarMenuBadge className="bg-red-500 text-white animate-pulse">
                  {stats?.overview.newOcRequests}
                </SidebarMenuBadge>
              )}
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton isActive={activePage === 'calculator_requests'} onClick={() => setActivePage('calculator_requests')} tooltip="Cereri Calculator">
                <Calculator className="size-4" />
                <span>Calculator</span>
              </SidebarMenuButton>
              {(stats?.overview.newCalcRequests || 0) > 0 && (
                <SidebarMenuBadge className="bg-red-500 text-white animate-pulse">
                  {stats?.overview.newCalcRequests}
                </SidebarMenuBadge>
              )}
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton isActive={activePage === 'contact_requests'} onClick={() => setActivePage('contact_requests')} tooltip="Mesaje Contact">
                <MessageSquare className="size-4" />
                <span>Contact</span>
              </SidebarMenuButton>
              {(stats?.overview.newContactRequests || 0) > 0 && (
                <SidebarMenuBadge className="bg-red-500 text-white animate-pulse">
                  {stats?.overview.newContactRequests}
                </SidebarMenuBadge>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {currentUser?.permissions.canManageUsers && (
          <SidebarGroup>
            <SidebarGroupLabel>Administrare</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activePage === 'users'} onClick={() => setActivePage('users')} tooltip="Utilizatori">
                  <Users className="size-4" />
                  <span>Utilizatori</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activePage === 'prices'} onClick={() => setActivePage('prices')} tooltip="Prețuri Calculator">
                  <Calculator className="size-4" />
                  <span>Prețuri</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Sistem</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activePage === 'settings'} onClick={() => setActivePage('settings')} tooltip="Setări">
                <Settings className="size-4" />
                <span>Setări</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-primary/10">
                      {currentUser?.name?.[0] || currentUser?.username?.[0] || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{currentUser?.name || currentUser?.username}</span>
                    <span className="truncate text-xs text-muted-foreground">{currentUser?.role}</span>
                  </div>
                  <ChevronRight className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" side="right" align="end" sideOffset={4}>
                <DropdownMenuLabel>Contul meu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Deconectare
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
