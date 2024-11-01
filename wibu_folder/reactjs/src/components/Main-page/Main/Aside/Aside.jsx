import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Aside.css';

function Aside() {
  
  const asideRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const topNav = document.querySelector('.top-nav');
      const bottomNav = document.querySelector('.bottom-nav');
      const footer = document.querySelector('.footer');
      
      const topNavHeight = topNav.offsetHeight;
      const bottomNavHeight = bottomNav.offsetHeight;
      const totalOffset = topNavHeight + bottomNavHeight;
      
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();
      
      // Kiểm tra khi aside chạm đến điểm sticky
      if (wrapperRect.top <= totalOffset) {
        asideRef.current.classList.add('sticky');
        asideRef.current.style.top = `${totalOffset}px`;
        
        // Kiểm tra khi aside chạm footer
        const asideHeight = asideRef.current.offsetHeight;
        const distanceToFooter = footerRect.top - (totalOffset + asideHeight);
        
        if (distanceToFooter <= 0) {
          // Điều chỉnh vị trí để không đè lên footer
          asideRef.current.style.top = `${totalOffset + distanceToFooter}px`;
        }
      } else {
        asideRef.current.classList.remove('sticky');
        asideRef.current.style.top = '0';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="aside-wrapper" ref={wrapperRef}>
      <aside className="aside" ref={asideRef}>
        <Link to="/tai-khoan" className="aside__user">
          <div className="aside__avatar">
            {/* Sử dụng cùng đường dẫn với TopNav */}
            <img src="/images/avatar.png" alt="Avatar" />
          </div>
          <div className="aside__user-info">
            <h3 className="aside__username">Tên Người Dùng</h3>
            <span className="aside__handle">@username</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="aside__nav">
          <Link to="/thong-bao" className="aside__nav-item">
            <i className="fas fa-bell"></i>
            <span>Thông báo</span>
            <span className="aside__badge">3</span> {/* Badge cho thông báo mới */}
          </Link>

          <Link to="/lich-su-doc" className="aside__nav-item">
            <i className="fas fa-history"></i>
            <span>Lịch sử đọc</span>
          </Link>

          <Link to="/danh-dau" className="aside__nav-item">
            <i className="fas fa-bookmark"></i>
            <span>Đánh dấu</span>
          </Link>

          <Link to="/hop-thu" className="aside__nav-item">
            <i className="fas fa-envelope"></i>
            <span>Hộp thư</span>
            <span className="aside__badge">1</span>
          </Link>

          <Link to="/thao-luan" className="aside__nav-item">
            <i className="fas fa-comments"></i>
            <span>Thảo luận</span>
          </Link>

          <Link to="/tu-sach" className="aside__nav-item">
            <i className="fas fa-book"></i>
            <span>Tủ sách</span>
          </Link>

          <Link to="/gio-hang" className="aside__nav-item">
            <i className="fas fa-shopping-cart"></i>
            <span>Giỏ hàng</span>
            <span className="aside__badge">2</span>
          </Link>
        </nav>
      </aside>
    </div>
  );
}

export default Aside;