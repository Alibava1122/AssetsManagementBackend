const mongoose = require('mongoose');
const Asset = require('./Asset');

const cashSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = Asset.discriminator('cash', cashSchema); 