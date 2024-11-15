import  { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Banner.css';

// Có 3 chỗ cần chỉnh time cho slide
// 1. slideInterval
// 2. slideInterval ở handleMouseEnter
// 3. slideInterval ở handleMouseLeave

// Import từ file index
import { bannerArray } from "../../../data_and_source/Images/Banners/index.js";

function Banner() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // // Di chuyển bannersData lên trước các state
  // const bannersData = [
  //   {
  //     id: 1,
  //     image: banners.banner1,
  //     link: '/info/1',
  //     title: 'Banner 1'
  //   },
  //   {
  //     id: 2,
  //     image: banners.banner2,
  //     link: '/info/2',
  //     title: 'Banner 2'
  //   },
  //   {
  //     id: 3,
  //     image: banners.banner3,
  //     link: '/info/3',
  //     title: 'Banner 3'
  //   },
  //   {
  //     id: 4,
  //     image: banners.banner4,
  //     link: '/info/4',
  //     title: 'Banner 4'
  //   },
  //   {
  //     id: 5,
  //     image: banners.banner5,
  //     link: '/info/5',
  //     title: 'Banner 5'
  //   }
  // ];
  const bannersData = bannerArray;

  // Sau đó là các state
  const [initialSlide] = useState(() => Math.floor(Math.random() * bannersData.length) + 1);
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Thêm state để theo dõi thời gian interval
  const [slideInterval, setSlideInterval] = useState(1000); 

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
    setSlideInterval(3000); // Tăng lên 10 giây khi hover
  };
  
  const handleMouseLeave = () => {
    setSlideInterval(1000); // Trở lại 5 giây khi không hover
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
      className={`banner ${!isHomePage ? 'banner--compact' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="banner__container">
        <div 
          className="banner__slides"
          style={{ 
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: isTransitioning ? 'none' : 'transform 0.3s ease-in-out'
          }}
        >
          {extendedBannersData.map((banner) => (
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
              className={`banner__dot ${currentSlide === index + 1 ? 'active' : ''}`}
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