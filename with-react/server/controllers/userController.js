const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const isDev = process.env.NODE_ENV != 'production';
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
    if (!req?.body?.email || !req?.body?.password) res.status(400).json({ error: 'Email and password required' });
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.json({ error: 'Email or password Invalid' }); // Unauthorized
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.json({ error: 'Email or password Invalid' }) // Unauthorized
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
        res.status(401).json({ error, auth: false });
    }

}

const logOut = (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(205); // No content

    const accesToken = cookies.jwt;
    jwt.verify(
        accesToken,
        'SECRET_TOKEN_KEY',
        (err, decoded) => {
            if (err) {
                // res.clearCookie('jwt', { httOnly: true });
                return res.status(403).json({ error: 'Unauthorized' }); // Invalid Token
            }
            if (decoded.userId) {
                res.clearCookie('jwt', {
                    httpOnly: true,
                    sameSire: isDev ? 'Lax' : 'None',
                    secure: isDev ? false : true
                }); // Secure true - Only server on https
                res.sendStatus(204)
            } else {
                res.clearCookie('jwt', { httOnly: true });
                res.sendStatus(204);
            }
        }
    )
}

module.exports = {
    createUser,
    handleLogin,
    logOut
}