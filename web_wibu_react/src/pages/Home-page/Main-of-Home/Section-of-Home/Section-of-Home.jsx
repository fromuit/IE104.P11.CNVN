import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useNovelData } from '../../../../../hooks/useNovelData.js';
import NovelStats from '../../../../data_and_source/Novel_Stats/Novel_Stats';
import { getNewNovels } from '../../../../../utils/novelUtils.js';
import styles from './Section-of-Home.module.scss';

// Component cho tiêu đề section
const SectionHeader = ({ title, link }) => (
  <div className={styles["section__header"]}>
    <h2 className={styles["section__title"]}>{title}</h2>
    <Link to={link} className={styles["section__more"]}>
      Xem thêm <i className="fas fa-chevron-right"></i>
    </Link>
  </div>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

// Component cho tabs của Top truyện
const TopTabs = ({ activeTab, onTabChange }) => (
  <div className={styles["section__tabs"]}>
    <button
      className={`${styles["section__tab"]} ${activeTab === 'week' ? styles["section__tab--active"] : ''}`}
      onClick={() => onTabChange('week')}
    >
      Top tuần
    </button>
    <button
      className={`${styles["section__tab"]} ${activeTab === 'month' ? styles["section__tab--active"] : ''}`}
      onClick={() => onTabChange('month')}
    >
      Top tháng
    </button>
    <button
      className={`${styles["section__tab"]} ${activeTab === 'year' ? styles["section__tab--active"] : ''}`}
      onClick={() => onTabChange('year')}
    >
      Top năm
    </button>
    <button
      className={`${styles["section__tab"]} ${activeTab === 'all' ? styles["section__tab--active"] : ''}`}
      onClick={() => onTabChange('all')}
    >
      Top toàn thời gian
    </button>
  </div>
);

TopTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired
};

// Component cho Novel Card
const NovelCard = ({ novel, onView, onLike, variant, isTopNovel, likedNovels }) => {
  const isLiked = likedNovels[novel.ID];

  return (
    <div className={styles["novel-card"]}>
      <Link
        to={`/info/${novel.ID}`}
        className={styles["novel-card__image-link"]}
        onClick={() => onView(novel.ID)}
      >
        <div className={styles["novel-card__image"]}>
          <img src={novel["Link ảnh"]} alt={novel["Tựa đề"]} />
        </div>
        <div className={styles["novel-card__info"]}>
          <h3 className={styles["novel-card__title"]}>{novel["Tựa đề"]}</h3>
          <NovelStats novel={novel} variant={variant} isTopNovel={isTopNovel} />
        </div>
      </Link>
      <button
        className={`${styles["novel-card__like-btn"]} ${isLiked ? styles["liked"] : ""}`}
        onClick={() => onLike(novel.ID)}
      >
        <i className="fas fa-heart"></i>
        <span>{novel["Số like"]}</span>
      </button>
    </div>
  );
};

NovelCard.propTypes = {
  novel: PropTypes.object.isRequired,
  onView: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  variant: PropTypes.string,
  isTopNovel: PropTypes.bool,
  likedNovels: PropTypes.object.isRequired
};

