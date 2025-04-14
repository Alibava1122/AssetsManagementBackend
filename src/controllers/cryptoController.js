const Crypto = require('../models/Crypto');
const axios = require('axios');

// @desc    Get all crypto assets for a user
// @route   GET /api/crypto
// @access  Private
exports.getCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find({ user: req.user._id });
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new crypto asset
// @route   POST /api/crypto
// @access  Private
exports.addCrypto = async (req, res) => {
  try {
    const { symbol, quantity, purchasePrice, purchaseDate } = req.body;

    // Validate crypto symbol
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${symbol.toLowerCase()}/market_chart?vs_currency=usd&days=30&interval=daily`
    );

    if (!response.data) {
      return res.status(400).json({ message: 'Invalid cryptocurrency symbol' });
    }

    const crypto = await Crypto.create({
      user: req.user._id,
      symbol,
      quantity,
      purchasePrice,
      purchaseDate
    });

    res.status(201).json(crypto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update crypto asset
// @route   PUT /api/crypto/:id
// @access  Private
exports.updateCrypto = async (req, res) => {
  try {
    const crypto = await Crypto.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!crypto) {
      return res.status(404).json({ message: 'Crypto asset not found' });
    }

    res.json(crypto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 