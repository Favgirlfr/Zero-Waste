const Notification = require('../models/Notification');


const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification || notification.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Notification not found or unauthorized' });
    }

    notification.read = true;
    await notification.save();

    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    console.error('Mark as Read Error:', err.message);
    res.status(500).json({ message: 'Failed to update notification' });
  }
};

const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    console.error('Fetch Notifications Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
};

module.exports = {
  getUserNotifications,
  markNotificationAsRead,
  // include getUserNotifications if you added it earlier
};