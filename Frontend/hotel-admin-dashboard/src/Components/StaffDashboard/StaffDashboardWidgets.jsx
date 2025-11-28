import React from "react";
import "./StaffDashboard.css"; // re-use kpi styles

export default function DashboardWidgets() {
  return (
    <div className="widgets-row">
      <div className="kpi-card">
        <h4>Total Rooms</h4>
        <div className="big">25</div>
        <div className="kpi-small">+2 from last month</div>
      </div>

      <div className="kpi-card">
        <h4>Total Bookings</h4>
        <div className="big">95</div>
        <div className="kpi-small">+12% from last month</div>
      </div>

      <div className="kpi-card">
        <h4>Pending Requests</h4>
        <div className="big">14</div>
        <div className="kpi-small">3 urgent</div>
      </div>

      <div className="kpi-card">
        <h4>Revenue</h4>
        <div className="big">₹1,24,500</div>
        <div className="kpi-small">+8% from last month</div>
      </div>
    </div>
  );
}
