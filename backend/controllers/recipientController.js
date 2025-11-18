const Request = require("../models/Request");

exports.createRequest = async (req, res) => {
  const { item, quantity, notes } = req.body;
  const userId = req.user.id;

  try {
    const request = await Request.create({
      item,
      quantity,
      notes,
      user: userId,
      status: "pending",
      requestDate: new Date(),
    });

    console.log("New request created:", request); //  Debug log
    res.status(201).json({ message: "Request submitted", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ requests });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRequestStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json({ message: "Status updated", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
