import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NovelPages.module.scss';
import { useNovelData } from '../../../../../hooks/useNovelData';
import NovelStats from '../../../../data_and_source/Novel_Stats/Novel_Stats';

function CompletedNovelsPage() {
  const { novels, likedNovels, incrementView, toggleLike } = useNovelData();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Lọc truyện đã hoàn thành
  const completedNovels = novels.filter(novel => novel["Tình trạng"] === "Đã hoàn thành");
  
  // Tính toán phân trang
  const totalPages = Math.ceil(completedNovels.length / itemsPerPage);
  const currentNovels = completedNovels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.homeButton}>
          <i className="fas fa-home"></i>
          Về trang chủ
        </Link>
        <h1>Truyện Đã Hoàn Thành</h1>
      </div>

      <div className={styles.grid}>
        {currentNovels.map(novel => (
          <div key={novel.ID} className={styles.novelCard}>
            <Link
              to={`/info/${novel.ID}`}
              className={styles.imageLink}
              onClick={() => incrementView(novel.ID)}
            >
              <div className={styles.image}>
                <img src={novel["Link ảnh"]} alt={novel["Tựa đề"]} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.title}>{novel["Tựa đề"]}</h3>
                <NovelStats novel={novel} variant="completed" />
              </div>
            </Link>
            <button
              className={`${styles.likeBtn} ${likedNovels[novel.ID] ? styles.liked : ""}`}
              onClick={() => toggleLike(novel.ID)}
            >
              <i className="fas fa-heart"></i>
              <span>{novel["Số like"]}</span>
            </button>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            className={styles.pageBtn}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            <i className="fas fa-chevron-left"></i> Trang trước
          </button>
          <span className={styles.pageInfo}>
            Trang {currentPage} / {totalPages}
          </span>
          <button 
            className={styles.pageBtn}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Trang sau <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default CompletedNovelsPage;