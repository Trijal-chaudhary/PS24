import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, Bell, AlertTriangle } from 'lucide-react';

export default function TopHeader({ user, syncStatus, onTriggerSync, isSyncing }) {
  const [currentTime, setCurrentTime] = useState('');

  const isMineManager = user && user.role === 'mine_operations_manager';
  const subtitleText = isMineManager
    ? `MINE-SPECIFIC MONITORING | ${user.mine_id}`
    : 'MINING INTELLIGENCE & OPERATIONAL VISIBILITY ANALYTICS | DGMS';

  useEffect(() => {
    function updateLiveIST() {
      const now = new Date();
      // Format to IST: "24 Oct 2024, 14:32:10"
      const options = {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatted = new Intl.DateTimeFormat('en-IN', options).format(now);
      setCurrentTime(formatted);
    }

    updateLiveIST();
    const timer = setInterval(updateLiveIST, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="top-header">
      <div className="header-left">
        <div className="platformBranding">
          <h2 className="platformTitle">Mining Intelligence and Operational Visibilty Analytics</h2>
          <span className="platformSubtitle">{subtitleText}</span>
        </div>
      </div>

      <div className="header-center">
        <div className="header-search-bar">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search mine, asset ID, inspector, citation..."
            className="header-search-input"
            aria-label="Global quick search"
          />
          <kbd className="search-kbd">Ctrl K</kbd>
        </div>
      </div>

      <div className="header-right">
        <div className="data-sync-pill">
          <span className="sync-status-dot"></span>
          <span className="sync-label">Data Sync: Operational</span>
          <span className="sync-time">{syncStatus?.lastSynchronized || '—'}</span>
          <button
            className="sync-btn-icon"
            onClick={onTriggerSync}
            title="Trigger Telemetry Refresh"
            disabled={isSyncing}
          >
            <RefreshCw size={12} className={isSyncing ? 'animate-spin' : ''} />
          </button>
        </div>

        <button className="header-bell-btn" title="Statutory Notifications">
          <Bell size={17} />
          <span className="header-bell-badge"></span>
        </button>

        <div className="live-clock-box">
          <span className="live-clock-tag">LIVE IST</span>
          <span className="live-clock-val">{currentTime || '24 Oct 2024, 14:32:10'}</span>
        </div>

        <button className="authority-alert-btn" title="View Authority Alert Feed">
          <AlertTriangle size={14} />
          <span>Authority Alert Feed</span>
        </button>
      </div>
    </header>
  );
}
