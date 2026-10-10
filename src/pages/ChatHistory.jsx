import React, { useState } from 'react';
import {
  MessageSquareCode,
  Trash2,
  ExternalLink,
  Bot,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChatHistory = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([
    {
      id: 'sess_1',
      title: 'Midterm Timetable & Venues',
      date: 'Today, 02:40 PM',
      summary: 'Queried seating block for CS-601 exam and practical lab dates.',
      source: 'Academic ERP',
    },
    {
      id: 'sess_2',
      title: 'Cybersecurity Attendance Shortfall',
      date: 'Yesterday, 11:15 AM',
      summary: 'Calculated margin above 75% cutoff and required classes to reach 80%.',
      source: 'Student Information System',
    },
    {
      id: 'sess_3',
      title: 'Dr. Evelyn Reed Office Consultation',
      date: 'Oct 08, 2026',
      summary: 'Retrieved cabin location Turing 412 and consultation hours.',
      source: 'Faculty Directory',
    },
    {
      id: 'sess_4',
      title: 'Technovate 2026 Hackathon Details',
      date: 'Oct 05, 2026',
      summary: 'Checked prize bounty, mentor list, and team registration status.',
      source: 'Campus Events Registry',
    },
  ]);

  const handleDelete = (id) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  return (
    <div className="chat-history-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Assistant Chat History</h1>
          <p className="page-subtitle">Review past queries, verified answers, and academic guidance</p>
        </div>

        <button
          className="btn btn-outline"
          onClick={() => setSessions([])}
        >
          <Trash2 size={16} />
          <span>Clear All History</span>
        </button>
      </div>

      <div className="history-cards-grid">
        {sessions.length === 0 ? (
          <div className="empty-history campus-card">
            <MessageSquareCode size={40} className="text-violet" />
            <h3>No past conversations found</h3>
            <p>Your conversation queries with CampusIQ will be safely logged here.</p>
            <button className="btn btn-primary" onClick={() => navigate('/assistant')}>
              Ask CampusIQ Assistant
            </button>
          </div>
        ) : (
          sessions.map((s) => (
            <div key={s.id} className="history-record-card campus-card">
              <div className="history-head">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bot size={18} className="text-violet" />
                  <span className="badge badge-indigo">{s.source}</span>
                </div>
                <span className="history-time">{s.date}</span>
              </div>

              <h2 className="history-title">{s.title}</h2>
              <p className="history-desc">{s.summary}</p>

              <div className="history-foot">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => navigate(`/assistant?q=${encodeURIComponent(s.title)}`)}
                >
                  <span>Resume Conversation</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  className="btn btn-ghost btn-sm text-danger"
                  onClick={() => handleDelete(s.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .chat-history-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .history-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 20px;
        }
        .history-record-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .history-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .history-time {
          font-size: 0.74rem;
          color: var(--color-text-muted);
        }
        .history-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--color-text-main);
          margin-bottom: 8px;
        }
        .history-desc {
          font-size: 0.84rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .history-foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }
        .empty-history {
          grid-column: 1 / -1;
          padding: 48px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
      `}</style>
    </div>
  );
};

export default ChatHistory;
