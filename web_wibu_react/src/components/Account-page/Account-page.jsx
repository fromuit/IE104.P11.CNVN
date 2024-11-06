import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import MainOfAccount from './Main-of-Account/Main-of-Account';
import Footer from '../Footer/Footer';
import './Account-page.css';

function AccountPage() {
  const { id } = useParams();
  
  return (
    <div className="account-page">
      <Header />
      <MainOfAccount userId={id} />
      <Footer />
    </div>
  );
}

export default AccountPage;

