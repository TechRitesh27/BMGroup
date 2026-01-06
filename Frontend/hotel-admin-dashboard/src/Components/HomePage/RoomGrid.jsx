import React from "react";
import "./HomePage.css";

const RoomGrid = ({
  filteredRooms,
  searchTerm,
  setSearchTerm,
  roomTypeFilter,
  setRoomTypeFilter,
  priceFilter,
  setPriceFilter,
  clearFilters,
  openModal,
}) => (
  <section id="rooms" className="room-section">
    <h2>Available Rooms</h2>

    {/* Filter Bar */}
    <div className="filter-bar">
      <div className="room-search">
        <input
          type="text"
          placeholder="Search by room number, type, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fas fa-search search-icon"></i>
      </div>

      <select value={roomTypeFilter} onChange={(e) => setRoomTypeFilter(e.target.value)}>
        <option value="All">All Types</option>
        <option value="Delux">Delux</option>
        <option value="Super Delux">Super Delux</option>
        <option value="Suite">Suite</option>
      </select>

      <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
        <option value="All">All Prices</option>
        <option value="Low">Below ₹3000</option>
        <option value="Mid">₹3000 - ₹6000</option>
        <option value="High">Above ₹6000</option>
      </select>

      <button className="clear-btn" onClick={clearFilters}>Clear Filters</button>
    </div>

    {/* Room Cards */}
    <div className="room-grid">
      {Array.isArray(filteredRooms) && filteredRooms.length > 0 ? (
        filteredRooms.map((room) => (
          <div key={room.id} className="room-card">
            <div className="room-img"></div>
            <div className="room-info">
              <h3>Room {room?.roomNumber}</h3>
              <p>Type: {room?.roomType?.name}</p>
              <p>Capacity: {room?.roomType?.capacity} Guests</p>
              <p>Facilities: {room?.roomType?.facilities}</p>
              <p className="price">₹{room?.roomType?.price} / night</p>
              <button
                className="book-btn"
                onClick={() => openModal(room)}
                disabled={room?.status !== "Available"}
              >
                {room?.status === "Available" ? "Book Now" : "Unavailable"}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-rooms">No matching rooms found.</p>
      )}
    </div>
  </section>
);

export default RoomGrid;