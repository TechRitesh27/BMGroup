import React from "react";
import "./HomePage.css";

const Features = () => (
  <section id="features" className="features-section">
    <h2>Our Premium Facilities</h2>
    <div className="features-grid">
      <div className="feature-box">
        <i className="fas fa-wifi"></i>
        <h4>Free Wi-Fi</h4>
        <p>Unlimited high-speed internet for all guests.</p>
      </div>
      <div className="feature-box">
        <i className="fas fa-concierge-bell"></i>
        <h4>24/7 Concierge</h4>
        <p>Always available to make your stay seamless.</p>
      </div>
      <div className="feature-box">
        <i className="fas fa-utensils"></i>
        <h4>Multi-Cuisine Restaurant</h4>
        <p>Taste the finest local and international dishes.</p>
      </div>
      <div className="feature-box">
        <i className="fas fa-dumbbell"></i>
        <h4>Fitness Center</h4>
        <p>Stay fit with our state-of-the-art gym facilities.</p>
      </div>
    </div>
  </section>
);

export default Features;