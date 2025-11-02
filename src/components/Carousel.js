import React, { useState, useEffect } from "react";
import './Carousal.css';

// Import images stored in frontend assets
import slide1 from '../assets/images/carousal1.jpg';
import slide2 from '../assets/images/carousal2.jpg';
import slide3 from '../assets/images/carousal3.jpg';

export default function Carousel() {
  const slides = [
    { img: slide1, quote: "Poetry is the rhythmical creation of beauty." },
    { img: slide2, quote: "Where words fail, poetry speaks." },
    { img: slide3, quote: "Poetry is the record of the best and happiest moments of the happiest and best minds." }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="carousel">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`carousel-slide ${index === currentIndex ? "active" : ""}`}
        >
          <img src={slide.img} alt={`Slide ${index + 1}`} />
          <div className="carousel-quote">{slide.quote}</div>
        </div>
      ))}
    </div>
  );
}
