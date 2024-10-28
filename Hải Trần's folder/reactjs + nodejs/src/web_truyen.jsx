// src/components/Header.js
import React from 'react';
import './styles/Header.css'; // Giả sử bạn đã chuyển CSS vào file riêng

function Header() {
    return (
        <header>
            <div className="header-container">
                <nav class="top-nav">
                    <div class="top-nav-container">
                        <a href="/" class="logo">
                            <img src="logo.png" alt="Web Logo" />
                        </a>
                        <div class="top-nav-items">
                            <div class="search-bar">
                                <input type="text" placeholder="Tìm kiếm..." />
                                <button type="submit"><i class="fa fa-search"></i></button>
                            </div>
                            <button class="theme-toggle" aria-label="Toggle dark mode">
                                <span class="theme-toggle-dark">🌙</span>
                                <span class="theme-toggle-light">☀️</span>
                            </button>
                            <button class="settings">
                                <i class="fa fa-cog"></i>
                            </button>
                        </div>
                    </div>
                </nav>

                <div class="banner">
                    <img src="383cea039f33224c68dc7bae58660f9b_547677403341742960.png" alt="Banner 1" class="banner-image active"/>
                    <img src="image.png" alt="Banner 2" class="banner-image"/>
                    <img src="463776822_560257616376871_4920691297219730697_n.jpg" alt="Banner 3" class="banner-image"/>
                    <button class="banner-nav prev" aria-label="Previous banner">&#10094;</button>
                    <button class="banner-nav next" aria-label="Next banner">&#10095;</button>
                    <div class="banner-dots">
                        <span class="dot active"></span>
                        <span class="dot"></span>
                    </div>
                </div>
            </div>

            <nav class="bottom-nav">
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