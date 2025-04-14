const mongoose = require('mongoose');
const Asset = require('./Asset');

const cryptoSchema = new mongoose.Schema({
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

module.exports = Asset.discriminator('crypto', cryptoSchema); 