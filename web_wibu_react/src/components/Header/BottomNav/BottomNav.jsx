import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/genres', label: 'Thể loại' },
    { path: '/schedule', label: 'Lịch phát hành' },
    { path: '/upload', label: 'Đăng truyện' },
    { path: '/store', label: 'Cửa hàng' },
    { path: '/ranking', label: 'Bảng xếp hạng' },
    { path: '/rules', label: 'Quy định' },
  ];

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
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

export default BottomNav;