const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const clubRoutes = require("./routes/clubRoutes");
const eventRoutes = require("./routes/eventRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const clubMemberRoutes = require("./routes/clubMemberRoutes");
const eventRegistrationRoutes = require("./routes/eventRegistrationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const chatRoutes = require('./routes/chatRoutes');

const app = express();
connectDB();
//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 8000;

// Routes
app.use('/api', userRoutes);
app.use('/api', clubRoutes);
app.use('/api/events', eventRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/club-members", clubMemberRoutes);
app.use("/api/event-registration", eventRegistrationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use('/api', chatRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Uni-Clubs API is running...");
});

app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`)
});
