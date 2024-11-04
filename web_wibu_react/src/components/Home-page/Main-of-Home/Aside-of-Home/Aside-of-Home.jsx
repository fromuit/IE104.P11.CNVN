import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Aside-of-Home.css';

function Aside() {
  const navigate = useNavigate();
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

  // Mock data - sau này sẽ thay bằng dữ liệu thật
  const recentlyRead = [
    {
      id: 1,
      title: "Tên Truyện 1",
      chapter: "Chương 45",
      thumbnail: "/images/manga-1.jpg"
    },
    {
      id: 2,
      title: "Tên Truyện 2",
      chapter: "Chương 23",
      thumbnail: "/images/manga-2.jpg"
    },
    {
      id: 3,
      title: "Tên Truyện 3",
      chapter: "Chương 12",
      thumbnail: "/images/manga-3.jpg"
    }
  ];

  const bookmarks = [
    {
      id: 1,
      title: "Tên Truyện 1",
      chapter: "Chương 67",
      thumbnail: "/images/manga-4.jpg"
    },
    {
      id: 2,
      title: "Tên Truyện 2",
      chapter: "Chương 89",
      thumbnail: "/images/manga-5.jpg"
    },
    {
      id: 3,
      title: "Tên Truyện 3",
      chapter: "Chương 34",
      thumbnail: "/images/manga-6.jpg"
    }
  ];

  const cartItems = [
    {
      id: 1,
      title: "Tên Truyện 1",
      price: "75.000đ",
      thumbnail: "/images/manga-7.jpg"
    },
    {
      id: 2,
      title: "Tên Truyện 2",
      price: "82.000đ",
      thumbnail: "/images/manga-8.jpg"
    },
    {
      id: 3,
      title: "Tên Truyện 3",
      price: "68.000đ",
      thumbnail: "/images/manga-9.jpg"
    }
  ];

  // Tính toán tổng quan giỏ hàng
  const cartSummary = {
    totalItems: cartItems.length,
    totalPrice: cartItems.reduce((sum, item) => {
      // Chuyển đổi giá từ string "75.000đ" sang number 75000
      const price = parseInt(item.price.replace(/\D/g, ''));
      return sum + price;
    }, 0)
  };

  return (
    <div className="aside-wrapper" ref={wrapperRef}>
      <aside className="aside" ref={asideRef}>
        {/* User Info Section */}
        <div className="aside__user">
          <div className="aside__avatar">
            <img src="/images/avatar.png" alt="Avatar" />
          </div>
          <div className="aside__user-info">
            <h3 className="aside__username">Tên Người Dùng</h3>
            <span className="aside__handle">@username</span>
          </div>
        </div>

        {/* Recently Read Section */}
        <div className="aside__section">
          <div className="aside__section-header">
            <h4>Lịch sử đọc</h4>
            <Link to="/lich-su-doc" className="aside__view-more">
              Xem thêm <i className="fas fa-chevron-right"></i>
            </Link>
          </div>
          <div className="aside__manga-list">
            {recentlyRead.map(manga => (
              <Link key={manga.id} to={`/truyen/${manga.id}`} className="aside__manga-item">
                <img src={manga.thumbnail} alt={manga.title} />
                <div className="aside__manga-info">
                  <h5>{manga.title}</h5>
                  <span>{manga.chapter}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bookmarks Section */}
        <div className="aside__section">
          <div className="aside__section-header">
            <h4>Đánh dấu</h4>
            <Link to="/danh-dau" className="aside__view-more">
              Xem thêm <i className="fas fa-chevron-right"></i>
            </Link>
          </div>
          <div className="aside__manga-list">
            {bookmarks.map(manga => (
              <Link key={manga.id} to={`/truyen/${manga.id}`} className="aside__manga-item">
                <img src={manga.thumbnail} alt={manga.title} />
                <div className="aside__manga-info">
                  <h5>{manga.title}</h5>
                  <span>{manga.chapter}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Cart Section - Updated */}
        <div className="aside__section">
          <div className="aside__section-header">
            <h4>Giỏ hàng</h4>
          </div>
          <Link to="/gio-hang" className="aside__cart-summary">
            <div className="aside__cart-info">
              <div className="aside__cart-items">
                <i className="fas fa-shopping-cart"></i>
                <span>{cartSummary.totalItems} sản phẩm</span>
              </div>
              <div className="aside__cart-total">
                <span>Tổng tiền:</span>
                <span className="aside__price">{cartSummary.totalPrice.toLocaleString()}đ</span>
              </div>
            </div>
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default Aside;