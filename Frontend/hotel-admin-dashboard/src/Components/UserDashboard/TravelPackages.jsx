import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TravelPackages.css";

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
      <h2 className="section-title">🌍 Explore Travel Packages</h2>

      <div className="package-grid">
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <div className="package-card" key={pkg.id}>
              <img
                src={pkg.imageUrls?.[0]}
                alt="Banner"
                className="card-banner"
              />
              <div className="card-content">
                <h3>{pkg.title}</h3>
                <p>
                  <strong>Destination:</strong> {pkg.destination}
                </p>
                {/* <p>
                  <strong>Start Date:</strong> {pkg.travelStartDate}
                </p> */}
                <p>
                  <strong>Booking Ends:</strong> {pkg.bookingLastDate}
                </p>
                <p>
                  <strong>Duration:</strong> {pkg.durationDays} days
                </p>
                <p>
                  <strong>Price:</strong> ₹{pkg.price}
                </p>
                {/* <p className="card-desc">{pkg.description}</p> */}

                <div className="map-preview">
                  <a
                    href={pkg.routeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                      alt="View Route"
                      className="map-icon card-icon"
                    />
                    <span>View in Maps</span>
                  </a>
                </div>

                <div className="card-actions">
                  <button
                    onClick={() => handleBook(pkg.id)}
                    className="book-btn"
                    disabled={bookedIds.includes(pkg.id)}
                  >
                    {bookedIds.includes(pkg.id) ? "Booked" : "Book Now"}
                  </button>
                  <button
                    className="view-btn"
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-bookings">No packages available.</p>
        )}
      </div>

      {selectedPackage && (
        <div className="modal-overlay" onClick={() => setSelectedPackage(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPackage.imageUrls?.[0]}
              className="modal-banner"
              alt="Banner"
            />
            <h2>{selectedPackage.title}</h2>
            <p className="route">
              {selectedPackage.startLocation} → {selectedPackage.endLocation}
            </p>
            <p className="desc">{selectedPackage.description}</p>

            <h3>Trip Info</h3>
            <p>
              <strong>Start Date:</strong> {selectedPackage.travelStartDate}
            </p>
            <p>
              <strong>Booking Deadline:</strong>{" "}
              {selectedPackage.bookingLastDate}
            </p>
            <p>
              <strong>Duration:</strong> {selectedPackage.durationDays} days
            </p>
            <p>
              <strong>Price:</strong> ₹{selectedPackage.price}
            </p>

            <h3>Highlights</h3>
            <ul>
              {selectedPackage.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>

            <h3>Itinerary</h3>
            <ul>
              {selectedPackage.itinerary.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>

            <h3>Route Preview</h3>
            <div className="map-preview">
              <a
                href={selectedPackage.routeLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                  alt="View Route"
                  className="map-icon card-icon"
                />
                <span>View in Maps</span>
              </a>
            </div>

            <h3>Gallery</h3>
            <div className="gallery">
              {selectedPackage.imageUrls.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="gallery-img"
                  alt={`Gallery ${i}`}
                />
              ))}
            </div>

            <button
              className="modal-book-btn"
              onClick={() => handleBook(selectedPackage.id)}
            >
              {bookedIds.includes(selectedPackage.id)
                ? "Already Booked"
                : "Book This Package"}
            </button>
            <button
              className="close-btn"
              onClick={() => setSelectedPackage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelPackages;
