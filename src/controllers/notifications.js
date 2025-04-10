const Notification = require('../models/Notification');
const { AppError } = require('../utils/errorHandler');

// Get user notifications
exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .populate('sender', 'name profileImage')
      .populate('post', 'text')
      .sort('-createdAt')
      .limit(50);

    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};

// Mark notification as read
exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);
    
    if (!notification) {
      return next(new AppError('Notification not found', 404));
    }

    if (notification.recipient.toString() !== req.user.id) {
      return next(new AppError('Not authorized', 401));
    }

    notification.read = true;
    await notification.save();

    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};

// Mark all notifications as read
exports.markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, read: false },
      { $set: { read: true } }
    );

    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    next(error);
  }
};

// Create notification
exports.createNotification = async (recipientId, senderId, type, postId = null, chatId = null) => {
  try {
    const notification = await Notification.create({
      recipient: recipientId,
      sender: senderId,
      type,
      post: postId,
      chat: chatId,
    });

    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
  }
}; 