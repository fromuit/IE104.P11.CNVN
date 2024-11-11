
import './Section-of-info.css';
import PropTypes from 'prop-types';

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

  if (!novel) {
    console.log("No novel data received"); // Debug
    return <div className="not-found">Không tìm thấy truyện</div>;
  }

  console.log("Rendering novel:", novel); // Debug

  const formatDate = (day, month, year) => {
    return `${day}/${month}/${year}`;
  };

  return (
    <section className="section-info">
      <div className="novel-basic-info">
        <h1 className="novel-title">{novel["Tựa đề"]}</h1>
        {novel["Fname"] && novel["Fname"] !== "NOT FOUND" && (
          <h2 className="novel-alt-title">{novel["Fname"]}</h2>
        )}
        
        <div className="novel-genres">
          {novel["Thể loại"].filter(genre => genre !== "").map((genre, index) => (
            <span key={index} className="genre-tag">{genre}</span>
          ))}
        </div>

        <div className="novel-meta">
          <div className="meta-item">
            <span className="meta-label">Tác giả:</span>
            <span className="meta-value">{novel["Tác giả"]}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Họa sĩ:</span>
            <span className="meta-value">
              {novel["Họa sĩ"] !== "NOT FOUND" ? novel["Họa sĩ"] : "Chưa cập nhật"}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Tình trạng:</span>
            <span className="meta-value status-tag">{novel["Tình trạng"]}</span>
          </div>
        </div>

        <div className="novel-stats">
          <div className="stat-box">
            <i className="fas fa-book"></i>
            <div className="stat-content">
              <span className="stat-value">{novel["Số từ"].toLocaleString()}</span>
              <span className="stat-label">Số từ</span>
            </div>
          </div>
          <div className="stat-box">
            <i className="fas fa-heart"></i>
            <div className="stat-content">
              <span className="stat-value">{novel["Số like"]}</span>
              <span className="stat-label">Lượt thích</span>
            </div>
          </div>
          <div className="stat-box">
            <i className="fas fa-eye"></i>
            <div className="stat-content">
              <span className="stat-value">{novel["Số lượt xem"].toLocaleString()}</span>
              <span className="stat-label">Lượt xem</span>
            </div>
          </div>
        </div>

        <div className="novel-details">
          <div className="detail-row">
            <span className="detail-label">Nhóm dịch:</span>
            <a href={novel["Link nhóm dịch"]} className="detail-value link">
              {novel["Nhóm dịch"]}
            </a>
          </div>
          <div className="detail-row">
            <span className="detail-label">Người dịch:</span>
            <a href={novel["Link người dịch"]} className="detail-value link">
              {novel["Người dịch"]}
            </a>
          </div>
          <div className="detail-row">
            <span className="detail-label">Số tập:</span>
            <span className="detail-value">{novel["Số tập"]}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Số chương:</span>
            <span className="detail-value">{novel["Số chương"]}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Cập nhật:</span>
            <span className="detail-value">
              {formatDate(
                novel["Ngày cập nhật cuối"],
                novel["Tháng cập nhật cuối"],
                novel["Năm cập nhật cuối"]
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionOfInfo;
