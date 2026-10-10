import React, { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  Award,
  Sparkles,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { campusService } from '../services/campusService';

const Departments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await campusService.getDepartments();
      setDepartments(data || []);
    }
    load();
  }, []);

  return (
    <div className="departments-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Academic Departments & Research Labs</h1>
          <p className="page-subtitle">Divisions of engineering, artificial intelligence, and applied computing sciences</p>
        </div>
      </div>

      <div className="departments-grid">
        {departments.map((dept) => (
          <div key={dept.id} className="dept-card campus-card">
            <div className="dept-card-top">
              <span className="badge badge-indigo">{dept.code}</span>
              <span className="dept-head-text">HOD: <strong>{dept.head}</strong></span>
            </div>

            <h2 className="dept-title">{dept.name}</h2>
            <p className="dept-desc">{dept.description}</p>

            <div className="dept-stats-row">
              <div className="dept-stat-box">
                <span className="ds-number">{dept.students}</span>
                <span className="ds-label">Enrolled Students</span>
              </div>
              <div className="dept-stat-box">
                <span className="ds-number">{dept.facultyCount}</span>
                <span className="ds-label">Faculty Members</span>
              </div>
              <div className="dept-stat-box">
                <span className="ds-number">{dept.labs}</span>
                <span className="ds-label">Specialized Labs</span>
              </div>
            </div>

            <div className="dept-card-footer">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => alert(`Curriculum syllabus opened for ${dept.name}`)}
              >
                <span>View Department Curriculum</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .departments-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .departments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 24px;
        }
        .dept-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .dept-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .dept-head-text {
          font-size: 0.78rem;
          color: var(--color-text-secondary);
        }
        .dept-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--color-text-main);
          margin-bottom: 8px;
        }
        .dept-desc {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .dept-stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          background: #F8FAFC;
          padding: 12px;
          border-radius: var(--radius-md);
          margin-bottom: 20px;
          text-align: center;
        }
        .ds-number {
          display: block;
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--color-primary);
        }
        .ds-label {
          font-size: 0.68rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }
        .dept-card-footer {
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }
      `}</style>
    </div>
  );
};

export default Departments;
