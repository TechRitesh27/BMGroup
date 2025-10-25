import React, { useState } from "react";
import UserSidebar from "./UserSidebar";
import MyBookings from "./MyBookings";
import UpcomingTrips from "./UpcomingTrips";
import TravelPackages from "./TravelPackages";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("bookings");

  const mockUser = {
    id: 2,
    name: "Ritesh",
    email: "ritesh@example.com",
  };

  const renderSection = () => {
    switch (activeSection) {
      case "bookings":
        return <MyBookings user={mockUser} />;
      case "trips":
        return <UpcomingTrips user={mockUser} />;
      case "packages":
        return <TravelPackages user={mockUser} />;
      default:
        return <MyBookings user={mockUser} />;
    }
  };

  return (
    <div className="user-dashboard">
      <UserSidebar
        user={mockUser}
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      <div className="dashboard-content">{renderSection()}</div>
    </div>
  );
};

export default UserDashboard;