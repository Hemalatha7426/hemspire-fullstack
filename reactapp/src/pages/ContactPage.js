// src/pages/ContactPage.js
import React, { useEffect, useState } from "react";
import {
  submitFeedback,
  getAllFeedback,
  deleteFeedback,
} from "../api/contactApi";
import "./ContactPage.css";
import contactImage from "../assets/images/contact-image.png";

export default function ContactPage({ isAdmin = false }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [messageSent, setMessageSent] = useState("");

  useEffect(() => {
    if (isAdmin) fetchFeedbacks();
  }, [isAdmin]);

  const fetchFeedbacks = async () => {
    try {
      const response = await getAllFeedback();
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitFeedback(formData);
      setMessageSent("Feedback submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessageSent("Failed to submit feedback.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFeedback(id);
      fetchFeedbacks();
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Left Side: Form or Feedback List */}
        <div className="contact-left">
          {!isAdmin ? (
            <>
              <h1 className="contact-title">Contact Us</h1>
              <form className="contact-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <button type="submit">Submit</button>
                {messageSent && <p className="feedback-msg">{messageSent}</p>}
              </form>
            </>
          ) : (
            <>
              <h1 className="contact-title">All Feedback Messages</h1>
              <div className="feedback-search">
                <input
                  type="text"
                  placeholder="Search by subject..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="feedback-list">
                {feedbacks.length === 0 && <p>No feedback messages found.</p>}
                {feedbacks.map((fb) => (
                  <div className="feedback-card" key={fb.id}>
                    <h3>{fb.subject}</h3>
                    <p>
                      <strong>Name:</strong> {fb.name} <br />
                      <strong>Email:</strong> {fb.email} <br />
                      <strong>Phone:</strong> {fb.phoneNumber}
                    </p>
                    <p>{fb.message}</p>
                    <button onClick={() => handleDelete(fb.id)}>Delete</button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right Side: Image */}
        <div className="contact-right">
          <img src={contactImage} alt="Contact" />
        </div>
      </div>
    </div>
  );
}
