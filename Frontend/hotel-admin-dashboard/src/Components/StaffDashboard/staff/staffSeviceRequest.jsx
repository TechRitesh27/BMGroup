import React, { useState } from "react";
import "./staffServiceRequest.css";
import Sidebar from "../StaffSidebar.jsx";

export default function StaffServiceRequest() {
  const [requests] = useState([
    {
      id: 1,
      requestId: "SR001",
      type: "Housekeeping",
      description: "Extra towels required",
      roomNumber: "101",
      customerName: "Uday Badhe",
      priority: "Low",
      status: "Completed",
      assignedTo: "Maria",
      requestTime: "2024-09-26 10:30"
    },
    {
      id: 2,
      requestId: "SR002",
      type: "Maintenance",
      description: "AC not working",
      roomNumber: "205",
      customerName: "Ritesh",
      priority: "High",
      status: "In-Progress",
      assignedTo: "Tech Team",
      requestTime: "2024-09-26 14:20"
    },
    {
      id: 3,
      requestId: "SR003",
      type: "Room Service",
      description: "Dinner order",
      roomNumber: "312",
      customerName: "Uday Badhe",
      priority: "Medium",
      status: "Pending",
      assignedTo: "-",
      requestTime: "2024-09-26 20:45"
    }
  ]);

  return (
   <div className="staff-service-root">
         <Sidebar />
    <div className="service-request-page">
      <h2>Service Requests</h2>
      <p className="subtitle">
        View and manage all customer service requests
      </p>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <h4>Total Requests</h4>
          <span>{requests.length}</span>
        </div>

        <div className="stat-card">
          <h4>Pending</h4>
          <span>
            {requests.filter(r => r.status === "Pending").length}
          </span>
        </div>

        <div className="stat-card">
          <h4>In Progress</h4>
          <span>
            {requests.filter(r => r.status === "In-Progress").length}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        <h3>All Service Requests</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Description</th>
              <th>Room / Guest</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Requested At</th>
            </tr>
          </thead>

          <tbody>
            {requests.map(req => (
              <tr key={req.id}>
                <td>{req.requestId}</td>
                <td>{req.type}</td>
                <td>{req.description}</td>
                <td>
                  Room {req.roomNumber}
                  <br />
                  <small>{req.customerName}</small>
                </td>
                <td>
                  <span
                    className={`priority ${req.priority.toLowerCase()}`}
                  >
                    {req.priority}
                  </span>
                </td>
                <td>
                  <span
                    className={`status ${req.status.toLowerCase()}`}
                  >
                    {req.status}
                  </span>
                </td>
                <td>{req.assignedTo}</td>
                <td>{req.requestTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
    );
}
