import  { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './TopNav.css';

function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const isHomePage = location.pathname === '/';

  const toggleTheme = () => { 
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      navigate('/tim-kiem-nang-cao');
      return;
    }
    
    navigate(`/tim-kiem-nang-cao?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
    if (!searchQuery.trim()) {
      navigate('/tim-kiem-nang-cao');
    } else {
      handleSearch({ preventDefault: () => {} });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(user));
    }
  }, []);

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
            <div className="search-divider"></div>
            <button 
              type="submit"
              className="search-button-small"
              onClick={handleSearchClick}
              title="Tìm kiếm"
            >
              <i className="fas fa-search"></i>
            </button>
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

            <div className="account-dropdown-container">
              {isLoggedIn ? (
                <>
                  <button className="top-nav__avatar" title="Tài khoản">
                    <img src="/images/avatar.png" alt="Avatar" />
                  </button>

                  <div className="account-dropdown">
                    <div className="dropdown-user-info">
                      <img src="/images/avatar.png" alt="Avatar" className="dropdown-avatar" />
                      <div>
                        <h4>{userData?.fullName || 'Khách'}</h4>
                        <span>{userData?.email ? `@${userData.email}` : ''}</span>
                      </div>
                    </div>
                    <div className="dropdown-menu">
                      <Link to="/thanh-vien/:slug" className="dropdown-item">
                        <i className="fas fa-user"></i>
                        <span>Tài khoản</span>
                      </Link>
                      <Link to="/thong-bao" className="dropdown-item">
                        <i className="fas fa-bell"></i>
                        <span>Thông báo</span>
                        <span className="badge">3</span>
                      </Link>
                      <Link to="/lich-su-doc" className="dropdown-item">
                        <i className="fas fa-history"></i>
                        <span>Lịch sử đọc</span>
                      </Link>
                      <button onClick={handleLogout} className="dropdown-item logout">
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="signin-signup-buttons">
                  <Link to="/signin" className="signin-button">Đăng nhập</Link>
                  <Link to="/signup" className="signup-button">Đăng ký</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default TopNav;