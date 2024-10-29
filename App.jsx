import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State declarations
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [username, setUsername] = useState(() => localStorage.getItem('username') || 'Khách');

  // Banner auto-scroll effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        prevIndex === 2 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Banner images array
  const bannerImages = [
    'banner1.jpg',
    'banner2.jpg',
    'banner3.jpg'
  ];

  return (
    <div className={`app ${theme === 'dark' ? 'dark-theme' : ''}`}>
      <header>
        <div className="header-container">
          <nav className="top-nav">
            <div className="top-nav-container">
              <a href="/" className="logo">
                <img src="logo.png" alt="Web Logo" />
              </a>
              <div className="top-nav-items">
                <div className="search-bar">
                  <input type="text" placeholder="Tìm kiếm..." />
                  <button type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
                <button 
                  className="theme-toggle" 
                  aria-label="Toggle dark mode"
                  onClick={() => {
                    const newTheme = theme === 'light' ? 'dark' : 'light';
                    setTheme(newTheme);
                    localStorage.setItem('theme', newTheme);
                  }}
                >
                  <span className="theme-toggle-dark">🌙</span>
                  <span className="theme-toggle-light">☀️</span>
                </button>
                <button className="settings">
                  <i className="fa fa-cog"></i>
                </button>
              </div>
            </div>
          </nav>

          <div className="banner">
            <div className="banner-container">
              {bannerImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Banner ${index + 1}`}
                  className={index === currentBannerIndex ? 'active' : ''}
                />
              ))}
              <div className="banner-dots">
                {bannerImages.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === currentBannerIndex ? 'active' : ''}`}
                    onClick={() => setCurrentBannerIndex(index)}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <nav className="bottom-nav">
          <div className="bottom-nav-container">
            <ul>
              <li><a href="#home">Trang chủ</a></li>
              <li><a href="#ln">Light Novel</a></li>
              <li><a href="#manga">Manga</a></li>
              <li><a href="#forum">Diễn đàn</a></li>
              <li><a href="#news">Tin tức</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        <article>
          <section className="ln-section">
            <h2>Light Novel mới cập nhật</h2>
            <div className="ln-grid">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="ln-item">
                  <img src={`ln${item}.jpg`} alt={`Light Novel ${item}`} />
                  <h3>Tên Light Novel {item}</h3>
                  <p>Tập {item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="ln-section">
            <h2>Light Novel nổi bật</h2>
            <div className="ln-grid">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="ln-item">
                  <img src={`ln-popular${item}.jpg`} alt={`Light Novel nổi bật ${item}`} />
                  <h3>Light Novel nổi bật {item}</h3>
                  <p>Lượt xem: {item}k</p>
                </div>
              ))}
            </div>
          </section>

          <section className="ln-section">
            <h2>Light Novel đề cử</h2>
            <div className="ln-grid">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="ln-item">
                  <img src={`ln-recommended${item}.jpg`} alt={`Light Novel đề cử ${item}`} />
                  <h3>Light Novel đề cử {item}</h3>
                  <p>Rating: {item}/5</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <aside className="user">
          <div className="user-panel">
            <div className="user-info">
              <img src="avatar-default.png" alt="User Avatar" className="avatar" />
              <h3>Xin chào, {username}!</h3>
            </div>
            {username === 'Khách' ? (
              <div className="auth-buttons">
                <button className="login-btn">Đăng nhập</button>
                <button className="register-btn">Đăng ký</button>
              </div>
            ) : (
              <div className="user-menu">
                <button>Tủ truyện</button>
                <button>Cài đặt</button>
                <button onClick={() => {
                  setUsername('Khách');
                  localStorage.setItem('username', 'Khách');
                }}>
                  Đăng xuất
                </button>
              </div>
            )}
          </div>

          <div className="reading-history">
            <h3>Lịch sử đọc</h3>
            <ul>
              {[1, 2, 3].map((item) => (
                <li key={item}>
                  <a href={`#history-${item}`}>Light Novel đã đọc {item}</a>
                  <span>Chapter {item}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;