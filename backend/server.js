const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoute'); // Importing task routes
const connectDB = require('./config/connectDB');
const Task =require("./models/taskModel");
const cors = require("cors");

const app = express();

//Initialize Database
connectDB();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded data
app.use(cors());


// Use task-related routes
app.use('/api', taskRoutes); // Prefixing API routes with '/api'

// Base route
app.get('/', (req, res) => {
  res.send('Home Page');
});

// Server port
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB and start the server
// mongoose
//   .connect(process.env.MONGO_URI) // Remove deprecated options
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => console.log('Database connection error:', err));

app.listen(process.env.PORT || 5000, () => {
           console.log('Server running on port 5000');
     });

