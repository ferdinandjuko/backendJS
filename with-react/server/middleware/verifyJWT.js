const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(403).json({ error: 'Unauthorized' })
    }
    token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        'SECRET_TOKEN_KEY',
        (err, decoded) => {
            if (err) return res.sendStatus(403); // Forbidden
            req.auth = {
                userId: decoded.userId,
                roles: decoded.roles
            }
            next();
        }
    )
}

module.exports = verifyJWT;