import React, { useState } from "react";
import "./UserSidebar.css";
import HomePage from "../HomePage/HomePage.jsx";
const UserSidebar = ({ user, setActiveSection, activeSection }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`user-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && <h2>Dashboard</h2>}
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "➡️" : "❌"}
        </button>
      </div>

      <ul className="sidebar-menu">
        <li>
          <a
            className={`sidebar-link ${
              activeSection === "bookings" ? "active" : ""
            }`}
            onClick={() => setActiveSection("bookings")}
          >
            📑 <span className="label">My Bookings</span>
          </a>
        </li>

        <li>
          <a
            className={`sidebar-link ${
              activeSection === "service" ? "active" : ""
            }`}
            onClick={() => setActiveSection("service")}
          >
            🛎️ <span className="label">Service Requests</span>
          </a>
        </li>

        <li>
          <a
            className={`sidebar-link ${
              activeSection === "trips" ? "active" : ""
            }`}
            onClick={() => setActiveSection("trips")}
          >
            ✈️ <span className="label">Upcoming Trips</span>
          </a>
        </li>
        <li>
          <a
            className={`sidebar-link ${
              activeSection === "packages" ? "active" : ""
            }`}
            onClick={() => setActiveSection("packages")}
          >
            🧳 <span className="label">Travel Packages</span>
          </a>
        </li>
        <li>
          <a
            className={`sidebar-link ${
              activeSection === "logout" ? "active" : ""
            }`}
            onClick={() => {
              sessionStorage.removeItem("session");
              window.location.href = "/"; // redirect to homepage route
            }}
          >
            🔓 <span className="label">LogOut</span>
          </a>
        </li>

        {/* Uncomment if needed later
        <li>
          <a
            className={`sidebar-link ${activeSection === "feedback" ? "active" : ""}`}
            onClick={() => setActiveSection("feedback")}
          >
            💬 <span className="label">Feedback</span>
          </a>
        </li>
        <li>
          <a
            className={`sidebar-link ${activeSection === "profile" ? "active" : ""}`}
            onClick={() => setActiveSection("profile")}
          >
            ⚙️ <span className="label">Profile</span>
          </a>
        </li>
        */}
      </ul>
    </div>
  );
};

export default UserSidebar;
