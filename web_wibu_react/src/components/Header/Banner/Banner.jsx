import  { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import './Banner.css';
import styles from './Banner.module.scss';
import { bannerArray } from '../../../data_and_source/Images/Banners/index.js';

function Banner() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Data mẫu - sau này có thể thay bằng API call
  const banners = bannerArray;

  // Chuyển slide tự động
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide(prev => 
          prev === banners.length - 1 ? 0 : prev + 1
        );
      }, 5000); // Chuyển sau mỗi 5 giây
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
      className={`${styles["banner"]} ${!isHomePage ? styles["banner--compact"] : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles["banner__container"]}>
        <div 
          className={styles["banner__slides"]}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner) => (
            <Link 
              key={banner.id}
              to={banner.link}
              className={styles["banner__slides__item"]}
            >
              <div className={styles["banner__image-wrapper"]}>
                <img 
                  src={banner.image} 
                  alt={banner.title}
                  onLoad={handleImageLoad}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          className={`${styles["banner__nav"]} ${styles["banner__nav--prev"]}`}
          onClick={goToPrevSlide}
          aria-label="Previous banner"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button 
          className={`${styles["banner__nav"]} ${styles["banner__nav--next"]}`}
          onClick={goToNextSlide}
          aria-label="Next banner"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Dots Navigation */}
        <div className={styles["banner__dots"]}>
          {banners.map((_, index) => (
            <button
              key={index}
              className={`${styles["banner__dots__item"]} ${
                currentSlide === index ? styles["banner__dots__item--active"] : ""
              }`}
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