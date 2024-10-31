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
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldBeSticky = !entry.isIntersecting;
        
        if (shouldBeSticky !== isSticky.current) {
          isSticky.current = shouldBeSticky;
          nav.classList.toggle('sticky', shouldBeSticky);
        }
      },
      { 
        threshold: [0],
        rootMargin: '-60px 0px 0px 0px'
      }
    );

    if (nav) {
      observer.observe(nav);
    }

    return () => {
      if (nav) {
        observer.unobserve(nav);
      }
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