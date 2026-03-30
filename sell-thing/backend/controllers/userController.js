const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return res.status(204).json({ message: 'No user found' });
        }
        res.status(200).json({ message: 'Users found', users });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

exports.signup = async (req, res) => {
    if (!req.body?.email || !req.body?.password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
        const result = await User.create({
            email: req.body.email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User created', user: result });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

exports.login = async (req, res) => {
    if (!req.body?.email || !req.body?.password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({ message: 'Identifiant or Password Invalid' });
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Identifiant or Password Invalid' });
    }
    res.status(200).json({
        userId: user._id,
        token: jwt.sign(
            { userId: user._id },
            "RANDOM_SECRET_KEY",
            { expiresIn: '24h' }
        )
    });
}