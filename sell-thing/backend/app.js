const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const corsOption = require('./config/corsOption');
const connectDB = require('./config/connDB');

const thingRouter = require('./routes/api/thing');
const productRouter = require('./routes/api/product');
const userRouter = require('./routes/user');

dotenv.config();

const app = express()

app.use(express.json());

// sharing corse
app.use(cors(corsOption));

// connect to database
connectDB();

app.use('/api/stuff', thingRouter);
app.use('/api/products', productRouter);
app.use('/api/auth', userRouter);

module.exports = app;