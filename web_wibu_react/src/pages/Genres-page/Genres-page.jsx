import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import hakoData from '../../data_and_source/Novel_Data/hako_data.json';
import genresData from '../../data_and_source/Novel_Data/genres.json';
import genreMapping from '../../data_and_source/Novel_Data/gerne_mapping.json';
import Header from '../../components/Header/Header';
import './Genres-page.css';

// Hàm chuyển đổi tên thể loại từ tiếng Anh sang tiếng Việt
const convertGenreName = (englishName) => {
  return genreMapping.mapping[englishName] || englishName;
};

function GenresPage() {
  const { slug } = useParams();
  const [filteredNovels, setFilteredNovels] = useState([]);
  const [currentGenre, setCurrentGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const novelsPerPage = 9;

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

  if (!currentGenre) {
    return <div>Không tìm thấy thể loại này</div>;
  }

  return (
    <>
      <Header />
      <div className="genres-page">
        <h1>Thể loại: {currentGenre.name}</h1>
        <p className="genre-description">{currentGenre.description}</p>
        
        <div className="novels-grid">
          {currentNovels.length > 0 ? (
            currentNovels.map(novel => (
              <div key={novel.ID} className="novel-card">
                <img src={novel["Link ảnh"]} alt={novel["Tựa đề"]} />
                <div className="novel-info">
                  <h3>{novel["Tựa đề"]}</h3>
                  <p>Tác giả: {novel["Tác giả"]}</p>
                  <p>Số chương: {novel["Số chương"]}</p>
                  <p>Lượt xem: {novel["Số lượt xem"].toLocaleString()}</p>
                  <div className="novel-genres">
                    {novel["Thể loại"].slice(0, 3).map((genre, index) => (
                      <span key={index} className="genre-tag">{genre}</span>
                    ))}
                  </div>
                  <div className="novel-status">
                    <span className={`status ${novel["Tình trạng"].toLowerCase().replace(/\s+/g, '-')}`}>
                      {novel["Tình trạng"]}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-novels">
              <p>Không có truyện nào thuộc thể loại này</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            {/* Nút về trang đầu */}
            <button 
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="page-button"
              title="Trang đầu"
            >
              &lt;&lt;
            </button>

            {/* Nút lùi 1 trang */}
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-button"
              title="Trang trước"
            >
              &lt;
            </button>

            {/* Các nút số trang */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}

            {/* Nút tiến 1 trang */}
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="page-button"
              title="Trang sau"
            >
              &gt;
            </button>

            {/* Nút đến trang cuối */}
            <button 
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="page-button"
              title="Trang cuối"
            >
              &gt;&gt;
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default GenresPage;