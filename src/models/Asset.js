const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['crypto', 'realEstate', 'cash', 'stock'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  discriminatorKey: 'type',
  timestamps: true
});

module.exports = mongoose.model('Asset', assetSchema); 