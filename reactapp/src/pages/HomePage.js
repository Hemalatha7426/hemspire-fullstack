import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import { getAllPoems } from "../api/poemApi";
import "./Home.css";

export default function HomePage() {
  const [poems, setPoems] = useState([]);
  const [filteredPoems, setFilteredPoems] = useState([]);
  const [search, setSearch] = useState("");
  const [likedPoems, setLikedPoems] = useState(
    JSON.parse(localStorage.getItem("likedPoems")) || {}
  );
  const [popupPoem, setPopupPoem] = useState(null);
  const navigate = useNavigate();

  // Fetch featured poems
  useEffect(() => {
    async function fetchPoems() {
      const data = await getAllPoems();
      const featured = data.slice(0, 4);
      setPoems(featured);
      setFilteredPoems(featured);
    }
    fetchPoems();
  }, []);

  // Real-time search
  useEffect(() => {
    const filtered = poems.filter((p) =>
      p.title.toLowerCase().startsWith(search.toLowerCase())
    );
    setFilteredPoems(filtered);
  }, [search, poems]);

  // Like handler
  const handleLike = (poemId) => {
    const updatedLikes = { ...likedPoems, [poemId]: !likedPoems[poemId] };
    setLikedPoems(updatedLikes);
    localStorage.setItem("likedPoems", JSON.stringify(updatedLikes));
  };

  // Download image
  const handleDownload = async (imagePath, title) => {
    try {
      const response = await fetch(`http://localhost:8080${imagePath}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = title.replace(/\s+/g, "_") + ".png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  // Share image
  const handleShare = async (imagePath, title) => {
    try {
      const response = await fetch(`http://localhost:8080${imagePath}`);
      const blob = await response.blob();
      const file = new File([blob], title.replace(/\s+/g, "_") + ".png", {
        type: "image/png",
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title,
          text: "Check out this beautiful poem!",
        });
      } else {
        alert("Sharing not supported on this browser.");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  // Popup handlers
  const openPopup = (poem) => setPopupPoem(poem);
  const closePopup = () => setPopupPoem(null);

  return (
    <div className="home-container">
      <Carousel />

      {/* Search bar */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search Featured Poems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Section header */}
      <div className="section-header">
        <h2>Featured Poems</h2>
        <button className="btn" onClick={() => navigate("/poems")}>
          View All
        </button>
      </div>

      {/* Poems grid */}
      <div className="poem-grid">
        {filteredPoems.length === 0 && <p>No poems found.</p>}
        {filteredPoems.map((poem) => (
          <div key={poem.id} className="poem-card">
            <img
              src={`http://localhost:8080${poem.imagePath}`}
              alt={poem.title}
              onClick={() => openPopup(poem)}
              onError={(e) => (e.target.src = "/fallback.jpg")}
            />
            <div className="poem-text">
              <h3>{poem.title}</h3>
              <p>{poem.description}</p>
            </div>
            <div className="poem-actions">
              <button
                className={`like-btn ${likedPoems[poem.id] ? "liked" : ""}`}
                onClick={() => handleLike(poem.id)}
              >
                ❤️ {likedPoems[poem.id] ? "Liked" : "Like"}
              </button>
              <button
                className="share-btn"
                onClick={() => handleShare(poem.imagePath, poem.title)}
              >
                🔗 Share
              </button>
              <button
                className="download-btn"
                onClick={() => handleDownload(poem.imagePath, poem.title)}
              >
                ⬇ Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      {popupPoem && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>
              &times;
            </button>
            <img
              src={`http://localhost:8080${popupPoem.imagePath}`}
              alt={popupPoem.title}
            />
            <h3>{popupPoem.title}</h3>
            <p>{popupPoem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
