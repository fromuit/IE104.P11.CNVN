//Trước khi chạy server, cần chạy lệnh: npm install express fs path cors uuid
//Sau đó chạy lệnh: node server.js
//Sau đó ms chạy vite bt

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const dataPath = path.join(__dirname, 'data', 'users.json');

// Tạo thư mục data nếu chưa tồn tại
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Tạo file users.json nếu chưa tồn tại
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf8');
}

// API đăng ký
app.post('/api/signup', (req, res) => {
  try {
    const userData = req.body;
    const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    // Kiểm tra email đã tồn tại
    if (users.find(user => user.email === userData.email)) {
      return res.status(400).json({ error: 'Email đã tồn tại' });
    }

    // Tạo user mới với ID và các trường bổ sung
    const newUser = {
      id: uuidv4(),
      ...userData,
      role: 'user',
      status: 'active',
      avatar: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: null
    };

    users.push(newUser);
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
    
    // Trả về thông tin user (không bao gồm password)
    const { password, ...userWithoutPassword } = newUser;
    res.json({ 
      message: 'Đăng ký thành công',
      user: userWithoutPassword 
    });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// API lấy danh sách users
app.get('/api/users', (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi server' });
  }
});

// API đăng nhập
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Đọc dữ liệu từ file users.json
    const users = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    // Tìm user với email và password khớp
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Trả về thông tin user (không bao gồm password)
      const { password, ...userWithoutPassword } = user;
      res.json({ 
        message: 'Đăng nhập thành công',
        user: userWithoutPassword 
      });
    } else {
      res.status(401).json({ error: 'Email hoặc mật khẩu không chính xác' });
    }
  } catch (error) {
    console.error('Lỗi server:', error);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại port ${PORT}`);
});