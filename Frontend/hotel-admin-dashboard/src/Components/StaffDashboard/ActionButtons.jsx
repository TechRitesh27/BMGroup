import React from "react";
import "./StaffDashboard.css";

export default function ActionButtons(){
  return (
    <div className="actions-row">
      <button className="action-btn primary"><span className="plus">+</span>Add New Room</button>
      <button className="action-btn"><span className="plus">+</span>Add New Package</button>
      <button className="action-btn">👁️ View All Bookings</button>
      <button className="action-btn">🧾 Create Invoice</button>
    </div>
  );
}
