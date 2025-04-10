const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getTiles,
  getTileById,
  updateTilePosition,
} = require('../controllers/tiles');

// Routes
router.get('/', protect, getTiles);
router.get('/:id', protect, getTileById);
router.put('/:id/position', protect, updateTilePosition);

module.exports = router; 