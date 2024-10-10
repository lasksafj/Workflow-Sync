const db = require('../config/db');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyAccessToken } = require('../utils/token');

// Function to register a new user
exports.registerUser = async (userData) => {
    const { email, password, lastName, firstName, phoneNumber, dateOfBirth } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password using bcrypt
    // Insert the new user data into the database
    const result = await db.query(
        'INSERT INTO users (email, password, last_name, first_name, phone_number, date_of_birth) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [email, hashedPassword, lastName, firstName, phoneNumber, dateOfBirth]
    );
    return result.rows[0];  // Return the newly created user record
};

// Function to authenticate a user during login
exports.loginUser = async (userData) => {
    const { email, password } = userData;
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);  // Fetch the user by email
    const user = result.rows[0];
    if (!user) throw new Error('User not found');  // If user doesn't exist, throw an error

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');  // Throw an error if passwords don't match

    // Generate JWT tokens for authentication
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Prepare the user's profile information for the response
    const profile = {
        email: user.email,
        lastName: user.last_name,
        firstName: user.first_name,
        phoneNumber: user.phone_number,
        dateOfBirth: user.date_of_birth,
        avatar: user.avatar
    }
    return { accessToken, refreshToken, profile };  // Return access, refresh tokens, and user profile
};

// Function to handle refresh token and issue a new access token
exports.refreshToken = async (token) => {
    // Decode and verify the refresh token
    const decoded = verifyRefreshToken(token);
    // Fetch the user associated with the refresh token
    const result = await db.query('SELECT * FROM users WHERE id = $1', [decoded.id]);
    const user = result.rows[0];
    if (!user) throw new Error('Invalid refresh token');  // Throw an error if no user is found

    // Generate new access and refresh tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return { accessToken, refreshToken };  // Return the new tokens
};

// Function to verify access token and return user profile
exports.verifyUser = async (accessToken) => {
    const decoded = verifyAccessToken(accessToken);  // Decode and verify the access token
    const result = await db.query('SELECT * FROM users WHERE id = $1', [decoded.id]);  // Fetch the user by ID
    const user = result.rows[0];
    if (!user) throw new Error('Invalid access token');  // Throw an error if the user is not found

    // Prepare the user's profile information for the response
    const profile = {
        email: user.email,
        lastName: user.last_name,
        firstName: user.first_name,
        phoneNumber: user.phone_number,
        dateOfBirth: user.date_of_birth,
        avatar: user.avatar
    }
    return { profile };  // Return the user profile
}
