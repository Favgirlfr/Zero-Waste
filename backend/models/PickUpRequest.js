const mongoose = require('mongoose');

const pickUpRequestSchema = new mongoose.Schema({
  foodItem: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem', required: true },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending' },
  scheduledTime: { type: Date },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PickUpRequest', pickUpRequestSchema);