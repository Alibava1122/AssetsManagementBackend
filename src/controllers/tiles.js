const Tile = require('../models/Tile');

// @desc    Get all tiles for a user
// @route   GET /api/tiles
// @access  Private
exports.getTiles = async (req, res) => {
  try {
    const tiles = await Tile.find({ userId: req.user._id }).sort('position');
    res.json(tiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single tile
// @route   GET /api/tiles/:id
// @access  Private
exports.getTileById = async (req, res) => {
  try {
    const tile = await Tile.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!tile) {
      return res.status(404).json({ message: 'Tile not found' });
    }

    res.json(tile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update tile position
// @route   PUT /api/tiles/:id/position
// @access  Private
exports.updateTilePosition = async (req, res) => {
  try {
    const { position } = req.body;

    const tile = await Tile.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!tile) {
      return res.status(404).json({ message: 'Tile not found' });
    }

    tile.position = position;
    await tile.save();

    res.json(tile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 