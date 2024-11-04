import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
const NovelCard = ({ novel }) => (
  <Link to={`/truyen/${novel.slug}`} className="novel-card">
    <div className="novel-card__image">
      <img src={novel.cover} alt={novel.title} />
    </div>
    <div className="novel-card__info">
      <h3 className="novel-card__title">{novel.title}</h3>
      
    </div>
  </Link>
);

const NovelGrid = ({ novels, showNavigation = false, activeTab }) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(novels.length / itemsPerPage);

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
  const [activeTopTab, setActiveTopTab] = useState('week');
  const [topNovels, setTopNovels] = useState({
    week: Array(12).fill({ title: "Top Tuần - Light Novel", slug: "ten-light-novel", cover: "/path-to-cover.jpg" }),
    month: Array(12).fill({ title: "Top Tháng - Light Novel", slug: "ten-light-novel", cover: "/path-to-cover.jpg" }),
    year: Array(12).fill({ title: "Top Năm - Light Novel", slug: "ten-light-novel", cover: "/path-to-cover.jpg" }),
    all: Array(12).fill({ title: "Top All - Light Novel", slug: "ten-light-novel", cover: "/path-to-cover.jpg" })
  });

  // Sample data for other sections
  const sampleNovels = Array(12).fill({
    title: "Tên Light Novel",
    slug: "ten-light-novel",
    cover: "/path-to-cover.jpg"
  });

  return (
    <div className="section">
      {/* Top truyện */}
      <section className="section__block">
        <SectionHeader title="Top truyện" link="/top-truyen" />
        <TopTabs activeTab={activeTopTab} onTabChange={setActiveTopTab} />
        <div className="novel-grid-wrapper">
          <NovelGrid 
            novels={topNovels[activeTopTab]} 
            showNavigation={true}
            activeTab={activeTopTab}
          />
        </div>
      </section>

      {/* Other sections */}
      <section className="section__block">
        <SectionHeader title="Mới cập nhật" link="/moi-cap-nhat" />
        <NovelGrid novels={sampleNovels} showNavigation={true} />
      </section>

      <section className="section__block">
        <SectionHeader title="Truyện mới" link="/truyen-moi" />
        <NovelGrid novels={sampleNovels} showNavigation={true} />
      </section>

      <section className="section__block">
        <SectionHeader title="Truyện sáng tác" link="/truyen-sang-tac" />
        <NovelGrid novels={sampleNovels} showNavigation={true} />
      </section>

      <section className="section__block">
        <SectionHeader title="Truyện đã hoàn thành" link="/truyen-da-hoan-thanh" />
        <NovelGrid novels={sampleNovels} showNavigation={true} />
      </section>

      <section className="section__block">
        <SectionHeader title="Series" link="/series" />
        <NovelGrid novels={sampleNovels} showNavigation={true} />
      </section>

      <section className="section__block">
        <SectionHeader title="Oneshot" link="/oneshot" />
        <NovelGrid novels={sampleNovels} showNavigation={true} />
      </section>

      {/* ... other sections with NovelGrid ... */}
    </div>
  );
}

export default Section;