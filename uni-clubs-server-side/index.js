const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const app = express();


connectDB();


//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 8000;

// Routes
app.use('/api', userRoutes);



app.get("/", (req, res) => {
  res.send("Uni-Clubs API is running...");
});

app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`)
});
