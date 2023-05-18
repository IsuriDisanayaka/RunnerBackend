require("dotenv").config();
const bodyPaser = require('body-parser');
const express = require('express');
const connectDB = require('./db');
const PORT = process.env.PORT
const app = express();

app.use(bodyPaser.json());

connectDB();

const server = app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
});