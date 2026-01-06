// src/pages/BookingsByDate.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
// import "./BookingByDate.css";

const BookingsByDate = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get("/api/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Failed to fetch bookings:", err));
  }, []);

  useEffect(() => {
    if (!selectedDate) {
      setFiltered([]);
      return;
    }

    const target = new Date(selectedDate).toISOString().split("T")[0];

    const matches = bookings.filter((b) =>
      b.checkInDate === target || b.checkOutDate === target
    );

    setFiltered(matches);
  }, [selectedDate, bookings]);

  return (
    <div className="bookings-by-date">
      <h2>📅 Bookings on Selected Date</h2>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p>No bookings found for {selectedDate || "selected date"}.</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Type</th>
              <th>Room/Package</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.customer.name}</td>
                <td>{b.room ? "Room" : "Package"}</td>
                <td>
                  {b.room
                    ? b.room.roomNumber
                    : b.travelPackage?.title || "—"}
                </td>
                <td>{b.checkInDate}</td>
                <td>{b.checkOutDate}</td>
                <td>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingsByDate;