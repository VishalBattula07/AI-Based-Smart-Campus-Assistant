import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sparkles,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Menu,
  Shield,
  BookOpen,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Leaf } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onToggleMobileMenu }) => {
  const { user, logout, switchRole } = useAuth();
  const { theme, switchTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: 'Midterm Seating Released', time: '10m ago', unread: true },
    { id: 2, title: 'AI Hackathon registration confirmed', time: '1h ago', unread: true },
    { id: 3, title: 'Central Library 24/7 notice', time: '3h ago', unread: false },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/assistant?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
  };

  return (
    <header className="campus-navbar">
      <div className="navbar-left">
        <button className="mobile-menu-trigger" onClick={onToggleMobileMenu} aria-label="Toggle menu">
          <Menu size={22} />
        </button>

        {/* Global Smart Search */}
        <form onSubmit={handleSearchSubmit} className="search-form-wrapper">
          <Search className="search-icon" size={17} />
          <input
            type="text"
            className="search-input"
            placeholder="Search classes, faculty, exam halls, or ask AI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-ai-chip">
            <Sparkles size={11} /> AI
          </span>
        </form>
      </div>

      <div className="navbar-right">
        {/* Dynamic Theme Switcher */}
        <div className="theme-picker-wrapper" title="Switch CampusIQ Theme">
          <button
            className={`theme-pill-btn ${theme === 'indigo' ? 'active' : ''}`}
            onClick={() => switchTheme('indigo')}
            title="Indigo SaaS Theme"
          >
            <Sun size={13} />
            <span>Indigo</span>
          </button>
          <button
            className={`theme-pill-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => switchTheme('dark')}
            title="Cyber Dark Obsidian Theme"
          >
            <Moon size={13} />
            <span>Dark</span>
          </button>
          <button
            className={`theme-pill-btn ${theme === 'emerald' ? 'active' : ''}`}
            onClick={() => switchTheme('emerald')}
            title="Emerald Ivy League Theme"
          >
            <Leaf size={13} />
            <span>Emerald</span>
          </button>
        </div>

        {/* Quick AI Button */}
        <button
          className="btn btn-accent btn-sm header-ai-btn"
          onClick={() => navigate('/assistant')}
        >
          <Sparkles size={14} />
          <span>Ask Assistant</span>
        </button>

        {/* Notification Dropdown */}
        <div className="notif-wrapper">
          <button
            className={`notif-btn ${notifOpen ? 'active' : ''}`}
            onClick={() => {
              setNotifOpen(!notifOpen);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
          >
            <Bell size={19} />
            <span className="notif-badge">2</span>
          </button>

          {notifOpen && (
            <div className="dropdown-panel notif-panel">
              <div className="dropdown-header">
                <span className="dropdown-title">Notifications</span>
                <span className="badge badge-indigo">2 New</span>
              </div>
              <div className="notif-list">
                {notifications.map((n) => (
                  <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
                    <div className="notif-bullet"></div>
                    <div className="notif-content">
                      <p className="notif-text">{n.title}</p>
                      <span className="notif-time">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <button
                  className="dropdown-view-all"
                  onClick={() => {
                    navigate('/announcements');
                    setNotifOpen(false);
                  }}
                >
                  View all announcements
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Menu */}
        <div className="profile-wrapper">
          <button
            className="profile-trigger"
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifOpen(false);
            }}
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt={user?.name || 'User'}
              className="profile-avatar"
            />
            <div className="profile-info-text">
              <span className="profile-name">{user?.name || 'Alex Rivera'}</span>
              <span className="profile-role-tag">{user?.role || 'Student'}</span>
            </div>
            <ChevronDown size={15} className={`chevron-icon ${profileOpen ? 'open' : ''}`} />
          </button>

          {profileOpen && (
            <div className="dropdown-panel profile-panel">
              <div className="profile-dropdown-header">
                <p className="p-name">{user?.name}</p>
                <p className="p-email">{user?.email}</p>
                <div className="p-badge-line">
                  <span className="badge badge-violet">{user?.role}</span>
                  <span className="badge badge-neutral">{user?.rollNo || user?.department}</span>
                </div>
              </div>

              <div className="dropdown-divider"></div>

              <button
                className="dropdown-item"
                onClick={() => {
                  navigate('/dashboard');
                  setProfileOpen(false);
                }}
              >
                <User size={16} />
                <span>My Profile</span>
              </button>

              <button
                className="dropdown-item"
                onClick={() => {
                  navigate('/settings');
                  setProfileOpen(false);
                }}
              >
                <Settings size={16} />
                <span>Preferences</span>
              </button>

              <div className="dropdown-divider"></div>

              <button
                className="dropdown-item text-danger"
                onClick={() => {
                  logout();
                  navigate('/login');
                  setProfileOpen(false);
                }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
