import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManagePackages.css";

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    description: "",
    price: "",
    durationDays: "",
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

  const handleEdit = (pkg) => {
    setEditingId(pkg.id);
    setFormData(pkg);
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/travel-packages/${id}`)
      .then(() => fetchPackages())
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleSave = () => {
    axios
      .put(`/api/travel-packages/${editingId}`, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        setEditingId(null);
        setFormData({
          title: "",
          destination: "",
          description: "",
          price: "",
          durationDays: "",
        });
        fetchPackages();
        toast.success("✅ Package updated successfully");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        toast.error("❌ Failed to update package");
      });
  };

  const handleAddNew = () => {
    axios
      .post("/api/travel-packages", formData)
      .then(() => {
        setFormData({
          title: "",
          destination: "",
          description: "",
          price: "",
          durationDays: "",
        });
        fetchPackages();
      })
      .catch((err) => console.error("Create failed:", err));
  };

  return (
    <div className="manage-packages">
      <h2>Manage Travel Packages</h2>

      <div className="package-form">
        <input
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          placeholder="Destination"
          value={formData.destination}
          onChange={(e) =>
            setFormData({ ...formData, destination: e.target.value })
          }
        />
        <input
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <input
          placeholder="Price"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <input
          placeholder="Duration (days)"
          type="number"
          value={formData.durationDays}
          onChange={(e) =>
            setFormData({ ...formData, durationDays: e.target.value })
          }
        />
        {editingId ? (
          <button onClick={handleSave}>Save Changes</button>
        ) : (
          <button onClick={handleAddNew}>Add Package</button>
        )}
      </div>

      <table className="package-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Destination</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id}>
              <td>{pkg.title}</td>
              <td>{pkg.destination}</td>
              <td>₹{pkg.price}</td>
              <td>{pkg.durationDays} days</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(pkg)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(pkg.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePackages;
