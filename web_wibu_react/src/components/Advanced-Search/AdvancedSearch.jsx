import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchNovels, getAllGenres } from '../../utils/searchUtils';
import Header from '../Header/Header';
import Aside from '../Home-page/Main-of-Home/Aside-of-Home/Aside-of-Home';
import './AdvancedSearch.css';

function AdvancedSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('view');
  const [searchResults, setSearchResults] = useState([]);
  const genres = getAllGenres();

  useEffect(() => {
    const query = searchParams.get('q') || '';
    const genres = searchParams.get('genres')?.split(',') || [];
    const sort = searchParams.get('sort') || 'view';
    
    setSearchQuery(query);
    setSelectedGenres(genres);
    setSortBy(sort);
    
    const results = searchNovels(query, genres, sort);
    setSearchResults(results);
  }, [searchParams]);

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

  return (
    <div className="advanced-search-page">
      <Header />
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
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="view">Lượt xem</option>
                <option value="like">Lượt thích</option>
                <option value="date">Ngày cập nhật</option>
              </select>
            </div>

            <button type="submit" className="search-button">
              <i className="fas fa-search"></i> Tìm kiếm
            </button>
          </form>

          <div className="search-results">
            {searchResults.map(novel => (
              <div key={novel.ID} className="novel-card">
                <img src={novel["Link ảnh"]} alt={novel["Tựa đề"]} />
                <h3>{novel["Tựa đề"]}</h3>
                <p>{novel["Tác giả"]}</p>
              </div>
            ))}
          </div>
        </div>
        <Aside />
      </div>
    </div>
  );
}

export default AdvancedSearch; 