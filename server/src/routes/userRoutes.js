const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Define routes for user registration, login, token refresh, and verification
router.post('/register', userController.registerUser);  // Route to handle user registration
router.post('/login', userController.loginUser);  // Route to handle user login
router.post('/refresh-token', userController.refreshToken);  // Route to handle access token refresh
router.post('/verify', userController.verifyUser);  // Route to handle access token verification

// Protected route example using authentication middleware
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ number: req.query.number, message: 'This is a protected route' });  // Send response for protected route
});

module.exports = router;
