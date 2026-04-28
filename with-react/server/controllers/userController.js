const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const errorHandler = (err) => {
    let errors = { email: '', password: '' };

    if (err.code === 11000) {
        errors.email = 'Email is already registered';
        return errors;
    }

    if (err.message.includes('Users validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

const createUser = async (req, res) => {
    if (!req?.body?.email || !req?.body?.password) {
        return res.json({
            error: {
                password: 'Email and password required'
            }
        });
    }
    const hashed = await bcrypt.hash(req.body.password, 10);
    const isDev = process.env.NODE_ENV != 'production';
    try {
        const newUser = await User.create({
            email: req.body.email,
            password: hashed
        });
        const accessToken = jwt.sign(
            {
                userId: newUser._id,
                roles: Object.values(newUser.roles)
            },
            "SECRET_TOKEN_KEY",
            { expiresIn: '24h' }
        )
        res.cookie('jwt', accessToken, {
            httpOnly: true,
            Samesite: isDev ? 'Lax' : 'None',
            Secure: isDev ? false : true,
            maxAge: 24 * 60 * 60 * 1000
        })
        return res.status(201).json({ message: 'User registered successfully', created: true });
    } catch (err) {
        const error = errorHandler(err);
        return res.json({ error, created: false });
    }

}

const handleLogin = async (req, res) => {
    if (!req?.body?.email || !req?.body?.password) res.status(400).json({ message: 'Email and password required' });
    const isDev = process.env.NODE_ENV !== 'production';
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.json({ message: 'Email or password Invalid' }); // Unauthorized
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.json({ message: 'Email or password Invalid' }) // Unauthorized
        }
        const accessToken = jwt.sign(
            {
                userId: user._id,
                roles: Object.values(user.roles)
            },
            "SECRET_TOKEN_KEY",
            { expiresIn: '24h' }
        );
        res.cookie('jwt', accessToken, {
            httpOnly: true,
            sameSite: isDev ? 'Lax' : 'None',
            secure: !isDev ? true : false,
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.status(200).json({ accessToken, auth: true });
    } catch (error) {
        res.status(500).json({ error, auth: false });
    }

}

module.exports = {
    createUser,
    handleLogin
}