import React, { useEffect, useMemo, useState } from "react";
import "./staff_managebookings.css";
import StaffSidebar from "../StaffSidebar";

export default function StaffManageBookings() {
  const [bookings, setBookings] = useState([]);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roomFilter, setRoomFilter] = useState("all");

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Booking API error", err));
  }, []);

  /* ---------------- DATE HELPERS ---------------- */
  const today = new Date().toISOString().split("T")[0];

  const checkInsToday = bookings.filter(
    (b) => b.checkInDate === today
  ).length;

  const checkOutsToday = bookings.filter(
    (b) => b.checkOutDate === today
  ).length;

  const occupancyRate =
    bookings.length > 0
      ? Math.round((bookings.filter(b => b.status === "CONFIRMED").length / bookings.length) * 100)
      : 0;

  /* ---------------- FILTERED DATA ---------------- */
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchSearch =
        b.customer?.name?.toLowerCase().includes(search.toLowerCase()) ||
        String(b.id).includes(search) ||
        b.room?.roomNumber?.toString().includes(search);

      const matchStatus =
        statusFilter === "all" || b.status === statusFilter;

      const matchRoom =
        roomFilter === "all" ||
        (roomFilter === "room" && b.room) ||
        (roomFilter === "package" && !b.room);

      return matchSearch && matchStatus && matchRoom;
    });
  }, [bookings, search, statusFilter, roomFilter]);

  return (
    <div className="staff-booking-root">
      <StaffSidebar />
    
    <div className="manage-bookings">
      
      <h2>Manage Bookings</h2>
      <p className="subtitle">View, edit, and manage all hotel bookings</p>

      {/* ================= STATS ================= */}
      <div className="stats-row">
        <div className="stat-card">
          <h4>Total Bookings</h4>
          <span>{bookings.length}</span>
        </div>

        <div className="stat-card">
          <h4>Check-ins Today</h4>
          <span>{checkInsToday}</span>
        </div>

        <div className="stat-card">
          <h4>Check-outs Today</h4>
          <span>{checkOutsToday}</span>
        </div>

        
      </div>

      {/* ================= FILTERS ================= */}
      <div className="filter-card">
        <h3>Search & Filter Bookings</h3>

        <div className="filter-row">
          <input
            type="text"
            placeholder="Search by guest name, booking ID, or room"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
          >
            <option value="all">All Rooms</option>
            <option value="room">Rooms</option>
            <option value="package">Packages</option>
          </select>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="table-card">
        <h3>All Bookings</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Guest</th>
              <th>Room</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((b) => (
                <tr key={b.id}>
                  <td>BK{b.id}</td>
                  <td>{b.customer?.name || "-"}</td>
                  <td>{b.room ? b.room.roomNumber : "Package"}</td>
                  <td>{b.checkInDate}</td>
                  <td>{b.checkOutDate}</td>
                  <td className={`status ${b.status?.toLowerCase()}`}>
                    {b.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  No bookings found
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
