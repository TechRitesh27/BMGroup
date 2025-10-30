import React from "react";
import { NavLink } from "react-router-dom";
import "./StaffSidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar bg-white border-end">
      <div className="sidebar-logo p-3">
        <h4>Staff UI</h4>
      </div>
      <nav className="nav flex-column p-2">
        <NavLink to="/dashboard" className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/staff" className="nav-link">
          Staff
        </NavLink>
        <NavLink to="/settings" className="nav-link">
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
