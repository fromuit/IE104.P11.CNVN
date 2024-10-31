import TopNav from './TopNav/TopNav';
import Banner from './Banner/Banner';
import SubNav from './SubNav/SubNav';
import './Header.css';

const Header = () => {
  return (
    <>
      <TopNav />
      <div className="content-wrapper">
        <Banner />
        <SubNav />
      </div>
    </>
  );
};

export default Header;