import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      <div className="sidebar-header">
        {!collapsed && <h2>Smart Hotel Admin</h2>}

        <button
          className="close-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
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
            >
              📊 Dashboard
            </NavLink>
          </li>

          <li><NavLink to="/rooms">🛏️ Manage Rooms</NavLink></li>
          <li><NavLink to="/room-types">🏷️ Room Types</NavLink></li>
          <li><NavLink to="/bookings">📅 Bookings</NavLink></li>
          <li><NavLink to="/bookingbydate">📅 Booking for Date</NavLink></li>
          <li><NavLink to="/bookingcalendar">📅 Booking Calendar</NavLink></li>
          <li><NavLink to="/customers">👥 Customers</NavLink></li>
          <li><NavLink to="/packages">📦 Packages</NavLink></li>
          <li><NavLink to="/login">Logout</NavLink></li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
