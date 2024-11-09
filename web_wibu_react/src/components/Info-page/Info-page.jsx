import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import MainOfInfo from './Main-of-Info/Main-of-Info';
import Footer from '../Footer/Footer';
import novelData from '../../data_and_source/truyen_data/hako_data.json';
import './Info-page.css';

function InfoPage() {
  const { id } = useParams();
  
  console.log("Current URL:", window.location.pathname);
  console.log("ID from params:", id);
  
  const novel = novelData.find(novel => String(novel.ID) === String(id));
  
  console.log("Found novel:", novel);

  if (!novel) {
    return (
      <div className="info-page">
        <Header />
        <div className="not-found">Không tìm thấy truyện</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="info-page">
      <Header />
      <MainOfInfo novel={novel} />
      <Footer />
    </div>  
  );
}

export default InfoPage;