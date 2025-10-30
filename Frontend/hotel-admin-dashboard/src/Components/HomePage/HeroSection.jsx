import React from "react";
import "./HomePage.css";

const HeroSection = () => (
  <section className="hero">
    <div className="hero-overlay">
      <div className="hero-content">
        <h2>WELCOME TO</h2>
        <h1>LUXURY HOTELS</h1>
        <p>Experience comfort and luxury at the best prices</p>
        <button className="btn-booknow">Book Now</button>
      </div>
    </div>
  </section>
);

export default HeroSection;
