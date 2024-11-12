import { useParams } from 'react-router-dom';
<<<<<<< HEAD
import Header from '/src/components/Header/Header';
import MainOfAccount from './Main-of-Account/Main-of-Account';
import Footer from '/src/components/Footer/Footer';
=======
import Header from '../../components/Header/Header';
import MainOfAccount from './Main-of-Account/Main-of-Account';
import Footer from '../../components/Footer/Footer';
>>>>>>> main
import './Account-page.css';

function AccountPage() {
  const { id } = useParams();
  
  return (
    <div className="account-page">
      <Header />
      <MainOfAccount userId={id} />
      <Footer />
    </div>
  );
}

export default AccountPage;

