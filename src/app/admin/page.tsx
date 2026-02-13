'use client';

import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Toaster } from 'sonner';

import type {
  ActivePage,
  AdminUser,
  PaymentTransaction,
  OCRequest,
  CalculatorRequest,
  ContactRequest,
  CalculatorPriceItem,
} from './_types';

import { useAdminAuth } from './_hooks/use-admin-auth';
import { useAdminData } from './_hooks/use-admin-data';
import { usePushNotifications } from './_hooks/use-push-notifications';

import { LoginScreen } from './_components/login-screen';
import { AdminSidebar } from './_components/admin-sidebar';
import { AdminHeader } from './_components/admin-header';

import { DashboardPage } from './_components/pages/dashboard-page';
import { TransactionsPage } from './_components/pages/transactions-page';
import { OCRequestsPage } from './_components/pages/oc-requests-page';
import { CalculatorRequestsPage } from './_components/pages/calculator-requests-page';
import { ContactRequestsPage } from './_components/pages/contact-requests-page';
import { UsersPage } from './_components/pages/users-page';
import { PricesPage } from './_components/pages/prices-page';
import { SettingsPage } from './_components/pages/settings-page';

import { TransactionDetailSheet } from './_components/sheets/transaction-detail-sheet';
import { RequestDetailSheet } from './_components/sheets/request-detail-sheet';
import { RefundDialog } from './_components/dialogs/refund-dialog';
import { UserDialog } from './_components/dialogs/user-dialog';
import { PriceDialog } from './_components/dialogs/price-dialog';

