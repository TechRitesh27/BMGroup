import { useEffect, useState } from "react";
import axios from "axios";
import "./Booking.css";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBell } from "react-icons/fa";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoomMap, setSelectedRoomMap] = useState({});
  const [searchName, setSearchName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [alerts, setAlerts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const pushAlert = (message) => {
    setAlerts((prev) => [message, ...prev.slice(0, 4)]);
    toast.info(message);
  };

  const toggleDetails = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleStatusChange = (id, newStatus) => {
    axios
      .put(`/api/bookings/${id}/status`, newStatus, {
        headers: { "Content-Type": "text/plain" },
      })
      .then(() => {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
        pushAlert(`✅ Booking #${id} marked as ${newStatus}`);
      })
      .catch((err) => {
        console.error("Status update failed:", err);
        toast.error("❌ Failed to update status");
      });
  };

  const assignRoom = (bookingId, roomId) => {
    axios
      .put(`/api/bookings/${bookingId}/assign-room/${roomId}`)
      .then(() => {
        axios
          .get("/api/bookings")
          .then((res) => {
            setBookings(res.data);
            pushAlert(`🛏️ Room assigned to booking #${bookingId}`);
          })
          .catch((err) => {
            console.error("Failed to refresh bookings:", err);
            toast.error("❌ Failed to refresh bookings");
          });
      })
      .catch((err) => {
        console.error("Room assignment failed:", err);
        toast.error("❌ Failed to assign room");
      });
  };

  useEffect(() => {
    axios
      .get("/api/bookings")
      .then((res) => {
        setBookings(res.data);
        pushAlert(`📥 ${res.data.length} bookings loaded`);
      })
      .catch((err) => {
        console.error("Failed to fetch bookings:", err);
        setError("Unable to load bookings. Please try again later.");
        toast.error("❌ Failed to load bookings");
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/rooms/available")
      .then((res) => setAvailableRooms(res.data))
      .catch((err) => console.error("Failed to fetch rooms:", err));
  }, []);

  const filteredBookings = bookings.filter(
    (b) =>
      b.customer.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (filterStatus === "" || b.status === filterStatus)
  );

  const roomBookings = filteredBookings.filter((b) => b.room);
  const packageBookings = filteredBookings.filter((b) => b.travelPackage);

  return (
    <div className="bookings-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bookings-header">
        <h2>📖 All Bookings</h2>
        <div
          className="notification-bell"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <FaBell />
          {alerts.length > 0 && <span className="badge">{alerts.length}</span>}
          {showDropdown && (
            <div className="notification-dropdown">
              {alerts.map((alert, i) => (
                <div key={i} className="alert-item">
                  {alert}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="booking-filters">
        <input
          type="text"
          placeholder="Search by customer name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Booked">Booked</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* 🏨 Room Bookings */}
      <h3>🏨 Room Bookings</h3>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Room</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roomBookings.map((booking) => (
            <React.Fragment key={booking.id}>
              <tr>
                <td>{booking.id}</td>
                <td>{booking.customer.name}</td>
                <td>{booking.room.roomNumber}</td>
                <td>{booking.checkInDate}</td>
                <td>{booking.checkOutDate}</td>
                <td>
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      handleStatusChange(booking.id, e.target.value)
                    }
                  >
                    <option value="Booked">Booked</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => toggleDetails(booking.id)}>
                    {expandedId === booking.id
                      ? "Hide Details"
                      : "View Details"}
                  </button>
                </td>
              </tr>

              {expandedId === booking.id && (
                <tr className="details-row">
                  <td colSpan="7">
                    <div className="details-box">
                      <h4>👤 Customer Info</h4>
                      <p>
                        <strong>Name:</strong> {booking.customer.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {booking.customer.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {booking.customer.phone}
                      </p>

                      <h4>🏨 Room Info</h4>
                      <p>
                        <strong>Room Number:</strong> {booking.room.roomNumber}
                      </p>
                      <p>
                        <strong>Type:</strong> {booking.room.roomType.name}
                      </p>
                      <p>
                        <strong>Facilities:</strong>{" "}
                        {booking.room.roomType.facilities}
                      </p>
                      <p>
                        <strong>Price:</strong> ₹{booking.room.roomType.price}
                      </p>
                      <p>
                        <strong>Capacity:</strong>{" "}
                        {booking.room.roomType.capacity}
                      </p>

                      <h4>🛏️ Assign Room</h4>
                      <select
                        value={selectedRoomMap[booking.id] || ""}
                        onChange={(e) =>
                          setSelectedRoomMap((prev) => ({
                            ...prev,
                            [booking.id]: e.target.value,
                          }))
                        }
                      >
                        <option value="">-- Select Room --</option>
                        {availableRooms.map((room) => (
                          <option key={room.id} value={room.id}>
                            {room.roomNumber} ({room.roomType.name})
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() =>
                          assignRoom(booking.id, selectedRoomMap[booking.id])
                        }
                        disabled={!selectedRoomMap[booking.id]}
                      >
                        Assign Room
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* 🌍 Travel Package Bookings */}
      <h3>🌍 Travel Package Bookings</h3>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Package</th>
            <th>Destination</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packageBookings.map((booking) => (
            <React.Fragment key={booking.id}>
              <tr>
                <td>{booking.id}</td>
                <td>{booking.customer.name}</td>
                <td>{booking.travelPackage.title}</td>
                <td>{booking.travelPackage.destination}</td>
                <td>{booking.travelPackage.durationDays} days</td>
                <td>
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      handleStatusChange(booking.id, e.target.value)
                    }
                  >
                    <option value="Booked">Booked</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => toggleDetails(booking.id)}>
                    {expandedId === booking.id
                      ? "Hide Details"
                      : "View Details"}
                  </button>
                </td>
              </tr>

              {expandedId === booking.id && (
                <tr className="details-row">
                  <td colSpan="7">
                    <div className="details-box">
                      <h4>👤 Customer Info</h4>
                      <p>
                        <strong>Name:</strong> {booking.customer.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {booking.customer.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {booking.customer.phone}
                      </p>

                      <h4>🌍 Package Info</h4>
                      <p>
                        <strong>Title:</strong> {booking.travelPackage.title}
                      </p>
                      <p>
                        <strong>Destination:</strong>{" "}
                        {booking.travelPackage.destination}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {booking.travelPackage.description}
                      </p>
                      <p>
                        <strong>Price:</strong> ₹{booking.travelPackage.price}
                      </p>
                      <p>
                        <strong>Duration:</strong>{" "}
                        {booking.travelPackage.durationDays} days
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
