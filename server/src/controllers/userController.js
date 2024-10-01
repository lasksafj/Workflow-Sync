const userService = require('../services/userService');

// Controller to handle user registration
exports.registerUser = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);  // Register the user using userService
        res.status(201).json({ success: true });  // Send success response
    } catch (error) {
        res.status(400).json({ error: error.message });  // Handle registration error
    }
};

// Controller to handle user login and return access/refresh tokens
exports.loginUser = async (req, res) => {
    try {
        const { accessToken, refreshToken, profile } = await userService.loginUser(req.body);  // Log in the user
        res.status(200).json({
            access: accessToken,
            refresh: refreshToken,
            profile  // Send tokens and user profile in response
        });
    } catch (error) {
        res.status(400).json({ error: error.message });  // Handle login error
    }
};

// Controller to refresh the access token using the refresh token
exports.refreshToken = async (req, res) => {
    try {
        const { accessToken, refreshToken } = await userService.refreshToken(req.body.refresh);  // Refresh tokens
        res.status(200).json({
            access: accessToken,
            refresh: refreshToken
        });
    } catch (error) {
        res.status(400).json({ error: error.message });  // Handle token refresh error
    }
};

// Controller to verify the user's access token
exports.verifyUser = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];  // Get access token from headers
        const accessToken = authHeader && authHeader.split(' ')[1];
        const { profile } = await userService.verifyUser(accessToken);  // Verify the token and get user profile
        res.status(200).json({
            access: accessToken,
            profile  // Return user profile in response
        });
    } catch (error) {
        res.status(400).json({ error: error.message });  // Handle verification error
    }
};
