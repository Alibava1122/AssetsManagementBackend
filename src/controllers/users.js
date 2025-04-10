const User = require('../models/User');
const { AppError, sendErrorDev, sendErrorProd } = require('../utils/errorHandler');
const cloudinary = require('../config/cloudinary');

// Get user profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update user profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email, bio } = req.body;
    const updateData = { name, email, bio };

    // Handle profile image upload
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'profiles',
      });
      updateData.profileImage = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Get all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Get user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(new AppError('User not found', 404));
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Follow user
exports.followUser = async (req, res, next) => {
  try {
    if (req.user.id === req.params.id) {
      return next(new AppError('You cannot follow yourself', 400));
    }

    const userToFollow = await User.findById(req.params.id);
    if (!userToFollow) {
      return next(new AppError('User not found', 404));
    }

    const currentUser = await User.findById(req.user.id);
    if (currentUser.following.includes(req.params.id)) {
      return next(new AppError('You are already following this user', 400));
    }

    await User.findByIdAndUpdate(req.user.id, {
      $push: { following: req.params.id }
    });

    await User.findByIdAndUpdate(req.params.id, {
      $push: { followers: req.user.id }
    });

    res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    next(error);
  }
};

// Unfollow user
exports.unfollowUser = async (req, res, next) => {
  try {
    if (req.user.id === req.params.id) {
      return next(new AppError('You cannot unfollow yourself', 400));
    }

    const userToUnfollow = await User.findById(req.params.id);
    if (!userToUnfollow) {
      return next(new AppError('User not found', 404));
    }

    const currentUser = await User.findById(req.user.id);
    if (!currentUser.following.includes(req.params.id)) {
      return next(new AppError('You are not following this user', 400));
    }

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { following: req.params.id }
    });

    await User.findByIdAndUpdate(req.params.id, {
      $pull: { followers: req.user.id }
    });

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    next(error);
  }
};

// Get followers
exports.getFollowers = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('followers', 'name email profileImage')
      .select('-password');
    
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json(user.followers);
  } catch (error) {
    next(error);
  }
};

// Get following
exports.getFollowing = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('following', 'name email profileImage')
      .select('-password');
    
    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json(user.following);
  } catch (error) {
    next(error);
  }
}; 