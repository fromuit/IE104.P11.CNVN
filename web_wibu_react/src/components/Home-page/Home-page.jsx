import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import MainOfHome from './Main-of-Home/Main-of-Home';
import AdvancedSearch from '../Advanced-Search/AdvancedSearch';
import Footer from '../Footer/Footer';
import './Home-page.css';

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <Routes>
        <Route path="/" element={<MainOfHome />} />
        <Route path="/tim-kiem-nang-cao" element={<AdvancedSearch />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default HomePage;