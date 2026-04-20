const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/connDB');
const corsOptions = require('./config/corsOptions');

const app = express();

connectDB();

mongoose.connection.once('open', () => {
    console.log(`DB connected successfully`);
    app.listen(4000, () => {
        console.log(`Server Listen on port 4000`);
    })
})


app.use(cors(corsOptions));

app.use(express.json());