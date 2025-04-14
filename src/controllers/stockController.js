const Stock = require('../models/Stock');
const axios = require('axios');

// @desc    Get all stock assets for a user
// @route   GET /api/stocks
// @access  Private
exports.getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({ user: req.user._id });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new stock asset
// @route   POST /api/stocks
// @access  Private
exports.addStock = async (req, res) => {
  try {
    const { symbol, quantity, purchasePrice, purchaseDate } = req.body;

    // Validate stock symbol
    const response = await axios.get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1mo`
    );

    if (!response.data) {
      return res.status(400).json({ message: 'Invalid stock symbol' });
    }

    const stock = await Stock.create({
      user: req.user._id,
      symbol,
      quantity,
      purchasePrice,
      purchaseDate
    });

    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update stock asset
// @route   PUT /api/stocks/:id
// @access  Private
exports.updateStock = async (req, res) => {
  try {
    const stock = await Stock.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!stock) {
      return res.status(404).json({ message: 'Stock asset not found' });
    }

    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 