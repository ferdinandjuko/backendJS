const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.createUser);

router.post('/login', (req, res, next) => {
    console.log(req.body);
    res.redirect('/secret');
})

module.exports = router;