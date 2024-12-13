import Header from '../../components/Header/Header';
import MainOfHome from './Main-of-Home/Main-of-Home';
import Footer from '../../components/Footer/Footer';
import styles from './Home-page.module.scss';

function HomePage() {
  return (
    <div className={styles["home-page"]}>
      <Header />
      <MainOfHome />
      <Footer />
    </div>
  );
}

export default HomePage;