import { useLocation } from 'react-router-dom';
import TopNav from './TopNav/TopNav';
import Banner from './Banner/Banner';
import BottomNav from './BottomNav/BottomNav';
// import './Header.css';
import styles from './Header.module.scss';

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAccountPage = location.pathname.startsWith('/thanh-vien/');

  if (isHomePage) {
    return (
      <header className={styles["header"]}>
        <TopNav />
        <Banner />
        <BottomNav />
      </header>
    );
  } 

  else if (isAccountPage) {
    return (
      <header className={styles["header--compact"]}>
        <TopNav />
        <BottomNav/>
      </header>
    );
  } 

  else {
    return (
      <header className={styles["header--compact"]}>
        <TopNav />
        <BottomNav />
        <Banner />
      </header>
    );
  }
}

export default Header;