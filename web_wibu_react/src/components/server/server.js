const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Đường dẫn đến file db.json
const dbPath = path.join(__dirname, 'db.json');

// API đăng ký
app.post('/api/signup', (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Đọc dữ liệu hiện tại
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    // Kiểm tra email đã tồn tại
    if (data.users.some(user => user.email === email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email đã được sử dụng' 
      });
    }

    // Thêm user mới
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // Trong thực tế nên mã hóa password
      fullName,
      createdAt: new Date().toISOString()
    };

    data.users.push(newUser);

    // Lưu vào file
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

    res.json({ 
      success: true, 
      message: 'Đăng ký thành công' 
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Lỗi server' 
    });
  }
});

// API đăng nhập
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Đọc dữ liệu
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    // Tìm user
    const user = data.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Email hoặc mật khẩu không chính xác' 
      });
    }

    // Tạo response không bao gồm password
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      token: 'fake-jwt-token-' + Date.now(), // Trong thực tế nên dùng JWT
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Lỗi server' 
    });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Thêm xử lý graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});