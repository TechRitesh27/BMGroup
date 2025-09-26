// src/App.jsx
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ManageRooms from "./pages/ManageRooms.jsx";
import ManageRoomTypes from "./pages/ManageRoomTypes.jsx";
import Bookings from "./pages/Booking.jsx";
import CustomerList from "./pages/CustomerList.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/rooms"
          element={
            <AdminLayout>
              <ManageRooms />
            </AdminLayout>
          }
        />
        <Route
          path="/room-types"
          element={
            <AdminLayout>
              <ManageRoomTypes />
            </AdminLayout>
          }
        />
        <Route
          path="/bookings"
          element={
            <AdminLayout>
              <Bookings />
            </AdminLayout>
          }
        />
        <Route
          path="/customers"
          element={
            <AdminLayout>
              <CustomerList />
            </AdminLayout>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
