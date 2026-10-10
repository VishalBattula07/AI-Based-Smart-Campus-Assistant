import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Bot,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Users2,
  Building2,
  Sparkles,
  BellRing,
  MapPin,
  MessageSquareCode,
  Settings,
  ShieldCheck,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ collapsed, setCollapsed }) => {
  const { user, switchRole, logout } = useAuth();

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Assistant', path: '/assistant', icon: Bot, badge: 'AI' },
    { name: 'My Timetable', path: '/timetable', icon: CalendarDays },
    { name: 'Attendance', path: '/attendance', icon: CheckCircle2 },
    { name: 'Examinations', path: '/examinations', icon: GraduationCap },
    { name: 'Faculty Directory', path: '/faculty', icon: Users2 },
    { name: 'Departments', path: '/departments', icon: Building2 },
    { name: 'Events', path: '/events', icon: Sparkles },
    { name: 'Announcements', path: '/announcements', icon: BellRing },
    { name: 'Campus Facilities', path: '/facilities', icon: MapPin },
    { name: 'Chat History', path: '/chat-history', icon: MessageSquareCode },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  // Role management items
  const adminItem = { name: 'Admin Portal', path: '/admin', icon: ShieldCheck };
  const facultyItem = { name: 'Faculty Portal', path: '/faculty-portal', icon: Briefcase };

  return (
    <aside className={`campus-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="brand-logo-icon">
          <GraduationCap className="brand-svg" size={24} />
          <span className="brand-sparkle-dot"></span>
        </div>
        {!collapsed && (
          <div className="brand-text">
            <span className="brand-title">Campus<span className="text-violet">IQ</span></span>
            <span className="brand-subtitle">Smart AI University</span>
          </div>
        )}
      </div>

      {/* Role Switcher Pill for Demo Ease */}
      {!collapsed && (
        <div className="role-switcher-banner">
          <div className="role-label">
            <UserCheck size={13} />
            <span>Active View:</span>
          </div>
          <div className="role-pill-group">
            <button
              className={`role-chip ${user?.role === 'STUDENT' ? 'active' : ''}`}
              onClick={() => switchRole('STUDENT')}
            >
              Student
            </button>
            <button
              className={`role-chip ${user?.role === 'FACULTY' ? 'active' : ''}`}
              onClick={() => switchRole('FACULTY')}
            >
              Faculty
            </button>
            <button
              className={`role-chip ${user?.role === 'ADMIN' ? 'active' : ''}`}
              onClick={() => switchRole('ADMIN')}
            >
              Admin
            </button>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="sidebar-menu-scroll">
        <div className="menu-group-label">{!collapsed ? 'STUDENT SERVICES' : '—'}</div>
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                title={collapsed ? item.name : undefined}
              >
                <div className="nav-icon-wrapper">
                  <Icon size={19} />
                </div>
                {!collapsed && <span className="nav-label">{item.name}</span>}
                {!collapsed && item.badge && (
                  <span className="nav-badge-pill">{item.badge}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Portals Section */}
        <div className="menu-group-label" style={{ marginTop: '20px' }}>
          {!collapsed ? 'PORTAL VIEWS' : '—'}
        </div>
        <nav className="sidebar-nav">
          <NavLink
            to={facultyItem.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            title={collapsed ? facultyItem.name : undefined}
          >
            <div className="nav-icon-wrapper">
              <facultyItem.icon size={19} />
            </div>
            {!collapsed && <span className="nav-label">{facultyItem.name}</span>}
          </NavLink>

          <NavLink
            to={adminItem.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            title={collapsed ? adminItem.name : undefined}
          >
            <div className="nav-icon-wrapper">
              <adminItem.icon size={19} />
            </div>
            {!collapsed && <span className="nav-label">{adminItem.name}</span>}
          </NavLink>
        </nav>
      </div>

      {/* Collapse Toggle Footer */}
      <div className="sidebar-footer">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="collapse-toggle-btn"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span>Collapse Sidebar</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
