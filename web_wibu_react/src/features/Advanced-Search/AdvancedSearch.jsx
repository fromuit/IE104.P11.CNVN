import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TopNav from '../../components/Header/TopNav/TopNav';
import Banner from '../../components/Header/Banner/Banner';
import { searchNovels } from '../utils/searchUtils';
import genreMapping from '../../data_and_source/Novel_Data/genre_mapping.json';
// import './AdvancedSearch.css';
import Pagination from '../Pagination/Pagination';
import styles from './AdvancedSearch.module.scss';
import TopOfPageButton from "../../features/Top_of_Page_Button/Top_of_Page_Button";


function AdvancedSearch() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('view');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredNovels, setFilteredNovels] = useState([]);
  const [currentNovels, setCurrentNovels] = useState([]);
  const [previouslyRendered] = useState(new Set());
  const [isGenresExpanded, setIsGenresExpanded] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const itemsPerPage = 9;
  const genres = Object.entries(genreMapping.mapping).map(([engName, viName]) => ({
    english: engName,
    vietnamese: viName
  }));
  
  // Thêm options sắp xếp
  const sortOptions = [
    { value: 'view', label: 'Lượt xem' },
    { value: 'like', label: 'Lượt thích' },
    { value: 'date', label: 'Ngày cập nhật' },
    { value: 'asc', label: 'A-Z' },
    { value: 'desc', label: 'Z-A' }
  ];

  // Khởi tạo dữ liệu ban đầu
  useEffect(() => {
    const initialNovels = searchNovels(searchQuery, selectedGenres, sortBy);
    setFilteredNovels(initialNovels);
    setTotalPages(Math.ceil(initialNovels.length / itemsPerPage));
    setCurrentNovels(initialNovels.slice(0, itemsPerPage));
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleGenreToggle = (genre) => {
    setSelectedGenres(prev => {
      const newGenres = prev.includes(genre.english) 
        ? prev.filter(g => g !== genre.english)
        : [...prev, genre.english];
      return newGenres;
    });
    setCurrentPage(1);
  };

  const handleClearGenres = () => {
    setSelectedGenres([]);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Xử lý tìm kiếm và phân trang
  useEffect(() => {
    const filtered = searchNovels(searchQuery, selectedGenres, sortBy);
    setFilteredNovels(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    
    // Trigger animation
    setIsAnimating(true);
    setCurrentNovels(filtered.slice(start, end));
    
    // Reset animation sau 500ms
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery, selectedGenres, sortBy, currentPage]);

  return (
    <div className={styles['advanced-search-page']}>
      <TopNav />
      <Banner />
      
      <div className={styles['main-content']}>
        <div className={styles['searchbar-container']}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Nhập tên truyện, tác giả..."
            className={styles['searchbar-input']}
          />
          
          <div className={styles['genres-section']}>
            <div className={styles['genres-header']}>
              <div className={styles['genres-title']}>
                <h3>Thể loại</h3>
              </div>
              <button 
                type="button"
                className={styles['genres-toggle']}
                onClick={() => setIsGenresExpanded(!isGenresExpanded)}
              >
                {isGenresExpanded ? (
                  <i className="fas fa-chevron-up"></i>
                ) : (
                  <i className="fas fa-chevron-down"></i>
                )}
              </button>
            </div>
            <div className={`${styles['genres-grid']} ${isGenresExpanded ? styles['expanded'] : ""}`}>
              {genres.map(genre => (
                <label key={genre.english} className={styles['genres-checkbox']}>
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre.english)}
                    onChange={() => handleGenreToggle(genre)}
                  />
                  {genre.vietnamese}
                </label>
              ))}
              <button 
                type="button"
                className={styles['genres-clear-all']}
                onClick={handleClearGenres}
              >
                <i className="fas fa-times"></i> Bỏ chọn tất cả
              </button>
            </div>
          </div>

          <div className={styles['sort-section']}>
            <h3>Sắp xếp theo</h3>
            <div className={styles['sort-grid']}>
              {sortOptions.map(option => (
                <label key={option.value} className={styles['sort-checkbox']}>
                  <input
                    type="radio"
                    checked={sortBy === option.value}
                    onChange={() => handleSortChange(option.value)}
                    name="sort"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className={styles['search-results']}>
            {currentNovels.length > 0 ? (
              <>
                <div className={styles['novels-grid']}>
                  {currentNovels.map(novel => (
                    <Link 
                      to={`/info/${novel.ID}`} 
                      key={novel.ID} 
                      className={`${styles['novel-card']} ${isAnimating ? styles['novel-card-animated'] : ''}`}
                    >
                      <img src={novel["Link ảnh"]} alt={novel["Tựa đề"]} />
                      <h3>{novel["Tựa đề"]}</h3>
                      <p>{novel["Tác giả"]}</p>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className={styles['pagination-container-bottom']}>
                    <Pagination 
                      currentPage={currentPage} 
                      totalPages={totalPages} 
                      onPageChange={handlePageChange} 
                    />
                  </div>
                )}
              </>
            ) : (
              <div className={styles['no-results']}>
                <i className="fas fa-search"></i>
                <p className={styles['no-results-main_text']}>Không tìm thấy truyện phù hợp!!</p>
                {(searchQuery || selectedGenres.length > 0) && (  
                  <p className={styles['no-results-sub_text']}>
                    Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh lại bộ lọc thể loại nhé!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="aside-container">
  
        </div>
      </div>
      <TopOfPageButton />
    </div>
  );
}

export default AdvancedSearch; 