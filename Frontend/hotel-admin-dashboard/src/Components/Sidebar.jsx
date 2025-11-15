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
<<<<<<< HEAD

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
=======
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
>>>>>>> f73b0add91a598654d6852481910812ed78eae00
    </div>
  );
};

export default Sidebar;