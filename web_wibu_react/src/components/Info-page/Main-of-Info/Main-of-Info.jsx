import React from 'react';
import SectionOfInfo from './Section-of-Info/Section-of-info';
import AsideOfInfo from './Aside-of-Info/Aside-of-info';
import './Main-of-Info.css';

function MainOfInfo() {
  return (
    <main className="main-info">
      <div className="main-info__container">
        <SectionOfInfo />
        <AsideOfInfo />
      </div>
    </main>
  );
}

export default MainOfInfo;