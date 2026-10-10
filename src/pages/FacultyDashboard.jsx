import React, { useState } from 'react';
import {
  Briefcase,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  BookOpen,
  MessageSquare,
  Award,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const FacultyDashboard = () => {
  const { user } = useAuth();
  const [activeCourse, setActiveCourse] = useState('CS-601');

  const myCourses = [
    { code: 'CS-601', name: 'Distributed Cloud Systems', students: 64, room: 'Lab 3B', time: '09:00 AM - 10:15 AM' },
    { code: 'CS-607', name: 'Cybersecurity & Cryptography', students: 58, room: 'Hall B-108', time: '09:30 AM - 11:00 AM (Tue)' },
  ];

  return (
    <div className="faculty-portal-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Faculty Academic Workspace</h1>
          <p className="page-subtitle">Welcome, {user?.name || 'Dr. Evelyn Reed'} • Computer Science & Engineering</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => alert('Attendance submission roster for CS-601 marked successfully.')}
        >
          <CheckCircle size={16} />
          <span>Mark Class Attendance</span>
        </button>
      </div>

      <div className="faculty-kpi-grid">
        <div className="campus-card f-kpi-card">
          <span className="f-kpi-label">Active Assigned Courses</span>
          <span className="f-kpi-val">2 Subjects</span>
          <span className="f-kpi-sub">Fall 2026 Curriculum</span>
        </div>
        <div className="campus-card f-kpi-card">
          <span className="f-kpi-label">Enrolled Undergraduates</span>
          <span className="f-kpi-val">122 Students</span>
          <span className="f-kpi-sub">Across 2 Sections</span>
        </div>
        <div className="campus-card f-kpi-card">
          <span className="f-kpi-label">Consultation Appointments</span>
          <span className="f-kpi-val">4 Pending</span>
          <span className="f-kpi-sub text-violet">Scheduled for Thursday</span>
        </div>
        <div className="campus-card f-kpi-card">
          <span className="f-kpi-label">Next Lecture</span>
          <span className="f-kpi-val">09:00 AM</span>
          <span className="f-kpi-sub">Lab Complex 3B</span>
        </div>
      </div>

      {/* Courses Schedule */}
      <div className="campus-card f-schedule-card">
        <h3 className="section-title" style={{ marginBottom: '16px' }}>My Assigned Lectures & Labs</h3>
        <div className="f-courses-list">
          {myCourses.map((c) => (
            <div key={c.code} className="f-course-item">
              <div className="f-course-left">
                <span className="badge badge-indigo">{c.code}</span>
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-text-main)' }}>{c.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    {c.room} • {c.time}
                  </p>
                </div>
              </div>

              <div className="f-course-actions">
                <span className="badge badge-neutral">{c.students} Students</span>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => alert(`Opening student attendance list for ${c.code}`)}
                >
                  View Attendance Roster
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => alert(`Midterm grade upload opened for ${c.code}`)}
                >
                  Grade Submissions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .faculty-portal-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .faculty-kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .faculty-kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .f-kpi-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .f-kpi-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--color-text-secondary);
        }
        .f-kpi-val {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--color-text-main);
          letter-spacing: -0.02em;
        }
        .f-kpi-sub {
          font-size: 0.74rem;
          color: var(--color-text-muted);
        }
        .f-schedule-card {
          padding: 24px;
        }
        .f-courses-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .f-course-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-radius: var(--radius-md);
          background: #F8FAFC;
          border: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 14px;
        }
        .f-course-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .f-course-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
      `}</style>
    </div>
  );
};

export default FacultyDashboard;
