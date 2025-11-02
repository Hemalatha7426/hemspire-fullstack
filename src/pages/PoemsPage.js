import React, { useEffect, useState } from "react";
import { getAllPoems } from "../api/poemApi";
import "./PoemsPage.css";

export default function PoemsPage() {
  const [poems, setPoems] = useState([]);
  const [filteredPoems, setFilteredPoems] = useState([]);
  const [search, setSearch] = useState("");
  const [likedPoems, setLikedPoems] = useState(
    JSON.parse(localStorage.getItem("likedPoems")) || {}
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [poemsPerPage] = useState(8); // 8 poems per page
  const [sortBy, setSortBy] = useState("title-asc");

  // Popup state
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");

  // Fetch all poems
  useEffect(() => {
    async function fetchPoems() {
      const data = await getAllPoems();
      setPoems(data);
      setFilteredPoems(data);
    }
    fetchPoems();
  }, []);

  // Search handler: filter start-with search
  useEffect(() => {
    const filtered = poems.filter((p) =>
      p.title.toLowerCase().startsWith(search.toLowerCase())
    );
    setFilteredPoems(filtered);
    setCurrentPage(1); // reset page on search
  }, [search, poems]);

  // Sorting handler
  const handleSort = (e) => {
    const sortField = e.target.value;
    setSortBy(sortField);

    let sorted = [...filteredPoems];
    if (sortField === "title-asc") sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (sortField === "title-desc") sorted.sort((a, b) => b.title.localeCompare(a.title));
    if (sortField === "date") sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredPoems(sorted);
  };

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
      const file = new File([blob], title.replace(/\s+/g, "_") + ".png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title, text: "Check out this poem!" });
      } else {
        alert("Sharing not supported on this browser.");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  // Pagination
  const indexOfLastPoem = currentPage * poemsPerPage;
  const indexOfFirstPoem = indexOfLastPoem - poemsPerPage;
  const currentPoems = filteredPoems.slice(indexOfFirstPoem, indexOfLastPoem);
  const totalPages = Math.ceil(filteredPoems.length / poemsPerPage);

  // Open popup
  const openPopup = (image, title) => {
    setPopupImage(`http://localhost:8080${image}`);
    setPopupTitle(title);
    setPopupOpen(true);
  };

  // Close popup
  const closePopup = () => setPopupOpen(false);

  return (
    <div className="home-container">
       <div className="section-header">
        <h1>Poems Gallery</h1>
        </div>
      <div className="search-section">
  <div className="search-left">
    <input
      type="text"
      placeholder="Search Poems..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
  <div className="sort-right">
    <select className="sort-select" value={sortBy} onChange={handleSort}>
      <option value="title-asc">Title: A → Z</option>
      <option value="title-desc">Title: Z → A</option>
      <option value="date">Latest</option>
    </select>
  </div>
</div>

      {/* Poems Grid */}
      <div className="poem-grid">
        {currentPoems.length === 0 && <p>No poems found.</p>}
        {currentPoems.map((poem) => (
          <div key={poem.id} className="poem-card">
            <img
              src={`http://localhost:8080${poem.imagePath}`}
              alt={poem.title}
              onClick={() => openPopup(poem.imagePath, poem.title)}
              onError={(e) => (e.target.src = "/fallback.jpg")}
              style={{ cursor: "pointer" }}
            />
            <div className="poem-text">
              <h3>{poem.title}</h3>
              <p>{poem.description}</p>
            </div>
            <div className="poem-actions">
              <button className={`like-btn ${likedPoems[poem.id] ? "liked" : ""}`} onClick={() => handleLike(poem.id)}>
                ❤️ {likedPoems[poem.id] ? "Liked" : "Like"}
              </button>
              <button className="share-btn" onClick={() => handleShare(poem.imagePath, poem.title)}>🔗 Share</button>
              <button className="download-btn" onClick={() => handleDownload(poem.imagePath, poem.title)}>⬇ Download</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Image Popup */}
      {popupOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <img src={popupImage} alt={popupTitle} />
            <h3>{popupTitle}</h3>
            <button className="popup-close" onClick={closePopup}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
}
