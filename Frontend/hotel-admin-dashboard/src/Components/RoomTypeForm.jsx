// src/components/RoomTypeForm.jsx
import React, { useState, useEffect } from "react";
import "./RoomTypeForm.css";

const RoomTypeForm = ({ onSubmit, editingType }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    facilities: "",
    capacity: "",
  });

  useEffect(() => {
    if (editingType) {
      setForm({
        name: editingType.name || "",
        price: editingType.price?.toString() || "",
        facilities: editingType.facilities || "",
        capacity: editingType.capacity?.toString() || "",
      });
    }
  }, [editingType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: editingType?.id, // 👈 include ID if editing
      name: form.name.trim(),
      price: parseFloat(form.price),
      facilities: form.facilities.trim(),
      capacity: parseInt(form.capacity),
    };

    if (
      !payload.name ||
      isNaN(payload.price) ||
      !payload.facilities ||
      isNaN(payload.capacity)
    ) {
      alert("Please fill all fields correctly.");
      return;
    }

    onSubmit(payload);
    setForm({ name: "", price: "", facilities: "", capacity: "" });
  };

  return (
    <form className="room-type-form" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Type Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
        min="0"
      />
      <input
        name="facilities"
        placeholder="Facilities (comma-separated)"
        value={form.facilities}
        onChange={handleChange}
        required
      />
      <input
        name="capacity"
        type="number"
        placeholder="Capacity"
        value={form.capacity}
        onChange={handleChange}
        required
        min="1"
      />
      <button type="submit">{editingType ? "Update" : "Add"} Room Type</button>
    </form>
  );
};

export default RoomTypeForm;
