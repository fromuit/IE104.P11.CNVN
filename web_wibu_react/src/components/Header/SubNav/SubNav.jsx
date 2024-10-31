import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './SubNav.css';

const SubNav = () => {
  const location = useLocation();
  const navRef = useRef(null);
  const isSticky = useRef(false);
  const SCROLL_THRESHOLD = 1500; // Điểm scroll để kích hoạt sticky

  const navItems = [
    { path: '/genres', label: 'Thể loại' },
    { path: '/schedule', label: 'Lịch phát hành' },
    { path: '/upload', label: 'Đăng truyện' },
    { path: '/store', label: 'Cửa hàng' },
    { path: '/ranking', label: 'Bảng xếp hạng' },
    { path: '/rules', label: 'Quy định' },
  ];

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > SCROLL_THRESHOLD && !isSticky.current) {
        isSticky.current = true;
        nav.classList.add('sticky');
      } else if (scrollY <= SCROLL_THRESHOLD && isSticky.current) {
        isSticky.current = false;
        nav.classList.remove('sticky');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Kiểm tra trạng thái ban đầu
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="sub-nav" ref={navRef}>
      <div className="sub-nav-container">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SubNav; 