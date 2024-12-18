import Header from '../../components/Header/Header';
import MainOfHome from './Main-of-Home/Main-of-Home';
import Footer from '../../components/Footer/Footer';
import styles from './Home-page.module.scss';
import TopOfPageButton from "../../features/Top_of_Page_Button/Top_of_Page_Button";

function HomePage() {
  return (
    <div className={styles["home-page"]}>
      <Header />
      <MainOfHome />
      <TopOfPageButton />
      <Footer />
    </div>
  );
}

export default HomePage;