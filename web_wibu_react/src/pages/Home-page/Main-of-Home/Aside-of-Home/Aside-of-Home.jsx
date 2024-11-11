import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Aside-of-Home.css';
import { useRef } from 'react'
import avatarAside from '../../../../data_and_source/Images/avatar.png';


function Aside() {
  // const navigate = useNavigate();
  const asideRef = useRef(null);
  const wrapperRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartSummary, setCartSummary] = useState({
    items: [],
    total: 0
  });
  const [recentlyReadData, setRecentlyReadData] = useState([]);
  const [bookmarksData, setBookmarksData] = useState([]);
  // const [showBenefits, setShowBenefits] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi component mount
    const user = localStorage.getItem('currentUser');
    if (user) {
      setUserData(JSON.parse(user));
      setIsLoggedIn(true);
    }
  }, []);

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

  useEffect(() => {
    // Kiểm tra đăng nhập và lấy thông tin giỏ hàng
    const user = localStorage.getItem('currentUser');
    const cart = localStorage.getItem('cart');

    if (user) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(user));
    }

    if (cart) {
      const cartData = JSON.parse(cart);
      setCartSummary({
        items: cartData.items || [],
        total: cartData.total || 0
      });
    }
  }, []);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const user = localStorage.getItem('currentUser');
    const recentlyRead = localStorage.getItem('recentlyRead');
    const bookmarks = localStorage.getItem('bookmarks');

    if (user) {
      setUserData(JSON.parse(user));
      setIsLoggedIn(true);
    }

    if (recentlyRead) {
      setRecentlyReadData(JSON.parse(recentlyRead));
    }

    if (bookmarks) {
      setBookmarksData(JSON.parse(bookmarks));
    }
  }, []);

  // Dữ liệu mặc định khi không đăng nhập
  // const defaultData = {
  //   recentlyRead: [],
  //   bookmarks: [],
  //   cartItems: []
  // };

  // Phần render giỏ hàng
  const renderCartSection = () => {
    return (
      <div className="aside__section">
        <div className="aside__section-header">
          <h4>Giỏ hàng</h4>
          {isLoggedIn && (
            <Link to="/gio-hang" className="aside__view-more">
              Xem thêm <i className="fas fa-chevron-right"></i>
            </Link>
          )}
        </div>
        <div className="aside__manga-list">
          {cartSummary.items.length > 0 ? (
            cartSummary.items.map((item, index) => (
              <div key={index} className="aside__manga-item">
                <img src={item.thumbnail} alt={item.title} />
                <div className="aside__manga-info">
                  <h5>{item.title}</h5>
                  <span className="aside__price">{item.price}đ</span>
                </div>
              </div>
            ))
          ) : (
            <div className="aside__empty-state">
              <i className="fas fa-shopping-cart"></i>
              <p>Giỏ hàng trống</p>
            </div>
          )}
        </div>
        {cartSummary.items.length > 0 && (
          <div className="aside__cart-total">
            <span>Tổng cộng:</span>
            <span className="aside__price">{cartSummary.total}đ</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="aside-wrapper" ref={wrapperRef}>
      <aside className="aside" ref={asideRef}>
        {isLoggedIn ? (
          <>
            {/* User Info Section */}
            <div className="aside__user">
              <div className="aside__avatar">
                <img src={avatarAside} alt="Avatar" />
              </div>
              <div className="aside__user-info">
                <h3 className="aside__username">{userData?.fullName}</h3>
                <span className="aside__handle">@{userData?.email.split('@')[0]}</span>
              </div>
            </div>

            {/* Recently Read Section */}
            <div className="aside__section">
              <div className="aside__section-header">
                <h4>Lịch sử đọc</h4>
                {isLoggedIn && (
                  <Link to="/lich-su-doc" className="aside__view-more">
                    Xem thêm <i className="fas fa-chevron-right"></i>
                  </Link>
                )}
              </div>
              <div className="aside__manga-list">
                {isLoggedIn && recentlyReadData.length > 0 ? (
                  recentlyReadData.map(manga => (
                    <Link key={manga.id} to={`/info/${manga.id}`} className="aside__manga-item">
                      <img src={manga.thumbnail} alt={manga.title} />
                      <div className="aside__manga-info">
                        <h5>{manga.title}</h5>
                        <span>{manga.chapter}</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="aside__empty-state">
                    <i className="fas fa-book-open"></i>
                    <p>Chưa có lịch sử đọc</p>
                  </div>
                )}
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
                {isLoggedIn && bookmarksData.length > 0 ? (
                  bookmarksData.map(manga => (
                    <Link key={manga.id} to={`/info/${manga.id}`} className="aside__manga-item">
                      <img src={manga.thumbnail} alt={manga.title} />
                      <div className="aside__manga-info">
                        <h5>{manga.title}</h5>
                        <span>{manga.chapter}</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="aside__empty-state">
                    <i className="fas fa-bookmark"></i>
                    <p>Chưa có truyện đánh dấu</p>
                  </div>
                )}
              </div>
            </div>

            {renderCartSection()}
          </>
        ) : (
          <div className="aside__guest">
            <div className="aside__guest-message">
              <i className="fas fa-user-circle"></i>
              <p>Hãy đăng nhập để có thể sử dụng các chức năng sau.</p>
              <div className="aside__benefits">
                <ul>
                  <li><i className="fas fa-check"></i> Lưu lịch sử đọc truyện</li>
                  <li><i className="fas fa-check"></i> Đánh dấu truyện yêu thích</li>
                  <li><i className="fas fa-check"></i> Mua truyện trực tuyến</li>
                  <li><i className="fas fa-check"></i> Bình luận và đánh giá</li>
                  <li><i className="fas fa-check"></i> Nhận thông báo cập nhật mới</li>
                </ul>
              </div>
              <Link to="/signin" className="aside__signin-button">
                Đăng nhập
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

export default Aside;