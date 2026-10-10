import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { campusService } from '../services/campusService';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'REGISTERED' | 'HACKATHONS'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await campusService.getEvents();
        setEvents(data || []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleToggleRegister = (id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, registered: !e.registered } : e))
    );
  };

  const filteredEvents = events.filter((e) => {
    if (filter === 'REGISTERED') return e.registered;
    if (filter === 'HACKATHONS') return e.category === 'Hackathon';
    return true;
  });

  return (
    <div className="events-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Campus Events & Hackathons</h1>
          <p className="page-subtitle">Participate in tech workshops, keynotes, and annual collegiate competitions</p>
        </div>

        <div className="btn-group-toggle">
          <button
            className={`toggle-option ${filter === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilter('ALL')}
          >
            All Events
          </button>
          <button
            className={`toggle-option ${filter === 'REGISTERED' ? 'active' : ''}`}
            onClick={() => setFilter('REGISTERED')}
          >
            Registered
          </button>
          <button
            className={`toggle-option ${filter === 'HACKATHONS' ? 'active' : ''}`}
            onClick={() => setFilter('HACKATHONS')}
          >
            Hackathons
          </button>
        </div>
      </div>

      <div className="events-grid">
        {filteredEvents.map((evt) => (
          <div key={evt.id} className="event-card campus-card">
            <div className="event-card-top">
              <span className={`badge badge-${evt.tagColor || 'indigo'}`}>
                {evt.category}
              </span>
              <span className="event-capacity">{evt.capacity}</span>
            </div>

            <h2 className="event-title">{evt.title}</h2>
            <p className="event-description">{evt.description}</p>

            <div className="event-meta-block">
              <div className="event-meta-item">
                <Calendar size={15} className="meta-icon" />
                <span>{evt.displayDate}</span>
              </div>
              <div className="event-meta-item">
                <Clock size={15} className="meta-icon" />
                <span>{evt.time}</span>
              </div>
              <div className="event-meta-item">
                <MapPin size={15} className="meta-icon" />
                <span>{evt.location}</span>
              </div>
            </div>

            <div className="event-card-footer">
              <button
                className={`btn btn-sm ${evt.registered ? 'btn-outline' : 'btn-primary'}`}
                onClick={() => handleToggleRegister(evt.id)}
              >
                {evt.registered ? (
                  <>
                    <CheckCircle2 size={14} className="text-success" />
                    <span>Registered</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    <span>RSVP / Register</span>
                  </>
                )}
              </button>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => alert(`Event details for "${evt.title}" shared to your university email.`)}
              >
                Share
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .events-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 24px;
        }
        .event-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .event-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .event-capacity {
          font-size: 0.74rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }
        .event-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--color-text-main);
          margin-bottom: 10px;
          line-height: 1.35;
        }
        .event-description {
          font-size: 0.84rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .event-meta-block {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 14px;
          background: #F8FAFC;
          border-radius: var(--radius-md);
          margin-bottom: 20px;
        }
        .event-meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--color-text-main);
        }
        .meta-icon {
          color: var(--color-accent);
          flex-shrink: 0;
        }
        .event-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }
      `}</style>
    </div>
  );
};

export default Events;
