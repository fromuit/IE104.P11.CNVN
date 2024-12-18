import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import novelsData from '../../data_and_source/Novel_Data/novels_chapters.json';
import styles from './Read-page.module.scss';

function ReadPage() {
    const { novelTitle, chapterName } = useParams();
    const [chapterContent, setChapterContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadChapterContent = async () => {
            try {
                const novel = novelsData[novelTitle.toLowerCase()];
                if (!novel) {
                    throw new Error('Không tìm thấy truyện');
                }

                const chapter = Object.values(novel.chapters).find(
                    c => c.name === chapterName
                );

                if (!chapter) {
                    throw new Error('Không tìm thấy chương');
                }

                // Thêm log để kiểm tra đường dẫn
                console.log('Đường dẫn chapter:', chapter.path);

                const response = await fetch(`/api/chapter?path=${encodeURIComponent(chapter.path)}`);

                // Kiểm tra response status và content type
                console.log('Response status:', response.status);
                console.log('Content type:', response.headers.get('content-type'));

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const html = await response.text();


                if (!html || html.trim() === '') {
                    throw new Error('Nội dung file trống');
                }

                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Kiểm tra lỗi parsing
                const parserError = doc.querySelector('parsererror');
                if (parserError) {
                    throw new Error('Lỗi parsing HTML: ' + parserError.textContent);
                }

                // Log để debug
                console.log('Parsed document:', doc);

                // Lấy nội dung từ các thẻ
                const title = doc.querySelector('.title-top h2')?.textContent;
                const subTitle = doc.querySelector('.title-top h4')?.textContent;
                const content = doc.querySelector('#chapter-content');

                console.log('Thông tin chương:', {
                    title: title || 'Không có title',
                    subTitle: subTitle || 'Không có subtitle'
                });

                if (!content) {
                    throw new Error('Không tìm thấy nội dung chương');
                }


                // Lấy tất cả các thẻ p trong content
                const paragraphs = content.getElementsByTagName('p');
                const contentArray = Array.from(paragraphs).map(p => p.textContent);

                // Log để debug
                console.log('Các đoạn văn:', contentArray);

                // Tạo HTML content với các đoạn văn được tách riêng
                setChapterContent(`
          <h2>${title || ''}</h2>
          <h4>${subTitle || ''}</h4>
          <div class="chapter-content">
            ${contentArray.map(para => `<p>${para}</p>`).join('\n')}
          </div>
        `);
                setLoading(false);

            } catch (err) {
                setError(err.message);
                console.error('Lỗi:', err);
                setLoading(false);
            }
        };

        loadChapterContent();
    }, [novelTitle, chapterName]);

    return (
        <div className={styles.readPage}>
            {loading && <div className={styles.loading}>Đang tải...</div>}
            {error && <div className={styles.error}>{error}</div>}
            {chapterContent && (
                <div className={styles.chapterContent}>
                    <h1 className={styles.chapterTitle}>{chapterName}</h1>
                    <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: chapterContent }}
                    />
                </div>
            )}
        </div>
    );
}

export default ReadPage;