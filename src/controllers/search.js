const User = require('../models/User');
const Post = require('../models/Post');
const { AppError } = require('../utils/errorHandler');

// Search users
exports.searchUsers = async (req, res, next) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return next(new AppError('Please provide a search query', 400));
    }

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ]
    })
    .select('name email profileImage')
    .limit(10);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Search posts
exports.searchPosts = async (req, res, next) => {
  try {
    const { query, category } = req.query;
    
    if (!query) {
      return next(new AppError('Please provide a search query', 400));
    }

    const searchQuery = {
      $or: [
        { text: { $regex: query, $options: 'i' } }
      ]
    };

    if (category) {
      searchQuery.category = category;
    }

    const posts = await Post.find(searchQuery)
      .populate('user', 'name profileImage')
      .sort('-createdAt')
      .limit(20);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
}; 