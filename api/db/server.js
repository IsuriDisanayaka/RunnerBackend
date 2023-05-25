require("dotenv").config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./db');
const userRoutes = require('../routes/User');
const runnerRoutes = require('../routes/Runner');
const adminRoutes = require('../routes/Admin')
const PORT = process.env.PORT
const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(runnerRoutes);
app.use(adminRoutes);

connectDB();

const server = app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});
