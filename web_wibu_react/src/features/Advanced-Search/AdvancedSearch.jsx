import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TopNav from '../../components/Header/TopNav/TopNav';
import Banner from '../../components/Header/Banner/Banner';
import {  getAllGenres, searchNovels } from '../utils/searchUtils';
import './AdvancedSearch.css';
import PropTypes from 'prop-types';
import Novel_Data from '../../data_and_source/Novel_Data/hako_data.json';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired
  };

  const renderPaginationButtons = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    pages.push(
      <button 
        key="first" 
        onClick={() => onPageChange(1)} 
        className="pagination__button"
        disabled={currentPage === 1}
      >
        <i className="fas fa-angle-double-left"></i>
      </button>,
      <button 
        key="prev" 
        onClick={() => onPageChange(currentPage - 1)} 
        className="pagination__button"
        disabled={currentPage === 1}
      >
        <i className="fas fa-chevron-left"></i>
      </button>
    );

    if (startPage > 1) {
      pages.push(
        <button key={1} onClick={() => onPageChange(1)} className="pagination__button">1</button>
      );
      if (startPage > 2) {
        pages.push(<span key="dots1" className="pagination__dots">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`pagination__button ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="dots2" className="pagination__dots">...</span>);
      }
      pages.push(
        <button key={totalPages} onClick={() => onPageChange(totalPages)} className="pagination__button">
          {totalPages}
        </button>
      );
    }

    pages.push(
      <button 
        key="next" 
        onClick={() => onPageChange(currentPage + 1)} 
        className="pagination__button"
        disabled={currentPage === totalPages}
      >
        <i className="fas fa-chevron-right"></i>
      </button>,
      <button 
        key="last" 
        onClick={() => onPageChange(totalPages)} 
        className="pagination__button"
        disabled={currentPage === totalPages}
      >
        <i className="fas fa-angle-double-right"></i>
      </button>
    );

    return pages;
  };

  return <div className="pagination">{renderPaginationButtons()}</div>;
};


function AdvancedSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
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
  const genres = getAllGenres();
  
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
      const newGenres = prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre];
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
    <div className="advanced-search-page">
      <TopNav />
      <Banner />
      <div className="back-to-home">
        <Link to="/">
          <i className="fas fa-arrow-left"></i> Về trang chủ
        </Link>
      </div>
      
      <div className="main-content">
        <div className="search-container">
          {/* Comment lại form và button tìm kiếm để có thể sử dụng sau này
        <form onSubmit={handleSearch}>
          <div className="search-input-container">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Nhập tên truyện, tác giả..."
              className="search-input"
            />
            <button type="submit" className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
          </form>
          */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Nhập tên truyện, tác giả..."
            className="search-input"
          />
          
          <div className="genres-section">
            <div className="genres-header">
              <div className="genres-title">
                <h3>Thể loại</h3>
              </div>
              <button 
                type="button"
                className="toggle-genres-btn"
                onClick={() => setIsGenresExpanded(!isGenresExpanded)}
              >
                {isGenresExpanded ? (
                  <i className="fas fa-chevron-up"></i>
                ) : (
                  <i className="fas fa-chevron-down"></i>
                )}
              </button>
            </div>
            <div className={`genres-grid ${isGenresExpanded ? "expanded" : ""}`}>
              <button 
                type="button"
                className="clear-all-btn"
                onClick={handleClearGenres}
              >
                <i className="fas fa-times"></i> Bỏ chọn tất cả
              </button>
              {genres.map(genre => (
                <label key={genre} className="genre-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreToggle(genre)}
                  />
                  {genre}
                </label>
              ))}
            </div>
          </div>

          <div className="sort-section">
            <h3>Sắp xếp theo</h3>
            <div className="sort-grid">
              {sortOptions.map(option => (
                <label key={option.value} className="sort-checkbox">
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

          <div className="search-results">
            {currentNovels.length > 0 ? (
              <>
                <div className="novels-grid">
                  {currentNovels.map(novel => (
                    <Link 
                      to={`/info/${novel.ID}`} 
                      key={novel.ID} 
                      className={`novel-card ${isAnimating ? 'novel-card-animate' : ''}`}
                    >
                      <img src={novel["Link ảnh"]} alt={novel["Tựa đề"]} />
                      <h3>{novel["Tựa đề"]}</h3>
                      <p>{novel["Tác giả"]}</p>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pagination-container bottom-pagination">
                    <Pagination 
                      currentPage={currentPage} 
                      totalPages={totalPages} 
                      onPageChange={handlePageChange} 
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <p className="main-text">Không tìm thấy truyện phù hợp</p>
                {(searchQuery || selectedGenres.length > 0) && (  
                  <p className="sub-text">
                    Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh lại bộ lọc thể loại
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="aside-container">
  
        </div>
      </div>
    </div>
  );
}

export default AdvancedSearch; 