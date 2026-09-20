import React, { useState } from 'react';
import styles from './LandingPage.module.css';

export default function LandingPage({ onNavigateToLogin }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLoginClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onNavigateToLogin) {
      onNavigateToLogin();
    }
  };

  const handleNavClick = (e, targetId) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
              >
                Home
              </a>
              <a 
                className={styles.navLink} 
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
              >
                About
              </a>
              <a 
                className={styles.navLink} 
                href="#features"
                onClick={(e) => handleNavClick(e, 'features')}
              >
                Features
              </a>
              <a 
                className={styles.navLink} 
                href="#safety-compliance"
                onClick={(e) => handleNavClick(e, 'safety-compliance')}
              >
                Safety &amp; Compliance
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
        <section className={styles.heroSection} id="home">
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
                <a className={styles.heroSecondaryBtn} href="#about">
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
                  <span className="material-symbols-outlined" style={{ fontSize: '15px', color: '#1d4ed8' }}>check_circle</span>
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

        {/* SECTION 2: ABOUT SECTION */}
        <section className={styles.sectionWhite} id="about">
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTag}>
                GOVERNANCE &amp; OPERATIONAL TRANSPARENCY
              </div>
              <h2 className={styles.sectionTitle}>
                About the Platform
              </h2>
              <p className={styles.sectionDesc}>
                Mining Intelligence and Operational Visibility Analytics (MINOVA) is designed to bring mining safety, statutory compliance, inspections, incidents, workforce information, and operational reporting into a unified digital platform.
              </p>
            </div>

            <div className={styles.aboutIntroCard}>
              <p className={styles.aboutIntroText}>
                The platform helps address fragmented reporting and limited visibility by organizing information from field-level activities into structured, role-governed web dashboards and mobile applications.
              </p>
              <p className={styles.aboutIntroText}>
                It supports coordination between field inspectors, mine employees, mine operations managers, mining companies, and centralized regulatory authorities through a common monitoring and reporting infrastructure.
              </p>
            </div>

            <div className={styles.aboutSubgrid}>
              <div className={styles.aboutSubcard}>
                <div className={styles.iconBox}>
                  <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>warning_amber</span>
                </div>
                <h3 className={styles.cardTitle}>Consolidated Visibility &amp; Data Integration</h3>
                <p className={styles.cardDesc}>
                  By bringing together inspection records, incident reporting, workforce attendance, production reporting, grievances, and environmental indicators, MINOVA connects field-level operations with higher-level regulatory and corporate oversight.
                </p>
              </div>

              <div className={styles.aboutSubcard}>
                <div className={styles.iconBox}>
                  <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>insights</span>
                </div>
                <h3 className={styles.cardTitle}>Structured Data &amp; AI Risk Intelligence</h3>
                <p className={styles.cardDesc}>
                  MINOVA combines structured operational data with AI-assisted analysis to help users understand mine risks, recurring violations, and notable patterns, supporting a connected web-and-mobile workflow for field reporting, review, follow-up, and coordination.
                </p>
              </div>
            </div>

            <div className={styles.userGroupsHeader}>
              <h3 className={styles.userGroupsTitle}>Stakeholders Connected by MINOVA</h3>
              <p className={styles.sectionDesc}>Five distinct user groups connected through role-governed workflows and dedicated interfaces:</p>
            </div>

            <div className={styles.userGroupGrid}>
              <div className={styles.userGroupCard}>
                <div className={styles.userGroupIcon}>
                  <span className="material-symbols-outlined">assignment_ind</span>
                </div>
                <span className={styles.userGroupBadge}>Mobile App</span>
                <h4 className={styles.userGroupRole}>Field Inspectors</h4>
                <p className={styles.userGroupDesc}>
                  Submit digital inspection reports containing checklist responses, findings, remarks, location coordinates, timestamps, and supporting evidence directly from mine sites.
                </p>
              </div>

              <div className={styles.userGroupCard}>
                <div className={styles.userGroupIcon}>
                  <span className="material-symbols-outlined">engineering</span>
                </div>
                <span className={styles.userGroupBadge}>Mobile App</span>
                <h4 className={styles.userGroupRole}>Mine Employees</h4>
                <p className={styles.userGroupDesc}>
                  Report safety incidents and observations in real time, submit operational grievances, and receive assigned response tasks and status updates.
                </p>
              </div>

              <div className={styles.userGroupCard}>
                <div className={styles.userGroupIcon}>
                  <span className="material-symbols-outlined">badge</span>
                </div>
                <span className={styles.userGroupBadge}>Mine Dashboard</span>
                <h4 className={styles.userGroupRole}>Mine Operations Managers</h4>
                <p className={styles.userGroupDesc}>
                  Review incidents, assign response specialists and equipment, track worker shift attendance, manage production reports, and handle worker grievances.
                </p>
              </div>

              <div className={styles.userGroupCard}>
                <div className={styles.userGroupIcon}>
                  <span className="material-symbols-outlined">domain</span>
                </div>
                <span className={styles.userGroupBadge}>Company Dashboard</span>
                <h4 className={styles.userGroupRole}>Mining Companies</h4>
                <p className={styles.userGroupDesc}>
                  Access aggregated operational visibility across company-managed mines, review production reports, and monitor company-wide safety and compliance metrics.
                </p>
              </div>

              <div className={styles.userGroupCard}>
                <div className={styles.userGroupIcon}>
                  <span className="material-symbols-outlined">account_balance</span>
                </div>
                <span className={styles.userGroupBadge}>Authority Dashboard</span>
                <h4 className={styles.userGroupRole}>Centralized Authorities</h4>
                <p className={styles.userGroupDesc}>
                  Maintain national regulatory oversight, review inspection findings, monitor statutory compliance deadlines, and track incidents across all monitored mines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: FEATURES SECTION (A through P) */}
        <section className={styles.sectionSoft} id="features">
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTag}>
                CORE SYSTEM CAPABILITIES
              </div>
              <h2 className={styles.sectionTitle}>
                Platform Features
              </h2>
              <p className={styles.sectionDesc}>
                Comprehensive capabilities engineered to digitize field records, streamline regulatory oversight, and facilitate operational coordination across mining environments.
              </p>
            </div>

            <div className={styles.grid4}>
              {/* Feature 1 */}
              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>fact_check</span>
                  </div>
                  <h3 className={styles.cardTitle}>Digital Inspections &amp; Compliance Management</h3>
                  <p className={styles.cardDesc}>
                    Digitize field inspections, capture observations and evidence, track violations, and manage corrective actions through resolution and verification. Support organized monitoring of mine safety and statutory compliance.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>psychology</span>
                  </div>
                  <h3 className={styles.cardTitle}>AI-Powered Mine Risk Intelligence</h3>
                  <p className={styles.cardDesc}>
                    Use AI-assisted analysis of available mine data to explain risk factors, identify recurring violations, highlight notable patterns, and provide analytical insights that support informed decision-making.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>map</span>
                  </div>
                  <h3 className={styles.cardTitle}>GIS-Based Mine Monitoring</h3>
                  <p className={styles.cardDesc}>
                    Explore mine locations through map-based monitoring and geographic views. Help users understand the spatial context of available mine information and location-based records.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>emergency</span>
                  </div>
                  <h3 className={styles.cardTitle}>Incident &amp; Emergency Response Coordination</h3>
                  <p className={styles.cardDesc}>
                    Organize incident reports, severity, evidence, and follow-up activities. Support mine managers in coordinating suitable personnel and equipment, assigning response tasks, and tracking relevant updates.
                  </p>
                </div>
              </div>

              {/* Feature 5 */}
              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>badge</span>
                  </div>
                  <h3 className={styles.cardTitle}>Workforce, Attendance &amp; Grievance Management</h3>
                  <p className={styles.cardDesc}>
                    Provide visibility into workforce and attendance records while supporting grievance submission, review, and follow-up. Help mine managers coordinate workforce-related activities within their authorized scope.
                  </p>
                </div>
              </div>

              {/* Feature 6 */}
              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>precision_manufacturing</span>
                  </div>
                  <h3 className={styles.cardTitle}>Production &amp; Operational Reporting</h3>
                  <p className={styles.cardDesc}>
                    Support the management and submission of mine production reports, providing relevant operational information to authorized mine, company, and centralized authority dashboards.
                  </p>
                </div>
              </div>

              {/* Feature 7 */}
              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>eco</span>
                  </div>
                  <h3 className={styles.cardTitle}>Environmental Monitoring</h3>
                  <p className={styles.cardDesc}>
                    Organize available environmental information relating to pollution, water, and land reclamation to support environmental oversight and operational awareness.
                  </p>
                </div>
              </div>

              {/* Feature 8 */}
              <div className={styles.featureCard}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>phonelink</span>
                  </div>
                  <h3 className={styles.cardTitle}>Unified Web &amp; Mobile Oversight</h3>
                  <p className={styles.cardDesc}>
                    Connect field-level reporting with role-based web dashboards for mine managers, mining companies, and centralized regulatory authorities. Support structured information sharing, review, and oversight across the mining operation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: SAFETY & COMPLIANCE SECTION */}
        <section className={styles.sectionLight} id="safety-compliance">
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTag}>
                STATUTORY OVERSIGHT &amp; WORKFLOWS
              </div>
              <h2 className={styles.sectionTitle}>
                Safety, Compliance &amp; Operational Accountability
              </h2>
              <p className={styles.sectionDesc}>
                Understanding how information flows seamlessly between field officers, mine managers, corporate entities, and central authorities.
              </p>
            </div>

            {/* Inspection Workflow Sequence */}
            <div className={styles.workflowBlock}>
              <div className={styles.workflowBlockHeader}>
                <span className="material-symbols-outlined" style={{ color: '#1d4ed8', fontSize: '24px' }}>fact_check</span>
                <h3>Inspection Reporting &amp; Review Workflow</h3>
              </div>
              <p className={styles.workflowBlockDesc}>
                Inspectors record digital inspections, checklist responses, findings, remarks, timestamps, location coordinates, and supporting evidence. Submissions follow a clear statutory routing flow:
              </p>
              
              <div className={styles.sequenceFlow}>
                <div className={styles.sequenceStep}>
                  <span className={styles.sequenceNum}>STEP 01</span>
                  <h4>Inspector Mobile App</h4>
                  <p>Inspector logs field observations, checklists, evidence photos, and geo-location.</p>
                </div>
                <div className={styles.sequenceArrow}>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
                <div className={styles.sequenceStep}>
                  <span className={styles.sequenceNum}>STEP 02</span>
                  <h4>Centralized Authority</h4>
                  <p>Submitted to the centralized authority first for statutory review and processing.</p>
                </div>
                <div className={styles.sequenceArrow}>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
                <div className={styles.sequenceStep}>
                  <span className={styles.sequenceNum}>STEP 03</span>
                  <h4>Company &amp; Mine Dashboards</h4>
                  <p>Processed inspection results made available to relevant company and mine dashboards.</p>
                </div>
              </div>
            </div>

            {/* Incident Workflow Sequence */}
            <div className={styles.workflowBlock}>
              <div className={styles.workflowBlockHeader}>
                <span className="material-symbols-outlined" style={{ color: '#1d4ed8', fontSize: '24px' }}>medical_services</span>
                <h3>Incident Reporting &amp; Response Coordination Workflow</h3>
              </div>
              <p className={styles.workflowBlockDesc}>
                Incidents reported via mobile apps are immediately routed to the mine manager and centralized authority for coordinated response and task updates:
              </p>

              <div className={styles.sequenceFlow}>
                <div className={styles.sequenceStep}>
                  <span className={styles.sequenceNum}>STEP 01</span>
                  <h4>Mobile App Reporting</h4>
                  <p>Inspector or employee reports incident with severity level and site evidence.</p>
                </div>
                <div className={styles.sequenceArrow}>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
                <div className={styles.sequenceStep}>
                  <span className={styles.sequenceNum}>STEP 02</span>
                  <h4>Manager &amp; Authority Review</h4>
                  <p>Incident routed simultaneously to relevant mine manager and central authority.</p>
                </div>
                <div className={styles.sequenceArrow}>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
                <div className={styles.sequenceStep}>
                  <span className={styles.sequenceNum}>STEP 03</span>
                  <h4>Resource Dispatch</h4>
                  <p>Mine manager coordinates response by assigning suitable specialists and equipment.</p>
                </div>
                <div className={styles.sequenceArrow}>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </div>
                <div className={styles.sequenceStep}>
                  <span className={styles.sequenceNum}>STEP 04</span>
                  <h4>Employee App Update</h4>
                  <p>Assigned response tasks and status updates reflected in the employee app.</p>
                </div>
              </div>
            </div>

            {/* Grievance, Attendance & Production, Environmental Cards */}
            <div className={styles.grid3} style={{ marginTop: '2rem' }}>
              <div className={styles.featureCard} style={{ backgroundColor: '#ffffff' }}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined">forum</span>
                  </div>
                  <h3 className={styles.cardTitle}>Grievance Redressal Workflow</h3>
                  <p className={styles.cardDesc}>
                    Grievances submitted by inspectors or employees through mobile apps are made visible across relevant mine, company, and centralized authority web interfaces for review, follow-up, and status tracking according to role permissions.
                  </p>
                </div>
              </div>

              <div className={styles.featureCard} style={{ backgroundColor: '#ffffff' }}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined">account_box</span>
                  </div>
                  <h3 className={styles.cardTitle}>Attendance &amp; Production Reporting Flow</h3>
                  <p className={styles.cardDesc}>
                    Mine managers manage and submit attendance and production reports directly through the individual mine dashboard. Relevant reports are then made available to company and central authority dashboards for aggregate operational oversight.
                  </p>
                </div>
              </div>

              <div className={styles.featureCard} style={{ backgroundColor: '#ffffff' }}>
                <div>
                  <div className={styles.iconBox}>
                    <span className="material-symbols-outlined">nature</span>
                  </div>
                  <h3 className={styles.cardTitle}>Environmental Responsibility</h3>
                  <p className={styles.cardDesc}>
                    Environmental monitoring covers indicators such as pollution metrics, water usage, and land reclamation metrics, tracked separately from occupational safety records while contributing to comprehensive operational transparency.
                  </p>
                </div>
              </div>
            </div>

            {/* Block F: Role-Based Monitoring (RBAC) */}
            <div className={styles.rbacSection}>
              <h3 className={styles.rbacSectionTitle}>Role-Based Monitoring (RBAC Dashboard Architecture)</h3>
              <p className={styles.sectionDesc} style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                Access controls ensure strict data governance where users access tools and data appropriate to their jurisdiction.
              </p>
              <div className={styles.grid3}>
                <div className={styles.rbacCard}>
                  <div className={styles.rbacHeader}>
                    <span className="material-symbols-outlined">foundation</span>
                    <h4>Individual Mine Dashboard</h4>
                  </div>
                  <p className={styles.cardDesc}>
                    Access is strictly scoped to the manager's assigned mine, covering field operations, shift attendance rosters, production reports, and local incident dispatch.
                  </p>
                </div>

                <div className={styles.rbacCard}>
                  <div className={styles.rbacHeader}>
                    <span className="material-symbols-outlined">corporate_fare</span>
                    <h4>Company Dashboard</h4>
                  </div>
                  <p className={styles.cardDesc}>
                    Authorized company users access aggregated visibility into the mines and operational reports associated specifically with their corporate mining enterprise.
                  </p>
                </div>

                <div className={styles.rbacCard}>
                  <div className={styles.rbacHeader}>
                    <span className="material-symbols-outlined">verified_user</span>
                    <h4>Centralized Authority Dashboard</h4>
                  </div>
                  <p className={styles.cardDesc}>
                    Centralized regulatory authority users have the broader centralized monitoring view across all monitored statutory mines for national safety enforcement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: FINAL CALL TO ACTION */}
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
                  Mining Intelligence and Operational Visibility Analytics
                </span>
              </div>
              <p className={styles.cardDesc} style={{ fontSize: '12px', marginBottom: '1rem' }}>
                Digital platform for mine safety, compliance, and regulatory monitoring under statutory provisions of the Mines Act.
              </p>
            </div>

            <div>
              <div className={styles.footerTitle}>Portal Directives</div>
              <ul className={styles.footerList}>
                <li><a className={styles.footerLink} href="#about">About</a></li>
                <li><a className={styles.footerLink} href="#features">Features</a></li>
                <li><a className={styles.footerLink} href="#safety-compliance">Safety &amp; Compliance</a></li>
              </ul>
            </div>

            <div>
              <div className={styles.footerTitle}>Statutory &amp; Legal</div>
              <ul className={styles.footerList}>
                <li><a className={styles.footerLink} href="#home">Portal Guidelines</a></li>
                <li><a className={styles.footerLink} href="#home">Accessibility Statement</a></li>
                <li><a className={styles.footerLink} href="#home">Privacy Policy</a></li>
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
