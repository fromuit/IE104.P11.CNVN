import { useState, useMemo, useEffect } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import novelData from "../../../../data_and_source/truyen_data/hako_data.json";
import NovelStats from "../../../../data_and_source/NovelStats/NovelStats";
import './Section-of-Home.css';

// Component cho tiêu đề section
const SectionHeader = ({ title, link }) => (
  <div className="section__header">
    <h2 className="section__title">{title}</h2>
    <Link to={link} className="section__more">
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
  <div className="section__tabs">
    <button 
      className={`section__tab ${activeTab === 'week' ? 'active' : ''}`}
      onClick={() => onTabChange('week')}
    >
      Top tuần
    </button>
    <button 
      className={`section__tab ${activeTab === 'month' ? 'active' : ''}`}
      onClick={() => onTabChange('month')}
    >
      Top tháng
    </button>
    <button 
      className={`section__tab ${activeTab === 'year' ? 'active' : ''}`}
      onClick={() => onTabChange('year')}
    >
      Top năm
    </button>
    <button 
      className={`section__tab ${activeTab === 'all' ? 'active' : ''}`}
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
    <div className="novel-card">
      <Link 
        to={`/info/${novel.ID}`} 
        className="novel-card__image-link"
        onClick={() => onView(novel.ID)}
      >
        <div className="novel-card__image">
          <img src={novel["Link ảnh"]} alt={novel["Tựa đề"]} />
        </div>
        <div className="novel-card__info">
          <h3 className="novel-card__title">{novel["Tựa đề"]}</h3>
          <NovelStats novel={novel} variant={variant} isTopNovel={isTopNovel} />
        </div>
      </Link>
      <button 
        className={`novel-card__like-btn ${isLiked ? "liked" : ""}`}
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
  const limitedNovels = novels.slice(0, maxItems);
  const totalPages = Math.ceil(limitedNovels.length / itemsPerPage);

  useEffect(() => {
    setPage(0);
  }, [activeTab]);

  const currentNovels = limitedNovels.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  return (
    <div className="novel-grid-container">
      {showNavigation && page > 0 && (
        <button 
          className="novel-grid__nav novel-grid__nav--prev" 
          onClick={() => setPage(p => p - 1)}
          aria-label="Previous page"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
      )}
      
      <div className="novel-grid" key={`${activeTab}-${page}-${variant}`}>
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
          className="novel-grid__nav novel-grid__nav--next" 
          onClick={() => setPage(p => p + 1)}
          aria-label="Next page"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      )}

      {showNavigation && totalPages > 1 && (
        <div className="novel-grid__dots">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`novel-grid__dot ${index === page ? 'active' : ''}`}
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

// Custom hook để quản lý dữ liệu truyện
const useNovelData = () => {
  const [novels, setNovels] = useState(() => {
    const savedData = localStorage.getItem("novelData");
    return savedData ? JSON.parse(savedData) : novelData;
  });

  const [likedNovels, setLikedNovels] = useState(() => {
    const savedLikes = localStorage.getItem("likedNovels");
    return savedLikes ? JSON.parse(savedLikes) : {};
  });

  const incrementView = (novelId) => {
    setNovels(prevNovels => 
      prevNovels.map(novel => 
        novel.ID === novelId 
          ? { ...novel, "Số lượt xem": novel["Số lượt xem"] + 1 }
          : novel
      )
    );
  };

  const toggleLike = (novelId) => {
    const currentLikeStatus = likedNovels[novelId];

    setLikedNovels(prev => {
      const newLikedNovels = {
        ...prev,
        [novelId]: !prev[novelId]
      };
      localStorage.setItem("likedNovels", JSON.stringify(newLikedNovels));
      return newLikedNovels;
    });

    setNovels(prevNovels => {
      const updatedNovels = prevNovels.map(novel => 
        novel.ID === novelId 
          ? { 
              ...novel, 
              "Số like": currentLikeStatus 
                ? novel["Số like"] - 1 
                : novel["Số like"] + 1 
            }
          : novel
      );
      localStorage.setItem("novelData", JSON.stringify(updatedNovels));
      return updatedNovels;
    });
  };

  return { novels, likedNovels, incrementView, toggleLike };
};

// Hàm helper để sắp xếp truyện
const sortNovels = (novels, criteria) => {
  return [...novels].sort((a, b) => {
    switch (criteria) {
      case "view":
        return b["Số lượt xem"] - a["Số lượt xem"];
      case "like":
        return b["Số like"] - a["Số like"];
      case "date":
        const dateA = new Date(a["Năm cập nhật cuối"], a["Tháng cập nhật cuối"] - 1, a["Ngày cập nhật cuối"]);
        const dateB = new Date(b["Năm cập nhật cuối"], b["Tháng cập nhật cuối"] - 1, b["Ngày cập nhật cuối"]);
        return dateB - dateA;
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
    <div className="section">
      <section className="section__block">
        <SectionHeader title="Top truyện" link="/top-truyen" />
        <TopTabs activeTab={activeTopTab} onTabChange={setActiveTopTab} />
        <div className="novel-grid-wrapper">
          <NovelGrid 
            novels={processedData.topNovels[activeTopTab]}
            showNavigation={true}
            activeTab={activeTopTab}
            onView={incrementView}
            onLike={toggleLike}
            variant="original"
            isTopNovel={true}
            likedNovels={likedNovels}
          />
        </div>
      </section>

      <section className="section__block">
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

      <section className="section__block">
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

      <section className="section__block">
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

      <section className="section__block">
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