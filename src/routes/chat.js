const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { chatLimiter } = require('../middleware/rateLimit');
const {
  sendMessage,
  getChatHistory,
} = require('../controllers/chat');

// Routes
router.post('/message', protect, chatLimiter, sendMessage);
router.get('/history', protect, getChatHistory);

module.exports = router; 