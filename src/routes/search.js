const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { searchUsers, searchPosts } = require('../controllers/search');

router.get('/users', protect, searchUsers);
router.get('/posts', protect, searchPosts);

module.exports = router; 