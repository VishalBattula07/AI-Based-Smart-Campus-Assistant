import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  Clock,
  BookOpen,
  Send,
  Calendar,
} from 'lucide-react';
import { campusService } from '../services/campusService';

const FacultyDirectory = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await campusService.getFaculty(searchTerm);
        setFacultyList(data || []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [searchTerm]);

  return (
    <div className="faculty-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Faculty & Research Directory</h1>
          <p className="page-subtitle">Find professors, cabin locations, research areas, and consultation hours</p>
        </div>

        <div className="search-box-wrap">
          <Search size={16} className="search-box-icon" />
          <input
            type="text"
            className="form-input search-box-input"
            placeholder="Search by professor, course, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="faculty-grid">
        {facultyList.map((prof) => (
          <div key={prof.id} className="faculty-card campus-card">
            <div className="faculty-card-header">
              <img src={prof.avatar} alt={prof.name} className="faculty-avatar" />
              <div className="faculty-primary-info">
                <h3 className="faculty-name">{prof.name}</h3>
                <p className="faculty-role">{prof.role}</p>
                <span className="badge badge-indigo">{prof.department}</span>
              </div>
            </div>

            <div className="faculty-details-list">
              <div className="faculty-detail-row">
                <MapPin size={15} className="detail-icon" />
                <span>Office: <strong>{prof.office}</strong></span>
              </div>
              <div className="faculty-detail-row">
                <Clock size={15} className="detail-icon" />
                <span>Consultation: <strong>{prof.officeHours}</strong></span>
              </div>
              <div className="faculty-detail-row">
                <Mail size={15} className="detail-icon" />
                <span><code>{prof.email}</code></span>
              </div>
              <div className="faculty-detail-row">
                <BookOpen size={15} className="detail-icon" />
                <span className="specialization-text">{prof.specialization}</span>
              </div>
            </div>

            <div className="faculty-card-footer">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setSelectedFaculty(prof)}
              >
                <Calendar size={14} />
                <span>Request Office Hours</span>
              </button>
              <a
                href={`mailto:${prof.email}`}
                className="btn btn-ghost btn-sm"
                title="Send email"
              >
                <Mail size={14} />
                <span>Email</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Office Hours Modal */}
      {selectedFaculty && (
        <div className="modal-overlay" onClick={() => setSelectedFaculty(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="section-title">Schedule Consultation</h2>
              <p className="section-subtitle">with {selectedFaculty.name}</p>
            </div>
            <div style={{ margin: '18px 0' }}>
              <div className="form-group">
                <label className="form-label">Available Office Hours</label>
                <input
                  type="text"
                  disabled
                  value={selectedFaculty.officeHours}
                  className="form-input"
                  style={{ background: '#F8FAFC' }}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Topic / Query Description</label>
                <textarea
                  rows={3}
                  className="form-input"
                  placeholder="e.g. Seeking clarification on Distributed Cloud Consensus homework..."
                ></textarea>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-outline" onClick={() => setSelectedFaculty(null)}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  alert(`Appointment request sent to ${selectedFaculty.name}! You will receive email confirmation.`);
                  setSelectedFaculty(null);
                }}
              >
                Confirm Appointment Request
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .faculty-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .search-box-wrap {
          position: relative;
          min-width: 320px;
        }
        .search-box-icon {
          position: absolute;
          left: 14px;
          top: 13px;
          color: var(--color-text-muted);
        }
        .search-box-input {
          padding-left: 40px;
        }
        .faculty-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 24px;
        }
        .faculty-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .faculty-card-header {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }
        .faculty-avatar {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-md);
          object-fit: cover;
          border: 2px solid var(--border-subtle);
        }
        .faculty-name {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--color-text-main);
          line-height: 1.25;
          margin-bottom: 2px;
        }
        .faculty-role {
          font-size: 0.78rem;
          color: var(--color-text-secondary);
          margin-bottom: 8px;
        }
        .faculty-details-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
          background: #F8FAFC;
          padding: 14px;
          border-radius: var(--radius-md);
        }
        .faculty-detail-row {
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
        .specialization-text {
          font-size: 0.76rem;
          color: var(--color-text-secondary);
          font-style: italic;
        }
        .faculty-card-footer {
          display: flex;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }
      `}</style>
    </div>
  );
};

export default FacultyDirectory;
