import Novel_Data from '../../data_and_source/Novel_Data/hako_data.json';

export const searchNovels = (query = '', selectedGenres = [], sortBy = 'view') => {
  const searchQuery = query.toLowerCase();
  
  const filteredNovels = Novel_Data.filter(novel => {
    const titleMatch = novel["Tựa đề"].toLowerCase().includes(searchQuery);
    const fnameMatch = novel["Fname"] && 
                      novel["Fname"] !== "NOT FOUND" && 
                      novel["Fname"].toLowerCase().includes(searchQuery);
    const authorMatch = novel["Tác giả"].toLowerCase().includes(searchQuery);
    
    const genreMatch = selectedGenres.length === 0 || 
                      selectedGenres.every(selectedGenre => 
                        novel["Thể loại"].some(novelGenre => 
                          novelGenre.toLowerCase() === selectedGenre.toLowerCase()
                        )
                      );

    return (titleMatch || fnameMatch || authorMatch) && genreMatch;
  });

  return sortNovels(filteredNovels, sortBy);
};

// Lấy danh sách tất cả thể loại từ dữ liệu
export const getAllGenres = () => {
  const genresSet = new Set();
  Novel_Data.forEach(novel => {
    novel["Thể loại"].forEach(genre => {
      if (genre && genre !== "") {
        genresSet.add(genre);
      }
    });
  });
  return Array.from(genresSet).sort();
};

export const searchNovelsRealtime = (query) => {
  const searchQuery = query.toLowerCase();
  if (!searchQuery) return [];
  
  return Novel_Data.filter(novel => {
    const titleMatch = novel["Tựa đề"].toLowerCase().includes(searchQuery);
    const fnameMatch = novel["Fname"] && 
                      novel["Fname"] !== "NOT FOUND" && 
                      novel["Fname"].toLowerCase().includes(searchQuery);
    const authorMatch = novel["Tác giả"].toLowerCase().includes(searchQuery);
    
    return titleMatch || fnameMatch || authorMatch;
  });
}; 