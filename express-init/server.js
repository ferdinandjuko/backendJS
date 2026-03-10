// import express from 'express';
const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(logger);

app.get('/', (req, res) => {
    console.log('Awareness');
    res.download('server.js');
    res.render('index');
});

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

app.use('/user', usersRouter);
app.use('/posts', postsRouter);

function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}

app.listen(3500, () => {
    console.log('Server is running on port 3500');
})