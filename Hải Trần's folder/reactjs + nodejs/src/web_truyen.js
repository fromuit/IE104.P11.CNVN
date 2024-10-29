// src/components/Header.js
// import React from 'react';
import './styles/Header.css'; // Giả sử bạn đã chuyển CSS vào file riêng

const Header = () => {
    return (
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
                                <button type="submit"><i className="fa fa-search"></i></button>
                            </div>
                            <button className="theme-toggle" aria-label="Toggle dark mode">
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
                    <img src="383cea039f33224c68dc7bae58660f9b_547677403341742960.png" alt="Banner 1" className="banner-image active"/>
                    <img src="image.png" alt="Banner 2" className="banner-image"/>
                    <img src="463776822_560257616376871_4920691297219730697_n.jpg" alt="Banner 3" className="banner-image"/>
                    <button className="banner-nav prev" aria-label="Previous banner">&#10094;</button>
                    <button className="banner-nav next" aria-label="Next banner">&#10095;</button>
                    <div className="banner-dots">
                        <span className="dot active"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            </div>

            <nav className="bottom-nav">
              <ul>
                  <li><a href="#categories">Thể loại</a></li>
                  <li><a href="#release-schedule">Lịch phát hành</a></li>
                  <li><a href="#store">Cửa hàng</a></li>
                  <li><a href="#write">Sáng tác</a></li>
                  <li><a href="#rankings">Bảng xếp hạng</a></li>
                  <li><a href="#rules">Quy định</a></li>
              </ul>
            </nav>
        </header>
    );
}

export default Header;