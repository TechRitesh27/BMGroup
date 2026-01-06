// src/pages/ManageRoomTypes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import RoomTypeForm from "../components/RoomTypeForm.jsx";
import RoomTypeTable from "../components/RoomTypeTable.jsx";
import "./ManageRoomTypes.css";

const ManageRoomTypes = () => {
  const [types, setTypes] = useState([]);
  const [editingType, setEditingType] = useState(null);
  const [error, setError] = useState("");

  const fetchTypes = () => {
    axios
      .get("/api/room-types")
      .then((res) => setTypes(res.data))
      .catch((err) => {
        console.error("Failed to fetch room types:", err);
        setError("Unable to load room types. Please try again later.");
      });
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleAddOrUpdate = (type) => {
    const request = type.id
      ? axios.put(`/api/room-types/${type.id}`, type)
      : axios.post("/api/room-types", type);

    request
      .then(() => {
        fetchTypes();
        setEditingType(null);
        setError("");
      })
      .catch((err) => {
        console.error("Failed to save room type:", err);
        setError("Failed to save room type. Please check your input.");
      });
  };

  const handleEdit = (type) => {
    setEditingType(type);
    setError("");
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/room-types/${id}`)
      .then(fetchTypes)
      .catch((err) => {
        console.error("Failed to delete room type:", err);
        setError(
          "Failed to delete room type. It may be linked to existing rooms."
        );
      });
  };

  return (
    <div className="manage-room-types">
      <h2>Manage Room Types</h2>
      {error && <div className="error-message">{error}</div>}
      <RoomTypeForm onSubmit={handleAddOrUpdate} editingType={editingType} />
      <RoomTypeTable
        types={types}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ManageRoomTypes;
