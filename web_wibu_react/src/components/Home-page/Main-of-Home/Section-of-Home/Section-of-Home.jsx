import React, { useState, useMemo, useEffect } from "react";
import { Link } from 'react-router-dom';
import novelData from "../../../../../src/assets/truyen_data/hako_data.json";
import NovelStats from "../../../Novels/NovelStats/NovelStats";
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

// Custom hook để quản lý dữ liệu truyện
const useNovelData = () => {
  // Khởi tạo state từ localStorage hoặc dữ liệu mặc định
  const [novels, setNovels] = useState(() => {
    const savedData = localStorage.getItem("novelData");
    return savedData ? JSON.parse(savedData) : novelData;
  });

  // Lưu thay đổi vào localStorage
  useEffect(() => {
    localStorage.setItem("novelData", JSON.stringify(novels));
  }, [novels]);

  // Hàm cập nhật lượt xem
  const incrementView = (novelId) => {
    setNovels(prevNovels => 
      prevNovels.map(novel => 
        novel.ID === novelId 
          ? { ...novel, "Số lượt xem": novel["Số lượt xem"] + 1 }
          : novel
      )
    );
  };

  // Hàm cập nhật lượt thích
  const toggleLike = (novelId) => {
    setNovels(prevNovels => 
      prevNovels.map(novel => 
        novel.ID === novelId 
          ? { ...novel, "Số like": novel["Số like"] + 1 }
          : novel
      )
    );
  };

  // Hàm cập nhật đánh giá
  const updateRating = (novelId, rating) => {
    setNovels(prevNovels => 
      prevNovels.map(novel => 
        novel.ID === novelId 
          ? {
              ...novel,
              "Số lượt đánh giá": novel["Số lượt đánh giá"] + 1,
              // Thêm logic tính rating trung bình nếu cần
            }
          : novel
      )
    );
  };

  return {
    novels,
    incrementView,
    toggleLike,
    updateRating
  };
};

// Component cho Novel Card
// Trong component NovelCard
// Cập nhật component NovelCard 
const NovelCard = ({ novel, onView, onLike, variant, isTopNovel }) => (
  <div className="novel-card">
    <Link 
      to={`/truyen/${novel.ID}`} 
      className="novel-card__image-link"
      onClick={() => onView(novel.ID)}
    >
      <div className="novel-card__image">
        <img src={novel["Link ảnh"]} alt={novel["Tựa đề"]} />
      </div>
      <div className="novel-card__info">
        <h3 className="novel-card__title">{novel["Tựa đề"]}</h3>
        <NovelStats
          views={novel["Số lượt xem"]}
          likes={novel["Số like"]}
          chapters={variant === "completed" ? novel["Số chương"] : undefined}
          wordCount={variant === "completed" ? novel["Số từ"] : undefined}
          lastUpdated={variant === "recent" ? {
            day: novel["Ngày cập nhật cuối"],
            month: novel["Tháng cập nhật cuối"],
            year: novel["Năm cập nhật cuối"]
          } : undefined}
          startDate={variant === "new" ? {
            month: novel["Tháng bắt đầu"],
            year: novel["Năm bắt đầu"]
          } : undefined}
          variant={isTopNovel ? "top" : variant} // Thêm điều kiện này
          showLikes={false}
        />
      </div>
    </Link>
    <button 
      className="novel-card__like-btn"
      onClick={() => onLike(novel.ID)}
    >
      <i className="fas fa-heart"></i>
      <span>{novel["Số like"]}</span>
    </button>
  </div>
);


const NovelGrid = ({ novels, showNavigation = false, activeTab, variant, onView, onLike, isTopNovel }) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 6; // Hiển thị 6 truyện mỗi trang (3x2)
  const maxItems = 18; // Tổng số truyện tối đa
  const limitedNovels = novels.slice(0, maxItems); // Giới hạn tổng số truyện
  const totalPages = Math.ceil(limitedNovels.length / itemsPerPage);

  // Reset page khi tab thay đổi
  useEffect(() => {
    setPage(0);
  }, [activeTab]);

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  // Lấy các truyện cho trang hiện tại
  const currentNovels = limitedNovels.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  return (
    <div className="novel-grid-container">
      {/* Nút Previous */}
      {showNavigation && page > 0 && (
        <button 
          className="novel-grid__nav novel-grid__nav--prev" 
          onClick={handlePrev}
          aria-label="Previous page"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
      )}
      
      {/* Grid truyện */}
      <div className="novel-grid">
        {currentNovels.map((novel, index) => (
          <NovelCard 
            key={`${novel.ID}-${index}`} 
            novel={novel}
            onView={onView}
            onLike={onLike}
            variant={variant}
            isTopNovel={isTopNovel}
          />
        ))}
      </div>

      {/* Nút Next */}
      {showNavigation && page < totalPages - 1 && (
        <button 
          className="novel-grid__nav novel-grid__nav--next" 
          onClick={handleNext}
          aria-label="Next page"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      )}

      {/* Dots navigation */}
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

function Section() {
  const [activeTopTab, setActiveTopTab] = useState("week");
  const { novels, incrementView, toggleLike, updateRating } = useNovelData();

  // Xử lý dữ liệu cho các section khác nhau
  const processedData = useMemo(() => {
    return {
      topNovels: {
        week: sortNovels(novels, "view").slice(0, 12),
        month: sortNovels(novels, "like").slice(0, 12),
        year: sortNovels(novels, "date").slice(0, 12),
        all: novels.slice(0, 12)
      },
      recentlyUpdated: sortNovels(novels, "date").slice(0, 12),
      newNovels: novels.filter(novel => novel["Tình trạng"] === "Đang tiến hành").slice(0, 12),
      completed: novels.filter(novel => novel["Tình trạng"] === "Đã hoàn thành").slice(0, 12),
      original: novels.filter(novel => novel["Phương thức dịch"] === "Sáng tác").slice(0, 12)
    };
  }, [novels]);

  return (
    <div className="section">
      {/* Top truyện */}
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
            isTopNovel={true} // Thêm prop này
          />
        </div>
      </section>

      {/* Mới cập nhật */}
      <section className="section__block">
        <SectionHeader title="Mới cập nhật" link="/moi-cap-nhat" />
        <NovelGrid 
          novels={processedData.recentlyUpdated} 
          showNavigation={true}
          onView={incrementView}
          onLike={toggleLike}
          variant="recent"
        />
      </section>

      {/* Truyện mới */}
      <section className="section__block">
        <SectionHeader title="Truyện mới" link="/truyen-moi" />
        <NovelGrid 
          novels={processedData.newNovels} 
          showNavigation={true}
          onView={incrementView}
          onLike={toggleLike}
          variant="new"
        />
      </section>

      {/* Truyện đã hoàn thành */}
      <section className="section__block">
        <SectionHeader title="Truyện đã hoàn thành" link="/truyen-da-hoan-thanh" />
        <NovelGrid 
          novels={processedData.completed} 
          showNavigation={true}
          onView={incrementView}
          onLike={toggleLike}
          variant="completed"
        />
      </section>

      {/* Truyện sáng tác */}
      <section className="section__block">
        <SectionHeader title="Truyện sáng tác" link="/truyen-sang-tac" />
        <NovelGrid 
          novels={processedData.original} 
          showNavigation={true}
          onView={incrementView}
          onLike={toggleLike}
          variant="original"
        />
      </section>
    </div>
  );
}

export default Section;