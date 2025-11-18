const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "fulfilled", "cancelled"],
      default: "pending", // You can expand this later: approved, fulfilled, etc.
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);