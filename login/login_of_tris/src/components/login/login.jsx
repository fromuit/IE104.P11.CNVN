import './login.css';
import { useState } from 'react';

// Component xử lý đăng nhập người dùng
const Login = () => {
  // Khởi tạo state cho form data và error messages
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

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
        const response = await fetch('http://localhost:5000/api/login', {
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
          throw new Error(data.error || 'Đăng nhập thất bại');
        }

        // Lưu thông tin user vào localStorage nếu cần
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        alert('Đăng nhập thành công!');
        window.location.href = '/home';
      } catch (error) {
        console.error('Lỗi:', error);
        alert(error.message || 'Email hoặc mật khẩu không chính xác!');
      }
    }
  };

  // Render giao diện đăng nhập
  return (
    <div className="container">
      <div className="form-box">
        <h1 id="title">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-field">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="input-field">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="forgot-password">
              <a href="/forgot-password">Quên mật khẩu?</a>
            </div>
          </div>
          <div className="btn-field">
            <button type="submit">Đăng nhập</button>
          </div>
          <div className="signup-link">
            <p>Chưa có tài khoản? <a href="/signup">Đăng ký</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 