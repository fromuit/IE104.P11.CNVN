import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TopNav from '../../pages/Header/TopNav/TopNav';
import Banner from '../../pages/Header/Banner/Banner';
import { searchNovels, getAllGenres } from '../utils/searchUtils';
import './AdvancedSearch.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
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
  const itemsPerPage = 9;
  const genres = getAllGenres();
  const [isGenresExpanded, setIsGenresExpanded] = useState(true);

  const sortOptions = [
    { value: 'view', label: 'Lượt xem' },
    { value: 'like', label: 'Lượt thích' },
    { value: 'date', label: 'Ngày cập nhật' }
  ];

  // Sắp xếp truyện theo tiêu chí
  const sortNovels = (novels, criteria) => {
    return [...novels].sort((a, b) => {
      switch (criteria) {
        case "view":
          return b["Số lượt xem"] - a["Số lượt xem"];
        case "like":
          return b["Số like"] - a["Số like"];
        case "date": {
          let dateA = new Date(a["Năm cập nhật cuối"], a["Tháng cập nhật cuối"] - 1, a["Ngày cập nhật cuối"]);
          let dateB = new Date(b["Năm cập nhật cuối"], b["Tháng cập nhật cuối"] - 1, b["Ngày cập nhật cuối"]);
          return dateB - dateA;
        }
        default:
          return 0;
      }
    });
  };

  // Lọc truyện theo thể loại và từ khóa tìm kiếm
  const filterNovels = () => {
    let filtered = [...novelData];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(novel => 
        novel["Tựa đề"].toLowerCase().includes(query) ||
        novel["Tác giả"].toLowerCase().includes(query)
      );
    }

    if (selectedGenres.length > 0) {
      filtered = filtered.filter(novel =>
        selectedGenres.every(genre => novel["Thể loại"].includes(genre))
      );
    }

    return sortNovels(filtered, sortBy);
  };

  // Lấy truyện cho trang hiện tại
  const currentNovels = filterNovels().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filterNovels().length / itemsPerPage);

  // Thêm effect để reset khi component mount (trang được load)
  useEffect(() => {
    // Reset tất cả state về giá trị mặc định
    setCurrentPage(1);
    setSelectedGenres([]);
    setSearchQuery("");
    setSortBy("view");
    setIsGenresExpanded(true);
    
    // Xóa tất cả params trong URL
    setSearchParams({});
  }, []); // Empty dependency array means this runs once when component mounts

  // Giữ lại effect cũ để handle URL params changes
  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const genres = searchParams.get("genres")?.split(",").filter(Boolean) || [];
    const query = searchParams.get("q") || "";
    const sort = searchParams.get("sort") || "view";
    
    setCurrentPage(page);
    setSelectedGenres(genres);
    setSearchQuery(query);
    setSortBy(sort);
  }, [searchParams]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber);
    setSearchParams(params);
  };

  const handleGenreToggle = (genre) => {
    setSelectedGenres(prev => {
      const newGenres = prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre];
      
      const params = new URLSearchParams(searchParams);
      if (newGenres.length) {
        params.set('genres', newGenres.join(','));
      } else {
        params.delete('genres');
      }
      params.delete('page');
      setSearchParams(params);
      setCurrentPage(1);
      
      return newGenres;
    });
  };

  const handleSearchInputChange = (e) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    setIsGenresExpanded(!newValue);

    const params = new URLSearchParams(searchParams);
    if (newValue) {
      params.set('q', newValue);
    } else {
      params.delete('q');
    }
    setSearchParams(params);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
    
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    params.delete('page');
    setSearchParams(params);
  };

  // Comment lại hàm xử lý tìm kiếm để có thể sử dụng sau này nếu cần
  /* const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedGenres.length) params.set('genres', selectedGenres.join(','));
    params.set('sort', sortBy);
    setSearchParams(params);
    setIsGenresExpanded(false);
  }; */

  // Thêm useEffect để xử lý scroll position khi URL thay đổi
  useEffect(() => {
    // Lưu scroll position hiện tại
    const scrollPosition = window.scrollY;
    
    // Sau khi component re-render, khôi phục scroll position
    window.requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
    });
  }, [currentPage]); // Chỉ chạy khi currentPage thay đổi

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
              <h3>Thể loại</h3>
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
                    <div key={novel.ID} className="novel-card">
                      <img src={novel["Link ảnh"]} alt={novel["Tựa đề"]} />
                      <h3>{novel["Tựa đề"]}</h3>
                      <p>{novel["Tác giả"]}</p>
                    </div>
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
          <Aside />
        </div>
      </div>
    </div>
  );
}

export default AdvancedSearch; 