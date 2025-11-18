const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const crypto = require('crypto'); // 🔒 Temporarily disabled
// const sendEmail = require('../utils/sendEmail'); // 🔒 Temporarily disabled

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Simplified user creation (no verification token)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'Registration successful. You can now log in.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // 🔒 Temporarily skipping verification check
    // if (!user.isVerified) {
    //   return res.status(403).json({ message: 'Please verify your email before logging in.' });
    // }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        // isVerified: user.isVerified, // optional: remove if not used on frontend
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};