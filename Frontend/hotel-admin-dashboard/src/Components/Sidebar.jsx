import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useState } from "react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2>Smart Hotel Admin</h2>
        <button className="close-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "➡️" : "❌"}
        </button>
      </div>
      {!collapsed && (
        <ul>
        <li>
  <NavLink
    to={
      JSON.parse(localStorage.getItem("loggedUser"))?.role === "admin"
        ? "/dashboard" 
        : "/user"
    }
    className={({ isActive }) => (isActive ? "active" : "")}
  >
    📊 Dashboard
  </NavLink>
</li>

          <li>
            <NavLink
              to="/rooms"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              🛏️ Manage Rooms
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/room-types"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              🏷️ Room Types
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bookings"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              📅 Bookings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bookingbydate"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              📅 Booking for  Date
            </NavLink>
          </li>
          <li>
              <NavLink
              to="/bookingcalendar"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              📅 Booking calendar
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/customers"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              👥 Customers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/packages"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              📦 Packages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
               Logout
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
