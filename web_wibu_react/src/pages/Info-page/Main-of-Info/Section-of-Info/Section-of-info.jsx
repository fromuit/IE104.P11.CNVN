// import './Section-of-info.css';
import styles from './Section-of-Info.module.scss';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { fetchChapters } from '../../../../pages/Info-page/Tool-for-chapters/chapterApi';

function SectionOfInfo({ novel }) {
  SectionOfInfo.propTypes = {
    novel: PropTypes.shape({
      "Tựa đề": PropTypes.string,
      "Fname": PropTypes.string,
      "Thể loại": PropTypes.arrayOf(PropTypes.string),
      "Tác giả": PropTypes.string,
      "Họa sĩ": PropTypes.string,
      "Tình trạng": PropTypes.string,
      "Số từ": PropTypes.number,
      "Số like": PropTypes.number
    })
  };

  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadChapters = async () => {
      if (!novel["Tựa đề"]) return;
      
      setLoading(true);
      try {
        const chaptersList = await fetchChapters(novel["Tựa đề"]);
        setChapters(chaptersList);
      } catch (err) {
        setError(err.message);
        console.error("Lỗi khi tải chương:", err);
      } finally {
        setLoading(false);
      }
    };

    loadChapters();
  }, [novel["Tựa đề"]]);

  if (!novel) {
    console.log("No novel data received"); // Debug
    return <div className="not-found">Không tìm thấy truyện</div>;
  }

  console.log("Rendering novel:", novel); // Debug

  const formatDate = (day, month, year) => {
    return `${day}/${month}/${year}`;
  };

  return (
    <section className={styles["section-info"]}>
      <div className={styles["novel-basic-info"]}>
        <h1 className={styles["novel-title"]}>{novel["Tựa đề"]}</h1>
        {novel["Fname"] && novel["Fname"] !== "NOT FOUND" && (
          <h2 className={styles["novel-alt-title"]}>{novel["Fname"]}</h2>
        )}
        
        <div className="novel-genres">
          {novel["Thể loại"].filter(genre => genre !== "").map((genre, index) => (
            <span key={index} className={styles["genre-tag"]}>{genre}</span>
          ))}
        </div>

        <div className={styles["novel-author-info"]}>
          <div className={styles["meta-item"]}>
            <span className={styles["meta-label"]}>Tác giả:</span>
            <span className={styles["meta-value"]}>{novel["Tác giả"]}</span>
          </div>
          <div className={styles["meta-item"]}>
            <span className={styles["meta-label"]}>Họa sĩ:</span>
            <span className={styles["meta-value"]}>
              {novel["Họa sĩ"] !== "NOT FOUND" ? novel["Họa sĩ"] : "Chưa cập nhật"}
            </span>
          </div>
          <div className={styles["meta-item"]}>
            <span className={styles["meta-label"]}>Tình trạng:</span>
            <span className={`${styles["meta-value"]} ${styles["status-tag"]} ${styles[novel["Tình trạng"].toLowerCase().replace(/ /g, "-")]}`}>
              {novel["Tình trạng"]}
            </span>
          </div>
        </div>

        <div className={styles["novel-stats"]}>
          <div className={styles["stat-box"]}>
            <i className="fas fa-book"></i>
            <div className={styles["stat-content"]}>
              <span className={styles["stat-value"]}>{novel["Số từ"].toLocaleString()}</span>
              <span className={styles["stat-label"]}>Từ</span>
            </div>
          </div>
          <div className={styles["stat-box"]}>
            <i className="fas fa-heart"></i>
            <div className={styles["stat-content"]}>
              <span className={styles["stat-value"]}>{novel["Số like"]}</span>
              <span className={styles["stat-label"]}>Lượt thích</span>
            </div>
          </div>
          <div className={styles["stat-box"]}>
            <i className="fas fa-eye"></i>
            <div className={styles["stat-content"]}>
              <span className={styles["stat-value"]}>{novel["Số lượt xem"].toLocaleString()}</span>
              <span className={styles["stat-label"]}>Lượt xem</span>
            </div>
          </div>
        </div>

        <div className={styles["novel-additional-info"]}>
          <div className={styles["add-info-row"]}>
            <span className={styles["add-info-label"]}>Nhóm dịch</span>
            <a href={novel["Link nhóm dịch"]} className={styles["add-info-value--link"]}>
              {novel["Nhóm dịch"]}
            </a>
          </div>
          <div className={styles["add-info-row"]}>
            <span className={styles["add-info-label"]}>Người dịch</span>
            <a href={novel["Link người dịch"]} className={styles["add-info-value--link"]}>
              {novel["Người dịch"]}
            </a>
          </div>
          <div className={styles["add-info-row"]}>
            <span className={styles["add-info-label"]}>Số tập</span>
            <span className={styles["add-info-value"]}>{novel["Số tập"]}</span>
          </div>
          <div className={styles["add-info-row"]}>
            <span className={styles["add-info-label"]}>Số chương</span>
            <span className={styles["add-info-value"]}>{novel["Số chương"]}</span>
          </div>
          <div className={styles["add-info-row"]}>
            <span className={styles["add-info-label"]}>Cập nhật lần cuối</span>
            <span className={styles["add-info-value"]}>
              {formatDate(
                novel["Ngày cập nhật cuối"],
                novel["Tháng cập nhật cuối"],
                novel["Năm cập nhật cuối"]
              )}
            </span>
          </div>
        </div>
      </div>
      
      <div className={styles["chapters-list"]}>
        <h3 className={styles["chapters-title"]}>Danh sách chương</h3>
        {loading && <div>Đang tải danh sách chương...</div>}
        {error && <div className={styles["error-message"]}>{error}</div>}
        {chapters.length > 0 && (
          <div className={styles["chapters-grid"]}>
            {chapters.map((chapter, index) => {
              const chapterName = chapter
                .replace('.html', '')
                .replace(/-/g, ' ')
                .replace(/_/g, ' ')
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

              return (
                <div key={index} className={styles["chapter-item-container"]}>
                  <a 
                    href={`/read/${encodeURIComponent(novel["Tựa đề"])}/${encodeURIComponent(chapter)}`}
                    className={styles["chapter-item"]}
                  >
                    <span className={styles["chapter-number"]}>Chương {index + 1}:</span>
                    <span className={styles["chapter-name"]}>{chapterName}</span>
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default SectionOfInfo;
