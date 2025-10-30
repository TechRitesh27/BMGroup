import React from "react";
import "./HomePage.css";

const RoomCard = ({ room }) => (
  <div className="room-card">
    <img
      src={
        room.roomType.name.toLowerCase().includes("delux")
          ? "/images/deluxe.jpg"
          : "/images/default-room.jpg"
      }
      alt={room.roomType.name}
      className="room-img"
    />
    <div className="room-info">
      <h3>{room.roomType.name} Room</h3>
      <p className="price">₹{room.roomType.price}/day</p>
      <p>Capacity: {room.roomType.capacity} Guests</p>
      <p>Facilities: {room.roomType.facilities}</p>
      <p>Status: {room.status}</p>
      <div className="room-buttons">
        <button className="book-btn">[Book Now]</button>
        <button className="details-btn">[View Details]</button>
      </div>
    </div>
  </div>
);

export default RoomCard;
