const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require("dotenv").config()

const JWT_SECRET_key = process.env.JWT_SECRET ;

console.log("JWT_SECRET:", process.env.JWT_SECRET);
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
  return res.status(400).json({ message: 'Email and password required' });
}


    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({
      email,
      password_hash: hashedPassword
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET_key, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully' ,token: `Bearer ${token}` });

  } catch (err) {
  console.error("Server error:", err);  // log to terminal
  res.status(500).json({ message: 'Server error', error: err.message });
}
};

//  Login Controller
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
  return res.status(400).json({ message: 'Email and password required' });
}


    // Check user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create token
    const token = jwt.sign({ id: user._id }, JWT_SECRET_key, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token: `Bearer ${token}` });

  } catch (err) {
  console.error("Server error:", err);  // log to terminal
  res.status(500).json({ message: 'Server error', error: err.message });
}
};
