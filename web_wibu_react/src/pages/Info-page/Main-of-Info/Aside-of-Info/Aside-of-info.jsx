import React from 'react';
// import './Aside-of-info.css';
import styles from './Aside-of-Info.module.scss';

function AsideOfInfo() {
  return (
    <aside className={styles["aside-info"]}>
      {/* Thông tin người dịch */}
      <div className={styles["translator-info"]}>
        <div className={styles["translator-avatar"]}>
          <img src="/path-to-avatar.jpg" alt="Translator Avatar" />
        </div>
        <div className={styles["translator-details"]}>
          <h3>Chim Trắng Mồ Côi</h3>
          <p className={styles["translator-role"]}>Nhóm dịch</p>
          <p className={styles["translator-type"]}>Một Thành Viên</p>
        </div>
      </div>

      {/* Thông tin thêm */}
      <div className={styles["aside-note"]}>
        <div className={styles["note-item"]}>
          <h3>Chú thích</h3>
          <span className={styles["note-value"]}>Dịch từ nguồn ENG</span>
        </div>
      </div>

      {/* Có thể bạn quan tâm */}
      <div className={styles["related-novels"]}>
        <h3>Có thể bạn quan tâm</h3>
        {/* Danh sách truyện liên quan */}
      </div>
    </aside>
  );
}

export default AsideOfInfo;
