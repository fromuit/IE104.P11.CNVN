import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h3>Về chúng tôi</h3>
          <ul className="footer__links">
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Điều khoản sử dụng</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <h3>Hỗ trợ</h3>
          <ul className="footer__links">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Liên hệ</a></li>
            <li><a href="#">Báo lỗi</a></li>
          </ul>
        </div>

        <div className="footer__section">
          <h3>Theo dõi chúng tôi</h3>
          <ul className="footer__links">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Discord</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; 2024 Light Novel Website. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;