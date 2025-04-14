const Asset = require('../models/Asset');

// @desc    Get all assets for a user
// @route   GET /api/assets
// @access  Private
exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.find({ user: req.user._id });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single asset
// @route   GET /api/assets/:id
// @access  Private
exports.getAsset = async (req, res) => {
  try {
    const asset = await Asset.findOne({ _id: req.params.id, user: req.user._id });
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete asset
// @route   DELETE /api/assets/:id
// @access  Private
exports.deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    res.json({ message: 'Asset removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 