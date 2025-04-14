const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getCashEntries,
  addCashEntry,
  updateCashEntry
} = require('../controllers/cashController');

// Cash routes
router.get('/', protect, getCashEntries);
router.post('/', protect, addCashEntry);
router.put('/:id', protect, updateCashEntry);

module.exports = router; 