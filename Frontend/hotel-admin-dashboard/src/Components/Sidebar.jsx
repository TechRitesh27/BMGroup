// Sidebar.jsx
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  // MAIN BRANCH NAV ITEMS (KEPT)
  const navItems = [
    { to: "/", icon: "📊", label: "Dashboard" },
    { to: "/rooms", icon: "🛏️", label: "Manage Rooms" },
    { to: "/packages", icon: "📦", label: "Packages" },
    { to: "/bookings", icon: "📅", label: "Bookings" },
    { to: "/room-types", icon: "🏷️", label: "Room Types" },
    { to: "/bookingcalendar", icon: "📅", label: "Booking Calendar" },
    { to: "/customers", icon: "👥", label: "Customers" },
  ];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      <div className="sidebar-header">
        {/* TITLE visible only when NOT collapsed */}
        {!collapsed && <h2>Smart Hotel Admin</h2>}

        {/* PRANJAL'S COLLAPSE BUTTON (KEEP THIS) */}
        <button
          className="close-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "➡️" : "❌"}
        </button>
      </div>

      {/* MAIN NAVIGATION (KEPT) */}
      <ul>
        {navItems.map(({ to, icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) => (isActive ? "active" : "")}
              data-label={label}
            >
              <span className="icon">{icon}</span>
              {/* label hides on collapse automatically via CSS */}
              <span className="label">{label}</span>
            </NavLink>
          </li>
        ))}

        {/* Logout added manually like Pranjal had */}
        <li>
          <NavLink to="/login">Logout</NavLink>
        </li>
      </ul>

    </div>
  );
};

export default Sidebar;
