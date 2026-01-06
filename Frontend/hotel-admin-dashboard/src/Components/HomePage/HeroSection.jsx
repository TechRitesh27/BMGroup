import React from "react";
import "./HomePage.css";

const HeroSection = () => (
  <section className="hero">
    <div className="hero-overlay">
      <div className="hero-content">
        <h2>WELCOME TO</h2>
        <h1>BM GROUP of Hotels</h1>
        <p>Experience comfort and luxury at the best prices</p>
        <a href="#rooms" className="btn-booknow">
          Book Now
        </a>
      </div>
    </div>
  </section>
);

export default HeroSection;