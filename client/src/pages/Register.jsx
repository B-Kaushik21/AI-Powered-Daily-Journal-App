import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Register({ onRegister }) {
  const [username, setUsername] = useState(""); // 🆕
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }), // 🆕 include username
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      onRegister(data.token);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
  <div className="centered-page">
    <div className="auth-card">
      <h2>Join Us 🌼</h2>
      <p className="subtitle">Start your mindful journaling today</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">Register</button>
      </form>
      <p className="switch-text">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  </div>
);

}
