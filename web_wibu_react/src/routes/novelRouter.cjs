const express = require('express');
const path = require('path');
const novels = require('../data_and_source/Novel_Data/novels_chapters.json');

const router = express.Router();

// Kiểm tra truyện có tồn tại
router.get('/check-novel-directory/:title', async (req, res) => {
  try {
    const novelTitle = req.params.title.toLowerCase();
    console.log('Tựa đề cần tìm (lowercase):', novelTitle);
    
    const exists = !!novels[novelTitle];
    res.json({ exists });
  } catch (error) {
    console.error('Lỗi kiểm tra truyện:', error);
    res.status(500).json({ error: 'Lỗi khi kiểm tra truyện' });
  }
});

// Lấy danh sách chapter của truyện
router.get('/list-chapters/:title', async (req, res) => {
  try {
    const novelTitle = req.params.title.toLowerCase();
    console.log('Tựa đề cần tìm (lowercase):', novelTitle);
    
    const novel = novels[novelTitle];
    if (!novel) {
      return res.status(404).json({ error: 'Không tìm thấy truyện' });
    }
    
    // Tạo mảng chứa tên các chương
    const chapters = [];
    for (let i = 1; i <= Object.keys(novel.chapters).length; i++) {
      if (novel.chapters[i]) {
        chapters.push(`Chương ${i}: ${novel.chapters[i].name}`);
      }
    }
    
    res.json({ chapters });
  } catch (error) {
    console.error('Lỗi đọc danh sách chương:', error);
    res.status(500).json({ error: 'Lỗi khi đọc danh sách chương' });
  }
});

module.exports = router;

