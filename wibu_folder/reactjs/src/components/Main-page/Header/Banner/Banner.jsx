import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Data mẫu - sau này có thể thay bằng API call
  const banners = [
    {
      id: 1,
      image: '/images/banner1.png',
      link: '/novel/1',
      title: 'Banner 1'
    },
    {
      id: 2,
      image: '/images/banner2.png',
      link: '/novel/2',
      title: 'Banner 2'
    },
    {
      id: 3,
      image: '/images/banner3.png',
      link: '/novel/3',
      title: 'Banner 3'
    },
    // Thêm banner khác ở đây
  ];

  // Chuyển slide tự động
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide(prev => 
          prev === banners.length - 1 ? 0 : prev + 1
        );
      }, 3000); // Chuyển sau mỗi 5 giây
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  // Dừng auto play khi hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Điều hướng slide
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide(prev => 
      prev === 0 ? banners.length - 1 : prev - 1
    );
  }, [banners.length]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide(prev => 
      prev === banners.length - 1 ? 0 : prev + 1
    );
  }, [banners.length]);

  const handleImageLoad = (event) => {
    const img = event.target;
    const wrapper = img.parentElement;
    const containerAspectRatio = wrapper.offsetWidth / wrapper.offsetHeight;
    const imageAspectRatio = img.naturalWidth / img.naturalHeight;

    if (imageAspectRatio > containerAspectRatio) {
      // Ảnh quá rộng, ưu tiên chiều rộng
      img.style.width = '100%';
      img.style.height = 'auto';
    } else {
      // Ảnh quá cao, ưu tiên chiều cao
      img.style.width = 'auto';
      img.style.height = '100%';
    }
  };

  return (
    <div 
      className="banner"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="banner__container">
        <div 
          className="banner__slides"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner) => (
            <Link 
              key={banner.id}
              to={banner.link}
              className="banner__slide"
            >
              <div className="banner__image-wrapper">
                <img 
                  src={banner.image} 
                  alt={banner.title}
                  className="banner__image"
                  onLoad={handleImageLoad}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          className="banner__nav banner__nav--prev"
          onClick={goToPrevSlide}
          aria-label="Previous banner"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button 
          className="banner__nav banner__nav--next"
          onClick={goToNextSlide}
          aria-label="Next banner"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Dots Navigation */}
        <div className="banner__dots">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`banner__dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;