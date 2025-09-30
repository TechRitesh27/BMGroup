import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./UserSidebar.css";

const UserSidebar = ({ user, setActiveSection, activeSection }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`user-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && <h2>Hello,👋 {user.name}</h2>}
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "➡️" : "❌"}
        </button>
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="#"
            className={activeSection === "bookings" ? "active" : ""}
            onClick={() => setActiveSection("bookings")}
          >
            📑 My Bookings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="#"
            className={activeSection === "trips" ? "active" : ""}
            onClick={() => setActiveSection("trips")}
          >
            ✈️ Upcoming Trips
          </NavLink>
        </li>
        <li>
          <NavLink
            to="#"
            className={activeSection === "packages" ? "active" : ""}
            onClick={() => setActiveSection("packages")}
          >
            🧳 Travel Packages
          </NavLink>
        </li>
        <li>
          <NavLink
            to="#"
            className={activeSection === "feedback" ? "active" : ""}
            onClick={() => setActiveSection("feedback")}
          >
            💬 Feedback
          </NavLink>
        </li>
        <li>
          <NavLink
            to="#"
            className={activeSection === "profile" ? "active" : ""}
            onClick={() => setActiveSection("profile")}
          >
            ⚙️ Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
