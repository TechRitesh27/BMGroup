// src/pages/BookingCalendar.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./BookingCalendar.css";

const BookingCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    axios
      .get("/api/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Failed to fetch bookings:", err));
  }, []);

  const events = bookings.map((b) => ({
    id: b.id,
    title: b.room
      ? `Room ${b.room.roomNumber} - ${b.customer.name}`
      : `Package - ${b.customer.name}`,
    start: b.checkInDate,
    end: b.checkOutDate,
    backgroundColor:
      b.status === "Booked"
        ? "#e53935"
        : b.status === "Completed"
        ? "#43a047"
        : "#1e88e5",
    borderColor: "transparent",
    extendedProps: {
      status: b.status,
      customer: b.customer,
      room: b.room,
      travelPackage: b.travelPackage,
    },
  }));

  const handleEventClick = (info) => {
    const { customer, room, travelPackage, status } = info.event.extendedProps;
    setSelectedBooking({
      name: customer.name,
      status,
      details: room
        ? `Room ${room.roomNumber} (${room.roomType.name})`
        : `Package: ${travelPackage.title}`,
    });
  };

  return (
    <div className="booking-calendar">
      <h2>📅 Booking Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        height="auto"
      />

      {selectedBooking && (
        <div
          style={{
            marginTop: "1.5rem",
            backgroundColor: "#fff",
            padding: "1rem 1.5rem",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            maxWidth: "450px",
            width: "100%",
            textAlign: "center",
            animation: "fadeIn 0.3s ease-in-out",
          }}
        >
          <h3 style={{ marginBottom: "0.5rem", color: "#1a237e" }}>
            Booking Details
          </h3>
          <p style={{ margin: "0.25rem 0", fontWeight: "600" }}>
            👤 {selectedBooking.name}
          </p>
          <p style={{ margin: "0.25rem 0" }}>
            🏷️ {selectedBooking.details}
          </p>
          <p
            style={{
              margin: "0.25rem 0",
              color:
                selectedBooking.status === "Booked"
                  ? "#e53935"
                  : selectedBooking.status === "Completed"
                  ? "#43a047"
                  : "#1e88e5",
              fontWeight: "600",
            }}
          >
            📌 Status: {selectedBooking.status}
          </p>
          <button
            onClick={() => setSelectedBooking(null)}
            style={{
              marginTop: "0.5rem",
              backgroundColor: "#1976d2",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;
