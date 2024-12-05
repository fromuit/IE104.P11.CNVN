import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bgImage from '../../data_and_source/images/bg_for_signin.png';
import styles from './SignIn.module.scss';

// Component xử lý đăng nhập người dùng
const Signin = () => {
  const navigate = useNavigate();

  // Khởi tạo state cho form data và error messages
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    submit: ''
  });

  // Thêm state để quản lý việc hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  // Xử lý sự kiện khi người dùng nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Kiểm tra tính hợp lệ của form trước khi submit
  const validateForm = () => {
    let tempErrors = {};
    // Kiểm tra email
    if (!formData.email.trim()) {
      tempErrors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email không hợp lệ';
    }
    // Kiểm tra password
    if (!formData.password) {
      tempErrors.password = 'Mật khẩu không được để trống';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Xử lý sự kiện submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Email hoặc mật khẩu không chính xác');
        }

        // Xóa thông báo lỗi nếu đăng nhập thành công
        setErrors({
          email: '',
          password: '',
          submit: ''
        });

        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        
        alert('Đăng nhập thành công!');
        navigate('/');
      } catch (error) {
        console.error('Lỗi:', error);
        setErrors(prev => ({
          ...prev,
          submit: error.message
        }));
      }
    }
  };

  // Render giao diện đăng nhập
  return (
    <div className={styles["signin-container"]} style={{ backgroundImage: `url(${bgImage})`,
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center',
                                      backgroundRepeat: 'no-repeat'}}>
       <button 
        className={styles["home-nav-btn"]}
        onClick={() => navigate("/")}
      >
        <i className="fas fa-home"></i>
      </button>

      <div className={styles["signin-form-box"]}>
        <h1 className={styles["signin-title"]}>Đăng nhập</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles["signin-input-group"]}>
            <div className={styles["signin-input-field"]}>
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className={styles["signin-error"]}>{errors.email}</span>}
            </div>
            <div className={styles["signin-input-field"]}>
              <i className="fas fa-lock"></i>
              <div style={{ 
                position: "relative", 
                flex: 1,
                display: "flex",
                alignItems: "center" 
              }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
                <i 
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "0px",
                    cursor: "pointer",
                    color: "#999"
                  }}
                />
              </div>
              {errors.password && <span className={styles["signin-error"]}>{errors.password}</span>}
            </div>
            <div className={styles["signin-forgot-password"]}>
              <a href="/forgot-password">Quên mật khẩu?</a>
            </div>
          </div>
          {errors.submit && (
            <div className={styles["signin-error"]} style={{
              color: 'red',
              textAlign: 'center',
              marginBottom: '10px',
              animation: 'shake 0.3s ease-in-out'
            }}>
              {errors.submit}
            </div>
          )}
          <div className={styles["signin-btn-field"]}>
            <button type="submit">Đăng nhập</button>
          </div>
          <div className={styles["signin-signup-link"]}>
            <p>Chưa có tài khoản? <Link to="/signup">Đăng ký</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin; 