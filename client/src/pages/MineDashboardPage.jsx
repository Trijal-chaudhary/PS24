import React from 'react';
import styles from './MineDashboardPage.module.css';

export default function MineDashboardPage({ user, onLogout }) {
  const mineId = user?.mine_id || 'JH-DHA-BCCL-007';
  const userName = user?.name || 'Mine Operations Manager';

  return (
    <div className={styles.pageContainer}>
      {/* Top Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brandBlock}>
            <img
              alt="Ministry of Coal Logo"
              className={styles.ministryLogo}
              src="/coalIndiaLogo.webp"
            />
            <img
              alt="Platform Logo"
              className={styles.solutionLogo}
              src="/logo.png"
            />
            <div>
              <h1 className={styles.title}>
                Mining Intelligence and Operational Visibilty Analytics
              </h1>
              <span className={styles.subtitle}>
                MINING INTELLIGENCE &amp; OPERATIONAL VISIBILITY ANALYTICS — {mineId}
              </span>
            </div>
          </div>

          <div className={styles.userInfo}>
            <div className={styles.userText}>
              <div className={styles.userName}>{userName}</div>
              <div className={styles.userRole}>Mine Operations Manager</div>
            </div>
            <button
              onClick={onLogout}
              className={styles.logoutBtn}
              title="Sign Out"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>logout</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.iconBox}>
            <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>engineering</span>
          </div>

          <h2 className={styles.cardTitle}>
            Mine Operations Manager Dashboard
          </h2>

          <div className={styles.mineBadge}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
            <span>Assigned Mine: {mineId}</span>
          </div>

          <p className={styles.cardDesc}>
            Mine-specific dashboard functionality will be implemented in Phase 2.
          </p>

          <div className={styles.detailsBlock}>
            <div className={styles.detailsTitle}>
              Assigned Account Details
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Manager Name:</span>
              <span className={styles.detailVal}>{userName}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Assigned Mine ID:</span>
              <span className={styles.detailVal} style={{ fontFamily: 'monospace' }}>{mineId}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Access Status:</span>
              <span className={styles.statusVal}>
                <span className={styles.greenDot}></span>
                Authorized
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div>
          © 2025 National Mine Safety &amp; Compliance Monitoring Platform. Mine Oversight Division.
        </div>
      </footer>
    </div>
  );
}
