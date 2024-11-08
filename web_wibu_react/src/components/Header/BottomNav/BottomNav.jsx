import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './BottomNav.css';
import genresData from '../../../data_and_source/truyen_data/genres.json';

function BottomNav() {
  const navRef = useRef(null);
  const wrapperRef = useRef(null);
  const originalPositionRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const  setShowGenres = useState(false);
  const genresRef = useRef(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const [timeoutId, setTimeoutId] = useState(null); // Thêm state này để track timeout
  const [dropdownPosition, setDropdownPosition] = React.useState('down');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const navigate = useNavigate();
  const organizeGenresInColumns = (genres, numColumns = 3) => {
    const itemsPerColumn = Math.ceil(genres.length / numColumns);
    const columns = [];
    
    for (let col = 0; col < numColumns; col++) {
      columns.push(genres.slice(col * itemsPerColumn, (col + 1) * itemsPerColumn));
    }
    
    return columns;
  };

  const handleGenresMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsHovered(true);
    setShowGenres(true);
  };

  const handleGenresMouseLeave = () => {
    const newTimeoutId = setTimeout(() => {
      setIsHovered(false);
      setShowGenres(false);
    }, 300);
    
    setTimeoutId(newTimeoutId);
  };
  

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

  const handleGenreClick = (genre) => {
    navigate(`/tim-kiem-nang-cao?genres=${genre.id}`);
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
                className="bottom-nav__item genres-container" 
              key="genres"
              ref={genresRef}
              onMouseEnter={handleGenresMouseEnter}
                onMouseLeave={handleGenresMouseLeave}
              >
                <div 
                  className="bottom-nav__link"
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fas fa-tags"></i>
                  Thể loại
                  <i className={`fas fa-chevron-${isHovered ? 'up' : 'down'} ml-1`}></i>
                </div>
  
                <div  
                  className={`genres-dropdown ${isDropdownVisible ? 'show' : ''} ${dropdownPosition === 'up' ? 'dropdown-up' : 'dropdown-down'}`}
                >
                    <div className="genres-list">
                      {organizeGenresInColumns(genresData.genres).map((column, colIndex) => (
                      <ul key={`column-${colIndex}`} className="genres-column">
                        {column.map((genre) => (
                          <li key={`genre-${genre.id}-${colIndex}`}
                              onMouseEnter={(event) => handleMouseEnter(event, genre.description)}
                              onMouseLeave={handleMouseLeave}
                          >
                            <NavLink 
                              to={`/tim-kiem-nang-cao?genres=${genre.id}`}
                              className="genre-item"
                              onClick={() => setShowGenres(false)}
                            >
                              {genre.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
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
        <div className="tooltip" style={tooltipPosition}>
          {tooltipContent}
        </div>
      )}
    </>
  );
}
export default BottomNav;