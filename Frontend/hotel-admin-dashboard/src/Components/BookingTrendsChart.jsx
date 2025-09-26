import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { useEffect, useState } from 'react';

const BookingTrendsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/bookings/report/monthly-bookings')
      .then(res => setData(res.data))
      .catch(err => console.error('Failed to load chart data:', err));
  }, []);

  const chartData = {
    labels: data.map(d => d.month),
    datasets: [{
      label: 'Bookings',
      data: data.map(d => d.count),
      backgroundColor: '#2196f3'
    }]
  };

  return <Bar data={chartData} />;
};

export default BookingTrendsChart;