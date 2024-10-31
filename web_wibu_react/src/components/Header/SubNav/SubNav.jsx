import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './SubNav.css';

const SubNav = () => {
  const location = useLocation();
  const navRef = useRef(null);
  const isSticky = useRef(false);

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

    const calculateThreshold = () => {
      // 1500px ở 50% viewport height (khoảng 969px) 
      // Tính tỉ lệ: 1500 / 969 ≈ 1.55
      const viewportHeight = window.innerHeight;
      return viewportHeight * 0.9;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = calculateThreshold();
      
      if (scrollY > threshold && !isSticky.current) {
        isSticky.current = true;
        nav.classList.add('sticky');
      } else if (scrollY <= threshold && isSticky.current) {
        isSticky.current = false;
        nav.classList.remove('sticky');
      }
    };

    // Xử lý khi resize window
    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Kiểm tra trạng thái ban đầu
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
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