import React from 'react';
import './Main-of-Account.css';

// Dữ liệu mẫu cho các user
const USER_DATA = {
  '4214': {
    username: 'Umi-chan no.4214',
    level: 13,
    exp: {
      current: 158.75,
      next: 843.75
    },
    stats: {
      chapters: 17,
      following: 756,
      comments: 374
    },
    oldNames: [],
    joinDate: '08/04/2020',
    novels: []
  },
  '5179': {
    username: 'Yuki-chan',
    level: 8,
    exp: {
      current: 245.50,
      next: 500.00
    },
    stats: {
      chapters: 5,
      following: 234,
      comments: 127
    },
    oldNames: ['Yuki'],
    joinDate: '15/06/2021',
    novels: [
      {
        title: 'Sống chung với nữ thần lạnh lùng, tôi đã chiều chuộng đến mức khiến cho cô ấy trở nên lười biếng',
        status: 'Đã hoàn thành'
      }
    ]
  }
};

function MainOfAccount({ userId }) {
  // Lấy thông tin user dựa trên userId
  const userData = USER_DATA[userId] || {
    username: 'Không tìm thấy người dùng',
    level: 0,
    exp: { current: 0, next: 0 },
    stats: { chapters: 0, following: 0, comments: 0 },
    oldNames: [],
    joinDate: '',
    novels: []
  };

  return (
    <div className="main-account">
      <div className="user-info">
        <div className="user-header">
          <h2 className="username">{userData.username}</h2>
          <div className="user-level">
            <span>Cấp {userData.level} ({userData.exp.current} / {userData.exp.next})</span>
          </div>
        </div>

        <div className="user-stats">
          <div className="stat-item">
            <span className="stat-number">{userData.stats.chapters}</span>
            <span className="stat-label">Chương đã đăng</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{userData.stats.following}</span>
            <span className="stat-label">Đang theo dõi</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{userData.stats.comments}</span>
            <span className="stat-label">Bình luận</span>
          </div>
        </div>

        <div className="user-details">
          {userData.oldNames.length > 0 && (
            <p><strong>Tên cũ:</strong> {userData.oldNames.join(', ')}</p>
          )}
          <p><strong>Tham gia:</strong> {userData.joinDate}</p>
        </div>
      </div>

      <div className="user-novels">
        <section className="novel-section">
          <h3>Truyện đã đăng</h3>
          {userData.novels.length === 0 ? (
            <div className="no-novels">Không có truyện nào</div>
          ) : (
            <div className="novel-list">
              {userData.novels.map((novel, index) => (
                <div key={index} className="novel-item">
                  <h4>{novel.title}</h4>
                  <p className="novel-status">Tình trạng: {novel.status}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default MainOfAccount;