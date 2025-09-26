// src/components/Charts.jsx
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import "./Charts.css";
import { NavLink } from "react-router-dom";
import BookingTrendsChart from "./BookingTrendsChart";
import RoomRevenueChart from "./RoomRevenueChart";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const exportToPDF = () => {
  const chartArea = document.getElementById("report-section");
  html2canvas(chartArea).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 100);
    pdf.save("booking-report.pdf");
  });
};

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const Charts = ({ barData, pieData }) => {
  const navigate = useNavigate();

  const handleViewBookings = () => {
    navigate("/bookings");
  };

  const isBarReady = barData?.datasets?.length > 0;
  const isPieReady = pieData?.datasets?.[0]?.data?.length > 0;

  return (
    <div className="charts">
      {/* Booking Trends */}
      <div className="chart-section">
        <h3>📊 Booking Trends</h3>
        <div className="chart-container">
          {isBarReady ? (
            <Bar
              data={barData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          ) : (
            <p className="chart-placeholder">Loading bar chart...</p>
          )}
        </div>
      </div>

      {/* Room Status */}
      <div className="chart-section">
        <h3>🏨 Room Status</h3>
        <div className="chart-container">
          {isPieReady ? (
            <Pie
              data={pieData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          ) : (
            <p className="chart-placeholder">No room data available</p>
          )}
        </div>
        <button className="view-btn" onClick={handleViewBookings}>
          View All Bookings
        </button>
        <button onClick={exportToPDF}>📄 Export to PDF</button>
        <div id="report-section">
          <BookingTrendsChart />
          <RoomRevenueChart />
        </div>
      </div>
    </div>
  );
};

export default Charts;
