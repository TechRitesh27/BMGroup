import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserDashboard.css";

const MyBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/bookings/customer/${user.id}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Failed to fetch bookings:", err));
  }, [user]);

  return (
    <div className="section">
      <h2 className="section-title">📋 My Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((b) => (
          <div className="booking-card" key={b.id}>
            <div className="booking-header">
              <h3>
                {b.room
                  ? `Room: ${b.room.roomNumber}`
                  : b.travelPackage
                  ? `Travel Package: ${b.travelPackage.title}`
                  : "Booking"}
              </h3>
              <span className={`status-tag ${b.status.toLowerCase()}`}>
                {b.status}
              </span>
            </div>

            <div className="booking-details">
              {b.room && (
                <>
                  <p><strong>Room Type:</strong> {b.room.roomType.name}</p>
                  <p><strong>Price:</strong> ₹{b.room.roomType.price}</p>
                  <p><strong>Capacity:</strong> {b.room.roomType.capacity} persons</p>
                  <p><strong>Facilities:</strong> {b.room.roomType.facilities}</p>
                </>
              )}

              {b.travelPackage && (
                <>
                  <p><strong>Destination:</strong> {b.travelPackage.destination}</p>
                  <p><strong>Duration:</strong> {b.travelPackage.durationDays} days</p>
                  <p><strong>Package Price:</strong> ₹{b.travelPackage.price}</p>
                  <p><strong>Description:</strong> {b.travelPackage.description}</p>
                </>
              )}

              <p><strong>Check-in:</strong> {b.checkInDate}</p>
              <p><strong>Check-out:</strong> {b.checkOutDate}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="no-bookings">No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;