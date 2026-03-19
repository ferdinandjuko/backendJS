const User = require('../models/User');
const bcrypt = require('bcrypt');

export const signup = async (req, res) => {
    if (!req.body?.email || !req.body?.password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    res.status(201).json({ message: 'User created' });
}