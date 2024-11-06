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

  const handleLogout = () => {
    // Xóa tất cả thông tin từ localStorage
    localStorage.clear();
    
    // Reset tất cả state về mặc định
    setIsLoggedIn(false);
    setUserData(null);
    
    // Chuyển hướng về trang chủ và reload page
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi component mount
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
                      <Link to="/danh-dau" className="dropdown-item">
                        <i className="fas fa-bookmark"></i>
                        <span>Đánh dấu</span>
                      </Link>
                      <Link to="/hop-thu" className="dropdown-item">
                        <i className="fas fa-envelope"></i>
                        <span>Hộp thư</span>
                        <span className="badge">1</span>
                      </Link>
                      <Link to="/thao-luan" className="dropdown-item">
                        <i className="fas fa-comments"></i>
                        <span>Thảo luận</span>
                      </Link>
                      <Link to="/tu-sach" className="dropdown-item">
                        <i className="fas fa-book"></i>
                        <span>Tủ sách</span>
                      </Link>
                      <Link to="/gio-hang" className="dropdown-item">
                        <i className="fas fa-shopping-cart"></i>
                        <span>Giỏ hàng</span>
                        <span className="badge">2</span>
                      </Link>
                      <button onClick={handleLogout} className="dropdown-item">
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