import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login.jsx";
const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roomTypeFilter, setRoomTypeFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkIn: "",
    checkOut: "",
  });
const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/rooms")
      .then((res) => {
        setRooms(res.data);
        setFilteredRooms(res.data);
      })
      .catch((err) => console.error("Error fetching rooms:", err));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    });

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });
  }, []);

  // ✅ Combined search + filters
  useEffect(() => {
    let filtered = rooms.filter((room) => {
      const matchesSearch =
        room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.roomType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.status.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        roomTypeFilter === "All" ||
        room.roomType.name === roomTypeFilter;

      const matchesPrice =
        priceFilter === "All" ||
        (priceFilter === "Low" && room.roomType.price < 3000) ||
        (priceFilter === "Mid" &&
          room.roomType.price >= 3000 &&
          room.roomType.price <= 6000) ||
        (priceFilter === "High" && room.roomType.price > 6000);

      return matchesSearch && matchesType && matchesPrice;
    });

    setFilteredRooms(filtered);
  }, [searchTerm, roomTypeFilter, priceFilter, rooms]);

  const openModal = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
    setFormData({ name: "", email: "", checkIn: "", checkOut: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      checkInDate: formData.checkIn,
      checkOutDate: formData.checkOut,
      room: { id: selectedRoom?.id },
      customer: { id: 1 }, // temp guest user
    };

    try {
      await axios.post("/api/bookings", bookingData);
      alert(`Booking confirmed for Room ${selectedRoom.roomNumber}`);
      closeModal();
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Error while booking. Please try again later.");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setRoomTypeFilter("All");
    setPriceFilter("All");
    setFilteredRooms(rooms);
  };

  return (
    <div className="homepage-container">
      {/* ===== Navbar ===== */}
      <nav className="navbar">
        <div className="nav-logo">BM Group of Hotels</div>
        <ul className="nav-links">
          <li><a href="#rooms">Rooms</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
<button className="nav-btn" onClick={() => navigate("/login")}>
  Login
</button>

      </nav>

      {/* ===== Hero Section ===== */}
      <section className="hero-section animate-on-scroll">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Experience Comfort & Luxury</h1>
          <p>Relax and enjoy a premium stay designed for your comfort.</p>
          <button className="hero-btn" onClick={() => openModal({ roomNumber: "Custom" })}>
            Explore Rooms
          </button>
        </div>
      </section>

      {/* ===== Quick Info Bar ===== */}
      <div className="quick-info animate-on-scroll">
        <div><i className="fas fa-map-marker-alt"></i> Shirdi, Maharashtra</div>
        <div><i className="fas fa-phone"></i> +91-7517541081</div>
        <div><i className="fas fa-clock"></i> 24/7 Available</div>
      </div>

      {/* ===== Rooms Section ===== */}
      <section id="rooms" className="room-section animate-on-scroll">
        <h2>Available Rooms</h2>

        {/* ✅ Search + Filters */}
        <div className="filter-bar">
          <div className="room-search">
            <input
              type="text"
              placeholder="Search by room number, type, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search search-icon"></i>
          </div>

          <select
            value={roomTypeFilter}
            onChange={(e) => setRoomTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Delux">Delux</option>
            <option value="Super Delux">Super Delux</option>
            <option value="Suite">Suite</option>
          </select>

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="All">All Prices</option>
            <option value="Low">Below ₹3000</option>
            <option value="Mid">₹3000 - ₹6000</option>
            <option value="High">Above ₹6000</option>
          </select>

          <button className="clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>

        <div className="room-grid">
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <div key={room.id} className="room-card">
                <div className="room-img"></div>
                <div className="room-info">
                  <h3>Room {room.roomNumber}</h3>
                  <p>Type: {room.roomType.name}</p>
                  <p>Capacity: {room.roomType.capacity} Guests</p>
                  <p>Facilities: {room.roomType.facilities}</p>
                  <p className="price">₹{room.roomType.price} / night</p>
                  <button className="book-btn" onClick={() => openModal(room)}>
                    {room.status === "Available" ? "Book Now" : "Unavailable"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-rooms">No matching rooms found.</p>
          )}
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section id="features" className="features-section animate-on-scroll">
        <h2>Our Premium Facilities</h2>
        <div className="features-grid">
          <div className="feature-box">
            <i className="fas fa-wifi"></i>
            <h4>Free Wi-Fi</h4>
            <p>Unlimited high-speed internet for all guests.</p>
          </div>
          <div className="feature-box">
            <i className="fas fa-concierge-bell"></i>
            <h4>24/7 Concierge</h4>
            <p>Always available to make your stay seamless.</p>
          </div>
          <div className="feature-box">
            <i className="fas fa-utensils"></i>
            <h4>Multi-Cuisine Restaurant</h4>
            <p>Taste the finest local and international dishes.</p>
          </div>
          <div className="feature-box">
            <i className="fas fa-dumbbell"></i>
            <h4>Fitness Center</h4>
            <p>Stay fit with our state-of-the-art gym facilities.</p>
          </div>
        </div>
      </section>

      {/* ===== Reviews Section ===== */}
      <section id="reviews" className="review-section animate-on-scroll">
        <h2>What Our Guests Say</h2>
        <div className="review-grid">
          <div className="review-box">
            <p>"The staff was wonderful and the rooms were spotless!"</p>
            <span>– Priya Sharma</span>
          </div>
          <div className="review-box">
            <p>"Perfect stay! Loved the food and pool area."</p>
            <span>– Rahul Verma</span>
          </div>
          <div className="review-box">
            <p>"Excellent service, beautiful rooms, great ambience!"</p>
            <span>– Ayesha Khan</span>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer id="contact" className="footer animate-on-scroll">
        <div className="footer-content">
          <div>
            <h3>HotelEase</h3>
            <p>Luxury redefined. Experience the comfort you deserve.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#rooms">Rooms</a></li>
              <li><a href="#features">Facilities</a></li>
              <li><a href="#reviews">Reviews</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Email: info@hotelease.com</p>
            <p>Phone: +91-9876543210</p>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} HotelEase. All Rights Reserved.
        </div>
      </footer>

      {/* ===== Booking Modal ===== */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Book Room {selectedRoom?.roomNumber}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                required
              />
              <button type="submit">Confirm Booking</button>
              <button type="button" className="close-btn" onClick={closeModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
