import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Sidebar (Desktop and Mobile drawer) */}
      <div className={`sidebar-container-wrap ${mobileOpen ? 'mobile-visible' : ''}`}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        {mobileOpen && (
          <div
            className="mobile-backdrop"
            onClick={() => setMobileOpen(false)}
          ></div>
        )}
      </div>

      {/* Main Body */}
      <div className="main-wrapper">
        <Navbar onToggleMobileMenu={() => setMobileOpen(!mobileOpen)} />
        <main className="content-viewport">
          <Outlet />
        </main>
      </div>

      <style>{`
        .sidebar-container-wrap {
          display: flex;
        }
        @media (max-width: 900px) {
          .sidebar-container-wrap {
            position: fixed;
            top: 0;
            left: -280px;
            bottom: 0;
            z-index: 1000;
            transition: left var(--transition-smooth);
          }
          .sidebar-container-wrap.mobile-visible {
            left: 0;
          }
          .mobile-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.4);
            z-index: -1;
          }
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
