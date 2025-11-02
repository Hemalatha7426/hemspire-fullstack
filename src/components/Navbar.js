// src/components/Navbar.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";
import logo from "../assets/images/logo.png"; // ✅ Import the logo image

export default function Navbar() {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="site-header">
      <div className="logo-title">
        {/* ✅ Added logo image beside the title */}
        <img src={logo} alt="Hemspire Logo" className="logo-img" />
        <h1 className="brand-title">Hemspire🌸</h1>
      </div>

      <button className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <nav className={`nav-links ${open ? "show" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/poems">Poems</Link>
        <Link to="/audio">Audio</Link>
        <Link to="/video">Videos</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <button className="btn-pill" onClick={handleLogout}>
          Logout
        </button>
        <ThemeToggle />
      </nav>
    </header>
  );
}
