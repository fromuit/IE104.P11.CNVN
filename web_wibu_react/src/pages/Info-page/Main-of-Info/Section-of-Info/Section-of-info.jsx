// Import các module và styles cần thiết
import styles from './Section-of-Info.module.scss';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import novelsData from '../../../../data_and_source/Novel_Data/novels_chapters.json';
import { Link } from 'react-router-dom';

function SectionOfInfo({ novel }) {
  // Định nghĩa PropTypes để kiểm tra kiểu dữ liệu của props
  SectionOfInfo.propTypes = {
    novel: PropTypes.shape({
      "Tựa đề": PropTypes.string,
      "Fname": PropTypes.string,
      "Thể loại": PropTypes.arrayOf(PropTypes.string),
      "Tác giả": PropTypes.string,
      "Họa sĩ": PropTypes.string,
      "Tình trạng": PropTypes.string,
      "Số từ": PropTypes.number,
      "Số like": PropTypes.number,
      "Link nhóm dịch": PropTypes.string,
      "Nhóm dịch": PropTypes.string,
      "Số lượt xem": PropTypes.string,
      "Người dịch": PropTypes.string,
      "Số tập":PropTypes.number,
      "Số chương": PropTypes.number,
      "Link người dịch": PropTypes.string,
      "Ngày cập nhật cuối": PropTypes.string,
      "Tháng cập nhật cuối": PropTypes.string,
      "Năm cập nhật cuối": PropTypes.string
    })
  };

  // Khởi tạo các state cần thiết
  const [chapters, setChapters] = useState([]); // Lưu trữ danh sách chương
  const [loading, setLoading] = useState(false); // Trạng thái đang tải
  const [error, setError] = useState(null); // Lưu trữ lỗi nếu có

  useEffect(() => {
    // Hàm tải danh sách chương từ dữ liệu
    const loadChapters = () => {
      // Kiểm tra xem có tựa đề truyện không
      if (!novel["Tựa đề"]) return;

      setLoading(true);
      try {
        // Chuyển tựa đề sang chữ thường để tìm kiếm
        const novelTitle = novel["Tựa đề"].toLowerCase();

        // Lấy dữ liệu truyện từ file JSON
        const novelData = novelsData[novelTitle];
        if (!novelData) {
          throw new Error('Không tìm thấy truyện');
        }

        // Chuyển đổi và sắp xếp danh sách chương
        const chaptersList = Object.keys(novelData.chapters)
          .sort((a, b) => parseInt(a) - parseInt(b))
          .map(key => ({
            path: novelData.chapters[key].path,
            name: novelData.chapters[key].name,
          }));

        setChapters(chaptersList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadChapters();
  }, [novel["Tựa đề"]]); // Chạy lại effect khi tựa đề thay đổi

  // Kiểm tra nếu không có dữ liệu truyện
  if (!novel) {
    return <div className="not-found">Không tìm thấy truyện</div>;
  }

  // Hàm format ngày tháng năm
  const formatDate = (day, month, year) => {
    return `${day}/${month}/${year}`;
  };

  // Hàm format tên chương
  function formatChapterName(name, index) {
    // Kiểm tra nếu là chương minh họa
    if (/^[Mm]inh\s*[Hh]o[aạ]/.test(name)) {
      return name;
    }
    return `Chương ${index + 1}: ${name}`;
  }

  return (
    <section className={styles["section-info"]}>
      {/* Phần thông tin cơ bản của truyện */}
      <div className={styles["novel-basic-info"]}>
        {/* Tiêu đề và tên khác của truyện */}
        <h1 className={styles["novel-title"]}>{novel["Tựa đề"]}</h1>
        {/* Hiển thị tên tiếng Anh nếu có */}
        {novel["Fname"] && novel["Fname"] !== "NOT FOUND" && (
          <h2 className={styles["novel-alt-title"]}>{novel["Fname"]}</h2>
        )}

        {/* Danh sách thể loại */}
        <div className="novel-genres">
          {/* Lọc và hiển thị các thể loại không rỗng */}
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

      {/* Phần danh sách chương */}
      <div className={styles["chapters-list"]}>
        <h3 className={styles["chapters-title"]}>Danh sách chương</h3>
        {/* Hiển thị trạng thái loading */}
        {loading && <div>Đang tải danh sách chương...</div>}
        {/* Hiển thị lỗi nếu có */}
        {error && <div className={styles["error-message"]}>{error}</div>}
        {/* Hiển thị danh sách chương */}
        {chapters.length > 0 && (
          <div className={styles["chapters-grid"]}>
            {chapters.map((chapter, index) => (
              <div key={index} className={styles["chapter-item-container"]}>
                {/* Link đến trang đọc chương */}
                <Link
                  to={`/read/${encodeURIComponent(novel["Tựa đề"])}/${encodeURIComponent(chapter.name)}`}
                  className={styles["chapter-item"]}
                >
                  <span className={styles["chapter-name"]}>
                    {formatChapterName(chapter.name, index)}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default SectionOfInfo;
