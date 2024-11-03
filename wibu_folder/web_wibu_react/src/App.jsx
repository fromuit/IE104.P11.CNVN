import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Home-page/Home-page';
import InfoPage from './components/Info-page/Info-page';
import Login from './components/Auth/login/login';
import Signup from './components/Auth/signup/signup';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/truyen/:slug" element={<InfoPage />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/dang-ky" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App; 