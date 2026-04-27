const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const credentials = require('./middleware/credentials');

const connectDB = require('./config/connDB');
const corsOptions = require('./config/corsOptions');

const userRouter = require('./routes/user');

const app = express();

connectDB();



mongoose.connection.once('open', () => {
    console.log(`DB connected successfully`);
    app.listen(4000, () => {
        console.log(`Server Listen on port 4000`);
    })
})

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

app.use(cors(corsOptions));

// built-in middlewate to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser);

app.use('/', userRouter);