const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  createPost,
  getPosts,
  getPostById,
  likePost,
  unlikePost,
  addComment,
  removeComment,
} = require('../controllers/posts');

// Routes
router.post('/', protect, upload.single('file'), createPost);
router.get('/', protect, getPosts);
router.get('/:id', protect, getPostById);
router.post('/:id/like', protect, likePost);
router.delete('/:id/like', protect, unlikePost);
router.post('/:id/comments', protect, addComment);
router.delete('/:id/comments/:commentId', protect, removeComment);

module.exports = router; 