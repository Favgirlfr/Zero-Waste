const FoodItem = require('../models/FoodItem');
const Notification = require('../models/Notification');

// POST /api/food/create
const createFoodItem = async (req, res) => {
  try {
    const { name, quantity, expiryDate } = req.body;

    console.log('Decoded user from token:', req.user);

    const food = new FoodItem({
      name,
      quantity,
      expiryDate,
      donor: req.user.id
    });

    await food.save();

    const io = req.app.get('io');
    io.emit('donation-created', {
      donorName: req.user.name || 'Anonymous',
      foodType: name,
      quantity,
      message: 'New donation available for pickup!'
    });

    //Save notification to DB
    await Notification.create({
      user: req.user.id,
      type: 'donation-created',
      message: `You donated "${name}" (${quantity}) — now available for pickup!`
    });


    res.status(201).json(food);
  } catch (err) {
    console.error('Create Food Error:', err.message);
    res.status(500).json({ message: 'Failed to create food item' });
  }
};

// GET /api/food/
const getAvailableFood = async (req, res) => {
  try {
    const foodItems = await FoodItem.find({ status: 'available' }).populate('donor', 'name email');
    res.status(200).json(foodItems);
  } catch (err) {
    console.error('Get Food Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch food items' });
  }
};

// PATCH /api/food/:id/claim
const claimFoodItem = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id).populate('donor');

    if (!food || food.status !== 'available') {
      return res.status(404).json({ message: 'Food item not available' });
    }

    food.status = 'claimed';
    await food.save();

    const io = req.app.get('io');
    const connectedUsers = req.app.get('connectedUsers');
    const donorId = food.donor._id.toString();
    const donorSocketId = connectedUsers[donorId];

    if (donorSocketId) {
      io.to(donorSocketId).emit('foodClaimed', {
        message: `Your food item "${food.name}" was just claimed!`
      });
    }

    try {
      await Notification.create({
        user: food.donor._id,
        type: 'claim',
        message: `Your food item "${food.name}" was just claimed!`
      });
    } catch (notifErr) {
      console.error('Notification creation error:', notifErr.message);
    }

    res.status(200).json({ message: 'Food item claimed successfully', food });
  } catch (err) {
    console.error('Claim Food Error:', err.message);
    res.status(500).json({ message: 'Failed to claim food item' });
  }
};

// PATCH /api/food/:id/request-pickup
const requestPickup = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id).populate('donor');

    if (!food || food.status !== 'available') {
      return res.status(404).json({ message: 'Food item not available for pickup' });
    }

    food.status = 'pickup-requested';
    await food.save();

    const io = req.app.get('io');
    const connectedUsers = req.app.get('connectedUsers');
    const donorId = food.donor._id.toString();
    const donorSocketId = connectedUsers[donorId];

    if (donorSocketId) {
      io.to(donorSocketId).emit('pickup-requested', {
        foodName: food.name,
        recipientName: req.user.name || 'A recipient'
      });
    }

    await Notification.create({
      user: food.donor._id,
      type: 'pickup-requested',
      message: `Pickup requested for "${food.name}" by ${req.user.name}`
    });

    res.status(200).json({ message: 'Pickup requested successfully', food });
  } catch (err) {
    console.error('Pickup Request Error:', err.message);
    res.status(500).json({ message: 'Failed to request pickup' });
  }
};

// PATCH /api/food/:id/complete
const completeDonation = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id).populate('donor');

    if (!food || food.status !== 'claimed') {
      return res.status(404).json({ message: 'Food item not ready for completion' });
    }

    food.status = 'completed';
    await food.save();

    const io = req.app.get('io');
    const connectedUsers = req.app.get('connectedUsers');
    const donorId = food.donor._id.toString();
    const donorSocketId = connectedUsers[donorId];

    if (donorSocketId) {
      io.to(donorSocketId).emit('donation-completed', {
        foodName: food.name
      });
    }

    await Notification.create({
      user: food.donor._id,
      type: 'donation-completed',
      message: `Donation "${food.name}" has been successfully completed!`
    });

    res.status(200).json({ message: 'Donation marked as completed', food });
  } catch (err) {
    console.error('Complete Donation Error:', err.message);
    res.status(500).json({ message: 'Failed to complete donation' });
  }
};

