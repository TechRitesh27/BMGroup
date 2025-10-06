// src/App.jsx
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ManageRooms from "./pages/ManageRooms.jsx";
import ManageRoomTypes from "./pages/ManageRoomTypes.jsx";
import Bookings from "./pages/Booking.jsx";
import BookingsByDate from "./pages/BookingByDate.jsx";
import CustomerList from "./pages/CustomerList.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
import ManagePackages from "./pages/ManagePackages.jsx";
import BookingCalendar from "./pages/BookingCalendar.jsx";

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
          path="/packages"
          element={
            <AdminLayout>
              <ManagePackages />
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
          path="/bookingbydate"
          element={
            <AdminLayout>
              <BookingsByDate />
            </AdminLayout>
          }
        />

        <Route
          path="/bookingcalendar"
          element={
            <AdminLayout>
              <BookingCalendar />
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
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
