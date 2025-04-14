const mongoose = require('mongoose');
const Asset = require('./Asset');

const realEstateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  purchasePrice: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  currentValue: {
    type: Number,
    required: true
  },
  monthlyRent: {
    type: Number,
    required: false
  }
});

module.exports = Asset.discriminator('realEstate', realEstateSchema); 