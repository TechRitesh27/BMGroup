import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./StaffSidebar.css";

export default function StaffSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth/session data
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("token"); // if you are using JWT

    // Redirect to homepage
    navigate("/");
  };

  const menu = [
    { path: "/staff-dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/staff/bookings", label: "Manage Bookings", icon: "📅" },
    { path: "/staff/requests", label: "Service Requests", icon: "🎧" },
    { path: "/staff/invoices", label: "Invoice Management", icon: "📄" }
  ];

  return (
    <aside className={`staff-sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* Collapse Button */}
      <button
        className="collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "➡️" : "⬅️"}
      </button>

      {/* BRAND */}
      {!collapsed && (
        <div className="brand fade-in">
          <h3>Staff Portal</h3>
          <small>Hotel Management</small>
        </div>
      )}

      {/* NAVIGATION */}
      <nav className="nav">
        {menu.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className="nav-item tooltip"
          >
            <span className="icon">{item.icon}</span>

            {!collapsed && (
              <span className="label fade-in">{item.label}</span>
            )}

            {collapsed && (
              <span className="tooltip-text">{item.label}</span>
            )}
          </Link>
        ))}

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="nav-item tooltip logout-btn"
        >
          <span className="icon">🔓</span>

          {!collapsed && (
            <span className="label fade-in">Logout</span>
          )}

          {collapsed && (
            <span className="tooltip-text">Logout</span>
          )}
        </button>
      </nav>
    </aside>
  );
}
