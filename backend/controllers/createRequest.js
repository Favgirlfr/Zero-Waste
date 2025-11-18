Request = require("../models/Request");
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

    //  Emit real-time event to all connected clients
    if (req.io) {
      req.io.emit("new-request", {
        item,
        quantity,
        user: userId,
        requestId: request._id,
        createdAt: request.createdAt,
      });
    }

    res.status(201).json({ message: "Request submitted", request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

