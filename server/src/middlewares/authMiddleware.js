const jwt = require('jsonwebtoken');

// Middleware to verify JWT token in requests
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];  // Get the authorization header
    const token = authHeader && authHeader.split(' ')[1];  // Extract the token

    if (!token) return res.status(401).json({ message: 'Access token is missing' });  // Return error if token is missing

    // Verify the token using the JWT secret
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
        if (err) return res.status(401).json({ message: 'Unauthorized user' });  // Handle invalid token
        req.user = user;  // Attach the verified user to the request object
        next();  // Proceed to the next middleware or route handler
    });
};

module.exports = authMiddleware;
