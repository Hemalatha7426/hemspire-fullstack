import React, { useEffect, useState } from "react";
import { getAllAudio } from "../api/audioApi";
import "./AudioPage.css";

export default function AudioPageToggle() {
  const [audios, setAudios] = useState([]);
  const [filteredAudios, setFilteredAudios] = useState([]);
  const [search, setSearch] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(
    document.body.classList.contains("dark-mode")
  );

  useEffect(() => {
    fetchAudios();
  }, []);

  useEffect(() => {
    // Detect body class changes
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains("dark-mode"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const fetchAudios = async () => {
    try {
      const response = await getAllAudio();
      setAudios(response.data);
      setFilteredAudios(response.data);
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  // Real-time search
  useEffect(() => {
    const filtered = audios.filter((audio) =>
      audio.title.toLowerCase().startsWith(search.toLowerCase())
    );
    setFilteredAudios(filtered);
  }, [search, audios]);

  const handleDownload = async (audioPath, title) => {
    try {
      const response = await fetch(`http://localhost:8080${audioPath}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = title + audioPath.substring(audioPath.lastIndexOf("."));
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className={`audio-toggle-page ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <h1 className="audio-toggle-title">ALL AUDIO FILES</h1>

      <div className="audio-toggle-search">
        <input
          type="text"
          placeholder="Search audio..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="audio-toggle-list">
        {filteredAudios.length === 0 && <p>No audio files found.</p>}
        {filteredAudios.map((audio) => (
          <div className="audio-toggle-card" key={audio.id}>
            <h3>{audio.title}</h3>
            <p>{audio.description}</p>
            <audio controls>
              <source
                src={`http://localhost:8080${audio.audioPath}`}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
            <button
              className="audio-download-btn"
              onClick={() => handleDownload(audio.audioPath, audio.title)}
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
