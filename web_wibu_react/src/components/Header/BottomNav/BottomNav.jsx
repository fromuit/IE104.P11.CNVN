import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './BottomNav.css';
import genresData from '../../../data_and_source/genres.json';

function BottomNav() {
  const [showGenres, setShowGenres] = useState(false);
  const navRef = useRef(null);
  const wrapperRef = useRef(null);
  const originalPositionRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current || !wrapperRef.current) return;

      const currentScrollPos = window.pageYOffset;
      
      if (!originalPositionRef.current) {
        originalPositionRef.current = navRef.current.offsetTop;
      }

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < originalPositionRef.current);
      setPrevScrollPos(currentScrollPos);

      if (currentScrollPos > originalPositionRef.current) {
        navRef.current.classList.add('sticky');
        wrapperRef.current.style.display = 'block';
      } else {
        navRef.current.classList.remove('sticky');
        wrapperRef.current.style.display = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <div className={`bottom-nav__wrapper ${!isHomePage ? 'bottom-nav__wrapper--compact' : ''}`} ref={wrapperRef}>
      </div>
      <nav className={`bottom-nav ${!isHomePage ? 'bottom-nav--compact' : ''} ${visible ? 'visible' : 'hidden'}`} ref={navRef}>
        <div className="bottom-nav__container">
          <ul className="bottom-nav__list">
            <li className="bottom-nav__item">
              <div 
                className="bottom-nav__link"
                onClick={() => setShowGenres(!showGenres)}
              >
                <i className="fas fa-tags"></i>
                Thể loại
                <i className="fas fa-chevron-down ml-1"></i>
              </div>
              {showGenres && (
                <div className="genres-dropdown">
                  <ul className="genres-list">
                    {genresData.genres.map(genre => (
                      <li key={genre.id}>
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
              )}
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
    </>
  );
}

export default BottomNav;