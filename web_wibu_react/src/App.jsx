import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Home-page/Home-page';  
import InfoPage from './components/Info-page/Info-page';
import AccountPage from './components/Account-page/Account-page';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/truyen/:slug" element={<InfoPage />} />
        <Route path="/thanh-vien/:id" element={<AccountPage />} />
      </Routes>
    </div>
  );
}

export default App;