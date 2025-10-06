// src/pages/ManageRooms.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import RoomForm from "../components/RoomForm.jsx";
import RoomTable from "../components/RoomTable.jsx";
import "./ManageRooms.css";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);

  // Searchbar and filters
  const [searchDate, setSearchDate] = useState("");

  const fetchRooms = () => {
    axios
      .get("/api/rooms")
      .then((res) => setRooms(res.data))
      .catch((err) => console.error("Failed to fetch rooms:", err));
  };

  const fetchBookings = () => {
    axios
      .get("/api/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Failed to fetch bookings:", err));
  };

  useEffect(() => {
    fetchRooms();
    fetchBookings();
  }, []);

  const handleAddOrUpdate = (room) => {
    const request = room.id
      ? axios.put(`/api/rooms/${room.id}`, room)
      : axios.post("/api/rooms", room);

    request
      .then(() => {
        fetchRooms();
        setEditingRoom(null);
      })
      .catch((err) => console.error("Failed to save room:", err));
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/rooms/${id}`)
      .then(fetchRooms)
      .catch((err) => console.error("Failed to delete room:", err));
  };

  const isRoomAvailableOnDate = (roomId) => {
    if (!searchDate) return true;

    const targetDate = new Date(searchDate);

    const conflicts = bookings
      .filter((b) => b.room?.id === roomId)
      .some((b) => {
        const checkIn = new Date(b.checkInDate);
        const checkOut = new Date(b.checkOutDate);
        return checkIn <= targetDate && checkOut > targetDate;
      });

    return !conflicts;
  };

  const filteredRooms = rooms.filter((room) => isRoomAvailableOnDate(room.id));

  const getRoomStatus = (roomId) => {
    const today = new Date();

    const activeBooking = bookings.find(
      (b) =>
        b.room?.id === roomId &&
        new Date(b.checkInDate) <= today &&
        new Date(b.checkOutDate) > today
    );

    if (activeBooking) return "Occupied";

    const futureBooking = bookings.find(
      (b) => b.room?.id === roomId && new Date(b.checkInDate) > today
    );

    if (futureBooking) return "Reserved";

    return "Available";
  };

  return (
    <div className="manage-rooms">
      <h2>Manage Rooms</h2>
      <RoomForm onSubmit={handleAddOrUpdate} editingRoom={editingRoom} />

      <div className="room-search-bar">
        <label>Search Available Rooms:</label>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </div>
      <RoomTable
        rooms={filteredRooms}
        bookings={bookings}
        getRoomStatus={getRoomStatus}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ManageRooms;
