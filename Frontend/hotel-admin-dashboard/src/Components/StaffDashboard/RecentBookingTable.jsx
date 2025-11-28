import React from "react";
import "./StaffDashboard.css";

const RecentBookingsTable = ({ bookings = [] }) => {
  return (
    <div className="bookings-table-wrap">
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Guest Name</th>
            <th>Room No</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((r) => (
            <tr key={r.id ?? r.bookingId ?? Math.random()}>
              <td className="mono">{r.id ?? r.bookingId ?? "-"}</td>
              <td>{r.guestName ?? r.customerName ?? r.name ?? "-"}</td>
              <td>{r.roomNo ?? r.roomNumber ?? r.room ?? "-"}</td>
              <td>{r.checkIn ?? r.check_in ?? r.startDate ?? "-"}</td>
              <td>{r.checkOut ?? r.check_out ?? r.endDate ?? "-"}</td>
              <td>
                <span
                  className={`badge ${
                    (r.status ?? "").toString().toLowerCase().includes("pending")
                      ? "pending"
                      : (r.status ?? "").toString().toLowerCase().includes("confirm")
                      ? "confirmed"
                      : "checked"
                  }`}
                >
                  {r.status ?? "unknown"}
                </span>
              </td>
              <td>{r.amount ?? r.price ?? r.total ?? "-"}</td>
              <td className="actions-col">⋯</td>
            </tr>
          ))}
          {bookings.length === 0 && (
            <tr>
              <td colSpan={8} style={{ textAlign: "center", padding: 18 }}>
                No recent bookings
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentBookingsTable;
