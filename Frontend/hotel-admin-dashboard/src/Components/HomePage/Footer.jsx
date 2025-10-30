import React from "react";
import "./HomePage.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h3>HotelEase</h3>
          <p>Experience comfort and luxury at affordable rates.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#rooms">Rooms</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact Us</h4>
          <p>Email: info@hotelease.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Shirdi, Maharashtra</p>
        </div>
      </div>
      <p className="footer-bottom">
        © {new Date().getFullYear()} HotelEase. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
