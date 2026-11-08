
import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import PropTypes from 'prop-types';

export default function MainLayout({
  search,
  setSearch,
  onAddNote,
  children
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <button
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Tutup menu"
        />
      )}

      <div className="main-wrapper">
        <Header
          search={search}
          setSearch={setSearch}
          onAddNote={onAddNote}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="main-content">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <style>{`
          @media (max-width: 760px) {
            .sidebar {
              transform: translateX(0);
            }
          }
        `}</style>
      )}
    </div>
  );
}

MainLayout.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  onAddNote: PropTypes.func.isRequired,
  children: PropTypes.node
};
