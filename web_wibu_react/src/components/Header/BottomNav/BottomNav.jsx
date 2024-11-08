import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './BottomNav.css';
import genresData from '../../../data_and_source/truyen_data/genres.json';

function BottomNav() {
  const navRef = useRef(null);
  const wrapperRef = useRef(null);
  const originalPositionRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [showGenres, setShowGenres] = useState(false);
  const genresRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState('down');
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    function updateDropdownPosition() {
      if (genresRef.current) {
        const element = genresRef.current;
        const rect = element.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const dropdownHeight = 300; // Ước tính chiều cao của dropdown menu

        setDropdownPosition(spaceBelow >= dropdownHeight || spaceBelow > spaceAbove ? 'down' : 'up');
      }
    }

    updateDropdownPosition();
    window.addEventListener('resize', updateDropdownPosition);
    window.addEventListener('scroll', updateDropdownPosition);

    return () => {
      window.removeEventListener('resize', updateDropdownPosition);
      window.removeEventListener('scroll', updateDropdownPosition);
    };
  }, []);

  useEffect(() => {  
    const initializeNav = () => {
      const topNavHeight = isHomePage ? 60 : 40;
      const bannerElement = document.querySelector('.banner');
      
      navRef.current.classList.toggle('bottom-nav--compact', !isHomePage);
      wrapperRef.current.classList.toggle('bottom-nav__wrapper--compact', !isHomePage);
      
      // Lưu vị trí ban đầu của BottomNav
      originalPositionRef.current = bannerElement ? 
        bannerElement.offsetTop + bannerElement.offsetHeight : 
        navRef.current.offsetTop;

      const handleScroll = () => {
        if (navRef.current) {
          const scrollY = window.scrollY;
          
          if (scrollY >= originalPositionRef.current - topNavHeight) {
            if (!navRef.current.classList.contains('sticky')) {
              navRef.current.classList.add('sticky');
              navRef.current.style.top = `${topNavHeight}px`;
            }
          } else {
            if (navRef.current.classList.contains('sticky')) {
              navRef.current.classList.remove('sticky');
              navRef.current.style.top = '0';
            }
          }
        }
      };

      // Reset scroll position khi thay đổi trang
      window.scrollTo(0, 0);
      handleScroll();

      let ticking = false;
      const scrollListener = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', scrollListener);
      return () => window.removeEventListener('scroll', scrollListener);
    };

    initializeNav();
  }, [isHomePage]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (genresRef.current && !genresRef.current.contains(event.target)) {
        setShowGenres(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleDropdownLeave = () => {
    setIsDropdownVisible(false);
  };

  const handleMouseEnter = (event, description) => {
    if (description && description !== "...") {
      setTooltipContent(description);
      const rect = event.target.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top - 30, // Điều chỉnh vị trí tooltip
        left: rect.left + rect.width / 2,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltipContent('');
  };

  return (
    <>
      <div 
        className={`bottom-nav__wrapper ${!isHomePage ? 'bottom-nav__wrapper--compact' : ''}`} 
        ref={wrapperRef}
      >
        <nav 
          className={`bottom-nav ${!isHomePage ? 'bottom-nav--compact' : ''}`} 
          ref={navRef}
        >
          <div className="bottom-nav__container">
            <ul className="bottom-nav__list">
              <li 
                className="bottom-nav__item" 
                key="genres"
                ref={genresRef}
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <div 
                  className="bottom-nav__link"
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fas fa-tags"></i>
                  Thể loại
                  <i className={`fas fa-chevron-${isDropdownVisible ? 'up' : 'down'} ml-1`}></i>
                </div>
                <div  
                  className={`genres-dropdown ${isDropdownVisible ? 'show' : ''} ${dropdownPosition === 'up' ? 'dropdown-up' : 'dropdown-down'}`}
                >
                  <ul className="genres-list">
                    {genresData.genres.map((genre, index) => (
                      <li 
                        key={`genre-${genre.id}-${index}`}
                        onMouseEnter={(e) => handleMouseEnter(e, genre.description)}
                        onMouseLeave={() => setTooltipContent('')}
                      >
                        <NavLink 
                          to={`/the-loai/${genre.slug}`}
                          className="genre-item"
                        >
                          {genre.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="bottom-nav__item" key="rank">
                <NavLink to="/bang-xep-hang" className="bottom-nav__link">
                  <i className="fas fa-chart-line"></i>
                  Bảng xếp hạng
                </NavLink>
              </li>
              <li className="bottom-nav__item" key="follow">
                <NavLink to="/theo-doi" className="bottom-nav__link">
                  <i className="fas fa-heart"></i>
                  Theo dõi
                </NavLink>
              </li>
              <li className="bottom-nav__item" key="history">
                <NavLink to="/lich-su" className="bottom-nav__link">
                  <i className="fas fa-history"></i>
                  Lịch sử
                </NavLink>
              </li>
              <li className="bottom-nav__item" key="account">
                <NavLink to="/tai-khoan" className="bottom-nav__link">
                  <i className="fas fa-user"></i>
                  Tài khoản
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {tooltipContent && (
        <div 
          className="tooltip" 
          style={{ 
            top: `${tooltipPosition.top}px`, 
            left: `${tooltipPosition.left}px` 
          }}
        >
          {tooltipContent}
        </div>
      )}
    </>
  );
}

export default BottomNav;