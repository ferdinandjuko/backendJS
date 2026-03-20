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

}