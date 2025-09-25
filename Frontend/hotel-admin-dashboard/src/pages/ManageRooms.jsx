import { useEffect, useState } from "react";
import axios from "axios";
import RoomForm from "../components/RoomForm.jsx";
import RoomTable from "../components/RoomTable.jsx";
import "./ManageRooms.css";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);

  const fetchRooms = () => {
    axios
      .get("/api/rooms")
      .then((res) => setRooms(res.data))
      .catch((err) => console.error("Failed to fetch rooms:", err));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleAddOrUpdate = (room) => {
    const request = room.id
      ? axios.put(`/api/rooms/${room.id}`, room) // ✅ update
      : axios.post("/api/rooms", room); // ✅ create

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

  return (
    <div className="manage-rooms">
      <h2>Manage Rooms</h2>
      <RoomForm onSubmit={handleAddOrUpdate} editingRoom={editingRoom} />
      <RoomTable rooms={rooms} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ManageRooms;
