import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Home-page/Home-page';  // Sửa đường dẫn import
import InfoPage from './components/Info-page/Info-page';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/truyen/:slug" element={<InfoPage />} />
      </Routes>
    </div>
  );
}

export default App;