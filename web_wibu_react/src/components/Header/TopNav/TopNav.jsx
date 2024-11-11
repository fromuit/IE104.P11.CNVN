import  { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './TopNav.css';
import { searchNovelsRealtime } from '../../../features/utils/searchUtils';
import logoTopNav  from '../../../data_and_source/Images/logo.png';
import avatarTopNav from '../../../data_and_source/Images/avatar.png';

function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [setVisibleResults] = useState(3);

  const isHomePage = location.pathname === '/';

  const toggleTheme = () => { 
    setIsDarkMode(!isDarkMode);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      const results = searchNovelsRealtime(query);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
    if (!searchQuery.trim()) {
      navigate('/tim-kiem-nang-cao');
    } else {
      handleSearchChange({ preventDefault: () => {} });
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.top-nav__search')) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setVisibleResults(prev => prev + 3);
    }
  };

  return (
    <div className="top-nav-wrapper">
      <nav className={`top-nav ${isHomePage ? '' : 'top-nav--compact'}`}>
        <div className="top-nav__container">
          <a href="/" className="top-nav__logo">
            <img src={logoTopNav} alt="Logo" />
          </a>

          <form onSubmit={handleSearchChange} className="top-nav__search">
            <input 
              type="text" 
              placeholder="Tìm kiếm Light Novel..." 
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowResults(true)}
            />
            {showResults && searchResults.length > 0 && (
              <div className="search-results-dropdown">
                {searchResults.map(novel => (
                  <Link 
                    key={novel.ID}
                    to={novel["Link truyện"]} 
                    className="search-result-item"
                    onClick={() => setShowResults(false)}
                  >
                    <img 
                      src={novel["Link ảnh"]} 
                      alt={novel["Tựa đề"]}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/default-cover.jpg';
                      }}
                    />
                    <div className="search-result-info">
                      <div className="search-result-title">{novel["Tựa đề"]}</div>
                      <div className="search-result-author">{novel["Tác giả"]}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
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
                    <img src={avatarTopNav} alt="Avatar" />
                  </button>

                  <div className="account-dropdown">
                    <div className="dropdown-user-info">
                      <img src={avatarTopNav} alt="Avatar" className="dropdown-avatar" />
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