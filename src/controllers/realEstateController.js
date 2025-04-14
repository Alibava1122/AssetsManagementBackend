const RealEstate = require('../models/RealEstate');

// @desc    Get all real estate assets for a user
// @route   GET /api/real-estate
// @access  Private
exports.getProperties = async (req, res) => {
  try {
    const properties = await RealEstate.find({ user: req.user._id });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new real estate asset
// @route   POST /api/real-estate
// @access  Private
exports.addProperty = async (req, res) => {
  try {
    const { name, address, purchasePrice, purchaseDate, currentValue, monthlyRent } = req.body;

    const property = await RealEstate.create({
      user: req.user._id,
      name,
      address,
      purchasePrice,
      purchaseDate,
      currentValue,
      monthlyRent
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update real estate asset
// @route   PUT /api/real-estate/:id
// @access  Private
exports.updateProperty = async (req, res) => {
  try {
    const property = await RealEstate.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 