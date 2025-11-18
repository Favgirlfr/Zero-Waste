const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['donor', 'recipient', 'admin'], default: 'donor' },
    phone: String,
    organization: String,
    isVerified: { type: Boolean, default: false }, //  verification status
    verificationToken: { type: String },           //  token for email verification
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);