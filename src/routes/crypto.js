const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getCryptos,
  addCrypto,
  updateCrypto
} = require('../controllers/cryptoController');

// Crypto routes
router.get('/', protect, getCryptos);
router.post('/', protect, addCrypto);
router.put('/:id', protect, updateCrypto);

module.exports = router; 