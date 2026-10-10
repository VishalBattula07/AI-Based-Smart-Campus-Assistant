import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  User,
  Shield,
  Palette,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [examAlerts, setExamAlerts] = useState(true);
  const [attendanceAlerts, setAttendanceAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">User Settings & Preferences</h1>
          <p className="page-subtitle">Configure AI assistant notifications, academic alerts, and portal account info</p>
        </div>

        {saved && (
          <span className="badge badge-success">
            <Check size={14} /> Preferences updated
          </span>
        )}
      </div>

      <div className="settings-grid">
        {/* Profile Info */}
        <div className="campus-card settings-card">
          <div className="settings-card-head">
            <User size={18} className="text-violet" />
            <h3 className="section-title">Institutional Profile</h3>
          </div>

          <form onSubmit={handleSave} className="settings-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" defaultValue={user?.name} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">University Email</label>
              <input type="email" disabled defaultValue={user?.email} className="form-input" style={{ background: '#F8FAFC' }} />
            </div>

            <div className="form-group">
              <label className="form-label">Department & Major</label>
              <input type="text" defaultValue={user?.department} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Current Roll Number / ID</label>
              <input type="text" disabled defaultValue={user?.rollNo || '21BCSE042'} className="form-input" style={{ background: '#F8FAFC' }} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Notifications & AI Preferences */}
        <div className="campus-card settings-card">
          <div className="settings-card-head">
            <Bell size={18} className="text-violet" />
            <h3 className="section-title">AI Alert Preferences</h3>
          </div>

          <div className="toggle-list">
            <div className="toggle-row">
              <div>
                <span className="toggle-title">Attendance Margin Warning</span>
                <p className="toggle-sub">Notify when subject attendance drops near 75% cutoff threshold.</p>
              </div>
              <input
                type="checkbox"
                checked={attendanceAlerts}
                onChange={(e) => setAttendanceAlerts(e.target.checked)}
                className="custom-toggle"
              />
            </div>

            <div className="toggle-row">
              <div>
                <span className="toggle-title">Midterm & Viva Reminders</span>
                <p className="toggle-sub">Send reminder 24 hours prior to ratified exam reporting time.</p>
              </div>
              <input
                type="checkbox"
                checked={examAlerts}
                onChange={(e) => setExamAlerts(e.target.checked)}
                className="custom-toggle"
              />
            </div>

            <div className="toggle-row">
              <div>
                <span className="toggle-title">Campus Hackathon & Event Digests</span>
                <p className="toggle-sub">Receive notifications when new guest lectures or bounties are posted.</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="custom-toggle"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .settings-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .settings-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .settings-grid {
            grid-template-columns: 1fr;
          }
        }
        .settings-card {
          padding: 28px;
        }
        .settings-card-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .toggle-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .toggle-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-subtle);
        }
        .toggle-row:last-child {
          border-bottom: none;
        }
        .toggle-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--color-text-main);
          display: block;
        }
        .toggle-sub {
          font-size: 0.76rem;
          color: var(--color-text-secondary);
          margin-top: 2px;
          line-height: 1.4;
        }
        .custom-toggle {
          width: 20px;
          height: 20px;
          accent-color: var(--color-primary);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Settings;
