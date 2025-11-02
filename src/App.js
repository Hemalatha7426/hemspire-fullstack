// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ Import Footer
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import PoemsPage from "./pages/PoemsPage";
import AudioPage from "./pages/AudioPage";
import VideoPage from "./pages/VideoPages";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage"; // ✅ Import AboutPage

export default function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {/* ✅ Show Navbar only if logged in */}
      {user && <Navbar />}

      <Routes>
        <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
        <Route path="/poems" element={user ? <PoemsPage /> : <LoginPage />} />
        <Route path="/audio" element={user ? <AudioPage /> : <LoginPage />} />
        <Route path="/video" element={user ? <VideoPage /> : <LoginPage />} />
        <Route path="/contact" element={user ? <ContactPage /> : <LoginPage />} />
        <Route path="/about" element={user ? <AboutPage /> : <LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {/* ✅ Footer is shown on all pages */}
      <Footer />
    </BrowserRouter>
  );
}
