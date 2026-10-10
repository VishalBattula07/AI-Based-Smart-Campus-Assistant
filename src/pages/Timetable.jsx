import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Filter,
  CheckCircle,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { campusService } from '../services/campusService';

const Timetable = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [schedule, setSchedule] = useState([]);
  const [viewMode, setViewMode] = useState('daily'); // 'daily' | 'weekly'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await campusService.getTimetable(viewMode === 'daily' ? selectedDay : null);
        setSchedule(data || []);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedDay, viewMode]);

  return (
    <div className="timetable-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Academic Timetable</h1>
          <p className="page-subtitle">Fall 2026 Semester Schedule • 6th Semester Computer Science</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="btn-group-toggle">
            <button
              className={`toggle-option ${viewMode === 'daily' ? 'active' : ''}`}
              onClick={() => setViewMode('daily')}
            >
              Daily View
            </button>
            <button
              className={`toggle-option ${viewMode === 'weekly' ? 'active' : ''}`}
              onClick={() => setViewMode('weekly')}
            >
              Weekly Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Day Selector Tabs (if daily view) */}
      {viewMode === 'daily' && (
        <div className="day-tabs-row">
          {days.map((day) => (
            <button
              key={day}
              className={`day-tab-btn ${selectedDay === day ? 'active' : ''}`}
              onClick={() => setSelectedDay(day)}
            >
              <span>{day}</span>
              {selectedDay === day && <span className="active-tab-bar"></span>}
            </button>
          ))}
        </div>
      )}

      {/* Classes list */}
      <div className="timetable-cards-grid">
        {schedule.length === 0 ? (
          <div className="empty-state-card campus-card">
            <BookOpen size={40} className="empty-icon" />
            <h3>No classes scheduled for {selectedDay}</h3>
            <p>Enjoy your study prep session or check out the 24/7 central library.</p>
          </div>
        ) : (
          schedule.map((slot) => (
            <div key={slot.id} className="timetable-detail-card campus-card">
              <div className="tt-detail-header">
                <span className="badge badge-indigo">{slot.code}</span>
                <span className="badge badge-neutral">{slot.type}</span>
              </div>

              <h2 className="tt-detail-title">{slot.subject}</h2>

              <div className="tt-detail-meta-list">
                <div className="tt-detail-meta-row">
                  <Clock size={16} className="text-violet" />
                  <span className="meta-bold">{slot.time}</span>
                  {viewMode === 'weekly' && <span className="badge badge-neutral">{slot.day}</span>}
                </div>
                <div className="tt-detail-meta-row">
                  <MapPin size={16} className="text-violet" />
                  <span>Room: <strong>{slot.room}</strong></span>
                </div>
                <div className="tt-detail-meta-row">
                  <User size={16} className="text-violet" />
                  <span>Faculty: <strong>{slot.faculty}</strong></span>
                </div>
              </div>

              <div className="tt-detail-footer">
                <span className="live-status-pill">
                  <span className="status-dot status-dot-active"></span> Classroom Confirmed
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .timetable-page {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .btn-group-toggle {
          display: flex;
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 3px;
        }
        .toggle-option {
          padding: 6px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-text-secondary);
        }
        .toggle-option.active {
          background: var(--color-primary);
          color: #FFFFFF;
        }
        .day-tabs-row {
          display: flex;
          gap: 8px;
          border-bottom: 1px solid var(--border-subtle);
          overflow-x: auto;
          padding-bottom: 2px;
        }
        .day-tab-btn {
          position: relative;
          padding: 10px 20px;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          white-space: nowrap;
        }
        .day-tab-btn.active {
          color: var(--color-primary);
        }
        .active-tab-bar {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--color-primary);
          border-radius: 3px 3px 0 0;
        }
        .timetable-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .timetable-detail-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .tt-detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .tt-detail-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--color-text-main);
          margin-bottom: 18px;
          line-height: 1.35;
        }
        .tt-detail-meta-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .tt-detail-meta-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--color-text-main);
        }
        .tt-detail-footer {
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }
        .live-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--color-text-secondary);
        }
        .empty-state-card {
          grid-column: 1 / -1;
          padding: 48px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .empty-icon {
          color: var(--color-text-muted);
        }
      `}</style>
    </div>
  );
};

export default Timetable;
