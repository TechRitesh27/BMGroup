import React from "react";
import "./HomePage.css";

const Footer = () => (
  <footer id="contact" className="footer">
    <div className="footer-content">
      <div>
        <h3>BM GROUP</h3>
        <p>Luxury redefined. Experience the comfort you deserve.</p>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#rooms">Rooms</a></li>
          <li><a href="#features">Facilities</a></li>
          <li><a href="#reviews">Reviews</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <p>Email: info@bmgroup.com</p>
        <p>Phone: +91-7517541081</p>
      </div>
    </div>
    <div className="footer-bottom">
      © {new Date().getFullYear()} BMGroup. All Rights Reserved.
    </div>
  </footer>
);

export default Footer;