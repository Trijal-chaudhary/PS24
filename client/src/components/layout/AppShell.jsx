import React from 'react';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import PriorityBanner from './PriorityBanner';

export default function AppShell({
  children,
  user,
  activeTab,
  onSelectTab,
  syncStatus,
  onTriggerSync,
  isSyncing,
  priorityBannerData,
  onSelectIncident,
  alertsCount,
  onLogout
}) {
  return (
    <div className="app-shell">
      {/* Fixed Left Regulatory Sidebar */}
      <Sidebar user={user} activeTab={activeTab} onSelectTab={onSelectTab} alertsCount={alertsCount} onLogout={onLogout} />

      {/* Main App Container */}
      <div className="main-wrapper">
        {/* Top Header */}
        <TopHeader
          user={user}
          syncStatus={syncStatus}
          onTriggerSync={onTriggerSync}
          isSyncing={isSyncing}
        />

        {/* Priority Red Alert Banner */}
        <PriorityBanner onSelectIncident={onSelectIncident} />

        {/* Scrollable Dashboard View */}
        <main className="dashboard-content-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}

