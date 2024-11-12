<<<<<<< HEAD
import Header from '/src/components/Header/Header';
import MainOfHome from './Main-of-Home/Main-of-Home';
import Footer from '/src/components/Footer/Footer';
=======
import { Routes, Route } from 'react-router-dom';
import Header from '../../components/Header/Header';
import MainOfHome from './Main-of-Home/Main-of-Home';
import AdvancedSearch from '../../features/Advanced-Search/AdvancedSearch';
import Footer from '../../components/Footer/Footer';
>>>>>>> main
import './Home-page.css';

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <MainOfHome />
      <Footer />
    </div>
  );
}

export default HomePage;