import React, { useEffect, useState } from "react";
import "./AdminServiceRequest.css";
// import Sidebar from "../AdminSidebar.jsx";
import axios from "axios";

export default function AdminServiceRequest() {
  const [requests, setRequests] = useState([]);
  const [staffIdInput, setStaffIdInput] = useState("");

  useEffect(() => {
    fetchAllRequests();
  }, []);

  const fetchAllRequests = async () => {
    try {
      const res = await axios.get("/api/service-requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to load service requests", err);
    }
  };

  const assignStaff = async (requestId) => {
    if (!staffIdInput) {
      alert("Please enter Staff ID");
      return;
    }

    try {
      await axios.put(
        `/api/service-requests/${requestId}/assign/${staffIdInput}`
      );
      setStaffIdInput("");
      fetchAllRequests();
    } catch (err) {
      alert("Failed to assign staff");
    }
  };

  return (
    <div className="admin-service-root">
      {/* <Sidebar /> */}

      <div className="admin-service-page">
        <h2>Service Requests (Admin)</h2>
        <p className="subtitle">
          View and assign service requests to staff
        </p>

        {/* STATS */}
        <div className="stats-row">
          <div className="stat-card">
            <h4>Total Requests</h4>
            <span>{requests.length}</span>
          </div>

          <div className="stat-card">
            <h4>Pending</h4>
            <span>
              {requests.filter(r => r.status === "PENDING").length}
            </span>
          </div>

          <div className="stat-card">
            <h4>In Progress</h4>
            <span>
              {requests.filter(r => r.status === "IN_PROGRESS").length}
            </span>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-card">
          <h3>All Service Requests</h3>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Description</th>
                <th>Room</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned Staff</th>
                <th>Requested At</th>
                <th>Assign</th>
              </tr>
            </thead>

            <tbody>
              {requests.map(req => (
                <tr key={req.id}>
                  <td>SR{req.id}</td>

                  <td>{req.serviceType}</td>

                  <td>{req.description}</td>

                  <td>Room {req.roomNumber}</td>

                  <td>
                    <span className={`priority ${req.priority.toLowerCase()}`}>
                      {req.priority}
                    </span>
                  </td>

                  <td>
                    <span className={`status ${req.status.toLowerCase()}`}>
                      {req.status.replace("_", " ")}
                    </span>
                  </td>

                  <td>
                    {req.assignedStaffId ? `Staff-${req.assignedStaffId}` : "-"}
                  </td>

                  <td>
                    {new Date(req.createdAt).toLocaleString()}
                  </td>

                  <td>
                    {req.status === "PENDING" ? (
                      <div style={{ display: "flex", gap: "6px" }}>
                        <input
                          type="number"
                          placeholder="Staff ID"
                          value={staffIdInput}
                          onChange={(e) => setStaffIdInput(e.target.value)}
                          style={{
                            width: "80px",
                            padding: "4px",
                            fontSize: "12px",
                          }}
                        />
                        <button
                          className="action-btn start"
                          onClick={() => assignStaff(req.id)}
                        >
                          Assign
                        </button>
                      </div>
                    ) : (
                      <span className="done-text">—</span>
                    )}
                  </td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    No service requests available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
