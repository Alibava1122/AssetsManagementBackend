const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getProfile,
  updateProfile,
  getUsers,
  getUserById,
  deleteUser,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
} = require('../controllers/users');

// Profile routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// User management routes
router.get('/', protect, getUsers);
router.get('/:id', protect, getUserById);
router.delete('/:id', protect, deleteUser);

// Follow/Unfollow routes
router.post('/follow/:id', protect, followUser);
router.post('/unfollow/:id', protect, unfollowUser);
router.get('/followers/:id', protect, getFollowers);
router.get('/following/:id', protect, getFollowing);

module.exports = router; 