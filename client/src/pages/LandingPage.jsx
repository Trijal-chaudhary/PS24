import React, { useState } from 'react';
import styles from './LandingPage.module.css';

export default function LandingPage({ onNavigateToLogin }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (onNavigateToLogin) {
      onNavigateToLogin();
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* HEADER */}
      <header className={styles.fixedHeader}>
        <div className={styles.topBar}>
          <div className={styles.topBarInner}>
            <div className={styles.topBarLeft}>
              <span className={styles.dot}></span>
              <span>Government of India | Ministry of Mines &amp; Safety Oversight</span>
            </div>
            <div className={styles.topBarRight}>
              <span>Statutory Regulatory Portal</span>
              <span>Official Oversight Authority</span>
            </div>
          </div>
        </div>
        <div className={styles.mainHeader}>
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
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>
                Mining Intelligence and Operational Visibility Analytics
              </span>
              <span className={styles.brandSub}>
                MINING INTELLIGENCE &amp; OPERATIONAL VISIBILITY ANALYTICS
              </span>
            </div>
          </div>
          <div className={styles.headerActions}>
            <nav className={`${styles.navMenu} ${isMobileMenuOpen ? styles.navMenuOpen : ''}`}>
              <a
                className={`${styles.navLink} ${styles.navLinkActive}`}
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                className={styles.navLink}
                href="#platform-overview"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                className={styles.navLink}
                href="#platform-overview"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                className={styles.navLink}
                href="#platform-overview"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Safety &amp; Compliance
              </a>
              <a
                className={styles.navLink}
                href="#footer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
            <div className={styles.headerBtnGroup}>
              <button onClick={handleLoginClick} className={styles.authorityBtn}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>lock</span>
                <span>Authority Login</span>
              </button>
              <div className={styles.userAvatar}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>person</span>
              </div>
              <button
                className={styles.mobileMenuToggle}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                <span className="material-symbols-outlined">
                  {isMobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className={styles.mainContent}>
        {/* SECTION 1: HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={styles.heroBg}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVn75kxxUXyOv5XaLl89BQsImbkjMU62lxR9Hg9nUsDWCKB5INWoMmRfNUW9XgdZMJHut-s2bRJEqxSX-4ikU6SHxZqIQ4mM2Vqyt0i4mcubEJ6hQV3npLYISUljq7qFafvguB6ChcqAyEKDJ5Ee6xreDMIsfUmSzM2xIlT_88l0ubiI8-6DckYIduOVi2pW5LmdVG8MaabZH7ECH7A-7eJiAYDniEFqqjTibrDsWAba8Gei8QN5hSkg"
              alt="Vast open-pit mining operation with safety oversight inspectors"
              className={styles.heroImg}
            />
            <div className={styles.heroOverlay}></div>
          </div>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#d97706' }}>verified_user</span>
                <span>National Mine Safety &amp; Compliance</span>
              </div>
              <h1 className={styles.heroTitle}>
                Safer Mines. Smarter Monitoring. Stronger Compliance.
              </h1>
              <p className={styles.heroDesc}>
                A unified digital platform for monitoring mine safety, inspections, incidents, compliance, workforce activities, and regulatory risk.
              </p>
              <div className={styles.heroBtnGroup}>
                <button onClick={handleLoginClick} className={styles.heroPrimaryBtn}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>lock</span>
                  <span>Authority Login</span>
                </button>
                <a className={styles.heroSecondaryBtn} href="#platform-overview">
                  <span>Explore Platform</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>expand_more</span>
                </a>
              </div>
              <div className={styles.heroMeta}>
                <span className={styles.heroMetaItem}>
                  <span className="material-symbols-outlined" style={{ fontSize: '15px', color: '#b45309' }}>shield</span>
                  <span>Centralized regulatory oversight</span>
                </span>
                <span>•</span>
                <span className={styles.heroMetaItem}>
                  <span className="material-symbols-outlined" style={{ fontSize: '15px', color: '#0f1e36' }}>check_circle</span>
                  <span>Mine-level monitoring</span>
                </span>
                <span>•</span>
                <span className={styles.heroMetaItem}>
                  <span className="material-symbols-outlined" style={{ fontSize: '15px', color: '#b45309' }}>data_thresholding</span>
                  <span>Evidence-based decision support</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: PLATFORM OVERVIEW */}
        <section className={styles.sectionWhite} id="platform-overview">
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTag}>
                Modular Governance Infrastructure
              </div>
              <h2 className={styles.sectionTitle}>
                Unified Mine Safety &amp; Compliance Monitoring
              </h2>
              <p className={styles.sectionDesc}>
                Bring field-level inspections, incidents, workforce information, compliance records, grievances, and operational evidence together in one secure monitoring platform.
              </p>
            </div>
            <div className={styles.grid3}>
              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>radar</span>
                  </div>
                  <h3 className={styles.cardTitle}>Mine Monitoring</h3>
                  <p className={styles.cardDesc}>
                    Track mine status, location, operational conditions, and risk indicators.
                  </p>
                </div>
                <div className={styles.cardFooter}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', marginRight: '4px' }}>location_on</span>
                  <span>Geospatial perimeter &amp; depth telemetry</span>
                </div>
              </div>

              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>fact_check</span>
                  </div>
                  <h3 className={styles.cardTitle}>Inspections &amp; Compliance</h3>
                  <p className={styles.cardDesc}>
                    Monitor inspections, violations, corrective actions, and compliance status.
                  </p>
                </div>
                <div className={styles.cardFooter}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', marginRight: '4px' }}>policy</span>
                  <span>Statutory Mines Act compliance checks</span>
                </div>
              </div>

              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>emergency</span>
                  </div>
                  <h3 className={styles.cardTitle}>Incident Management</h3>
                  <p className={styles.cardDesc}>
                    Record and review safety incidents, affected personnel, severity, and response actions.
                  </p>
                </div>
                <div className={styles.cardFooter}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', marginRight: '4px' }}>medical_services</span>
                  <span>Rapid triage &amp; statutory flash reporting</span>
                </div>
              </div>

              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>engineering</span>
                  </div>
                  <h3 className={styles.cardTitle}>Workforce Monitoring</h3>
                  <p className={styles.cardDesc}>
                    Review workforce attendance and mine-level workforce activity.
                  </p>
                </div>
                <div className={styles.cardFooter}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', marginRight: '4px' }}>badge</span>
                  <span>Biometric muster &amp; safety certified roster</span>
                </div>
              </div>

              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>folder_special</span>
                  </div>
                  <h3 className={styles.cardTitle}>Evidence Management</h3>
                  <p className={styles.cardDesc}>
                    Access inspection and incident evidence associated with field submissions.
                  </p>
                </div>
                <div className={styles.cardFooter}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', marginRight: '4px' }}>verified</span>
                  <span>Cryptographic timestamping &amp; chain of custody</span>
                </div>
              </div>

              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>insights</span>
                  </div>
                  <h3 className={styles.cardTitle}>AI-Assisted Risk Intelligence</h3>
                  <p className={styles.cardDesc}>
                    Analyze mine-specific inspection and incident information to identify important risk factors and patterns.
                  </p>
                </div>
                <div className={styles.cardFooter}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', marginRight: '4px' }}>timeline</span>
                  <span>Predictive geological &amp; structural alerts</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: BUILT FOR BETTER SAFETY OVERSIGHT */}
        <section className={styles.sectionSoft}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTag}>
                INSTITUTIONAL IMPACT
              </div>
              <h2 className={styles.sectionTitle}>
                Built for Better Safety Oversight
              </h2>
              <p className={styles.sectionDesc}>
                Purpose-engineered to reduce occupational hazards and establish absolute transparency across statutory mining operations.
              </p>
            </div>

            <div className={styles.grid4}>
              {/* Card 1 */}
              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>desktop_windows</span>
                  </div>
                  <h3 className={styles.cardTitle}>Centralized Monitoring</h3>
                  <p className={styles.cardDesc}>
                    Single-pane-of-glass visibility across mines, enabling centralized oversight and clear accountability at both regulatory and mine levels.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>speed</span>
                  </div>
                  <h3 className={styles.cardTitle}>Faster Visibility</h3>
                  <p className={styles.cardDesc}>
                    Immediate telemetry and real-time alerts ensure swift response times to emerging hazards.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>document_scanner</span>
                  </div>
                  <h3 className={styles.cardTitle}>Evidence-Based Oversight</h3>
                  <p className={styles.cardDesc}>
                    Tamper-evident digital trails, geo-tagged photos, and verified inspection signatures.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>badge</span>
                  </div>
                  <h3 className={styles.cardTitle}>Worker Attendance Tracking</h3>
                  <p className={styles.cardDesc}>
                    Monitor workforce attendance, shift-wise headcount, and worker presence across mining operations.
                  </p>
                </div>
              </div>

              {/* Card 5 */}
              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>support_agent</span>
                  </div>
                  <h3 className={styles.cardTitle}>Grievance Handling</h3>
                  <p className={styles.cardDesc}>
                    Capture worker grievances and observations, track their status, and support timely redressal.
                  </p>
                </div>
              </div>

              {/* Card 6 */}
              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>precision_manufacturing</span>
                  </div>
                  <h3 className={styles.cardTitle}>Production Reporting</h3>
                  <p className={styles.cardDesc}>
                    Monitor mine production reporting and operational output to maintain a consolidated view of mine activity.
                  </p>
                </div>
              </div>

              {/* Card 7 */}
              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>eco</span>
                  </div>
                  <h3 className={styles.cardTitle}>Environmental Monitoring</h3>
                  <p className={styles.cardDesc}>
                    Track environmental indicators including pollution, water usage, and land reclamation metrics alongside mine operations.
                  </p>
                </div>
              </div>

              {/* Card 8 */}
              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>warning</span>
                  </div>
                  <h3 className={styles.cardTitle}>Emergency Situations</h3>
                  <p className={styles.cardDesc}>
                    Support rapid visibility and coordinated response during critical incidents, emergencies, and mine safety situations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: SECURE ACCESS FOR AUTHORIZED AUTHORITIES */}
        <section className={styles.sectionLight}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTag}>
                INSTITUTIONAL SECURITY &amp; COMPLIANCE
              </div>
              <h2 className={styles.sectionTitle}>
                Secure Access for Authorized Authorities
              </h2>
              <p className={styles.sectionDesc}>
                Role-based access ensures that users see the information and monitoring tools relevant to their responsibilities.
              </p>
            </div>

            <div className={styles.grid4}>
              {/* Card 1 */}
              <div className={styles.featureCard} style={{ backgroundColor: '#ffffff' }}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>manage_accounts</span>
                  </div>
                  <h3 className={styles.cardTitle}>RBAC Architecture</h3>
                  <p className={styles.cardDesc}>
                    Single-pane-of-glass visibility across mines, enabling centralized oversight and clear accountability at both regulatory and mine levels.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className={styles.featureCard} style={{ backgroundColor: '#ffffff' }}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>vpn_key</span>
                  </div>
                  <h3 className={styles.cardTitle}>Authority Authentication</h3>
                  <p className={styles.cardDesc}>
                    Statutory credential verification, multi-factor tokens, and cryptographic session management.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className={styles.featureCard} style={{ backgroundColor: '#ffffff' }}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>history_edu</span>
                  </div>
                  <h3 className={styles.cardTitle}>Audit Trail Verification</h3>
                  <p className={styles.cardDesc}>
                    Immutable log records for all statutory sign-offs, modifications, and enforcement submissions.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className={styles.featureCard} style={{ backgroundColor: '#ffffff' }}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>fact_check</span>
                  </div>
                  <h3 className={styles.cardTitle}>Inspection &amp; Compliance Tracking</h3>
                  <p className={styles.cardDesc}>
                    Manage mine inspections, identify violations, track corrective actions, and monitor compliance status from a unified platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: HOW THE PLATFORM OPERATES */}
        <section className={styles.sectionSoft}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTag}>
                Operational Flow Architecture
              </div>
              <h2 className={styles.sectionTitle}>
                How the Platform Operates
              </h2>
              <p className={styles.sectionDesc}>
                Seamless end-to-end flow from field data capture to national regulatory governance.
              </p>
            </div>

            <div className={styles.grid4}>
              <div className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>STEP 01</span>
                  <span className={`material-symbols-outlined ${styles.stepIcon}`}>app_registration</span>
                </div>
                <h3 className={styles.cardTitle}>Field Submission</h3>
                <p className={styles.cardDesc}>
                  Field officers and safety inspectors log real-time digital inspection logs, geo-tagged photos, and shift parameters directly from mine sites.
                </p>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>STEP 02</span>
                  <span className={`material-symbols-outlined ${styles.stepIcon}`}>hub</span>
                </div>
                <h3 className={styles.cardTitle}>Centralized Processing</h3>
                <p className={styles.cardDesc}>
                  Automated validation verifies compliance benchmarks, aggregates sensory logs, and indexes incident documentation in accordance with DGMS norms.
                </p>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>STEP 03</span>
                  <span className={`material-symbols-outlined ${styles.stepIcon}`}>monitoring</span>
                </div>
                <h3 className={styles.cardTitle}>Safety &amp; Compliance Monitoring</h3>
                <p className={styles.cardDesc}>
                  Continuous evaluation tracks safety scorecards, statutory compliance deadlines, and anomaly detection across high-risk operational zones.
                </p>
              </div>

              <div className={styles.stepCard}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>STEP 04</span>
                  <span className={`material-symbols-outlined ${styles.stepIcon}`}>gavel</span>
                </div>
                <h3 className={styles.cardTitle}>Regulatory Decision Support</h3>
                <p className={styles.cardDesc}>
                  Executive dashboards and automated notices empower authorities to issue corrective directives and enforce statutory safety mandates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: FINAL CALL TO ACTION */}
        <section className={styles.sectionWhite}>
          <div className={styles.ctaContainer}>
            <div className={styles.ctaCard}>
              <div className={styles.ctaIconBox}>
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>lock</span>
              </div>
              <h2 className={styles.ctaTitle}>
                Access the Mine Safety Monitoring Platform
              </h2>
              <p className={styles.ctaDesc}>
                Authorized personnel can securely access the monitoring dashboard using their assigned credentials.
              </p>
              <button onClick={handleLoginClick} className={styles.heroPrimaryBtn}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>lock</span>
                <span>Authority Login</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer} id="footer">
        <div className={styles.sectionContainer}>
          <div className={styles.footerGrid}>
            <div>
              <div className={styles.brandBlock} style={{ marginBottom: '0.75rem' }}>
                <img
                  alt="Ministry of Coal Logo"
                  className={styles.ministryLogo}
                  style={{ height: '32px' }}
                  src="/coalIndiaLogo.webp"
                />
                <img
                  alt="Platform Logo"
                  className={styles.solutionLogo}
                  style={{ height: '32px' }}
                  src="/logo.png"
                />
                <span className={styles.brandTitle} style={{ fontSize: '15px' }}>
                  Mining Intelligence and Operational Visibilty Analytics
                </span>
              </div>
              <p className={styles.cardDesc} style={{ fontSize: '12px', marginBottom: '1rem' }}>
                Digital platform for mine safety, compliance, and regulatory monitoring under statutory provisions of the Mines Act.
              </p>
            </div>

            <div>
              <div className={styles.footerTitle}>Portal Directives</div>
              <ul className={styles.footerList}>
                <li><a className={styles.footerLink} href="#platform-overview">About</a></li>
                <li><a className={styles.footerLink} href="#platform-overview">Features</a></li>
                <li><a className={styles.footerLink} href="#platform-overview">Safety &amp; Compliance</a></li>
                <li><a className={styles.footerLink} href="#footer">Contact</a></li>
              </ul>
            </div>

            <div>
              <div className={styles.footerTitle}>Statutory &amp; Legal</div>
              <ul className={styles.footerList}>
                <li><a className={styles.footerLink} href="#">Portal Guidelines</a></li>
                <li><a className={styles.footerLink} href="#">Accessibility Statement</a></li>
                <li><a className={styles.footerLink} href="#">Privacy Policy</a></li>
                <li>
                  <button onClick={handleLoginClick} className={styles.footerLink}>
                    Authority Login
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div className={styles.footerTitle}>Regulatory Office</div>
              <p className={styles.cardDesc} style={{ fontSize: '12px' }}>
                Directorate General of Mine Safety (DGMS)<br />
                Ministry of Mines &amp; Safety Oversight<br />
                New Delhi, 110001
              </p>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <div>© 2025 National Mine Safety &amp; Compliance Monitoring Platform. Official Regulatory Oversight Portal. All Rights Reserved.</div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span>National Informatics Infrastructure</span>
              <span>Official Gazette Release v2.4</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
