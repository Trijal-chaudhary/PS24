import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import MineDashboardPage from './pages/MineDashboardPage';
import AppShell from './components/layout/AppShell';
import OverviewPage from './pages/OverviewPage';
import MineMonitoringPage from './pages/MineMonitoringPage';
import MineDetailPage from './pages/MineDetailPage';
import InspectionDirectoryPage from './pages/InspectionDirectoryPage';
import InspectionDetailPage from './pages/InspectionDetailPage';
import ViolationsDirectoryPage from './pages/ViolationsDirectoryPage';
import CorrectiveActionsPage from './pages/CorrectiveActionsPage';
import IncidentDirectoryPage from './pages/IncidentDirectoryPage';
import IncidentDetailPage from './pages/IncidentDetailPage';
import AttendanceWorkforcePage from './pages/AttendanceWorkforcePage';
import ContractorsDirectoryPage from './pages/ContractorsDirectoryPage';
import ContractorDetailPage from './pages/ContractorDetailPage';
import GrievancesDirectoryPage from './pages/GrievancesDirectoryPage';
import GrievanceDetailPage from './pages/GrievanceDetailPage';
import AIRiskIntelligencePage from './pages/AIRiskIntelligencePage';
import ReportsPage from './pages/ReportsPage';
import AlertsPage from './pages/AlertsPage';
import PlaceholderPage from './components/common/PlaceholderPage';
import { NAV_ITEMS } from './components/layout/Sidebar';
import { triggerTelemetrySync } from './services/api';

import './styles/global.css';
import './styles/shell.css';
import './styles/overview.css';
import './styles/map.css';
import './styles/mine-monitoring.css';
import './styles/mine-detail.css';
import './styles/inspections.css';
import './styles/incidents.css';
import './styles/attendance.css';

