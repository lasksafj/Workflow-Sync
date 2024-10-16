require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const requestLogger = require("./middlewares/loggerMiddleware");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const notificationsRoutes = require("./routes/notificationsRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(requestLogger);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/schedule", scheduleRoutes);

// Start the server
const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});
