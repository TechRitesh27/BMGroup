// Sidebar.jsx
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const navItems = [
    { to: "/", icon: "📊", label: "Dashboard" },
    { to: "/rooms", icon: "🛏️", label: "Manage Rooms" },
    { to: "/packages", icon: "📦", label: "Packages" },
    { to: "/bookings", icon: "📅", label: "Bookings" },
    { to: "/room-types", icon: "🏷️", label: "Room Types" },
    // { to: "/bookingbydate", icon: "📅", label: "Booking for Date" },
    { to: "/bookingcalendar", icon: "📅", label: "Booking Calendar" },
    { to: "/customers", icon: "👥", label: "Customers" },
    
  ];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && <h2>Smart Hotel Admin</h2>}
        <button className="close-btn" onClick={toggleSidebar}>
          {collapsed ? "➡️" : "❌"}
        </button>
      </div>

      <ul>
        {navItems.map(({ to, icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) => (isActive ? "active" : "")}
              data-label={label}
            >
              <span className="icon">{icon}</span>
              <span className="label">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;