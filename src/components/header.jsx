
import React from 'react';
import { Search, Plus, Menu } from 'lucide-react';
import PropTypes from 'prop-types';

export default function Header({
  search,
  setSearch,
  onAddNote,
  onToggleSidebar
}) {
  return (
    <header className="header">
      <div className="header-left">
        <button
          className="mobile-menu"
          onClick={onToggleSidebar}
          aria-label="Buka menu"
        >
          <Menu size={22} />
        </button>

        <div>
          <p className="header-greeting">Welcome back!</p>
          <h2>My Workspace</h2>
        </div>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search your notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="add-note-btn" onClick={onAddNote}>
          <Plus size={19} />
          <span>New Note</span>
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  onAddNote: PropTypes.func.isRequired,
  onToggleSidebar: PropTypes.func.isRequired
};
