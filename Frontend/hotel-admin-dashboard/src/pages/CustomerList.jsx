import { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomerList.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    axios.get('/api/customers')
      .then(res => setCustomers(res.data))
      .catch(err => console.error('Failed to fetch customers:', err));
  }, []);

  const toggleDetails = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="customer-list">
      <h2>👥 Registered Customers</h2>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <>
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <button className="details-btn" onClick={() => toggleDetails(c.id)}>
                    {expandedId === c.id ? 'Hide Details' : 'View Details'}
                  </button>
                </td>
              </tr>
              {expandedId === c.id && (
                <tr className="details-row">
                  <td colSpan="4">
                    <div className="details-box">
                      <p><strong>ID:</strong> {c.id}</p>
                      <p><strong>Email:</strong> {c.email}</p>
                      <p><strong>Phone:</strong> {c.phone}</p>
                      {/* Add booking count or history here if available */}
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;