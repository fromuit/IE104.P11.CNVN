import  { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './Banner.module.scss';

// Có 3 chỗ cần chỉnh time cho slide
// 1. slideInterval
// 2. slideInterval ở handleMouseEnter
// 3. slideInterval ở handleMouseLeave

// Import từ file index
import { bannerArray } from "../../../data_and_source/Images/Banners/index.js";

function Banner() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const bannersData = bannerArray;

  // Sau đó là các state
  const [initialSlide] = useState(() => Math.floor(Math.random() * bannersData.length) + 1);
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const isAutoPlaying = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Thêm state để theo dõi thời gian interval
  const [slideInterval, setSlideInterval] = useState(5000); 

  // Tạo mảng slides mới với clone ở đầu và cuối
  const extendedBannersData = [
    { ...bannersData[bannersData.length - 1], id: 'clone-last' },  // Clone của slide cuối
    ...bannersData,
    { ...bannersData[0], id: 'clone-first' }  // Clone của slide đầu
  ];

  // Chuyển slide tự động
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide(prev => prev + 1);
      }, slideInterval);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slideInterval]);

  // Thêm effect để xử lý infinite loop
  useEffect(() => {
    if (currentSlide === 0) {
      // Đang ở clone đầu, reset về slide cuối
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentSlide(bannersData.length);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 300);
    } else if (currentSlide === bannersData.length + 1) {
      // Đang ở clone cuối, reset về slide đầu
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentSlide(1);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 300);
    }
  }, [currentSlide, bannersData.length]);

  // Dừng auto play khi hover
  const handleMouseEnter = () => {
    setSlideInterval(10000); // Tăng lên 10 giây khi hover
  };
  
  const handleMouseLeave = () => {
    setSlideInterval(5000); // Trở lại 5 giây khi không hover
  };

  // Điều hướng slide
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index + 1); // +1 vì có slide clone ở đầu
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide(prev => prev - 1);
  }, []);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide(prev => prev + 1);
  }, []);

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
    className={`${styles.banner} ${!isHomePage ? styles['banner--compact'] : ''}`}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <div className={styles.banner__container}>
      <div 
        className={styles.banner__slides}
        style={{ 
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: isTransitioning ? 'none' : 'transform 0.3s ease-in-out'
        }}
      >
        {extendedBannersData.map((banner) => (
          <Link 
            key={banner.id}
            to={banner.link}
            className={styles.banner__slide}
          >
            <div className={styles['banner__image-wrapper']}>
              <img 
                src={banner.image} 
                alt={banner.title}
                className={styles.banner__image}
                onLoad={handleImageLoad}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        className={`${styles.banner__nav} ${styles['banner__nav--prev']}`}
        onClick={goToPrevSlide}
        aria-label="Previous banner"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button 
        className={`${styles.banner__nav} ${styles['banner__nav--next']}`}
        onClick={goToNextSlide}
        aria-label="Next banner"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

      {/* Dots Navigation */}
      <div className={styles.banner__dots}>
        {bannersData.map((_, index) => (
          <button
            key={index}
            className={`${styles.banner__dot} ${currentSlide === index + 1 ? styles.active : ''}`}
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