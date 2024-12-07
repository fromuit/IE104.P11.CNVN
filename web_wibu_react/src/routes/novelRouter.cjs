const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const NOVELS_DIR = 'D:\\IE104.P11.CNVN\\truyen_filtered';

// Kiểm tra thư mục truyện có tồn tại
router.get('/check-novel-directory/:title', async (req, res) => {
  try {
    const novelTitle = req.params.title.toLowerCase();
    const directories = await fs.readdir(NOVELS_DIR);
    
    // Log để kiểm tra
    console.log('Tựa đề cần tìm (lowercase):', novelTitle);
    
    const novelDir = directories.find(dir => {
      const lowercaseDir = dir.toLowerCase();
      console.log('Tên thư mục con (lowercase):', lowercaseDir);
      return lowercaseDir === novelTitle;
    });
    
    const exists = !!novelDir;
    res.json({ exists });
  } catch (error) {
    console.error('Lỗi kiểm tra thư mục:', error);
    res.status(500).json({ error: 'Lỗi khi kiểm tra thư mục' });
  }
});

// Lấy danh sách tên file trong thư mục truyện
router.get('/list-chapters/:title', async (req, res) => {
  try {
    const novelTitle = req.params.title.toLowerCase();
    const directories = await fs.readdir(NOVELS_DIR);
    
    // Log để kiểm tra
    console.log('Tựa đề cần tìm (lowercase):', novelTitle);
    
    const novelDir = directories.find(dir => {
      const lowercaseDir = dir.toLowerCase();
      console.log('Tên thư mục con (lowercase):', lowercaseDir);
      return lowercaseDir === novelTitle;
    });
    
    if (!novelDir) {
      return res.status(404).json({ error: 'Không tìm thấy thư mục truyện' });
    }
    
    const files = await fs.readdir(path.join(NOVELS_DIR, novelDir));
    const chapters = files.filter(file => file.toLowerCase().endsWith('.html'));
    
    res.json({ chapters });
  } catch (error) {
    console.error('Lỗi đọc danh sách chương:', error);
    res.status(500).json({ error: 'Lỗi khi đọc danh sách chương' });
  }
});

module.exports = router;

