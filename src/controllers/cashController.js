const Cash = require('../models/Cash');

// @desc    Get all cash entries for a user
// @route   GET /api/cash
// @access  Private
exports.getCashEntries = async (req, res) => {
  try {
    const cashEntries = await Cash.find({ user: req.user._id });
    res.json(cashEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new cash entry
// @route   POST /api/cash
// @access  Private
exports.addCashEntry = async (req, res) => {
  try {
    const { description, amount, date } = req.body;

    const cashEntry = await Cash.create({
      user: req.user._id,
      description,
      amount,
      date
    });

    res.status(201).json(cashEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update cash entry
// @route   PUT /api/cash/:id
// @access  Private
exports.updateCashEntry = async (req, res) => {
  try {
    const cashEntry = await Cash.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!cashEntry) {
      return res.status(404).json({ message: 'Cash entry not found' });
    }

    res.json(cashEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 