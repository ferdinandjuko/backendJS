// import express from 'express';
const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    console.log('Awareness');
    res.download('server.js');
    res.render('index', { text: "World" });
});



app.listen(3500, () => {
    console.log('Server is running on port 3500');
})