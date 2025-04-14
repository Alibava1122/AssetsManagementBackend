const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAssets,
  getAsset,
  deleteAsset
} = require('../controllers/assetController');

// Base asset routes
router.get('/', protect, getAssets);
router.get('/:id', protect, getAsset);
router.delete('/:id', protect, deleteAsset);

module.exports = router; 