function parseCurrentRoute() {
  const path = window.location.pathname.replace(/^\/+/, '');
  const hash = window.location.hash.replace(/^#\/?/, '');
  const routeStr = path || hash;

  if (routeStr === 'login') {
    return { tab: 'login', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null };
  } else if (routeStr === 'mine-dashboard') {
    return { tab: 'overview', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null };
  } else if (routeStr === '' || routeStr === 'home') {
    return { tab: 'landing', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null };
  } else if (routeStr.startsWith('contractors/')) {
    const contractorId = routeStr.replace('contractors/', '');
    return { tab: 'contractors', mineId: null, inspectionId: null, incidentId: null, contractorId, grievanceId: null };
  } else if (routeStr === 'contractors') {
    return { tab: 'contractors', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null };
  } else if (routeStr.startsWith('grievances/')) {
    const submissionId = routeStr.replace('grievances/', '');
    return { tab: 'grievances', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: submissionId };
  } else if (routeStr === 'grievances') {
    return { tab: 'grievances', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null };
  } else if (routeStr.startsWith('incidents/')) {
    const submissionId = routeStr.replace('incidents/', '');
    return { tab: 'incidents', mineId: null, inspectionId: null, incidentId: submissionId, contractorId: null, grievanceId: null };
  } else if (routeStr === 'incidents') {
    return { tab: 'incidents', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null };
  } else if (routeStr.startsWith('inspections/')) {
    const submissionId = routeStr.replace('inspections/', '');
    return { tab: 'inspections', mineId: null, inspectionId: submissionId, incidentId: null, contractorId: null, grievanceId: null };
  } else if (routeStr === 'inspections') {
    return { tab: 'inspections', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null };
  } else if (routeStr === 'attendance-workforce' || routeStr === 'workforce' || routeStr === 'attendance') {
    return { tab: 'attendance-workforce', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null };
  } else if (routeStr === 'safety-violations' || routeStr === 'violations') {
    return { tab: 'violations', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null };
  } else if (routeStr === 'corrective-actions') {
    return { tab: 'corrective-actions', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null };
  } else if (routeStr.startsWith('mine/')) {
    const mineId = routeStr.replace('mine/', '');
    return { tab: 'monitoring', mineId, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null };
  } else if (routeStr === 'live-map') {
    if (typeof window !== 'undefined' && window.history?.replaceState) {
      window.history.replaceState(null, '', '/mine-monitoring');
    }
    return { tab: 'monitoring', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null, initialView: 'map' };
  } else if (routeStr === 'mine-monitoring' || routeStr === 'monitoring') {
    return { tab: 'monitoring', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null };
  } else if (routeStr === 'overview') {
    return { tab: 'overview', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null };
  } else {
    return { tab: routeStr, mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null };
  }
}

export default function App() {
  const [authUser, setAuthUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nmscm_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [routeState, setRouteState] = useState(parseCurrentRoute());
  const [syncStatus, setSyncStatus] = useState(null);
  const [priorityBannerData, setPriorityBannerData] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [alertsCount, setAlertsCount] = useState(null);

  useEffect(() => {
    const handleRouteChange = () => {
      setRouteState(parseCurrentRoute());
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  // Navigation Helpers
  const navigateToLogin = () => {
    window.history.pushState(null, '', '/login');
    setRouteState({ tab: 'login', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null });
  };

  const navigateToLanding = () => {
    window.history.pushState(null, '', '/');
    setRouteState({ tab: 'landing', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null });
  };

  const handleLoginSuccess = (user) => {
    try {
      localStorage.setItem('nmscm_user', JSON.stringify(user));
    } catch (e) {
      console.error("Failed to save auth state to localStorage", e);
    }
    setAuthUser(user);

    if (user.mine_id === 'centralized') {
      window.history.pushState(null, '', '/overview');
      setRouteState({ tab: 'overview', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null });
    } else {
      window.history.pushState(null, '', '/mine-dashboard');
      setRouteState({ tab: 'mine-dashboard', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null });
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('nmscm_user');
    } catch (e) {
      console.error("Failed to clear auth state", e);
    }
    setAuthUser(null);
    window.history.pushState(null, '', '/login');
    setRouteState({ tab: 'login', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null });
  };

  const navigateToMine = (mineId) => {
    const newPath = `/mine/${mineId}`;
    window.history.pushState(null, '', newPath);
    setRouteState({ tab: 'monitoring', mineId, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null });
  };

  const navigateToInspection = (submissionId) => {
    const newPath = `/inspections/${submissionId}`;
    window.history.pushState(null, '', newPath);
    setRouteState({ tab: 'inspections', mineId: null, inspectionId: submissionId, incidentId: null, contractorId: null, grievanceId: null });
  };

  const navigateToIncident = (submissionId) => {
    const newPath = `/incidents/${submissionId}`;
    window.history.pushState(null, '', newPath);
    setRouteState({ tab: 'incidents', mineId: null, inspectionId: null, incidentId: submissionId, contractorId: null, grievanceId: null });
  };

  const navigateToContractor = (contractorId) => {
    const newPath = `/contractors/${contractorId}`;
    window.history.pushState(null, '', newPath);
    setRouteState({ tab: 'contractors', mineId: null, inspectionId: null, incidentId: null, contractorId, grievanceId: null });
  };

  const navigateToGrievance = (submissionId) => {
    const newPath = `/grievances/${submissionId}`;
    window.history.pushState(null, '', newPath);
    setRouteState({ tab: 'grievances', mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: submissionId });
  };

  const handleSelectTab = (tabId) => {
    let newPath = '/overview';
    if (tabId === 'monitoring' || tabId === 'live-map') {
      newPath = '/mine-monitoring';
    } else if (tabId === 'inspections') {
      newPath = '/inspections';
    } else if (tabId === 'incidents') {
      newPath = '/incidents';
    } else if (tabId === 'attendance-workforce' || tabId === 'workforce') {
      newPath = '/attendance-workforce';
    } else if (tabId === 'contractors') {
      newPath = '/contractors';
    } else if (tabId === 'grievances') {
      newPath = '/grievances';
    } else if (tabId === 'violations') {
      newPath = '/safety-violations';
    } else if (tabId === 'corrective-actions') {
      newPath = '/corrective-actions';
    } else if (tabId !== 'overview') {
      newPath = `/${tabId}`;
    }

    window.history.pushState(null, '', newPath);
    setRouteState({ tab: tabId, mineId: null, inspectionId: null, incidentId: null, contractorId: null, grievanceId: null });
  };

  const handleUpdateSync = (newSync, newBanner) => {
    setSyncStatus(newSync || null);
    setPriorityBannerData(newBanner || null);
  };

  const handleTriggerSync = async () => {
    try {
      setIsSyncing(true);
      const res = await triggerTelemetrySync();
      setSyncStatus(prev => ({
        ...prev,
        pendingHandheldLogs: res?.pendingCount ?? 0,
        lastSynchronized: 'Just now'
      }));
    } catch (err) {
      console.error("Sync error:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  // --- ROUTE & AUTHENTICATION GUARD DECISION ---

  // 1. Unauthenticated state handling:
  if (!authUser) {
    if (routeState.tab === 'login') {
      return (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onBackToLanding={navigateToLanding}
        />
      );
    } else if (routeState.tab === 'landing') {
      return (
        <LandingPage
          onNavigateToLogin={navigateToLogin}
        />
      );
    } else {
      // Unauthenticated access to dashboard routes redirects to /login
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.history.replaceState(null, '', '/login');
      }
      return (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onBackToLanding={navigateToLanding}
        />
      );
    }
  }

  // 2. Routing Decision based on Authenticated Identity:
  // If user is logged in, redirect away from landing and login pages
  if (routeState.tab === 'landing' || routeState.tab === 'login') {
    const targetRoute = authUser.mine_id === 'centralized' ? '/overview' : '/mine-dashboard';
    if (typeof window !== 'undefined' && window.location.pathname !== targetRoute) {
      window.history.replaceState(null, '', targetRoute);
    }
  }

  const isMineManager = authUser.mine_id !== 'centralized';

  return (
    <AppShell
      user={authUser}
      activeTab={routeState.mineId ? 'monitoring' : (routeState.tab === 'landing' || routeState.tab === 'login' || routeState.tab === 'mine-dashboard' ? 'overview' : routeState.tab)}
      onSelectTab={handleSelectTab}
      syncStatus={syncStatus}
      onTriggerSync={handleTriggerSync}
      isSyncing={isSyncing}
      priorityBannerData={priorityBannerData}
      onSelectIncident={navigateToIncident}
      alertsCount={alertsCount}
      onLogout={handleLogout}
    >
      {routeState.contractorId ? (
        <ContractorDetailPage
          contractorId={routeState.contractorId}
          onBack={() => handleSelectTab('contractors')}
          onSelectMine={navigateToMine}
        />
      ) : routeState.grievanceId ? (
        <GrievanceDetailPage
          submissionId={routeState.grievanceId}
          onBack={() => handleSelectTab('grievances')}
          onSelectMine={navigateToMine}
        />
      ) : routeState.incidentId ? (
        <IncidentDetailPage
          submissionId={routeState.incidentId}
          onBack={() => handleSelectTab('incidents')}
          onSelectMine={navigateToMine}
        />
      ) : routeState.inspectionId ? (
        <InspectionDetailPage
          submissionId={routeState.inspectionId}
          onBack={() => handleSelectTab('inspections')}
          onSelectMine={navigateToMine}
        />
      ) : routeState.mineId ? (
        <MineDetailPage
          mineId={routeState.mineId}
          onBack={() => handleSelectTab('monitoring')}
          onSelectInspection={navigateToInspection}
          onSelectIncident={navigateToIncident}
          onSelectContractor={navigateToContractor}
          onSelectGrievance={navigateToGrievance}
        />
      ) : routeState.tab === 'monitoring' || routeState.tab === 'live-map' ? (
        <MineMonitoringPage
          onSelectMine={navigateToMine}
        />
      ) : routeState.tab === 'inspections' ? (
        <InspectionDirectoryPage
          onSelectInspection={navigateToInspection}
        />
      ) : routeState.tab === 'incidents' ? (
        <IncidentDirectoryPage
          onSelectIncident={navigateToIncident}
        />
      ) : routeState.tab === 'attendance-workforce' || routeState.tab === 'workforce' ? (
        <AttendanceWorkforcePage />
      ) : routeState.tab === 'contractors' ? (
        <ContractorsDirectoryPage
          onSelectContractor={navigateToContractor}
        />
      ) : routeState.tab === 'grievances' ? (
        <GrievancesDirectoryPage
          onSelectGrievance={navigateToGrievance}
        />
      ) : routeState.tab === 'violations' ? (
        <ViolationsDirectoryPage
          onSelectInspection={navigateToInspection}
        />
      ) : routeState.tab === 'corrective-actions' ? (
        <CorrectiveActionsPage
          onSelectInspection={navigateToInspection}
        />
      ) : routeState.tab === 'ai-risk' ? (
        <AIRiskIntelligencePage
          onSelectMine={navigateToMine}
        />
      ) : routeState.tab === 'reports' ? (
        <ReportsPage
          onSelectMine={navigateToMine}
        />
      ) : routeState.tab === 'alerts' ? (
        <AlertsPage
          onSelectMine={navigateToMine}
          onSelectInspection={navigateToInspection}
          onSelectIncident={navigateToIncident}
          onUpdateAlertsCount={setAlertsCount}
        />
      ) : (
        <OverviewPage
          onUpdateSyncStatus={handleUpdateSync}
          isSyncing={isSyncing}
          onTriggerSync={handleTriggerSync}
          onSelectMine={navigateToMine}
        />
      )}
    </AppShell>
  );
}
