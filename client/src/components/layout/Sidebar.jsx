import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Mountain,
  MapPin,
  ClipboardCheck,
  ShieldAlert,
  AlertOctagon,
  Users,
  FileSpreadsheet,
  MessageSquareWarning,
  CheckCircle2,
  Sparkles,
  BarChart3,
  BellRing,
  Settings,
  SlidersHorizontal,
  LogOut
} from 'lucide-react';
import { getIncidents, getAlerts } from '../../services/api';

export const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'monitoring', label: 'Mine Monitoring', icon: Mountain },
  { id: 'inspections', label: 'Inspections', icon: ClipboardCheck },
  { id: 'violations', label: 'Safety & Violations', icon: ShieldAlert },
  { id: 'incidents', label: 'Incidents', icon: AlertOctagon, badge: '2 CRITICAL', badgeClass: 'sidebar-badge-red' },
  { id: 'attendance-workforce', label: 'Attendance & Workforce', icon: Users },
  { id: 'contractors', label: 'Contractors & Documents', icon: FileSpreadsheet },
  { id: 'grievances', label: 'Grievances & Observations', icon: MessageSquareWarning },
  { id: 'corrective-actions', label: 'Corrective Actions', icon: CheckCircle2 },
  { id: 'ai-risk', label: 'AI Risk Intelligence', icon: Sparkles, badge: 'AI', badgeClass: 'sidebar-badge-purple' },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'alerts', label: 'Alerts', icon: BellRing, badge: null, badgeClass: 'sidebar-badge-blue' },
  { id: 'admin', label: 'Administration', icon: Settings },
];

export default function Sidebar({ user, activeTab, onSelectTab, criticalIncidentsCount, alertsCount: propsAlertsCount, onLogout }) {
  const [criticalCount, setCriticalCount] = useState(criticalIncidentsCount ?? null);
  const [alertsCount, setAlertsCount] = useState(propsAlertsCount ?? null);

  const isMineManager = user && user.role === 'mine_operations_manager';
  const profileAvatar = isMineManager
    ? (user.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'MM')
    : 'RS';
  const profileName = isMineManager ? (user.name || 'Mine Operations Manager') : 'Dr. Ravi Shankar Mishra';
  const profileTitle = isMineManager ? 'Mine Operations Manager' : 'Director General of Mines Safety (DGMS)';
  const profileMinistry = isMineManager
    ? `Assigned Mine: ${user.mine_id || 'JH-DHA-BCCL-007'}`
    : 'Ministry of Labour & Employment, Govt of India';

  useEffect(() => {
    let isMounted = true;
    if (criticalIncidentsCount !== undefined) {
      setCriticalCount(criticalIncidentsCount);
    } else {
      getIncidents()
        .then(res => {
          if (isMounted && res?.summary?.criticalIncidents !== undefined) {
            setCriticalCount(res.summary.criticalIncidents);
          }
        })
        .catch(err => {
          console.error("Error fetching critical incidents for sidebar badge:", err);
        });
    }

    if (propsAlertsCount !== undefined && propsAlertsCount !== null) {
      setAlertsCount(propsAlertsCount);
    } else {
      getAlerts()
        .then(res => {
          const count = res?.count ?? res?.totalCount ?? (Array.isArray(res?.alerts) ? res.alerts.length : (Array.isArray(res) ? res.length : 0));
          if (isMounted) {
            setAlertsCount(count);
          }
        })
        .catch(err => {
          console.error("Error fetching alerts count for sidebar badge:", err);
        });
    }

    return () => { isMounted = false; };
  }, [criticalIncidentsCount, propsAlertsCount]);


  return (
    <aside className="sidebar">
      {/* Brand / Title */}
      <div className="sidebar-header">
        <div className="sidebarBranding">
          <div className="logoRow">
            <img
              className="ministryLogo"
              src="/coalIndiaLogo.webp"
              alt="Ministry of Coal"
            />
            <img
              className="solutionLogo"
              src="/logo.png"
              alt="Platform Logo"
            />
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const badgeText = item.id === 'incidents' && criticalCount !== null
            ? `${criticalCount} CRITICAL`
            : item.id === 'alerts' && alertsCount !== null
            ? `${alertsCount}`
            : item.badge;

          return (
            <button
              key={item.id}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(item.id)}
            >
              <div className="sidebar-item-left">
                <Icon className="sidebar-item-icon" />
                <span>{item.label}</span>
              </div>
              {badgeText && (
                <span className={`sidebar-badge ${item.badgeClass}`}>
                  {badgeText}
                </span>
              )}
            </button>
          );
        })}
      </nav>


      {/* Profile Footer */}
      <div className="sidebar-footer">
        <div className="profile-card">
          <div className="profile-avatar">{profileAvatar}</div>
          <div className="profile-info">
            <span className="profile-name">{profileName}</span>
            <span className="profile-title">{profileTitle}</span>
            <span className="profile-ministry">{profileMinistry}</span>
          </div>
        </div>

        <div className="sidebar-footer-actions">
          <div className="lang-switch">
            <span className="active">English (EN)</span> | <span>हिन्दी (HI)</span>
          </div>
          <div className="footer-icons">
            <span className="footer-icon-btn" title="Dashboard Settings"><SlidersHorizontal size={13} /></span>
            <button className="footer-icon-btn" title="Sign Out" onClick={onLogout} style={{ border: 'none', background: 'none', color: 'inherit', cursor: 'pointer' }}><LogOut size={13} /></button>
          </div>
        </div>
      </div>
    </aside>
  );
}
