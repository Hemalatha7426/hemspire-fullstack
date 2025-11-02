import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(localStorage.getItem("darkMode") === "true");

  const toggleDark = () => setDark(!dark);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark-mode"); // apply to body globally
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", dark); // persist
  }, [dark]);

  return (
    <button className="btn-pill" onClick={toggleDark}>
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
