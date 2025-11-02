// src/pages/LoginPage.js
import React, { useState } from "react";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/forms.css"; 
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(form);
      login(form.email);
      navigate("/");
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card reveal">
        <h2>Welcome Back 💗</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="btn" type="submit">Login</button>
        </form>
        {msg && <p className="form-message">{msg}</p>}
        <p>
          Don’t have an account?{" "}
          <a href="/register" className="btn-link">Register</a>
        </p>
      </div>
    </div>
  );
}
