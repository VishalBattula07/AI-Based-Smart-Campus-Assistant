import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  TrendingUp,
  User,
  AlertCircle,
  Building,
  Send,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { campusService } from '../services/campusService';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [timetable, setTimetable] = useState([]);
  const [attendance, setAttendance] = useState(null);
  const [exams, setExams] = useState([]);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickQuery, setQuickQuery] = useState('');

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      try {
        const [ttData, attData, examData, eventData, annData] = await Promise.all([
          campusService.getTimetable('Monday'),
          campusService.getAttendance(),
          campusService.getExaminations(),
          campusService.getEvents(),
          campusService.getAnnouncements(),
        ]);

        setTimetable(ttData || []);
        setAttendance(attData || null);
        setExams(examData || []);
        setEvents(eventData || []);
        setAnnouncements(annData || []);
      } catch (err) {
        console.error('Error fetching dashboard feeds', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const handleQuickAsk = (e) => {
    e.preventDefault();
    if (!quickQuery.trim()) return;
    navigate(`/assistant?q=${encodeURIComponent(quickQuery)}`);
  };

  const handlePromptClick = (prompt) => {
    navigate(`/assistant?q=${encodeURIComponent(prompt)}`);
  };

  const todayDateFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="student-dashboard">
      {/* 1. Welcome Section */}
      <section className="dashboard-welcome-banner campus-card">
        <div className="welcome-content">
          <div className="welcome-badge">
            <span className="status-dot status-dot-active"></span>
            <span>Fall 2026 Academic Session</span>
          </div>
          <h1 className="welcome-heading">
            Good morning, <span className="highlight-name">{user?.name?.split(' ')[0] || 'Alex'}!</span> 👋
          </h1>
          <p className="welcome-subtext">
            Your campus, one intelligent assistant away. You have <strong>{timetable.length} classes</strong> scheduled today and midterm examinations in 14 days.
          </p>
          <div className="welcome-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/assistant')}
            >
              <Sparkles size={16} />
              <span>Ask AI Assistant</span>
            </button>
            <button
              className="btn btn-outline"
              onClick={() => navigate('/timetable')}
            >
              <span>View Full Week</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <div className="welcome-date-card">
          <Calendar size={18} className="date-icon" />
          <span className="date-text">{todayDateFormatted}</span>
          <div className="attendance-chip">
            <TrendingUp size={14} />
            <span>86.4% Aggregate Attendance</span>
          </div>
        </div>
      </section>

      {/* 2. Key Statistics Row */}
      <section className="stats-grid">
        {/* Card 1: Today's Classes */}
        <div
          className="stat-card campus-card campus-card-interactive"
          onClick={() => navigate('/timetable')}
        >
          <div className="stat-card-header">
            <div className="stat-icon-wrap icon-indigo">
              <BookOpen size={20} />
            </div>
            <span className="badge badge-indigo">Today</span>
          </div>
          <div className="stat-card-body">
            <span className="stat-number">{loading ? '...' : `${timetable.length} Lectures`}</span>
            <span className="stat-label">Next: Distributed Cloud Systems</span>
          </div>
          <div className="stat-card-footer">
            <span className="sub-hint">09:00 AM in Lab Complex 3B</span>
          </div>
        </div>

        {/* Card 2: Attendance Overview */}
        <div
          className="stat-card campus-card campus-card-interactive"
          onClick={() => navigate('/attendance')}
        >
          <div className="stat-card-header">
            <div className="stat-icon-wrap icon-green">
              <CheckCircle2 size={20} />
            </div>
            <span className="badge badge-success">Good Standing</span>
          </div>
          <div className="stat-card-body">
            <span className="stat-number">{loading ? '...' : `${attendance?.overallPercentage || '86.4'}%`}</span>
            <span className="stat-label">159 / 184 Classes Attended</span>
          </div>
          <div className="stat-card-footer">
            <div className="mini-progress-bar">
              <div
                className="mini-progress-fill"
                style={{ width: `${attendance?.overallPercentage || 86.4}%` }}
              ></div>
            </div>
            <span className="sub-hint">+11.4% above 75% cutoff</span>
          </div>
        </div>

        {/* Card 3: Upcoming Examinations */}
        <div
          className="stat-card campus-card campus-card-interactive"
          onClick={() => navigate('/examinations')}
        >
          <div className="stat-card-header">
            <div className="stat-icon-wrap icon-amber">
              <GraduationCap size={20} />
            </div>
            <span className="badge badge-warning">Ratified</span>
          </div>
          <div className="stat-card-body">
            <span className="stat-number">{loading ? '...' : `${exams.length} Exams`}</span>
            <span className="stat-label">Starts Oct 24 (Midterms)</span>
          </div>
          <div className="stat-card-footer">
            <span className="sub-hint">Admit card seating verified</span>
          </div>
        </div>

        {/* Card 4: Upcoming Events */}
        <div
          className="stat-card campus-card campus-card-interactive"
          onClick={() => navigate('/events')}
        >
          <div className="stat-card-header">
            <div className="stat-icon-wrap icon-violet">
              <Sparkles size={20} />
            </div>
            <span className="badge badge-violet">Hackathons</span>
          </div>
          <div className="stat-card-body">
            <span className="stat-number">{loading ? '...' : `${events.length} Events`}</span>
            <span className="stat-label">Technovate 2026 AI Summit</span>
          </div>
          <div className="stat-card-footer">
            <span className="sub-hint">Oct 18-20 • Main Hub</span>
          </div>
        </div>
      </section>

      {/* 3. Main Dashboard Grid Layout */}
      <div className="dashboard-main-grid">
        {/* Left Column: Timetable + Quick Actions */}
        <div className="dashboard-primary-col">
          {/* Today's Timetable Section */}
          <div className="campus-card section-card">
            <div className="section-card-header">
              <div>
                <h2 className="section-title">Today's Class Schedule</h2>
                <p className="section-subtitle">Real-time room occupancy and lecture venues</p>
              </div>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => navigate('/timetable')}
              >
                <span>View Full Week</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="timetable-timeline">
              {timetable.map((item, idx) => (
                <div key={item.id} className="timetable-item">
                  <div className="timetable-time-col">
                    <span className="tt-time">{item.time.split('-')[0]}</span>
                    <span className="tt-duration">{item.time.split('-')[1]}</span>
                  </div>

                  <div className="tt-divider-line">
                    <div className="tt-dot"></div>
                  </div>

                  <div className="tt-card-content">
                    <div className="tt-card-top">
                      <span className="tt-code">{item.code}</span>
                      <span className="badge badge-indigo">{item.type}</span>
                    </div>
                    <h3 className="tt-subject">{item.subject}</h3>
                    <div className="tt-meta-row">
                      <span className="tt-meta-item">
                        <MapPin size={13} />
                        {item.room}
                      </span>
                      <span className="tt-meta-item">
                        <User size={13} />
                        {item.faculty}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="section-card-simple">
            <h3 className="sub-section-title">Common Campus Actions</h3>
            <div className="quick-actions-grid">
              <div
                className="action-card campus-card campus-card-interactive"
                onClick={() => navigate('/facilities')}
              >
                <div className="action-icon icon-indigo">
                  <Building size={18} />
                </div>
                <div>
                  <h4 className="action-title">Library Seat Status</h4>
                  <p className="action-desc">Check 24/7 study cubicle capacity</p>
                </div>
              </div>

              <div
                className="action-card campus-card campus-card-interactive"
                onClick={() => navigate('/examinations')}
              >
                <div className="action-icon icon-amber">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h4 className="action-title">Download Hall Ticket</h4>
                  <p className="action-desc">Verify mid-semester seat numbers</p>
                </div>
              </div>

              <div
                className="action-card campus-card campus-card-interactive"
                onClick={() => navigate('/faculty')}
              >
                <div className="action-icon icon-violet">
                  <User size={18} />
                </div>
                <div>
                  <h4 className="action-title">Office Hours Directory</h4>
                  <p className="action-desc">Consultation booking with professors</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Compact AI Assistant + Announcements */}
        <div className="dashboard-secondary-col">
          {/* AI Interactive Panel */}
          <div className="campus-card ai-assistant-widget">
            <div className="ai-widget-header">
              <div className="ai-avatar-badge">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="ai-widget-title">Smart Campus Copilot</h3>
                <span className="ai-widget-status">
                  <span className="status-dot status-dot-active"></span> Online • Ready to help
                </span>
              </div>
            </div>

            <p className="ai-widget-desc">
              Ask anything about your syllabus, exam dates, lecture venues, or attendance margin.
            </p>

            {/* Suggested quick chips */}
            <div className="suggested-chips-wrap">
              <span className="chips-label">Suggested prompts:</span>
              <div className="chips-row">
                <button
                  className="prompt-chip"
                  onClick={() => handlePromptClick('Show my timetable for today')}
                >
                  Show my timetable
                </button>
                <button
                  className="prompt-chip"
                  onClick={() => handlePromptClick('Check my attendance percentage')}
                >
                  Check attendance
                </button>
                <button
                  className="prompt-chip"
                  onClick={() => handlePromptClick('What are my upcoming midterm examinations?')}
                >
                  Upcoming exams
                </button>
                <button
                  className="prompt-chip"
                  onClick={() => handlePromptClick('Find Dr. Evelyn Reed office hours')}
                >
                  Find Dr. Evelyn Reed
                </button>
              </div>
            </div>

            {/* Quick input form */}
            <form onSubmit={handleQuickAsk} className="ai-widget-form">
              <input
                type="text"
                placeholder="Ask me anything..."
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                className="ai-widget-input"
              />
              <button type="submit" className="ai-widget-submit" aria-label="Send">
                <Send size={15} />
              </button>
            </form>
          </div>

          {/* Latest Campus Announcements */}
          <div className="campus-card announcements-widget">
            <div className="section-card-header">
              <h3 className="section-title">Latest Notices</h3>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => navigate('/announcements')}
              >
                View all
              </button>
            </div>

            <div className="announcements-list">
              {announcements.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="announcement-item"
                  onClick={() => navigate('/announcements')}
                >
                  <div className="announcement-top">
                    <span
                      className={`badge ${
                        item.priority === 'HIGH'
                          ? 'badge-danger'
                          : item.priority === 'MEDIUM'
                          ? 'badge-warning'
                          : 'badge-neutral'
                      }`}
                    >
                      {item.priority}
                    </span>
                    <span className="ann-date">{item.date}</span>
                  </div>
                  <h4 className="ann-title">{item.title}</h4>
                  <p className="ann-body">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
