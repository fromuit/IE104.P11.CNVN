const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    const $ = cheerio.load(response.data);
    const content = $('body').text();
    console.log('Nội dung trang web:');
    console.log(content);
  } catch (error) {
    console.error('Có lỗi khi đọc nội dung:', error);
  }
}

const url = 'https://truyenqqto.com/truyen-tranh/dark-gathering-7213-chap-60.html';
scrapeWebsite(url);