import React, { useEffect, useState } from "react";
import { getAllVideos } from "../api/VideoApi";
import "./VideoPage.css";

export default function VideoPage() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState(
    JSON.parse(localStorage.getItem("likedVideos")) || {}
  );
  const [activeVideo, setActiveVideo] = useState(null); // video for modal

  useEffect(() => {
    async function fetchVideos() {
      const data = await getAllVideos();
      setVideos(data);
      setFilteredVideos(data);
    }
    fetchVideos();
  }, []);

  useEffect(() => {
    const filtered = videos.filter((v) =>
      v.title.toLowerCase().startsWith(search.toLowerCase())
    );
    setFilteredVideos(filtered);
  }, [search, videos]);

  const handleLike = (id) => {
    const updated = { ...likedVideos, [id]: !likedVideos[id] };
    setLikedVideos(updated);
    localStorage.setItem("likedVideos", JSON.stringify(updated));
  };

  const handleDownload = async (videoPath, title) => {
    try {
      const response = await fetch(`http://localhost:8080${videoPath}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = title.replace(/\s+/g, "_") + ".mp4";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <div className="videoPage-container">
      <div className="videoPage-header">
        <h1>Poem Videos</h1>
      </div>

      <div className="videoPage-search">
        <input
          type="text"
          placeholder="Search video poems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="videoPage-grid">
        {filteredVideos.length === 0 && <p>No videos found.</p>}
        {filteredVideos.map((video) => (
          <div key={video.id} className="videoPage-card">
            <video
             
              onClick={() => setActiveVideo(video)}
              style={{ cursor: "pointer" }}
            >
              <source
                src={`http://localhost:8080${video.videoPath}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <div className="videoPage-actions">
              <button
                className={`videoPage-like-btn ${
                  likedVideos[video.id] ? "videoPage-liked" : ""
                }`}
                onClick={() => handleLike(video.id)}
              >
                ❤️ {likedVideos[video.id] ? "Liked" : "Like"}
              </button>
              <button
                className="videoPage-download-btn"
                onClick={() => handleDownload(video.videoPath, video.title)}
              >
                ⬇ Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for full-screen video */}
      {activeVideo && (
        <div className="videoModal">
          <span className="videoModal-close" onClick={() => setActiveVideo(null)}>
            &times;
          </span>
          <video controls autoPlay style={{ width: "90%", height: "90%", objectFit: "contain" }}>
            <source
              src={`http://localhost:8080${activeVideo.videoPath}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}
