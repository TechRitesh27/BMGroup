// src/components/DashboardWidgets.jsx
import './DashboardWidgets.css';
import React from 'react';

const DashboardWidgets = ({ stats }) => {
  const {
    totalRooms = 0,
    totalPackages = 0,
    totalBookings = 0,
    revenue = null
  } = stats;

  return (
    <div className="widgets">
      <div className="widget">
        <span className="icon">🏨</span>
        <span className="label">Total Rooms:</span>
        <span className="value">{totalRooms}</span>
      </div>
      <div className="widget">
        <span className="icon">📦</span>
        <span className="label">Total Packages:</span>
        <span className="value">{totalPackages}</span>
      </div>
      <div className="widget">
        <span className="icon">📑</span>
        <span className="label">Total Bookings:</span>
        <span className="value">{totalBookings}</span>
      </div>
      <div className="widget">
        <span className="icon">💰</span>
        <span className="label">Revenue:</span>
        <span className="value">₹{revenue ?? '—'}</span>
      </div>
    </div>
  );
};

export default DashboardWidgets;