const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const User = require('../models/User'); // Needed for token lookup

router.post('/register', register);
router.post('/login', login);

// Email verification route
//router.get('/verify-email/:token', async (req, res) => {
 // try {
   // const user = await User.findOne({ verificationToken: req.params.token });
   // if (!user) return res.status(400).send('Invalid or expired token');

   // user.isVerified = true;
   // user.verificationToken = undefined;
   // await user.save();

   // res.redirect('/login?verified=true'); // You can customize this redirect
 // } catch (err) {
   // res.status(500).send('Something went wrong. Please try again.');
  //}
//});

module.exports = router;