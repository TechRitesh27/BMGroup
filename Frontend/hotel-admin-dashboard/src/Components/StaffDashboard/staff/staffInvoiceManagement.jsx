import React from "react";
import StaffSidebar from "../StaffSidebar";
import "./staffInvoiceManagement.css";

export default function StaffInvoiceManagement() {
  return (
    <div className="staff-invoice-root">
      <StaffSidebar />

      <div className="staff-invoice-page">
        {/* HEADER */}
        <div className="invoice-header">
          <h2>Invoice Management</h2>
          <p>Create, manage, and track all hotel invoices and payments</p>
        </div>

        {/* STATS */}
        <div className="invoice-stats">
          <div className="stat-card">
            <h4>Total Invoices</h4>
            <h2>127</h2>
            <span>+12 from last month</span>
          </div>

         

          <div className="stat-card">
            <h4>Pending Invoices</h4>
            <h2>8</h2>
            <span>2 due this week</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="invoice-actions">
          <button className="primary">＋ Create Invoice</button>
          <button className="primary">✈ Send Reminders</button>
          <button className="primary">⬇ Export Invoices</button>
       
        </div>

        {/* TABLE */}
        <div className="invoice-table-card">
          <div className="table-header">
            <div>
              <h3>Invoice Management</h3>
              <p>Manage and track all hotel invoices</p>
            </div>
            <button className="new-invoice-btn">＋ New Invoice</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Booking ID</th>
                <th>Guest Name</th>
                <th>Room No</th>
                <th>Amount</th>
                <th>Total Amount</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>INV-001</td>
                <td>BK001</td>
                <td>John Smith</td>
                <td>101</td>
                <td>₹8,500</td>
                <td><b>₹10,030</b></td>
                <td>2024-09-26</td>
                <td>2024-10-26</td>
                <td><span className="status paid">paid</span></td>
                <td>⋮</td>
              </tr>

              <tr>
                <td>INV-002</td>
                <td>BK002</td>
                <td>Sarah Johnson</td>
                <td>205</td>
                <td>₹12,750</td>
                <td><b>₹15,045</b></td>
                <td>2024-09-27</td>
                <td>2024-10-27</td>
                <td><span className="status pending">pending</span></td>
                <td>⋮</td>
              </tr>

              <tr>
                <td>INV-003</td>
                <td>BK003</td>
                <td>Mike Wilson</td>
                <td>304</td>
                <td>₹5,200</td>
                <td><b>₹6,136</b></td>
                <td>2024-09-25</td>
                <td>2024-10-25</td>
                <td><span className="status overdue">overdue</span></td>
                <td>⋮</td>
              </tr>

              <tr>
                <td>INV-004</td>
                <td>BK004</td>
                <td>Emily Davis</td>
                <td>112</td>
                <td>₹9,300</td>
                <td><b>₹10,974</b></td>
                <td>2024-09-28</td>
                <td>2024-10-28</td>
                <td><span className="status sent">sent</span></td>
                <td>⋮</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
