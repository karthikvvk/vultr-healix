const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Assuming User model is set up correctly
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user; // Store user info in the request object
    next();
  });
};

// Endpoint to get user details
router.get('/user/details', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assume the JWT contains the user's ID in the payload
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
