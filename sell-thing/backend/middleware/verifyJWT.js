const jwt = require('jsonwebtoken');

exports.exports = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
}