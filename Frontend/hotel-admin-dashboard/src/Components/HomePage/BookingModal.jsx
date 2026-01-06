import React from "react";
import "./HomePage.css";

const BookingModal = ({ selectedRoom, formData, handleChange, handleSubmit, closeModal }) => (
  <div className="modal-overlay" onClick={closeModal}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <h2>Book Room {selectedRoom?.roomNumber}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          required
        />
        <button type="submit">Confirm Booking</button>
        <button type="button" className="close-btn" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </div>
  </div>
);

export default BookingModal;