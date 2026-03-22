const jwt = require('jsonwebtoken');

exports.exports = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.srtatsWith('Bearer ')) res.sendStatus(401); // Unauthorized

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        'RANDOM_SECRET_KEY',
        (err, decoded) => {
            if (err) res.sendStatus(403); // Forbidden
        }
    )
}