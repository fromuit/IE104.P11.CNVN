import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {  getAllGenres } from '../../utils/searchUtils';
import novelData from '../../data_and_source/truyen_data/hako_data.json';
import TopNav from '../Header/TopNav/TopNav';
import Banner from '../Header/Banner/Banner';
import Aside from '../Home-page/Main-of-Home/Aside-of-Home/Aside-of-Home';
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

    if (currentPage > 1) {
      pages.push(
        <button key="first" onClick={() => onPageChange(1)} className="pagination__button">
          <i className="fas fa-angle-double-left"></i>
        </button>,
        <button key="prev" onClick={() => onPageChange(currentPage - 1)} className="pagination__button">
          <i className="fas fa-chevron-left"></i>
        </button>
      );
    }

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

    if (currentPage < totalPages) {
      pages.push(
        <button key="next" onClick={() => onPageChange(currentPage + 1)} className="pagination__button">
          <i className="fas fa-chevron-right"></i>
        </button>,
        <button key="last" onClick={() => onPageChange(totalPages)} className="pagination__button">
          <i className="fas fa-angle-double-right"></i>
        </button>
      );
    }

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

  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    const genres = searchParams.get('genres')?.split(',') || [];
    const query = searchParams.get('q') || '';
    const sort = searchParams.get('sort') || 'view';
    
    setCurrentPage(page);
    setSelectedGenres(genres);
    setSearchQuery(query);
    setSortBy(sort);
  }, [searchParams]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
    
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber);
    setSearchParams(params);
  };

  const handleGenreToggle = (genre) => {
    setSelectedGenres(prev => {
      if (prev.includes(genre)) {
        return prev.filter(g => g !== genre);
      }
      return [...prev, genre];
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedGenres.length) params.set('genres', selectedGenres.join(','));
    params.set('sort', sortBy);
    setSearchParams(params);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

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
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập tên truyện, tác giả..."
              className="search-input"
            />
            
            <div className="genres-section">
              <h3>Thể loại</h3>
              <div className="genres-grid">
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

            <button type="submit" className="search-button">
              <i className="fas fa-search"></i> Tìm kiếm
            </button>
          </form>

          <div className="search-results">
            {totalPages > 1 && (
              <div className="pagination-container top-pagination">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={handlePageChange} 
                />
              </div>
            )}
            
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