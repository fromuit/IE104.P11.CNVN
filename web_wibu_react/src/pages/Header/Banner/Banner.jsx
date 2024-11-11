import  { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Banner.css';

// Import từ file index
import {banners} from "../../../data_and_source/Images/Banners/index.js";

function Banner() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sử dụng object banners
  const bannersData = [
    {
      id: 1,
      image: banners.banner1,
      link: '/info/1',
      title: 'Banner 1'
    },
    {
      id: 2,
      image: banners.banner2,
      link: '/info/2',
      title: 'Banner 2'
    },
    {
      id: 3,
      image: banners.banner3,
      link: '/info/3',
      title: 'Banner 3'
    },
    // Thêm banner khác ở đây
    {
      id: 4,
      image: banners.banner4,
      link: '/info/4',
      title: 'Banner 4'
    },
    {
      id: 5,
      image: banners.banner5,
      link: '/info/5',
      title: 'Banner 5'
    }
  ];

  // Chuyển slide tự động
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide(prev => 
          prev === bannersData.length - 1 ? 0 : prev + 1
        );
      }, 5000); // Chuyển sau mỗi 5 giây
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, bannersData.length]);

  // Dừng auto play khi hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Điều hướng slide
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide(prev => 
      prev === 0 ? bannersData.length - 1 : prev - 1
    );
  }, [bannersData.length]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide(prev => 
      prev === bannersData.length - 1 ? 0 : prev + 1
    );
  }, [bannersData.length]);

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
      className={`banner ${!isHomePage ? 'banner--compact' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="banner__container">
        <div 
          className="banner__slides"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {bannersData.map((banner) => (
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
          {bannersData.map((_, index) => (
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