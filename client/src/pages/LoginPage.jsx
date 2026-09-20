import React, { useState } from 'react';
import { loginApi } from '../services/api';
import styles from './LoginPage.module.css';

export default function LoginPage({ onLoginSuccess, onBackToLanding }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isFormValid = username.trim() !== '' && password.trim() !== '' && selectedRole !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Invalid username, password, or role.');
      return;
    }

    if (!selectedRole) {
      setErrorMessage('Please select a role.');
      return;
    }

    try {
      setIsLoading(true);
      const data = await loginApi(username.trim(), password.trim(), selectedRole);
      if (data.success && data.user) {
        if (onLoginSuccess) {
          onLoginSuccess(data.user);
        }
      } else {
        setErrorMessage(data.message || 'Invalid username, password, or role.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Invalid username, password, or role.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* HEADER */}
      <header className={styles.fixedHeader}>
        <div className={styles.headerTopBar}>
          <div className={styles.topBarInner}>
            <div className={styles.topBarLeft}>
              <span className={styles.dot}></span>
              <span>Government of India | Ministry of Mines &amp; Safety Oversight</span>
            </div>
            <div className={styles.topBarRight}>
              <span className={styles.topBarTag}>Statutory Regulatory Portal</span>
              <span>Official Oversight Authority</span>
            </div>
          </div>
        </div>
        <div className={styles.headerMain}>
          <div className={styles.brandBlock} onClick={onBackToLanding}>
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
                Mining Intelligence and Operational Visibilty Analytics
              </span>
              <span className={styles.brandSub}>
                MINING INTELLIGENCE &amp; OPERATIONAL VISIBILITY ANALYTICS
              </span>
            </div>
          </div>
          <button onClick={onBackToLanding} className={styles.returnBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
            <span>Return to Portal</span>
          </button>
        </div>
      </header>

      {/* LOGIN CONTENT */}
      <main className={styles.mainContent}>
        <div className={styles.cardContainer}>
          {/* Card Header */}
          <div className={styles.cardHeader}>
            <div className={styles.badgeIcon}>
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>verified_user</span>
            </div>
            <h1 className={styles.cardHeaderTitle}>
              Authority Sign In
            </h1>
            <p className={styles.cardHeaderSub}>
              Statutory Access &amp; Compliance Portal
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {errorMessage && (
              <div className={styles.errorCard}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Field 1: Username */}
            <div className={styles.fieldGroup}>
              <label htmlFor="username-input" className={styles.fieldLabel}>
                Username
              </label>
              <div className={styles.inputWrapper}>
                <span className={`material-symbols-outlined ${styles.inputIcon}`}>person</span>
                <input
                  id="username-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter authority username"
                  className={styles.input}
                  disabled={isLoading}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Field 2: Password */}
            <div className={styles.fieldGroup}>
              <label htmlFor="password-input" className={styles.fieldLabel}>
                Password
              </label>
              <div className={styles.inputWrapper}>
                <span className={`material-symbols-outlined ${styles.inputIcon}`}>lock</span>
                <input
                  id="password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className={styles.input}
                  disabled={isLoading}
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            {/* Field 3: Select Role */}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel}>
                Select Role
              </label>
              <div className={styles.roleGrid}>
                {/* Role Option 1: Central Regulatory Authority */}
                <div
                  onClick={() => setSelectedRole('central_regulatory_authority')}
                  className={`${styles.roleCard} ${
                    selectedRole === 'central_regulatory_authority'
                      ? styles.roleCardSelected
                      : styles.roleCardUnselected
                  }`}
                >
                  <div className={styles.roleCardContent}>
                    <span className={`material-symbols-outlined ${styles.roleCardIcon} ${
                      selectedRole === 'central_regulatory_authority' ? styles.roleCardIconSelected : ''
                    }`}>
                      shield
                    </span>
                    <span className={`${styles.roleCardTitle} ${
                      selectedRole === 'central_regulatory_authority' ? styles.roleCardTitleSelected : ''
                    }`}>
                      Central Regulatory Authority
                    </span>
                  </div>
                  {selectedRole === 'central_regulatory_authority' && (
                    <span className={`material-symbols-outlined ${styles.checkIcon}`}>check_circle</span>
                  )}
                </div>

                {/* Role Option 2: Mine Operations Manager */}
                <div
                  onClick={() => setSelectedRole('mine_operations_manager')}
                  className={`${styles.roleCard} ${
                    selectedRole === 'mine_operations_manager'
                      ? styles.roleCardSelected
                      : styles.roleCardUnselected
                  }`}
                >
                  <div className={styles.roleCardContent}>
                    <span className={`material-symbols-outlined ${styles.roleCardIcon} ${
                      selectedRole === 'mine_operations_manager' ? styles.roleCardIconSelected : ''
                    }`}>
                      engineering
                    </span>
                    <span className={`${styles.roleCardTitle} ${
                      selectedRole === 'mine_operations_manager' ? styles.roleCardTitleSelected : ''
                    }`}>
                      Mine Operations Manager
                    </span>
                  </div>
                  {selectedRole === 'mine_operations_manager' && (
                    <span className={`material-symbols-outlined ${styles.checkIcon}`}>check_circle</span>
                  )}
                </div>
              </div>
            </div>

            {/* Field 4: Login Button */}
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`${styles.submitBtn} ${(!isFormValid || isLoading) ? styles.submitBtnDisabled : ''}`}
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin" style={{ fontSize: '18px' }}>progress_activity</span>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>login</span>
                  <span>Login</span>
                </>
              )}
            </button>

            <div className={styles.backLinkContainer}>
              <button
                type="button"
                onClick={onBackToLanding}
                className={styles.backBtn}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_back</span>
                <span>Return to Public Landing Page</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          © 2025 National Mine Safety &amp; Compliance Monitoring Platform. Official Regulatory Oversight Portal.
        </div>
      </footer>
    </div>
  );
}
