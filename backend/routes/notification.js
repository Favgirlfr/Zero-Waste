const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const Notification = require('../models/Notification');

// GET /api/notifications
router.get('/', protect, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    console.error('Notification fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

module.exports = router;