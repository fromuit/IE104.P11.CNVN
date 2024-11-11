import { useState, useEffect } from 'react';
import './Main-of-Account.css';

/**
 * Component hiển thị thông tin tài khoản người dùng
 * @returns {JSX.Element} MainOfAccount component
 */
function MainOfAccount() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const currentUser = localStorage.getItem("currentUser");
    const token = localStorage.getItem("token");

    if (currentUser && token) {
      try {
        const user = JSON.parse(currentUser);
        // Kiểm tra xem có đủ thông tin user không
        if (user) {
          setUserData({
            username: user.username,
            email: user.email,
            // Thêm các thông tin khác mà bạn lưu trong SignIn
            stats: {
              chapters: 0, // Có thể cập nhật sau từ API
              following: 0,
              comments: 0
            },
            joinDate: new Date(user.createdAt || Date.now()).toLocaleDateString("vi-VN"),
            novels: [] // Có thể cập nhật sau từ API
          });
        }
      } catch (error) {
        console.error("Lỗi khi parse thông tin người dùng:", error);
      }
    }
  }, []);

  // Kiểm tra nếu người dùng chưa đăng nhập
  if (!userData) {
    return (
      <div className="main-account">
        <div className="not-logged-in">
          <h2>Vui lòng đăng nhập để xem thông tin tài khoản</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="main-account">
      <div className="user-info">
        <div className="user-header">
          <h2 className="username">{userData.username}</h2>
          <div className="user-email">{userData.email}</div>
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
          <p>
            <strong>Tham gia:</strong> {userData.joinDate}
          </p>
        </div>
      </div>

      <div className="content-sections">
        <div className="user-novels">
          <section className="novel-section">
            <h3>
              <i className="fas fa-book"></i> Truyện đã đăng
            </h3>
            {userData.novels.length === 0 ? (
              <div className="no-novels">Chưa có truyện nào được đăng</div>
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

        <div className="favorite-novels">
          <section className="novel-section">
            <h3>
              <i className="fas fa-heart"></i> Truyện đã thích
            </h3>
            {userData.favorites?.length === 0 ? (
              <div className="no-novels">Chưa có truyện yêu thích nào</div>
            ) : (
              <div className="novel-list">
                {(userData.favorites || []).map((novel, index) => (
                  <div key={index} className="novel-item">
                    <div className="novel-cover">
                      <img src={novel.coverImage || "default-cover.jpg"} alt={novel.title} />
                    </div>
                    <div className="novel-info">
                      <h4>{novel.title}</h4>
                      <p className="novel-author">Tác giả: {novel.author}</p>
                      <p className="last-read">
                        Đã thích: {new Date(novel.likedAt).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="reading-history">
          <section className="novel-section">
            <h3>
              <i className="fas fa-history"></i> Lịch sử đọc
            </h3>
            {userData.history?.length === 0 ? (
              <div className="no-novels">Chưa có lịch sử đọc</div>
            ) : (
              <div className="novel-list">
                {/* Add your reading history component here */}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainOfAccount;