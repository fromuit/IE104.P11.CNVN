import './signup.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

  // Hàm xử lý khi người dùng nhập liệu vào các trường input
  // e: event object chứa thông tin về sự kiện nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target; // Lấy tên trường và giá trị được nhập
    setFormData(prevState => ({
      ...prevState,     // Giữ nguyên các giá trị cũ
      [name]: value     // Cập nhật giá trị mới cho trường đang được nhập
    }));
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

    if (!formData.password) {
        tempErrors.password = 'Mật khẩu không được để trống';
        isValid = false;
    } else if (formData.password.length < 6) {
        tempErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
        tempErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        isValid = false;
    }

    setErrors(prev => ({...prev, ...tempErrors}));
    return isValid;
  };

  // Hàm xử lý khi form được submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error messages
    setErrors({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        submit: ''
    });

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
                navigate('/login');
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

  return (
    <div className="container">
      <div className="form-box">
        <h1 id="title">Đăng ký</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-field">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                name="fullName"
                placeholder="Họ và tên"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.fullName}
                </div>
              )}
            </div>
            <div className="input-field">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.email}
                </div>
              )}
            </div>
            <div className="input-field">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.password}
                </div>
              )}
            </div>
            <div className="input-field">
              <i className="fa-solid fa-check"></i>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          </div>
          {errors.submit && (
            <div className="error-message" style={{
              color: 'red',
              textAlign: 'center',
              marginBottom: '10px'
            }}>
              {errors.submit}
            </div>
          )}
          <div className="btn-field">
            <button type="submit">Đăng ký</button>
          </div>
          <div className="login-link">
            <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
