import React, { useEffect, useState } from "react";
import "./UserDashboard.css";

const UpcomingTrips = ({ user }) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Simulated trip data
    setTrips([
      { id: 1, destination: "Paris, France", date: "2025-10-02" },
      { id: 2, destination: "Tokyo, Japan", date: "2025-11-15" }
    ]);
  }, []);

  const daysUntil = (dateStr) => {
    const today = new Date();
    const tripDate = new Date(dateStr);
    const diff = Math.ceil((tripDate - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="section">
      <h2 className="section-title">✈️ Upcoming Trips</h2>
      {trips.length > 0 ? (
        trips.map((t) => (
          <div className="trip-card" key={t.id}>
            <h3>{t.destination}</h3>
            <p><strong>Trip Date:</strong> {t.date}</p>
            <p><strong>Countdown:</strong> {daysUntil(t.date)} days away</p>
          </div>
        ))
      ) : (
        <p className="no-bookings">No upcoming trips.</p>
      )}
    </div>
  );
};

export default UpcomingTrips;