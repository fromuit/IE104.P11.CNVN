import Header from '/src/components/Header/Header';
import MainOfHome from './Main-of-Home/Main-of-Home';
import Footer from '/src/components/Footer/Footer';
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