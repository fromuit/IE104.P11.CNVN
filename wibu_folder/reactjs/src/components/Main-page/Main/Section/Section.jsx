import React from 'react';
import { Link } from 'react-router-dom';
import './Section.css';
import { useState,useEffect} from 'react';
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
import PropTypes from 'prop-types';
// Component cho Novel Card
const NovelCard = ({ novel }) => (
  <Link to={`/truyen/${novel.slug}`} className="novel-card">
    <div className="novel-card__image">
      <img src={novel.cover} alt={novel.title} />
    </div>
    <div className="novel-card__info">
      <h3 className="novel-card__title">{novel.title}</h3>
      {/* Thêm thông tin khác sau */}
    </div>
  </Link>
);

// Cập nhật NovelCard component để hiển thị thêm thông tin
const NovelCard = ({ novel }) => (
  <Link to={`/truyen/${novel.slug}`} className="novel-card">
    <div className="novel-card__image">
      <img src={novel.cover} alt={novel.title} />
    </div>
    <div className="novel-card__info">
      <h3 className="novel-card__title">{novel.title}</h3>
      <div className="novel-card__meta">
        <span>{novel.author}</span>
        <span>{novel.views} lượt xem</span>
      </div>
      <div className="novel-card__chapters">
        Chương {novel.totalChapters}
      </div>
    </div>
  </Link>
);

function Section() {
  const [activeTopTab, setActiveTopTab] = React.useState('week');
  const [slideDirection, setSlideDirection] = React.useState('slide-right');
  const [topNovels, setTopNovels] = useState([]);
  const [recentNovels, setRecentNovels] = useState([]);
  const [newNovels, setNewNovels] = useState([]);
  const [completedNovels, setCompletedNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seriesNovels, setSeriesNovels] = useState([]);
  const [oneshotNovels, setOneshotNovels] = useState([]);

  // Thêm hàm xử lý chuyển tab
  const handleTabChange = (newTab) => {
    // Đảm bảo mảng tabOrder chứa đầy đủ các tab giống như trong TopTabs component
    const tabOrder = ['week', 'month', 'year', 'all']; // Kiểm tra xem các giá trị này có khớp với các tab value của bạn không
    const currentIndex = tabOrder.indexOf(activeTopTab);
    const newIndex = tabOrder.indexOf(newTab);

    const fetchNovels = async (endpoint) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/${endpoint}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Lỗi khi tải dữ liệu từ ${endpoint}:`, error);
        return [];
      }
    };
  
    //hàm fetch data
    useEffect(() => {
      const loadAllData = async () => {
        setLoading(true);
        try {
          // Log để debug
          console.log('API URL:', process.env.REACT_APP_API_URL);
          
          const [top, recent, latest, completed, series, oneshot] = await Promise.all([
            fetchNovels(`top-novels/${activeTopTab}`),
            fetchNovels('recent-novels'),
            fetchNovels('new-novels'),
            fetchNovels('completed-novels'),
            fetchNovels('series-novels'),
            fetchNovels('oneshot-novels')
          ]);
    
          // Log response để debug
          console.log('API Response:', {
            top, recent, latest, completed, series, oneshot
          });
    
          setTopNovels(top);
          setRecentNovels(recent);
          setNewNovels(latest);
          setCompletedNovels(completed);
          setSeriesNovels(series);
          setOneshotNovels(oneshot);
        } catch (error) {
          console.error('Lỗi khi tải dữ liệu:', error);
        } finally {
          setLoading(false);
        }
      };
    
      loadAllData();
    }, [activeTopTab]);
    
    // Reset animation trước khi thêm animation mới
    setSlideDirection('');
    
    // Sử dụng setTimeout để đảm bảo DOM được cập nhật
    setTimeout(() => {
      if (currentIndex !== -1 && newIndex !== -1) {
        setSlideDirection(currentIndex < newIndex ? 'slide-left' : 'slide-right');
      }
      setActiveTopTab(newTab);
    }, 10);
  };

  // Data mẫu cho novels
  const sampleNovels = Array(6).fill({
    title: "Tên Light Novel",
    slug: "ten-light-novel",
    cover: "/path-to-cover.jpg"
  });

  return (
    <div className="section">
      {loading ? (
        <div className="loading">Đang tải...</div>
      ) : (
        <>
      {/* Top truyện */}
      <section className="section__block">
            <SectionHeader title="Top truyện" link="/top-truyen" />
            <TopTabs activeTab={activeTopTab} onTabChange={handleTabChange} />
            <div className={`novel-grid ${slideDirection}`}>
              {topNovels.map((novel) => (
                <NovelCard key={novel.id} novel={novel} />
              ))}
            </div>
          </section>

      {/* Mới cập nhật */}
      <section className="section__block">
            <SectionHeader title="Mới cập nhật" link="/moi-cap-nhat" />
            <div className="novel-grid">
              {recentNovels.map((novel) => (
                <NovelCard key={novel.id} novel={novel} />
              ))}
            </div>
          </section>

      {/* Các section khác tương tự */}
      <section className="section__block">
            <SectionHeader title="Truyện mới" link="/truyen-moi" />
            <div className="novel-grid">
              {newNovels.map((novel) => (
                <NovelCard key={novel.id} novel={novel} />
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
              {completedNovels.map((novel) => (
                <NovelCard key={novel.id} novel={novel} />
              ))}
            </div>
          </section>
          <section className="section__block">
            <SectionHeader title="Series" link="/series" />
            <div className="novel-grid">
              {seriesNovels.map((novel) => (
                <NovelCard key={novel.id} novel={novel} />
              ))}
            </div>
          </section>

          <section className="section__block">
            <SectionHeader title="Oneshot" link="/oneshot" />
            <div className="novel-grid">
              {oneshotNovels.map((novel) => (
                <NovelCard key={novel.id} novel={novel} />
              ))}
            </div>
          </section>
      </>
    )}
    </div>
  );
}

export default Section;