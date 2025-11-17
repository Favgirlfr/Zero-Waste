const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  item: String,
  quantity: Number,
  status: { type: String, default: "pending" },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true }); // optional: adds createdAt and updatedAt

module.exports = mongoose.model("Donation", donationSchema);