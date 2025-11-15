import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManagePackages.css";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
} from "react-icons/fa";

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [viewPackage, setViewPackage] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    startLocation: "",
    endLocation: "",
    description: "",
    price: "",
    durationDays: "",
    routeStops: "",
    itinerary: "",
    highlights: "",
    travelStartDate: "",
    bookingLastDate: "",
    imageUrls: [],
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = () => {
    axios
      .get("/api/travel-packages")
      .then((res) => setPackages(res.data))
      .catch((err) => console.error("Failed to fetch packages:", err));
  };

  const toggleForm = () => {
    setFormOpen(!formOpen);
    if (!formOpen) resetForm();
  };

  const handleEdit = (pkg) => {
    setFormOpen(true);
    setEditingId(pkg.id);
    setFormData({
      ...pkg,
      routeStops: pkg.routeStops?.join(", ") || "",
      itinerary: pkg.itinerary?.join(", ") || "",
      highlights: pkg.highlights?.join(", ") || "",
      imageUrls: pkg.imageUrls || [],
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this package?"))
      return;

    axios
      .delete(`/api/travel-packages/${id}`)
      .then(() => fetchPackages())
      .catch((err) => console.error("Delete failed:", err));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const generateRouteLink = () => {
    const base = "https://www.google.com/maps/dir/";
    const stops = formData.routeStops
      .split(",")
      .map((s) => encodeURIComponent(s.trim()))
      .join("/");

    return `${base}${encodeURIComponent(
      formData.startLocation
    )}/${stops}/${encodeURIComponent(formData.endLocation)}`;
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      price: Number(formData.price),
      durationDays: Number(formData.durationDays),
      routeStops: formData.routeStops.split(",").map((s) => s.trim()),
      itinerary: formData.itinerary.split(",").map((s) => s.trim()),
      highlights: formData.highlights.split(",").map((s) => s.trim()),
      routeLink: generateRouteLink(),
    };

    const apiCall = editingId
      ? axios.put(`/api/travel-packages/${editingId}`, payload)
      : axios.post("/api/travel-packages", payload);

    apiCall.then(() => {
      fetchPackages();
      toggleForm();
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      startLocation: "",
      endLocation: "",
      description: "",
      price: "",
      durationDays: "",
      routeStops: "",
      itinerary: "",
      highlights: "",
      travelStartDate: "",
      bookingLastDate: "",
      imageUrls: [],
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);
    const uploaded = [];

    for (let file of files) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "BM_Group");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/devwys5j1/image/upload",
        data
      );

      uploaded.push(res.data.secure_url);
    }

    setFormData((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ...uploaded],
    }));

    setIsUploading(false);
  };

  return (
    <div className="manage-packages">
      {/* HEADER */}
      <div className="header-row">
        <h2>Manage Travel Packages</h2>

        <button className="add-btn" onClick={toggleForm}>
          <FaPlus /> Add Package
          {formOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {/* FORM */}
      {formOpen && (
        <div className="package-form">
          <div className="form-row">
            <input
              placeholder="Package Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <input
              placeholder="Start Location"
              value={formData.startLocation}
              onChange={(e) =>
                setFormData({ ...formData, startLocation: e.target.value })
              }
            />
            <input
              placeholder="End Location"
              value={formData.endLocation}
              onChange={(e) =>
                setFormData({ ...formData, endLocation: e.target.value })
              }
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Trip Start Date</label>
              <input
                type="date"
                value={formData.travelStartDate}
                onChange={(e) =>
                  setFormData({ ...formData, travelStartDate: e.target.value })
                }
              />
            </div>

            <div className="input-group">
              <label>Booking Last Date</label>
              <input
                type="date"
                value={formData.bookingLastDate}
                onChange={(e) =>
                  setFormData({ ...formData, bookingLastDate: e.target.value })
                }
              />
            </div>
          </div>

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <div className="form-row">
            <input
              placeholder="Price ₹"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />

            <input
              placeholder="Duration (days)"
              type="number"
              value={formData.durationDays}
              onChange={(e) =>
                setFormData({ ...formData, durationDays: e.target.value })
              }
            />
          </div>

          <input
            placeholder="Route Stops (comma separated)"
            value={formData.routeStops}
            onChange={(e) =>
              setFormData({ ...formData, routeStops: e.target.value })
            }
          />

          <textarea
            placeholder="Itinerary (comma separated)"
            value={formData.itinerary}
            onChange={(e) =>
              setFormData({ ...formData, itinerary: e.target.value })
            }
          />

          <input
            placeholder="Highlights (comma separated)"
            value={formData.highlights}
            onChange={(e) =>
              setFormData({ ...formData, highlights: e.target.value })
            }
          />

          {/* IMAGES */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />

          <div className="image-preview">
            {formData.imageUrls.map((url, idx) => (
              <div className="preview-wrapper" key={idx}>
                <img src={url} className="preview-img" />
                <FaTimes
                  className="remove-img"
                  onClick={() => removeImage(idx)}
                />
              </div>
            ))}
          </div>

          <button
            className="save-btn"
            onClick={handleSubmit}
            disabled={isUploading}
          >
            {editingId ? "Save Changes" : "Add Package"}
          </button>
        </div>
      )}

      {/* TABLE */}
      <table className="pkg-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Package</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id}>
              <td>
                <img src={pkg.imageUrls?.[0]} className="thumb" alt="thumb" />
              </td>

              <td>{pkg.title}</td>

              <td>₹{pkg.price}</td>

              <td>{pkg.durationDays} days</td>

              <td>
                <FaEye
                  className="icon view"
                  onClick={() => setViewPackage(pkg)}
                />
                <FaEdit className="icon edit" onClick={() => handleEdit(pkg)} />
                <FaTrash
                  className="icon delete"
                  onClick={() => handleDelete(pkg.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* VIEW MODAL */}
      {viewPackage && (
        <div className="modal-overlay" onClick={() => setViewPackage(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src={viewPackage.imageUrls?.[0]} className="modal-banner" />

            <h2>{viewPackage.title}</h2>
            <p className="route">
              {viewPackage.startLocation} → {viewPackage.endLocation}
            </p>

            <p className="desc">{viewPackage.description}</p>

            <h3>Trip Information</h3>
            <p>
              <strong>Trip Start Date:</strong> {viewPackage.travelStartDate}
            </p>
            <p>
              <strong>Booking Last Date:</strong> {viewPackage.bookingLastDate}
            </p>

            <h3>Highlights</h3>
            <ul>
              {viewPackage.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>

            <h3>Itinerary</h3>
            <ul>
              {viewPackage.itinerary.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>

            <h3>Google Maps Route</h3>
            <a href={viewPackage.routeLink} target="_blank">
              View Route
            </a>

            <h3>Gallery</h3>
            <div className="gallery">
              {viewPackage.imageUrls.map((img, i) => (
                <img key={i} src={img} className="gallery-img" />
              ))}
            </div>

            <button className="close-btn" onClick={() => setViewPackage(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePackages;
