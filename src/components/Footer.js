import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} <strong>Hemspire</strong>. All rights reserved.</p>
        
      </div>
    </footer>
  );
}
