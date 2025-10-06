// src/components/RoomTable.jsx
import { useState } from "react";
import "./RoomTable.css";

const RoomTable = ({ rooms, bookings, getRoomStatus, onEdit, onDelete }) => {
  const [expandedRoomId, setExpandedRoomId] = useState(null);
  const hasRooms = Array.isArray(rooms) && rooms.length > 0;

  const toggleRoomDetails = (roomId) => {
    setExpandedRoomId((prev) => (prev === roomId ? null : roomId));
  };

  const getBookingsForRoom = (roomId) =>
    bookings.filter((b) => b.room?.id === roomId);

  return (
    <table className="room-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Room Number</th>
          <th>Status</th>
          <th>Type</th>
          <th>Price</th>
          <th>Facilities</th>
          <th>Capacity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {hasRooms ? (
          rooms.map((room) => (
            <>
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.roomNumber}</td>
                <td>
                  <span
                    className={`status-badge ${getRoomStatus(
                      room.id
                    ).toLowerCase()}`}
                  >
                    {getRoomStatus(room.id)}
                  </span>
                </td>
                <td>{room.roomType?.name || "—"}</td>
                <td>₹{room.roomType?.price ?? "—"}</td>
                <td>{room.roomType?.facilities || "—"}</td>
                <td>{room.roomType?.capacity ?? "—"}</td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit(room)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(room.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="view-btn"
                    onClick={() => toggleRoomDetails(room.id)}
                  >
                    {expandedRoomId === room.id
                      ? "Hide Bookings"
                      : "View Bookings"}
                  </button>
                </td>
              </tr>

              {expandedRoomId === room.id && (
                <tr className="room-bookings-row">
                  <td colSpan="8">
                    <div className="room-bookings-box">
                      <h4>📅 Bookings for Room {room.roomNumber}</h4>
                      {getBookingsForRoom(room.id).length > 0 ? (
                        <ul>
                          {getBookingsForRoom(room.id).map((b) => (
                            <li key={b.id}>
                              <strong>
                                {b.checkInDate} → {b.checkOutDate}
                              </strong>{" "}
                              — {b.status} ({b.customer.name})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No bookings found for this room.</p>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="no-data">
              No rooms found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RoomTable;
