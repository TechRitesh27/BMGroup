import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
  localStorage.removeItem("token");
  sessionStorage.removeItem("session");

    navigate("/login");
     window.location.reload(true);
  };

  return (
    <div className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Header */}
      <div className="sidebar-header">
        {!collapsed && <h2>Smart Hotel Admin</h2>}
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* Menu */}
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/dashboard" className="sidebar-link">
            <span className="icon">📊</span>
            {!collapsed && <span className="label">Dashboard</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/rooms" className="sidebar-link">
            <span className="icon">🛏️</span>
            {!collapsed && <span className="label">Manage Rooms</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/room-types" className="sidebar-link">
            <span className="icon">🏷️</span>
            {!collapsed && <span className="label">Room Types</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookings" className="sidebar-link">
            <span className="icon">📅</span>
            {!collapsed && <span className="label">Bookings</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/customers" className="sidebar-link">
            <span className="icon">👥</span>
            {!collapsed && <span className="label">Customers</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/packages" className="sidebar-link">
            <span className="icon">📦</span>
            {!collapsed && <span className="label">Packages</span>}
          </NavLink>
        </li>
        <li onClick={handleLogout} className="sidebar-link logout-btn">
          <span className="icon">⬅️</span>
          {!collapsed && <span className="label">Logout</span>}
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
