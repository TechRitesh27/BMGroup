// src/components/RoomForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './RoomForm.css';

const RoomForm = ({ onSubmit, editingRoom }) => {
  const [form, setForm] = useState({
    roomNumber: '',
    status: 'Available',
    roomTypeId: ''
  });

  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    axios.get('/api/room-types')
      .then(res => setRoomTypes(res.data))
      .catch(err => console.error('Failed to fetch room types:', err));
  }, []);

  useEffect(() => {
    if (editingRoom) {
      setForm({
        roomNumber: editingRoom.roomNumber || '',
        status: editingRoom.status || 'Available',
        roomTypeId: editingRoom.roomType?.id?.toString() || ''
      });
    }
  }, [editingRoom]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: editingRoom?.id,
      roomNumber: form.roomNumber,
      status: form.status,
      roomType: {
        id: parseInt(form.roomTypeId)
      }
    };

    onSubmit(payload);
    setForm({ roomNumber: '', status: 'Available', roomTypeId: '' });
  };

  return (
    <form className="room-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="roomNumber"
        placeholder="Room Number"
        value={form.roomNumber}
        onChange={handleChange}
        required
      />

      <select
        name="roomTypeId"
        value={form.roomTypeId}
        onChange={handleChange}
        required
      >
        <option value="">Select Room Type</option>
        {roomTypes.map(type => (
          <option key={type.id} value={type.id}>
            {type.name} — ₹{type.price}
          </option>
        ))}
      </select>

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="Available">Available</option>
        <option value="Booked">Booked</option>
      </select>

      <button type="submit">
        {editingRoom ? 'Update' : 'Add'} Room
      </button>
    </form>
  );
};

export default RoomForm;