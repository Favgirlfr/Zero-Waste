const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  expiryDate: Date,
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  pickupTime: {
    type: Date,
    default: null
  },
  pickupLocation: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['available', 'requested', 'pickup-requested', 'claimed', 'completed', 'expired', 'verified'],
    default: 'available'
  }
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', foodItemSchema);