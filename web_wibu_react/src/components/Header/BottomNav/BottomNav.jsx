import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './BottomNav.css';
import genresData from '../../../data_and_source/genres.json';

function BottomNav() {
  const [showGenres, setShowGenres] = useState(false);
  const navRef = useRef(null);
  const wrapperRef = useRef(null);
  const originalPositionRef = useRef(null);
  const genresRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const visible = useState(true);

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

  return (
    <>
      <div className={`bottom-nav__wrapper ${!isHomePage ? 'bottom-nav__wrapper--compact' : ''}`} ref={wrapperRef}>
      </div>
      <nav className={`bottom-nav ${!isHomePage ? 'bottom-nav--compact' : ''} ${visible ? 'visible' : 'hidden'}`} ref={navRef}>
        <div className="bottom-nav__container">
          <ul className="bottom-nav__list">
            <li className="bottom-nav__item genres-menu" ref={genresRef}>
              <div 
                className="bottom-nav__link"
                onClick={() => setShowGenres(!showGenres)}
              >
                <i className="fas fa-tags"></i>
                Thể loại
                <i className={`fas fa-chevron-${showGenres ? 'up' : 'down'} ml-1`}></i>
              </div>
              {showGenres && (
                <div className="genres-dropdown">
                  <div className="genres-container">
                    <ul className="genres-list">
                      {genresData.genres.map((genre, index) => (
                        <li key={`genre-${genre.id}-${index}`}>
                          <NavLink 
                            to={`/the-loai/${genre.slug}`}
                            className="genre-item"
                            onClick={() => setShowGenres(false)}
                          >
                            {genre.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
            <li className="bottom-nav__item">
              <NavLink to="/bang-xep-hang" className="bottom-nav__link">
                <i className="fas fa-chart-line"></i>
                Bảng xếp hạng
              </NavLink>
            </li>
            <li className="bottom-nav__item">
              <NavLink to="/theo-doi" className="bottom-nav__link">
                <i className="fas fa-heart"></i>
                Theo dõi
              </NavLink>
            </li>
            <li className="bottom-nav__item">
              <NavLink to="/lich-su" className="bottom-nav__link">
                <i className="fas fa-history"></i>
                Lịch sử
              </NavLink>
            </li>
            <li className="bottom-nav__item">
              <NavLink to="/tai-khoan" className="bottom-nav__link">
                <i className="fas fa-user"></i>
                Tài khoản
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default BottomNav;