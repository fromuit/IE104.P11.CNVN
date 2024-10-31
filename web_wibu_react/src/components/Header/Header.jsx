
import TopNav from './TopNav/TopNav';
import Banner from './Banner/Banner';
import BottomNav from './BottomNav/BottomNav';
import useScrollHeader from '../../hooks/useScrollHeader';
import './Header.css';

const Header = () => {
  useScrollHeader();
  return (
    <header className="header">
      <TopNav />
      <Banner />
      <BottomNav />
      <Banner />
      <Banner />
    </header>
  );
};

export default Header;