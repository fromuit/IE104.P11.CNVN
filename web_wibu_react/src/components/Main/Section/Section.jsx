import React from 'react';
import './Section.css';

const Section = () => {
  const sections = [
    {
      id: 'top',
      title: 'Top truyện',
      novels: [
        // Thêm dữ liệu truyện sau
      ]
    },
    {
      id: 'latest',
      title: 'Mới cập nhật',
      novels: [
        // Thêm dữ liệu truyện sau
      ]
    }
  ];

  return (
    <section className="main-section">
      {sections.map(section => (
        <div key={section.id} className="section-block">
          <div className="section-header">
            <h2>{section.title}</h2>
            <a href={`/${section.id}`} className="view-all">Xem tất cả</a>
          </div>
          <div className="section-content">
            {/* Nội dung section sẽ được thêm sau */}
            <p>Nội dung {section.title} sẽ được hiển thị ở đây</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Section;