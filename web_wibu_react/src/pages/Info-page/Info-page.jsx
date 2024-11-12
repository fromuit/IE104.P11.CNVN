import { useParams } from 'react-router-dom';
<<<<<<< HEAD
import Header from '/src/components/Header/Header';
import MainOfInfo from './Main-of-Info/Main-of-Info';
import Footer from '/src/components/Footer/Footer';
=======
import Header from '../../components/Header/Header';
import MainOfInfo from './Main-of-Info/Main-of-Info';
import Footer from '../../components/Footer/Footer';
>>>>>>> main
import novelData from '../../data_and_source/Novel_Data/hako_data.json';
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