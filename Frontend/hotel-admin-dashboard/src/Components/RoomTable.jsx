// src/components/RoomTable.jsx
import './RoomTable.css';

const RoomTable = ({ rooms, onEdit, onDelete }) => {
  const hasRooms = Array.isArray(rooms) && rooms.length > 0;

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
          rooms.map(room => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.roomNumber}</td>
              <td>{room.status}</td>
              <td>{room.roomType?.name || '—'}</td>
              <td>₹{room.roomType?.price ?? '—'}</td>
              <td>{room.roomType?.facilities || '—'}</td>
              <td>{room.roomType?.capacity ?? '—'}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(room)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(room.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="no-data">No rooms found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RoomTable;