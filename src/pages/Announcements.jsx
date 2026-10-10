import React, { useState, useEffect } from 'react';
import {
  Bell,
  Search,
  Filter,
  Calendar,
  AlertCircle,
  Bookmark,
  Share2,
} from 'lucide-react';
import { campusService } from '../services/campusService';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await campusService.getAnnouncements();
        setAnnouncements(data || []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = announcements.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase());
    const matchesPriority =
      filter === 'ALL' ? true : item.priority === filter;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="announcements-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Campus Notices & Circulars</h1>
          <p className="page-subtitle">Official communications ratified by the Registrar & Deans</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div className="search-box-wrap">
            <Search size={16} className="search-box-icon" />
            <input
              type="text"
              className="form-input search-box-input"
              placeholder="Search circulars..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="btn-group-toggle">
            <button
              className={`toggle-option ${filter === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilter('ALL')}
            >
              All
            </button>
            <button
              className={`toggle-option ${filter === 'HIGH' ? 'active' : ''}`}
              onClick={() => setFilter('HIGH')}
            >
              High Priority
            </button>
          </div>
        </div>
      </div>

      <div className="announcements-feed">
        {filtered.map((item) => (
          <div key={item.id} className="announcement-banner campus-card">
            <div className="ann-banner-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  className={`badge ${
                    item.priority === 'HIGH'
                      ? 'badge-danger'
                      : item.priority === 'MEDIUM'
                      ? 'badge-warning'
                      : 'badge-neutral'
                  }`}
                >
                  {item.priority} Priority
                </span>
                <span className="badge badge-indigo">{item.category}</span>
              </div>
              <span className="ann-date-text">{item.date}</span>
            </div>

            <h2 className="ann-banner-title">{item.title}</h2>
            <p className="ann-banner-content">{item.content}</p>

            <div className="ann-banner-footer">
              <span className="ann-author">Issued by: <strong>{item.author}</strong></span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => alert('Announcement saved to student bookmarks.')}
                >
                  <Bookmark size={14} />
                  <span>Bookmark</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .announcements-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .announcements-feed {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .announcement-banner {
          padding: 24px;
        }
        .ann-banner-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .ann-date-text {
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }
        .ann-banner-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--color-text-main);
          margin-bottom: 10px;
          line-height: 1.35;
        }
        .ann-banner-content {
          font-size: 0.88rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 18px;
        }
        .ann-banner-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }
        .ann-author {
          font-size: 0.76rem;
          color: var(--color-text-secondary);
        }
      `}</style>
    </div>
  );
};

export default Announcements;
