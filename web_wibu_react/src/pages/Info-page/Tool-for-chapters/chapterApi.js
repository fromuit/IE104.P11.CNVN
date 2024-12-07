export const checkNovelFolder = async (novelTitle) => {
  try {
    const formattedTitle = novelTitle.toLowerCase();
    console.log('Tựa đề trước khi gửi request:', formattedTitle);
    
    const response = await fetch(`http://localhost:5001/api/novels/check-novel-directory/${encodeURIComponent(formattedTitle)}`);
    if (!response.ok) throw new Error('Không thể kiểm tra thư mục');
    
    const data = await response.json();
    return data.exists;
  } catch (error) {
    console.error('Lỗi khi kiểm tra thư mục:', error);
    return false;
  }
};

export const fetchChapters = async (novelTitle) => {
  const formattedTitle = novelTitle.toLowerCase();
  console.log('Tựa đề trước khi kiểm tra folder:', formattedTitle);
  
  const folderExists = await checkNovelFolder(formattedTitle);
  
  if (!folderExists) {
    console.error('Không tìm thấy thư mục truyện');
    return [];
  }
  
  try {
    console.log('Tựa đề trước khi lấy chapters:', formattedTitle);
    const response = await fetch(`http://localhost:5001/api/novels/list-chapters/${encodeURIComponent(formattedTitle)}`);
    if (!response.ok) throw new Error('Không thể đọc danh sách chương');
    
    const data = await response.json();
    return data.chapters || [];
  } catch (error) {
    console.error('Lỗi khi đọc danh sách chương:', error);
    return [];
  }
};