const User = require('../model/User');
const bcrypt = require('bcrypt');

const createUser = async (req, res, next) => {
    console.log(req.body);
    if (!req?.body?.email || !req?.body?.password) res.status(400).json({ message: 'Email and password required' });
    const hashed = await bcrypt.hash(req.body.password, 10);
    console.log(hashed);
    try {
        const newUser = await User.create({
            email: req.body.email,
            password: hashed
        })
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json(error);
    }

}

module.exports = { createUser };