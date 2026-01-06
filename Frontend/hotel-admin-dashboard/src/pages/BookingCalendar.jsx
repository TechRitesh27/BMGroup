import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./BookingCalendar.css";

const BookingCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDateBookings, setSelectedDateBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    axios
      .get("/api/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Failed to fetch bookings:", err));
  }, []);

  const handleDateClick = ({ dateStr }) => {
    const clickedDate = new Date(dateStr);
    setSelectedDate(clickedDate.toDateString());

    const filtered = bookings.filter((b) => {
      const checkIn = new Date(b.checkInDate);
      const checkOut = new Date(b.checkOutDate);
      return checkIn <= clickedDate && checkOut > clickedDate;
    });

    setSelectedDateBookings(filtered);
  };

  return (
    <div className="booking-calendar">
      <h2>📅 Booking Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        firstDay={0} // Sunday start (default is Monday)
        locale="en-gb" // or "hi" for Hindi month/day names
        timeZone="Asia/Kolkata"
        dateClick={handleDateClick}
        events={[]}
        height="auto"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        }}
        dayHeaderFormat={{
          weekday: "short", // Sun, Mon, Tue
        }}
        titleFormat={{
          month: "long",
          year: "numeric",
        }}
      />

      {selectedDate && (
        <div className="booking-details-panel">
          <h3>📆 Bookings on {selectedDate}</h3>

          {selectedDateBookings.length > 0 ? (
            <div className="booking-list">
              {selectedDateBookings.map((b) => (
                <div key={b.id} className="booking-card">
                  <div className="booking-header">
                    <span className="customer-name">👤 {b.customer.name}</span>
                    <span className={`status-badge ${b.status.toLowerCase()}`}>
                      {b.status}
                    </span>
                  </div>
                  <div className="booking-body">
                    {b.room ? (
                      <p>
                        🏨 Room {b.room.roomNumber} ({b.room.roomType.name})
                      </p>
                    ) : (
                      <p>🎒 Package: {b.travelPackage.title}</p>
                    )}
                    <p>
                      📅 {b.checkInDate} → {b.checkOutDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No bookings found for this date.</p>
          )}

          <button className="close-btn" onClick={() => setSelectedDate(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
