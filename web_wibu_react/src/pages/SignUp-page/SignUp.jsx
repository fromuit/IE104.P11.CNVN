import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from '../../data_and_source/images/bg_for_signup.png';
import styles from './SignUp.module.scss';

// Component chính xử lý đăng ký người dùng mới
const Signup = () => {
  const navigate = useNavigate();

  // Khởi tạo state để lưu trữ dữ liệu form
  // formData: object chứa các trường thông tin người dùng nhập vào
  // errors: object chứa các thông báo lỗi tương ứng với từng trường
  const [formData, setFormData] = useState({
    email: '',           // Email người dùng
    password: '',        // Mật khẩu
    confirmPassword: '', // Xác nhận mật khẩu
    fullName: ''        // Họ tên đầy đủ
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    submit: '' // Thêm trường này để lưu lỗi submit
  });

  // Thêm state để quản lý việc hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Thêm state để theo dõi tính hợp lệ của form
  const [isValid, setIsValid] = useState(true);

  // Thêm state để theo dõi việc form đã được submit chưa
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Hàm xử lý khi người dùng nhập liệu vào các trường input
  // e: event object chứa thông tin về sự kiện nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target; // Lấy tên trường và giá trị được nhập
    setFormData(prevState => ({
      ...prevState,     // Giữ nguyên các giá trị cũ
      [name]: value     // Cập nhật giá trị mới cho trường đang được nhập
    }));
    
    // Chỉ validate form sau khi đã submit lần đầu
    if (isSubmitted) {
      setTimeout(() => validateForm(), 100);
    }
  };

  // Hàm kiểm tra tính hợp lệ của form trước khi submit
  const validateForm = () => {
    let isValid = true;
    let tempErrors = {};

    if (!formData.fullName.trim()) {
        tempErrors.fullName = 'Họ tên không được để trống';
        isValid = false;
    }

    if (!formData.email.trim()) {
        tempErrors.email = 'Email không được để trống';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        tempErrors.email = 'Email không hợp lệ';
        isValid = false;
    }

    if (!formData.password || formData.password.trim() === "") {
        tempErrors.password = "Mật khẩu không được để trống";
        isValid = false;
    } else if (formData.password.length < 6) {
        tempErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
        tempErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        isValid = false;
    }

    setErrors(tempErrors);
    setIsValid(isValid); // Cập nhật state isValid
    return isValid;
  };

  // Hàm xử lý khi form được submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Đánh dấu form đã được submit

    if (validateForm()) {
        try {
            const userData = {
                fullName: formData.fullName.trim(),
                email: formData.email.trim(),
                password: formData.password
            };

            // Log data being sent
            console.log('Sending data:', userData);

            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Đăng ký thất bại');
            }

            if (data.success) {
                alert('Đăng ký thành công!');
                navigate('/signin');
            } else {
                throw new Error(data.error || 'Đăng ký thất bại');
            }

        } catch (error) {
            console.error('Client error:', error);
            setErrors(prev => ({
                ...prev,
                submit: error.message
            }));
        }
    }
  };

  // Cập nhật hàm xử lý hiện/ẩn mật khẩu xác nhận
  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
    // Nếu đang hiện confirm password, cũng hiện password
    if (!showConfirmPassword) {
      setShowPassword(true);
    }
    // Nếu đang ẩn confirm password, cũng ẩn password
    else {
      setShowPassword(false);
    }
  };

  return (
    <div className={styles["signup-container"]} style={{ backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'}}>
      <button 
        className={styles["home-nav-btn"]}
        onClick={() => navigate("/")}
      >
        <i className="fas fa-home"></i>
      </button>
      
      <div className={styles["signup-form-box"]}>
        <h1 className={styles["signup-title"]}>Đăng ký</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles["signup-input-group"]}>
            <div className={styles["signup-input-field"]}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="fullName"
                placeholder="Họ và tên"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <div className={styles["signup-error"]}>
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.fullName}
                </div>
              )}
            </div>

            <div className={styles["signup-input-field"]}>
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className={styles["signup-error"]}>
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.email}
                </div>
              )}
            </div>

            <div className={styles["signup-input-field"]}>
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
              />
              {isValid && (
                <button
                  type="button"
                  className={styles["signup-password-toggle"]}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              )}
              {errors.password && (
                <div className={styles["signup-error"]}>
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.password}
                </div>
              )}
            </div>

            <div className={styles["signup-input-field"]}>
              <i className="fas fa-check"></i>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {isValid && (
                <button
                  type="button"
                  className={styles["signup-password-toggle"]}
                  onClick={handleConfirmPasswordToggle}
                >
                  <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              )}
              {errors.confirmPassword && (
                <div className={styles["signup-error"]}>
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          </div>

          {errors.submit && (
            <div className={styles.errorMessage}>
              <i className="fas fa-exclamation-circle"></i>
              {errors.submit}
            </div>
          )}

          <div className={styles["signup-btn-field"]}>
            <button type="submit">Đăng ký</button>
          </div>

          <div className={styles["signup-signin-link"]}>
            <p>Đã có tài khoản? <Link to="/signin">Đăng nhập</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

