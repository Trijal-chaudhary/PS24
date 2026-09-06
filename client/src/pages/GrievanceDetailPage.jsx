import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, MapPin, MessageSquareWarning, Sparkles, Camera, User, Building, Tag } from 'lucide-react';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import ErrorState from '../components/common/ErrorState';
import { getGrievanceDetail } from '../services/api';
import LeafletMineMap from '../components/map/LeafletMineMap';
import '../styles/mine-monitoring.css';
import '../styles/inspections.css';

export default function GrievanceDetailPage({ submissionId, onBack, onSelectMine }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [grievance, setGrievance] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchDetail() {
      try {
        setLoading(true);
        setError(null);
        const data = await getGrievanceDetail(submissionId);
        if (isMounted) {
          setGrievance(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || `Failed to load grievance detail for ${submissionId}`);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchDetail();
    return () => { isMounted = false; };
  }, [submissionId]);

  if (loading) return <LoadingSkeleton />;
  if (error || !grievance) {
    return (
      <div className="monitoring-page">
        <button className="btn-secondary" onClick={onBack} style={{ marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeft size={16} /> Back to Grievances
        </button>
        <ErrorState message={error || "Grievance record not found (HTTP 404)"} onRetry={onBack} />
      </div>
    );
  }

  const isGrievance = String(grievance.entry_type).toLowerCase() === 'grievance';
  const isAiFlagged = String(grievance.priority_flagged_by_ai).toLowerCase() === 'yes';

  const hasValidLocation = grievance.location &&
    typeof grievance.location.latitude === 'number' &&
    typeof grievance.location.longitude === 'number' &&
    !isNaN(grievance.location.latitude) &&
    !isNaN(grievance.location.longitude);

  const mapMarkers = hasValidLocation ? [{
    id: grievance.submission_id,
    mine_id: grievance.mine_id,
    mine_name: grievance.mine_name || grievance.mine_id,
    latitude: grievance.location.latitude,
    longitude: grievance.location.longitude,
    risk_level: isAiFlagged ? 'high' : 'compliant',
    status: grievance.sync_status || 'synced'
  }] : [];

  return (
    <div className="monitoring-page">
      {/* Top Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <button className="btn-secondary" onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeft size={16} /> Back to Grievances
        </button>

        {grievance.mine_id && (
          <button className="btn-primary" onClick={() => onSelectMine(grievance.mine_id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Building size={14} /> View Mine ({grievance.mine_id}) <ExternalLink size={14} />
          </button>
        )}
      </div>

      {/* Dossier Header Card */}
      <div className="detail-header-card">
        <div className="detail-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h1 className="detail-title">{grievance.submission_id}</h1>
            <span className={`badge ${isGrievance ? 'badge-high' : 'badge-neutral'}`}>
              {grievance.entry_type ? grievance.entry_type.toUpperCase() : 'ENTRY'}
            </span>
            <span className="badge badge-neutral">
              Category: {grievance.category ? grievance.category.toUpperCase() : '—'}
            </span>
            {isAiFlagged && (
              <span className="badge" style={{ background: '#f3e8ff', color: '#9333ea', border: '1px solid #d8b4fe', fontWeight: '800' }}>
                <Sparkles size={12} /> AI PRIORITY FLAGGED
              </span>
            )}
            <span className={`badge ${grievance.review_status === 'pending' ? 'badge-warning' : 'badge-neutral'}`}>
              Review Status: {grievance.review_status || '—'}
            </span>
          </div>
          <p className="detail-subtitle">
            Submitted On: <strong style={{ color: '#0f172a' }}>{grievance.date_time ? new Date(grievance.date_time).toLocaleString() : '—'}</strong>
          </p>
        </div>

        {/* Dossier Meta Info Grid */}
        <div className="dossier-meta-grid">
          <div className="meta-item">
            <span className="meta-label"><Building size={14} /> Mine Name &amp; ID</span>
            <span className="meta-value">
              {grievance.mine_name || '—'}{' '}
              <code style={{ fontSize: '12px', color: '#0284c7', background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px' }}>
                {grievance.mine_id || '—'}
              </code>
            </span>
          </div>

          <div className="meta-item">
            <span className="meta-label"><User size={14} /> Inspector / Submitter</span>
            <span className="meta-value">
              {grievance.inspector_name || '—'}{' '}
              {grievance.inspector_id && (
                <span style={{ fontSize: '12px', color: '#64748b' }}>({grievance.inspector_id})</span>
              )}
            </span>
          </div>

          <div className="meta-item">
            <span className="meta-label"><MapPin size={14} /> Location / State</span>
            <span className="meta-value">
              {grievance.district ? `${grievance.district}, ` : ''}{grievance.state || '—'}
            </span>
          </div>

          <div className="meta-item">
            <span className="meta-label">Sync Status</span>
            <span className="meta-value" style={{ textTransform: 'capitalize' }}>
              <span className={`badge ${grievance.sync_status === 'synced' ? 'badge-operating' : 'badge-warning'}`}>
                {grievance.sync_status || '—'}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="inspection-detail-grid">
        <div className="left-detail-column">
          {/* Section: Complete Text Content */}
          <div className="detail-section-card">
            <div className="section-header">
              <MessageSquareWarning size={18} color="#0284c7" />
              <h2>Complete Entry Content</h2>
            </div>
            <div className="field-content-box" style={{ borderLeft: '4px solid #0284c7' }}>
              {grievance.text_content || '—'}
            </div>
          </div>

          {/* Section: AI Priority Flagged Status */}
          <div className="detail-section-card">
            <div className="section-header">
              <Sparkles size={18} color="#9333ea" />
              <h2>AI Priority Classification</h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="meta-label" style={{ fontWeight: '600', color: '#334155' }}>Source AI Flag:</span>
              {isAiFlagged ? (
                <span className="badge" style={{ background: '#f3e8ff', color: '#9333ea', border: '1px solid #d8b4fe', fontWeight: '800', padding: '6px 12px', fontSize: '12px' }}>
                  <Sparkles size={14} /> AI Priority Flagged (High Concern)
                </span>
              ) : (
                <span className="badge badge-neutral" style={{ padding: '6px 12px', fontSize: '12px' }}>
                  Standard Priority (Not Flagged by AI)
                </span>
              )}
            </div>
          </div>

          {/* Section: Evidence Attachments */}
          <div className="detail-section-card">
            <div className="section-header">
              <Camera size={18} color="#0284c7" />
              <h2>Evidence Attachments</h2>
            </div>

            {Array.isArray(grievance.photos_or_videos) && grievance.photos_or_videos.length > 0 ? (
              <div className="evidence-grid">
                {grievance.photos_or_videos.map((file, idx) => (
                  <div key={idx} className="evidence-card">
                    <div className="evidence-thumbnail">
                      <Camera size={24} color="#94a3b8" />
                      <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Evidence File</span>
                    </div>
                    <div className="evidence-filename" title={file}>
                      {file}
                    </div>
                    <div style={{ padding: '0 10px 10px 10px' }}>
                      <span className="evidence-unavailable-fallback">Evidence file unavailable</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-field-notice">No evidence attached</div>
            )}
          </div>
        </div>

        {/* Right Column: Submission Location Map */}
        <div className="right-detail-column">
          <div className="detail-section-card" style={{ position: 'sticky', top: '80px' }}>
            <div className="section-header">
              <MapPin size={18} color="#0284c7" />
              <h2>Submission Location</h2>
            </div>

            {hasValidLocation ? (
              <div style={{ height: '360px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                <LeafletMineMap
                  markers={mapMarkers}
                  height="300px"
                />
                <div style={{ padding: '10px 14px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '12px', color: '#475569' }}>
                  <strong>Lat:</strong> {grievance.location.latitude.toFixed(6)}, <strong>Long:</strong> {grievance.location.longitude.toFixed(6)}
                </div>
              </div>
            ) : (
              <div className="empty-field-notice" style={{ padding: '32px 16px', textAlign: 'center' }}>
                <MapPin size={32} color="#cbd5e1" style={{ display: 'block', margin: '0 auto 8px auto' }} />
                Submission location unavailable
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
