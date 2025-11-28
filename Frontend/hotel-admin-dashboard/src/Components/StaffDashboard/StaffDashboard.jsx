import React, { useEffect, useState } from "react";
import StaffSidebar from "./StaffSidebar";
import "./StaffDashboard.css";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

export default function StaffDashboard() {
  const [customerCount, setCustomerCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);

  // Fetch Customers API
  const fetchCustomers = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/customers");
      const data = await res.json();
      setCustomerCount(data.length || 0);
    } catch (error) {
      console.log("Customer API Error:", error);
    }
  };

  // Fetch Bookings API
  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/bookings");
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

  // Bar Chart
  const occupancyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Occupancy (%)",
        data: [60, 72, 68, 80, 75],
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      }
    ]
  };

  // Pie Chart
  const pieData = {
    labels: ["Housekeeping", "Room Service", "Maintenance"],
    datasets: [
      {
        data: [35, 45, 20],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)"
        ]
      }
    ]
  };

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

        <div className="charts-row">
          <div className="chart-card">
            <h3>Occupancy Trends</h3>
            <Bar data={occupancyData} />
          </div>

          <div className="chart-card">
            <h3>Service Requests</h3>
            <Pie data={pieData} />
          </div>
        </div>

        <div className="table-card">
          <h3>Recent Bookings</h3>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Room</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.length > 0 ? (
                recentBookings.map((b) => (
                  <tr key={b.bookingId}>
                    <td>{b.bookingId}</td>
                    <td>{b.customerName}</td>
                    <td>{b.roomNumber}</td>
                    <td>{b.bookingDate}</td>
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
