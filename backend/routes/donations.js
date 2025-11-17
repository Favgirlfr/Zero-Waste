// routes/donations.js
const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");
const protect = require("../middleware/authMiddleware");

router.get("/recent", async (req, res) => {
  try {
    const recent = await Donation.find().sort({ createdAt: -1 }).limit(10);
    res.json(recent);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recent donations" });
  }
});

// GET /api/donations/available
router.get("/available", async (req, res) => {
  try {
    const available = await Donation.find({ status: "available" }).sort({ createdAt: -1 });
    res.json(available);
  } catch (err) {
    res.status(500).json({ message: "Error fetching available donations" });
  }
});


// GET /api/donations/mine
router.get("/mine", protect, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id; // extracted from token
    const donations = await Donation.find({ donor: userId });
    res.json(donations);
  } catch (err) {
    console.error("Error fetching donor donations:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//  POST /api/donations
router.post("/", protect, async (req, res) => {
  try {
    const { item, quantity } = req.body;

    if (!item || !quantity) {
      return res.status(400).json({ message: "Item and quantity are required" });
    }

    const newDonation = new Donation({
      item,
      quantity: Number(quantity),
      donor: req.user._id, // from token
    });

    await newDonation.save();
    console.log("Donation created:", newDonation);
    res.status(201).json(newDonation);
  } catch (err) {
    console.error("Error creating donation:", err.message, err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

module.exports = router;
