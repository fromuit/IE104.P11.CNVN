// Import các thư viện và components cần thiết
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
// Import dữ liệu từ JSON files
import novelsData from '../../data_and_source/Novel_Data/novels_chapters.json';
import hakoData from '../../data_and_source/Novel_Data/hako_data.json';
import styles from './Read-page.module.scss';
import TopOfPageButton from "../../features/Top_of_Page_Button/Top_of_Page_Button";

// Component chính để hiển thị trang đọc truyện
function ReadPage() {
    // Khởi tạo các hooks và states cần thiết
    const navigate = useNavigate();
    const { novelTitle, chapterName } = useParams(); // Lấy params từ URL
    const [chapterContent, setChapterContent] = useState(''); // Nội dung chapter
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Lưu trữ lỗi nếu có
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0); // Index chapter hiện tại
    const [chapters, setChapters] = useState([]); // Danh sách các chapter
    const [novelId, setNovelId] = useState(null); // ID của novel

    // Hàm xử lý và format nội dung chapter
    const parseContent = (content) => {
        // Tách content thành các dòng và loại bỏ dòng trống
        const lines = content.split("\n").filter(line => line.trim());

        // Xử lý từng dòng nội dung, phân biệt giữa text và hình ảnh
        const contentHtml = lines.slice(5).map(line => {
            // Kiểm tra nếu dòng chứa thẻ img
            if (line.includes("<img")) {
                // Trích xuất URL hình ảnh bằng regex
                const imgMatch = line.match(/<img.*?src="(.*?)".*?>/);
                if (imgMatch && imgMatch[1]) {
                    return `
                        <div class="${styles["image-container"]}">
                            <img 
                                src="${imgMatch[1]}" 
                                alt="Chapter illustration"
                                loading="lazy"
                                class="${styles["chapter-image"]}"
                            />
                        </div>
                    `;
                }
            }
            // Dòng text thông thường
            return `<p>${line}</p>`;
        }).join("");

        // Trả về HTML đã được format với header và nội dung
        return `
            <div class="${styles.chapterHeader}">
                <h1>${lines[0]}</h1>
                <h2>${lines[1]}</h2>
                <div class="${styles.chapterInfo}">
                    <span>Độ dài: ${lines[2]?.split("Độ dài:")[1]?.trim() || ""} ${lines[3]?.trim() || ""}  - Bình luận: ${lines[4]?.split("Bình luận:")[1]?.trim() || ""}</span>
                </div>
            </div>
            <div class="${styles.chapterContent}">
                ${contentHtml}
            </div>
        `;
    };

    // Effect hook để tải nội dung chapter
    useEffect(() => {
        const loadChapterContent = async () => {
            try {
                // Tìm novel trong dữ liệu
                const novel = novelsData[novelTitle.toLowerCase()];
                if (!novel) {
                    throw new Error('Không tìm thấy truyện');
                }

                // Tìm thông tin novel từ hakoData
                const novelInfo = hakoData.find(n =>
                    n["Tựa đề"].toLowerCase() === novelTitle.toLowerCase()
                );
                if (novelInfo) {
                    setNovelId(novelInfo.ID);
                }

                // Tạo danh sách chapters
                const chaptersList = Object.entries(novel.chapters).map(([, chapter]) => ({
                    name: chapter.name,
                    path: chapter.path
                }));
                setChapters(chaptersList);

                // Xác định index của chapter hiện tại
                const currentIndex = chaptersList.findIndex(chapter => chapter.name === chapterName);
                setCurrentChapterIndex(currentIndex);

                // Tìm và tải nội dung chapter
                const chapterEntry = Object.entries(novel.chapters).find(
                    ([, chapter]) => chapter.name === chapterName
                );

                if (!chapterEntry) {
                    throw new Error('Không tìm thấy chương');
                }

                // Đọc và xử lý nội dung từ file
                const chapter = chapterEntry[1];
                const response = await fetch(
                    `/src/data_and_source/Truyen_extracted/${novelTitle.toLowerCase()}/${chapter.path}`
                );

                if (!response.ok) {
                    throw new Error('Không thể tải nội dung chương');
                }

                const content = await response.text();
                const formattedContent = parseContent(content);
                setChapterContent(formattedContent);
                setLoading(false);

            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        loadChapterContent();
    }, [novelTitle, chapterName]); // Chạy lại effect khi novelTitle hoặc chapterName thay đổi

    // Xử lý khi người dùng chọn chapter từ dropdown
    const handleChapterChange = (event) => {
        const selectedChapter = chapters[event.target.value];
        navigate(`/read/${novelTitle}/${selectedChapter.name}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Xử lý chuyển đến chapter trước
    const handlePrevChapter = () => {
        if (currentChapterIndex > 0) {
            const prevChapter = chapters[currentChapterIndex - 1];
            navigate(`/read/${novelTitle}/${prevChapter.name}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Xử lý chuyển đến chapter tiếp theo
    const handleNextChapter = () => {
        if (currentChapterIndex < chapters.length - 1) {
            const nextChapter = chapters[currentChapterIndex + 1];
            navigate(`/read/${novelTitle}/${nextChapter.name}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Render giao diện
    return (
        <div className={styles['read-page']}>
            {/* Nút quay lại trang thông tin */}
            <div className={styles['navigation']}>
                <Link to={novelId ? `/info/${novelId}` : '#'} className={styles['back-button']}>
                    <i className="fas fa-arrow-left"></i>
                    Về trang thông tin
                </Link>
            </div>

            {/* Hiển thị trạng thái loading và lỗi */}
            {loading && <div className={styles['loading']}>Đang tải...</div>}
            {error && <div className={styles['error']}>{error}</div>}

            {/* Hiển thị nội dung chapter và điều hướng */}
            {chapterContent && (
                <>
                    {/* Thanh điều hướng phía trên */}
                    <div className={styles['navigation']}>
                        <button
                            onClick={handlePrevChapter}
                            disabled={currentChapterIndex <= 0}
                            className={styles['nav-button']}
                        >
                            Chương trước
                        </button>

                        <select
                            value={currentChapterIndex}
                            onChange={handleChapterChange}
                            className={styles['chapter-select']}
                        >
                            {chapters.map((chapter, index) => (
                                <option key={chapter.name} value={index}>
                                    {chapter.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleNextChapter}
                            disabled={currentChapterIndex >= chapters.length - 1}
                            className={styles['nav-button']}
                        >
                            Chương sau
                        </button>
                    </div>

                    {/* Nội dung chapter */}
                    <div
                        className={styles['container']}
                        dangerouslySetInnerHTML={{ __html: chapterContent }}
                    />

                    {/* Thanh điều hướng phía dưới */}
                    <div className={styles['navigation']}>
                        <button
                            onClick={handlePrevChapter}
                            disabled={currentChapterIndex <= 0}
                            className={styles['nav-button']}
                        >
                            Chương trước
                        </button>

                        <select
                            value={currentChapterIndex}
                            onChange={handleChapterChange}
                            className={styles['chapter-select']}
                        >
                            {chapters.map((chapter, index) => (
                                <option key={chapter.name} value={index}>
                                    {chapter.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleNextChapter}
                            disabled={currentChapterIndex >= chapters.length - 1}
                            className={styles['nav-button']}
                        >
                            Chương sau
                        </button>
                    </div>

                    {/* Nút cuộn lên đầu trang */}
                    <TopOfPageButton />
                </>
            )}
        </div>
    );
}

export default ReadPage;