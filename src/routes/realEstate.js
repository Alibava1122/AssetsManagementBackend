const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getProperties,
  addProperty,
  updateProperty
} = require('../controllers/realEstateController');

// Real estate routes
router.get('/', protect, getProperties);
router.post('/', protect, addProperty);
router.put('/:id', protect, updateProperty);

module.exports = router; 