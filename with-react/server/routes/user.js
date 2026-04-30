const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const verifyJWT = require('../middleware/verifyJWT');

router.post('/register', userController.createUser);

router.post('/login', userController.handleLogin);

router.post('/logout', userController.logOut);

router.post('/', userController.isAuthenticated);

module.exports = router;