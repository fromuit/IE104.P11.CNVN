import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';

function BottomNav() {
  const navRef = useRef(null);
  const wrapperRef = useRef(null);
  const originalPositionRef = useRef(null);

  useEffect(() => {
    const initializeNav = () => {
      const topNavHeight = 60;
      
      // Lưu vị trí ban đầu của BottomNav
      originalPositionRef.current = navRef.current.offsetTop;

      const handleScroll = () => {
        const scrollY = window.scrollY;
        
        // Kiểm tra dựa trên vị trí scroll so với vị trí ban đầu của BottomNav
        if (scrollY >= originalPositionRef.current - topNavHeight) {
          navRef.current.classList.add('sticky');
          navRef.current.style.top = `${topNavHeight}px`;
          wrapperRef.current.style.display = 'block';
        } else {
          navRef.current.classList.remove('sticky');
          navRef.current.style.top = '0';
          wrapperRef.current.style.display = 'none';
        }
      };

      // Gọi handleScroll ngay lập tức để set trạng thái ban đầu
      handleScroll();

      // Thêm event listener với requestAnimationFrame
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
      window.addEventListener('resize', () => {
        // Cập nhật lại vị trí ban đầu khi resize window
        originalPositionRef.current = navRef.current.offsetTop;
      });

      return () => {
        window.removeEventListener('scroll', scrollListener);
        window.removeEventListener('resize', () => {
          originalPositionRef.current = navRef.current.offsetTop;
        });
      };
    };

    // Đảm bảo DOM đã load hoàn toàn
    if (document.readyState === 'complete') {
      initializeNav();
    } else {
      window.addEventListener('load', initializeNav);
      return () => window.removeEventListener('load', initializeNav);
    }
  }, []);

  return (
    <>
      <div className="bottom-nav__wrapper" ref={wrapperRef}></div>
      <nav className="bottom-nav" ref={navRef}>
        <div className="bottom-nav__container">
          <ul className="bottom-nav__list">
            <li className="bottom-nav__item">
              <NavLink to="/the-loai" className="bottom-nav__link">
                <i className="fas fa-tags"></i>
                Thể loại
              </NavLink>
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
    </>
  );
}

export default BottomNav;