import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import hakoData from '../../data_and_source/Novel_Data/hako_data.json';
import genresData from '../../data_and_source/Novel_Data/genres.json';
import genreMapping from '../../data_and_source/Novel_Data/genre_mapping.json';
import Header from '../../components/Header/Header';
// import './Genres-page.css';
import styles from './Genres-page.module.scss';
import Pagination from '../../features/Pagination/Pagination';

// Hàm chuyển đổi tên thể loại từ tiếng Anh sang tiếng Việt
const convertGenreName = (englishName) => {
  return genreMapping.mapping[englishName] || englishName;
};

function GenresPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [filteredNovels, setFilteredNovels] = useState([]);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const novelsPerPage = 12;

  useEffect(() => {
    if (slug) {
      const genre = genresData.genres.find(g => g.slug === slug);
      setCurrentGenre(genre);

      if (genre) {
        const novels = hakoData.filter(novel => 
          novel["Thể loại"].some(genreName => 
            convertGenreName(genreName).toLowerCase() === genre.name.toLowerCase()
          )
        );
        setFilteredNovels(novels);
        setCurrentPage(1);
      }
    }
  }, [slug]);

  // Tính toán các truyện cho trang hiện tại
  const indexOfLastNovel = currentPage * novelsPerPage;
  const indexOfFirstNovel = indexOfLastNovel - novelsPerPage;
  const currentNovels = filteredNovels.slice(indexOfFirstNovel, indexOfLastNovel);
  const totalPages = Math.ceil(filteredNovels.length / novelsPerPage);

  // Xử lý chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi chuyển trang
  };

  // Hàm xử lý chuyển trang
  const handleAdvancedSearch = () => {
    if (currentGenre) {
      // Chuyển đến trang tìm kiếm nâng cao với thể loại đã chọn
      navigate(`/tim-kiem-nang-cao?genres=${currentGenre.id}`);
    } else {
      navigate('/tim-kiem-nang-cao');
    }
  };

  if (!currentGenre) {
    return <div>Không tìm thấy thể loại này</div>;
  }

  return (
    <>
      <Header />
      <div className={styles["genres-page"]}>
        <div className={styles["genres-page--header"]}>
          <h1>Thể loại: {currentGenre?.name}</h1>
          <button 
            onClick={handleAdvancedSearch}
            className={styles["advanced-search-btn"]}
          >
            <i className="fas fa-search-plus"></i>
            Tìm kiếm nâng cao
          </button>
        </div>
        <p className={styles["genre-description"]}>{currentGenre?.description}</p>
        
        <div className={styles["novels-grid"]}>
          {currentNovels.length > 0 ? (
            currentNovels.map(novel => (
              <div key={novel.ID} className={styles["genres-page--novel-card"]}>
                <div className={styles["novel-cover-wrapper"]}>
                  <img src={novel["Link ảnh"]} alt={novel["Tựa đề"]} />
                </div>
                <div className={styles["novel-info"]}>
                  <h3>{novel["Tựa đề"]}</h3>
                  <p>Tác giả: {novel["Tác giả"]}</p>
                  <p>Số chương: {novel["Số chương"]}</p>
                  <p>Lượt xem: {novel["Số lượt xem"].toLocaleString()}</p>
                  <div className={styles["novel-genres"]}>
                    {novel["Thể loại"].slice(0, 3).map((genre, index) => (
                      <span key={index} className="genre-tag">{genre}</span>
                    ))}
                  </div>
                  <div className={styles["novel-status"]}>
                    <span className={`${styles["novel-status"]} ${styles[novel["Tình trạng"].toLowerCase().replace(/\s+/g, '-')]}`}>
                      {novel["Tình trạng"]}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles["no-novels"]}>
              <p>Không có truyện nào thuộc thể loại này</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}

export default GenresPage;