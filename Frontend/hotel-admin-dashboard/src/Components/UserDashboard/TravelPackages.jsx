import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserDashboard.css";

const TravelPackages = ({ user }) => {
  const [packages, setPackages] = useState([]);
  const [bookedIds, setBookedIds] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/travel-packages")
      .then((res) => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch packages:", err);
        setError("Failed to load packages");
        setLoading(false);
      });
  }, []);

  const handleBook = async (packageId) => {
    try {
      await axios.post(
        `/api/travel-packages/book/${packageId}/customer/${user.id}`
      );
      alert("✅ Package booked successfully!");
      setBookedIds((prev) => [...prev, packageId]);
    } catch (err) {
      console.error("Booking failed:", err);
      alert("❌ Booking failed. Please try again.");
    }
  };

  if (loading) return <p>Loading packages...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="section">
      <h2 className="section-title">🌍 Travel Packages</h2>
      {packages.length > 0 ? (
        packages.map((pkg) => (
          <div className="package-card" key={pkg.id}>
            <h3>{pkg.title}</h3>
            <p><strong>Destination:</strong> {pkg.destination}</p>
            <p><strong>Duration:</strong> {pkg.durationDays} days</p>
            <p><strong>Price:</strong> ₹{pkg.price}</p>
            <p><strong>Description:</strong> {pkg.description}</p>
            <button
              onClick={() => handleBook(pkg.id)}
              className="book-btn"
              disabled={bookedIds.includes(pkg.id)}
            >
              {bookedIds.includes(pkg.id) ? "Booked" : "Book Now"}
            </button>
            <button onClick={() => setSelectedPackage(pkg)}>View Details</button>
          </div>
        ))
      ) : (
        <p className="no-bookings">No packages available.</p>
      )}

      {selectedPackage && (
        <div className="modal">
          <h2>{selectedPackage.title}</h2>
          <p>{selectedPackage.description}</p>
          <p>Price: ₹{selectedPackage.price}</p>
          <button onClick={() => handleBook(selectedPackage.id)}>Book Now</button>
          <button onClick={() => setSelectedPackage(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default TravelPackages;