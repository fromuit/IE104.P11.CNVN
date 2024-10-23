// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Cho phép CORS cho mọi yêu cầu
app.use(cors());

// Đường dẫn tới thư mục chứa các bộ truyện
const directoryPath = 'D:/IE104.P11.CNVN/truyen';

app.get('/list-files', (req, res) => {
    fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error('Lỗi khi đọc thư mục:', err);
            return res.status(500).send({ message: "Không thể đọc thư mục" });
        }
        const directories = files.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
        res.json(directories);
    });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});