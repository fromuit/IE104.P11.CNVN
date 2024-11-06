import React from 'react';
import Header from '../Header/Header';
import MainOfInfo from './Main-of-Info/Main-of-Info';
import Footer from '../Footer/Footer';
import './Info-page.css';

function InfoPage() {
  return (
    <div className="info-page">
      <Header />
      <MainOfInfo />
      <Footer />
    </div>  
  );
}

export default InfoPage;