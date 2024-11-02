import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './TopNav.css';

function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isHomePage = location.pathname === '/';

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Ngăn form submit mặc định
    
    if (!searchQuery.trim()) {
      // Nếu không có nội dung tìm kiếm, chuyển đến trang tìm kiếm chi tiết
      navigate('/tim-kiem');
      return;
    }
    
    // Xử lý tìm kiếm với nội dung (sẽ bổ sung sau)
    navigate(`/tim-kiem?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
    if (!searchQuery.trim()) {
      navigate('/tim-kiem');
    } else {
      handleSearch({ preventDefault: () => {} });
    }
  };

  return (
    <div className="top-nav-wrapper">
      <nav className={`top-nav ${isHomePage ? '' : 'top-nav--compact'}`}>
        <div className="top-nav__container">
          <a href="/" className="top-nav__logo">
            <img src="/images/logo.png" alt="Logo" />
          </a>

          <form onSubmit={handleSearch} className="top-nav__search">
            <input 
              type="text" 
              placeholder="Tìm kiếm Light Novel..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className={`search-button-container ${isSearchActive ? 'active' : ''}`}>
              <div className="search-divider"></div>
              <button 
                type="submit"
                className={`search-button ${isSearchActive ? 'active' : ''}`}
                onClick={handleSearchClick}
                title="Tìm kiếm"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>

          <div className="top-nav__actions">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              title="Chuyển đổi giao diện sáng/tối"
            >
              {isDarkMode ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>

            <Link to="/settings" className="settings-button" title="Cài đặt">
              <i className="fas fa-cog"></i>
            </Link>

            <Link to="/tai-khoan" className="top-nav__avatar" title="Tài khoản">
              <img src="/images/avatar.png" alt="Avatar" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default TopNav;