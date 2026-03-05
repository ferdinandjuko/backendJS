const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Post List');
});

router.get('/new', (req, res) => {
    res.send('Post New Form');
});

module.exports = router;