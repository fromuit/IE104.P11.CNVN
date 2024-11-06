import React, { useState, useMemo, useEffect } from "react";
import { Link } from 'react-router-dom';
import novelData from "../../../../../public/truyen_data/hako_data.json";
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

// Component cho Novel Card
// Trong component NovelCard
// Component cho Novel Card - Cập nhật để sử dụng dữ liệu thực
const NovelCard = ({ novel }) => (
  <Link to={`/truyen/${novel.ID}`} className="novel-card">
    <div className="novel-card__image">
      <img src={novel["Link ảnh"]} alt={novel["Tựa đề"]} />
    </div>
    <div className="novel-card__info">
      <h3 className="novel-card__title">{novel["Tựa đề"]}</h3>
      <div className="novel-card__stats">
        <span>{novel["Số lượt xem"].toLocaleString()} lượt xem</span>
        <span>{novel["Số like"]} likes</span>
      </div>
    </div>
  </Link>
);


const NovelGrid = ({ novels, showNavigation = false, activeTab }) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(novels.length / itemsPerPage);

  // Reset page khi tab thay đổi
  React.useEffect(() => {
    setPage(0);
  }, [activeTab]);

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handleDotClick = (index) => {
    setPage(index);
  };

  const currentNovels = novels.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <div className="novel-grid-container">
      {showNavigation && page > 0 && (
        <button className="novel-grid__nav novel-grid__nav--prev" onClick={handlePrev}>
          <i className="fas fa-chevron-left"></i>
        </button>
      )}
      
      <div className="novel-grid">
        {currentNovels.map((novel, index) => (
          <NovelCard key={`${novel.slug}-${index}`} novel={novel} />
        ))}
      </div>

      {showNavigation && page < totalPages - 1 && (
        <button className="novel-grid__nav novel-grid__nav--next" onClick={handleNext}>
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
              onClick={() => handleDotClick(index)}
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

  // Xử lý dữ liệu cho các section khác nhau
  const processedData = useMemo(() => {
    return {
      topNovels: {
        week: sortNovels(novelData, "view").slice(0, 12),
        month: sortNovels(novelData, "like").slice(0, 12),
        year: sortNovels(novelData, "date").slice(0, 12),
        all: novelData.slice(0, 12)
      },
      recentlyUpdated: sortNovels(novelData, "date").slice(0, 12),
      newNovels: novelData.filter(novel => novel["Tình trạng"] === "Đang tiến hành").slice(0, 12),
      completed: novelData.filter(novel => novel["Tình trạng"] === "Đã hoàn thành").slice(0, 12),
      original: novelData.filter(novel => novel["Phương thức dịch"] === "Sáng tác").slice(0, 12)
    };
  }, []);

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
          />
        </div>
      </section>

      {/* Mới cập nhật */}
      <section className="section__block">
        <SectionHeader title="Mới cập nhật" link="/moi-cap-nhat" />
        <NovelGrid novels={processedData.recentlyUpdated} showNavigation={true} />
      </section>

      {/* Truyện mới */}
      <section className="section__block">
        <SectionHeader title="Truyện mới" link="/truyen-moi" />
        <NovelGrid novels={processedData.newNovels} showNavigation={true} />
      </section>

      {/* Truyện đã hoàn thành */}
      <section className="section__block">
        <SectionHeader title="Truyện đã hoàn thành" link="/truyen-da-hoan-thanh" />
        <NovelGrid novels={processedData.completed} showNavigation={true} />
      </section>

      {/* Truyện sáng tác */}
      <section className="section__block">
        <SectionHeader title="Truyện sáng tác" link="/truyen-sang-tac" />
        <NovelGrid novels={processedData.original} showNavigation={true} />
      </section>
    </div>
  );
}

export default Section;