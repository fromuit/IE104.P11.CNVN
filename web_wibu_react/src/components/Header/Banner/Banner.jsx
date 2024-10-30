import React, { useState, useEffect } from 'react';
import './Banner.css';

const banners = [
  { id: 1, image: '/images/banner1.png', link: '/banner1' },
  { id: 2, image: '/images/banner2.png', link: '/banner2' },
  { id: 3, image: '/images/banner3.png', link: '/banner3' },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  const goToBanner = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextBanner, 4000); // Tự động chuyển sau 5 giây
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-container">
      <div className="banner">
        <a href={banners[currentIndex].link}>
          <img src={banners[currentIndex].image} alt={`Banner ${currentIndex + 1}`} />
        </a>
        <button className="prev" onClick={prevBanner}>&#10094;</button>
        <button className="next" onClick={nextBanner}>&#10095;</button>
      </div>
      <div className="dots">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToBanner(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;