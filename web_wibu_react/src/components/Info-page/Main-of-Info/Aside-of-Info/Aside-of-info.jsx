import React from 'react';
import './Aside-of-info.css';

function AsideOfInfo() {
  return (
    <aside className="aside-info">
      {/* Thông tin người dịch */}
      <div className="translator-info">
        <div className="translator-avatar">
          <img src="/path-to-avatar.jpg" alt="Translator Avatar" />
        </div>
        <div className="translator-details">
          <h3>Chim Trắng Mồ Côi</h3>
          <p className="translator-role">Nhóm dịch</p>
          <p className="translator-type">Một Thành Viên</p>
        </div>
      </div>

      {/* Thông tin thêm */}
      <div className="additional-info">
        <div className="info-item">
          <span className="info-label">Chú thích thêm</span>
          <span className="info-value">Dịch từ nguồn ENG</span>
        </div>
      </div>

      {/* Có thể bạn quan tâm */}
      <div className="related-novels">
        <h3>Có thể bạn quan tâm</h3>
        {/* Danh sách truyện liên quan */}
      </div>
    </aside>
  );
}

export default AsideOfInfo;
