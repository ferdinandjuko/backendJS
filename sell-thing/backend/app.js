const express = require('express');
const cors = require('cors');
const corsOption = require('./config/corsOption');

const app = express()

// sharing corse
app.use(cors(corsOption));

app.use((req, res) => {
    res.json({ "message": "Your request was successful!" });
})
module.exports = app;