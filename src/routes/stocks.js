const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getStocks,
  addStock,
  updateStock
} = require('../controllers/stockController');

// Stock routes
router.get('/', protect, getStocks);
router.post('/', protect, addStock);
router.put('/:id', protect, updateStock);

module.exports = router; 