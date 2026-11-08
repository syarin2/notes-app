
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  NotebookPen,
  LayoutDashboard,
  FileText,
  Star,
  Archive,
  Settings
} from 'lucide-react';
import PropTypes from 'prop-types';

export default function Sidebar({ onClose }) {
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: LayoutDashboard
    },
    {
      name: 'My Notes',
      path: '/notes',
      icon: FileText
    },
    {
      name: 'Favorites',
      path: '/favorites',
      icon: Star
    },
    {
      name: 'Archive',
      path: '/archive',
      icon: Archive
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <NotebookPen size={23} />
        </div>
        <h2>MyNotes<span>.</span></h2>
      </div>

      <div className="sidebar-menu">
        <p className="menu-label">MENU</p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? 'menu-item active' : 'menu-item'
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-tip">
          <div className="tip-icon">
            <NotebookPen size={20} />
          </div>
          <h4>Keep your ideas</h4>
          <p>Small notes, big ideas. Keep everything organized!</p>
        </div>

           <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                isActive ? 'sidebar-footer active' : 'sidebar-footer'
              }
            >
              <Settings size={18} />
              <span>Settings</span>
      </NavLink>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  onClose: PropTypes.func
};
