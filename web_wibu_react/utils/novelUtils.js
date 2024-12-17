// Hàm sắp xếp truyện theo các tiêu chí khác nhau
export const sortNovels = (novels, criteria = 'date') => {
    const sortedNovels = [...novels];
  
    switch (criteria) {
      case 'week':
        return sortedNovels.sort((a, b) => {
          // Lấy lượt xem trong tuần
          const viewsA = a["Lượt xem tuần"] || 0;
          const viewsB = b["Lượt xem tuần"] || 0;
          return viewsB - viewsA;
        });
  
      case 'month':
        return sortedNovels.sort((a, b) => {
          // Lấy lượt xem trong tháng
          const viewsA = a["Lượt xem tháng"] || 0;
          const viewsB = b["Lượt xem tháng"] || 0;
          return viewsB - viewsA;
        });
  
      case 'year':
        return sortedNovels.sort((a, b) => {
          // Lấy lượt xem trong năm
          const viewsA = a["Lượt xem năm"] || 0;
          const viewsB = b["Lượt xem năm"] || 0;
          return viewsB - viewsA;
        });
  
      case 'all':
        return sortedNovels.sort((a, b) => {
          // Lấy tổng lượt xem
          const viewsA = a["Số lượt xem"] || 0;
          const viewsB = b["Số lượt xem"] || 0;
          return viewsB - viewsA;
        });
  
      case 'date':
        return sortedNovels.sort((a, b) => {
          // Sắp xếp theo ngày cập nhật mới nhất
          const dateA = new Date(
            a["Năm cập nhật cuối"],
            a["Tháng cập nhật cuối"] - 1,
            a["Ngày cập nhật cuối"]
          );
          const dateB = new Date(
            b["Năm cập nhật cuối"],
            b["Tháng cập nhật cuối"] - 1,
            b["Ngày cập nhật cuối"]
          );
          return dateB - dateA;
        });
  
      case 'likes':
        return sortedNovels.sort((a, b) => {
          // Sắp xếp theo số lượt thích
          return (b["Số like"] || 0) - (a["Số like"] || 0);
        });
  
      default:
        return sortedNovels;
    }
  };
  
  // Hàm lọc truyện theo trạng thái
  export const filterByStatus = (novels, status) => {
    return novels.filter(novel => novel["Tình trạng"] === status);
  };
  
  // Hàm lọc truyện theo thể loại
  export const filterByGenre = (novels, genre) => {
    return novels.filter(novel => novel["Thể loại"].includes(genre));
  };
  
  // Hàm lọc truyện theo phương thức (sáng tác/dịch)
  export const filterByType = (novels, type) => {
    return novels.filter(novel => novel["Phương thức dịch"] === type);
  };
  
  // Hàm lấy truyện mới cập nhật
  export const getRecentlyUpdated = (novels, limit = 10) => {
    return sortNovels(novels, 'date').slice(0, limit);
  };
  
  // Hàm lấy truyện mới
  export const getNewNovels = (novels, limit = 10) => {
    return [...novels]
      .sort((a, b) => {
        // Sắp xếp theo thời gian đăng từ mới đến cũ
        const dateA = new Date(
          parseInt(a["Năm đăng"]), 
          parseInt(a["Tháng đăng"]) - 1, 
          parseInt(a["Ngày đăng"]),
          parseInt(a["Giờ đăng"]) || 0,
          parseInt(a["Phút đăng"]) || 0
        ).getTime();
        const dateB = new Date(
          parseInt(b["Năm đăng"]), 
          parseInt(b["Tháng đăng"]) - 1, 
          parseInt(b["Ngày đăng"]),
          parseInt(b["Giờ đăng"]) || 0,
          parseInt(b["Phút đăng"]) || 0
        ).getTime();
        return dateB - dateA; // Sắp xếp từ mới đến cũ
      })
      .slice(0, limit);
  };
  
  // Hàm lấy truyện đã hoàn thành
  export const getCompletedNovels = (novels, limit = 10) => {
    return novels
      .filter(novel => novel["Tình trạng"] === "Đã hoàn thành")
      .sort((a, b) => (b["Số lượt xem"] || 0) - (a["Số lượt xem"] || 0))
      .slice(0, limit);
  };
  
  // Hàm lấy truyện sáng tác
  export const getOriginalNovels = (novels, limit = 10) => {
    return novels
      .filter(novel => novel["Phương thức dịch"] === "Sáng tác")
      .sort((a, b) => (b["Số lượt xem"] || 0) - (a["Số lượt xem"] || 0))
      .slice(0, limit);
  };