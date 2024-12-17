import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './NovelListPage.module.scss';
import NovelCard from '../NovelCard/NovelCard';
import { useNovelData } from '../../../hooks/useNovelData.js';
import { sortNovels } from '../../../utils/novelUtils.js';

const NovelListPage = ({ 
  title, 
  filterFn, 
  sortFn = sortNovels,
  showTabs = false,
  defaultTab = 'week' 
}) => {
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const [currentPage, setCurrentPage] = useState(1);
  const { novels, likedNovels, incrementView, toggleLike } = useNovelData();
  const itemsPerPage = 20;

  const filteredNovels = useMemo(() => {
    let result = novels;
    
    if (filterFn) {
      result = filterFn(result);
    }
    
    if (sortFn) {
      result = sortFn(result, showTabs ? currentTab : 'date');
    }
    
    return result;
  }, [novels, filterFn, sortFn, currentTab]);

  const totalPages = Math.ceil(filteredNovels.length / itemsPerPage);
  const currentNovels = filteredNovels.slice(
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
        <h1>{title}</h1>
        {showTabs && (
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${currentTab === 'week' ? styles.active : ''}`}
              onClick={() => setCurrentTab('week')}
            >
              Top tuần
            </button>
            <button 
              className={`${styles.tab} ${currentTab === 'month' ? styles.active : ''}`}
              onClick={() => setCurrentTab('month')}
            >
              Top tháng
            </button>
            <button 
              className={`${styles.tab} ${currentTab === 'year' ? styles.active : ''}`}
              onClick={() => setCurrentTab('year')}
            >
              Top năm
            </button>
            <button 
              className={`${styles.tab} ${currentTab === 'all' ? styles.active : ''}`}
              onClick={() => setCurrentTab('all')}
            >
              Top toàn thời gian
            </button>
          </div>
        )}
      </div>

      <div className={styles.grid}>
        {currentNovels.map(novel => (
          <NovelCard
            key={novel.ID}
            novel={novel}
            onView={incrementView}
            onLike={toggleLike}
            isLiked={likedNovels[novel.ID]}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className={styles.pageBtn}
          >
            <i className="fas fa-chevron-left"></i>
            Trang {currentPage - 1}
          </button>
          
          <div className={styles.pageNumbers}>
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              // Hiển thị 5 số trang xung quanh trang hiện tại
              if (
                pageNumber === 1 || 
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`${styles.pageNumber} ${currentPage === pageNumber ? styles.active : ''}`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === currentPage - 3 ||
                pageNumber === currentPage + 3
              ) {
                return <span key={pageNumber} className={styles.ellipsis}>...</span>;
              }
              return null;
            })}
          </div>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className={styles.pageBtn}
          >
            Trang {currentPage + 1}
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default NovelListPage;