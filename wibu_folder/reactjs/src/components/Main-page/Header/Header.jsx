import React from 'react';
import TopNav from './TopNav/TopNav';
import Banner from './Banner/Banner';
import BottomNav from './BottomNav/BottomNav';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <TopNav />
      <Banner />
      <BottomNav />
    </header>
  );
}

export default Header;