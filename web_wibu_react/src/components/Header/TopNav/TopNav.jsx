import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TopNav.css';

const TopNav = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <nav className="top-nav">
      <div className="top-nav-container">
        <Link to="/" className="logo">
          <img src="/images/logo.png" alt="Web Logo" />
        </Link>
        <div className="top-nav-items">
          <div className="search-bar">
            <input type="text" placeholder="Tìm kiếm..." />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            <span className="theme-toggle-dark" style={{ display: darkMode ? 'none' : 'inline' }}>🌙</span>
            <span className="theme-toggle-light" style={{ display: darkMode ? 'inline' : 'none' }}>☀️</span>
          </button>
          <button className="settings">
            <i className="fa fa-cog"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;