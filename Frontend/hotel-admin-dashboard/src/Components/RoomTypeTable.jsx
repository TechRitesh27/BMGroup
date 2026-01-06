// src/components/RoomTypeTable.jsx
import React from 'react';
import './RoomTypeTable.css';

const RoomTypeTable = ({ types, onEdit, onDelete }) => {
  const hasTypes = Array.isArray(types) && types.length > 0;

  return (
    <table className="room-type-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Facilities</th>
          <th>Capacity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {hasTypes ? (
          types.map(type => (
            <tr key={type.id}>
              <td>{type.id}</td>
              <td>{type.name || '—'}</td>
              <td>₹{type.price ?? '—'}</td>
              <td>{type.facilities || '—'}</td>
              <td>{type.capacity ?? '—'}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(type)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(type.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="no-data">No room types found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RoomTypeTable;