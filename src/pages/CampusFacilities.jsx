import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  CheckCircle2,
  Users,
  Search,
  Sparkles,
  Compass,
} from 'lucide-react';
import { campusService } from '../services/campusService';

const CampusFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      const data = await campusService.getFacilities();
      setFacilities(data || []);
    }
    load();
  }, []);

  const filtered = facilities.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="facilities-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Campus Facilities & Study Lounges</h1>
          <p className="page-subtitle">Real-time occupancy status, operating hours, and smart amenities</p>
        </div>

        <div className="search-box-wrap">
          <Search size={16} className="search-box-icon" />
          <input
            type="text"
            className="form-input search-box-input"
            placeholder="Search library, GPU lab, arena..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="facilities-grid">
        {filtered.map((item) => (
          <div key={item.id} className="facility-card campus-card">
            <div className="facility-img-wrap">
              <img src={item.image} alt={item.name} className="facility-img" />
              <div className="facility-badge-overlay">
                <span className="badge badge-success">
                  <span className="status-dot status-dot-active"></span> {item.status}
                </span>
              </div>
            </div>

            <div className="facility-body">
              <span className="badge badge-indigo">{item.category}</span>
              <h2 className="facility-name">{item.name}</h2>

              <div className="facility-meta-list">
                <div className="facility-meta-row">
                  <MapPin size={15} className="detail-icon" />
                  <span>{item.location}</span>
                </div>
                <div className="facility-meta-row">
                  <Clock size={15} className="detail-icon" />
                  <span>{item.timings}</span>
                </div>
              </div>

              <div className="facility-features">
                {item.features.map((feat, i) => (
                  <span key={i} className="facility-feat-chip">{feat}</span>
                ))}
              </div>

              <div className="facility-foot">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => alert(`Seat reservation requested for ${item.name}.`)}
                >
                  Reserve Pod / Seat
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .facilities-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .facilities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 24px;
        }
        .facility-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .facility-img-wrap {
          height: 190px;
          position: relative;
          width: 100%;
        }
        .facility-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .facility-badge-overlay {
          position: absolute;
          top: 14px;
          right: 14px;
        }
        .facility-body {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .facility-name {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--color-text-main);
          margin: 8px 0 12px;
          line-height: 1.3;
        }
        .facility-meta-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }
        .facility-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--color-text-secondary);
        }
        .facility-features {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }
        .facility-feat-chip {
          padding: 3px 8px;
          background: #F1F5F9;
          border-radius: var(--radius-sm);
          font-size: 0.72rem;
          color: var(--color-text-secondary);
          font-weight: 500;
        }
        .facility-foot {
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }
      `}</style>
    </div>
  );
};

export default CampusFacilities;