// Component cho Novel Grid
const NovelGrid = ({ novels, showNavigation, activeTab, variant, onView, onLike, isTopNovel, likedNovels }) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;
  const maxItems = 16;

  // Nếu là section truyện mới, sử dụng getNewNovels để lấy và sắp xếp
  const displayNovels = variant === 'new' 
    ? getNewNovels(novels, maxItems)
    : novels.slice(0, maxItems);

  const totalPages = Math.ceil(displayNovels.length / itemsPerPage);

  useEffect(() => {
    setPage(0);
  }, [activeTab]);

  const currentNovels = displayNovels.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  return (
    <div className={styles["novel-grid-container"]}>
      {showNavigation && page > 0 && (
        <button
          className={`${styles["novel-grid__nav"]} ${styles["novel-grid__nav--prev"]}`}
          onClick={() => setPage(p => p - 1)}
          aria-label="Previous page"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
      )}

      <div className={styles["novel-grid"]} key={`${activeTab}-${page}-${variant}`}>
        {currentNovels.map((novel, index) => (
          <NovelCard
            key={`${novel.ID}-${index}`}
            novel={novel}
            onView={onView}
            onLike={onLike}
            variant={variant}
            isTopNovel={isTopNovel}
            likedNovels={likedNovels}
          />
        ))}
      </div>

      {showNavigation && page < totalPages - 1 && (
        <button
          className={`${styles["novel-grid__nav"]} ${styles["novel-grid__nav--next"]}`}
          onClick={() => setPage(p => p + 1)}
          aria-label="Next page"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      )}

      {showNavigation && totalPages > 1 && (
        <div className={styles["novel-grid__dots"]}>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`${styles["novel-grid__dot"]} ${index === page ? styles["active"] : ''}`}
              onClick={() => setPage(index)}
              aria-label={`Page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

NovelGrid.propTypes = {
  novels: PropTypes.array.isRequired,
  showNavigation: PropTypes.bool,
  activeTab: PropTypes.string,
  variant: PropTypes.string,  
  onView: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  isTopNovel: PropTypes.bool,
  likedNovels: PropTypes.object.isRequired
};

// Hàm helper để sắp xếp truyện
const sortNovels = (novels, criteria) => {
  return [...novels].sort((a, b) => {
    switch (criteria) {
      case "view":
        return b["Số lượt xem"] - a["Số lượt xem"];
      case "like":
        return b["Số like"] - a["Số like"];
      case "date": {
        let dateA = new Date(a["Năm cập nhật cuối"], a["Tháng cập nhật cuối"] - 1, a["Ngày cập nhật cuối"]);
        let dateB = new Date(b["Năm cập nhật cuối"], b["Tháng cập nhật cuối"] - 1, b["Ngày cập nhật cuối"]); 
        return dateB - dateA;
      }
      default:
        return 0;
    }
  });
};

// Main Section Component
function Section() {
  const [activeTopTab, setActiveTopTab] = useState("week");
  const { novels, likedNovels, incrementView, toggleLike } = useNovelData();

  const processedData = useMemo(() => ({
    topNovels: {
      week: sortNovels(novels, "view").slice(0, 16),
      month: sortNovels(novels, "view").slice(0, 16),
      year: sortNovels(novels, "view").slice(0, 16),
      all: sortNovels(novels, "view").slice(0, 16)
    },
    recentlyUpdated: sortNovels(novels, "date").slice(0, 16),
    newNovels: novels.filter(novel => novel["Tình trạng"] === "Đang tiến hành").slice(0, 16),
    completed: novels.filter(novel => novel["Tình trạng"] === "Đã hoàn thành").slice(0, 16),
    original: novels.filter(novel => novel["Phương thức dịch"] === "Sáng tác").slice(0, 16)
  }), [novels]);

  return (
    <div className={styles["section"]}>
      <section className={styles["section__block"]}>
        <SectionHeader
          title="Top truyện"
          link={`/top-truyen?tab=${activeTopTab}`}
        />
        <TopTabs activeTab={activeTopTab} onTabChange={setActiveTopTab} />
        <div className={styles["novel-grid-wrapper"]}>
          <NovelGrid
            novels={processedData.topNovels[activeTopTab]}
            showNavigation={true}
            activeTab={activeTopTab}
            onView={incrementView}
            onLike={toggleLike}
            variant="top"
            isTopNovel={true}
            likedNovels={likedNovels}
          />
        </div>
      </section>

      <section className={styles["section__block"]}>
        <SectionHeader title="Mới cập nhật" link="/moi-cap-nhat" />
        <NovelGrid
          novels={processedData.recentlyUpdated}
          showNavigation={true}
          onView={incrementView}
          onLike={toggleLike}
          variant="recent"
          likedNovels={likedNovels}
        />
      </section>

      <section className={styles["section__block"]}>
        <SectionHeader title="Truyện mới" link="/truyen-moi" />
        <NovelGrid
          novels={processedData.newNovels}
          showNavigation={true}
          onView={incrementView}
          onLike={toggleLike}
          variant="new"
          likedNovels={likedNovels}
        />
      </section>

      <section className={styles["section__block"]}>
        <SectionHeader title="Truyện đã hoàn thành" link="/truyen-da-hoan-thanh" />
        <NovelGrid
          novels={processedData.completed}
          showNavigation={true}
          onView={incrementView}
          onLike={toggleLike}
          variant="completed"
          likedNovels={likedNovels}
        />
      </section>

      <section className={styles["section__block"]}>
        <SectionHeader title="Truyện sáng tác" link="/truyen-sang-tac" />
        <NovelGrid
          novels={processedData.original}
          showNavigation={true}
          onView={incrementView}
          onLike={toggleLike}
          variant="original"
          likedNovels={likedNovels}
        />
      </section>
    </div>
  );
}

export default Section;