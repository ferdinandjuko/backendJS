const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const corsOption = require('./config/corsOption');
const connectDB = require('./config/connDB');

const thingRouter = require('./routes/api/thing');
const productRouter = require('./routes/api/product');
const userRouter = require('./routes/user');

const { logger } = require('./middleware/logEvents');

dotenv.config();

const app = express()

app.use(express.json());

// sharing corse
app.use(cors(corsOption));

// connect to database
connectDB();

// custom middleware logger
app.use(logger);

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/stuff', thingRouter);
app.use('/api/products', productRouter);
app.use('/api/auth', userRouter);

module.exports = app;