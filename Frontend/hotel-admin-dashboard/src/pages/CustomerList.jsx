import { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerList.css";
import React from "react";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [bookingsMap, setBookingsMap] = useState({});

  useEffect(() => {
    axios
      .get("/api/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error("Failed to fetch customers:", err));
  }, []);

  const toggleDetails = (id) => {
    const newExpandedId = expandedId === id ? null : id;
    setExpandedId(newExpandedId);

    if (newExpandedId !== null && !bookingsMap[id]) {
      axios
        .get(`/api/bookings/customer/${id}`)
        .then((res) => {
          setBookingsMap((prev) => ({ ...prev, [id]: res.data }));
        })
        .catch((err) => console.error("Error fetching bookings:", err));
    }
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
          {customers.map((c) => (
            <React.Fragment key={c.id}>
              <tr>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>
                  <button
                    className="details-btn"
                    onClick={() => toggleDetails(c.id)}
                  >
                    {expandedId === c.id ? "Hide Details" : "View Details"}
                  </button>
                </td>
              </tr>
              {expandedId === c.id && (
                <tr className="details-row">
                  <td colSpan="4">
                    <div className="details-box">
                      <p>
                        <strong>ID:</strong> {c.id}
                      </p>
                      <p>
                        <strong>Email:</strong> {c.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {c.phone}
                      </p>

                      <div className="booking-history">
                        <h4>📋 Booking History</h4>
                        {bookingsMap[c.id]?.length > 0 ? (
                          <ul>
                            {bookingsMap[c.id].map((b) => (
                              <li key={b.id}>
                                {b.room ? (
                                  <>
                                    Room: {b.room.roomNumber}, Status:{" "}
                                    {b.status}, Check-in: {b.checkInDate},
                                    Check-out: {b.checkOutDate}
                                  </>
                                ) : b.travelPackage ? (
                                  <>
                                    Package: {b.travelPackage.title},
                                    Destination: {b.travelPackage.destination},
                                    Status: {b.status}, Start: {b.checkInDate},
                                    End: {b.checkOutDate}
                                  </>
                                ) : (
                                  <>
                                    Booking ID: {b.id} (No room or package info)
                                  </>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No bookings found for this customer.</p>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
