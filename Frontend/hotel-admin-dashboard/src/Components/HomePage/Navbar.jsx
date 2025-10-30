import React from "react";
import "./HomePage.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="logo">HotelEase</h2>
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">
          ☰
        </label>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#rooms">Rooms</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/login" className="nav-btn">Login</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
