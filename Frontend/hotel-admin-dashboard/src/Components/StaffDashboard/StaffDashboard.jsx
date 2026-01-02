import React, { useEffect, useState } from "react";
import StaffSidebar from "./StaffSidebar";
import "./StaffDashboard.css";


export default function StaffDashboard() {
  const [customerCount, setCustomerCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);

  // Fetch Customers API
  const fetchCustomers = async () => {
    try {
      const res = await fetch("/api/customers");
      const data = await res.json();
      setCustomerCount(data.length || 0);
    } catch (error) {
      console.log("Customer API Error:", error);
    }
  };

  // Fetch Bookings API
  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookingCount(data.length || 0);
      setRecentBookings(data.slice(0, 5));
    } catch (error) {
      console.log("Booking API Error:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchBookings();
  }, []);


  return (
    <div className="staff-dashboard-root">
      <StaffSidebar />

      <div className="staff-dashboard-main">
        <div className="sd-header">
          <h2>Staff Dashboard</h2>
          <p>Welcome back, manage hotel operations</p>
        </div>

        <div className="kpi-row">
          <div className="kpi-card">
            <h3>Total Customers</h3>
            <p>{customerCount}</p>
          </div>

          <div className="kpi-card">
            <h3>Total Bookings</h3>
            <p>{bookingCount}</p>
          </div>
        </div>



        <div className="table-card">
          <h3>Recent Bookings</h3>

          <table align="center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Room/Packages</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.length > 0 ? (
                recentBookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.customer.name}</td>
                    <td>{b.room
                        ? b.room.roomNumber
                        : b.travelPackage?.title || "-"}</td>
                    <td>{b.checkInDate}</td>
                    <td>{b.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    No booking data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
