import React from 'react';
import { useEffect, useState } from "react";

import axios from "axios";
import DashboardWidgets from "../Components/DashboardWidgets.jsx";
import Charts from "../Components/Charts.jsx";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";



const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/admin/dashboard")
      .then((res) => {
        const data = res.data;
        setStats(data);

        const totalRooms = data.totalRooms ?? 0;
        const availableRooms = data.availableRooms ?? 0;
        const bookedRooms = Math.max(totalRooms - availableRooms, 0);

        if (totalRooms > 0) {
          setPieData({
            labels: ["Available", "Booked"],
            datasets: [
              {
                data: [availableRooms, bookedRooms],
                backgroundColor: ["#36A2EB", "#FF6384"],
              },
            ],
          });
        } else {
          setPieData(null);
        }

        setBarData({
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            {
              label: "Bookings",
              data: [5, 8, 6, 10, 7],
              backgroundColor: "rgba(75,192,192,0.6)",
            },
          ],
        });

        setError("");
      })
      .catch((err) => {
        console.error("Dashboard fetch failed:", err);
        setError("Unable to load dashboard data. Please try again later.");
      });
  }, []);

  const handleAddRoom = () => {
    navigate("/rooms");
  };

  const handleAddPackage = () => {
    navigate("/packages");
  };

  return (
    <div className="dashboard">
      <div className="main">
        {error && <div className="error-message">{error}</div>}
        <DashboardWidgets stats={stats} />
        <Charts barData={barData} pieData={pieData} />
        <div className="actions">
          <button className="action-btn" onClick={handleAddRoom}>
            Add New Room
          </button>
          <button className="action-btn" onClick={handleAddPackage}>
            Add New Package
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
