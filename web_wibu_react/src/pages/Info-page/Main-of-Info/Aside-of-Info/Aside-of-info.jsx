import styles from './Aside-of-Info.module.scss';
import PropTypes from 'prop-types';

function AsideOfInfo({ novel }) {
  AsideOfInfo.propTypes = {
    novel: PropTypes.shape({
      "Người dịch": PropTypes.string,
      "Nhóm dịch": PropTypes.string,
      "Link người dịch": PropTypes.string,
      "Link nhóm dịch": PropTypes.string,
      "Ngôn ngữ gốc": PropTypes.string
    })
  };

  return (
    <aside className={styles["aside-info"]}>
      {/* Thông tin người dịch */}
      <div className={styles["translator-info"]}>
        <div className={styles["translator-avatar"]}>
          <img src="/path-to-avatar.jpg" alt="Translator Avatar" />
        </div>
        <div className={styles["translator-details"]}>
          <h3>
            <a href={novel?.["Link người dịch"]} className={styles["translator-link"]}>
              {novel?.["Người dịch"] || "Không có thông tin"}
            </a>
          </h3>
          <p className={styles["translator-role"]}>Nhóm dịch</p>
          <p className={styles["translator-type"]}>
            <a href={novel?.["Link nhóm dịch"]} className={styles["group-link"]}>
              {novel?.["Nhóm dịch"] || "Không có thông tin"}
            </a>
          </p>
        </div>
      </div>

      {/* Thông tin thêm */}
      <div className={styles["aside-note"]}>
        <div className={styles["note-item"]}>
          <h3>Chú thích</h3>
          <span className={styles["note-value"]}>
            Dịch từ nguồn {novel?.["Ngôn ngữ gốc"]?.charAt(0).toUpperCase() + novel?.["Ngôn ngữ gốc"]?.slice(1).toLowerCase() || "Eng"}
          </span>
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
