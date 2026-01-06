import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <h2 className="logo">BM GROUP </h2>

        {/* Mobile Menu Toggle */}
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">
          ☰
        </label>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#rooms">Rooms</a></li>
          <li><a href="#features">Facilities</a></li>
          <li><a href="#contact">Contact</a></li>
          <li>
            <button className="nav-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;