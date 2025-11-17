const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  getUserNotifications,
  markNotificationAsRead
} = require('../controllers/userController');

router.get('/notifications', protect, getUserNotifications);
router.patch('/notifications/:id/read', protect, markNotificationAsRead);

module.exports = router;