require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const requestLogger = require('./middlewares/loggerMiddleware');
const chatRoutes = require('./routes/chatRoutes');

const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const notificationsRoutes = require("./routes/notificationsRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const timeclockRoutes = require('./routes/timeclockRoutes');
const socketConfig = require('./config/socket');
const authSocketMiddleware = require('./middlewares/authSocketMiddleware');
const chatSocket = require('./socket/chatSocket');


const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(requestLogger);

// Routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use("/api/profile", profileRoutes);
app.use("api/dashboard", dashboardRoutes)
app.use("/api/timeclock", timeclockRoutes);



const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
})

// Start socket
const io = socketConfig(server)
const chatIo = io.of('/chat');
chatIo.use(authSocketMiddleware);
chatSocket(chatIo);
