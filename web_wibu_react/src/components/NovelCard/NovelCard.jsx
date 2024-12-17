import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NovelStats from '../../data_and_source/Novel_Stats/Novel_Stats';
import styles from './NovelCard.module.scss';

const NovelCard = ({ novel, onView, onLike, isLiked }) => {
  return (
    <div className={styles.card}>
      <Link
        to={`/info/${novel.ID}`}
        className={styles.imageLink}
        onClick={() => onView(novel.ID)}
      >
        <div className={styles.image}>
          <img src={novel["Link ảnh"]} alt={novel["Tựa đề"]} />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{novel["Tựa đề"]}</h3>
          <NovelStats novel={novel} />
        </div>
      </Link>
      <button
        className={`${styles.likeBtn} ${isLiked ? styles.liked : ''}`}
        onClick={() => onLike(novel.ID)}
      >
        <i className="fas fa-heart"></i>
        <span>{novel["Số like"]}</span>
      </button>
    </div>
  );
};

NovelCard.propTypes = {
  novel: PropTypes.shape({
    ID: PropTypes.string.isRequired,
    "Tựa đề": PropTypes.string.isRequired,
    "Link ảnh": PropTypes.string.isRequired,
    "Số like": PropTypes.number.isRequired
  }).isRequired,
  onView: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired
};

export default NovelCard;