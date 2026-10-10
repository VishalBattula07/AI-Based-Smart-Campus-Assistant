import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  Download,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { campusService } from '../services/campusService';

const Examinations = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await campusService.getExaminations();
        setExams(data || []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="examinations-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Midterm & Semester Examinations</h1>
          <p className="page-subtitle">Ratified examination schedules, venue allocations, and hall ticket validation</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => alert('Official Hall Ticket with QR Code downloaded!')}
        >
          <Download size={16} />
          <span>Download Hall Ticket (PDF)</span>
        </button>
      </div>

      <div className="exam-notice-banner campus-card">
        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
          <div className="exam-notice-icon">
            <CheckCircle size={22} className="text-success" />
          </div>
          <div>
            <h4 style={{ fontWeight: 800, marginBottom: '4px' }}>Examination Clearance Active</h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              Your aggregate attendance meets the 75% prerequisite. All library fees cleared. Bring your RFID student card to the designated examination block 15 minutes before reporting time.
            </p>
          </div>
        </div>
      </div>

      <div className="exams-grid">
        {exams.map((item) => (
          <div key={item.id} className="exam-card campus-card">
            <div className="exam-card-head">
              <span className="badge badge-indigo">{item.code}</span>
              <span className="badge badge-success">{item.status}</span>
            </div>

            <h2 className="exam-name">{item.subject}</h2>
            <div className="exam-type-tag">{item.type}</div>

            <div className="exam-details-box">
              <div className="exam-detail-row">
                <Calendar size={15} className="detail-icon" />
                <span>Date: <strong>{item.displayDate}</strong></span>
              </div>
              <div className="exam-detail-row">
                <Clock size={15} className="detail-icon" />
                <span>Time: <strong>{item.time}</strong></span>
              </div>
              <div className="exam-detail-row">
                <MapPin size={15} className="detail-icon" />
                <span>Venue: <strong>{item.venue}</strong></span>
              </div>
              <div className="exam-detail-row">
                <FileText size={15} className="detail-icon" />
                <span>Allocated Seat: <strong>{item.seat}</strong></span>
              </div>
            </div>

            <div className="exam-card-foot">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => alert(`Syllabus blueprint for ${item.code} opened.`)}
              >
                View Syllabus Blueprint
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .examinations-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .exam-notice-banner {
          padding: 20px 24px;
          background: #F0FDF4;
          border: 1px solid #BBF7D0;
        }
        .exams-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 24px;
        }
        .exam-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .exam-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .exam-name {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--color-text-main);
          margin-bottom: 4px;
        }
        .exam-type-tag {
          font-size: 0.76rem;
          color: var(--color-text-muted);
          font-weight: 600;
          margin-bottom: 16px;
        }
        .exam-details-box {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 14px;
          background: #F8FAFC;
          border-radius: var(--radius-md);
          margin-bottom: 20px;
        }
        .exam-detail-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.82rem;
          color: var(--color-text-main);
        }
        .detail-icon {
          color: var(--color-accent);
          flex-shrink: 0;
        }
        .exam-card-foot {
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }
      `}</style>
    </div>
  );
};

export default Examinations;
