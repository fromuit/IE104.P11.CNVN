import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Aside-of-Home.module.scss';
import { useRef } from 'react'
import avatarAside from '../../../../data_and_source/Images/Avatars/avatar.png';
import bottomNavStyles from '../../../../components/Header/BottomNav/BottomNav.module.scss';
import footerStyles from '../../../../components/Footer/Footer.module.scss';
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
      const bottomNav = document.querySelector(`.${bottomNavStyles["bottom-nav"]}`);
      const footer = document.querySelector(`.${footerStyles.footer}`);
      
      // Check for null elements
      if (!bottomNav || !asideRef.current || !wrapperRef.current || !footer) {
        return;
      }
      
      const bottomNavRect = bottomNav.getBoundingClientRect();
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();
      const asideHeight = asideRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate distance to footer
      const distanceToFooter = footerRect.top - (bottomNavRect.bottom + asideHeight);
      const FOOTER_THRESHOLD = 100; // Minimum distance to footer (in pixels)
      
      // Determine if we should stick the aside
      if (wrapperRect.top <= bottomNavRect.bottom) {
        const availableSpace = viewportHeight - bottomNavRect.bottom;
        
        if (distanceToFooter <= FOOTER_THRESHOLD) {
          // Too close to footer - remove sticky behavior
          asideRef.current.classList.remove(styles.sticky);
          asideRef.current.style.position = "absolute";
          asideRef.current.style.bottom = "0";
          asideRef.current.style.top = "auto";
        } else if (availableSpace >= asideHeight) {
          // Enough space and not too close to footer - make it sticky
          asideRef.current.classList.add(styles.sticky);
          asideRef.current.style.position = "fixed";
          asideRef.current.style.top = `${bottomNavRect.bottom}px`;
          asideRef.current.style.bottom = "auto";
        } else {
          // Not enough vertical space - allow scrolling
          asideRef.current.classList.remove(styles.sticky);
          asideRef.current.style.position = "fixed";
          asideRef.current.style.top = `${bottomNavRect.bottom}px`;
          asideRef.current.style.maxHeight = `${availableSpace}px`;
          asideRef.current.style.overflowY = "auto";
        }
      } else {
        // Reset to default position
        asideRef.current.classList.remove(styles.sticky);
        asideRef.current.style.position = "static";
        asideRef.current.style.top = "0";
        asideRef.current.style.bottom = "auto";
        asideRef.current.style.maxHeight = "none";
        asideRef.current.style.overflowY = "visible";
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial position setup
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
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
      <div className={styles["aside__section"]}>
        <div className={styles["aside__section-header"]}>
          <h4>Giỏ hàng</h4>
          {isLoggedIn && (
            <Link to="/gio-hang" className={styles["aside__view-more"]}>
              Xem thêm <i className={styles["fas fa-chevron-right"]}></i>
            </Link>
          )}
        </div>
        <div className={styles["aside__manga-list"]}>
          {cartSummary.items.length > 0 ? (
            cartSummary.items.map((item, index) => (
              <div key={index} className={styles["aside__manga-item"]}>
                <img src={item.thumbnail} alt={item.title} />
                <div className={styles["aside__manga-info"]}>
                  <h5>{item.title}</h5>
                  <span className={styles["aside__price"]}>{item.price}đ</span>
                </div>
              </div>
            ))
          ) : (
            <div className={styles["aside__empty-state"]}>
              <i className={styles["fas fa-shopping-cart"]}></i>
              <p>Giỏ hàng trống</p>
            </div>
          )}
        </div>
        {cartSummary.items.length > 0 && (
          <div className={styles["aside__cart-total"]}>
            <span>Tổng cộng:</span>
            <span className={styles["aside__price"]}>{cartSummary.total}đ</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles["aside-wrapper"]} ref={wrapperRef}>
      <aside className={styles["aside"]} ref={asideRef}>
        {isLoggedIn ? (
          <>
            {/* User Info Section */}
            <div className={styles["aside__user"]}>
              <div className={styles["aside__avatar"]}>
                <img src={avatarAside} alt="Avatar" />
              </div>
              <div className={styles["aside__user-info"]}>
                <h3 className={styles["aside__username"]}>{userData?.fullName}</h3>
                <span className={styles["aside__handle"]}>@{userData?.email.split('@')[0]}</span>
              </div>
            </div>

            {/* Recently Read Section */}
            <div className={styles["aside__section"]}>
              <div className={styles["aside__section-header"]}>
                <h4>Lịch sử đọc</h4>
                {isLoggedIn && (
                  <Link to="/lich-su-doc" className={styles["aside__view-more"]}>
                    Xem thêm <i className={styles["fas fa-chevron-right"]}></i>
                  </Link>
                )}
              </div>
              <div className={styles["aside__manga-list"]}>
                {isLoggedIn && recentlyReadData.length > 0 ? (
                  recentlyReadData.map(manga => (
                    <Link key={manga.id} to={`/info/${manga.id}`} className={styles["aside__manga-item"]}>
                      <img src={manga.thumbnail} alt={manga.title} />
                      <div className={styles["aside__manga-info"]}>
                        <h5>{manga.title}</h5>
                        <span>{manga.chapter}</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className={styles["aside__empty-state"]}>
                    <i className={styles["fas fa-book-open"]}></i>
                    <p>Chưa có lịch sử đọc</p>
                  </div>
                )}
              </div>
            </div>

            {/* Bookmarks Section */}
            <div className={styles["aside__section"]}>
              <div className={styles["aside__section-header"]}>
                <h4>Đánh dấu</h4>
                <Link to="/danh-dau" className={styles["aside__view-more"]}>
                  Xem thêm <i className={styles["fas fa-chevron-right"]}></i>
                </Link>
              </div>
              <div className={styles["aside__manga-list"]}>
                {isLoggedIn && bookmarksData.length > 0 ? (
                  bookmarksData.map(manga => (
                    <Link key={manga.id} to={`/info/${manga.id}`} className={styles["aside__manga-item"]}>
                      <img src={manga.thumbnail} alt={manga.title} />
                      <div className={styles["aside__manga-info"]}>
                        <h5>{manga.title}</h5>
                        <span>{manga.chapter}</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className={styles["aside__empty-state"]}>
                    <i className={styles["fas fa-bookmark"]}></i>
                    <p>Chưa có truyện đánh dấu</p>
                  </div>
                )}
              </div>
            </div>

            {renderCartSection()}
          </>
        ) : (
          <div className={styles["aside__guest"]}>
            <div className={styles["aside__guest-message"]}>
              <i className={styles["fas fa-user-circle"]}></i>
              <p>Hãy đăng nhập để có thể sử dụng các chức năng sau.</p>
              <div className={styles["aside__benefits"]}>
                <ul>
                  <li><i className={styles["fas fa-check"]}></i> Lưu lịch sử đọc truyện</li>
                  <li><i className={styles["fas fa-check"]}></i> Đánh dấu truyện yêu thích</li>
                  <li><i className={styles["fas fa-check"]}></i> Mua truyện trực tuyến</li>
                  <li><i className={styles["fas fa-check"]}></i> Bình luận và đánh giá</li>
                  <li><i className={styles["fas fa-check"]}></i> Nhận thông báo cập nhật mới</li>
                </ul>
              </div>
              <Link to="/signin" className={styles["aside__signin-button"]}>
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