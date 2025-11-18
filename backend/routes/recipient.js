const express = require("express");
const router = express.Router();
const { createRequest, getMyRequests, updateRequestStatus} = require("../controllers/recipientController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/request", authMiddleware, createRequest);
router.get("/my-requests", authMiddleware, getMyRequests);
router.patch("/request/:id", authMiddleware, updateRequestStatus);
module.exports = router;