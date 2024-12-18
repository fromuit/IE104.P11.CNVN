import './Footer.css';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer__container"]}>
        <div className={styles["footer__section"]}>
          <h3 className={styles["footer__section-title"]}>Về chúng tôi</h3>
          <ul className={styles["footer__link-list"]}>
            <li><a className={styles["footer__link"]} href="#">Giới thiệu</a></li>
            <li><a className={styles["footer__link"]} href="#">Điều khoản sử dụng</a></li>
            <li><a className={styles["footer__link"]} href="#">Chính sách bảo mật</a></li>
          </ul>
        </div>

        <div className={styles["footer__section"]}>
          <h3 className={styles["footer__section-title"]}>Hỗ trợ</h3>
          <ul className={styles["footer__link-list"]}>
            <li><a className={styles["footer__link"]} href="#">FAQ</a></li>
            <li><a className={styles["footer__link"]} href="#">Liên hệ</a></li>
            <li><a className={styles["footer__link"]} href="#">Báo lỗi</a></li>
          </ul>
        </div>

        <div className={styles["footer__section"]}>
          <h3 className={styles["footer__section-title"]}>Theo dõi chúng tôi</h3>
          <ul className={styles["footer__link-list"]}>
            <li><a className={styles["footer__link"]} href="#">Facebook</a></li>
            <li><a className={styles["footer__link"]} href="#">Twitter</a></li>
            <li><a className={styles["footer__link"]} href="#">Discord</a></li>
          </ul>
        </div>
      </div>

      <div className={styles["footer__bottom"]}>
        <p className={styles["footer__copyright"]}>&copy; 2024 Light Novel Website. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;