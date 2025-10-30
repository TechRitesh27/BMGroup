import React from "react";
import "./HomePage.css";

const FooterSection = () => (
  <footer className="footer">
    <div className="footer-content">
      <h3>Luxury Hotels</h3>
      <p>123 Beach Avenue, Mumbai, India</p>
      <p>📞 +91 98765 43210 | ✉️ info@luxuryhotels.com</p>
      <p>© {new Date().getFullYear()} Luxury Hotels. All rights reserved.</p>
    </div>
  </footer>
);

export default FooterSection;
