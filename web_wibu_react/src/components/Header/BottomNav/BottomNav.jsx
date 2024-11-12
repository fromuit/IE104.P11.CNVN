import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './BottomNav.css';
import genresData from '../../../data_and_source/Novel_Data/genres.json';

function BottomNav() {
  const navRef = useRef(null);
  const wrapperRef = useRef(null);
  const originalPositionRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [showGenres, setShowGenres] = useState(false);
  const genresRef = useRef(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const [timeoutId, setTimeoutId] = useState(null); // Thêm state này để track timeout
  const [dropdownPosition, setDropdownPosition] = React.useState('down');
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  // const navigate = useNavigate();
  const [isAfterBanner, setIsAfterBanner] = useState(true);

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
    }, 200);
    
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
      
      // Kiểm tra vị trí của BottomNav
      const isAfterBannerPosition = !!bannerElement && 
        (bannerElement.compareDocumentPosition(navRef.current) & Node.DOCUMENT_POSITION_FOLLOWING);
      setIsAfterBanner(isAfterBannerPosition);

      // Nếu không có banner hoặc BottomNav nằm ngay sau TopNav
      if (!isAfterBannerPosition) {
        navRef.current.classList.add('sticky');
        navRef.current.style.top = `${topNavHeight}px`;
        wrapperRef.current.style.paddingBottom = `${navRef.current.offsetHeight}px`;
      }

      originalPositionRef.current = isAfterBannerPosition ? 
        (bannerElement ? bannerElement.offsetTop + bannerElement.offsetHeight : navRef.current.offsetTop) :
        topNavHeight;

      const handleScroll = () => {
        if (navRef.current && isAfterBannerPosition) {
          const scrollY = window.scrollY;
          const topNavHeight = isHomePage ? 60 : 40;
          
          const shouldStick = scrollY >= originalPositionRef.current - topNavHeight;

          if (shouldStick) {
            if (!navRef.current.classList.contains('sticky')) {
              navRef.current.classList.add('sticky');
              navRef.current.style.top = `${topNavHeight}px`;
              wrapperRef.current.style.paddingBottom = `${navRef.current.offsetHeight}px`;
            }
          } else {
            if (navRef.current.classList.contains('sticky')) {
              navRef.current.classList.remove('sticky');
              navRef.current.style.top = '0';
              wrapperRef.current.style.paddingBottom = '0';
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

      // Chỉ thêm scroll listener nếu BottomNav nằm sau Banner
      if (isAfterBannerPosition) {
        window.addEventListener('scroll', scrollListener);
        return () => window.removeEventListener('scroll', scrollListener);
      }
    };

    initializeNav();
  }, [isHomePage, isAfterBanner]);

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
                className={`genres-dropdown ${showGenres ? 'show' : ''} ${dropdownPosition === 'up' ? 'dropdown-up' : 'dropdown-down'}`}
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

            <li className="bottom-nav__item">
              <NavLink to="/lich-phat-hanh" className="bottom-nav__link">
                <i className="far fa-calendar-alt"></i>
                Lịch phát hành
              </NavLink>
            </li>
            <li className="bottom-nav__item">
              <NavLink to="/dang-truyen" className="bottom-nav__link">
                <i className="fas fa-upload"></i>
                Đăng truyện
              </NavLink>
            </li>
            <li className="bottom-nav__item">
              <NavLink to="/cua-hang" className="bottom-nav__link">
                <i className="fas fa-store"></i>
                Cửa hàng
              </NavLink>
            </li>
            <li className="bottom-nav__item">
              <NavLink to="/bang-xep-hang" className="bottom-nav__link">
                <i className="fas fa-trophy"></i>
                Bảng xếp hạng
              </NavLink>
            </li>
            <li className="bottom-nav__item">
              <NavLink to="/quy-dinh" className="bottom-nav__link">
                <i className="fas fa-book"></i>
                Quy định
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