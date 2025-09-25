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
import "./Charts.css";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const Charts = ({ barData, pieData }) => {
  const isBarReady = barData?.datasets?.length > 0;
  const isPieReady = pieData?.datasets?.[0]?.data?.length > 0;

  return (
    <div className="charts">
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
        <button className="view-btn">View All Bookings</button>
      </div>
    </div>
  );
};

export default Charts;
