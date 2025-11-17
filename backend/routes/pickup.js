const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const PickUpRequest = require('../models/PickUpRequest');

// POST /api/pickup/request
router.post('/request', protect, async (req, res) => {
  try {
    const { foodItem, scheduledTime, notes } = req.body;
    const pickup = new PickUpRequest({
      foodItem,
      requester: req.user.id,
      scheduledTime,
      notes
    });
    await pickup.save();
    res.status(201).json(pickup);
  } catch (err) {
    console.error('Pickup creation error:', err.message);
    res.status(500).json({ message: 'Failed to create pickup request' });
  }
});

// GET /api/pickup/mine
router.get('/mine', protect, async (req, res) => {
  try {
    const pickups = await PickUpRequest.find({ requester: req.user.id }).populate('foodItem');
    res.status(200).json(pickups);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pickup requests' });
  }
});

module.exports = router;