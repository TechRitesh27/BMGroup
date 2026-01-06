import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RoomRevenueChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/bookings/report/room-revenue')
      .then(res => setData(res.data))
      .catch(err => console.error('Failed to load revenue data:', err));
  }, []);

  const chartData = {
    labels: data.map(d => d.roomType),
    datasets: [{
      label: 'Revenue (₹)',
      data: data.map(d => d.totalRevenue),
      backgroundColor: '#4caf50'
    }]
  };

  return <Bar data={chartData} />;
};

export default RoomRevenueChart;