export default function AdminPage() {
  const auth = useAdminAuth();

  // UI state
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Sheet/Dialog state
  const [selectedTransaction, setSelectedTransaction] = useState<PaymentTransaction | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<{ data: OCRequest | CalculatorRequest | ContactRequest; table: string } | null>(null);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [refundTransaction, setRefundTransaction] = useState<PaymentTransaction | null>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [showPriceDialog, setShowPriceDialog] = useState(false);
  const [editingPrice, setEditingPrice] = useState<CalculatorPriceItem | null>(null);

  const data = useAdminData({
    authToken: auth.authToken,
    currentUser: auth.currentUser,
    isAuthenticated: auth.isAuthenticated,
    onLogout: auth.handleLogout,
    onNavigate: setActivePage,
  });

  const push = usePushNotifications(auth.isAuthenticated, auth.authToken);

  // Reset filters on page change
  const handlePageChange = (page: ActivePage) => {
    setActivePage(page);
    setSearchQuery('');
    setStatusFilter('all');
  };

  // Export handler
  const handleExport = async (type: string) => {
    if (!auth.authToken) return;
    const res = await fetch(`/api/admin/export?type=${type}`, {
      headers: { 'Authorization': `Bearer ${auth.authToken}` },
    });
    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Delete user handler
  const handleDeleteUser = async (id: string) => {
    if (!auth.authToken || !confirm('Sigur doriți să ștergeți acest utilizator?')) return;
    const res = await fetch(`/api/admin/users?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${auth.authToken}` },
    });
    if (res.ok) {
      data.fetchUsers();
    } else {
      const d = await res.json();
      alert(`Eroare: ${d.error}`);
    }
  };

  // Refund flow
  const handleRefundClick = (tx: PaymentTransaction) => {
    setRefundTransaction(tx);
    setShowRefundDialog(true);
  };

  if (!auth.isAuthenticated) {
    return (
      <LoginScreen
        username={auth.username}
        setUsername={auth.setUsername}
        password={auth.password}
        setPassword={auth.setPassword}
        error={auth.error}
        loading={auth.loading}
        onSubmit={auth.handleLogin}
      />
    );
  }

  const newRequestsCount = data.stats?.overview.newRequests || 0;

  return (
    <SidebarProvider>
      <Toaster richColors position="top-right" />

      {/* Notification sound */}
      <audio ref={data.audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Onp2ZlZONkZaYm5mVko2KjI6Rk5OSkI2LjI+SlJSSkI2LjI+SlJSSkI2LjI+SkpKQjo2Mjo+QkZCPjo2Njo+QkZCPjo2Njo+Qj4+OjY2Ojo+Pj46NjY2Ojo+Pj46NjY2Ojo+Pjo6NjY2Ojo6Ojo6NjY2Njo6Ojo6NjY2Njo6Ojo2NjY2NjY6OjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2N" />

      <AdminSidebar
        activePage={activePage}
        setActivePage={handlePageChange}
        stats={data.stats}
        currentUser={auth.currentUser}
        onLogout={auth.handleLogout}
      />

      <SidebarInset>
        <AdminHeader
          activePage={activePage}
          setActivePage={handlePageChange}
          isRealtimeConnected={data.isRealtimeConnected}
          newRequestsCount={newRequestsCount}
          loading={data.loading}
          onRefresh={() => { data.fetchData(); data.fetchStats(); }}
        />

        <div className="flex-1 overflow-auto p-6">
          {activePage === 'dashboard' && (
            <DashboardPage
              stats={data.stats}
              transactions={data.transactions}
              newRequestsCount={newRequestsCount}
              onExport={handleExport}
            />
          )}

          {activePage === 'transactions' && (
            <TransactionsPage
              transactions={data.transactions}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              currentUser={auth.currentUser}
              onViewTransaction={setSelectedTransaction}
              onRefundTransaction={handleRefundClick}
            />
          )}

          {activePage === 'oc_requests' && (
            <OCRequestsPage
              requests={data.ocRequests}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              onEditRequest={(req) => setSelectedRequest({ data: req, table: 'oc_requests' })}
            />
          )}

          {activePage === 'calculator_requests' && (
            <CalculatorRequestsPage
              requests={data.calculatorRequests}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              onEditRequest={(req) => setSelectedRequest({ data: req, table: 'calculator_requests' })}
            />
          )}

          {activePage === 'contact_requests' && (
            <ContactRequestsPage
              requests={data.contactRequests}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              onEditRequest={(req) => setSelectedRequest({ data: req, table: 'contact_requests' })}
            />
          )}

          {activePage === 'users' && auth.currentUser?.permissions.canManageUsers && (
            <UsersPage
              adminUsers={data.adminUsers}
              currentUser={auth.currentUser}
              onAddUser={() => { setEditingUser(null); setShowUserDialog(true); }}
              onEditUser={(user) => { setEditingUser(user); setShowUserDialog(true); }}
              onDeleteUser={handleDeleteUser}
            />
          )}

          {activePage === 'prices' && auth.currentUser?.permissions.canManageUsers && (
            <PricesPage
              calculatorPrices={data.calculatorPrices}
              onEditPrice={(price) => { setEditingPrice(price); setShowPriceDialog(true); }}
            />
          )}

          {activePage === 'settings' && (
            <SettingsPage
              pushSupported={push.pushSupported}
              pushSubscription={push.pushSubscription}
              pushLoading={push.pushLoading}
              onPushSubscribe={push.handlePushSubscribe}
              onPushUnsubscribe={push.handlePushUnsubscribe}
            />
          )}
        </div>
      </SidebarInset>

      {/* Transaction Detail Sheet */}
      <TransactionDetailSheet
        transaction={selectedTransaction}
        open={!!selectedTransaction && !showRefundDialog}
        onOpenChange={(open) => { if (!open) setSelectedTransaction(null); }}
        currentUser={auth.currentUser}
        onRefund={handleRefundClick}
      />

      {/* Request Detail Sheet */}
      <RequestDetailSheet
        request={selectedRequest}
        open={!!selectedRequest}
        onOpenChange={(open) => { if (!open) setSelectedRequest(null); }}
        authToken={auth.authToken}
        onSaved={data.fetchData}
      />

      {/* Refund Dialog */}
      <RefundDialog
        transaction={refundTransaction}
        open={showRefundDialog}
        onOpenChange={setShowRefundDialog}
        authToken={auth.authToken}
        onRefunded={() => { data.fetchData(); setSelectedTransaction(null); }}
      />

      {/* User Dialog */}
      <UserDialog
        editingUser={editingUser}
        open={showUserDialog}
        onOpenChange={setShowUserDialog}
        authToken={auth.authToken}
        onSaved={data.fetchUsers}
      />

      {/* Price Dialog */}
      <PriceDialog
        editingPrice={editingPrice}
        open={showPriceDialog}
        onOpenChange={setShowPriceDialog}
        authToken={auth.authToken}
        onSaved={data.fetchPrices}
      />
    </SidebarProvider>
  );
}
