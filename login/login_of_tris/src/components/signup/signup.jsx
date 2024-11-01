import './signup.css';
import { useState } from 'react';

// Component chính xử lý đăng ký người dùng mới
const Signup = () => {
  // Khởi tạo state để lưu trữ dữ liệu form
  // formData: object chứa các trường thông tin người dùng nhập vào
  // errors: object chứa các thông báo lỗi tương ứng với từng trường
  const [formData, setFormData] = useState({
    email: '',           // Email người dùng
    password: '',        // Mật khẩu
    confirmPassword: '', // Xác nhận mật khẩu
    fullName: ''        // Họ tên đầy đủ
  });
  const [errors, setErrors] = useState({});

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
    let tempErrors = {}; // Object tạm để lưu các lỗi

    // Kiểm tra email: không được trống và phải đúng định dạng
    if (!formData.email.trim()) {
      tempErrors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email không hợp lệ';
    }
    
    // Kiểm tra họ tên: không được trống
    if (!formData.fullName.trim()) {
      tempErrors.fullName = 'Họ tên không được để trống';
    }

    // Kiểm tra mật khẩu: không được trống và phải đủ độ dài tối thiểu
    if (!formData.password) {
      tempErrors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    // Kiểm tra xác nhận mật khẩu: phải khớp với mật khẩu đã nhập
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(tempErrors); // Cập nhật state errors
    return Object.keys(tempErrors).length === 0; // Trả về true nếu không có lỗi
  };

  // Hàm xử lý khi form được submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi submit mặc định của form
    if (validateForm()) { // Kiểm tra form hợp lệ
      try {
        // Tạo object chứa thông tin người dùng để gửi lên server
        const userData = {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          createdAt: new Date().toISOString() // Thêm thời gian tạo tài khoản
        };

        // Gửi request đăng ký đến server
        const response = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error);
        }

        alert('Đăng ký thành công!');
        window.location.href = '/login';
      } catch (error) {
        console.error('Lỗi:', error);
        alert(error.message || 'Đã xảy ra lỗi khi đăng ký!');
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
              {errors.fullName && <span className="error">{errors.fullName}</span>}
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
              {errors.email && <span className="error">{errors.email}</span>}
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
              {errors.password && <span className="error">{errors.password}</span>}
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
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
          </div>
          <div className="btn-field">
            <button type="submit">Submit</button>
          </div>
          <div className="login-link">
            <p>Already have an account? <a href="/login">Log in</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
