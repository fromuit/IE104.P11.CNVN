import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import novelsData from '../../data_and_source/Novel_Data/novels_chapters.json';
import hakoData from '../../data_and_source/Novel_Data/hako_data.json';
import styles from './Read-page.module.scss';

function ReadPage() {
    const navigate = useNavigate();
    const { novelTitle, chapterName } = useParams();
    const [chapterContent, setChapterContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [chapters, setChapters] = useState([]);
    const [novelId, setNovelId] = useState(null);

    useEffect(() => {
        const loadChapterContent = async () => {
            try {
                const novel = novelsData[novelTitle.toLowerCase()];
                if (!novel) {
                    throw new Error('Không tìm thấy truyện');
                }

                // Tìm ID của truyện từ hakoData
                const novelInfo = hakoData.find(n => 
                    n["Tựa đề"].toLowerCase() === novelTitle.toLowerCase()
                );
                if (novelInfo) {
                    setNovelId(novelInfo.ID);
                }

                // Lấy danh sách các chương
                const chaptersList = Object.entries(novel.chapters).map(([_, chapter]) => ({
                    name: chapter.name,
                    path: chapter.path
                }));
                setChapters(chaptersList);

                // Tìm index của chapter hiện tại
                const currentIndex = chaptersList.findIndex(chapter => chapter.name === chapterName);
                setCurrentChapterIndex(currentIndex);

                // Tìm chapter trong novel
                const chapterEntry = Object.entries(novel.chapters).find(
                    ([_, chapter]) => chapter.name === chapterName
                );

                if (!chapterEntry) {
                    throw new Error('Không tìm thấy chương');
                }

                const chapter = chapterEntry[1];
                const chapterNumber = chapterEntry[0];
                const chapterTitle = chapter.name ? `Chương ${chapterNumber}: ${chapter.name}` : `Chương ${chapterNumber}`;

                // Đọc nội dung từ file txt
                const response = await fetch(
                    `/src/data_and_source/Truyen_extracted/${novelTitle.toLowerCase()}/${chapter.path}`
                );

                if (!response.ok) {
                    throw new Error('Không thể tải nội dung chương');
                }

                const content = await response.text();

                // Parse nội dung
                const lines = content.split('\n').filter(line => line.trim());

                // Format nội dung
                const formattedContent = `
                    <div class="${styles.chapterHeader}">
                        <h1>${lines[0]}</h1>
                        <h2>${chapterTitle}</h2>
                        <div class="${styles.chapterInfo}">
                            <span>Độ dài: ${lines[2]?.split('Độ dài:')[1]?.trim() || ''} ${lines[3]?.trim() || ''}  - Bình luận: ${lines[4]?.split('Bình luận:')[1]?.trim() || ''}</span>
                            <span></span>
                        </div>
                    </div>
                    <div class="${styles.chapterContent}">
                        ${lines.slice(5).map(line => `<p>${line}</p>`).join('')}
                    </div>
                `;

                setChapterContent(formattedContent);
                setLoading(false);

            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        loadChapterContent();
    }, [novelTitle, chapterName]);

    const handleChapterChange = (event) => {
        const selectedChapter = chapters[event.target.value];
        navigate(`/read/${novelTitle}/${selectedChapter.name}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrevChapter = () => {
        if (currentChapterIndex > 0) {
            const prevChapter = chapters[currentChapterIndex - 1];
            navigate(`/read/${novelTitle}/${prevChapter.name}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNextChapter = () => {
        if (currentChapterIndex < chapters.length - 1) {
            const nextChapter = chapters[currentChapterIndex + 1];
            navigate(`/read/${novelTitle}/${nextChapter.name}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.readPage}>
            <div className={styles.topNavigation}>
                <Link 
                    to={novelId ? `/info/${novelId}` : '#'} 
                    className={styles.backButton}
                >
                    <i className="fas fa-arrow-left"></i>
                    Về trang thông tin
                </Link>
            </div>

            {loading && <div className={styles.loading}>Đang tải...</div>}
            {error && <div className={styles.error}>{error}</div>}
            {chapterContent && (
                <>
                    <div
                        className={styles.container}
                        dangerouslySetInnerHTML={{ __html: chapterContent }}
                    />
                    <div className={styles.navigation}>
                        <button 
                            onClick={handlePrevChapter}
                            disabled={currentChapterIndex <= 0}
                            className={styles.navButton}
                        >
                            Chương trước
                        </button>
                        
                        <select 
                            value={currentChapterIndex}
                            onChange={handleChapterChange}
                            className={styles.chapterSelect}
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
                            className={styles.navButton}
                        >
                            Chương sau
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ReadPage;