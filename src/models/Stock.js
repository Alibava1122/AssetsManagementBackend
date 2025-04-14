const mongoose = require('mongoose');
const Asset = require('./Asset');

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    uppercase: true
  },
  quantity: {
    type: Number,
    required: true
  },
  purchasePrice: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date,
    required: true
  }
});

module.exports = Asset.discriminator('stock', stockSchema); 