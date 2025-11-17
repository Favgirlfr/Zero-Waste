const express = require('express');
const router = express.Router();
const { createFoodItem, getAvailableFood, claimFoodItem, getMyFoodItems, requestPickup, completeDonation, verifyDonation, requestDonation, schedulePickup, confirmPickup } = require('../controllers/foodController');
const protect = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

router.post('/create', protect, createFoodItem);
router.get('/', getAvailableFood);
router.patch('/:id/claim', protect, claimFoodItem);
router.get('/my-items', protect, getMyFoodItems);
router.patch('/:id/request-pickup', protect, requestPickup);
router.patch('/:id/complete', protect, completeDonation);
router.patch('/:id/verify', protect, requireRole('admin'), verifyDonation);
router.patch('/:id/request', protect, requestDonation);
router.patch('/:id/schedule-pickup', protect, schedulePickup);
router.patch('/:id/confirm-pickup', protect, confirmPickup);

module.exports = router;