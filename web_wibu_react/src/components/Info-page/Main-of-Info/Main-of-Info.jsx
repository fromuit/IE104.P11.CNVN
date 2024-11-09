import SectionOfInfo from './Section-of-Info/Section-of-info';
import AsideOfInfo from './Aside-of-Info/Aside-of-info';
import './Main-of-Info.css';
import PropTypes from 'prop-types';

function MainOfInfo({novel}) {
  return (
    <main className="main-info">
      <div className="main-info__container">
        <div className="main-info__cover">
          <img src={novel["Link ảnh"]} alt={novel["Tựa đề"]} />
        </div>
        <div className="main-info__content">
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