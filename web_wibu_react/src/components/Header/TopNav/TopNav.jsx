import  { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import './TopNav.css';
import styles from './TopNav.module.scss';
import { searchNovelsRealtime, getAllGenres } from '../../../features/utils/searchUtils';
import avatar from '../../../data_and_source/Images/Avatars/avatar.png';

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
  const [visibleResults, setVisibleResults] = useState(3);

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

  const handleSearchClick = (e) => {
    e.preventDefault();
    setIsSearchActive(!isSearchActive);
    if (!searchQuery.trim()) {
      navigate('/tim-kiem-nang-cao');
    } else {
      navigate(`/tim-kiem-nang-cao?q=${encodeURIComponent(searchQuery.trim())}`);
    }
    setSearchQuery('');
    setShowResults(false);
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

  const handleSearchResultClick = (novelId) => {
    setShowResults(false);
    setSearchQuery('');
    navigate(`/info/${novelId}`);
  };

  const handleGenreClick = (genre) => {
    navigate(`/tim-kiem-nang-cao?genres=${encodeURIComponent(genre)}`);
    setShowResults(false);
  };

  return (
    <div className="top-nav-wrapper">
      <nav className={`${styles["top-nav"]} ${isHomePage ? '' : styles["top-nav--compact"]}`}>
        <div className={styles["top-nav__container"]}>
          <a href="/" className={styles["top-nav__logo"]}>
            <img src="/src/data_and_source/Images/logo.png" alt="Logo" />
          </a>

          <form 
            className={styles["top-nav__searchbar"]}
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchClick(e);
            }}
          >
            <input 
              type="text" 
              placeholder="Tìm kiếm tựa Light Novel, tác giả, ..." 
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setShowResults(true)}
            />
            {showResults && searchResults.length > 0 && (
              <div className={styles["top-nav__search-results"]}>
                {searchResults.map(novel => (
                  <div
                    key={novel.ID}
                    className={styles["top-nav__search-results-item"]}
                    onClick={() => handleSearchResultClick(novel.ID)}
                  >
                    <img 
                      src={novel["Link ảnh"]} 
                      alt={novel["Tựa đề"]}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/default-cover.jpg';
                      }}
                    />
                    <div className={styles["top-nav__search-results-item-info"]}>
                      <div className={styles["title"]}>{novel["Tựa đề"]}</div>
                      <div className={styles["author"]}>{novel["Tác giả"]}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className={styles["top-nav__searchbar__divider"]}></div>
            <button 
              type="button"
              className={styles["top-nav__searchbar__button"]}
              onClick={handleSearchClick}
              title="Tìm kiếm"
            >
              <i className="fas fa-search"></i>
            </button>
          </form>

          {/* <div className="top-nav__genres">
            <div className="genres-dropdown">
              <button className="genres-button">
                Thể loại <i className="fas fa-chevron-down"></i>
              </button>
              <div className="genres-list">
                {getAllGenres().map(genre => (
                  <button
                    key={genre}
                    onClick={() => handleGenreClick(genre)}
                    className="genre-item"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div> */}

          <div className={styles["top-nav__actions"]}>
            <button 
              className={styles["theme-toggle"]}
              onClick={toggleTheme}
              title="Chuyển đổi giao diện sáng/tối"
            >
              {isDarkMode ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </button>

            <Link to="/settings" className={styles["settings-button"]} title="Cài đặt">
              <i className="fas fa-cog"></i>
            </Link>

            <div className={styles["account-dropdown-container"]}>
              {isLoggedIn ? (
                <>
                  <button className={styles["top-nav__avatar"]} title="Tài khoản">
                    <img src={avatar} alt="Avatar" />
                  </button>

                  <div className={styles["account-dropdown"]}>
                    <div className={styles["dropdown-user-info"]}>
                      <img src={avatar} alt="Avatar" className={styles["dropdown-avatar"]} />
                      <div>
                        <h4>{userData?.fullName || 'Khách'}</h4>
                        <span>{userData?.email ? `@${userData.email}` : ''}</span>
                      </div>
                    </div>
                    <div className={styles["dropdown-menu"]}>
                      <Link to="/thanh-vien/:slug" className={styles["dropdown-item"]}>
                        <i className="fas fa-user"></i>
                        <span>Tài khoản</span>
                      </Link>
                      <Link to="/thong-bao" className={styles["dropdown-item"]}>
                        <i className="fas fa-bell"></i>
                        <span>Thông báo</span>
                        <span className="badge">3</span>
                      </Link>
                      <Link to="/lich-su-doc" className={styles["dropdown-item"]}>
                        <i className="fas fa-history"></i>
                        <span>Lịch sử đọc</span>
                      </Link>
                      <Link to="/danh-dau" className={styles["dropdown-item"]}>
                        <i className="fas fa-bookmark"></i>
                        <span>Đánh dấu</span>
                      </Link>
                      <Link to="/hop-thu" className={styles["dropdown-item"]}>
                        <i className="fas fa-envelope"></i>
                        <span>Hộp thư</span>
                        <span className="badge">1</span>
                      </Link>
                      <Link to="/thao-luan" className={styles["dropdown-item"]}>
                        <i className="fas fa-comments"></i>
                        <span>Thảo luận</span>
                      </Link>
                      <Link to="/tu-sach" className={styles["dropdown-item"]}>
                        <i className="fas fa-book"></i>
                        <span>Tủ sách</span>
                      </Link>
                      <Link to="/gio-hang" className={styles["dropdown-item"]}>
                        <i className="fas fa-shopping-cart"></i>
                        <span>Giỏ hàng</span>
                        <span className="badge">2</span>
                      </Link>
                      <button onClick={handleLogout} className={styles["dropdown-item__signout"]}>
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles["top-nav__signin-signup-buttons"]}>
                  <Link to="/signin" className={styles["signin-button"]}>Đăng nhập</Link>
                  <Link to="/signup" className={styles["signup-button"]}>Đăng ký</Link>
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