import SectionOfInfo from './Section-of-Info/Section-of-Info';
import AsideOfInfo from './Aside-of-Info/Aside-of-info';
// import './Main-of-Info.css';
import styles from './Main-of-Info.module.scss';
import PropTypes from 'prop-types';

function MainOfInfo({novel}) {
  return (
    <main className={styles["main-info"]}>
      <div className={styles["main-info-container"]}>
        <div className={styles["main-info-cover"]}>
          <img src={novel["Link ảnh"]} alt={novel["Tựa đề"]} />
        </div>
        <div className={styles["main-info-content"]}>
          <SectionOfInfo novel={novel} />
          <AsideOfInfo novel={novel} />
        </div>
      </div>
    </main>
  );
}

MainOfInfo.propTypes = {
  novel: PropTypes.object.isRequired
};

export default MainOfInfo;