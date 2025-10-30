import React from "react";
import StaffSidebar from "./StaffSidebar";
import "./StaffDashboard.css";

const StaffDashboard = () => {
  return (
    <div className="staff-dashboard d-flex">
      <StaffSidebar />

      <div className="staff-content flex-grow-1 p-4">
        <header className="staff-header d-flex justify-content-between align-items-center mb-4">
          <h2>Staff Dashboard</h2>
          <div className="user-info">
            <img
              src="/assets/staff-avatar.png"
              alt="staff"
              className="rounded-circle"
              width="40"
              height="40"
            />
          </div>
        </header>

        <section className="stats-cards d-flex gap-4 mb-4">
          <div className="card shadow-sm p-3 flex-fill text-center">
            <h6>Total Bookings</h6>
            <h4>120</h4>
          </div>
          <div className="card shadow-sm p-3 flex-fill text-center">
            <h6>Active Rooms</h6>
            <h4>45</h4>
          </div>
          <div className="card shadow-sm p-3 flex-fill text-center">
            <h6>Pending Checkouts</h6>
            <h4>12</h4>
          </div>
        </section>

        <section className="table-section">
          <h5 className="mb-3">Recent Bookings</h5>
          <table className="table table-striped table-bordered">
            <thead className="table-light">
              <tr>
                <th>Booking ID</th>
                <th>Guest Name</th>
                <th>Room</th>
                <th>Status</th>
                <th>Check-in</th>
                <th>Check-out</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#B001</td>
                <td>John Doe</td>
                <td>Deluxe Suite</td>
                <td><span className="badge bg-success">Checked-In</span></td>
                <td>2025-10-08</td>
                <td>2025-10-10</td>
              </tr>
              <tr>
                <td>#B002</td>
                <td>Jane Smith</td>
                <td>Standard Room</td>
                <td><span className="badge bg-warning">Pending</span></td>
                <td>2025-10-09</td>
                <td>2025-10-11</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default StaffDashboard;
