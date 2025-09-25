// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ManageRooms from './pages/ManageRooms.jsx';
import ManageRoomTypes from './pages/ManageRoomTypes.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout><Dashboard /></AdminLayout>} />
      <Route path="/rooms" element={<AdminLayout><ManageRooms /></AdminLayout>} />
      <Route path="/room-types" element={<AdminLayout><ManageRoomTypes /></AdminLayout>} />
    </Routes>
  );
}

export default App;