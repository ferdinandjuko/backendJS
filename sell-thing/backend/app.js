const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const corsOption = require('./config/corsOption');
const connectDB = require('./config/connDB');
const thingRouter = require('./routes/api/thing');

dotenv.config();

const app = express()

app.use(express.json());

// sharing corse
app.use(cors(corsOption));

// connect to database
connectDB();

app.use('/api/stuff', thingRouter);

module.exports = app;