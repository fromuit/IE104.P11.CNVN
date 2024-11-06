import React from 'react';
import './Section-of-info.css';
import novelData from "../../../../../public/truyen_data/hako_data.json";

function SectionOfInfo() {
  // Dữ liệu mẫu - sau này có thể lấy từ API hoặc props
  const novelData = {
    title: "Nguyên tắc của một Triết gia, được viết bởi Kẻ Ngốc Vĩnh Cửu \"Asley\"",
    originalTitle: "The Principle of a Philosopher by Eternal Fool \"Asley\"\nYuukyuu no Gusha Asley no, Kenja no Susume\n悠久の愚者アズリーの、賢者のすゝめ\n悠久愚者阿兹利的贤者之道",
    genres: [
      "Adventure",
      "Action",
      "Comedy",
      "Fantasy",
      "Magic",
      "Romance",
      "School Life",
      "Super Power",
      "Web Novel",
      "Psychological",
      "Drama",
      "Mystery",
      "Slice of Life"
    ],
    author: {
      name: "Hifumi",
      artist: "Kurihito Muto"
    },
    status: "Đang tiến hành",
    stats: {
      wordCount: "22.670",
      rating: {
        score: 318,
        total: 41
      },
      views: "27.842",
      comments: 84
    },
    type: "Truyện dịch",
    originalLanguage: "japanese",
    format: "light novel",
    volumes: 1,
    chapters: 8,
    dates: {
      start: "05/05/2021",
      lastUpdate: "11/03/2022"
    },
    hasAdaptation: {
      manga: "Yes",
      anime: "Not sure",
      cd: "Not sure"
    }
  };

  // Các action buttons mẫu
  const actionButtons = [
    { id: 'read', label: 'Đọc tiếp', primary: true },
    { id: 'rating', label: 'Đánh giá' },
    { id: 'toc', label: 'Mục lục' },
    { id: 'discuss', label: 'Bàn luận' },
    { id: 'share', label: 'Chia sẻ' }
  ];

  return (
    <section className="section-info">
      {/* Thông tin cơ bản */}
      <div className="novel-basic-info">
        <h1 className="novel-title">{novelData.title}</h1>
        <div className="novel-genres">
          {novelData.genres.map((genre, index) => (
            <span key={index} className="genre">{genre}</span>
          ))}
        </div>
        <div className="novel-author">
          <span>Tác giả: </span>
          <span className="author-name" title={novelData.author.artist}>
            {novelData.author.name}
          </span>
        </div>
        <div className="novel-status">
          <span>Tình trạng: </span>
          <span className="status">{novelData.status}</span>
        </div>
      </div>

      {/* Các nút tương tác */}
      <div className="novel-actions">
        {actionButtons.map(button => (
          <button 
            key={button.id}
            className={`action-btn ${button.primary ? 'read-btn' : `${button.id}-btn`}`}
          >
            {button.label}
          </button>
        ))}
      </div>

      {/* Thống kê */}
      <div className="novel-stats">
        <div className="stat-item">
          <span className="stat-label">Số từ</span>
          <span className="stat-value">{novelData.stats.wordCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Đánh giá</span>
          <span className="stat-value">
            {`${novelData.stats.rating.score} / ${novelData.stats.rating.total}`}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Lượt xem</span>
          <span className="stat-value">{novelData.stats.views}</span>
        </div>
      </div>

      {/* Tóm tắt */}
      <div className="novel-summary">
        <h2>Tóm tắt</h2>
        <p>
          Chưa có tóm tắt cho truyện này.
        </p>
      </div>

      {/* Danh sách chương */}
      <div className="chapter-list">
        <h2>Mục lục</h2>
        <div className="chapters">
          <p>Chưa có chương nào.</p>
        </div>
      </div>
    </section>
  );
}

export default SectionOfInfo;
