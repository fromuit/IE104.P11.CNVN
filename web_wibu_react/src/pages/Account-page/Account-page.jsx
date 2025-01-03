import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import MainOfAccount from './Main-of-Account/Main-of-Account';
import TopOfPageButton from "../../features/Top_of_Page_Button/Top_of_Page_Button";
import Footer from '../../components/Footer/Footer';
import styles from './Account-page.module.scss'
function AccountPage() {
  const { id } = useParams();
  
  return (
    <div className={styles["account-page"]}>
      <Header />
      <MainOfAccount userId={id} />
      <TopOfPageButton />
      <Footer />
    </div>
  );
}

export default AccountPage;

