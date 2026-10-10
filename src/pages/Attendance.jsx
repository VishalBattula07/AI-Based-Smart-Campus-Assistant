import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Award,
  BookOpen,
  TrendingUp,
  Download,
  ShieldCheck,
} from 'lucide-react';
import { campusService } from '../services/campusService';

const Attendance = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await campusService.getAttendance();
        setData(res);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const overall = data?.overallPercentage || 86.4;

  return (
    <div className="attendance-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Attendance & Course Eligibility</h1>
          <p className="page-subtitle">Track academic compliance against the mandatory 75% university requirement</p>
        </div>

        <button className="btn btn-outline" onClick={() => alert('Official attendance record slip exported (PDF).')}>
          <Download size={16} />
          <span>Download Verified Slip</span>
        </button>
      </div>

      {/* Top High-Level Metrics */}
      <div className="att-metrics-grid">
        <div className="campus-card att-hero-card">
          <div className="att-hero-content">
            <span className="badge badge-success">University Compliant</span>
            <div className="hero-percent-number">{overall}%</div>
            <div className="hero-percent-label">Aggregate Attendance Average</div>
            <p className="hero-percent-sub">
              159 out of 184 lectures attended. You maintain an active cushion of +11.4% above exam disqualification threshold.
            </p>
          </div>
          <div className="att-ring-wrap">
            <div className="circular-progress-indicator">
              <span className="ring-val">{overall}%</span>
            </div>
          </div>
        </div>

        <div className="campus-card att-stat-box">
          <span className="stat-sub">Mandatory Requirement</span>
          <span className="stat-val text-warning">75.0%</span>
          <span className="stat-expl">Minimum for Semester Hall Ticket</span>
        </div>

        <div className="campus-card att-stat-box">
          <span className="stat-sub">Eligible Courses</span>
          <span className="stat-val text-indigo">5 / 5</span>
          <span className="stat-expl">All core subjects currently passing</span>
        </div>
      </div>

      {/* Subject-Wise Table */}
      <div className="campus-card att-table-card">
        <div className="table-card-head">
          <h3 className="section-title">Course-Wise Attendance Breakdown</h3>
          <span className="badge badge-neutral">Fall 2026</span>
        </div>

        <div className="table-container">
          <table className="campus-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Code</th>
                <th>Faculty</th>
                <th>Classes Attended</th>
                <th>Percentage</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.subjects?.map((sub, i) => (
                <tr key={i}>
                  <td><strong>{sub.subject}</strong></td>
                  <td><span className="badge badge-indigo">{sub.code}</span></td>
                  <td>{sub.faculty}</td>
                  <td>{sub.attended} / {sub.total}</td>
                  <td>
                    <div className="table-progress-cell">
                      <div className="table-progress-track">
                        <div
                          className={`table-progress-bar ${
                            sub.percentage >= 85
                              ? 'bg-success'
                              : sub.percentage >= 75
                              ? 'bg-warning'
                              : 'bg-danger'
                          }`}
                          style={{ width: `${sub.percentage}%` }}
                        ></div>
                      </div>
                      <span className="pct-num">{sub.percentage}%</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        sub.status === 'Excellent'
                          ? 'badge-success'
                          : sub.status === 'Good'
                          ? 'badge-indigo'
                          : 'badge-warning'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .attendance-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .att-metrics-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 900px) {
          .att-metrics-grid {
            grid-template-columns: 1fr;
          }
        }
        .att-hero-card {
          padding: 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #FFFFFF 0%, #F0FDF4 100%);
          border: 1px solid #BBF7D0;
        }
        .hero-percent-number {
          font-size: 2.8rem;
          font-weight: 800;
          color: #065F46;
          line-height: 1.1;
          margin: 8px 0;
          letter-spacing: -0.03em;
        }
        .hero-percent-label {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text-main);
          margin-bottom: 6px;
        }
        .hero-percent-sub {
          font-size: 0.84rem;
          color: var(--color-text-secondary);
          max-width: 440px;
        }
        .circular-progress-indicator {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          border: 8px solid #BBF7D0;
          border-top-color: #10B981;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ring-val {
          font-size: 1.1rem;
          font-weight: 800;
          color: #065F46;
        }
        .att-stat-box {
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
        }
        .stat-sub {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .stat-val {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .stat-expl {
          font-size: 0.76rem;
          color: var(--color-text-muted);
        }
        .text-warning { color: #D97706; }
        .text-indigo { color: var(--color-primary); }
        .att-table-card {
          padding: 24px;
        }
        .table-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .table-progress-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .table-progress-track {
          flex: 1;
          height: 6px;
          background: #E2E8F0;
          border-radius: var(--radius-full);
          overflow: hidden;
          min-width: 80px;
        }
        .table-progress-bar {
          height: 100%;
          border-radius: var(--radius-full);
        }
        .bg-success { background: #10B981; }
        .bg-warning { background: #F59E0B; }
        .bg-danger { background: #EF4444; }
        .pct-num {
          font-size: 0.82rem;
          font-weight: 700;
          width: 44px;
        }
      `}</style>
    </div>
  );
};

export default Attendance;
