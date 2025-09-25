import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { useState } from 'react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2>Smart Hotel Admin</h2>
        <button className="close-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '➡️' : '❌'}
        </button>
      </div>
      {!collapsed && (
        <ul>
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
          <li><NavLink to="/rooms" className={({ isActive }) => isActive ? 'active' : ''}>Manage Rooms</NavLink></li>
          <li><NavLink to="/room-types" className={({ isActive }) => isActive ? 'active' : ''}>Manage Room Types</NavLink></li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;