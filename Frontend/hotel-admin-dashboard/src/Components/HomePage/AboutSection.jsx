import React from "react";
import "./HomePage.css";

const AboutSection = () => (
  <section className="about">
    <div className="about-content">
      <h2>About Luxury Hotels</h2>
      <p>
        Our hotels offer world-class amenities, luxurious rooms, and premium service.
        Whether you’re here for business or leisure, we ensure a memorable stay
        with comfort, convenience, and elegance.
      </p>
      <div className="about-highlights">
        <div><i className="fa-solid fa-bed"></i> Premium Rooms</div>
        <div><i className="fa-solid fa-wifi"></i> Free Wi-Fi</div>
        <div><i className="fa-solid fa-mug-hot"></i> Complimentary Breakfast</div>
      </div>
    </div>
  </section>
);

export default AboutSection;
