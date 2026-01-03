import React, { useEffect, useState } from "react";
import "./GuestServiceRequest.css";
import axios from "axios";

export default function GuestServiceRequest() {
  // 🔴 Replace these with real values from booking/session later
  const bookingId = 101;
  const roomNumber = "203";

  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    serviceType: "HOUSEKEEPING",
    description: "",
    priority: "MEDIUM",
  });

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      const res = await axios.get(
        `/api/service-requests/booking/${bookingId}`
      );
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to load requests", err);
    }
  };

  const submitRequest = async () => {
    if (!formData.description.trim()) {
      alert("Please enter description");
      return;
    }

    try {
      await axios.post("/api/service-requests", {
        bookingId,
        roomNumber,
        serviceType: formData.serviceType,
        description: formData.description,
        priority: formData.priority,
      });

      setFormData({
        serviceType: "HOUSEKEEPING",
        description: "",
        priority: "MEDIUM",
      });

      fetchMyRequests();
    } catch (err) {
      alert("Failed to submit request");
    }
  };

  return (
    <div className="guest-service-root">
      <h2>Service Requests</h2>
      <p className="subtitle">
        Request hotel services and track their status
      </p>

      {/* CREATE REQUEST */}
      <div className="request-form">
        <h3>New Service Request</h3>

        <div className="form-row">
          <select
            value={formData.serviceType}
            onChange={(e) =>
              setFormData({ ...formData, serviceType: e.target.value })
            }
          >
            <option value="HOUSEKEEPING">Housekeeping</option>
            <option value="FOOD_SERVICE">Food Service</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="TRAVEL_ASSISTANCE">Travel Assistance</option>
          </select>

          <select
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <textarea
          placeholder="Describe your request..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <button onClick={submitRequest}>Submit Request</button>
      </div>

      {/* REQUEST LIST */}
      <div className="request-list">
        <h3>My Requests</h3>

        {requests.length === 0 && (
          <p className="empty-text">No service requests yet</p>
        )}

        {requests.map((req) => (
          <div key={req.id} className="request-card">
            <div className="card-header">
              <span className="service">{req.serviceType}</span>
              <span className={`status ${req.status.toLowerCase()}`}>
                {req.status.replace("_", " ")}
              </span>
            </div>

            <p className="desc">{req.description}</p>

            <div className="card-footer">
              <span className={`priority ${req.priority.toLowerCase()}`}>
                {req.priority}
              </span>
              <span className="time">
                {new Date(req.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
