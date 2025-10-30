import React from "react";
import "./HomePage.css";

const Testimonials = () => (
  <section className="testimonials">
    <h2>What Our Guests Say</h2>
    <div className="testimonial-grid">
      <div className="testimonial-card">
        <p>“Amazing stay! Rooms were clean and staff was super friendly.”</p>
        <h4>— Priya Sharma</h4>
      </div>
      <div className="testimonial-card">
        <p>“Perfect for a weekend getaway. The food and service were top-notch.”</p>
        <h4>— Arjun Mehta</h4>
      </div>
      <div className="testimonial-card">
        <p>“Loved the pool and the ambience. Definitely visiting again!”</p>
        <h4>— Neha Patel</h4>
      </div>
    </div>
  </section>
);

export default Testimonials;

