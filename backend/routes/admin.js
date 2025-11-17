const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');
const User = require('../models/User');
const FoodItem = require('../models/FoodItem');

// GET /api/admin/users
router.get('/users', protect, requireRole('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// PATCH /api/admin/food/:id/status
router.patch('/food/:id/status', protect, requireRole('admin'), async (req, res) => {
  const { status } = req.body;
  const food = await FoodItem.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(food);
});

module.exports = router;