const Novel = require('../models/Novel');
const Comment = require('../models/Comment');

// Controller cho Series novels
exports.getSeriesNovels = async (req, res) => {
  try {
    const seriesNovels = await Novel.find({ type: 'series' })
      .sort({ updatedAt: -1 })
      .limit(12)
      .select('title slug cover author views totalChapters');
      
    res.json(seriesNovels);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách series:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách series' });
  }
};

// Controller cho Oneshot novels
exports.getOneshotNovels = async (req, res) => {
  try {
    const oneshotNovels = await Novel.find({ type: 'oneshot' })
      .sort({ updatedAt: -1 })
      .limit(12)
      .select('title slug cover author views totalChapters');
      
    res.json(oneshotNovels);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách oneshot:', error);
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách oneshot' });
  }
};

// Lấy truyện mới cập nhật
exports.getRecentNovels = async (req, res) => {
  try {
    const novels = await Novel.find({ isPublished: true })
      .sort({ updatedAt: -1 })
      .limit(12)
      .select('title slug cover author views totalChapters');
    
    res.json(novels);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy truyện mới đăng
exports.getNewNovels = async (req, res) => {
  try {
    const novels = await Novel.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(12)
      .select('title slug cover author views totalChapters');
    
    res.json(novels);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy truyện đã hoàn thành
exports.getCompletedNovels = async (req, res) => {
  try {
    const novels = await Novel.find({ 
      isPublished: true,
      status: 'completed'
    })
    .sort({ updatedAt: -1 })
    .limit(12)
    .select('title slug cover author views totalChapters');
    
    res.json(novels);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy truyện theo thể loại
exports.getNovelsByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const novels = await Novel.find({ 
      isPublished: true,
      genres: genre 
    })
    .sort({ views: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .select('title slug cover author views totalChapters');

    const total = await Novel.countDocuments({ 
      isPublished: true,
      genres: genre 
    });

    res.json({
      novels,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Lấy truyện liên quan
exports.getRelatedNovels = async (req, res) => {
  try {
    const novel = await Novel.findById(req.params.novelId);
    
    const relatedNovels = await Novel.find({
      _id: { $ne: novel._id },
      isPublished: true,
      genres: { $in: novel.genres }
    })
    .sort({ views: -1 })
    .limit(6)
    .select('title slug cover author views');

    res.json(relatedNovels);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
}

exports.getTopNovels = async (req, res) => {
  try {
    const { period } = req.params;
    let dateFilter = {};
    
    switch(period) {
      case 'week':
        dateFilter = { 
          createdAt: { 
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) 
          }
        };
        break;
      case 'month':
        dateFilter = {
          createdAt: {
            $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        };
        break;
        case 'year':
          dateFilter = {
            createdAt: {
              $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
            }
          };
          break;
        case 'all':
          dateFilter = {}; // Không cần filter theo thời gian
          break;
        default:
          dateFilter = {
            createdAt: {
              $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
          };
    }

    const novels = await Novel.find({ 
      ...dateFilter,
      isPublished: true 
    })
    .sort({ views: -1 })
    .limit(12)
    .select('title slug cover author views totalChapters');

    res.json(novels);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

exports.getNovelBySlug = async (req, res) => {
  try {
    // Tìm truyện dựa vào slug và đảm bảo truyện đã được publish
    const novel = await Novel.findOne({ 
      slug: req.params.slug,
      isPublished: true 
    })
    // Populate để lấy thêm thông tin người tạo
    .populate('createdBy', 'username')
    // Populate để lấy thông tin chapter mới nhất
    .populate({
      path: 'chapters',
      options: { 
        sort: { chapterNumber: -1 },
        limit: 1
      },
      select: 'chapterNumber title createdAt'
    })
    // Chọn các trường cần thiết
    .select(`
      title 
      slug 
      cover 
      author 
      description
      genres
      tags
      status
      type
      views
      rating
      totalChapters
      createdAt
      updatedAt
    `);

    if (!novel) {
      return res.status(404).json({ 
        success: false,
        message: 'Không tìm thấy truyện' 
      });
    }

    // Tăng lượt xem
    novel.views += 1;
    await novel.save();

    // Lấy thêm các thông tin liên quan
    const [relatedNovels, comments] = await Promise.all([
      // Lấy truyện cùng thể loại
      Novel.find({
        _id: { $ne: novel._id },
        genres: { $in: novel.genres },
        isPublished: true
      })
      .sort({ views: -1 })
      .limit(6)
      .select('title slug cover'),

      // Lấy bình luận mới nhất
      Comment.find({ novel: novel._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'username avatar')
    ]);

    // Trả về đầy đủ thông tin
    res.json({
      success: true,
      data: {
        novel,
        relatedNovels,
        recentComments: comments,
        meta: {
          views: novel.views,
          rating: novel.rating,
          totalChapters: novel.totalChapters,
          status: novel.status
        }
      }
    });

  } catch (error) {
    console.error('Lỗi khi lấy chi tiết truyện:', error);
    res.status(500).json({ 
      success: false,
      message: 'Lỗi server khi lấy chi tiết truyện',
      error: error.message 
    });
  }
};

// Tìm kiếm truyện
exports.searchNovels = async (req, res) => {
  try {
    const { keyword, genre, status, type, sort = 'views' } = req.query;
    const query = { isPublished: true };

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { author: { $regex: keyword, $options: 'i' } }
      ];
    }

    if (genre) query.genres = genre;
    if (status) query.status = status;
    if (type) query.type = type;

    const sortOptions = {
      views: { views: -1 },
      latest: { updatedAt: -1 },
      newest: { createdAt: -1 },
      rating: { 'rating.average': -1 }
    };

    const novels = await Novel.find(query)
      .sort(sortOptions[sort])
      .limit(12)
      .select('title slug cover author views totalChapters');

    res.json(novels);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};