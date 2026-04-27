const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    if (!req?.body?.email || !req?.body?.password) res.status(400).json({ message: 'Email and password required' });
    const hashed = await bcrypt.hash(req.body.password, 10);
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

const handleLogin = async (req, res) => {
    console.log(req.body);
    if (!req?.body?.email || !req?.body?.password) res.status(400).json({ message: 'Email and password required' });
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) console.log(`Not found`);
        console.log(user);
    } catch {

    }
    jwt.sign(
        {}
    )
    res.status(200).json({ accessToken: 'token' });
    // res.redirect('/secret');
}

module.exports = {
    createUser,
    handleLogin
}