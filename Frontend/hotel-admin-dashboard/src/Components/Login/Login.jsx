import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // -------------------------
  // SESSION CREATION FUNCTION
  // -------------------------
  const createSession = (data) => {
    const session = {
      ...data,
      token: crypto.randomUUID(), // random session token
      expiresAt: Date.now() + 2 * 60 * 60 * 1000, // expires in 2 hours
    };

    sessionStorage.setItem("session", JSON.stringify(session));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (role === "customer") {
        const response = await axios.get(`/api/customers`);

        const user = response.data.find(
          (c) => c.email === email && c.password === password
        );

        if (!user) {
          setError("Invalid email or password");
          return;
        }

        createSession({
          role: "customer",
          user: { id: user.id, name: user.name, email: user.email },
        });

        window.location.href = "/user-dashboard";
      }

      if (role === "admin") {
        if (email === "admin@hotel.com" && password === "admin123") {
          createSession({
            role: "admin",
            user: { name: "Admin" },
          });

          window.location.href = "/Dashboard";
        } else {
          setError("Invalid admin credentials");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        
        <h2 className="login-title">Hotel Automation Login</h2>

        <div className="role-select">
          <label>Select Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="login-btn">Login</button>

      </form>
    </div>
  );
};

export default Login;
