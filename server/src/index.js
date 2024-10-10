// Load environment variables from a .env file into process.env
require("dotenv").config();

const express = require("express"); // Import the Express framework
const app = express(); // Create an instance of an Express application
const bodyParser = require("body-parser"); // Import body-parser to parse incoming request bodies
const cors = require("cors"); // Import CORS middleware to enable Cross-Origin Resource Sharing
const requestLogger = require("./middlewares/loggerMiddleware"); // Import custom middleware for logging requests

// Import route modules for different parts of the API
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const notificationsRoutes = require("./routes/notificationsRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const scheduleRoutes = require("./routes/userSchedules");


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

// -------------------- Route Definitions -------------------- //

// Mount the userRoutes module at the '/api/user' path
// All routes defined in userRoutes will be accessible under '/api/user/*'
app.use("/api/user", userRoutes);

// Mount the profileRoutes module at the '/api/profile' path
// All routes defined in profileRoutes will be accessible under '/api/profile/*'
app.use("/api/profile", profileRoutes);

// Mount the notificationsRoutes module at the '/api/notifications' path
// All routes defined in notificationsRoutes will be accessible under '/api/notifications/*'
app.use("/api/notifications", notificationsRoutes);

// Mount the dashboardRoutes module at the '/api/dashboard' path
// All routes defined in dashboardRoutes will be accessible under '/api/dashboard/*'
app.use("/api/dashboard", dashboardRoutes); //Quy

//scheduleRoutes
//app.use("/api/schedule", scheduleRoutes); //Quy
scheduleRoutes(app)


// -------------------- Start the Server -------------------- //

// Start the Express server and have it listen on the specified PORT
// The server listens on all network interfaces ('0.0.0.0'), making it accessible externally
const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`); // Log a message indicating the server is running
});
