import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./StaffSidebar.css";

export default function StaffSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    { path: "/staff-dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/staff/bookings", label: "Manage Bookings", icon: "📅" },
    { path: "/staff/rooms", label: "Manage Rooms", icon: "🛏️" },
    { path: "/staff/requests", label: "Service Requests", icon: "🎧" },
    { path: "/staff/packages", label: "Travel Packages", icon: "🧭" },
    { path: "/staff/invoices", label: "Invoice Management", icon: "📄" },
    { path: "/staff/users", label: "Staff/Customers", icon: "👥" },
    { path: "/staff/settings", label: "Settings", icon: "⚙️" }
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

            {/* Only show label when expanded */}
            {!collapsed && (
              <span className="label fade-in">{item.label}</span>
            )}

            {/* Tooltip when collapsed */}
            {collapsed && (
              <span className="tooltip-text">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
