import React, { useState, useEffect } from "react";
import UserSidebar from "./UserSidebar";
import MyBookings from "./MyBookings";
import UpcomingTrips from "./UpcomingTrips";
import TravelPackages from "./TravelPackages";
import GuestServiceRequest from "./GuestServiceRequest";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("bookings");
  const [loggedUser, setLoggedUser] = useState(null);

  // Load session user dynamically
  useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem("session"));
    if (session && session.user) {
      setLoggedUser(session.user);
    } else {
      window.location.href = "/login"; // if no session
    }
  }, []);

  if (!loggedUser) return null;

  const renderSection = () => {
    switch (activeSection) {
      case "bookings":
        return <MyBookings user={loggedUser} />;
      case "trips":
        return <UpcomingTrips user={loggedUser} />;
      case "packages":
        return <TravelPackages user={loggedUser} />;
      case "service":
        return <GuestServiceRequest user={loggedUser} />;
      default:
        return <MyBookings user={loggedUser} />;
    }
  };

  return (
    <div className="user-dashboard">
      <UserSidebar
        user={loggedUser}
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />

      {/* Greeting added dynamically */}
      <div className="dashboard-content">
        <h2 style={{ marginBottom: "15px", color: "#003366" }}>
          Hi, {loggedUser.name}
        </h2>

        {renderSection()}
      </div>
    </div>
  );
};

export default UserDashboard;