// PATCH /api/food/:id/verify
const verifyDonation = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id).populate('donor');

    if (!food || food.status === 'expired') {
      return res.status(404).json({ message: 'Food item not valid for verification' });
    }

    food.status = 'verified';
    await food.save();

    const io = req.app.get('io');
    const connectedUsers = req.app.get('connectedUsers');
    const donorId = food.donor._id.toString();
    const donorSocketId = connectedUsers[donorId];

    if (donorSocketId) {
      io.to(donorSocketId).emit('admin-verified', {
        foodName: food.name
      });
    }

    await Notification.create({
      user: food.donor._id,
      type: 'admin-verified',
      message: `Admin verified donation: "${food.name}"`
    });

    res.status(200).json({ message: 'Donation verified by admin', food });
  } catch (err) {
    console.error('Verify Donation Error:', err.message);
    res.status(500).json({ message: 'Failed to verify donation' });
  }
};

// GET /api/food/my-items
const getMyFoodItems = async (req, res) => {
  try {
    const myFood = await FoodItem.find({ donor: req.user.id });
    res.status(200).json(myFood);
  } catch (err) {
    console.error('Get My Food Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch your food items' });
  }
};

// PATCH /api/food/:id/request
const requestDonation = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id).populate('donor');

    if (!food || food.status !== 'available') {
      return res.status(404).json({ message: 'Food item not available for request' });
    }

    food.status = 'requested';
    food.requestedBy = req.user.id; // Make sure your FoodItem model has this field
    await food.save();

    const io = req.app.get('io');
    const connectedUsers = req.app.get('connectedUsers');
    const donorId = food.donor._id.toString();
    const donorSocketId = connectedUsers[donorId];

    if (donorSocketId) {
      io.to(donorSocketId).emit('donation-requested', {
        foodName: food.name,
        recipientName: req.user.name || 'A recipient'
      });
    }

    await Notification.create({
      user: food.donor._id,
      type: 'donation-requested',
      message: `Your donation "${food.name}" was requested by ${req.user.name}`
    });

    res.status(200).json({ message: 'Donation requested successfully', food });
  } catch (err) {
    console.error('Request Donation Error:', err.message);
    res.status(500).json({ message: 'Failed to request donation' });
  }
};

// PATCH /api/food/:id/schedule-pickup
const schedulePickup = async (req, res) => {
  try {
    const { pickupTime, pickupLocation } = req.body;
    const food = await FoodItem.findById(req.params.id).populate('donor');

    if (!food || food.status !== 'requested') {
      return res.status(400).json({ message: 'Food item not ready for pickup scheduling' });
    }

    food.pickupTime = pickupTime;
    food.pickupLocation = pickupLocation;
    food.status = 'pickup-requested';
    await food.save();

    const io = req.app.get('io');
    const connectedUsers = req.app.get('connectedUsers');
    const recipientId = food.requestedBy?.toString();
    const recipientSocketId = connectedUsers[recipientId];

    if (recipientSocketId) {
      io.to(recipientSocketId).emit('pickup-scheduled', {
        foodName: food.name,
        pickupTime,
        pickupLocation
      });
    }

    await Notification.create({
      user: recipientId,
      type: 'pickup-scheduled',
      message: `Pickup scheduled for "${food.name}" at ${pickupLocation} on ${new Date(pickupTime).toLocaleString()}`
    });

    res.status(200).json({ message: 'Pickup scheduled successfully', food });
  } catch (err) {
    console.error('Schedule Pickup Error:', err.message);
    res.status(500).json({ message: 'Failed to schedule pickup' });
  }
};

// PATCH /api/food/:id/confirm-pickup
const confirmPickup = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.id).populate('donor');

    if (!food || food.status !== 'pickup-requested' || food.requestedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to confirm this pickup' });
    }

    food.status = 'claimed';
    await food.save();

    const io = req.app.get('io');
    const connectedUsers = req.app.get('connectedUsers');
    const donorId = food.donor._id.toString();
    const donorSocketId = connectedUsers[donorId];

    if (donorSocketId) {
      io.to(donorSocketId).emit('pickup-confirmed', {
        foodName: food.name,
        recipientName: req.user.name || 'A recipient'
      });
    }

    await Notification.create({
      user: food.donor._id,
      type: 'pickup-confirmed',
      message: `Your donation "${food.name}" was confirmed as picked up by ${req.user.name}`
    });

    res.status(200).json({ message: 'Pickup confirmed successfully', food });
  } catch (err) {
    console.error('Confirm Pickup Error:', err.message);
    res.status(500).json({ message: 'Failed to confirm pickup' });
  }
};

module.exports = {
  createFoodItem,
  getAvailableFood,
  claimFoodItem,
  requestPickup,
  completeDonation,
  verifyDonation,
  getMyFoodItems,
  requestDonation,
  schedulePickup,
  confirmPickup
};