import React from 'react';
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

function Section() {
  const [activeTopTab, setActiveTopTab] = React.useState('week');

  // Data mẫu cho novels
  const sampleNovels = Array(6).fill({
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
        <div className="novel-grid">
          {sampleNovels.map((novel, index) => (
            <NovelCard key={index} novel={novel} />
          ))}
        </div>
      </section>

      {/* Mới cập nhật */}
      <section className="section__block">
        <SectionHeader title="Mới cập nhật" link="/moi-cap-nhat" />
        <div className="novel-grid">
          {sampleNovels.map((novel, index) => (
            <NovelCard key={index} novel={novel} />
          ))}
        </div>
      </section>

      {/* Các section khác tương tự */}
      <section className="section__block">
        <SectionHeader title="Truyện mới" link="/truyen-moi" />
        <div className="novel-grid">
          {sampleNovels.map((novel, index) => (
            <NovelCard key={index} novel={novel} />
          ))}
        </div>
      </section>

      <section className="section__block">
        <SectionHeader title="Truyện sáng tác" link="/truyen-sang-tac" />
        <div className="novel-grid">
          {sampleNovels.map((novel, index) => (
            <NovelCard key={index} novel={novel} />
          ))}
        </div>
      </section>
      <section className="section__block">
        <SectionHeader title="Truyện đã hoàn thành" link="/truyen-da-hoan-thanh" />
        <div className="novel-grid">
          {sampleNovels.map((novel, index) => (
            <NovelCard key={index} novel={novel} />
          ))}
        </div>
      </section>
      <section className="section__block">
        <SectionHeader title="Series" link="/series" />
        <div className="novel-grid">
          {sampleNovels.map((novel, index) => (
            <NovelCard key={index} novel={novel} />
          ))}
        </div>
      </section>
      <section className="section__block">
        <SectionHeader title="Oneshot" link="/oneshot" />
        <div className="novel-grid">
          {sampleNovels.map((novel, index) => (
            <NovelCard key={index} novel={novel} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Section;