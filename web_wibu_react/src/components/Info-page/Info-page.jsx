import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import MainOfInfo from './Main-of-Info/Main-of-Info';
import Footer from '../Footer/Footer';
import './Info-page.css';

function InfoPage() {
  const { id } = useParams();

  return (
    <div className="info-page">
      <Header />
      <MainOfInfo id={id} />
      <Footer />
    </div>
  );
}

export default InfoPage;