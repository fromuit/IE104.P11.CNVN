import novelData from '../data_and_source/truyen_data/hako_data.json';

export const searchNovels = (query = '', selectedGenres = [], sortBy = 'view') => {
  const searchQuery = query.toLowerCase();
  
  // Lọc theo query và thể loại
  const filteredNovels = novelData.filter(novel => {
    const titleMatch = novel["Tựa đề"].toLowerCase().includes(searchQuery);
    const fnameMatch = novel["Fname"] && 
                      novel["Fname"] !== "NOT FOUND" && 
                      novel["Fname"].toLowerCase().includes(searchQuery);
    const authorMatch = novel["Tác giả"].toLowerCase().includes(searchQuery);
    
    const genreMatch = selectedGenres.length === 0 || 
                      selectedGenres.every(selectedGenre => 
                        novel["Thể loại"].some(novelGenre => 
                          novelGenre.toLowerCase() === selectedGenre.toLowerCase() && 
                          novelGenre !== ""
                        )
                      );

    return (titleMatch || fnameMatch || authorMatch) && genreMatch;
  });

  // Sắp xếp kết quả
  return filteredNovels.sort((a, b) => {
    switch (sortBy) {
      case 'view':
        return b["Số lượt xem"] - a["Số lượt xem"];
      case 'like':
        return b["Số like"] - a["Số like"];
      case 'date':
        const dateA = new Date(a["Năm cập nhật cuối"], a["Tháng cập nhật cuối"] - 1, a["Ngày cập nhật cuối"]);
        const dateB = new Date(b["Năm cập nhật cuối"], b["Tháng cập nhật cuối"] - 1, b["Ngày cập nhật cuối"]);
        return dateB - dateA;
      default:
        return 0;
    }
  });
};

// Lấy danh sách tất cả thể loại từ dữ liệu
export const getAllGenres = () => {
  const genresSet = new Set();
  novelData.forEach(novel => {
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
  
  return novelData.filter(novel => {
    const titleMatch = novel["Tựa đề"].toLowerCase().includes(searchQuery);
    const fnameMatch = novel["Fname"] && 
                      novel["Fname"] !== "NOT FOUND" && 
                      novel["Fname"].toLowerCase().includes(searchQuery);
    const authorMatch = novel["Tác giả"].toLowerCase().includes(searchQuery);
    
    return titleMatch || fnameMatch || authorMatch;
  });
}; 