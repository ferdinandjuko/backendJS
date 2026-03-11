const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.query.name);
    res.send('User List');
})

router.get('/new', (req, res) => {
    res.render('index', { firstName: 'aware' });
});

router.post('/', (req, res) => {
    const isValid = true;
    if (isValid) {
        users.push({ name: req.body.firstName });
        res.redirect(`/user/${users.length - 1}`);
    } else {
        console.log('Invalid user');
        res.render('index', { firstName: req.body.firstName });
    }
    console.log(req.body.firstName);
    res.send('Create User');
});

router.route('/:id').
    get((req, res) => {
        console.log(req.user);
        res.send(`Get User With ID ${req.params.id}`);
    })
    .put((req, res) => {
        res.send(`Update User With ID ${req.params.id}`);
    })
    .delete((req, res) => {
        res.send(`Delete User With ID ${req.params.id}`);
    });
const users = [{ name: 'John' }, { name: 'Jane' }];
router.param('id', (req, res, next, id) => {
    req.user = users[id];
    next();
})

module.exports = router