import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import StaffDashboard from "./Components/StaffDashboard/StaffDashboard.jsx";
import HomePage from "./Components/HomePage/HomePage.jsx";
import Login from "./Components/Login/Login.jsx";
import StaffManageBookings from "./Components/StaffDashboard/staff/staff_managebookings.jsx";
import StaffServiceRequest from "./Components/StaffDashboard/staff/staffSeviceRequest.jsx";
import StaffInvoiceManagement from "./Components/StaffDashboard/staff/staffInvoiceManagement.jsx";
import AdminServiceRequest from "./pages/AdminServiceRequest.jsx";
import "./App.css";

// Simple auth guard
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AdminLayout><Dashboard /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/rooms" element={<AdminLayout><ManageRooms /></AdminLayout>} />
        <Route path="/room-types" element={<AdminLayout><ManageRoomTypes /></AdminLayout>} />
        <Route path="/packages" element={<AdminLayout><ManagePackages /></AdminLayout>} />
        <Route path="/bookings" element={<AdminLayout><Bookings /></AdminLayout>} />
        <Route path="/bookingcalendar" element={<AdminLayout><BookingCalendar /></AdminLayout>} />
        <Route path="/customers" element={<AdminLayout><CustomerList /></AdminLayout>} />
        <Route path="/admin/service-request" element={<AdminLayout><AdminServiceRequest /></AdminLayout>} />

        {/* User Routes */}
        <Route path="/user-dashboard" element={<UserDashboard />} />

        {/* Staff Routes */}
        <Route path="/staff">
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="bookings" element={<StaffManageBookings />} />
          <Route path="requests" element={<StaffServiceRequest />} />
          <Route path="invoices" element={<StaffInvoiceManagement />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;