require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const requestLogger = require('./middlewares/loggerMiddleware');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const notificationsRoutes = require('./routes/notificationsRoutes'); // Long
const profileRoutes = require("./routes/profileRoutes");


const socketConfig = require('./config/socket');
const authSocketMiddleware = require('./middlewares/authSocketMiddleware');
const chatSocket = require('./socket/chatSocket');


// Define the port on which the server will listen
// It first checks for the PORT variable in the environment, otherwise defaults to 3000
const PORT = process.env.PORT || 3000;

// -------------------- Middleware Setup -------------------- //

// Use body-parser middleware to parse JSON request bodies
// This allows the server to understand JSON payloads in requests
app.use(bodyParser.json());

// Enable CORS for all routes
// This allows the server to accept requests from different origins
app.use(cors());

// Use the custom request logger middleware
// This middleware logs details about each incoming request for debugging and monitoring
app.use(requestLogger);

// Routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use("/api/profile", profileRoutes);


// Start the server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

// Start socket
const io = socketConfig(server)
const chatIo = io.of('/chat');
chatIo.use(authSocketMiddleware);
chatSocket(chatIo);
