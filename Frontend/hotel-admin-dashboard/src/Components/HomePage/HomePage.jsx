import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Hero from "./HeroSection";
import QuickInfo from "./QuickInfo";
import RoomGrid from "./RoomGrid";
import Features from "./Features";
import Reviews from "./Reviews";
import Footer from "./Footer";
import BookingModal from "./BookingModal";
import { toast } from "react-toastify";

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

  // Fetch rooms
  useEffect(() => {
    axios
      .get("/api/rooms")
      .then((res) => {
        const roomList = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];
        setRooms(roomList);
        setFilteredRooms(roomList);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
        toast.error("Failed to load rooms.");
        setRooms([]);
        setFilteredRooms([]);
      });
  }, []);

  // Filters
  useEffect(() => {
    const filtered = rooms.filter((room) => {
      const roomNumber = room?.roomNumber?.toString().toLowerCase() || "";
      const roomTypeName = room?.roomType?.name?.toLowerCase() || "";
      const status = room?.status?.toLowerCase() || "";
      const price = room?.roomType?.price || 0;

      const matchesSearch =
        roomNumber.includes(searchTerm.toLowerCase()) ||
        roomTypeName.includes(searchTerm.toLowerCase()) ||
        status.includes(searchTerm.toLowerCase());

      const matchesType =
        roomTypeFilter === "All" || room?.roomType?.name === roomTypeFilter;

      const matchesPrice =
        priceFilter === "All" ||
        (priceFilter === "Low" && price < 3000) ||
        (priceFilter === "Mid" && price >= 3000 && price <= 6000) ||
        (priceFilter === "High" && price > 6000);

      return matchesSearch && matchesType && matchesPrice;
    });

    setFilteredRooms(filtered);
  }, [searchTerm, roomTypeFilter, priceFilter, rooms]);

  // Modal
  const openModal = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
    setFormData({ name: "", email: "", checkIn: "", checkOut: "" });
  };

  // Booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRoom?.id) return;

    const bookingData = {
      checkInDate: formData.checkIn,
      checkOutDate: formData.checkOut,
      room: { id: selectedRoom.id },
      customer: { id: 1 }, // TODO: replace with logged-in user
    };

    try {
      await axios.post("/api/bookings", bookingData);
      toast.success(`Booking confirmed for Room ${selectedRoom.roomNumber}`);
      closeModal();
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error("Error while booking. Please try again later.");
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
      <Navbar navigate={navigate} />
      <Hero openModal={openModal} />
      <QuickInfo />
      <RoomGrid
        filteredRooms={filteredRooms}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        roomTypeFilter={roomTypeFilter}
        setRoomTypeFilter={setRoomTypeFilter}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        clearFilters={clearFilters}
        openModal={openModal}
      />
      <Features />
      <Reviews />
      <Footer />
      {showModal && (
        <BookingModal
          selectedRoom={selectedRoom}
          formData={formData}
          handleChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default HomePage;