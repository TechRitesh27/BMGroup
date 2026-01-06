import React from "react";
import "./HomePage.css";

const Reviews = () => (
  <section id="reviews" className="review-section">
    <h2>What Our Guests Say</h2>
    <div className="review-grid">
      <div className="review-box">
        <p>"The staff was wonderful and the rooms were spotless!"</p>
        <span>– Priya Sharma</span>
      </div>
      <div className="review-box">
        <p>"Perfect stay! Loved the food and pool area."</p>
        <span>– Rahul Verma</span>
      </div>
      <div className="review-box">
        <p>"Excellent service, beautiful rooms, great ambience!"</p>
        <span>– Ayesha Khan</span>
      </div>
    </div>
  </section>
);

export default Reviews;