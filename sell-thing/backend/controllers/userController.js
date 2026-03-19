const User = require('../models/User');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
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

module.exports = {
    signup
}